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

  async getInnerHTML() {
    // let indicesPalabra = []
    // let lowerCasedword = ''
    // let arrCharacters = []
    // let nombreHtml = ''
    // let html = ''

    // const nombreClase = this.__proto__.constructor.name.toString()

    // for (let i = 0; i < nombreClase.length; i++) {
    //   let character = nombreClase.charAt(i)
    //   if (character === character.toUpperCase() && i !== 0) // ya se sabe que la primera está en upper-case
    //     indicesPalabra.push(i)
    // }


    // for (let j = 0; j < indicesPalabra.length; j++) {
    //   if (j === 0)
    //     nombreHtml = nombreClase.split('').splice(j, indicesPalabra[j]).join('')

    //   arrCharacters = nombreClase.split('').splice(indicesPalabra[j])
    //   arrCharacters.unshift('-')
    //   nombreHtml += arrCharacters.join('')
    // }
    // nombreHtml = `../templates/${nombreHtml.toLowerCase()}.html`

    // // busco el template
    // fetch(nombreHtml)
    //   .then(data => {
    //     html = data
    //   })

    return await Router.handleLocation()
  }



  findAll = selector => this.shadow.querySelectorAll(selector)
  find = selector => this.shadow.querySelector(selector)
}