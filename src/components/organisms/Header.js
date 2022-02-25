import BaseComponent from '../../@LittleComps/BaseComponent.js'
import Nav from './Nav'

export default class Header extends BaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this.innerHTML = `
    
    <header class="box header">
      <o-nav-bar></o-nav-bar>
    </header>`
  }
}

customElements.define('o-header', Header)