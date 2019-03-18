<template>
  <div id="result">
    <div id="infos" v-show="showInfo">
      <div v-if="serror">{{errorMsg}}</div>
      <div v-else>找到约
        <span id="stotal">{{stotal}}</span>条记录 (用时
        <span id="stime">{{stime}}</span>秒)
      </div>
    </div>
    <div id="items">
      <div class="item" v-for="(item, idx) in items" :key="idx">
        <div class="title">
          <a class="link" v-bind:href="item.link" target="_blank" v-html="item.htmlTitle"></a>
        </div>
        <div class="formattedUrl">{{item.formattedUrl}}</div>
        <div class="htmlSnippet" v-html="item.htmlSnippet"></div>
      </div>
    </div>
    <div v-show="showPage" style="margin-top:10px;">
      <pagehelper ref="pager" v-bind:enddingPage="enddingPage" v-bind:cpage="page" v-on:changePage="changePage"/>
    </div>
  </div>
</template>

<script>
import utils from "../assets/js/utils.js";
import Pagehelper from "./Pagehelper.vue";
export default {
  name: "Results",
  props: {
    sbtn: Boolean
  },
  components: {
    Pagehelper
  },
  data() {
    return {
      searchText: '',
      showInfo: false,
      page: 1,
      rowNum: 10,
      serror: false,
      showPage: false,
      stotal: 0,
      stime: 0,
      items: [],
      errorMsg: "",
      maxPage: 10,
      enddingPage: false
    };
  },
  methods: {
    showInfoMsg(stotal, stime) {
      this.stotal = stotal;
      this.stime = stime;
      this.showInfo = true;
    },
    errorInfo(str) {
      this.serror = true;
      this.errorMsg = str;
      this.showInfo = true;
    },
    showErrorInfo(error) {
      this.errorInfo(utils.formatErrorMsg(error));
    },
    startNum() {
      return (this.page - 1) * this.rowNum + 1;
    },
    isEnddingPage() {
      if ((this.maxPage-1)*this.rowNum < this.startNum()
        || this.page >= 1 && this.items.length < this.rowNum) {
          this.enddingPage = true;
      }
      else {
        this.enddingPage = false;
      }
    },
    search(spage, searchText) {
      if (searchText) {
        this.searchText = searchText;
      }
      if (spage) {
        this.page = spage;
      }
      utils.queryRequest(
        "/gcs/api/g?q=" +
          encodeURI(this.searchText) +
          "&start=" +
          this.startNum(),
        data => {
          this.serror = false;
          this.$emit("update:sbtn", false);

          if (data.searchInformation == null) {
            this.items = [];
            this.errorInfo("No Data Found");
          } 
          else if (data.items == null) {
            this.items  = [];
          }
          else {
            let stime = data.searchInformation.formattedSearchTime;
            let stotal = data.searchInformation.formattedTotalResults;
            this.showInfoMsg(stotal, stime);
            this.items = data.items;
          }

          if (this.items.length == this.rowNum && this.page > 0) {
            this.showPage = true;
          }

          this.isEnddingPage();
          this.$refs.pager.commit();
          window.scrollTo(0, 0);
        },
        error => {
          this.$emit("update:sbtn", false);
          this.$refs.pager.rollback();
          this.showErrorInfo(error);
        }
      );
    },
    changePage(p) {
      this.page = p;
      this.search();
    }
  },
  watch: {
  }
};
</script>

<style scoped>
</style>
