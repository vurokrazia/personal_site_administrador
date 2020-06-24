<template>
  <v-card class="mx-auto" v-if="!edit_body">
    <v-card-title>{{ article_body.title }}</v-card-title>
    <v-card-subtitle class="pb-0">{{ article_body.created_at }}</v-card-subtitle>
    <v-card-text>
      <vue-markdown :source="article_body.body" class="markdown-body"/>
    </v-card-text>
    <v-card-actions v-if="is_administrator">
      <v-spacer />
          <v-btn icon @click="edit_body=true">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn @click="deleteItem" icon>
            <v-icon>delete</v-icon>
          </v-btn>
    </v-card-actions>
  </v-card>
  <form-article-body
    v-else
    :index="-1"
    :element="article_body"
    @updated-body="edit_body = false"
  />
</template>
<script>
import FormArticleBody from "../article_bodies/form";
import VueMarkdown from "vue-markdown";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "ArticleShow",
  components: {
    VueMarkdown,
    FormArticleBody
  },
  props: {
    article_body: Object
  },
  watch: {},
  data() {
    return { reset: true, show_image: false, edit_body: false };
  },
  computed: {
    ...mapGetters("authModule", ["is_administrator"]),
  },
  mounted() {},
  methods: {
    ...mapMutations("appModule", ["setMessage"]),
    // ...mapActions("articleModule", ["addPicture", "destroyEPicture"]),
    onFilePicked(e) {
      const files = e.target.files;
    },
    deleteItem(){
      console.log(this.article_body);
    }
  }
};
</script>
