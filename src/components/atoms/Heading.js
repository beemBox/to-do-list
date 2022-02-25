import LCElement from "../../@LittleComps/LCElement"

export default class Heading extends LCElement {
  template = ''

  constructor() {
    super()
  }

  connectedCallback() {
    // console.log(this[lc_id])
  }
}

customElements.define('a-heading', Heading)