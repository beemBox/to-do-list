import Router from './Router'
import BaseComponent from './BaseComponent'
import Utils from './Utils'
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

  static * iterateAddedNodes(nodes) {
    for (let key in nodes)
      if (typeof nodes[key] !== 'function'
        && nodes[key].constructor.__proto__.name !== 'CharacterData' && (typeof nodes[key] !== 'number')) {
        let node = nodes[key]

        if (node.children.length > 0)
          yield* ComponentsHandler.iterateAddedNodes(node.children)
        else if (node.localName.match(/-/) && !ComponentsHandler.isApplicationComponent(node.localName)) {
          let compName = '';
          node = node.localName.split(/-/)
          for (let key in node)
            compName += node[key].charAt(0).toUpperCase() + node[key].slice(1)
          yield compName
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
      debugger
      genElement.next()
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
    const added = []
    // const components = Object.keys(ComponentsHandler.components)

    ComponentsHandler.registerNewComponent(mutations)
    // filtro para que no sean elementos del DOM
    // for (const mutation of mutations)
    //   if (mutation.type === 'childList'
    //     && ComponentsHandler.isApplicationComponent(mutation.target))
    //     if (mutation.addedNodes.length) {
    //       for (let key in mutation.addedNodes) {
    //         if (typeof mutation.addedNodes[key] !== 'function') {
    //           const el = mutation.addedNodes[key]
    //           if (el instanceof BaseComponent
    //             && !ComponentsHandler.isApplicationComponent(el)) {
    //             console.log(mutation.addedNodes[key])// added.push(...mutation.addedNodes)

    //           }

    //           // node = node.length > 1 && Array.isArray(node)
    //           //   ? node[1].replace(/\]/, '')
    //           //   : node.length > 0 ? node[0].replace(/(\[\])+/g, '') : null

    //           // if (node && !ContentHandler.WebTags.some(tag => tag.toLowerCase() === node.toLowerCase())
    //           //   && !ComponentsHandler.isApplicationComponent(node))
    //         }
    //       }
    //     }
    // console.log({ added: added.filter(el => el.nodeType === Node.ELEMENT_NODE) })
    // console.log(added)
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