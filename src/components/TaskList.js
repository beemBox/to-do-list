
import { BaseComponent } from './BaseComponent.js'
import { UserTaskList } from '../class/UserTaskList.js'

export class TasksList extends BaseComponent {
  _taskLists = []
  newListName = ''
  newListObs = ''

  constructor() {
    super()
    this.shadow.addEventListener('sent-new-list', this.createNewList)
    this.retrieveLists()
  }

  createNewList() {
    this.taskLists.push(new UserTaskList(
      this.newListName,
      this.newListObs
    ))
    this.storeLists()
    this.setAttribute('type', 'list')
  }

  storeLists() {
    localStorage.setItem('userLists', JSON.stringify(this.taskLists))
  }

  retrieveLists() {
    let lists = JSON.parse(localStorage.getItem('userLists'))

    if (lists) {
      lists.forEach(list => {
        this.taskLists.push(new UserTaskList(
          list._listName,
          list._observations,
          list._createdDate,
          list._modifiedDate
        ))
      })

    }
  }

  static get observedAttributes() {
    return [
      'type',
      'title',
      'observations',
      'delete',
      'edit',
      'listName'
    ]
  }

  get taskLists() {
    return this._taskLists
  }

  set taskLists(value) {
    this._taskLists.push(value)
    this.render()
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'type') {
      if (newVal === 'list' && this.taskLists.length === 0)
        this.retrieveLists()
      else if (newVal === 'create') {
        this.newListName = ''
        this.newListObs = ''
      }
      this.render()
      this.setEventListenersOnUpdate(newVal)
    }
  }

  setEventListenersOnUpdate(newVal) {
    if (newVal === 'create') {
      let btn = this.find('.task__button--send-list')
      btn.addEventListener('click', (e) => {
        this.newListName = this.find('input[name="listName"]').value.trim()
        this.newListObs = this.find('textarea').value.trim()

        if (this.newListName !== '')
          this.createNewList()
      })
    }
  }

  get style() {
    // no estaba usando ninguna arquitectura de CSS para el TO-DO list,
    // tengo que actualizar todo lo que venía haciendo en styles ahora...
    // voy por BEM
    return /*html*/`
      <style>
        :host {
          display: inline-block;
          width: 100%;
        }

        :host * {
          box-sizing: border-box;
        }

        .lists__section {
          position: relative;
          border-radius: 5px;
          overflow: hidden;
          padding: calc(1vw + 0.1vw);
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: 5fr;
          grid-gap: 1vh;
        }

        .lists__section::before {
          content: '';
          background-color: #000;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: -1;
          opacity: 0.2;
        }

        .lists__section .lists__collection {
          padding: 0 20px;
          display: grid;
          grid-template-columns: 1fr;
          grid-auto-rows: 1fr;
          grid-gap: 5px;
        }

        .lists__collection .lists__item{
          display: flex;
          justify-content: space-between;
        }

        .lists__form {
          display: flex;
          flex-direction: column;
          justify-content: start;
        }
      </style>
    `
  }

  render() {
    let attr = this.getAttribute('type')
    let innerContent
    let heading
    switch (attr) {
      case 'list':
        heading = 'Collection of Task Lists'
        let listItems

        if (this.taskLists && this.taskLists.length > 0) {
          listItems = this.taskLists.map((list, i) => {
            return `
            <div class='lists__item' id='${i}'>
              <span>${list.name}</span><span>Created: ${list.createdDate}</span>
            </div>
          `}).join('')
          debugger
        } else listItems = 'Your collection of task lists is empty.'

        innerContent = /*html*/`
            <section class='lists__section'>
              <div class='lists__row'>
                ${listItems}
            </div>
          </section>`
        break
      case 'create':
        heading = 'Create New Task List'
        innerContent = /*html*/`
          <form class='lists__form'>
            <div class='input__container'>
              <input
                class='menu__input--text'
                type='text'
                name='listName'
                placeholder='Set a name for the list...'
                value='${this.newListName}'
              />
            </div>
            <div classw='input__container'>
              <textarea

                type='text'
                name='observations'
                placeholder='Add some observations?'
                value='${this.newListObs}'
              ></textarea>
            </div>

            <button class='task__button--send-list' type='button'>Save List</button>
          </form>
        `
        break
      default:
        heading = 'Clone List'
        break
    }
    this.shadow.innerHTML = /*html*/`
        <link id="global-styles" rel="stylesheet" href="../css/style.css">
        ${this.style}
        <section class='lists__section'>
          <slot name='lists__heading'>
            <h2>${heading}</h2>
          </slot>
          <div class='lists__collection'>
            ${innerContent}
          </div>
        </section >`
  }
}