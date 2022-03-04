// 引入两个函数， 一个是创建路由createRouter，一个是路由模式creatWebHistory
import {createRouter, createWebHistory} from 'vue-router'

// 懒加载组件方式
// const Home = ()=>import('../views/Home.vue')
const Body =() => import('@views/body/Body.vue')
const Home =() => import('@views/main/home/home.vue')
const Mine =() => import('@views/main/mine/Mine.vue')
const Order =() => import('@views/main/order/Order.vue')
const Discover =() => import('@views/main/discover/Discover.vue')
const Deatil =() => import('@comps/detail/Details.vue')
const Menu =() => import('@comps/detail/menu/Menu.vue')
const Merchant =() => import('@comps/detail/merchant/Merchant.vue')
const Evaluate =() => import('@comps/detail/evaluate/Evaluate.vue')

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/',
        name: 'Body',
        component: Body,
        // 配置子路由
        children: [
            {
                path: 'home',
                name: 'Home',
                component: Home
            },
            {
                path: 'discover',
                name: 'Discover',
                component: Discover
            },
            {
                path: 'order',
                name: 'Order',
                component: Order
            },
            {
                path: 'mine',
                name: 'Mine',
                component: Mine
            }
        ]
    },
    {
        path: '/detail',
        name: 'DETAIL',
        component: Deatil,
        children: [
            {
                path: 'menu',
                name: 'MENU',
                component: Menu
            },
            {
                path: 'merchant',
                name: 'MERCHANT',
                component: Merchant
            },
            {
                path: 'evaluate',
                name: 'EVALUATE',
                component: Evaluate
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(), //mode: 'hiestory
    routes
})

export default router