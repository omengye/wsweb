<template>
  <div id="result">
    <div id="infos" v-show="showInfo">
      <div v-if="serror"></div>
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
    <div id="pageneration" v-show="serror">
      
    </div>
  </div>
</template>

<script>
import utils from '../assets/js/utils.js'
export default {
  name: "Results",
  props: {
    sbtn: Boolean
  },
  data() {
      return {
          showInfo: false,
          page: 1,
          serror: false,
          stotal: 0,
          stime: 0,
          items: []
      }
  },
  methods: {
    showInfoMsg(stotal, stime) {
      this.stotal = stotal;
      this.stime = stime;
      this.showInfo = true;
    },
    search(searchText) {
      utils.queryRequest('/gcs/api/g?q='+encodeURI(searchText)+"&start="+this.page, 
        (data)=> {
          this.$emit('update:sbtn', false);
          let stime = data.searchInformation.formattedSearchTime;
          let stotal = data.searchInformation.formattedTotalResults;
          this.showInfoMsg(stotal, stime);

          this.items = data.items;


        },
        (error) => {
          this.$emit('update:sbtn', false);
          debugger;
        }
      );

    },
  }
};
</script>

<style scoped>
</style>
