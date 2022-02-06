import { BaseComponent } from './BaseComponent.js'

export class LandingPage extends BaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.render()
  }


  render() {
    this.shadow.innerHTML = `
    <div class="wrapper-content">
      <aside class="box sidebar">
        <h1>ToDo-List</h1>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam eos architecto fugiat hic, nobis mollitia
          ipsum sequi laudantium, tenetur molestiae dicta quasi error, id esse corporis soluta deleniti quis similique.
        </p>
      </aside>
      <section class="box content">
        <article>
          <h2>Idea de Simulacro</h2>
          <p>El proyecto final será un TO-DO list. De momento no llegué al DOM, pero igual en la consigna se especifica
            por
            prompt o alert o consola.</p>
          <p>Igual este finde se pone heavy esto... tengo que pasar todo a DOM...</p>
          <p>Lo que en la entrega anterior era lista de compras lo migré a lista de tareas tipo to-do list, y ya fui
            arreglando un poco y poniendo funciones de orden superior en esta primera parte de entrega.</p>
        </article>
        <article>
          <h2>Idea de Simulacro</h2>
          <p>El proyecto final será un TO-DO list. De momento no llegué al DOM, pero igual en la consigna se especifica
            por
            prompt o alert o consola.</p>
          <p>Igual este finde se pone heavy esto... tengo que pasar todo a DOM...</p>
          <p>Lo que en la entrega anterior era lista de compras lo migré a lista de tareas tipo to-do list, y ya fui
            arreglando un poco y poniendo funciones de orden superior en esta primera parte de entrega.</p>
        </article>
      </section>
      <footer class="box footer">Footer
        <a href='https://www.freepik.es/fotos/fondo'>Foto de hero creado por KamranAydinov - www.freepik.es</a>
      </footer>
    </div>`
  }
}

export const registerLandinPageContent = () => customElements.define('landing-page', LandingPage)