<template>
  <v-app>
    <navigation></navigation>
    <v-content>
          <display-message v-if="message.show" />
      <router-view></router-view>
    </v-content>
  </v-app>
</template>
<script>
import navigation from "./components/partials/menu";
import mixins from "./mixins";
import DisplayMessage from "./components/partials/display-message";
import { mapMutations, mapGetters, mapState } from 'vuex';
import 'sweetalert2/src/sweetalert2.scss'
export default {
  name: "App",
  mixins: [mixins],
  components: {
    navigation, DisplayMessage
  },
  data() {
    return {
      theme: false
    };
  },
  computed: {
    ...mapState('appModule',['message'])
  },
  created(){
    this.findStorage()
  },
  beforeCreate() {
    //alert("ok")
  }
};
</script>
