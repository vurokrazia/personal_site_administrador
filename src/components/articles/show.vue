<template>
  <v-row>
    <v-col xs="12" sm="12" offset-md="1" md="10" offset-lg="2" lg="8">
      <v-card outlined class="mx-auto">
        <v-card-text>
          <vue-markdown :source="article.body" class="markdown-body" style="pre{width:100%}" />
        </v-card-text>
      </v-card>
    </v-col>
    <v-col
      xs="12"
      sm="12"
      offset-md="1"
      md="10"
      offset-lg="2"
      lg="8"
      v-for="article_body in article.article_bodies"
      :key="article_body.id"
    >
      <show-article-body :article_body="article_body" />
    </v-col>
  </v-row>
</template>
<script>
import VueMarkdown from "vue-markdown";
import ShowArticleBody from "../article_bodies/show";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "ArticleShow",
  components: {
    ShowArticleBody,
    VueMarkdown
  },
  props: {
    param_experience: Object
  },
  watch: {},
  data() {
    return { reset: true, show_image: false };
  },
  computed: {
    // ...mapGetters("authModule", ["is_administrator"]),
    ...mapGetters("articleModule", ["article"])
  },
  mounted() {},
  methods: {
    ...mapMutations("appModule", ["setMessage"]),
    // ...mapActions("articleModule", ["addPicture", "destroyEPicture"]),
    onFilePicked(e) {
      const files = e.target.files;
    }
  }
};
</script>
<style scope>
.markdown-body * {
  margin-top: 5px;
  margin-bottom: 5px;
}
.markdown-body pre code {
  box-shadow: none;
  width: 100%;
  margin: 0px;
  padding-right: 5px;
  padding-left: 5px;
}
</style>