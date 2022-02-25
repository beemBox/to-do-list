import BaseComponent from '../../@LittleComps/BaseComponent.js'
import Task from '../molecules/Task.js'
import Router from '../../@LittleComps/Router.js'
import '../molecules/molecules'
import '../organisms/organisms'

// Acá voy a poner lo que teóricamente en el ejercicio del Prompt era TaskList
// pero sí lo acompaño de una clase Task, sí la voy a hacer componente u_u
// Primeramente lo voy a ir almacenando todo en localStorage
// pero más adelante la idea es usar firebase.
// voy a tener que hacer una clase que sea como un repository para handlear data
// del gateway y services así como de localStorage
export default class MyTasks extends BaseComponent {
  _tasksList = []
  _content = {
    menu: '<o-menu-options></o-menu-options>',
    section: `<o-task-lists type='list'></o-task-lists>`
  }

  constructor() {
    super()
    this.currentSection = 'create'
    this.addEventListener('option-select', this.handleEvent)
  }

  handleEvent(e) {
    debugger
    // verifico de que child component viene 
    //y obtengo el elemento que lo despachó
    switch (e.target.nodeName.toLowerCase()) {
      case 'o-menu-options': // viene de los botones
        // son los botones de tasks list
        let el = e.path[0]
        debugger
        this.currentSection = el.classList.toString().includes('create')
        if (this.currentSection) {
          this.find('o-tasks-lists').setAttribute('type', 'create')
        }
        break
    }
  }

  // Cambia la sección según el botón que se clickea
  async getPartialContent(tplName, type) {
    if (type === 'section')
      this.content.section = await Router.handlePartialLocation(tplName)
    else
      this.content.section = await Router.handlePartialLocation(tplName)

    this.content.section = ''
    this.currentSection = type
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
    this.innerHTML = /*html */`
    <div class="app-content">
      <m-mainheading class='app-content__title title'></m-mainheading>
      <aside class="app-content__menu menu-app">
        ${this._content.menu}
      </aside>
      <section class="app-content__content content">
        ${this._content.section}
      </section>
    </div>`
  }
}

customElements.define('my-tasks', MyTasks)