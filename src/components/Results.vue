<template>
  <div id="result">
    <div id="infos" v-if="showInfo"></div>
    <div id="items"></div>
    <div id="pageneration"></div>
  </div>
</template>

<script>
export default {
  name: "Results",
  props: {
    msg: String
  },
  data() {
      return {
          showInfo: false
      }
  }
};
</script>

<style scoped>
</style>
