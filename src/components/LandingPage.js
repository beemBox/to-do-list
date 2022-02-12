import BaseComponent from '../@mini-core/BaseComponent.js'

export default class LandingPage extends BaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.updateContent()
  }


  render() {
    this.innerHTML = this.content
  }
}
