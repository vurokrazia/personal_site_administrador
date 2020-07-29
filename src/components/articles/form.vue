<template>
  <div>
    <v-card-text>
      <vue-markdown
        class="markdown-body"
        :style="display_markdown ? 'display:block' : 'display:none'"
        :source="convert_resource()"
      />
      <v-form :style="display_markdown ? 'display:none' : 'display:block'">
        <v-text-field
          class="capitalize"
          v-model="resource.title"
          :label="$t('inputs.title')"
          required
          :error-messages="titleErrors"
          @input="$v.resource.title.$touch()"
          @blur="$v.resource.title.$touch()"
        />

        <select-options
          @update_select_list="assign_options"
          :items="list_categories"
          item_text="name"
          item_value="id"
        />

        <v-textarea
          class="capitalize"
          v-model="resource.legend"
          :label="$t('inputs.legend')"
          required
          :error-messages="legendErrors"
          @input="$v.resource.legend.$touch()"
          @blur="$v.resource.legend.$touch()"
        />

        <input type="file" @change="onPictureSelected" />

        <v-row style="padding-top:20px">
          <v-col xs="12" sm="12" md="6" lg="6" class="mb-5">
            <image-index title="titulo" />
          </v-col>
          <v-col xs="12" sm="12" md="6" lg="6" class="mb-5">
            <image-create title="titulo" />
          </v-col>
        </v-row>

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
    <v-card-actions class="d-flex flex-row-reverse">
      <v-btn text small color="primary" @click="sendElement" class="mx-5">{{ $t("buttons.send") }}</v-btn>
      <v-btn text small color="secondary" @click="add_body">plus</v-btn>
      <v-btn text small color="secondary" @click="display_markdown = !display_markdown">Markdown</v-btn>
    </v-card-actions>
  </div>
</template>
<script>
import ImageIndex from "../images";
import ImageCreate from "../images/create";
import SelectOptions from "../partials/select_options";
import fetch_categories from "../../mixins/fetch_categories";
import VueMarkdown from "vue-markdown";
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  minLength,
  email,
  between,
} from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
export default {
  name: "FormExperience",
  props: {
    element: Object,
  },
  components: {
    ImageCreate,
    ImageIndex,
    VueMarkdown,
    SelectOptions,
  },
  mixins: [validationMixin, fetch_categories],
  validations: {
    resource: {
      title: { required, minLength: minLength(5), maxLength: maxLength(255) },
      legend: { required, minLength: minLength(5), maxLength: maxLength(255) },
      body: {
        required,
        minLength: minLength(5),
        // maxLength: maxLength(255)
      },
    },
  },
  mounted() {
    if (this.element) {
      this.resource = this.element;
    }
    this.fetch_categories({ page: 1 })
      .then((result) => {
        this.list_categories = result;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data() {
    return {
      display_markdown: false,
      list_categories: [],
      create_categories: [],
      update_categories: [],
      resource: {
        title: null,
        body: null,
      },
    };
  },
  methods: {
    assign_options(data) {
      this.create_categories = data.options;
    },
    add_body() {
      this.$emit("add-body");
    },
    onPictureSelected(event) {
      this.resource.banner = event.target.files[0];
    },
    convert_resource() {
      return this.resource.body ? this.resource.body : "";
    },
    validate_categories() {
      if (this.create_categories.length != 0)
        this.resource.has_categories_attributes = this.create_categories.map(
          (item) => {
            return {
              category_id: item.id,
            };
          }
        );
    },
    sendElement() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.validate_categories();
        this.$emit("send-resource", this.resource);
      }
    },
  },
  computed: {
    titleErrors() {
      const errors = [];
      if (!this.$v.resource.title.$dirty) return errors;
      !this.$v.resource.title.required &&
        errors.push(
          this.$t("validations.required", {
            field: this.$t("inputs.title").toLowerCase(),
          })
        );
      !this.$v.resource.title.minLength &&
        errors.push(
          this.$t("validations.minLength", {
            field: this.$t("inputs.title").toLowerCase(),
            length: 5,
          })
        );
      !this.$v.resource.title.maxLength &&
        errors.push(
          this.$t("validations.maxLength", {
            field: this.$t("inputs.title").toLowerCase(),
            length: 255,
          })
        );
      return errors;
    },
    legendErrors() {
      const errors = [];
      if (!this.$v.resource.legend.$dirty) return errors;
      !this.$v.resource.legend.required &&
        errors.push(
          this.$t("validations.required", {
            field: this.$t("inputs.legend").toLowerCase(),
          })
        );
      !this.$v.resource.legend.minLength &&
        errors.push(
          this.$t("validations.minLength", {
            field: this.$t("inputs.legend").toLowerCase(),
            length: 5,
          })
        );
      !this.$v.resource.legend.maxLength &&
        errors.push(
          this.$t("validations.maxLength", {
            field: this.$t("inputs.legend").toLowerCase(),
            length: 255,
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
            field: this.$t("inputs.body").toLowerCase(),
          })
        );
      !this.$v.resource.body.minLength &&
        errors.push(
          this.$t("validations.minLength", {
            field: this.$t("inputs.body").toLowerCase(),
            length: 5,
          })
        );
      // !this.$v.resource.body.maxLength &&
      //   errors.push(
      //     this.$t("validations.maxLength", {
      //       field: this.$t("inputs.body").toLowerCase(),
      //       length: 255
      //     })
      //   );
      return errors;
    },
  },
};
</script>
