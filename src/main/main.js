import Vue from 'vue'
import Main from './main.vue'

import { router } from '../router'
import store from '../store'

import Meta from 'vue-meta'
Vue.use(Meta)

import VueResource from 'vue-resource'
Vue.use(VueResource)

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

import Notifications from 'vue-notification'
Vue.use(Notifications)

Vue.config.productionTip = false

new Vue({
	render: h => h(Main),
	router: router(store.state.config),
	store
}).$mount('#main')
