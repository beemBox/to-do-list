import { BaseComponent } from './BaseComponent.js'

export class LandingPage extends BaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.updateContent()
  }


  render() {
    this.shadow.innerHTML = this.content
  }
}
