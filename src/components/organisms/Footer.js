import BaseComponent from '../../@LittleComps/BaseComponent.js'

export default class Footer extends BaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.updateContent()
  }

  render() {
    this.innerHTML = `
    <footer class="box footer">Footer
      <a href='https://www.freepik.es/fotos/fondo'>Foto de hero creado por KamranAydinov - www.freepik.es</a>
    </footer>
    `
  }
}

customElements.define('o-footer', Footer)