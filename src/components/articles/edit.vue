<template>
  <v-row>
    <v-col xs="12" sm="6" offset-md="1" md="10" lg="8" offset-lg="2">
      <v-card :loading="loading" shaped>
        <v-toolbar color="primary" flat>
          <v-toolbar-title>
            {{
            $t("path.articles.edit.title")
            }}
          </v-toolbar-title>
          <v-spacer />
        </v-toolbar>
        <formulario :element="article" @send-resource="updateResource" />
      </v-card>
    </v-col>
    <v-col
      xs="12"
      sm="6"
      offset-md="1"
      md="10"
      lg="8"
      offset-lg="2"
      v-for="(body,index) in article.article_bodies"
      :key="index"
    >
      <form-article-body
        @remove-body="destroy_body"
        :index="index"
        :validate_index="validate_index"
      />
    </v-col>
  </v-row>
</template>
<script>
import Formulario from "./form";
// import utils from "../../mixins";
import { mapActions, mapMutations, mapGetters } from "vuex";
export default {
  name: "ExperienceEdit",
  components: {
    Formulario
  },
  data() {
    return {
      loading: false
    };
  },
  mounted() {
    if (!this.article)
      this.$router.push({ name: this.$t("path.articles.index.name") });
  },
  methods: {
    ...mapActions("articleModule", ["updateArticle"]),
    ...mapMutations("articleModule", ["setArticle"]),
    updateResource(json) {
      console.log("json",json);
      
      this.loading = true;
      this.updateArticle(json)
        .then(response => {
          let json = response.data;
          this.setArticle(json);
          this.loading = false;
          // this.displayMessage(this.$t("messages.updated_success"), "success");
          this.$router.push({ name: this.$t("path.articles.index.name") });
        })
        .catch(err => {
          this.displayErrorMessage(err.response);
          this.loading = false;
        });
    }
  },
  computed: {
    ...mapGetters("articleModule", ["article"])
  }
};
</script>
