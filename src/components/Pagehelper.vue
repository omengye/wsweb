<template>
  <div class="pagination">
    <li id="startp" :class="{ loading: clickType==='startp'}" style="display: block;">
      <a class="pbtn" @click="changePage('startp')">&lt;&lt;</a>
    </li>
    <li id="prevp" :class="{ loading: clickType==='prevp'}" v-show="page>1 || clickType==='prevp'">
      <a class="pbtn" @click="changePage('prevp')">&lt;</a>
    </li>
    <li>
      <a id="Tpagenum">Page {{page}}</a>
    </li>
    <li id="nextp" :class="{ loading: clickType==='nextp'}" v-show="!enddingPage" >
      <a class="pbtn" @click="changePage('nextp')">&gt;</a>
    </li>
  </div>
</template>

<script>
export default {
  name: "Pagehelper",
  props: {
    cpage: Number,
    enddingPage: Boolean
  },
  data() {
    return {
      page: this.cpage < 1 ? 1 : this.cpage,
      pagebak: 1,
      clickType: ''
    };
  },
  methods: {
    changePage(type) {
      this.clickType = type;
      if (type === "startp") {
        this.page = 1;
      } else if (type === "prevp") {
        this.page -= 1;
      } else if (type === "nextp") {
        this.page += 1;
      }
      this.$emit('changePage', this.page);
    },
    commit() {
      this.clickType = '';
      this.pagebak = this.page;
    },
    rollback() {
      this.clickType = '';
      this.page = this.pagebak;
    }
  },
  watch: {
    cpage() {
      this.page = this.cpage;
    }
  }

};
</script>

<style scoped>
</style>
