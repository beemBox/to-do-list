import { BaseComponent } from './components/BaseComponent.js'

export class Router {

  static route(event) {
    event = event || window.event
    event.preventDefault()
    window.history.pushState({}, '', (event.target.href || '/'))

    document.getElementsByTagName('app-lister')[0]
      .dispatchEvent(new CustomEvent('link', {
        bubbles: true,
        composed: true
      }))
  }

  static get routes() {
    return {
      '/': '../templates/landing-page.html',
      '/mis-tareas': '../templates/mis-tareas.html',
      404: '../templates/error-404.html'
    }
  }

  static handleLocation = async () => {
    const path = window.location.pathname
    const route = Router.routes[path] || Router.routes[404]
    const html = await fetch(route).then(data => data.text())
    return html
  }
}