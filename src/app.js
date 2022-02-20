import './assets/vendors/gsap.min.js';
import './assets/css/style.scss';
import { $LConfig } from './@LittleComps/Core.js';
import App from './components/App.js';
import Nav from './components/Nav.js';
import Header from './components/Header.js';
import Hero from './components/Hero.js';
import SideText from './components/SideText.js';
import ToDoListContent from './components/ToDoListContent.js';
import MyTasks from './components/MyTasks.js';
import Footer from './components/Footer.js';
import TasksList from './components/TaskList.js';
import AppMenu from './components/AppMenu.js';

// Simulando el decorator pattern, aunque básicamente hace algo similar
$LConfig({
  components: [
    {
      'lister-app': App, // verificado que toma cualquier nombre y funciona el fw
      'nav-bar': Nav,
      'app-header': Header,
      'to-do-hero': Hero,
      'side-text': SideText,
      'to-do-list-content': ToDoListContent,
      'app-footer': Footer,
      'my-tasks': MyTasks,
      'tasks-list': TasksList,
      'app-menu': AppMenu,
    },
  ],
  bootstrap: [App],
  routes: {
    '/': 'landing-page',
    '/my-tasks': 'my-tasks',
    '/create-list': 'create-list',
    // 404: '/src/templates/error-404.html'
  },
});
