<template>
  <div >
    <!-- <v-parallax
        v-if="show_image"
        :src="
          experience_resource.banner && experience_resource.banner.url_root
            ? experience_resource.banner.url_root
            : 'https://i.pinimg.com/originals/1f/b0/18/1fb018ea996d42ac2bc1c73416fc7523.jpg'
        "
    >
        <v-row class="d-flex align-end flex-column pa-5">
          <v-btn
            v-if="is_administrator && experience_resource.banner"
            icon
            class="danger"
            @click="removeImage(experience_resource.banner)"
          >
            <v-icon>close</v-icon>
          </v-btn>
          <input
            v-if="reset"
            multiple
            type="file"
            style="display: none"
            ref="banner"
            accept="image/png, image/jpeg"
            @change="onFilePicked"
          />
          <v-btn
            v-if="is_administrator && !experience_resource.banner"
            icon
            class="primary"
            @click="$refs.banner.click()"
          >
            <v-icon>add_photo_alternate</v-icon>
          </v-btn>
        </v-row>
        <v-row justify="center">
          <v-col class="text-center" cols="12">
            <h1 class="display-1 font-weight-thin mb-4">{{ experience_resource.title }}</h1>
            <h4 class="subheading">{{ experience_resource.description }}</h4>
          </v-col>
       </v-row>
    </v-parallax> -->
    <v-container fluid>
      <v-row>
        {{article}}
      </v-row>
    </v-container>
  </div>
</template>
<script>
// import utils from "../../mixins/utils";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "ArticleShow",
  props: {
    param_experience: Object
  },
  watch: {
    
  },
  data() {
    return { reset: true, show_image: false };
  },
  computed: {
    // ...mapGetters("authModule", ["is_administrator"]),
    ...mapGetters("articleModule", ["article"])
  },
  mounted() {
  },
  methods: {
    ...mapMutations("appModule", ["setMessage"]),
    // ...mapActions("articleModule", ["addPicture", "destroyEPicture"]),
    onFilePicked(e) {
      const files = e.target.files;
    },
  }
};
</script>
