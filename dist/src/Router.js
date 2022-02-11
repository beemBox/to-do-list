import { BaseComponent } from './components/BaseComponent.js'

export class Router {
  routes = {}

  static route(event) {
    event = event || window.event
    event.preventDefault()

    if (event.target.nodeName === 'BUTTON')
      event.target.href = event.target.getAttribute('Link')
    // event.target.href lo devolvía como undefined
    window.history.pushState({}, '', (event.target.href || '/'))

    // tengo que hacer genérica esta parte porque tiene el 
    // nombre de la app to-do-list... que es horrible encima jaja
    document.getElementsByTagName('app-lister')[0]
      .dispatchEvent(new CustomEvent('link', {
        bubbles: true,
        composed: true
      }))
  }

  static get routes() {
    return {
      '/': '../templates/landing-page.html',
      '/my-tasks': '../templates/my-tasks.html',
      '/create-list': '../templates/create-list.html',
      404: '../templates/error-404.html'
    }
  }

  static handlePartialLocation = async (tplName) => {
    const path = `../templates/${tplName}.html`
    const html = await fetch(path).then(data => data.text())
    return html
  }

  static handleLocation = async () => {
    const path = window.location.pathname
    const route = Router.routes[path] || Router.routes[404]
    const html = await fetch(route).then(data => data.text())
    return html
  }

  static start() {
    window.addEventListener('popstate', (e) => {
      document.getElementsByTagName('app-lister')[0]
        .dispatchEvent(new CustomEvent('link', {
          bubbles: true,
          composed: true
        }))
    })
  }
}