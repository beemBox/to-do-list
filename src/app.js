import './assets/css/style.scss';
import { $LConfig } from './@LittleComps/Core';
import App from './components/App';
import Nav from './components/Nav';
import Header from './components/Header';
import Hero from './components/Hero';
import SideText from './components/SideText';
import ToDoListContent from './components/ToDoListContent';
import MyTasks from './components/MyTasks';
import Footer from './components/Footer';
import TasksList from './components/TaskList';
import AppMenu from './components/AppMenu';

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
