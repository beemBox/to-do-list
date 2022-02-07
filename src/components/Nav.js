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

  }

  connectedCallback() {
    this.render()
    let links = this.findAll('a')
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        this.animateContentChange()
        this.routeLink(e)
      })
    })
  }

  animateContentChange() {
    let theContent = this.find('#the-content')
    gsap.to(theContent,
      {
        opacity: 0,
        duration: 5,
        delay: 0.0,
      }
    )
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
        <li><a href='/create-list'>Nueva Tarea</a></li>
        <li><a href='/my-tasks'>Mis Tareas</a></li>
        <li><a href='/profile'>Crear Perfil</a></li>
      </ul>
    </nav>`
  }
}
