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
      <side-text></side-text>
      <app-footer></app-footer>
    `
  }

  createRenderRoot() {
    return this;
  }
}
