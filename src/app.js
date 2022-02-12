
import './assets/css/style.css'
import './assets/vendors/gsap.min.js'
import Router from '../@mini-core/Router.js'
import ComponentsHandler from '../@mini-core/ComponentsHandler.js'
import App from '../@mini-core/App.js'
import Nav from './components/Nav.js'
import Header from './components/Header.js'
import Hero from './components/Hero.js'
import SideText from './components/SideText.js'
import LandingPage from './components/LandingPage.js'
import ContentApp from '../@mini-core/ContentApp.js'
import MyTasks from './components/MyTasks.js'
import Footer from './components/Footer.js'
import TasksList from './components/TaskList.js'
import AppMenu from './components/AppMenu'

// estos imports me parece que se van a ComponentsHandler.js así no me copan todo el app.js

const app = async () => {
  // asignamos los nombres de elementos a los componentes (para registrarlos)
  ComponentsHandler.Components = {
    'app-lister': App,
    'nav-bar': Nav,
    'app-header': Header,
    'to-do-hero': Hero,
    'side-text': SideText,
    'content-app': ContentApp,
    'landing-page': LandingPage,
    'app-footer': Footer,
    'my-tasks': MyTasks,
    'tasks-list': TasksList,
    'app-menu': AppMenu
  }

  Router.start()
}

document.addEventListener('DOMContentLoaded', app);
document.addEventListener('link', e => {
  e.target.setAttribute('operate', 'link')
  Router.handleLocation()
})