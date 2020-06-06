<template>
  <v-card>
    <v-toolbar color="primary" flat>
      <v-toolbar-title>
        {{
        $t("path.articles.new.title")
        }}
      </v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field
          class="capitalize"
          v-model="resource.title"
          :label="$t('inputs.title')"
          required
          :error-messages="titleErrors"
          @input="$v.resource.title.$touch()"
          @blur="$v.resource.title.$touch()"
        />
        <input type="file" @change="onPictureSelected" />
        <v-textarea
          class="capitalize"
          v-model="resource.body"
          :label="$t('inputs.body')"
          required
          :error-messages="bodyErrors"
          @input="$v.resource.body.$touch()"
          @blur="$v.resource.body.$touch()"
        />
      </v-form>
    </v-card-text>
    <v-card-text class="d-flex flex-row-reverse">
      <v-btn text small color="primary" @click="add_body">add</v-btn>
      <v-btn text small color="primary" @click="del_body">delete</v-btn>
    </v-card-text>
  </v-card>
</template>
<script>
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  minLength,
  email,
  between
} from "vuelidate/lib/validators";
import { mapGetters, mapState, mapMutations } from "vuex";
export default {
  name: "FormArticleBody",
  props: {
    element: Object,
    index: Number,
    validate_index: Object
  },
  mixins: [validationMixin],
  validations: {
    resource: {
      title: { required, minLength: minLength(5), maxLength: maxLength(255) },
      body: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(255)
      }
    }
  },
  mounted() {
    if (this.element) {
      this.resource = this.element;
    }
  },
  data() {
    return {
      create_continue: false,
      resource: {
        title: null,
        body: null
      }
    };
  },
  methods: {
    ...mapMutations("articleModule", ["setValidateArticleBody"]),
    add_body() {
      this.$emit("add-body");
    },
    del_body() {
      this.$emit("remove-body", { index: this.index });
    },
    onPictureSelected(event) {
      this.resource.banner = event.target.files[0];
    },
    form_data_article() {
      let data_form = new FormData();
      var article = this.resource;
      for (var key in article) {
        data_form.append(`article[${key}]`, article[key]);
      }
      return data_form;
    },
    sendElement() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        console.log("sendElement",this.validate_index);
        this.validate_index.object = this.resource;
        this.setValidateArticleBody(this.validate_index);
      } 
    }
  },
  watch: {
    article_body_index() {
      console.log(this.article_body_index, this.index);
      if (this.article_body_index == this.index) {
        this.sendElement()
      }
    }
  },
  computed: {
    ...mapGetters("articleModule", ["article_body_index"]),
    titleErrors() {
      const errors = [];
      if (!this.$v.resource.title.$dirty) return errors;
      !this.$v.resource.title.required &&
        errors.push(
          this.$t("validations.required", {
            field: this.$t("inputs.title").toLowerCase()
          })
        );
      !this.$v.resource.title.minLength &&
        errors.push(
          this.$t("validations.minLength", {
            field: this.$t("inputs.title").toLowerCase(),
            length: 5
          })
        );
      !this.$v.resource.title.maxLength &&
        errors.push(
          this.$t("validations.maxLength", {
            field: this.$t("inputs.title").toLowerCase(),
            length: 255
          })
        );
      return errors;
    },
    bodyErrors() {
      const errors = [];
      if (!this.$v.resource.body.$dirty) return errors;
      !this.$v.resource.body.required &&
        errors.push(
          this.$t("validations.required", {
            field: this.$t("inputs.body").toLowerCase()
          })
        );
      !this.$v.resource.body.minLength &&
        errors.push(
          this.$t("validations.minLength", {
            field: this.$t("inputs.body").toLowerCase(),
            length: 5
          })
        );
      !this.$v.resource.body.maxLength &&
        errors.push(
          this.$t("validations.maxLength", {
            field: this.$t("inputs.body").toLowerCase(),
            length: 255
          })
        );
      return errors;
    }
  }
};
</script>
