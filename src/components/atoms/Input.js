import LCElement from "../../@LittleComps/LCElement"

export default class Input extends LCElement {
  template = ''

  constructor() {
    super()
  }

  connectedCallback() {
    // console.log(this[lc_id])
  }
}

customElements.define('a-input', Input)