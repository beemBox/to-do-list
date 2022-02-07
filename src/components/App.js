import { BaseComponent } from './BaseComponent.js'
import { Router } from '../Router.js'

export class App extends BaseComponent {
  constructor() {
    super()
    this.content = `<content-app></content-app>`
  }

  static get observedAttributes() {
    return ['operate']
  }

  async updateSite() {
    this.content = await Router.handleLocation()
    this.render()
  }

  attributeChangedCallback(prop, oldVal, newVal) {
    if (prop === 'operate' && newVal !== '') {
      this.shadow.innerHTML = ''
      this.updateSite()
    }
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this.shadow.innerHTML = `
      <link id="global-styles" rel="stylesheet" href="../css/style.css">
      <app-header></app-header>
      ${this.content}
      <to-do-side-text></to-do-side-text>
    `
  }

  createRenderRoot() {
    return this;
  }
}

export const registerApp = () => customElements.define('app-lister', App)