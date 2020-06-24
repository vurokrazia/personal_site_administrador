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
  </v-row>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import VueMarkdown from "vue-markdown";
import date_mixins from "../mixins/dates";
// import utils from "../../mixins/utils";
export default {
  name: "IndexArticles",
  data() {
    return {};
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
  components: {
    VueMarkdown
  },
  mixins: [date_mixins],
  methods: {
    ...mapMutations("articleModule", [
      "setStart",
      "setArticles",
      "setArticle",
      "removeArticle"
    ]),
    ...mapActions("articleModule", ["getArticles", "deleteArticle"]),
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