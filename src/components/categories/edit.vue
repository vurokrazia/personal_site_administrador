<template>
  <v-row>
    <v-col xs="12" sm="6" offset-md="1" md="10" lg="8" offset-lg="2">
      <v-card :loading="loading" shaped>
        <v-toolbar color="primary" flat>
          <v-toolbar-title>
            {{
            $t("path.categories.edit.title")
            }}
          </v-toolbar-title>
          <v-spacer />
        </v-toolbar>
        <formulario :element="category" @send-resource="updateResource" />
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import Formulario from "./form";
import options_create from "../../mixins/options_create";
// import utils from "../../mixins";
import { mapActions, mapMutations, mapGetters } from "vuex";
export default {
  name: "CategoryEdit",
  components: {
    Formulario
  },
  data() {
    return {
      loading: false
    };
  },
  mounted() {
    if (this.empty_category)
      this.$router.push({ name: this.$t("path.categories.index.name") });
  },
  mixins: [options_create],
  methods: {
    ...mapActions("categoryModule", ["updateCategory"]),
    ...mapMutations("categoryModule", ["setCategory", "setUpdateCategory"]),
    updateResource(json) {
      this.loading = true;
      console.log(json.id);
      this.updateCategory({
        form: this.form_data_resource(json, "category"),
        id: json.id
      })
        .then(response => {
          this.loading = false;
          // this.displayMessage(this.$t("messages.updated_success"), "success");
          this.$router.push({ name: this.$t("path.categories.show.name") });
        })
        .catch(err => {
          this.displayErrorMessage(err.response);
          this.loading = false;
        });
    }
  },
  computed: {
    ...mapGetters("categoryModule", ["category", "empty_category"])
  }
};
</script>
