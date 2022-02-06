import { registerNav } from './nav.js'
import { registerHeader } from './header.js'
import { registerHero } from './hero.js'

const app = async () => {
  registerNav()
  registerHeader()
  registerHero()
}

class App extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this.shadow.innerHTML = `
      <link id="global-styles" rel="stylesheet" href="../css/style.css">
      <app-header></app-header>
      <to-do-hero></to-do-hero>
    `
  }

  createRenderRoot() {
    return this;
  }
}

customElements.define('app-lister', App)


document.addEventListener('DOMContentLoaded', app);