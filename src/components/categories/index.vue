<template>
  <v-row>
    <v-col
      v-for="(category, index) in categories"
      :key="index"
      xs="12"
      sm="6"
      md="4"
      lg="8"
      offset-lg="2"
    >
      <v-card height="100%" class="move" @click="validate_click(category)">
        <v-img
          v-if="category.banner_url"
          class="white--text align-end"
          height="17em"
          :src="category.banner_url"
        >
          <div class="transparent-black">
            <v-card-title>
              <h1>{{ category.name }}</h1>
            </v-card-title>
          </div>
        </v-img>
        <v-card-title v-else>
          <h1 >{{ category.name }}</h1>
        </v-card-title>
        <v-card-actions v-if="is_administrator">
          <v-spacer />
          <v-btn icon @click="showItem(category)">
            <v-icon>tag_faces</v-icon>
          </v-btn>
          <v-btn icon @click="updateItem(category)">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn @click="deleteItem(category)" icon>
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
  name: "IndexCategories",
  data() {
    return {};
  },
  mounted() {
    this.setPage(1);
    this.getCategories({page:this.page})
      .then(result => {
        var json = result.data;
        this.setCategories(json);
      })
      .catch(err => {
        this.displayErrorMessage(err.response);
      });
  },
  components: {
    VueMarkdown
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
    ...mapGetters("categoryModule", ["categories","page"]),
    ...mapGetters("authModule", ["is_administrator"])
  }
};

</script>