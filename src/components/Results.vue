<template>
  <div id="result">
    <div id="infos" v-show="showInfo">
      <div v-if="serror">{{errorMsg}}</div>
      <div v-else>
        找到约<span id="stotal">{{stotal}}</span>条记录 (用时<span id="stime">{{stime}}</span>秒)
      </div>
    </div>
    <div id="items">
      <div class='item' v-for="(item, idx) in items" :key="idx">
        <div class='title'>
          <a class='link' href='item.link' target='_blank'>{{item.htmlTitle}}</a>
        </div>
        <div class='formattedUrl'>{{item.formattedUrl}}</div>
        <div class='htmlSnippet'>{{item.htmlSnippet}}</div>
      </div>
    </div>
    <div v-show="showPage">
      <pagehelper ref="pager" v-bind:cpage="page" v-on:changePage="changePage"/>
    </div>
  </div>
</template>

<script>
import utils from '../assets/js/utils.js'
import Pagehelper from './Pagehelper.vue'
export default {
  name: "Results",
  props: {
    searchText: String,
    sbtn: Boolean
  },
  components: {
    Pagehelper
  },
  data() {
      return {
          showInfo: false,
          page: 1,
          rowNUm: 10, 
          serror: false,
          showPage: false,
          stotal: 0,
          stime: 0,
          items: [],
          errorMsg: ''
      }
  },
  methods: {
    showInfoMsg(stotal, stime) {
      this.stotal = stotal;
      this.stime = stime;
      this.showInfo = true;
    },
    showErrorInfo(error) {
      debugger;
      this.serror = true;
      this.errorMsg = utils.formatErrorMsg(error);
      this.showInfo = true;
    },
    search() {
      utils.queryRequest('/gcs/api/g?q='+encodeURI(this.searchText)+"&start="+this.page, 
        (data)=> {
          this.serror = false;
          this.$emit('update:sbtn', false);
          let stime = data.searchInformation.formattedSearchTime;
          let stotal = data.searchInformation.formattedTotalResults;
          this.showInfoMsg(stotal, stime);
          
          this.items = data.items;
          if (this.items.length == this.rowNUm && this.page > 1) {
            this.showPage = true;
          }
          this.$refs.pager.commit();
        },
        (error) => {
          this.$emit('update:sbtn', false);
          this.$refs.pager.rollback();
          debugger;
          this.showErrorInfo(error);
        }
      );

    },
    changePage(p) {
      this.page = p;
      this.search();
    }
  }
};
</script>

<style scoped>
</style>
