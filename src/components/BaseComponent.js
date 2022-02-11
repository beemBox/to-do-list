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

  addEventsToArrayOfElements(elements) {
    elements.forEach(element => {
      let el = this.findAll(element[0])
      // verificamos la cantidad de elementos con el selector indicado
      if (el.length === 1) {
        el = el[0]
        el.addEventListener(element[1], this.addPreventDefault(element[2]))
      } else if (el.length > 1) {
        el.forEach(item => {
          item.addEventListener(element[1], this.addPreventDefault(element[2]))
        })
      } else {
        // tiramos error porque no encuentra el/los elemento/s en shadow...
        // pero todavía no hice manejo de errores en el fw.
      }
    })
  }

  // este es un ejemplo de no respetar los principios DRY y YAGNI
  // ya hacía esto de la manera más fácil directamente en el Router
  // que recibía eventos y les metía un preventDefault()... u_u
  addPreventDefault(fn) {
    if (!fn.toString().match('preventDefault()')) {
      if (fn.toString().match(/\{/)) {
        let eventParameter = fn.toString().match(/\([a-zA-Z]{1,}\)/)[0]
        eventParameter = eventParameter.replace(/\(/, '').replace(/\)/, '')
        fn = fn.toString().replace(/\{/, `{\n${eventParameter}.preventDefault()`)
        fn = eval(fn)
        return fn
      }
    } else
      return fn
  }

  addEventListener(element, event, fn) {
    let elements = []
    let newSelectorObj = {}

    // verificamos si se pasan los 3 argumentos o si es un objeto de elementos
    if (arguments.length === 3) {
      elements.push({ 0: element, 1: event, 2: fn })
      this.addEventsToArrayOfElements(elements)
    } else if (arguments.length === 1 && typeof arguments[0] === 'object') {
      // claramente esto necesita documentación jajaja
      // si alguien llegase a usar este mini framework... cosa que lo dudo...
      let objects = arguments[0]
      let propNumber = 0

      for (let key in objects) {
        let objLength = Object.keys(objects[key]).length
        if (objLength === 2) { // se pasa el nombre del obj como elemento
          let selectorName = ''
          if (selectorName === '') {
            selectorName = key
            newSelectorObj[propNumber] = selectorName
            propNumber++
          }
          for (let prop in objects[key]) {
            newSelectorObj[propNumber] = objects[key][prop]
            propNumber++
          }
        } else { // el selector del elemento está dentro del objeto del array
          newSelectorObj[propNumber] = objects[key]
          propNumber++
        }
      }
      elements.push(newSelectorObj)
      this.addEventsToArrayOfElements(elements)
    }
  }

  findAll = selector => this.shadow.querySelectorAll(selector)
  find = selector => this.shadow.querySelector(selector)
}