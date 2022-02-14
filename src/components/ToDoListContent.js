import BaseComponent from '../@LittleComps/BaseComponent.js'
import Router from '../@LittleComps/Router.js'

export default class ToDoListContent extends BaseComponent {
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

  animateNewContent() {

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

  setChildrenComponentsObserver() {
    this.observer = new MutationObserver(this.childrenMutation)
    this.observer.observe(this, {
      attributes: true,
      childList: true,
      subtree: true
    })
  }

  childrenMutation(mutations) {
    const added = []

    for (const mutation of mutations)
      added.push(...mutation.addedNodes)

    // console.log({ added: added.filter(el => el.nodeType === Node.ELEMENT_NODE) })
    // console.log(added)
  }

  unsetChildrenComponentsObserver() {
    this.observer.disconnect()
  }

  connectedCallback() {
    this.setChildrenComponentsObserver()
    this.updateContent()
  }

  disconnectedCallback() {
    this.unsetChildrenComponentsObserver()
  }


  render() {
    this.innerHTML = `
      <div id='wrapper'>
      ${this.content}
      </div>
      `
  }
}