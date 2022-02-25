import Router from '../../@LittleComps/Router.js'
import { ContentHandler } from '../../@LittleComps/Core.js'
import '../pages/content'

export default class ToDoListContent extends ContentHandler {
  constructor() {
    super()
    this.content = ''
    this.addEventListener('option-select', this.handleEvent)
  }

  static get observedAttributes() {
    return ['update']
  }

  async updateContent() {
    this.content = await Router.handleLocation()
    this.render()
    this.setAttribute('update', false)
  }

  attributeChangedCallback(prop, oldVal, newVal) {
    if (prop === 'update' && (newVal === 'true')) {
      this.updateContent()
    }
    this.animateContentChange()
  }

  animateContentChange() {
    let theContent = this.find('#wrapper')
    gsap.fromTo(theContent,
      { opacity: 0 },
      { opacity: 1, delay: 0.35, duration: 1 })
  }

  connectedCallback() {
    this.updateContent()
    this.setChildrenComponentsObserver()
  }


  connectedCallback() {
    this.updateContent()
  }

  render() {
    this.innerHTML = `
      <div id='wrapper'>
      ${this.content}
      </div>
      `
  }
}

customElements.define('o-todo-list-content', ToDoListContent)