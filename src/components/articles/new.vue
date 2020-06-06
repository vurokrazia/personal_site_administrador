<template>
  <v-row>
    <v-col xs="12" sm="6" offset-md="1" md="10" lg="8" offset-lg="2">
      <v-card :loading="loading" shaped>
        <v-toolbar color="primary" flat>
          <v-toolbar-title>
            {{
            $t("path.articles.new.title")
            }}
          </v-toolbar-title>
          <v-spacer />
        </v-toolbar>
        <formulario @send-resource="init_validate_article_bodies" @add-body="merge_body" />
      </v-card>
    </v-col>
    <v-col xs="12" sm="6" offset-md="1" md="10" lg="8" offset-lg="2" v-for="(body,index) in article_bodies" :key="index">
      <form-article-body @remove-body="destroy_body" @add-body="merge_body" :index="index" :validate-index="validate_index"/>
    </v-col>
  </v-row>
</template>
<script>
import Formulario from "./form";
import FormArticleBody from "../article_bodies/form";
import utils from "../../mixins";
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";
export default {
  name: "NewExperience",
  mixins: [utils],
  components: {
    Formulario,
    FormArticleBody
  },
  data() {
    return {
      loading: false,
      article_bodies: [],
      resource_create:{},
      validate_index: {
        index: -1,
        next: true,
        object:{}
      },
    };
  },
  watch: {
    article_body_index(){
      console.log("new",this.article_body_index,this.article_bodies.length);
    }
  },
  methods: {
    ...mapMutations('articleModule',['setValidateArticleBody']),
    ...mapActions("articleModule", ["createArticle"]),
    ...mapMutations("articleModule", ["setArticle"]),
    get_last_index() {
      return this.article_bodies.length == 0
        ? 1
        : this.article_bodies[this.article_bodies.length - 1].key + 1;
    },
    merge_body() {
      this.article_bodies.push({
        key: this.get_last_index()
      });
    },
    destroy_body(obj) {
      this.article_bodies = this.article_bodies.filter(function(body) {
        console.log(body.key, obj.index);
        return body.key !== obj.index;
      });
    },
    init_validate_article_bodies(data){
      this.resource_create = data
      if(this.article_bodies.length == 0){
        this.registerResource()
      } else {
        this.validation_article_bodies(this.validate_index);
      }
    },
    validation_article_bodies(obj) {
      this.setValidateArticleBody(obj)
    },  
    registerResource() {
      this.loading = true;
      this.createArticle(this.resource_create.article)
        .then(response => {
          let json = response.data;
          this.setArticle(json);
          this.displayMessage(this.$t("messages.register_success"), "success");
          this.loading = false;
          if (!data.continue)
            this.$router.push({ name: this.$t("path.articles.index.name") });
        })
        .catch(err => {
          this.displayErrorMessage(err.response);
          this.loading = false;
        });
    }
  },
  computed: {
    ...mapGetters('articleModule',['article_body_index']),
  }
};
</script>
