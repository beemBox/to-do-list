import LCElement from "../../@LittleComps/LCElement"

export default class Button extends LCElement {
  template = 'this'
  constructor() {
    super()
  }

  connectedCallback() {
    // console.log(this['lc_id'])
  }
}

customElements.define('a-button', Button)