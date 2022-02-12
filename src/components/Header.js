import BaseComponent from '../../@mini-core/BaseComponent.js'
import Nav from './Nav.js'

export default class Header extends BaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this.shadow.innerHTML = `
    
    <header class="box header">
      <nav-bar></nav-bar>
    </header>`
  }
}
