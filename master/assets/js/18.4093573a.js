(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{514:function(e,t,n){},550:function(e,t,n){"use strict";n(514)},572:function(e,t,n){"use strict";n.r(t);n(36),n(21),n(134),n(93);var i={data:function(){return{selectedItem:""}},mounted:function(){var e=window.location.pathname.replace("/","").replace(/\/$/,""),t=window.location.href.match(/[a-zA-Z]{1}\d+(\.\d+)+/g);this.versionValue==this.versionValue?this.selectedItem=null!==t?t[0]:e:this.selectedItem=""},computed:{versions:function(){return this.$themeConfig.versions},versionValue:function(){for(var e in this.versions){return this.versions[e].key}}},methods:{versionChange:function(e){window.location.href="".concat(window.location.origin,"/").concat(e)}}},o=(n(550),n(1)),s=Object(o.a)(i,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"container"},[n("span",{staticClass:"sr-only"},[e._v("Docs Version Switcher")]),e.versions?n("div",{staticClass:"select"},[n("select",{directives:[{name:"model",rawName:"v-model",value:e.selectedItem,expression:"selectedItem"}],on:{input:function(t){return e.versionChange(t.target.value)},change:function(t){var n=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.selectedItem=t.target.multiple?n:n[0]}}},[n("option",{attrs:{value:"",disabled:""}},[e._v("Version")]),e._l(e.versions,(function(t){return n("option",{domProps:{value:t.key}},[e._v(e._s(t.label))])}))],2)]):e._e()])])}),[],!1,null,"08503e1b",null);t.default=s.exports}}]);