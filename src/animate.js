
const tl = gsap.timeline({
  defaults: {
    duration: 0.75,
    ease: 'Power3.easeOut'
  }
})

tl.fromTo('.img-container',
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

tl.fromTo('.cta1',
  { x: '100%', opacity: 0 },
  { x: 0, opacity: 1 }, '<20%'
)
tl.fromTo('.cta2',
  { y: '-100%', opacity: 0 },
  { y: 0, opacity: 1 }, '<20%'
)
tl.fromTo('.cta3',
  { y: '-100%', opacity: 0 },
  { y: 0, opacity: 1 }, '<40%'
)
tl.fromTo('.cta4',
  { x: '100%', opacity: 0 },
  { x: 0, opacity: 1 }, '<40%'
)
tl.fromTo('.cta6',
  { x: '-100%', opacity: 0 },
  { x: 0, opacity: 1 }, '<40%'
)
tl.fromTo('.cta5',
  { y: '100%', opacity: 0 },
  { y: 0, opacity: 1 }, '<40%'
)

tl.fromTo('.create-list',
  { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, '<')


// Animamos el sidetext fijo
gsap.fromTo(
  '.sidetext',
  { x: -30, opacity: 0 }, { x: 0, opacity: 1, delay: 1 }, '<70%'
)

// spliteamos el texto
const sidetext = document.querySelector('.sidetext p')
const letters = sidetext.textContent.split('')
sidetext.innerHTML = ''
letters.forEach((letter) => {
  let span = document.createElement('span')
  span.classList.add('letter')
  span.innerHTML = letter === ' ' ? '&nbsp' : letter
  sidetext.appendChild(span)

})
gsap.set('.letter', { display: 'inline-block' })
gsap.fromTo('.letter', { y: 30 }, { y: 0, delay: 3.5, stagger: 0.05 })
