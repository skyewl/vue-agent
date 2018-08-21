// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引用layer文件
import layer from '../static/js/layer'
// 引用API文件
import api from './api'
import utils from './utils'
import VueClipboard from 'vue-clipboard2'

// 将API方法绑定到全局
Vue.prototype.$api = api
// 将layer方法绑定到全局
Vue.prototype.$layer = layer
Vue.prototype.$utils = utils
Vue.use(VueClipboard)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
