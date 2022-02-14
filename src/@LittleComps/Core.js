import Router from './Router.js'
/**
 * Clase que almacena en cache los componentes para que sean usados desde otros componentes internos
 */
export class ComponentsHandler {
  static get Components() {
    return ComponentsHandler.components
  }

  static set Components(componentsList) {
    for (let comp in componentsList)
      componentsList[comp].register(comp, componentsList[comp])

    ComponentsHandler.components = componentsList
  }

  static set Bootstrap(bootstrap) {
    ComponentsHandler.bootstrap = bootstrap
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
    document.addEventListener('link', e => {
      e.target.setAttribute('onupdate', 'link')
      Router.handleLocation()
    })

  }
}