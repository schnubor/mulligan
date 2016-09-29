import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CardView from '../views/CardView.vue'

Vue.use(Router)

const routes = [
    { path: '/', component: HomeView },
    { path: '/card/:id', component: CardView }
]

export default new Router({
    mode: 'history',
    scrollBehavior: () => ({
        y: 0
    }),
    routes
})
