import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import tooltipDirective from '@/directives/tooltip.directive'
import messagePlugin from '@/common/message.plugin'
import Loader from '@/components/app/Loader'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)

firebase.initializeApp({
  apiKey: "AIzaSyBPt3fBvFfELV4GtShJWtCeSg-vY2UHyyQ",
  authDomain: "mazashib-vue-crm.firebaseapp.com",
  databaseURL: "https://mazashib-vue-crm.firebaseio.com",
  projectId: "mazashib-vue-crm",
  storageBucket: "mazashib-vue-crm.appspot.com",
  messagingSenderId: "768558975289",
  appId: "1:768558975289:web:8d96195b7629ec64e040e8",
  measurementId: "G-WQ8N0M05GS"
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
