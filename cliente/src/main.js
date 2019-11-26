import Vue from 'vue'
import App from './App.vue'
import VueAxios from 'vue-axios';
import axios from 'axios';
import 'materialize-css/dist/css/materialize.css';
import 'materialize-css/dist/js/materialize.js';


Vue.use(VueAxios, axios);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
