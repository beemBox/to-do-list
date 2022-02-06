import { BaseComponent } from './BaseComponent.js'

export class Nav extends BaseComponent {
  constructor() {
    super()
  }
}

export const registerNav = () => customElements.define('nav-bar', Nav)