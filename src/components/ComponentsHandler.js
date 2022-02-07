

export class ComponentsHandler {

  static set Components(componentsList) {
    debugger
    for (let comp in componentsList)
      componentsList[comp].register(comp, componentsList[comp])
  }
}