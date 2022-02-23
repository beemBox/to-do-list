import Router from './Router'
import BaseComponent from './BaseComponent'
import Utils from './Utils'
import '../components/atoms'
/**
 * Clase que almacena en cache los componentes para que sean usados desde otros componentes internos
 */
export class ComponentsHandler {
  static get Components() {
    return ComponentsHandler.components
  }

  static set Components(componentsList) {
    for (let comp in componentsList)
      componentsList[comp].register(comp)

    ComponentsHandler.components = componentsList
  }

  static set Bootstrap(bootstrap) {
    ComponentsHandler.bootstrap = bootstrap
  }

  static isApplicationComponent(mutationTargetName) {
    if (typeof mutationTargetName !== 'string')
      if (mutationTargetName.localName)
        mutationTargetName = mutationTargetName.localName.toLowerCase()
      else
        mutationTargetName = Utils.filterObjectTypeofName(mutationTargetName) // filtramos que no sea CaracterData

    return Object.keys(ComponentsHandler.Components)
      .includes(mutationTargetName)
  }

  static importAddedComponent = async (componentName, tagName) => {
    // le agregué una librería... (varias...)
    // const path = Router.componentsDirStructure.find(
    //   route => route.id.toUpperCase() === componentName.charAt(0)
    // ).path + componentName.slice(1) + '.js'
    // let comp = function (component) {
    // //   return new Function('return ' + component)()
    // // }
    // // document.addEventListener('DOMContentLoaded', () => {
    // //   customElements.define(tagName, comp(componentName.slice(1)))
    // // })


    // import(componentName.slice(1))
    //   .then((res) => {
    //     debugger
    //   })
  }

  static * iterateAddedNodes(nodes) {
    for (let key in nodes)
      if (typeof nodes[key] !== 'function'
        && nodes[key].constructor.__proto__.name !== 'CharacterData'
        && (typeof nodes[key] !== 'number')) {
        let node = nodes[key]

        if (node.children.length > 0)
          yield* ComponentsHandler.iterateAddedNodes(node.children)

        else if (node.localName.match(/-/)
          && !ComponentsHandler.isApplicationComponent(node.localName)) {
          let compName = '';
          let compNameSplitted = node.localName.split(/-/)

          for (let key in compNameSplitted)
            compName += compNameSplitted[key]
              .charAt(0).toUpperCase() + compNameSplitted[key].slice(1)

          yield [compName, node]
        }
      }
  }

  static * iterateMutations(mutations) {
    for (const mutation of mutations)
      if (mutation.type === 'childList'
        && ComponentsHandler.isApplicationComponent(mutation.target)) {
        const appComp = mutation

        if (appComp.addedNodes.length)
          yield* ComponentsHandler.iterateAddedNodes(appComp.addedNodes)
      }
  }

  static registerNewComponent(mutations) {
    const components = Object.keys(ComponentsHandler.components)
    const genElement = ComponentsHandler.iterateMutations(mutations)
    let res = genElement.next() // inicializamos el generator.

    while (!res.done) {
      ComponentsHandler.importAddedComponent(res.value[0], res.value[1])
      res = genElement.next()
    }
  }
}
/**
 * Inicia la configuración de los componentes
 */
export let $LConfig = function () {
  let config = Array.prototype.slice.call(arguments)[0]
  if (typeof config !== 'object')
    throw Error('Debe ingresar parámentros de configuración.')
  else {
    Router.Routes = config.routes
    ComponentsHandler.Components = config.components[0]
    ComponentsHandler.Bootstrap = config.bootstrap

    const init = async () => {
      Router.start()
    }
    document.addEventListener('DOMContentLoaded', init);
    createBootstrap()
    document.addEventListener('link', e => {
      e.target.setAttribute('onupdate', 'link')
      Router.handleLocation()
    })
  }
}

/**
 * ContentHanlder - Observer de Components y Contenido
 */
const _webTags = Symbol('Browser Tags')
export class ContentHandler extends BaseComponent {

  constructor() {
    super()
    this.getBrowserTags()
    this.setChildrenComponentsObserver()
  }

  connectedCallback() {
    this.getWebTags()
    this.setChildrenComponentsObserver()
  }

  setChildrenComponentsObserver() {
    this.observer = new MutationObserver(this.childrenMutation)
    this.observer.observe(this, {
      attributes: true,
      childList: true,
      subtree: true
    })
  }

  disconnectedCallback() {
    this.unsetChildrenComponentsObserver()
  }

  childrenMutation(mutations) {
    ComponentsHandler.registerNewComponent(mutations)
  }

  // hacemos un singleton con primitive type Symbol: _webTags
  // solo el primer componente extendido de ContentHandler lo carga
  getBrowserTags() {
    if (!ContentHandler[_webTags]) {
      ContentHandler[_webTags] = Object.getOwnPropertyNames(window)
        .map(key => {
          const match = /^HTML(.+)Element$/i.exec(key.toLowerCase())
          return match && match[1] // obtengo el nombre del elemento en DOM
        })
        .filter(tag => tag && (tag !== 'unknown' || tag !== 'Unknown'))
      ContentHandler[_webTags].push(...['text', 'section', 'footer', 'aside', 'header', 'CharacterData'])
    }
  }

  static get WebTags() {
    return ContentHandler[_webTags]
  }

  unsetChildrenComponentsObserver() {
    this.observer.disconnect()
  }
}

const createBootstrap = () => {
  document.querySelector('body')
    .appendChild(
      document.createElement(
        Router.bootstrapName
      )
    )
}