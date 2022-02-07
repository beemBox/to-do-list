import { BaseComponent } from './BaseComponent.js'
import { Nav } from './Nav.js'

export class Header extends BaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this.shadow.innerHTML = `
    <link id="global-styles" rel="stylesheet" href="../css/style.css">
    <header class="box header">
      <nav-bar></nav-bar>
    </header>`
  }
}
