<template>
  <v-row class="mx-1">
    <v-col
      v-for="(article, index) in articles"
      :key="index"
      xs="12"
      sm="6"
      md="4"
      lg="6"
      offset-lg="3"
    >
      <v-card height="100%" class="move" outlined @click="validate_click(article)">
        <v-img
          v-if="article.banner_url"
          class="white--text align-end"
          height="17em"
          :src="article.banner_url"
        >
          <div class="transparent-black">
            <v-card-title>
              <h3>{{ article.title }}</h3>
            </v-card-title>
          </div>
        </v-img>
        <v-card-title v-else>
          <h3 class>{{ article.title }}</h3>
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
    <v-col xs="12" sm="6" md="4" lg="6" offset-lg="3">
      <mugen-scroll v-if="display_scroll" :handler="fetchData" :should-handle="!loading">loading...</mugen-scroll>
    </v-col>
  </v-row>
</template>
<script>
import MugenScroll from "vue-mugen-scroll";
import { mapActions, mapMutations, mapGetters } from "vuex";
import VueMarkdown from "vue-markdown";
import date_mixins from "../../mixins/dates";
import mixins from "../../mixins/";
// import utils from "../../mixins/utils";
export default {
  name: "IndexArticles",
  data() {
    return {
      loading: false,
      display_scroll: true
    };
  },
  mixins: [date_mixins, mixins],
  mounted() {},
  components: {
    VueMarkdown,
    MugenScroll
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
      this.loading = false;
      this.getArticles({ page: this.page })
        .then(result => {
          switch (result.status) {
            case 200:
              this.loading = false;
              break;
            case 204:
              this.setAlertMessage({
                show: true,
                type: "info",
                message: this.$t("status.empty_list"),
                timeout: 3000
              });
            default:
              this.loading = true;
              this.display_scroll = false;
              break;
          }
          var json = result.data;
          this.setArticles(json);
        })
        .catch(err => {
          // this.displayErrorMessage(err.response);
          console.log(err);
          this.loading = true;
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