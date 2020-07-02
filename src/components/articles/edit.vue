<template>
  <v-row class="my-5">
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
  </v-row>
</template>
<script>
import Formulario from "./form";
import options_create from "../../mixins/options_create";
import fetch_articles from "../../mixins/fetch_articles";
// import utils from "../../mixins";
import { mapActions, mapMutations, mapGetters } from "vuex";
export default {
  name: "ArticleEdit",
  components: {
    Formulario
  },
  data() {
    return {
      loading: false
    };
  },
  mounted() {
    if (this.empty_article)
      this.$router.push({ name: this.$t("path.articles.index.name") });
  },
  mixins: [options_create, fetch_articles],
  methods: {
    ...mapActions("articleModule", ["updateArticle"]),
    ...mapMutations("articleModule", ["setArticle", "setUpdateArticle"]),
    updateResource(json) {
      this.loading = true;
      this.fetch_update_article({
        form: json.banner ? this.form_data_resource(json, "article") : json,
        id: json.id
      })
        .then(response => {
          this.setArticle(response);
          this.setUpdateArticle(response);
          this.loading = false;
          this.$router.push({ name: this.$t("path.articles.show.name") });
        })
        .catch(err => {
          this.displayErrorMessage(err.response);
          this.loading = false;
        });
    }
  },
  computed: {
    ...mapGetters("articleModule", ["article", "empty_article"])
  }
};
</script>
