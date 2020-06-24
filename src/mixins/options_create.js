import { mapMutations, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    form_data_resource(resource_create,name) {
      let data_form = new FormData();
      for (var key in resource_create) {
        data_form.append(`${name}[${key}]`, resource_create[key]);
      }
      return data_form;
    },
  }
};