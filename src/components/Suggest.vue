<template>
  <div id="suggest">

    <div class='sitem' v-for="(suggest, idx) in suggests" :key="idx" v-bind:class="{selitem: idx===cIdx}" 
      v-on:mouseenter="menter(idx)" v-on:click="clickItem(idx)">
      <div class='sval' v-html="suggest">
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Suggest',
  data() {
    return {
      cIdx: -1,
    }
  },
  props: {
    suggests: Array,
  },
  methods: {
    getHtmlVal(i) {
      return document.getElementsByClassName('sval')[i].innerHTML;
    },
    menter(idx, keyType) {
      this.cIdx = idx;
      if (keyType) {
        this.$emit('chooseItem', {item: this.getHtmlVal(idx), click: false, cidx: idx, key: true});
      }
      else {
        this.$emit('chooseItem', {item: this.getHtmlVal(idx), click: false, cidx: idx, key: false});
      }
    },
    clickItem(idx) {
      this.$emit('chooseItem', {item: this.getHtmlVal(idx), click: true, cidx: idx});
    }
  },
  computed: {

  },
  watch: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
