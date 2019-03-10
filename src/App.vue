<template>
  <div id="continner" v-on:click="hideSuggest">
    <div id="search" class="input-group">
      <input id="search_txt" type="text" class="form-control" placeholder="Search for..." 
        ref="sinput" 
        v-model="searchText" v-on:keyup.enter="search"
        v-on:keyup.up="itemUp" v-on:keyup.down="itemDown">
      <span class="input-group-btn" style="float:left;">
        <button
          id="sbtn"
          class="btn btn-primary btn-action btn-lg"
          type="button"
          v-on:click="search"
        >
          <i class="icon icon-search"></i>
        </button>
      </span>
    </div>
    <suggest v-if="showSuggest" v-bind:suggests="suggests" v-bind:chooseIdx="chooseIdx" v-on:chooseItem="chooseItem"/>
    <results />
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
      searchText: '',
      suggestWait: false,
      showSuggest: false,
      suggests: [],
      skipSearch: false,
      chooseIdx: -1,
      page: 0,
      Utils: utils
    };
  },
  computed: {
  },
  methods: {
    search() {
      console.log('search');
      this.showSuggest = false;

    },
    filterSuggest(val) {
      let res = [];
      let datas = JSON.parse(val);
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
        this.searchText = data.item;
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
      }
    }
  },
  watch: {
    searchText() {
      if (this.searchText!='' && !this.suggestWait && !this.skipSearch) {
        this.suggestWait = true;

        let str = '["vue 搜索提",[["vue 搜索提交",33,[160],{"a":"vue\u0026nbsp;","b":"搜索提交"}],["vue 搜索提取",33,[160],{"a":"vue\u0026nbsp;","b":"搜索提取"}],["vue 搜索提醒",33,[160],{"a":"vue\u0026nbsp;","b":"搜索提醒"}]],{"i":"vue 搜索提","j":"nv","k":1,"q":"BWNw3IGYfkihdCnkl2xKfnqBqEQ","t":{"bpc":false,"tlw":false}}]';

        let suggests = this.filterSuggest(str);
        if (suggests.length > 0) {
          this.showSuggest = true;
          this.chooseIdx = -1;
          this.suggests = suggests;
        }

        setTimeout(() => {
          this.suggestWait = false;
        }, 1000);
      }
      
      this.skipSearch = false;
    }
  },
  mounted() {
    this.$refs['sinput'].focus()
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
