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

    }
  }
};