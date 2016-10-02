import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'

// External CSS
import './assets/css/bootstrap.min.css'
import './assets/css/font-awesome.min.css'

// Initialize Vue Resource
Vue.use(VueResource)

// Init Vue
new Vue({
    router,
    ...App
}).$mount('#app')
