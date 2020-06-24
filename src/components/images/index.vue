<template>
  <dialog-default btn_title="Ver imagenes" name_class="#images_index">
    <template v-slot:card-title>
      <span class="headline">ver imagenes</span>
      <v-btn icon @click="moreCount">
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon @click="subsCount">
        <v-icon>mdi-bookmark</v-icon>
      </v-btn>
    </template>
    <template v-slot:card-body>
      <v-row dense>
        <v-col v-for="image in images" :key="image.id" :cols="cols">
          <v-card>
            <v-img
              :src="image.image"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="image.name"></v-card-title>
            </v-img>
            <v-card-actions>
              <p style="font-size:10px;">{{ image.image }}</p>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </dialog-default>
</template>

<script>
import mixins from "../../mixins";
import DialogDefault from "../partials/dialog_default";
import { mapMutations, mapActions, mapGetters } from "vuex";
export default {
  components: {
    DialogDefault
  },
  props: {
    title: String
  },
  data() {
    return {
      cols: 6
    };
  },
  mixins: [mixins],
  methods: {
    ...mapActions("imageModule", ["getImages"]),
    ...mapMutations("imageModule", ["setImages", "setPage"]),
    moreCount() {
      if (this.cols <= 11) this.cols++;
    },
    subsCount() {
      if (this.cols >= 2) this.cols--;
    },
    find_images() {
      this.getImages({page:this.page,per_page:1000})
        .then(result => {
          this.setImages(result.data);
          this.setPage(this.page + 1);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.setPage(1);
    this.find_images();
  },
  computed: {
    ...mapGetters("imageModule", ["images", "page"])
  }
};
</script>