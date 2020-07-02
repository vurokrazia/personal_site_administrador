<template>
  <v-row class="my-5">
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
import options_create from "../../mixins/options_create";
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";
export default {
  name: "NewExperience",
  mixins: [utils, options_create],
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
      if (this.create_article)
        this.registerResource(this.form_data_resource(this.article, "article"));
    },
    validate_article_body() {
      console.log("new", this.validate_article_body);
    }
  },
  created() {
    this.setArticle(null);
  },
  methods: {
    ...mapMutations("articleModule", ["setValidateArticleBody"]),
    ...mapActions("articleModule", ["createArticle", "updateArticle"]),
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
      if (this.article_bodies.length == 0) {
        debugger;
        if (data.banner)
          this.registerResource(this.form_data_resource(data, "article"));
        else this.registerResource(data);
      } else {
        this.setArticle(data);
        this.setValidateArticleBody({
          article_bodies_length: this.article_bodies.length,
          validate_article_body: true
        });
      }
    },
    registerResource(resource) {
      this.loading = true;
      this.createArticle(resource)
        .then(response => {
          this.setArticle(response.data);
          if (
            this.create_article_bodies.article_bodies_attributes.length != 0
          ) {
            this.registerBodies();
          } else {
            this.finish_create();
          }
        })
        .catch(err => {
          this.displayErrorMessage(err.response);
          this.loading = false;
        });
    },
    registerBodies() {
      this.updateArticle(this.create_article_bodies)
        .then(result => {
          this.setArticle(result.data);
          this.finish_create();
        })
        .catch(err => {
          alert(err);
        });
    },
    finish_create() {
      this.loading = false;
      this.displayMessage(this.$t("messages.register_success"), "success");
      this.$router.push({ name: this.$t("path.articles.show.name") });
    }
  },
  computed: {
    ...mapGetters("articleModule", [
      "article_body_index",
      "create_article",
      "create_article_bodies",
      "article"
    ])
  }
};
</script>
