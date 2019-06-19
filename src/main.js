import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './assets/style/main.scss';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faEdit, faPlus, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTrash)
library.add(faEdit)
library.add(faPlus)
library.add(faArrowCircleLeft)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
