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
    <v-col
      xs="12"
      sm="6"
      offset-md="1"
      md="10"
      lg="8"
      offset-lg="2"
      v-for="(body,index) in article_bodies"
      :key="index"
    >
      <form-article-body
        @remove-body="destroy_body"
        @add-body="merge_body"
        :index="index"
        :validate_index="validate_index"
      />
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
      resource_create: {},
      validate_index: {
        index: -1,
        next: true,
        object: {}
      }
    };
  },
  watch: {
    create_article() {
      var _this = this;
      if (this.create_article)
        setTimeout(() => {
          _this.registerResource();
        }, 2000);
    },
    validate_article_body() {
      console.log("new", this.validate_article_body);
    }
  },
  methods: {
    ...mapMutations("articleModule", ["setValidateArticleBody"]),
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
    init_validate_article_bodies(data) {
      this.setArticle({});
      this.setArticle(data.article);
      if (this.article_bodies.length == 0) {
        this.registerResource();
      } else {
        this.setValidateArticleBody({
          article_bodies_length: this.article_bodies.length,
          validate_article_body: true
        });
      }
    },
    get_ggg() {
      let data_form = new FormData();
      for (var key in this.article) {
        console.log("key",key.includes("_attributes"));
        if (key.includes("_attributes")) {
          this.article[key].forEach(element => {
            data_form.append(`article[${key}]`, JSON.stringify(element));
            console.log(`article[${key}][]`);
          });
        } else 
          data_form.append(`article[${key}]`, this.article[key]);
        console.log(`article[${key}]`, this.article[key]);
      }
      return data_form;
    },
    registerResource() {
      this.loading = true;
      //this.get_ggg()
      //return
      this.createArticle(this.article)
        .then(response => {
          let json = response.data;
          this.setArticle(json);
          this.displayMessage(this.$t("messages.register_success"), "success");
          this.loading = false;
          this.$router.push({ name: this.$t("path.articles.show.name") });
        })
        .catch(err => {
          this.displayErrorMessage(err.response);
          this.loading = false;
        });
    }
  },
  computed: {
    ...mapGetters("articleModule", [
      "article_body_index",
      "create_article",
      "form_data_article",
      "article"
    ])
  }
};
</script>
