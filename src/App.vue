<template>
  <div class="wrapper">
    <div class="moon" @click="changeMode">
      <svg style="fill: var(--color-promo-color-modes-toggle-moon); margin: 12px 0 0 11px;" width="20" height="18" viewBox="0 0 20 18" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.28352 10.5764C10.8677 10.5764 14.5839 6.86014 14.5839 2.27596C14.5839 1.7242 14.5301 1.18501 14.4274 0.663368C14.3548 0.294826 14.7414 -0.0153636 15.0516 0.196463C17.4905 1.86202 19.0914 4.66438 19.0914 7.84067C19.0914 12.9493 14.9501 17.0907 9.84145 17.0907C5.24982 17.0907 1.43959 13.7451 0.715408 9.35868C0.654273 8.98839 1.09783 8.76831 1.40118 8.98931C2.77129 9.98745 4.45863 10.5764 6.28352 10.5764Z"></path>
      </svg>
    </div>
    <div id="container" v-on:click="hideSuggest" style="display:none;">
      <div id="canvascontainer" @click="backhome">
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
            @keyup.enter="startSearch"
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
        © {{copyright_year}}.
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
      copyright_year: 0,
      searchInfo: {
        sort: "-",
        page: 1,
        lr: "-",
        dateRestrict: "-"
      },
      myFont: new FontFace("Inkfree", "url(https://cdn.jsdelivr.net/gh/omengye/wsweb/public/fonts/Inkfree.woff2)"),
      darkmode: false
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
        if (this.chooseIdx === this.suggests.length - 1) {
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
      this.$refs["sinput"].focus();
    },
    // logo
    draw(style) {
      this.myFont.load().then(font => {
        document.fonts.add(font);
        const ctx = document.getElementById("canvas").getContext("2d");
        ctx.font = "100px Inkfree";
        ctx.fillStyle = style;
        const str = "scz.lu";
        ctx.fillText(str, 32, 110);
      });
    },
    backhome() {
      window.location.href = window.location.origin + window.location.pathname;
    },
    initMode() {
      this.$refs.searchRes.darkmode = this.darkmode
      let cssUrl = document.getElementById('css-mode').href;
      let cssFile = cssUrl.split('/')[cssUrl.split('/').length-1];
      if (this.darkmode) {
        this.draw('#bcc3ce');
        document.getElementById('css-mode').href = cssUrl.replace(cssFile, 'search-dark.css')
      }
      else {
        this.draw('black');
        document.getElementById('css-mode').href = cssUrl.replace(cssFile, 'search.css')
      }
      document.getElementById('container').style["display"] = "block"
    },
    changeMode() {
      this.darkmode = !this.darkmode;
      localStorage.setItem('mode', this.darkmode);
      this.initMode();
    }
  },
  watch: {
    searchText() {
      if (this.searchText !== "" && !this.suggestWait && !this.skipSearch) {
        this.suggestWait = true;
        this.finTime = 0;
        this.showSuggest = false;

        utils.queryRequest(
          "/api/gcs/suggest?q=" + encodeURI(this.searchText),
          data => {
            if (
              this.searchText === "" ||
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
        this.ipAddr = "From: " + JSON.parse(window.localStorage.access_token).ip;
        this.copyright_year = JSON.parse(window.localStorage.access_token).visitTime.substring(0, 4);
        this.getParamFromUrl();
        this.search();
      }
    });
    if (localStorage.hasOwnProperty('mode')) {
      this.darkmode = JSON.parse(localStorage.getItem('mode'))
    }
    this.initMode();
  },
  created() {}
};
</script>


