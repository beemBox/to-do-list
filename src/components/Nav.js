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
    let btns = this.findAll('a')
    // respetamos el YAGNI principle y volvemos esto a la normalidad
    btns.forEach(btn => {
      btn.addEventListener('click', (e) => {
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
    this.shadow.innerHTML = /*html*/`
    <link id="global-styles" rel="stylesheet" href="../css/style.css">
    <nav>
      <a href='/'>
        <div class="logo">
          <h1>My Lister</h1>
        </div>
      </a>
      <ul>
        <li><a href='/my-tasks'>My Tasks</a></li>
        <li><a href='/profile'>Profile</a></li>
      </ul>
    </nav>`
  }
}
