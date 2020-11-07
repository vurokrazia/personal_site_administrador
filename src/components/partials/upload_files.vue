<template>
  <div>
    <v-progress-linear height="10" :value="porcentage" striped color="lime"></v-progress-linear>
    <file-pond
      name="image"
      ref="pond"
      :instantUpload="true"
      label-idle="Drop files here..."
      v-bind:allow-multiple="true"
      accepted-file-types="image/jpeg, image/png"
      :server="serverOptions"
      v-bind:files="myFiles"
      v-on:processfile="sendStart"
      v-on:init="handleFilePondInit"
    />
  </div>
</template>

<script>
// Import Vue FilePond
import vueFilePond from "vue-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
// Import FilePond plugins
// Please note that you need to install these plugins separately
// Import image preview plugin styles
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import { url } from "../../env_files/var";
import { mapGetters } from "vuex";
// Create component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);

export default {
  props: {
    resource: String,
    event_emit: String,
  },
  data: function() {
    return {
      loading: false,
      images_size: 0,
      process_size: 0,
      porcentage: 0,
      serverOptions: {
        url: url,
        process: {
          url: this.resource,
          headers: {
            Authorization: ""
          }
        }
      },
      myFiles: []
    };
  },
  methods: {
    handleFilePondInit: function() {
      this.serverOptions.process.headers.Authorization = "Bearer " + this.token;
      //console.log("FilePond has initialized");
      // FilePond instance methods are available on `this.$refs.pond`
    },
    sendStart() {
      var index = 0;
      if (!this.loading) {
        this.images_size = this.$refs.pond.getFiles().length;
        this.loading = true;
      }
      this.$refs.pond.getFiles().map(e => {
        switch (e.status) {
          case 5:
            this.$emit(this.event_emit, { image: JSON.parse(e.serverId) });
            this.$refs.pond.removeFile(index);
            this.process_size = this.process_size + 1;
            let porcentage = 100 / this.images_size;
            let process = porcentage * this.process_size;
            this.porcentage = process == 0 ? 100 : process;
            if (this.porcentage >= 100) {
              this.loading = false;
              this.porcentage = 0;
            }
            break;
          default:
            break;
        }
        //PROCESSING_COMPLETE
        index++;
      });
      //console.log(this.$refs.pond.getFiles());
    }
  },
  components: {
    FilePond
  },
  computed: {
    ...mapGetters("authModule", ["token"])
  }
};
</script>