import ContentApp from './organisms/ToDoListContent.js'
import Router from '../@LittleComps/Router.js'
import * as Organisms from './organisms/organisms'

export default class App extends ContentApp {
  constructor() {
    super()
    this.content = ``
    this.update = false
    this.addEventListener('option-select', this.handleEvent)
  }

  static get observedAttributes() {
    return ['onupdate']
  }

  attributeChangedCallback(prop, oldVal, newVal) {
    if (prop === 'onupdate' && (newVal !== '' && newVal !== 'false')) {
      this.updateContent()
      this.setAttribute('onupdate', false)
    }
  }

  updateContent() {
    this.find('o-todo-list-content').setAttribute('update', true)
  }

  connectedCallback() {
    this.setAttribute('onupdate', false)
    this.render()
  }

  render() {
    this.innerHTML = `
      <o-header></o-header>
      <o-todo-list-content update='${this.update}'></o-todo-list-content>
      <o-side-text></o-side-text>
      <o-footer></o-footer>
    `
  }

  createRenderRoot() {
    return this;
  }
}