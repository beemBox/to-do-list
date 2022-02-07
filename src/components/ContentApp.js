import { BaseComponent } from './BaseComponent.js'

export class ContentApp extends BaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this.shadow.innerHTML =
      `
      <link id="global-styles" rel="stylesheet" href="../css/style.css">
      <to-do-hero></to-do-hero>
      <landing-page></landing-page>`
  }
}

export const registerContentApp = () => customElements.define('content-app', ContentApp)