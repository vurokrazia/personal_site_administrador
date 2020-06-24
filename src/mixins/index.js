import { user_key, token_key } from "./../mixins/var";
import { mapMutations, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["setAlertMessage"]),
    ...mapMutations("authModule", ["setUser"]),
    findStorage() {
      if (localStorage.getItem(user_key)) {
        this.setUser(JSON.parse(localStorage.getItem(user_key)));
        //this.$router.push("/")
      }
    },
    logoutStorage() {
      this.setUser(null);
    },
    copyStringToClipboard(str) {
      console.log(str);
    },
    infiniteScroll(name, accion) {
      var listElm = document.querySelector(name);
      console.log("ok",listElm);
      listElm.addEventListener('scroll', function () {
        console.log("buscando");
        if (listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
          accion()
        }
      });
      
    },
    findProfilePerson() {

    },
    displayErrorMessage(error) {
      if (error && error.data) this.setAlertMessage({
        color: "error",
        timeout: 3000,
        snackbar: "0123456789",
        text: error.data.message,
        confirm: false
      });
      else console.log(error.data);
    },
    displayMessage(message, color) {
      alert(message)
      this.setAlertMessage({
        color: color,
        timeout: 3000,
        snackbar: "0123456789",
        text: message,
        confirm: false
      });
    },
  }
};