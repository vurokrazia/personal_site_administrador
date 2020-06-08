<template>
  <v-app>
    <navigation></navigation>
    <v-content style="padding: 64px 0px 0px; background-color: rgb(218, 217, 244);">
      <display-message v-if="message.show" />
      <router-view></router-view>
    </v-content>
  </v-app>
</template>
<script>
import navigation from "./components/partials/menu";
import mixins from "./mixins";
import DisplayMessage from "./components/partials/display-message";
import { mapMutations, mapGetters, mapState } from "vuex";
import "sweetalert2/src/sweetalert2.scss";
export default {
  name: "App",
  mixins: [mixins],
  components: {
    navigation,
    DisplayMessage
  },
  data() {
    return {
      theme: false
    };
  },
  computed: {
    ...mapState("appModule", ["message"])
  },
  created() {
    this.findStorage();
  },
  beforeCreate() {
    //alert("ok")
  }
};
</script>
<style >
.markdown-body * {
  margin-top: 5px;
  margin-bottom: 5px;
}
code {
  box-shadow: none;
}
.markdown-body pre code {
  width: 100%;
  margin: 0px;
  padding-right: 5px;
  padding-left: 5px;
}
</style>