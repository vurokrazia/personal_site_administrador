import { user_key, token_key } from "../env_files/var";
import { mapMutations, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapMutations(["setAlertMessage"]),
    ...mapMutations("authModule", ["setUser"]),
    ...mapActions("authModule", ["me"]),

    findStorage() {
      //me
      let token = localStorage.getItem(token_key)
      if (token) {
        this.me()
          .then((result) => {
            let user = {
              ...result.data,
              token: JSON.parse(token)
            }
            this.setUser(user)
          }).catch((err) => {
            localStorage.removeItem(token_key);
          });
      }
    },
    logoutStorage() {
      this.setUser(null);
    },
    copyStringToClipboard(str) {
    },
    infiniteScroll(name, accion) {
      var listElm = document.querySelector(name);
      console.log("ok", listElm);
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