(function(t){function e(e){for(var o,a,i=e[0],c=e[1],l=e[2],u=0,g=[];u<i.length;u++)a=i[u],Object.prototype.hasOwnProperty.call(n,a)&&n[a]&&g.push(n[a][0]),n[a]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(t[o]=c[o]);h&&h(e);while(g.length)g.shift()();return r.push.apply(r,l||[]),s()}function s(){for(var t,e=0;e<r.length;e++){for(var s=r[e],o=!0,i=1;i<s.length;i++){var c=s[i];0!==n[c]&&(o=!1)}o&&(r.splice(e--,1),t=a(a.s=s[0]))}return t}var o={},n={app:0},r=[];function a(e){if(o[e])return o[e].exports;var s=o[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,a),s.l=!0,s.exports}a.m=t,a.c=o,a.d=function(t,e,s){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(a.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)a.d(s,o,function(e){return t[e]}.bind(null,o));return s},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=e,i=i.slice();for(var l=0;l<i.length;l++)e(i[l]);var h=c;r.push([0,"chunk-vendors"]),s()})({0:function(t,e,s){t.exports=s("56d7")},"56d7":function(t,e,s){"use strict";s.r(e);s("fa49"),s("a015"),s("3709"),s("17a6"),s("9f45");var o=s("f568"),n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"wrapper"},[e("div",{staticClass:"moon",on:{click:t.changeMode}},[e("svg",{staticStyle:{fill:"var(--color-promo-color-modes-toggle-moon)",margin:"12px 0 0 11px"},attrs:{width:"20",height:"18",viewBox:"0 0 20 18","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg"}},[e("path",{attrs:{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M6.28352 10.5764C10.8677 10.5764 14.5839 6.86014 14.5839 2.27596C14.5839 1.7242 14.5301 1.18501 14.4274 0.663368C14.3548 0.294826 14.7414 -0.0153636 15.0516 0.196463C17.4905 1.86202 19.0914 4.66438 19.0914 7.84067C19.0914 12.9493 14.9501 17.0907 9.84145 17.0907C5.24982 17.0907 1.43959 13.7451 0.715408 9.35868C0.654273 8.98839 1.09783 8.76831 1.40118 8.98931C2.77129 9.98745 4.45863 10.5764 6.28352 10.5764Z"}})])]),e("div",{staticStyle:{display:"none"},attrs:{id:"container"},on:{click:t.hideSuggest}},[e("div",{attrs:{id:"canvascontainer"},on:{click:t.backhome}},[e("canvas",{attrs:{id:"canvas"}})]),e("div",{staticClass:"input-group",attrs:{id:"search"}},[e("div",{staticClass:"has-icon-right"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.searchText,expression:"searchText"}],ref:"sinput",staticClass:"form-control form-input",attrs:{id:"search_txt",type:"text",placeholder:"Search for..."},domProps:{value:t.searchText},on:{keyup:[function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.startSearch.apply(null,arguments)},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"up",38,e.key,["Up","ArrowUp"])?null:t.itemUp.apply(null,arguments)},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"down",40,e.key,["Down","ArrowDown"])?null:t.itemDown.apply(null,arguments)}],input:function(e){e.target.composing||(t.searchText=e.target.value)}}}),e("i",{staticClass:"form-icon icon icon-cross",on:{click:t.cleanText}})]),e("span",{staticClass:"input-group-btn",staticStyle:{float:"left"}},[e("button",{class:[t.sbtnBase,t.sbtn?"loading":""],attrs:{id:"sbtn",type:"button"},on:{click:t.startSearch}},[e("i",{staticClass:"icon icon-search"})])])]),t.showSuggest?e("suggest",{ref:"suggestRes",attrs:{suggests:t.suggests},on:{chooseItem:t.chooseItem}}):t._e(),e("results",{ref:"searchRes",attrs:{sbtn:t.sbtn},on:{"update:sbtn":t.changeSbtn,"update:searchText":t.changeSText}})],1),e("div",{staticClass:"footer"},[e("div",{staticClass:"ipaddr"},[t._v(t._s(t.ipAddr))]),e("div",{staticClass:"copyright"},[t._v(" © "+t._s(t.copyright_year)+". "),e("a",{staticClass:"tooltip tooltip-top",attrs:{"data-tooltip":"丝绸之路"}},[t._v("Silk Road")])])])])},r=[],a=(s("a361"),s("167d"),s("ba13"),s("77b0"),s("aa56"),s("20f1"),s("24b8"),s("3d2c"),function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"suggest"}},t._l(t.suggests,(function(s,o){return e("div",{key:o,staticClass:"sitem",class:{selitem:o===t.cIdx},on:{mouseenter:function(e){return t.menter(o)},click:function(e){return t.clickItem(o)}}},[e("div",{staticClass:"sval",domProps:{innerHTML:t._s(s)}})])})),0)}),i=[],c={name:"Suggest",data:function(){return{cIdx:-1}},props:{suggests:Array},methods:{getHtmlVal:function(t){return document.getElementsByClassName("sval")[t].innerHTML},menter:function(t,e){this.cIdx=t,e?this.$emit("chooseItem",{item:this.getHtmlVal(t),click:!1,cidx:t,key:!0}):this.$emit("chooseItem",{item:this.getHtmlVal(t),click:!1,cidx:t,key:!1})},clickItem:function(t){this.$emit("chooseItem",{item:this.getHtmlVal(t),click:!0,cidx:t})}},computed:{},watch:{}},l=c,h=s("0b56"),u=Object(h["a"])(l,a,i,!1,null,"14fe95c6",null),g=u.exports,d=(s("42b1"),s("9051"),s("65d3"),s("a777"),function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"result"}},[e("div",[e("div",{staticClass:"flip-container"},[e("div",{staticClass:"flipper",attrs:{id:"tools"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.showInfo,expression:"showInfo"}],class:["front",t.showMenu?"frontflip":""],attrs:{id:"infos"}},[t.serror?e("div",{staticClass:"errormsg"},[t._v(t._s(t.errorMsg))]):e("div",[t._v("找到约 "),e("span",{attrs:{id:"stotal"}},[t._v(t._s(t.stotal))]),t._v("条记录 (用时 "),e("span",{attrs:{id:"stime"}},[t._v(t._s(t.stime))]),t._v("秒) ")])]),e("div",{class:["back",t.showMenu?"backflip":""],attrs:{id:"selMenu"}},[e("div",{staticClass:"form-group menuForm"},[e("select",{directives:[{name:"model",rawName:"v-model",value:t.searchInfo.lr,expression:"searchInfo.lr"}],staticClass:"form-select select-sm",style:{"background-color":t.lrColor},on:{change:[function(e){var s=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.$set(t.searchInfo,"lr",e.target.multiple?s:s[0])},t.onchange]}},[e("option",{staticClass:"bcolorw",attrs:{value:"-"}},[t._v("不限语言")]),e("option",{staticClass:"bcolorw",attrs:{value:"lang_en"}},[t._v("English")]),e("option",{staticClass:"bcolorw",attrs:{value:"lang_zh-CN"}},[t._v("简体中文")]),e("option",{staticClass:"bcolorw",attrs:{value:"lang_zh-TW"}},[t._v("繁体中文")])])]),e("div",{staticClass:"form-group menuForm menuFormDest"},[e("select",{directives:[{name:"model",rawName:"v-model",value:t.searchInfo.dateRestrict,expression:"searchInfo.dateRestrict"}],staticClass:"form-select select-sm",style:{"background-color":t.dateRestrictColor},on:{change:[function(e){var s=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.$set(t.searchInfo,"dateRestrict",e.target.multiple?s:s[0])},t.onchange]}},[e("option",{staticClass:"bcolorw",attrs:{value:"-"}},[t._v("不限时间")]),e("option",{staticClass:"bcolorw",attrs:{value:"d1"}},[t._v("过去1天")]),e("option",{staticClass:"bcolorw",attrs:{value:"w1"}},[t._v("过去1周")]),e("option",{staticClass:"bcolorw",attrs:{value:"m1"}},[t._v("过去1月")]),e("option",{staticClass:"bcolorw",attrs:{value:"y1"}},[t._v("过去1年")])])]),e("div",{staticClass:"form-group menuForm menuFormDest"},[e("select",{directives:[{name:"model",rawName:"v-model",value:t.searchInfo.sort,expression:"searchInfo.sort"}],staticClass:"form-select select-sm",style:{"background-color":t.sortColor},on:{change:[function(e){var s=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.$set(t.searchInfo,"sort",e.target.multiple?s:s[0])},t.onchange]}},[e("option",{staticClass:"bcolorw",attrs:{value:"-"}},[t._v("相关排序")]),e("option",{staticClass:"bcolorw",attrs:{value:"date"}},[t._v("时间排序")])])])])])]),e("button",{class:[t.menuClassWhite?"bcolorw":"bcolor"],attrs:{id:"menu",type:"button"},on:{click:t.menu}},[e("i",{staticClass:"icon icon-more-horiz"})])]),e("div",{directives:[{name:"show",rawName:"v-show",value:t.spelling,expression:"spelling"}],staticClass:"correct-spelling"},[e("div",{attrs:{id:"spelling"}},[e("span",[t._v("您是不是要找: ")]),e("a",{on:{click:t.corrQuery}},[t._v(t._s(t.correctedQuery))])])]),e("div",{attrs:{id:"items"}},t._l(t.items,(function(s,o){return e("div",{key:o,staticClass:"item"},[e("div",{staticClass:"title"},[e("a",{staticClass:"link",attrs:{href:s.link,target:"_blank"},domProps:{innerHTML:t._s(s.htmlTitle)}})]),e("div",{staticClass:"formattedUrl"},[t._v(t._s(s.formattedUrl))]),e("div",{staticClass:"htmlSnippet",domProps:{innerHTML:t._s(s.htmlSnippet)}})])})),0),e("div",{directives:[{name:"show",rawName:"v-show",value:t.showPage,expression:"showPage"}],staticStyle:{"margin-top":"10px"}},[e("pagehelper",{ref:"pager",attrs:{enddingPage:t.enddingPage,cpage:t.searchInfo.page},on:{changePage:t.changePage}})],1)])}),p=[],f=s("4ff3"),m={axiosConfig:{headers:{Authorization:""},timeout:1e4,responseType:"json",responseEncoding:"utf8"},getStorage:function(){return window.localStorage.getItem("access_token")},getNowTime:function(){return Date.parse(new Date)/1e3},requestToken:function(t){var e=this;Object(f["get"])("/api/user/token",this.axiosConfig).then((function(s){var o=s.data;o.tokentime=e.getNowTime(),window.localStorage.setItem("access_token",JSON.stringify(o)),t&&t()})).catch((function(t){e.formatErrorMsg(t)}))},getToken:function(t){var e=this.getStorage();if(e)try{var s=JSON.parse(e),o=this.getNowTime()-s.tokentime;o>s.expire?this.requestToken(t):t&&t()}catch(n){throw window.localStorage.removeItem("access_token"),n}else this.requestToken(t)},queryRequest:function(t,e,s){var o=this,n=!1;if(this.getStorage()){var r=JSON.parse(this.getStorage()),a=this.getNowTime()-r.tokentime;n=a<r.expire}n?this.queryData(t,e,s):(window.localStorage.removeItem("access_token"),this.getToken((function(){o.queryData(t,e,s)})))},queryData:function(t,e,s,o){var n=this,r=JSON.parse(this.getStorage());this.axiosConfig.headers.Authorization="Bearer "+r.token,Object(f["get"])(t,this.axiosConfig).then((function(t){e&&e(t.data)})).catch((function(r){s&&r.response&&401===r.response.status&&!o?(window.localStorage.removeItem("access_token"),n.getToken((function(){n.queryData(t,e,s,!0)}))):s&&r.response&&s(r.response),void 0===r.response&&s({code:"TIMEOUT",message:r.message})}))},formatErrorMsg:function(t){return"ECONNABORTED"===t.code||"TIMEOUT"===t.code?t.message:401===t.status?(window.localStorage.setItem("access_token",""),"ERROR: No Authorization, Please Refresh Page"):429===t.status?"ERROR: Too Many Requests":500===t.status?"ERROR: Internal Server Error":void 0}},v=function(){var t=this,e=t._self._c;return e("div",{staticClass:"pagination"},[e("li",{class:{loading:"startp"===t.clickType},staticStyle:{display:"block"},attrs:{id:"startp"}},[e("a",{staticClass:"pbtn",on:{click:function(e){return t.changePage("startp")}}},[t._v("<<")])]),e("li",{directives:[{name:"show",rawName:"v-show",value:t.page>1||"prevp"===t.clickType,expression:"page>1 || clickType==='prevp'"}],class:{loading:"prevp"===t.clickType},attrs:{id:"prevp"}},[e("a",{staticClass:"pbtn",on:{click:function(e){return t.changePage("prevp")}}},[t._v("<")])]),e("li",[e("a",{attrs:{id:"Tpagenum"}},[t._v("Page "+t._s(t.page))])]),e("li",{directives:[{name:"show",rawName:"v-show",value:!t.enddingPage,expression:"!enddingPage"}],class:{loading:"nextp"===t.clickType},attrs:{id:"nextp"}},[e("a",{staticClass:"pbtn",on:{click:function(e){return t.changePage("nextp")}}},[t._v(">")])])])},w=[],y=(s("c401"),{name:"Pagehelper",props:{cpage:Number,enddingPage:Boolean},data:function(){return{page:this.cpage<1?1:this.cpage,pagebak:1,clickType:""}},methods:{changePage:function(t){this.clickType=t,"startp"===t?this.page=1:"prevp"===t?this.page-=1:"nextp"===t&&(this.page+=1),this.$emit("changePage",this.page)},commit:function(){this.clickType="",this.pagebak=this.page},rollback:function(){this.clickType="",this.page=this.pagebak}},watch:{cpage:function(){this.page=this.cpage}}}),k=y,I=Object(h["a"])(k,v,w,!1,null,"8ae2cd60",null),b=I.exports,x={name:"Results",props:{sbtn:Boolean},components:{Pagehelper:b},data:function(){return{searchText:"",showInfo:!1,searchInfo:{},rowNum:10,serror:!1,showPage:!1,stotal:0,stime:0,items:[],errorMsg:"",maxPage:10,enddingPage:!1,showMenu:!1,spelling:!1,correctedQuery:"",darkmode:!1}},methods:{showInfoMsg:function(t,e){this.stotal=t,this.stime=e,this.showInfo=!0},errorInfo:function(t){this.serror=!0,this.errorMsg=t,this.showInfo=!0,this.showMenu=!1},showErrorInfo:function(t){this.errorInfo(m.formatErrorMsg(t))},startNum:function(){return(this.searchInfo.page-1)*this.rowNum+1},isEnddingPage:function(){this.enddingPage=(this.maxPage-1)*this.rowNum<this.startNum()||this.searchInfo.page>=1&&this.items.length<this.rowNum},search:function(t,e){var s=this;if(t&&(this.searchInfo=t),e)this.searchText=e;else if(!e&&!this.searchText)return;m.queryRequest("/api/gcs/g"+this.genSearchUrl(),(function(t){if(s.serror=!1,s.$emit("update:sbtn",!1),null==t.searchInformation?(s.items=[],s.errorInfo("No Data Found")):null==t.items?s.items=[]:s.items=t.items,t.searchInformation){var e=t.searchInformation.formattedSearchTime,o=t.searchInformation.formattedTotalResults;s.showInfoMsg(o,e)}s.items.length===s.rowNum&&s.searchInfo.page>0&&(s.showPage=!0),t.spelling&&t.spelling.correctedQuery?(s.spelling=!0,s.correctedQuery=t.spelling.correctedQuery):s.spelling=!1,s.setBrowerUrl(),s.isEnddingPage(),s.$refs.pager.commit(),window.scrollTo(0,0)}),(function(t){s.$emit("update:sbtn",!1),s.$refs.pager.rollback(),s.showErrorInfo(t)}))},changePage:function(t){this.searchInfo.page=t,this.search()},setBrowerUrl:function(){var t="?q="+this.searchText;for(var e in this.searchInfo)this.searchInfo[e]&&"-"!==this.searchInfo[e]&&(t+="&"+e+"="+this.searchInfo[e]);window.history.pushState(null,null,t)},genSearchUrl:function(){var t="?num=10&q="+encodeURI(this.searchText);for(var e in this.searchInfo)if(this.searchInfo[e]&&"-"!==this.searchInfo[e]){if("page"===e){t+="&start="+this.startNum();continue}t+="&"+e+"="+this.searchInfo[e]}return t},menu:function(){this.showMenu=!this.showMenu},corrQuery:function(){this.searchText=this.correctedQuery,this.searchInfo.page=1,this.$emit("update:searchText",this.searchText),this.search()},onchange:function(){this.searchInfo.page=1},colorChange:function(t){return void 0===this.searchInfo||"-"===this.searchInfo[t]?this.getColorMode():this.getColorModeSel()},getColorMode:function(){return this.darkmode?"#2b2b2b":"white"},getColorModeSel:function(){return this.darkmode?"#2b2b2b":"#ececec"}},computed:{lrColor:function(){return this.colorChange("lr")},dateRestrictColor:function(){return this.colorChange("dateRestrict")},sortColor:function(){return this.colorChange("sort")},menuClassWhite:function(){return void 0===this.searchInfo.sort&&void 0===this.searchInfo.lr&&void 0===this.searchInfo.dateRestrict||"-"===this.searchInfo.sort&&"-"===this.searchInfo.lr&&"-"===this.searchInfo.dateRestrict}},watch:{}},C=x,_=Object(h["a"])(C,d,p,!1,null,"5c3dd7d6",null),S=_.exports,T=s("07c3"),P={name:"app",components:{Suggest:g,Results:S},data:function(){return{Utils:m,searchText:"",suggestWait:!1,showSuggest:!1,suggests:[],skipSearch:!1,chooseIdx:-1,sbtn:!1,sbtnBase:"btn btn-primary btn-action btn-lg",ipAddr:"",finTime:0,copyright_year:0,searchInfo:{sort:"-",page:1,lr:"-",dateRestrict:"-"},myFont:new FontFace("Inkfree","url(https://cdn.jsdelivr.net/gh/omengye/wsweb/public/fonts/Inkfree.woff2)"),darkmode:!1}},computed:{},methods:{startSearch:function(){this.searchInfo.page=1,this.search()},search:function(){this.showSuggest=!1,""!==this.searchText&&(this.sbtn=!0),this.$refs.searchRes.search(this.searchInfo,this.searchText)},queryString:function(){var t=location.search.slice(1).split("&"),e={};return t.forEach((function(t){t=t.split("="),e[t[0]]=decodeURIComponent(t[1]||"")})),JSON.parse(JSON.stringify(e))},filterSuggest:function(t){var e=[],s=t;return!(s.length<2)&&s&&s instanceof Array&&s[1]&&s[1]instanceof Array?(s[1].forEach((function(t){e.push(t[0])})),e):e},hideSuggest:function(t){var e=document.getElementById("suggest");e&&!e.contains(t.target)&&(this.showSuggest=!1)},chooseItem:function(t){this.suggests.length>0&&(this.skipSearch=!0,t.item&&(t.click||t.key)?(this.searchText=t.item,this.chooseIdx=t.cidx):t.item?this.chooseIdx=t.cidx:this.showSuggest=!1,t.click&&this.startSearch())},itemUp:function(){this.suggests.length>0&&(this.chooseIdx<=0?this.chooseIdx=this.suggests.length-1:this.chooseIdx-=1,this.$refs.suggestRes.menter(this.chooseIdx,!0))},itemDown:function(){this.suggests.length>0&&(this.chooseIdx===this.suggests.length-1?this.chooseIdx=0:this.chooseIdx+=1,this.$refs.suggestRes.menter(this.chooseIdx,!0))},changeSbtn:function(t){this.finTime=new Date,this.sbtn=t,this.showSuggest=!1},changeSText:function(t){this.searchText=t,this.changeSbtn(!0)},getParamFromUrl:function(){var t=this.queryString();for(var e in this.searchInfo)if(t[e]){if("page"===e){this.searchInfo.page=parseInt(t.page);continue}this.searchInfo[e]=t[e]}t.q&&(this.searchText=t.q)},cleanText:function(){this.searchText="",this.searchInfo.page=1,this.$refs["sinput"].focus()},draw:function(t){this.myFont.load().then((function(e){document.fonts.add(e);var s=document.getElementById("canvas").getContext("2d");s.font="100px Inkfree",s.fillStyle=t;var o="scz.lu";s.fillText(o,32,110)}))},backhome:function(){window.location.href=window.location.origin+window.location.pathname},initMode:function(){this.$refs.searchRes.darkmode=this.darkmode;var t=document.getElementById("css-mode").href,e=t.split("/")[t.split("/").length-1];this.darkmode?(this.draw("#bcc3ce"),document.getElementById("css-mode").href=t.replace(e,"search-dark.css")):(this.draw("black"),document.getElementById("css-mode").href=t.replace(e,"search.css")),document.getElementById("container").style["display"]="block"},changeMode:function(){this.darkmode=!this.darkmode,localStorage.setItem("mode",this.darkmode),this.initMode()}},watch:{searchText:function(){var t=this;""===this.searchText||this.suggestWait||this.skipSearch||(this.suggestWait=!0,this.finTime=0,this.showSuggest=!1,m.queryRequest("/api/gcs/suggest?q="+encodeURI(this.searchText),(function(e){if(""===t.searchText||t.sbtn||t.finTime>0&&new Date>t.finTime)t.showSuggest=!1;else{var s=t.filterSuggest(e);s.length>0&&(t.showSuggest=!0,t.chooseIdx=-1,t.suggests=s)}}),(function(){t.showSuggest=!1})),Object(T["setTimeout"])((function(){t.suggestWait=!1}),500)),this.skipSearch=!1}},mounted:function(){var t=this;this.$refs["sinput"].focus(),m.getToken((function(){window.localStorage.access_token&&(t.ipAddr="From: "+JSON.parse(window.localStorage.access_token).ip,t.copyright_year=JSON.parse(window.localStorage.access_token).visitTime.substring(0,4),t.getParamFromUrl(),t.search())})),localStorage.hasOwnProperty("mode")&&(this.darkmode=JSON.parse(localStorage.getItem("mode"))),this.initMode()},created:function(){}},O=P,N=Object(h["a"])(O,n,r,!1,null,null,null),R=N.exports;o["a"].config.productionTip=!1,new o["a"]({render:function(t){return t(R)}}).$mount("#app")}});