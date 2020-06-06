<template>
  <v-row>
    <v-col v-for="(article, index) in articles" :key="index" xs="12" sm="6" md="4" lg="6">
      <v-card height="100%" class="ma-2">
        <v-card-title>
          <h1 class="text-center my-2">{{ article.title }}</h1>
          <p>{{ article.body }}</p>
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn icon @click="showItem(article)">
            <v-icon>tag_faces</v-icon>
          </v-btn>
          <v-btn icon @click="updateItem(article)">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn @click="deleteItem(article)" icon>
            <v-icon>delete</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
// import utils from "../../mixins/utils";
export default {
  name: "IndexArticles",
  data() {
    return {
    };
  },
  mounted() {
    this.getArticles()
      .then(result => {
        var json = result.data;
        this.setArticles(json);
        this.setStart(json.page);
      })
      .catch(err => {
        this.displayErrorMessage(err.response);
      });
  },
  methods: {
    ...mapMutations("articleModule", [
      "setStart",
      "setArticles",
      "setArticle",
      "removeArticle"
    ]),
    ...mapActions("articleModule", ["getArticles", "deleteArticle"]),
    updateItem(article) {
      this.setArticle(article);
      this.$router.push({ name: this.$t("path.articles.edit.name") });
    },
    showItem(article) {
      this.setArticle(article);
      this.$router.push({ name: this.$t("path.articles.show.name") });
    },
    deleteItem(article) {
      this.displayAlertDelete().then(result => {
        if (result.value)
          this.deleteArticle(article.id)
            .then(result => {
              this.removeArticle(article);
            })
            .catch(err => {
              this.displayErrorMessage(err.response);
            });
      });
    }
  },
  computed: {
    ...mapGetters("articleModule", ["articles"])
  }
};
</script>
