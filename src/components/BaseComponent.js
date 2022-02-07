import { Router } from '../Router.js'
import { ComponentsHandler } from './ComponentsHandler.js'

export class BaseComponent extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.content = ''
  }

  static register(elementName, component) {
    customElements.define(elementName, this)
  }

  async updateContent() {
    this.content = await Router.handleLocation()
    this.render()
  }

  routeLink(event) {
    event.preventDefault()
    Router.route(event)
  }

  findAll = selector => this.shadow.querySelectorAll(selector)
  find = selector => this.shadow.querySelector(selector)
}