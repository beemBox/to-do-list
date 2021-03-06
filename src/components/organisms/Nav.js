import BaseComponent from '../../@LittleComps/BaseComponent.js';
import Router from '../../@LittleComps/Router.js';

export default class Nav extends BaseComponent {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['link'];
  }

  attributeChangedCallback() { }

  connectedCallback() {
    this.render();
    let btns = this.findAll('a');
    // respetamos el YAGNI principle y volvemos esto a la normalidad
    btns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        this.animateContentChange();
        this.routeLink(e);
      });
    });
  }

  animateContentChange() {
    let theContent = this.find('#wrapper');
    gsap.to(theContent, {
      opacity: 0,
      duration: 1,
      delay: 0.35,
    });
  }

  render() {
    this.innerHTML = /*html*/ `
    <nav>
      <a href='/'>
        <div class="logo">
          <h1>iJOTTER</h1>
        </div>
      </a>
      <ul>
        <li><a href='/my-tasks'>My Tasks</a></li>
        <li><a href='/profile'>Profile</a></li>
      </ul>
    </nav>`;
  }
}

customElements.define('o-nav-bar', Nav)