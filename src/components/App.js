import ContentApp from './ToDoListContent.js'
import Router from '../@LittleComps/Router.js'

export default class App extends ContentApp {
  constructor() {
    super()
    this.content = ``
    this.update = false
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
    this.find('to-do-list-content').setAttribute('update', true)
  }

  connectedCallback() {
    this.setAttribute('onupdate', false)
    this.render()
  }

  render() {
    this.innerHTML = `
      <app-header></app-header>
      <to-do-list-content update='${this.update}'></to-do-list-content>
      <side-text></side-text>
      <app-footer></app-footer>
    `
  }

  createRenderRoot() {
    return this;
  }
}
