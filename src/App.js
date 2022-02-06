import { BaseComponent } from './BaseComponent.js'
import { registerNav } from './Nav.js'
import { registerHeader } from './Header.js'
import { registerHero } from './Hero.js'
import { registerSideText } from './SideText.js'
import { registerLandingPageContent } from './landingPage.js'

const app = async () => {
  registerNav()
  registerHeader()
  registerHero()
  registerSideText()
}

class App extends BaseComponent {
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
      <to-do-side-text></to-do-side-text>
    `
  }

  createRenderRoot() {
    return this;
  }
}

window.customElements.define('app-lister', App)


document.addEventListener('DOMContentLoaded', app);