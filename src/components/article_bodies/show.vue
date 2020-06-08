<template>
    <v-card class="mx-auto">
      <v-img
        class="white--text align-end"
        height="200px"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      >
        <v-card-title>{{ article_body.title }}</v-card-title>
      </v-img>

      <v-card-subtitle class="pb-0">{{ article_body.created_at }}</v-card-subtitle>

      <v-card-text class="text--primary">{{ article_body.body }}</v-card-text>

      <v-card-actions>
        <v-btn color="orange" text>Share</v-btn>

        <v-btn color="orange" text>Explore</v-btn>
      </v-card-actions>
    </v-card>
</template>
<script>
// import utils from "../../mixins/utils";

import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "ArticleShow",
  props: {
    article_body: Object
  },
  watch: {},
  data() {
    return { reset: true, show_image: false };
  },
  computed: {
    // ...mapGetters("authModule", ["is_administrator"]),
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
