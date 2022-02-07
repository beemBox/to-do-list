import { BaseComponent } from './BaseComponent.js'
import { Router } from '../Router.js'

export class ContentApp extends BaseComponent {
  constructor() {
    super()
    this.content = `<to-do-hero></to-do-hero>
    <landing-page></landing-page>`
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
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this.shadow.innerHTML = `
      <link id="global-styles" rel="stylesheet" href="../css/style.css">
      ${this.content}
      `
  }
}

export const registerContentApp = () => customElements.define('content-app', ContentApp)