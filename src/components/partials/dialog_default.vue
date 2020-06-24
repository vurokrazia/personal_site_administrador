<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" :width="card_width" id="images_index">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">{{btn_title}}</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <slot name="card-title"></slot>
        </v-card-title>
        <v-card-text>
          <slot name="card-body"></slot>
        </v-card-text>
        <v-card-actions>
          <slot name="card-buttons"></slot>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    btn_title: String,
    prop_width: { type: String, required: false },
    name_class: String
  },
  data() {
    return {
      dialog: false,
      card_width: "100%"
    };
  },
  created() {
    if (this.prop_width) this.card_width = this.prop_width;
  }
};
</script>