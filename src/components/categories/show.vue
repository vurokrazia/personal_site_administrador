<template>
  <v-row>
    <v-col xs="12" sm="12" offset-md="1" md="10" offset-lg="2" lg="8">
      <v-row class="ex3">
        <v-col xs="12" sm="12" md="12" lg="12">
          <v-card outlined class="mx-auto mx-5">
            <v-img
              v-if="category.banner_url"
              class="white--text align-end"
              height="600px"
              :src="category.banner_url"
            >
              <div style="background-color: rgba(13, 3, 0, 0.55);">
                <v-card-title>
                  <h1 :style="title_color">{{category.name}}</h1>
                </v-card-title>
              </div>
            </v-img>
            <v-card-title v-else>
              <h1 :style="title_color">{{category.name}}</h1>
            </v-card-title>
            <v-card-subtitle class="d-flex flex-row-reverse" flat tile>
              <h4>{{ formatGeneralDay(category.created_at) }}</h4>
            </v-card-subtitle>
            <v-card-actions v-if="is_administrator">
              <v-spacer />
              <v-btn icon @click="updateItem(category)">
                <v-icon>edit</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import date_mixins from "../../mixins/dates";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "CategoryShow",
  mixins: [date_mixins],
  data() {
    return { reset: true, show_image: false };
  },
  computed: {
    ...mapGetters("authModule", ["is_administrator"]),
    ...mapGetters("categoryModule", ["category", "empty_category"]),
    title_color(){
      return `color:${this.category.color}`
    }
  },
  mounted() {
    if (this.empty_category)
      this.$router.push({ name: this.$t("path.categories.index.name") });
  },
  methods: {
    ...mapMutations("categoryModule", ["setCategory"]),
    ...mapMutations("appModule", ["setMessage"]),
    // ...mapActions("categoryModule", ["addPicture", "destroyEPicture"]),
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
