import { registerApp } from './components/App.js'
import { registerNav } from './components/Nav.js'
import { registerHeader } from './components/Header.js'
import { registerHero } from './components/Hero.js'
import { registerSideText } from './components/SideText.js'
import { registerLandingPageContent } from './components/LandingPage.js'

const app = async () => {
  registerApp()
  registerNav()
  registerHeader()
  registerHero()
  registerLandingPageContent()
  registerSideText()
}


document.addEventListener('DOMContentLoaded', app);