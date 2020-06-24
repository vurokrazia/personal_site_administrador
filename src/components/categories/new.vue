<template>
  <v-row>
    <v-col xs="12" sm="6" offset-md="1" md="10" lg="8" offset-lg="2">
      <v-card :loading="loading" shaped>
        <v-toolbar color="primary" flat>
          <v-toolbar-title>
            {{
              $t("path.categories.new.title")
            }}
          </v-toolbar-title>
          <v-spacer />
        </v-toolbar>
        <formulario @send-resource="registerResource" />
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import Formulario from "./form";
import utils from "../../mixins";
import options_create from "../../mixins/options_create";
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";
export default {
  name: "NewCategory",
  mixins: [utils, options_create],
  components: {
    Formulario
  },
  data() {
    return {
      loading: false,
    };
  },
  watch: {
    validate_article_body() {
      console.log("new", this.validate_article_body);
    }
  },
  created() {
    this.setCategory(null);
  },
  methods: {
    ...mapActions("categoryModule", ["createCategory"]),
    ...mapMutations("categoryModule", ["setCategory"]),
    registerResource(resource) {
      this.loading = true;
      this.createCategory(this.form_data_resource(resource, "category"))
        .then(response => {
        this.setCategory(response.data);
        this.displayMessage(this.$t("messages.register_success"), "success");
        this.$router.push({ name: this.$t("path.categories.show.name") });
        })
        .catch(err => {
          this.displayErrorMessage(err.response);
          this.loading = false;
        });
    },
  },
  computed: {
    ...mapGetters("categoryModule", [
      "category"
    ])
  }
};
</script>
