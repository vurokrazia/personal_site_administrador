<template>
  <v-row align="center" justify="space-around">
    <v-col cols="12">
      <v-select
        persistent-hint
        return-object
        single-line
        :item-text="item_text"
        :item-value="item_value"
        v-model="model"
        :items="items"
        :disabled="disabled"
        :readonly="readonly"
        :chips="chips"
        :multiple="multiple"
        :append-icon="appendIcon ? 'mdi-plus' : ''"
        :prepend-icon="prependIcon ? 'mdi-minus' : ''"
        label="Label"
      >
        <v-icon v-if="appendSlot" slot="append" color="green">mdi-plus</v-icon>
        <v-icon v-if="prependSlot" slot="prepend" color="red">mdi-minus</v-icon>
        <v-icon v-if="appendItemSlot" slot="append-item">mdi-contain-end</v-icon>
        <v-icon v-if="prependItemSlot" slot="prepend-item">mdi-contain-start</v-icon>
        <template v-if="selectSlot" v-slot:selection="{ item, index }">
          <v-chip v-if="index === 0">
            <span>{{ item }}</span>
          </v-chip>
          <span v-if="index === 1" class="grey--text caption">(+{{ model.length - 1 }} others)</span>
        </template>
      </v-select>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    items: Array,
    item_text: String,
    item_value: String
  },
  data: () => ({
    disabled: false,
    readonly: false,
    chips: true,
    multiple: true,
    appendIcon: false,
    appendSlot: false,
    appendItemSlot: false,
    prependIcon: false,
    prependSlot: false,
    prependItemSlot: false,
    selectSlot: false,
    model: []
  }),
  watch: {
    multiple(val) {
      if (val) this.model = [this.model];
      else this.model = this.model[0] || "Foo";
    },
    model() {
      this.$emit("update_select_list", { options: this.model });
    }
  }
};
</script>