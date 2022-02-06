export class Hero extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  animateGsap() {
    const find = selector => this.shadow.querySelectorAll(selector)
    const tl = gsap.timeline({
      defaults: {
        duration: 0.75,
        ease: 'Power3.easeOut'
      }
    })

    tl.fromTo(find('.img-container'),
      {
        scale: 1.4,
        borderRadius: '0rem'
      },
      {
        scale: 1,
        borderRadius: '2rem',
        delay: 0.35,
        duration: 2.5,
        ease: 'elastic.out(1.5,1)'
      }
    );

    tl.fromTo(find('.cta1'),
      { x: '100%', opacity: 0 },
      { x: 0, opacity: 1 }, '<20%'
    )
    tl.fromTo(find('.cta2'),
      { y: '-100%', opacity: 0 },
      { y: 0, opacity: 1 }, '<20%'
    )
    tl.fromTo(find('.cta3'),
      { y: '-100%', opacity: 0 },
      { y: 0, opacity: 1 }, '<40%'
    )
    tl.fromTo(find('.cta4'),
      { x: '100%', opacity: 0 },
      { x: 0, opacity: 1 }, '<40%'
    )
    tl.fromTo(find('.cta6'),
      { x: '-100%', opacity: 0 },
      { x: 0, opacity: 1 }, '<40%'
    )
    tl.fromTo(find('.cta5'),
      { y: '100%', opacity: 0 },
      { y: 0, opacity: 1 }, '<40%'
    )

    tl.fromTo(find('.create-list'),
      { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, '<')
  }

  connectedCallback() {
    this.render()
    this.animateGsap()
  }

  render() {
    this.shadow.innerHTML = `
    <link id="global-styles" rel="stylesheet" href="../css/style.css">
    <section class="hero">
      <div class="img-container">
      </div>
      <div class="cta">
        <div class="cta-text logo">
          <h2><span class="cta1">MY</span></h2>
          <h2><span class="cta2">LISTER</span></h2>
        </div>
        <div class="cta-text">
          <h2><span class="cta3">TO</span></h2>
          <h2><span class="cta4">-</span></h2>
          <h2><span class="cta5">DO</span></h2>
          <h2><span class="cta6">LIST</span></h2>
        </div>
        <button class="create-list">Create a new List</button>
      </div>
    </section>
    <script src="vendors/gsap.min.js"></script>
    <script src="animate.js"></script>`
  }
}

export const registerHero = () => customElements.define('to-do-hero', Hero)