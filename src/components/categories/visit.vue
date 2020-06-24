<template>
  <div >
    <show-experience
      v-for="(experience,index) in experiences"
      :key="index"
      :param_experience="experience"
    />
  </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import ShowExperience from "../experiences/show";
export default {
  components: {
    ShowExperience
  },
  data() {
    return {
      show:false,
      erros: null,
      colors: ["primary", "secondary", "yellow darken-2", "red", "orange"]
    };
  },
  methods: {
    ...mapMutations("experienceModule", ["setExperiences"]),
    ...mapActions("experienceModule", ["getExperiences"]),
    ...mapActions("curriculumModule", ["destroyCPicture"])
  },
  computed: {
    ...mapGetters("experienceModule", ["experiences"])
  }
};
</script>