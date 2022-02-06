export class BaseComponent extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  findAll = selector => this.shadow.querySelectorAll(selector)
  find = selector => this.shadow.querySelector(selector)
}