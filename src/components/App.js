import ContentApp from '../@LittleComps/ContentApp.js'
import Router from '../@LittleComps/Router.js'

export default class App extends ContentApp {
  constructor() {
    super()
    this.content = ``
    this.update = false
  }

  static get observedAttributes() {
    return ['onupdate']
  }

  async updateContent() {
    this.content = await Router.handleLocation()
    this.render()
    this.setAttribute('onupdate', false)
  }

  attributeChangedCallback(prop, oldVal, newVal) {
    if (prop === 'onupdate' && (newVal !== '' && newVal !== 'false')) {
      this.updateContent()
    }
    this.animateContentChange()
  }

  animateContentChange() {
    let theContent = this.find('#wrapper')
    gsap.fromTo(theContent,
      { opacity: 0 },
      { opacity: 1, delay: 0.35, duration: 1 })
  }

  connectedCallback() {
    this.setAttribute('onupdate', false)
    this.render()
  }

  render() {
    this.innerHTML = `
      <app-header></app-header>
      <div id='wrapper'>
      ${this.content}
      </div>
      <side-text></side-text>
      <app-footer></app-footer>
    `
  }

  createRenderRoot() {
    return this;
  }
}
