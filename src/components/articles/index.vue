<template>
  <v-row>
    <v-col v-for="(article, index) in articles" :key="index" xs="12" sm="6" md="4" lg="6">
      <v-card height="100%" class="ma-2 move" @click="!is_administrator ? showItem(article) : nil">
        <v-card-title>
          <h1 class>{{ article.title }}</h1>
        </v-card-title>
        <v-card-text>
          <vue-markdown class="markdown-body limit-body" :source="article.body" />
        </v-card-text>
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
  methods: {
    ...mapMutations("articleModule", [
      "setStart",
      "setArticles",
      "setArticle",
      "removeArticle"
    ]),
    ...mapActions("articleModule", ["getArticles", "deleteArticle"]),
    updateItem(article) {
      this.setArticle(article);
      this.$router.push({ name: this.$t("path.articles.edit.name") });
    },
    showItem(article) {
      this.setArticle(article);
      this.$router.push({ name: this.$t("path.articles.show.name") });
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
    ...mapGetters("authModule", ["is_administrator"]),
  }
};
</script>
<style scope>
.move:hover {
  cursor: pointer;
  box-shadow: black;
    /* Start the shake animation and make the animation last for 0.5 seconds */
  animation: shake 0.5s;

  /* When the animation is finished, start again */
  animation-iteration-count: 1; 
}
@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}
/* .face:hover {
  animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
} */
.limit-body {
  white-space: nowrap;
  height: 350px;
  overflow: hidden;
}
</style>