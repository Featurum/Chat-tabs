import Vue from 'vue'

import Router from 'vue-router'
Vue.use(Router)

import { isLoggedIn } from '@/functions/auth.js'

const defaultContainer = () => import('@/services/defaultContainer.vue')
const pagePage = () => import('@/services/login/page/')
const pageChat = () => import('@/services/chat/page/')

/* Управление скролом при переходах */
const scrollBehavior = function (to, from, savedPosition) {
    if (savedPosition || to.params.noreload) {
        return savedPosition
    } else {
        return { x: 0, y: 0 }
    }
};

const beforeEnterChat = function (to, from, next) {
    if (isLoggedIn()) {
        next()
    } else {
        next({ name: 'mainLogin' })
    }
}

const beforeEnterLogin = function (to, from, next) {
    if (!isLoggedIn()) {
        next()
    } else {
        next({ name: 'mainChat' })
    }
}

export function router() {
    return new Router({
        // mode: 'history',
        scrollBehavior,
        routes: [
            {
                name: 'mainLogin',
                path: '/login',
                component: pagePage,
                beforeEnter: beforeEnterLogin
            },
            {
                name: 'main',
                path: '/',
                component: defaultContainer,
                redirect: { name: 'mainChat'},
                children: [
                    { name: 'mainChat',  path: '/chat', component: pageChat }
                ],
                beforeEnter: beforeEnterChat
            }
        ]
    });
}

