<template>
<div class="wrapper">
  <div id="continner" v-on:click="hideSuggest">
    <div id="search" class="input-group">
      <input id="search_txt" type="text" class="form-control" placeholder="Search for..." 
        ref="sinput" 
        v-model="searchText" v-on:keyup.enter="search"
        v-on:keyup.up="itemUp" v-on:keyup.down="itemDown">
      <span class="input-group-btn" style="float:left;">
        <button
          id="sbtn"
          v-bind:class="[sbtnBase, sbtn?'loading':'']"
          type="button"
          v-on:click="search"
        >
          <i class="icon icon-search"></i>
        </button>
      </span>
    </div>
    <suggest ref="suggestRes" v-if="showSuggest" v-bind:suggests="suggests" v-on:chooseItem="chooseItem"/>
    <results ref="searchRes" v-bind:sbtn="sbtn" v-on:update:sbtn="changeSbtn" v-on:update:searchText="changeSText"/>
  </div>
  <div class="footer">
    <div class="ipaddr">
      {{ipAddr}}
    </div>
    <div class="copyright">
      © 2019. <a class="tooltip tooltip-top" data-tooltip="丝绸之路">Silk Road</a>
    </div>
  </div>
</div>
</template>

<script>
import Suggest from './components/Suggest.vue'
import Results from './components/Results.vue'
import utils from './assets/js/utils.js'
import { setTimeout } from 'timers';

export default {
  name: "app",
  components: {
    Suggest,
    Results
  },
  data() {
    return {
      Utils: utils,
      searchText: '',
      suggestWait: false,
      showSuggest: false,
      suggests: [],
      skipSearch: false,
      chooseIdx: -1,
      // control sbtn
      sbtn: false,
      sbtnBase: 'btn btn-primary btn-action btn-lg',
      ipAddr: '',
      finTime: 0,
      searchInfo: {
        sort: '-',
        page: 1,
        lr: '-',
        dateRestrict: '-'
      },
      queryString: require('query-string')
    };
  },
  computed: {
  },
  methods: {
    search() {
      this.showSuggest = false;
      if (this.searchText!=='') {
        this.sbtn = true;
      }
      this.$refs.searchRes.search(this.searchInfo, this.searchText);
    },
    filterSuggest(val) {
      let res = [];
      let datas = val;
      if (datas.length<2 || !datas || !(datas instanceof Array) || !datas[1] || !(datas[1] instanceof Array)) {
        return res;
      }
      datas[1].forEach(element => {
        res.push(element[0]);
      });
      return res;
    },
    hideSuggest(event) {
      let suggestDiv = document.getElementById("suggest");
      if(suggestDiv && !suggestDiv.contains(event.target)){
        this.showSuggest = false;
      }
    },
    chooseItem(data) {
      if (this.suggests.length > 0) {
        this.skipSearch = true;
        if (data.item && (data.click||data.key)) {
          this.searchText = data.item;
          this.chooseIdx = data.cidx;
        }
        else if (data.item) {
          this.chooseIdx = data.cidx;
        }
        else {
          this.showSuggest = false;
        }
        if (data.click) {
          this.search();
        }
      }
    },
    itemUp() {
      if (this.suggests.length > 0) {
        if (this.chooseIdx <= 0) {
          this.chooseIdx = this.suggests.length - 1;
        }
        else {
          this.chooseIdx -= 1;
        }
        this.$refs.suggestRes.menter(this.chooseIdx, true);
      }
    },
    itemDown() {
      if (this.suggests.length > 0) {
        if (this.chooseIdx == this.suggests.length-1) {
          this.chooseIdx = 0;
        }
        else {
          this.chooseIdx += 1;
        }
        this.$refs.suggestRes.menter(this.chooseIdx, true);
      }
    },
    changeSbtn(data) {
      this.finTime = new Date();
      this.sbtn = data;
      this.showSuggest = false;
    },
    changeSText(data) {
      this.searchText = data;
      this.showSuggest = false;
      this.suggestWait = true;
    },
    getParamFromUrl() {
      const parsed = this.queryString.parse(location.search);
      for (var i in this.searchInfo) {
        if (parsed[i]) {
          if (i === "page") {
            this.searchInfo.page = parseInt(parsed.page);
            continue;
          }
          this.searchInfo[i] = parsed[i];
        }
      }
      if (parsed.q) {
        this.searchText = parsed.q;
      }
    }
  },
  watch: {
    searchText() {
      if (this.searchText!='' && !this.suggestWait && !this.skipSearch) {
        this.suggestWait = true;
        this.finTime = 0;
        this.showSuggest = false;

        utils.queryRequest('/gcs/api/suggest?q='+encodeURI(this.searchText),
          (data)=>{
            if (this.searchText=='' || this.sbtn || (this.finTime>0 && new Date()>this.finTime)) {
              this.showSuggest = false;
              return;
            }
            let suggests = this.filterSuggest(data);
            if (suggests.length > 0) {
              this.showSuggest = true;
              this.chooseIdx = -1;
              this.suggests = suggests;
            }
          },
          ()=> {
            // this.$refs.searchRes.showErrorInfo(error);
            this.showSuggest = false;
          }
        );

        setTimeout(() => {
          this.suggestWait = false;
        }, 500);
      }
      
      this.skipSearch = false;
    }
  },
  mounted() {
    this.$refs['sinput'].focus();
    utils.getToken(()=>{
      if (window.localStorage.access_token) {
        this.ipAddr = "Your IP: " + JSON.parse(window.localStorage.access_token).ip;

        this.getParamFromUrl();
        this.search();
      }
    });
  },
  created() {
  }
};
</script>

<style>
@import "assets/css/spectre.min.css";
@import "assets/css/spectre-icons.min.css";
@import "assets/css/search.css";

</style>
