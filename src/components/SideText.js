import { BaseComponent } from './BaseComponent.js'

export class SideText extends BaseComponent {
  constructor() {
    super()
  }

  connectedCallback() {
    this.render()
    this.animate()
  }

  animate() {
    // Animamos el sidetext fijo
    gsap.fromTo(
      this.find('.sidetext'),
      { x: -190, opacity: 0 }, { x: 0, opacity: 1, delay: 3 }
    )

    // spliteamos el texto
    const sidetext = this.find('.sidetext p')
    const letters = sidetext.textContent.split('')
    let href, a

    if (sidetext.innerHTML.includes('href')) {
      a = sidetext.querySelector('a')
      a.innerHTML = ''
    }
    sidetext.innerHTML = ''
    let isLink = false

    letters.forEach((letter) => {
      if (letter === '@')
        isLink = !isLink

      let span = document.createElement('span')
      span.classList.add('letter')
      span.innerHTML = letter === ' ' ? '&nbsp' : letter

      if (!isLink)
        sidetext.appendChild(span)
      else {
        a.appendChild(span)
      }
    })

    if (isLink)
      sidetext.appendChild(a)
    // agregamos varias clases letter en cada span, usamos findAll de BaseComponent
    gsap.set(this.findAll('.letter'), { display: 'inline-block' })
    gsap.fromTo(this.findAll('.letter'), { y: 30 }, { y: 0, delay: 3.5, stagger: 0.05 })
  }

  render() {
    this.shadow.innerHTML = `
    <link id="global-styles" rel="stylesheet" href="../css/style.css">
    <div class="sidetext">
      <p>Proyecto Final JavaScript <a href='https://www.coderhouse.com/' target='_blank'>@CoderHouse</a></p>
    </div>
    `
  }
}