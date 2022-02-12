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
    <link id="global-styles" rel="stylesheet" href="../css/style.css">
    <header class="box header">
      <nav-bar></nav-bar>
    </header>`
  }
}
