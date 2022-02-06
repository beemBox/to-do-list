export class Header extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this.shadow.innerHTML = `
    <link id="global-styles" rel="stylesheet" href="../css/style.css">
    <header class="box header">
    <nav>
      <div class="logo">
        <h1>My Lister</h1>
      </div>
      <ul>
        <li>Algo</li>
        <li>Nueva</li>
        <li>Cosas</li>
        <li>Perfil?</li>
      </ul>
    </nav>
  </header>`
  }
}

export const registerHeader = () => customElements.define('app-header', Header)