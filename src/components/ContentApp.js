import { BaseComponent } from './BaseComponent.js'
import { Router } from '../Router.js'

export class ContentApp extends BaseComponent {
  constructor() {
    super()
    this.content = ''
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
    let theContent = this.find('#the-content')
    gsap.fromTo(theContent,
      { opacity: 0 },
      { opacity: 1, delay: 0.35, duration: 1 })


  }

  connectedCallback() {
    this.updateContent()
    this.render()
  }

  render() {
    this.shadow.innerHTML = `
      <link id="global-styles" rel="stylesheet" href="../css/style.css">
      <div id='the-content'>
      ${this.content}
      </div>
      `
  }
}