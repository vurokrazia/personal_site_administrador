<template>
  <v-row>
    <v-col xs="12" sm="12" md="12" lg="12">
      <v-parallax dark :src="category.banner_url" style="height:55.5em">
        <v-row align="center" justify="center">
          <v-col class="text-center" cols="12">
            <h1 class="display-1 font-weight-thin mb-4">{{category.name}}</h1>
            <v-btn icon @click="updateItem(category)" v-if="is_administrator">
              <v-icon>edit</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-parallax>
    </v-col>
    <v-col
      xs="12"
      sm="10"
      offset-sm="1"
      md="4"
      lg="6"
      offset-lg="3"
      class="mb-5"
      v-for="(article, index) in category.articles"
      :key="index"
    >
      <article-light :article="article" />
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
import ArticleLight from "../articles/article_light";
import fetch_categories from "../../mixins/fetch_categories";
import MugenScroll from "vue-mugen-scroll";
import LoadingTemplate from "../partials/loading_template";
import date_mixins from "../../mixins/dates";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "CategoryShow",
  components: {
    MugenScroll,
    LoadingTemplate,
    ArticleLight
  },
  mixins: [date_mixins, fetch_categories],
  data() {
    return {
      reset: true,
      show_image: false,
      loading: false,
      display_scroll: false
    };
  },
  computed: {
    ...mapGetters("authModule", ["is_administrator"]),
    ...mapGetters("categoryModule", ["category", "empty_category", "page"]),
    ...mapGetters("articleModule", ["articles"]),
    title_color() {
      return `color:${this.category.color}`;
    }
  },
  mounted() {
    if (this.empty_category)
      this.$router.push({ name: this.$t("path.categories.index.name") });
    else {
      this.setPage(1);
      this.setCategoryArticles([]);
      this.display_scroll = true;
    }
  },
  methods: {
    ...mapMutations("articleModule", ["setArticles"]),
    ...mapMutations("categoryModule", ["setCategory", "setPage"]),
    // ...mapActions("categoryModule", ["addPicture", "destroyEPicture"]),
    fetchData() {
      let fetch_params = { page: this.page, id: this.category.id };
      this.loading = true;
      this.fetch_article_category(fetch_params)
        .then(result => {
          this.setCategoryArticles(result);
        })
        .catch(err => {
          this.display_scroll = false
        })
        .finally(err => {
          this.loading = false;
        });
    },
    onFilePicked(e) {
      const files = e.target.files;
    },
    assing(category, accion) {
      this.setCategory(category);
      this.$router.push({ name: this.$t(`path.categories.${accion}.name`) });
    },
    updateItem(category) {
      this.assing(category, "edit");
    }
  }
};
</script>
