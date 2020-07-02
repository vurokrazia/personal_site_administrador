<template>
  <div  style="height: 35em;"       class=" justify-center mb-6 d-flex align-content-center flex-wrap text-center">  
    <v-progress-circular  v-for="i in 5" :width="width[i]" :size="size[i]" :color="colors[i]" indeterminate :key="i"></v-progress-circular>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colors: ["primary", "secondary", "purple", "green", "amber"],
      size: [50,25,60,35,50],
      width:[4,3,5,4,2]
    };
  }
};
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>