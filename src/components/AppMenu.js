import { BaseComponent } from './BaseComponent.js'

export class AppMenu extends BaseComponent {
  constructor() {
    super()
    this.shadow.addEventListener('option-select', this.handleEvent)
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
          composed: true
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

        h2,
        ::slotted([slot='app-menu__heading']) {
          text-align: center;
          padding-bottom: 10px;
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
    this.shadow.innerHTML = /*html*/`
    <link id="global-styles" rel="stylesheet" href="../css/style.css">
    ${this.style}
    <section class='app-menu__section'>
      <slot name="app-menu__heading">
        <h2>Menu</h2>
      </slot>
      <div class='app-menu__options'>
        <button class='app__btn--menu create'>Create List</button>
        <button class='app__btn--menu clone'>Clone List</button>
        <button class='app__btn--menu remove'>Remove Lists</button>
      </div>
    </section>
    `
  }
}