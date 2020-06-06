import Vue from 'vue'
import Vuex from 'vuex'
import authModule from './modules/auth'
import appModule from './modules/app'
import articleModule from './modules/articles'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    authModule,
    appModule,
    articleModule
  }
})
