

export class ComponentsHandler {
  static components = {}
  static get Components() {
    return ComponentsHandler.components
  }

  static set Components(componentsList) {
    for (let comp in componentsList)
      componentsList[comp].register(comp, componentsList[comp])

    ComponentsHandler.components = componentsList
  }
}