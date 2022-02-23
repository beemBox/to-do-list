import { ComponentsHandler } from './Core.js'
import BaseComponent from './BaseComponent.js'

export default class Router {
  static route(event) {
    event = event || window.event
    event.preventDefault()

    if (event.target.localName === 'button')
      event.target.href = event.target.getAttribute('Link')
    // event.target.href lo devolvía como undefined
    window.history.pushState({}, '', (event.target.href || '/'))

    // tomamos el elemento del bootstrap para despachar evento link
    const el = event.path.filter(el => {
      const comp = Router.bootstrapName
      return comp === el.localName
    })[0]

    el.dispatchEvent(new CustomEvent('link', {
      bubbles: true,
      composed: true
    }))
  }

  static get bootstrapName() {
    return Object.keys(ComponentsHandler.components)
      .find(comp => {
        const def = ComponentsHandler.components[comp]
        if (ComponentsHandler.bootstrap.some(boot => (boot === def)))
          return comp
      })
  }

  static set Routes(routes) {
    Router._routes = routes
  }

  static get routeComponent() {
    return Router.routes[window.location.pathname]
  }

  static get routes() {
    return Router._routes
  }

  static handlePartialLocation = async (tplName) => {
    const path = `../templates/${tplName}.html`
    const html = await fetch(path).then(data => data.text())
    return html
  }

  static handleLocation = async () => {
    const path = window.location.pathname
    const route = Router.routes[path] || Router.routes[404]
    const html = await fetch(`../templates/${route}.html`)
      .then(data => data.text())
    return html
  }

  static get componentsDirStructure() {
    return [
      { id: 'A', path: '../components/atoms/' },
      { id: 'M', path: '../components/molecules/' },
      { id: 'O', path: '../components/organisms' }
    ]
  }

  static start() {
    const main = document.getElementsByTagName(Router.bootstrapName)[0]
    main.setAttribute('onupdate', true)
    window.addEventListener('popstate', (e) => {
      Router.bootstrap.forEach(boot => {
        // document.getElementsByTagName(boot)[0]
        //   .dispatchEvent(new CustomEvent('link', {
        //     bubbles: true,
        //     composed: true
        //   }))
      })
    })
  }
}
