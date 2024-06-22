import { createRouter, createWebHistory } from 'vue-router'
import Show from './Pages/Show.vue'
import Insert from './Pages/Insert.vue'
import AuthRegister from './Pages/auth_register.vue'
import Login from './Pages/Login.vue'

const routes = [
    { path: '/', name: 'Show', component: Show },
    { path: '/insert', name: 'Insert', component: Insert },
    { path: '/auth_register', name: 'AuthRegister', component: AuthRegister },
    { path: '/login', name: 'Login', component: Login }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
