<template>
  <dialog-default btn_title="Subir imagen" :prop_width="'60%'">
    <template v-slot:card-title>
      <span class="headline">Subir imagenes</span>
    </template>
    <template v-slot:card-body>
      <upload-images event_emit="add_image" @add_image="add_image" resource="multimedium"></upload-images>
    </template>
  </dialog-default>
</template>

<script>
import DialogDefault from "../partials/dialog_default";
import UploadImages from '../partials/upload_files'
import { mapMutations } from 'vuex';
export default {
  components: {
    DialogDefault,
    UploadImages
  },
  props: {
    title: String
  },
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    ...mapMutations('imageModule',['setImage']),
    add_image(data){
      this.setImage(data.image)
    }
  },
};
</script>