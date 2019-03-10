<template>
  <div id="suggest">

    <div class='sitem' v-for="(suggest, idx) in suggests" :key="idx" v-bind:class="{selitem: idx===cIdx}" 
      v-on:mouseenter="menter(idx)" v-on:click="clickItem(idx)">
      <div class='sval'>
        {{suggest}}
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Suggest',
  data() {
    return {
      cIdx: this.chooseIdx
    }
  },
  props: {
    suggests: Array,
    chooseIdx: Number
  },
  methods: {
    menter(idx) {
      this.cIdx = idx
    },
    clickItem(idx) {
      this.$emit('chooseItem', {item: this.suggests[idx], click: true});
    }
  },
  computed: {

  },
  watch: {
    chooseIdx() {
      if (this.suggests.length>0) {
        this.cIdx = this.chooseIdx;
        this.$emit('chooseItem', {item: this.suggests[this.cIdx], click: false});
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
