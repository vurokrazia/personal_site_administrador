import Vue from 'vue'
import Vuex from 'vuex'
import authModule from './modules/auth'
import appModule from './modules/app'
import articleModule from './modules/articles'
import categoryModule from './modules/categories'
import imageModule from './modules/images'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    processing: false,
    loaded: false,
    alert: {
      position: "center", // 'top', 'top-start', 'top-end', 'center', 'center-start', 'center-end', 'bottom', 'bottom-start', 'bottom-end'
      icon: "success",
      show: false,
      message: "",
      timeout: 3000,
      toast: true,
      timerProgressBar: true,
      imageUrl:"https://as.com/meristation/imagenes/2020/01/07/header_image/130019411578411635.jpg",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
    },
  },
  mutations: {
    setLoaded: (state, loaded) => {
      state.loaded = loaded;
    },
    setAlertMessage: (state, data) => {
      Object.keys(state.alert).forEach(element => {
        if (data[element])
          state.alert[element] = data[element];
      });
      state.alert.toast = data.toast != null ? data.toast : true;
    }
  },
  actions: {
  },
  modules: {
    authModule,
    appModule,
    articleModule,
    imageModule,
    categoryModule
  }
})
