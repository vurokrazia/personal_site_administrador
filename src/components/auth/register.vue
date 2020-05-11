<template>
  <v-card :loading="loading" shaped>
    <v-toolbar color="primary" flat dark>
      <v-toolbar-title>{{ $t("path.users.register.title") }}</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <formulario :register="true" @send-resource="registersesion" />
  </v-card>
</template>
<script>
import Formulario from "./form";
import { mapActions, mapMutations } from "vuex";
export default {
  name: "RegisterUser",
  components: { Formulario },
  data() {
    return { loading: false };
  },
  methods: {
    ...mapActions("authModule", ["registerUser"]),
    ...mapMutations("authModule", ["setUser","setToken"]),
    registersesion(json) {
      this.loading = true;
      this.registerUser(json)
        .then(response => {
          let json = response.data;
          this.setUser(json)
          this.loading = false;
          this.$router.push("/")
        })
        .catch(err => {
          var error = err.response
          if (error && error.data)
            alert(error.data.message)
          else console.log(error.data);
          this.loading = false;
        });
    }
  },
  mounted() {}
};
</script>
