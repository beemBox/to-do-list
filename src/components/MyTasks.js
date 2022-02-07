import { BaseComponent } from './BaseComponent.js'
import { Task } from '../class/Task.js'

// Acá voy a poner lo que teóricamente en el ejercicio del Prompt era TaskList
// pero sí lo acompaño de una clase Task, que no es componente
// en este caso.
// Primeramente lo voy a ir almacenando todo en localStorage
// pero más adelante la idea es usar firebase.
// voy a tener que hacer una clase que sea como un repository para handlear data
// del gateway y services así como de localStorage
export class MyTasks extends BaseComponent {
  constructor() {
    super()
    this.tasksList = []
    debugger
    this.content = this.getInnerHTML()
    debugger
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this.shadow.innerHTML = this.content
  }
}
