import BaseComponent from './BaseComponent'

export default class LCElement extends BaseComponent {
  _template = '';

  constructor(...config) {
    debugger;
    this.register('lc-element')
    this.render()
  }

  connectedCallback() {
    this.render()
  }

  set template(value) {
    this._template = value;
  }

  render() {
    this.outerHTML = this.template;
  }
}