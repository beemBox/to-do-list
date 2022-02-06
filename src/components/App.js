import { BaseComponent } from './BaseComponent.js'

const app = async () => {
  registerNav()
  registerHeader()
  registerHero()
  registerLandingPageContent()
  registerSideText()
}

export class App extends BaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this.shadow.innerHTML = `
      <link id="global-styles" rel="stylesheet" href="../css/style.css">
      <app-header></app-header>
      <to-do-hero></to-do-hero>
      <landing-page></landing-page>
      <to-do-side-text></to-do-side-text>
    `
  }

  createRenderRoot() {
    return this;
  }
}

export const registerApp = () => customElements.define('app-lister', App)