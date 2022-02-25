import BaseComponent from './BaseComponent'
import { v4 as uuid4 } from 'uuid'

const lc_id = Symbol('lc-id')
export default class LCElement extends BaseComponent {
  _template = '';

  constructor() {
    super()
    this.setProps()
  }

  setProps() {
    let el

    if (!this.hasAttribute('element'))
      el = document.createElement(this.localName.split('-')[1])
    else
      el = document.createElement(this.getAttribute('element'))

    const props = Array.prototype.slice.call(this.attributes)
    this[lc_id] = uuid4()
    el.setAttribute('lc-id', this[lc_id])

    props.forEach(prop => {
      switch (prop.name) {
        case 'class':
          if (!el.hasAttribute('class')) {
            this.class = prop.value
            el.setAttribute('class', this.class)
          }
          break
        case 'id':
          if (!el.hasAttribute('id')) {
            this.id = prop.value
            el.setAttribute('id', this.class)
          }
          break
        case 'text':
          this.text = prop.value
          break
        case 'type':
          if (!el.hasAttribute('type')) {
            this.type = prop.value
            el.setAttribute('type', this.class)
          }
      }
    })
    el.innerText = this.text ?? this.innerHTML
    this.innerHTML = ''
    this.template = `${el}`

    if (this.hasAttribute('before'))
      this.parentElement.insertBefore(el, this.nextSibling)
    else
      this.parentElement.appendChild(el)

    this.parentElement.removeChild(this)
  }

  connectedCallback() {
    //this.setProps()
  }

  set template(value) {
    this._template = value;
  }
}