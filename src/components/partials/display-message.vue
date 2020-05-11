<template>
  <div class="text-center">
    <v-snackbar :color="message.color" :top="true" v-model="message.snackbar" :timeout="message.timeout">
      {{ message.text }}
      <v-btn
        v-if="message.confirm"
        :color="message.color"
        text
        @click="message.snackbar = false"
      >Close</v-btn>
    </v-snackbar>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations("appModule", ["setMessage"])
  },
  mounted() {
    setTimeout(() => {
      this.setMessage({
        color: "",
        timeout: "",
        snackbar: "",
        text: "",
        confirm: false
      });
    }, this.message.timeout + 500);
  },
  computed: {
    ...mapState("appModule", ["message"])
  },
  data() {
    return {};
  }
};
</script>