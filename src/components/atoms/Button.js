import LCElement from "../../@LittleComps/LCElement"

export default class Button extends LCElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.render()
  }
}

customElements.define('a-button', Button)