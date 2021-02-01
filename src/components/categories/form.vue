<template>
  <div>
    <v-card-text>
      <v-form :style="display_markdown ? 'display:none' : 'display:block'">
        <v-text-field
          class="capitalize"
          v-model="resource.name"
          :label="$t('inputs.name')"
          required
          :error-messages="nameErrors"
          @input="$v.resource.name.$touch()"
          @blur="$v.resource.name.$touch()"
        />

        <input type="file" @change="onPictureSelected" />

        <v-text-field
          type="color"
          class="capitalize"
          v-model="resource.color"
          :label="$t('inputs.color')"
          required
          :error-messages="colorErrors"
          @input="$v.resource.color.$touch()"
          @blur="$v.resource.color.$touch()"
        />
      </v-form>
    </v-card-text>
    <v-card-actions class="d-flex flex-row-reverse">
      <v-btn text small color="primary" @click="sendElement" class="mx-5">{{ $t("buttons.send") }}</v-btn>
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
  name: "FormCategory",
  props: {
    element: Object
  },
  mixins: [validationMixin],
  validations: {
    resource: {
      name: { required, minLength: minLength(5), maxLength: maxLength(255) },
      color: {
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
      display_markdown: false,
      resource: {
        name: null,
        color: null
      }
    };
  },
  methods: {
    changeMarkDown() {},
    add_color() {
      this.$emit("add-color");
    },
    onPictureSelected(event) {
      this.resource.banner = event.target.files[0];
    },
    convert_resource() {
      //return {source:this.resource}
      return this.resource.color ? this.resource.color : "";
    },
    sendElement() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit("send-resource", this.resource);
      }
    }
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.resource.name.$dirty) return errors;
      !this.$v.resource.name.required &&
        errors.push(
          this.$t("validations.required", {
            field: this.$t("inputs.name").toLowerCase()
          })
        );
      !this.$v.resource.name.minLength &&
        errors.push(
          this.$t("validations.minLength", {
            field: this.$t("inputs.name").toLowerCase(),
            length: 5
          })
        );
      !this.$v.resource.name.maxLength &&
        errors.push(
          this.$t("validations.maxLength", {
            field: this.$t("inputs.name").toLowerCase(),
            length: 255
          })
        );
      return errors;
    },
    colorErrors() {
      const errors = [];
      if (!this.$v.resource.color.$dirty) return errors;
      !this.$v.resource.color.required &&
        errors.push(
          this.$t("validations.required", {
            field: this.$t("inputs.color").toLowerCase()
          })
        );
      !this.$v.resource.color.minLength &&
        errors.push(
          this.$t("validations.minLength", {
            field: this.$t("inputs.color").toLowerCase(),
            length: 5
          })
        );
      !this.$v.resource.color.maxLength &&
        errors.push(
          this.$t("validations.maxLength", {
            field: this.$t("inputs.color").toLowerCase(),
            length: 255
          })
        );
      return errors;
    }
  }
};
</script>
