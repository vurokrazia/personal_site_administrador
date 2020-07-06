<template>
  <v-row>
    <v-col
      v-for="(category, index) in categories"
      :key="index"
      xs="12"
      sm="10"
      offset-sm="1"
      md="4"
      lg="6"
      offset-lg="3"
      class="mb-5"
    >
      <v-card height="100%" outlined style="border:none" @click="showItem(category)">
        <v-img
          v-if="category.banner_url"
          class="white--text align-end"
          height="17em"
          :src="category.banner_url"
        ></v-img>
        <v-card-title>
          <h1 class="move">{{ category.name }}</h1>
        </v-card-title>
        <v-card-actions v-if="is_administrator">
          <v-spacer />
          <v-btn icon @click="updateItem(category)">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn @click="deleteItem(category)" icon>
            <v-icon>delete</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
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
import { mapActions, mapMutations, mapGetters } from "vuex";
import MugenScroll from "vue-mugen-scroll";
import LoadingTemplate from "../partials/loading_template";
import mixin_categories from "../../mixins/fetch_categories";
import VueMarkdown from "vue-markdown";
// import utils from "../../mixins/utils";
export default {
  name: "IndexCategories",
  data() {
    return {
      loading: false,
      display_scroll: false
    };
  },
  created() {
    this.setPage(1);
    this.setCategories([]);
    this.display_scroll = true;
  },
  mixins: [mixin_categories],
  components: {
    VueMarkdown,
    MugenScroll,
    LoadingTemplate
  },
  methods: {
    ...mapMutations("categoryModule", [
      "setPage",
      "setCategories",
      "setCategory",
      "removeCategory"
    ]),
    ...mapActions("categoryModule", ["getCategories", "deleteCategory"]),
    updateItem(category) {
      this.assing(category, "edit");
    },
    showItem(category) {
      this.assing(category, "show");
    },
    assing(category, accion) {
      this.setCategory(category);
      this.$router.push({ name: this.$t(`path.categories.${accion}.name`) });
    },
    validate_click(category) {
      if (!this.is_administrator) this.assing(category, "show");
    },
    fetchData() {
      this.loading = true;
      this.fetch_categories({ page: this.page })
        .then(result => {
          this.setCategories(result);
        })
        .catch(err => {
          this.display_scroll = false;
        })
        .finally(err => {
          this.loading = false;
        });
    },
    deleteItem(category) {
      this.displayAlertDelete().then(result => {
        if (result.value)
          this.deleteCategory(category.id)
            .then(result => {
              this.removeCategory(category);
            })
            .catch(err => {
              this.displayErrorMessage(err.response);
            });
      });
    }
  },
  computed: {
    ...mapGetters("categoryModule", ["categories", "page"]),
    ...mapGetters("authModule", ["is_administrator"])
  }
};
</script>