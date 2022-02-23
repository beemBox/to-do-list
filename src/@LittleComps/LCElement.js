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
    const el = document.createElement(this.localName.split('-')[1])
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
        case 'type':
          if (!el.hasAttribute('type')) {
            this.type = prop.value
            el.setAttribute('type', this.class)
          }
        default:
          this.props[prop.name] = prop.value
      }
    })
    this.text = this.innerHTML
    this.innerHTML = ''
    el.innerText = this.text
    this.template = `${el}`

    this.appendChild(el)
  }

  connectedCallback() {
    //this.setProps()
  }

  set template(value) {
    this._template = value;
  }
}