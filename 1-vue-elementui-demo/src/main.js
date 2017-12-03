// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// 引入组件库
import ElementUI from 'element-ui'
// 引入样式
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
// 使用ElementUI
Vue.use(ElementUI)
Vue.config.productionTip = false

// 把主机接口定义为全局变量
global.ApiUrl = 'http://localhost:3000/api/v1'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
