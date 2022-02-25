import BaseComponent from '../../@LittleComps/BaseComponent'
import '../molecules/molecules'

export default class TaskListsMenu extends BaseComponent {
  constructor() {
    super()
    this.addEventListener('option-select', this.handleEvent)
  }

  handleEvent() {
    debugger
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
          composed: false // esto es para shadow DOM
        })
        )
      })
    }
  }

  get style() {
    return /*html*/`
      <style>
        :host {
          display: block;
        }

        :host * {
          box-sizing: border-box;
        }

        .app-menu__section {
          position: relative;
        }
      
        .app-menu__section .app-menu__options {
          padding: 0 10px;
          display: grid;
          grid-template-columns: minmax(90px, 1fr);
        }

        .app-menu__section .app-menu__options .app-menu__btn {
          display: block;
        }

      </style>
    `
  }

  render() {
    this.innerHTML = /*html*/`
    
    <section class='app-menu__section'>
      <m-subheading name="app-menu__heading"></m-subheading>
      <o-menu-options menu-app></o-menu-options>
    </section>
    `
  }
}

customElements.define('o-')