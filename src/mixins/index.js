import { user_key, token_key } from "./../mixins/var";
import { mapMutations, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
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
    findProfilePerson(){

    },
    displayErrorMessage(error) {
      if (error && error.data) this.setMessage({
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
      return
      this.setMessage({
        color: color,
        timeout: 3000,
        snackbar: "0123456789",
        text: message,
        confirm: false
      });
    },
  }
};