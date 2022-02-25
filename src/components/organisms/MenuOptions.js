import BaseComponent from "../../@LittleComps/BaseComponent"
import '../atoms/atoms'

const htmlTemplate = /*html*/
  `<section class='app-menu__section'>
    <m-subheading name="app-menu__heading"></m-subheading>
    <div class='app-menu__options'>
      <a-button class='app__btn--menu create'>Create List</a-button>
      <a-button class='app__btn--menu clone'>Clone List</a-button>
      <a-button class='app__btn--menu remove'>Remove Lists</a-button>
    </div>
  </section>
  `

export default class MenuOptions extends BaseComponent {

  constructor() {
    super()
    this._template = htmlTemplate
  }

  connectedCallback() {
    this.render()
    this.addMenuEventListeners()
  }

  addMenuEventListeners() {
    const btns = this.findAll('button')

    for (let btn of btns) {
      btn.addEventListener('click', (e) => {
        e.target.dispatchEvent(new CustomEvent('option-select', {
          bubbles: true,
          composed: true // esto es para shadow DOM
        })
        )
      })
    }
  }

  render() {
    this.innerHTML = this._template
  }
}

customElements.define('o-menu-options', MenuOptions)