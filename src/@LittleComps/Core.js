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
    for (let key in config) {
      switch (key) {
        case 'components':
          ComponentsHandler.Components = config[key][0]
          break
        case 'bootstrap':
          ComponentsHandler.Bootstrap = config[key]
          break
        case 'routes':
          Router.Routes = config[key]
        default:
      }
      const init = async () => {
        Router.start()
      }

      const setDom = () => {
        document.addEventListener('DOMContentLoaded', init);
        document.addEventListener('link', e => {
          e.target.setAttribute('operate', 'link')
          Router.handleLocation()
        })
      }
    }
  }
}