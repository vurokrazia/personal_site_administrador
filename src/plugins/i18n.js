import Vue from "vue";
import VueI18n from "vue-i18n";
import store from "../store";
import messages from "../i18n/";
Vue.use(VueI18n);
export default new VueI18n({
  locale: "es-es", //store.state.app.language
  fallbackLocale: "es-es",
  messages
});
