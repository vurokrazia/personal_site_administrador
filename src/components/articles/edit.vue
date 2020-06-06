<template>
  <v-container>
    <v-row>
      <v-col xs="12" offset-sm="2" sm="8" offset-md="3" md="6" offset-lg="4" lg="4">
        <v-card :loading="loading" shaped>
          <v-toolbar color="primary" flat>
            <v-toolbar-title>
              {{
              $t("path.articles.edit.title")
              }}
            </v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <formulario :element="edit_experience" @send-resource="updateResource" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Formulario from "./form";
// import utils from "../../mixins";
import { mapActions, mapMutations, mapGetters } from "vuex";
export default {
  name:"ExperienceEdit",
  components: {
    Formulario
  },
  data() {
    return {
      loading: false
    };
  },
  mounted() {
    if (!this.edit_experience)
      this.$router.push({ name: this.$t("path.articles.index.name") });
  },
  methods: {
    ...mapActions("articleModule", ["updateArticle"]),
    ...mapMutations("articleModule", ["setArticle"]),
    updateResource(json) {
      this.loading = true;
      this.updateArticle(json)
        .then(response => {
          let json = response.data;
          this.setArticle(json);
          this.loading = false;
          this.displayMessage(this.$t("messages.updated_success"), "success");
          this.$router.push({ name: this.$t("path.articles.index.name") });
        })
        .catch(err => {
          this.displayErrorMessage(err.response)
          this.loading = false;
        });
    }
  },
  computed: {
    ...mapGetters("articleModule", ["edit_experience"])
  }
};
</script>
