import { Router } from './Router.js'
import { App, registerApp } from './components/App.js'
import { registerNav } from './components/Nav.js'
import { registerHeader } from './components/Header.js'
import { registerHero } from './components/Hero.js'
import { registerSideText } from './components/SideText.js'
import { registerLandingPageContent } from './components/LandingPage.js'
import { registerContentApp } from './components/ContentApp.js'
import { registerMyTasks } from './components/MyTasks.js'
// estos imports me parece que se van a ComponentsHandler.js así no me copan todo el app.js

const app = async () => {
  registerApp()
  registerNav()
  registerContentApp()
  registerHeader()
  registerHero()
  registerLandingPageContent()
  registerSideText()
  registerMyTasks()
}

document.addEventListener('DOMContentLoaded', app);
document.addEventListener('link', e => {
  e.target.setAttribute('operate', 'link')
  Router.handleLocation()
})