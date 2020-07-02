<template>
  <v-card outlined height="100%" style="border:none">
    <v-img
      v-if="article.banner_url"
      class="white--text align-end"
      height="17em"
      :src="article.banner_url"
    ></v-img>
    <v-card-title class="move">
      <h2 @click="showItem(article)">{{ article.title }}</h2>
    </v-card-title>
    <v-card-subtitle class="d-flex flex-row-reverse" flat tile>
      <h4>{{ formatGeneralDay(article.created_at) }}</h4>
    </v-card-subtitle>
    <v-card-text>{{article.legend}}</v-card-text>
    <v-card-actions v-if="is_administrator">
      <v-spacer />

      <v-btn icon @click="updateItem(article)">
        <v-icon>edit</v-icon>
      </v-btn>
      <v-btn @click="deleteItem(article)" icon>
        <v-icon>delete</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import date_mixins from "../../mixins/dates";
import mixins from "../../mixins/";
// import utils from "../../mixins/utils";
export default {
  name: "ArticleLight",
  props: {
    article: Object
  },
  mixins: [date_mixins, mixins],
  methods: {
    ...mapMutations(["setAlertMessage"]),
    ...mapMutations("articleModule", ["setArticle"]),
    updateItem(article) {
      this.assing_article(article, "edit");
    },
    showItem(article) {
      this.assing_article(article, "show");
    },
    assing_article(article, accion) {
      this.setArticle(article);
      this.$router.push({ name: this.$t(`path.articles.${accion}.name`) });
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
    ...mapGetters("authModule", ["is_administrator"])
  }
};
</script>