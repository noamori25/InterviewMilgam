import Vue from 'vue'
import Router from 'vue-router'
import user from '../components/users.vue'
import create from '../components/create-user.vue'
import update from '../components/update-user.vue'

Vue.use(Router)

const routes = [
  {path: '/', component: user},
  {path: '/create', component: create},
  {name: 'update', path: '/update/:id', component: update}

]

export default routes
