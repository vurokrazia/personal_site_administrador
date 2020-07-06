<template>
  <v-row style="padding-top:0px">
    <v-col
      v-for="(article, index) in articles"
      :key="index"
      xs="12"
      sm="10"
      offset-sm="1"
      md="4"
      lg="6"
      offset-lg="3"
      class="mb-5"
    >
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
      <div class="border-botom" />
    </v-col>
    <v-col xs="12" sm="12" md="12" lg="12" v-if="display_scroll">
      <mugen-scroll :handler="fetchData" :should-handle="!loading">
        <loading-template></loading-template>
      </mugen-scroll>
    </v-col>
  </v-row>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import MugenScroll from "vue-mugen-scroll";
import LoadingTemplate from "../partials/loading_template";
import VueMarkdown from "vue-markdown";
import date_mixins from "../../mixins/dates";
import mixins from "../../mixins/";
import mixin_articles from "../../mixins/fetch_articles";
// import utils from "../../mixins/utils";
export default {
  name: "IndexArticles",
  data() {
    return {
      loading: false,
      display_scroll: false
    };
  },
  mixins: [date_mixins, mixins, mixin_articles],
  components: {
    VueMarkdown,
    MugenScroll,
    LoadingTemplate
  },
  created() {
    this.setPage(1);
    this.setArticles([]);
    this.display_scroll = true;
  },
  methods: {
    ...mapMutations(["setAlertMessage"]),
    ...mapMutations("articleModule", [
      "setPage",
      "setArticles",
      "setArticle",
      "removeArticle"
    ]),
    ...mapActions("articleModule", ["getArticles", "deleteArticle"]),
    fetchData() {
      this.fetch_articles({ page: this.page })
        .then(result => {
          this.setArticles(result);
        })
        .catch(err => {
          this.display_scroll = false;
        })
        .finally(err => {
          this.loading = false;
        });
    },
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
    validate_click(article) {
      if (!this.is_administrator) this.assing_article(article, "show");
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
    ...mapGetters("articleModule", ["articles", "page"]),
    ...mapGetters("authModule", ["is_administrator"])
  }
};
</script>