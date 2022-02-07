import { Router } from './Router.js'
import { App, registerApp } from './components/App.js'
import { registerNav } from './components/Nav.js'
import { registerHeader } from './components/Header.js'
import { registerHero } from './components/Hero.js'
import { registerSideText } from './components/SideText.js'
import { registerLandingPageContent } from './components/LandingPage.js'
import { registerContentApp } from './components/ContentApp.js'

const app = async () => {
  registerApp()
  registerNav()
  registerContentApp()
  registerHeader()
  registerHero()
  registerLandingPageContent()
  registerSideText()
}

document.addEventListener('DOMContentLoaded', app);
document.addEventListener('link', e => {
  debugger
  e.target.setAttribute('operate', 'link')
  Router.handleLocation()
})