import { BaseComponent } from './BaseComponent.js'
import { Router } from '../Router.js'

export class Nav extends BaseComponent {
  constructor() {
    super()
  }

  static get observedAttributes() {
    return ['link']
  }

  attributeChangedCallback() {
    debugger
  }

  connectedCallback() {
    this.render()
    let links = this.findAll('a')
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        Router.route(e)
      })
    })
  }

  render() {
    this.shadow.innerHTML = `
    <link id="global-styles" rel="stylesheet" href="../css/style.css">
    <nav>
      <a href='/'>
        <div class="logo">
          <h1>My Lister</h1>
        </div>
      </a>
      <ul>
        <li><a href='/algo'>Nueva Tarea</a></li>
        <li><a href='/mis-tareas'>Mis Tareas</a></li>
        <li><a href='/perfil'>Crear Perfil</a></li>
      </ul>
    </nav>`
  }
}

export const registerNav = () => customElements.define('nav-bar', Nav)