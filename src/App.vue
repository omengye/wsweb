<template>
  <div class="wrapper">
    <div id="continner" v-on:click="hideSuggest">
      <div id="canvascontinner" @click="backhome">
        <canvas id="canvas"/>
      </div>
      <div id="search" class="input-group">
        <div class="has-icon-right">
          <input
            id="search_txt"
            type="text"
            class="form-control form-input"
            placeholder="Search for..."
            ref="sinput"
            v-model="searchText"
            @keyup.enter="search"
            @keyup.up="itemUp"
            @keyup.down="itemDown"
          >
          <i class="form-icon icon icon-cross" @click="cleanText"></i>
        </div>
        <span class="input-group-btn" style="float:left;">
          <button
            id="sbtn"
            :class="[sbtnBase, sbtn?'loading':'']"
            type="button"
            @click="startSearch"
          >
            <i class="icon icon-search"></i>
          </button>
        </span>
      </div>
      <suggest
        ref="suggestRes"
        v-if="showSuggest"
        :suggests="suggests"
        @chooseItem="chooseItem"
      />
      <results
        ref="searchRes"
        :sbtn="sbtn"
        @update:sbtn="changeSbtn"
        @update:searchText="changeSText"
      />
    </div>
    <div class="footer">
      <div class="ipaddr">{{ipAddr}}</div>
      <div class="copyright">
        © 2019.
        <a class="tooltip tooltip-top" data-tooltip="丝绸之路">Silk Road</a>
      </div>
    </div>
  </div>
</template>

<script>
import Suggest from "./components/Suggest.vue";
import Results from "./components/Results.vue";
import utils from "./assets/js/utils.js";
import { setTimeout } from "timers";

export default {
  name: "app",
  components: {
    Suggest,
    Results
  },
  data() {
    return {
      Utils: utils,
      searchText: "",
      suggestWait: false,
      showSuggest: false,
      suggests: [],
      skipSearch: false,
      chooseIdx: -1,
      // control sbtn
      sbtn: false,
      sbtnBase: "btn btn-primary btn-action btn-lg",
      ipAddr: "",
      finTime: 0,
      searchInfo: {
        sort: "-",
        page: 1,
        lr: "-",
        dateRestrict: "-"
      }
    };
  },
  computed: {},
  methods: {
    startSearch() {
      this.searchInfo.page = 1;
      this.search();
    },
    search() {
      this.showSuggest = false;
      if (this.searchText !== "") {
        this.sbtn = true;
      }
      this.$refs.searchRes.search(this.searchInfo, this.searchText);
    },
    queryString() {
      var pairs = location.search.slice(1).split("&");
      var result = {};
      pairs.forEach(function(pair) {
        pair = pair.split("=");
        result[pair[0]] = decodeURIComponent(pair[1] || "");
      });
      return JSON.parse(JSON.stringify(result));
    },
    filterSuggest(val) {
      let res = [];
      let datas = val;
      if (
        datas.length < 2 ||
        !datas ||
        !(datas instanceof Array) ||
        !datas[1] ||
        !(datas[1] instanceof Array)
      ) {
        return res;
      }
      datas[1].forEach(element => {
        res.push(element[0]);
      });
      return res;
    },
    hideSuggest(event) {
      let suggestDiv = document.getElementById("suggest");
      if (suggestDiv && !suggestDiv.contains(event.target)) {
        this.showSuggest = false;
      }
    },
    chooseItem(data) {
      if (this.suggests.length > 0) {
        this.skipSearch = true;
        if (data.item && (data.click || data.key)) {
          this.searchText = data.item;
          this.chooseIdx = data.cidx;
        } else if (data.item) {
          this.chooseIdx = data.cidx;
        } else {
          this.showSuggest = false;
        }
        if (data.click) {
          this.startSearch();
        }
      }
    },
    itemUp() {
      if (this.suggests.length > 0) {
        if (this.chooseIdx <= 0) {
          this.chooseIdx = this.suggests.length - 1;
        } else {
          this.chooseIdx -= 1;
        }
        this.$refs.suggestRes.menter(this.chooseIdx, true);
      }
    },
    itemDown() {
      if (this.suggests.length > 0) {
        if (this.chooseIdx == this.suggests.length - 1) {
          this.chooseIdx = 0;
        } else {
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
      this.changeSbtn(true);
    },
    getParamFromUrl() {
      const parsed = this.queryString();
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
    },
    cleanText() {
      this.searchText = "";
      this.searchInfo.page = 1;
    },
    // logo
    draw() {
      const myFont = new FontFace("Inkfree", "url(http://cdn.jsdelivr.net/gh/omengye/wsweb/public/fonts/Inkfree.woff2)");
      myFont.load().then(font => {
        document.fonts.add(font);
        var ctx = document.getElementById("canvas").getContext("2d");
        ctx.font = "100px Inkfree";
        var str = "scz.lu";
        ctx.fillText(str, 32, 110);
      });
    },
    backhome() {
      window.location.href = window.location.origin + window.location.pathname;
    }
  },
  watch: {
    searchText() {
      if (this.searchText != "" && !this.suggestWait && !this.skipSearch) {
        this.suggestWait = true;
        this.finTime = 0;
        this.showSuggest = false;

        utils.queryRequest(
          "/api/gcs/suggest?q=" + encodeURI(this.searchText),
          data => {
            if (
              this.searchText == "" ||
              this.sbtn ||
              (this.finTime > 0 && new Date() > this.finTime)
            ) {
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
          () => {
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
    this.$refs["sinput"].focus();
    utils.getToken(() => {
      if (window.localStorage.access_token) {
        this.ipAddr =
          "Your IP: " + JSON.parse(window.localStorage.access_token).ip;

        this.getParamFromUrl();
        this.search();
      }
    });
    this.draw();
  },
  created() {}
};
</script>

<style>
@import "assets/css/search.css";
</style>
