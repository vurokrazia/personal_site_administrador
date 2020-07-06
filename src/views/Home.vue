<template>
  <v-row>
    <v-col
      v-for="(article, index) in articles"
      :key="index"
      xs="12"
      sm="6"
      md="4"
      lg="8"
      offset-lg="2"
    >
      <v-card height="100%" class="move" @click="validate_click(article)">
        <v-img
          v-if="article.banner_url"
          class="white--text align-end"
          height="200px"
          :src="article.banner_url"
        >
          <div class="transparent-black">
            <v-card-title>
              <h1>{{ article.title }}</h1>
            </v-card-title>
          </div>
        </v-img>
        <v-card-title v-else>
          <h1>{{ article.title }}</h1>
        </v-card-title>
        <v-card-subtitle class="d-flex flex-row-reverse" flat tile>
          <h4>{{ formatGeneralDay(article.created_at) }}</h4>
        </v-card-subtitle>
        <v-card-actions v-if="is_administrator">
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
    <v-col xs="12" sm="12" md="12" lg="12" v-if="display_scroll">
      <mugen-scroll :handler="fetchData" :should-handle="!loading">
        <loading-template></loading-template>
      </mugen-scroll>
    </v-col>
  </v-row>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import VueMarkdown from "vue-markdown";
import MugenScroll from "vue-mugen-scroll";
import LoadingTemplate from "../components/partials/loading_template";
import date_mixins from "../mixins/dates";
import fetch_articles from "../mixins/dates";
export default {
  name: "IndexArticles",
  data() {
    return {
      display_scroll: false,
      loading: false
    };
  },
  created() {
    this.setArticles([]);
    this.setPage(1);
    this.display_scroll = true;
  },
  components: {
    VueMarkdown,
    MugenScroll,
    LoadingTemplate
  },
  mixins: [date_mixins, fetch_articles],
  methods: {
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
    ...mapGetters("articleModule", ["articles"]),
    ...mapGetters("authModule", ["is_administrator"])
  }
};
</script>