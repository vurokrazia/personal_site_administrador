<template>
  <div>
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
        <input type="file" @change="onPictureSelected">
        <v-textarea
          class="capitalize"
          v-model="resource.body"
          :label="$t('inputs.body')"
          required
          :error-messages="bodyErrors"
          @input="$v.resource.body.$touch()"
          @blur="$v.resource.body.$touch()"
        />
        <div v-for="(object,index) in [1,2,3,4]" :key="index">
          
        </div>
        <v-btn text small color="primary" @click="add_body">plus</v-btn>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn @click="sendElement" class="mx-5">{{ $t("buttons.send") }}</v-btn>
    </v-card-actions>
  </div>
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
import { mapGetters } from "vuex";
export default {
  name:"FormExperience",
  props: {
    element: Object
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
    add_body(){
      this.$emit("add-body");
    },
    onPictureSelected(event){
      this.resource.banner = event.target.files[0]
    },
    form_data_article(){
      let data_form = new FormData();
      var article = this.resource;
      for ( var key in article ) {
          data_form.append(`article[${key}]`, article[key]);
      }
      return data_form
    },
    sendElement() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit("send-resource", {
          article: this.form_data_article(),
          continue: this.create_continue
        });
      }
    }
  },
  computed: {
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
