
import { BaseComponent } from './BaseComponent.js'
import { UserTaskList } from '../class/UserTaskList.js'

export class TasksList extends BaseComponent {
  _tasks = []
  constructor() {
    super()
  }

  static get observedAttributes() {
    return ['type']
  }

  set tasks(value) {
    this._tasks = value
    this.render()
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback(name, oldVal, newVal) {
    debugger
    if (name === 'type')
      this.render()
  }

  get style() {
    // no estaba usando ninguna arquitectura de CSS para el TO-DO list,
    // tengo que actualizar todo lo que venía haciendo en styles ahora...
    // voy por BEM
    return /*html*/`
      <style>
        :host {
          display: inline-block;
        }

        :host * {
          box-sizing: border-box;
        }

        .tasks__section .tasks__list {
          padding: 0 20px;
          display: grid;
          grid-template-columns: minmax(150px, 1fr);
          grid-auto-rows: 1fr;
          grid-gap: 5px;
        }
      </style>
    `
  }

  render() {
    let innerContent
    let heading
    debugger
    switch (this.getAttribute('type')) {
      case 'list':
        heading = 'Collection of Task Lists'
        innerContent = `
          ${this.tasks && this.tasks.length > 0 ? this._tasks.map(task => /*html*/`
            <task-item
              title='${task.title}'
              observations='${task.observations}'
              edit='${task.editBtn}'
              delete='${task.deleteBtn}'
            >
            </task-item>
          `).join() : 'Your collection of task lists is empty.'}`
        break
      case 'create':
        heading = 'Create New Task List'
        innerContent = /**html */`
          <task-item></task-item>
        `
        break
      default:
        heading = 'Clone List'
        break
    }
    this.shadow.innerHTML = /*html*/`
        <link id="global-styles" rel="stylesheet" href="../css/style.css">
        ${this.style}
        <section class='tasks__section'>
          <slot name='tasks__heading'>
            <h2>${heading}</h2>
          </slot>
          <div class='tasks__list'>
            ${innerContent}
          </div>
        </section >`
  }
}