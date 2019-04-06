import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
Vue.use(BootstrapVue)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { TeacherNode, RTCNode }  from './rtc.js'
import { ClientSocket }  from './client-socket.js'
import { SimplePeer } from './simplepeer.min.js'
import $ from './jquery-3.3.1.min.js'

import SplashPage from './components/SplashPage.vue'
import Classroom from './components/Classroom.vue'

const router = new VueRouter({
  routes: [
    { path: '/', component: SplashPage },
    { path: '/room', component: Classroom },
  ]
})

Vue.config.productionTip = false

new Vue({
  //router
  render: h => h(SplashPage),
}).$mount('#app')
