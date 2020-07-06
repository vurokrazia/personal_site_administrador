<template>
  <v-app>
    <navigation></navigation>
    <v-content style="padding: 53px 0px 0px; ">
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
    ...mapState("appModule", ["message"]),
    createAlert() {
      return this.$store.state.alert.message;
    }
  },
  created() {
    this.findStorage();
  },
  watch: {
    createAlert() {
      if (this.$store.state.alert.message != "") {
        this.$swal.fire({
          icon: this.$store.state.alert.icon,
          title: this.$store.state.alert.message,
          showConfirmButton: false,
          timer: this.$store.state.alert.timeout,
          toast: this.$store.state.alert.toast
          // , imageUrl:
          //   "https://as.com/meristation/imagenes/2020/01/07/header_image/130019411578411635.jpg",
          // imageWidth: 400,
          // imageHeight: 200,
          // imageAlt: "Custom image"
        });
        setTimeout(() => {
          this.setAlertMessage({
            show: false,
            type: this.$store.state.alert.type,
            message: "",
            timeout: 1000,
            toast: false
          });
        }, this.$store.state.alert.timeout + 500);
      }
    }
  }
};
</script>
<style >
.markdown-body * {
  margin-top: 5px;
  margin-bottom: 5px;
}
.markdown-body pre code {
  box-shadow: none;
  width: 100%;
  margin: 0px;
  padding-right: 5px;
  padding-left: 5px;
}
.markdown-body p {
  width: 100%;
}
.markdown-body p img {
  width: 100%;
}

.move:hover {
  cursor: pointer;
  box-shadow: black;
  animation: shake 0.5s;
  animation-iteration-count: 1;
}
@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}
 .border-botom {
    /* background-color: red; */
    height: 1px;
    border: none !important;
    padding-top: 5px ;
    margin-top: 15px;
    margin-bottom: 5px;
    border-bottom: 1.8px solid #e0e0e083 !important;
  }
.transparent-black {
  background-color: rgba(13, 3, 0, 0.55);
}
.limit-body {
  overflow-wrap: break-word;
  /* white-space: nowrap; */
  height: 150px;
  overflow: hidden;
}
@media screen and (max-width: 1024px) {
  .limit-body {
    height: 250px;
  }
}
@media screen and (max-width: 767px) {
  /* .limit-body {
    display: none;
  } */
}
@media screen and (max-width: 480px) {
}
@media screen and (max-width: 320px) {
}
</style>