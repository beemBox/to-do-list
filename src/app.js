import "core-js/modules/es.promise";
import "core-js/modules/es.array.iterator";
import './assets/css/style.scss'
import { $LConfig } from './@LittleComps/Core'
import * as Organisms from './components/organisms/organisms'
import App from './components/App'

// Simulando el decorator pattern, aunque básicamente hace algo similar
$LConfig({
  components: [
    {
      'ijotter-app': App, // verificado que toma cualquier nombre y funciona el fw
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
