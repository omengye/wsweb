<template>
  <div id="result">
    <div>   
      <div  class="flip-container"> 
        <div id="tools" class="flipper">
          <div id="infos" :class="['front',showMenu?'frontflip':'']" v-show="showInfo">
            <div v-if="serror" class="errormsg">{{errorMsg}}</div>
            <div v-else>找到约
              <span id="stotal">{{stotal}}</span>条记录 (用时
              <span id="stime">{{stime}}</span>秒)
            </div>
          </div>
          <div id="selMenu" :class="['back',showMenu?'backflip':'']">
            <div class="form-group menuForm">
              <select v-model="searchInfo.lr" class="form-select select-sm" :style="{'background-color': lrColor}" @change="onchange">
                <option value="-" class="bcolorw">不限语言</option>
                <option value="lang_en" class="bcolorw">English</option>
                <option value="lang_zh-CN" class="bcolorw">简体中文</option>
                <option value="lang_zh-TW" class="bcolorw">繁体中文</option>
              </select>
            </div>
            <div class="form-group menuForm menuFormDest">
              <select v-model="searchInfo.dateRestrict" class="form-select select-sm" :style="{'background-color': dateRestrictColor}" @change="onchange">
                <option value="-" class="bcolorw">不限时间</option>
                <option value="d1" class="bcolorw">过去1天</option>
                <option value="w1" class="bcolorw">过去1周</option>
                <option value="m1" class="bcolorw">过去1月</option>
                <option value="y1" class="bcolorw">过去1年</option>
              </select>
            </div>
            <div class="form-group menuForm menuFormDest">
              <select v-model="searchInfo.sort" class="form-select select-sm" :style="{'background-color': sortColor}" @change="onchange">
                <option value="-" class="bcolorw">相关排序</option>
                <option value="date" class="bcolorw">时间排序</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <button id="menu" type="button" @click="menu" 
        v-bind:class="[menuClassWhite?'bcolorw':'bcolor']">
        <i class="icon icon-more-horiz"></i>
      </button>
    </div>
    <div class="correct-spelling" v-show="spelling">
      <div id="spelling">
        <span>您是不是要找: </span> 
        <a @click="corrQuery">{{correctedQuery}}</a>
      </div>
    </div>
    <div id="items">
      <div class="item" v-for="(item, idx) in items" :key="idx">
        <div class="title">
          <a class="link" :href="item.link" target="_blank" v-html="item.htmlTitle"></a>
        </div>
        <div class="formattedUrl">{{item.formattedUrl}}</div>
        <div class="htmlSnippet" v-html="item.htmlSnippet"></div>
      </div>
    </div>
    <div v-show="showPage" style="margin-top:10px;">
      <pagehelper ref="pager" :enddingPage="enddingPage" :cpage="searchInfo.page" v-on:changePage="changePage"/>
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
      searchInfo: {},
      rowNum: 10,
      serror: false,
      showPage: false,
      stotal: 0,
      stime: 0,
      items: [],
      errorMsg: "",
      maxPage: 10,
      enddingPage: false,
      showMenu: false,
      spelling: false,
      correctedQuery: ''
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
      this.showMenu = false;
    },
    showErrorInfo(error) {
      this.errorInfo(utils.formatErrorMsg(error));
    },
    startNum() {
      return (this.searchInfo.page - 1) * this.rowNum + 1;
    },
    isEnddingPage() {
      this.enddingPage = (this.maxPage - 1) * this.rowNum < this.startNum()
              || this.searchInfo.page >= 1 && this.items.length < this.rowNum;
    },
    search(searchInfo, searchText) {
      if (searchInfo) {
        this.searchInfo = searchInfo;
      }
      if (searchText) {
        this.searchText = searchText;
      }
      else if (!searchText && !this.searchText){
        return;
      }
      utils.queryRequest(
        "/api/gcs/g" + this.genSearchUrl(),
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
            this.items = data.items;
          }
          if (data.searchInformation) {
            let stime = data.searchInformation.formattedSearchTime;
            let stotal = data.searchInformation.formattedTotalResults;
            this.showInfoMsg(stotal, stime);
          }

          if (this.items.length === this.rowNum && this.searchInfo.page > 0) {
            this.showPage = true;
          }

          if (data.spelling && data.spelling.correctedQuery) {
            this.spelling = true;
            this.correctedQuery = data.spelling.correctedQuery;
          }
          else {
            this.spelling = false;
          }

          this.setBrowerUrl();
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
      this.searchInfo.page = p;
      this.search();
    },
    setBrowerUrl() {
      let str = "?q="+this.searchText;
      for (let i in this.searchInfo) {
        if (this.searchInfo[i] && this.searchInfo[i]!=='-') {
          str += "&"+i+"="+this.searchInfo[i];
        }
      }
      window.history.pushState(null, null, str);
    },
    genSearchUrl() {
      var str = "?num=10&q="+encodeURI(this.searchText);
      for (var i in this.searchInfo) {
        if (this.searchInfo[i] && this.searchInfo[i]!=='-') {
          if (i === "page") {
            str += "&start="+this.startNum();
            continue;
          }
          str += "&"+i+"="+this.searchInfo[i];
        }
      }
      return str;
    },
    menu() {
      this.showMenu = !this.showMenu;
    },
    corrQuery() {
      this.searchText = this.correctedQuery;
      this.searchInfo.page = 1;
      this.$emit("update:searchText", this.searchText);
      this.search();
    },
    onchange() {
      this.searchInfo.page = 1;
    },
    colorChange(type) {
      return this.searchInfo===undefined || this.searchInfo[type]==='-' ?'white':'#ececec';
    }
  },
  computed: {
    lrColor() {
      return this.colorChange('lr');
    },
    dateRestrictColor() {
      return this.colorChange('dateRestrict');
    },
    sortColor() {
      return this.colorChange('sort');
    },
    menuClassWhite() {
      if ((this.searchInfo.sort===undefined&&this.searchInfo.lr===undefined&&this.searchInfo.dateRestrict===undefined)
        || (this.searchInfo.sort==='-'&&this.searchInfo.lr==='-'&&this.searchInfo.dateRestrict==='-')) {
        return true;
      }
      return false;
    }
  },
  watch: {
  }
};
</script>

<style scoped>
</style>
