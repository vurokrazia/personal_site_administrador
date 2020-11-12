<template>
  <v-row class="mt-5">
    <v-col
      v-for="(red, index) in redes"
      :key="index"
      xs="12"
      sm="6"
      md="3"
      lg="3"
      class="px-5 py-5"
    >
      <v-card
        height="100%"
        outlined
        style="border: none"
        @click="move_site(red.media)"
      >
        <v-img
          v-if="red.url"
          class="white--text align-end"
          height="17em"
          :src="red.url"
        ></v-img>
        <v-card-title>
          <h1 class="move">{{ red.name }}</h1>
          <p class="mt-5">{{ red.description }}</p>
        </v-card-title>
      </v-card>
      <div class="border-botom" />
    </v-col>
  </v-row>
</template>
<script>
// import utils from "../../mixins/utils";
export default {
  name: "IndexCategories",
  data() {
    return {
      loading: false,
      display_scroll: false,
      redes: [
        {
          name: "Twitter",
          media: "https://twitter.com/Vurokrazia",
          url:
            "https://pbs.twimg.com/profile_images/1308010958862905345/-SGZioPb_400x400.jpg",
          description: "Aquí me encuentran compartiendo mi día a día y videos",
        },
        {
          name: "Instagram",
          media: "https://www.instagram.com/vurokrazia94",
          url:
            "https://neilpatel.com/wp-content/uploads/2017/08/instagram-1.jpg",
          description:
            "Aquí ven mis fotos y proyectos que compartor en fotos e historias",
        },
        {
          name: "Linkedin",
          media: "https://www.linkedin.com/in/vurokrazia/",
          url:
            "data:image/png;base64,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",
          description: "Aqui pueden ver mi profile.",
        },
        {
          name: "Linkedin",
          media: "https://www.youtube.com/c/vurokrazia",
          url: "https://www.espaciosano.es/wp-content/uploads/2020/04/youtube.png",
          description: "Aqui pueden ver mi canal y videos.",
        },
      ],
    };
  },
  methods: {
    move_site(url) {
      window.open(url, "_blank");
    },
  },
  computed: {},
};
</script>