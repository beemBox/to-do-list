import { BaseComponent } from './BaseComponent.js'
import { Router } from '../Router.js'

export class App extends BaseComponent {
  constructor() {
    super()
    this.content = ``
    this.update = false
  }

  static get observedAttributes() {
    return ['operate']
  }

  async updateSite() {
    debugger
    this.update = true
    this.find('content-app').setAttribute('update', true)
  }

  attributeChangedCallback(prop, oldVal, newVal) {
    if (prop === 'operate' && newVal !== '') {
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
      <content-app update='${this.update}'></content-app>
      <to-do-side-text></to-do-side-text>
    `
  }

  createRenderRoot() {
    return this;
  }
}

export const registerApp = () => customElements.define('app-lister', App)