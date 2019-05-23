import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

if (document.browsertype===0 || document.browsertype>=10) {
  new Vue({
    render: h => h(App),
  }).$mount('#app')
}
