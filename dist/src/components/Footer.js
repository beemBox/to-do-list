import { BaseComponent } from './BaseComponent.js'

export class Footer extends BaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.updateContent()
  }

  render() {
    this.shadow.innerHTML = `
    <footer class="box footer">Footer
      <a href='https://www.freepik.es/fotos/fondo'>Foto de hero creado por KamranAydinov - www.freepik.es</a>
    </footer>
    `
  }
}