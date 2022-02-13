
// import './assets/css/style.css'
// import './assets/vendors/gsap.min.js'
import { $LConfig } from './@LittleComps/Core.js'
import App from './components/App.js'
import Nav from './components/Nav.js'
import Header from './components/Header.js'
import Hero from './components/Hero.js'
import SideText from './components/SideText.js'
import LandingPage from './components/LandingPage.js'
import MyTasks from './components/MyTasks.js'
import Footer from './components/Footer.js'
import TasksList from './components/TaskList.js'
import AppMenu from './components/AppMenu.js'

// estos imports me parece que se van a ComponentsHandler.js así no me copan todo el app.js
$LConfig({
  components: [{
    'app-lister': App,
    'nav-bar': Nav,
    'app-header': Header,
    'to-do-hero': Hero,
    'side-text': SideText,
    'landing-page': LandingPage,
    'app-footer': Footer,
    'my-tasks': MyTasks,
    'tasks-list': TasksList,
    'app-menu': AppMenu
  }],
  bootstrap: [App],
  routes: {
    '/': 'landing-page',
    '/my-tasks': 'my-tasks',
    '/create-list': 'create-list'
    // 404: '/src/templates/error-404.html'
  }
})

