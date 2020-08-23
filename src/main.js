import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

//引用、调用router
import router from './router'
//引用、使用elementUi
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.prototype.axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
