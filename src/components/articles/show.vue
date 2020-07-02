<template>
  <v-row>
    <v-col style="padding-top:0px" xs="12" sm="10" offset-sm="1" md="8" offset-md="2" lg="6" offset-lg="3">
      <v-card style="border:none" outlined class="mx-auto mx-5">
        <v-img
          v-if="article.banner_url"
          class="white--text align-end"
          height="600px"
          :src="article.banner_url"
        ></v-img>
        <v-card-title>
          <h1 class="my-3">{{article.title}}</h1>
          <v-spacer />
          <v-btn icon @click="updateItem(article)" v-if="is_administrator">
            <v-icon>edit</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-subtitle class="d-flex flex-row-reverse my-5" flat tile>
          <h4>{{ formatGeneralDay(article.created_at) }}</h4>
        </v-card-subtitle>
        <v-card-text>
          <vue-markdown :source="article.body" class="markdown-body" />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import date_mixins from "../../mixins/dates";
import VueMarkdown from "vue-markdown";
import ShowArticleBody from "../article_bodies/show";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "ArticleShow",
  components: {
    ShowArticleBody,
    VueMarkdown
  },
  mixins: [date_mixins],
  data() {
    return { reset: true, show_image: false };
  },
  computed: {
    ...mapGetters("authModule", ["is_administrator"]),
    ...mapGetters("articleModule", ["article", "empty_article"])
  },
  mounted() {
    if (this.empty_article)
      this.$router.push({ name: this.$t("path.articles.index.name") });
  },
  methods: {
    ...mapMutations("articleModule", ["setArticle"]),
    ...mapMutations("appModule", ["setMessage"]),
    // ...mapActions("articleModule", ["addPicture", "destroyEPicture"]),
    onFilePicked(e) {
      const files = e.target.files;
    },
    updateItem(article) {
      this.assing_article(article, "edit");
    },
    assing_article(article, accion) {
      this.setArticle(article);
      this.$router.push({ name: this.$t(`path.articles.${accion}.name`) });
    }
  }
};
</script>
