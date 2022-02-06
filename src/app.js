import { BaseComponent } from './baseComponent.js'
import { registerNav } from './nav.js'
import { registerHeader } from './header.js'
import { registerHero } from './hero.js'
import { registerSideText } from './sidetext.js'

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