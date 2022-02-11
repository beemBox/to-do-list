class App {
  static msg = ''

  constructor() {
    this.isSalir = false
    this.opcion = 0
    this.tasksLists = []
  }

  get MAIN_MENU_SCREEN() {
    return {
      main: `Seleccione una opción (número):
  
  1) Crear Nueva Lista de Tareas
  2) Ir a Listas de Tareas

  (Salir con botón CANCELAR)`,
      crearLista: `Ingrese el nombre de la lista de tareas:`,
      showLists: `Seleccione la lista que desea administrar:
      ${this.tasksLists.length
          ? Helpers.listToString(this.tasksLists, true)
          : 'No hay listas de tareas.'}`
    }

  }

  createNewTaskList(listName) {
    this.tasksLists.push(new TaskList(listName));
    App.msg = `Se ha creado la lista: ${String(listName)}`

    return this.getTaskList(listName)
  }

  getTaskList(id) {
    return (!isNaN(id))
      ? this.tasksLists[id - 1]
      : this.tasksLists.find((list) => list.name === id)
  }

  showCreateTaskScreen() {
    let userInput = Prompt.show(App.msg, this.MAIN_MENU_SCREEN.crearLista, false)

    return (userInput)
      ? this.createNewTaskList(userInput)
      : userInput
  }

  showTasksListScreen() {
    let userInput = Prompt.show(App.msg, this.MAIN_MENU_SCREEN.showLists)

    if (userInput === null)
      return true // puso cancelar
    else
      if (isNaN(userInput)) {
        App.msg = ERROR.show.ingresarNumerosLista
      } else {
        return this.getTaskList(userInput)
      }
  }

  get OPCIONES() {
    return {
      createTaskList: 1,
      showTasksLists: 2
    }
  }

  showMenu() {
    return Prompt.show(App.msg, this.MAIN_MENU_SCREEN.main)
  }

  static validateMenuOption(opcion, listaOpciones) {
    if (isNaN(opcion))
      App.msg = ERROR.show.ingresarNumerosLista
    else {
      let isOpcionCorrecta = false

      if (typeof listaOpciones === 'object') {
        for (let key in listaOpciones)
          if (listaOpciones[key] === opcion)
            isOpcionCorrecta = !isOpcionCorrecta
      } else
        if (listaOpciones.includes(opcion))
          isOpcionCorrecta = !isOpcionCorrecta

      if (!isOpcionCorrecta)
        App.msg = ERROR.show.ingresoIncorrecto
    }
  }

  run() {
    do {
      if (this.opcion !== this.OPCIONES.createTaskList
        && this.opcion !== this.OPCIONES.showTasksLists) {
        this.opcion = this.showMenu()
        App.msg = ''
      }

      switch (this.opcion) {
        case 1:
          this.opcion = this.showCreateTaskScreen()

          if (!this.opcion)
            this.OPCIONES.createTaskList
          else
            if (this.opcion instanceof TaskList)
              this.opcion.showMenu()
            else
              this.opcion = 0
          break
        case 2:
          this.opcion = this.showTasksListScreen()

          if (!this.opcion)
            this.OPCIONES.showTasksLists
          else
            if (this.opcion instanceof TaskList)
              this.opcion.showMenu()
            else
              this.opcion = 0
          break
        default:
          if (this.opcion !== null)
            App.validateMenuOption(this.opcion, this.OPCIONES)
          else {
            this.isSalir = !this.isSalir
            App.msg = 'Ha cerrado la aplicación.'
          }
          break
      }
    } while (!this.isSalir)

    alert(App.msg)
  }

  static init() {
    const main = new App()
    main.run()
  }
}

class Task {
  constructor(taskName, dateTask) {
    this.itemName = taskName
    this.opcion = 0
    this.status = 0
    this.isSalir = false
  }
}

class TaskList {
  constructor(taskListName) {
    this.name = taskListName
    this.itemsList = []
    this.newItemName = ''
    this.newItemQty = 0
  }

  get LISTA_SCREENS() {
    return {
      mainMenu: `${this.printNameAndList()}

      1) Agregar Tarea
      2) Eliminar Tarea`,
      nombreItem: `${this.printNameAndList(this.OPCIONES.addTask[1])}
      \n\nIngrese la nueva tarea: `,
      // itemQty: `${
      // this.itemsList.length !== 0
      //   ? 'Lista de compras\n' + this.getItemsList() : ''}\n\nIngrese la cantidad de ${this.newItemName}`,
      //       itemsList: `Lista de compras:\n${this.itemsList.length !== 0 ? this.getItemsList() : '  Lista vacía'}

      // Opciones:
      //   1) Quitar producto de la lista`,
      removeItem: `${this.printNameAndList(this.OPCIONES.removeTask[1], true)}¿Que producto desea quitar de la lista?`
    }
  }

  get OPCIONES() {
    return {
      addTask: [1, 'Agregar Nueva Tarea'],
      removeTask: [2, 'Eliminar Tarea']
    }
  }

  printNameAndList(subMenu, isEnumerado = false) {
    return `${this.name.toUpperCase()}${subMenu ? ' > ' + subMenu : ''}
  ${this.itemsList.length
        ? Helpers.listToString(this.itemsList, isEnumerado)
        : '\nNo hay ítems agregados.'}`
  }

  showMenu() {
    do {
      if (this.opcion !== this.OPCIONES.addTask[0]
        && this.opcion !== this.OPCIONES.removeTask[0]) {
        this.opcion = Prompt.show(App.msg, this.LISTA_SCREENS.mainMenu)
        App.msg = ''
      }

      switch (this.opcion) {
        case 1:
          this.opcion = !this.showAddItemScreen()
            ? this.OPCIONES.addTask[0]
            : 0
          break
        case 2:
          this.opcion = !this.showRemoveItemScreen()
            ? this.OPCIONES.removeTask[0]
            : 0
          break
        default:
          if (this.opcion !== null)
            App.validateMenuOption(this.opcion, this.OPCIONES)
          else
            this.isSalir = !this.isSalir
      }
    } while (!this.isSalir)
  }

  showAddItemScreen() {
    let userInput = Prompt.show(App.msg, this.LISTA_SCREENS.nombreItem, false)

    if (userInput === null)
      return true // presionó cancelar
    if (this.validateNewItemName(userInput)) {
      return this.addItem()
    }
  }

  showRemoveItemScreen() {
    let userInput = Prompt.show(App.msg, this.LISTA_SCREENS.removeItem)

    if (userInput !== null) {
      if (isNaN(userInput)) {
        App.msg = ERROR.show.ingresarNumerosLista
        return false
      } else {
        if (userInput !== 0)
          this.removeItem(userInput - 1)
        else
          return true
      }
    } else {
      return true // apretó cancelar
    }
  }

  removeItem(indice) {
    let itemEliminado = this.itemsList.splice(indice, 1)
    App.msg = `Se ha eliminado el ítem: ${itemEliminado[0].itemName} `
    return true
  }

  emptyComprasList() {
    this.itemsList = []
    App.msg = '* Se ha vacíado la lista de compras.'
  }

  addItem() {
    this.itemsList.push(new Task(this.newItemName))
    this.newItemName = ''
    return true
  }

  validateNewItemName(userInput) {
    if (userInput === '') {
      App.msg = ERROR.show.noIngresaNombreItem
      return false
    } else if (!isNaN(parseInt(userInput))) {
      App.msg = ERROR.show.ingresarSoloNombreItem
      return false
    } else {
      this.newItemName = userInput
      return true
    }
  }
}

class Prompt {
  static show(msg, menu, returnInt = true) {
    msg = msg !== '' ? (msg + '\n\n') : msg

    if (returnInt) {
      let userInput = prompt(`${msg} ${menu} `)
      if (userInput === null || userInput === '')
        return userInput
      else
        return parseInt(userInput)
      return
    } else
      return prompt(`${msg} ${menu} `)
  }
}

class ERROR {
  static get show() {
    return {
      ingresarUnaOpcion: `* Debe ingresar una opción.`,
      ingresarNumerosLista: `* Solo debe ingresar números de la lista.`,
      ingresoIncorrecto: `* El número de opción ingresado es incorrecto.`,
      ingresarSoloNombreItem: '* Solo debe ingresar el nombre del ítem.',
      noIngresaNombreItem: '* No ha ingresado ningún nombre de ítem.'
    }
  }
}

class Helpers {
  static listToString(list, isEnumerado = false) {
    return list.map((item, i) => {
      // si es obj pasamos el nombre a item
      if (typeof item === 'object')
        for (let key in item)
          if (key.toLowerCase().includes('name')) {
            item = item[key]
            break
          }

      return `${
        isEnumerado ?
          i + 1 + ')' : '-'
        } ${item} \n  `
    }).toString().replace(/\,/g, '')
  }

  // static underLineString(unString) {
  //   return `${ unString } \n${ unString.toLowerCase().replace(/[a-z]/g, '­­­­­_') } `
  // } // esto no funciona en prompt como en consola bash! >_<
}


// function addItem(userInput) {
//   if (!invalidUserInputError(userInput))
//     return false
//   else
//     if (comprasList === null && comprasList === '')
//       comprasList += '\n'

//   comprasList += '\t - ' + userInput + '\n'
//   msg = `¡El producto ${userInput} se ha agregado a la lista!

//       `
//   if (userInput === null) {
//     msg = ''
//     return true
//   } else return false
// }

// App.init()