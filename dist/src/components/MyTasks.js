import { BaseComponent } from './BaseComponent.js'
import { Task } from './Task.js'
import { Router } from '../Router.js'

// Acá voy a poner lo que teóricamente en el ejercicio del Prompt era TaskList
// pero sí lo acompaño de una clase Task, sí la voy a hacer componente u_u
// Primeramente lo voy a ir almacenando todo en localStorage
// pero más adelante la idea es usar firebase.
// voy a tener que hacer una clase que sea como un repository para handlear data
// del gateway y services así como de localStorage
export class MyTasks extends BaseComponent {
  _tasksList = []

  constructor() {
    super()
    this.content = {
      menu: '<app-menu></app-menu>',
      section: `<tasks-list type='list'></tasks-list>`
    }
    this.shadow.addEventListener('option-select', this)
  }

  handleEvent(e) {
    // verifico de que child component viene 
    //y obtengo el elemento que lo despachó
    switch (e.target.nodeName.toLowerCase()) {
      case 'app-menu': // viene de los botones
        // son los botones de tasks list
        let el = e.path[0]
        if (el.classList.toString().includes('create')) {
          this.find('tasks-list').setAttribute('type', 'create')
        }
        break
      default:
        break
    }
  }

  async getPartialContent(tplName, type) {
    // if (type === 'section')
    //   this.content.section = await Router.handlePartialLocation(tplName)
    // else
    //   this.content.section = await Router.handlePartialLocation(tplName)
    this.content.section = ''
    this.render()
  }

  get taskList() {
    return this._tasksList
  }

  set taskList(value) {
    this._tasksList = value
  }

  async updateContent() {

  }

  connectedCallback() {
    this.render()
  }

  data(value) {

  }

  render() {
    this.shadow.innerHTML = `
    <link id="global-styles" rel="stylesheet" href="../css/style.css">
    <div class="app-content">
      <div class="app-content__title title">
        <h1>My Tasks</h1>
      </div>
      <aside class="app-content__menu menu-app">
        ${this.content.menu}
      </aside>
      <section class="app-content__content content">
        ${this.content.section}
      </section>
    </div>`
  }
}
