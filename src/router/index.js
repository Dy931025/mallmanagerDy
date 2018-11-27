import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
<<<<<<< HEAD
import Users from '@/components/users/users.vue'
=======
import User from '@/components/user/user.vue'
>>>>>>> dev-user
Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home,
<<<<<<< HEAD
      children:[
        {
          name:'users',
          path:'users',
          component:Users
        }
      ]
=======
      children:[{
        name:'user',
        path:'user',
        component:User
      }]
>>>>>>> dev-user
    }
  ]
})
