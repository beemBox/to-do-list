import BaseComponent from '../@mini-core/BaseComponent.js'
import Router from '../@mini-core/Router.js'

export default class App extends BaseComponent {
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
    this.innerHTML = `
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
