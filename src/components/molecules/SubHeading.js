import Basecomponent from "../../@LittleComps/BaseComponent"
import '../atoms/atoms'

export default class SubHeading extends Basecomponent {

  constructor() {
    super()
    this._template =
      this.text = 'Menu'
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this.innerHTML = /*html*/`
    <slot name="app-menu__heading">
      <a-heading element='h2' class='app-menu__text'>${this.text}</a-heading>
    </slot>`
  }
}

customElements.define('m-subheading', SubHeading)