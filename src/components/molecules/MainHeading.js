import BaseComponent from "../../@LittleComps/BaseComponent"
import '../atoms/atoms'

export default class MainHeading extends BaseComponent {

  constructor() {
    super()
    this.text = 'My Tasks'
  }

  connectedCallback() {
    this.render()
    this.animateHr()
  }

  get style() {
    return /*html*/ `
    <style>
      h2,
        ::slotted([slot='app-menu__heading']) {
          text-align: center;
          padding-bottom: 10px;
        }
    </style>
    `
  }

  animateHr() {
    let hr = this.find('hr')
    gsap.fromTo(hr, { width: '0%' }, { width: '100%', duration: 1.2, delay: 0.3 })
  }

  render() {
    this.innerHTML = /*html*/`
  <div class="app-content__title title">
    <a-heading element='h1' before>${this.text}</a-heading>
    <hr />
  </div>`
  }
}

customElements.define('m-mainheading', MainHeading)