<template>
  <div>
    <v-card-text>
      <v-form>
        <v-text-field
          v-model="resource.email"
          :label="$t('inputs.email')"
          required
          :error-messages="emailErrors"
          @input="$v.resource.email.$touch()"
          @blur="$v.resource.email.$touch()"
        />
        <v-text-field
          :label="$t('inputs.password')"
          v-model="resource.password"
          required
          :error-messages="passwordErrors"
          type="password"
          @input="$v.resource.password.$touch()"
          @blur="$v.resource.password.$touch()"
        />
        <v-text-field
          v-if="register"
          :label="$t('inputs.password_confirm')"
          v-model="resource.password_confirm"
          required
          type="password"
          @input="validatePassword"
          @blur="validatePassword"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn @click="sendElement" class="mx-5" :disabled="!match_password">
        {{ $t("buttons.send") }}
      </v-btn>
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
export default {
  props: {
    register: Boolean
  },
  mixins: [validationMixin],
  validations: {
    resource: {
      email: { required, minLength: minLength(15), maxLength: maxLength(255) },
      password: { required, minLength: minLength(6), maxLength: maxLength(20) }
    }
  },
  mounted(){
    if(!this.register)
      this.match_password = true
  },
  data() {
    return {
      resource: {
        email: "",
        password: "",
        password_confirm: ""
      },
      match_password: false
    };
  },
  methods: {
    sendElement() {
      this.$v.$touch();
      if(this.register)
        this.validatePassword()
      if (!this.$v.$invalid) {
        this.$emit("send-resource", {user:this.resource});
      }
    },
    validatePassword() {
      this.match_password = this.resource.password === this.resource.password_confirm
    }
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.resource.email.$dirty) return errors;
      !this.$v.resource.email.required &&
        errors.push(
          this.$t("validations.required", {
            field: this.$t("inputs.email").toLowerCase()
          })
        );
      !this.$v.resource.email.minLength &&
        errors.push(
          this.$t("validations.minLength", {
            field: this.$t("inputs.email").toLowerCase(),
            length: 15
          })
        );
      !this.$v.resource.email.maxLength &&
        errors.push(
          this.$t("validations.maxLength", {
            field: this.$t("inputs.email").toLowerCase(),
            length: 255
          })
        );
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.resource.password.$dirty) return errors;
      !this.$v.resource.password.required &&
        errors.push(
          this.$t("validations.required", {
            field: this.$t("inputs.password").toLowerCase()
          })
        );
      !this.$v.resource.password.minLength &&
        errors.push(
          this.$t("validations.minLength", {
            field: this.$t("inputs.password").toLowerCase(),
            length: 6
          })
        );
      !this.$v.resource.password.maxLength &&
        errors.push(
          this.$t("validations.maxLength", {
            field: this.$t("inputs.password").toLowerCase(),
            length: 20
          })
        );
      return errors;
    }
  }
};
</script>
