webpackJsonp([0],{263:function(t,n,e){"use strict";function a(t){l||e(366)}Object.defineProperty(n,"__esModule",{value:!0});var r=e(307),i=e.n(r);for(var o in r)"default"!==o&&function(t){e.d(n,t,function(){return r[t]})}(o);var s=e(372),d=e.n(s),l=!1,p=e(0),c=a,u=p(i.a,d.a,!1,c,null,null);u.options.__file="src/views/advanced-router/component/order-info.vue",n.default=u.exports},307:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=e(368),r=function(t){return t&&t.__esModule?t:{default:t}}(a);n.default={name:"order-info",components:{expandRow:r.default},data:function(){return{showInfo:!1,order_col:[{title:"订单号",key:"order_id",align:"center"},{title:"买家",key:"buyer",align:"center"},{title:"地址",key:"addr",align:"center"},{title:"下单时间",key:"time",align:"center"},{title:"交易状态",key:"state",align:"center"}],order_data:[],columns10:[{type:"expand",width:50,render:function(t,n){return t(r.default,{props:{row:n.row}})}},{title:"姓名",key:"name"},{title:"年龄",key:"age"},{title:"地址",key:"address"}],data9:[{name:"王小明",age:18,address:"北京市朝阳区芍药居",job:"数据工程师",interest:"羽毛球",birthday:"1991-05-14",book:"乔布斯传",movie:"致命魔术",music:"I Cry"},{name:"张小刚",age:25,address:"北京市海淀区西二旗",job:"数据科学家",interest:"排球",birthday:"1989-03-18",book:"我的奋斗",movie:"罗马假日",music:"My Heart Will Go On"},{name:"李小红",age:30,address:"上海市浦东新区世纪大道",job:"数据产品经理",interest:"网球",birthday:"1992-01-31",book:"赢",movie:"乔布斯",music:"Don’t Cry"},{name:"周小伟",age:26,address:"深圳市南山区深南大道",job:"数据分析师",interest:"桌球，跑步",birthday:"1988-7-25",book:"红楼梦",movie:"倩女幽魂",music:"演员"}]}},methods:{init:function(){var t=parseInt(this.$route.params.order_id.toString().substr(-1,1)),n="",e="",a="",r="";switch(t){case 1:n="Arasn",e="北京市东直门外大街39号院2号楼航空服务大厦",a="2017年10月20日 13：33：24",r="已付款";break;case 2:n="Lison",e="北京市东直门外大街39号院2号楼航空服务大厦",a="2017年10月21日 19：13：24",r="已付款";break;case 3:n="lili",e="TalkingData总部",a="2017年10月12日 10：39：24",r="待收货";break;case 4:n="lala",e="国家统计局",a="2017年8月20日 11：45：24",r="已收货"}var i={order_id:this.$route.params.order_id,buyer:n,addr:e,time:a,state:r};this.order_data=[i]}},mounted:function(){this.init()},activated:function(){this.init()}}},308:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={props:{row:Object}}},366:function(t,n,e){var a=e(367);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);e(12)("579b7837",a,!1)},367:function(t,n,e){n=t.exports=e(11)(!1),n.push([t.i,"\n.margin-top-8 {\n  margin-top: 8px;\n}\n.margin-top-10 {\n  margin-top: 10px;\n}\n.margin-top-20 {\n  margin-top: 20px;\n}\n.margin-left-10 {\n  margin-left: 10px;\n}\n.margin-bottom-10 {\n  margin-bottom: 10px;\n}\n.margin-bottom-100 {\n  margin-bottom: 100px;\n}\n.margin-right-10 {\n  margin-right: 10px;\n}\n.padding-left-6 {\n  padding-left: 6px;\n}\n.padding-left-8 {\n  padding-left: 5px;\n}\n.padding-left-10 {\n  padding-left: 10px;\n}\n.padding-left-20 {\n  padding-left: 20px;\n}\n.height-100 {\n  height: 100%;\n}\n.height-120px {\n  height: 100px;\n}\n.height-200px {\n  height: 200px;\n}\n.height-492px {\n  height: 492px;\n}\n.height-460px {\n  height: 460px;\n}\n.line-gray {\n  height: 0;\n  border-bottom: 2px solid #dcdcdc;\n}\n.notwrap {\n  word-break: keep-all;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.padding-left-5 {\n  padding-left: 10px;\n}\n[v-cloak] {\n  display: none;\n}\n.advanced-router {\n  height: 240px !important;\n}\n.advanced-router-tip-p {\n  padding: 10px 0;\n}\n",""])},368:function(t,n,e){"use strict";function a(t){l||e(369)}Object.defineProperty(n,"__esModule",{value:!0});var r=e(308),i=e.n(r);for(var o in r)"default"!==o&&function(t){e.d(n,t,function(){return r[t]})}(o);var s=e(371),d=e.n(s),l=!1,p=e(0),c=a,u=p(i.a,d.a,!1,c,null,null);u.options.__file="src/views/advanced-router/component/expandRow.vue",n.default=u.exports},369:function(t,n,e){var a=e(370);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);e(12)("13468117",a,!1)},370:function(t,n,e){n=t.exports=e(11)(!1),n.push([t.i,"\n.advanced-router {\n  height: 240px !important;\n}\n.advanced-router-tip-p {\n  padding: 10px 0;\n}\n",""])},371:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("Row",{staticClass:"advanced-router"},[e("Col",{attrs:{span:"8"}},[e("span",{staticClass:"expand-key"},[t._v("职业：")]),t._v(" "),e("span",{staticClass:"expand-value"},[t._v(t._s(t.row.job))])]),t._v(" "),e("Col",{attrs:{span:"8"}},[e("span",{staticClass:"expand-key"},[t._v("兴趣：")]),t._v(" "),e("span",{staticClass:"expand-value"},[t._v(t._s(t.row.interest))])]),t._v(" "),e("Col",{attrs:{span:"8"}},[e("span",{staticClass:"expand-key"},[t._v("生日：")]),t._v(" "),e("span",{staticClass:"expand-value"},[t._v(t._s(t.row.birthday))])])],1),t._v(" "),e("Row",[e("Col",{attrs:{span:"8"}},[e("span",{staticClass:"expand-key"},[t._v("最喜欢的书：")]),t._v(" "),e("span",{staticClass:"expand-value"},[t._v("《"+t._s(t.row.book)+"》")])]),t._v(" "),e("Col",{attrs:{span:"8"}},[e("span",{staticClass:"expand-key"},[t._v("最喜欢的电影：")]),t._v(" "),e("span",{staticClass:"expand-value"},[t._v(t._s(t.row.movie))])]),t._v(" "),e("Col",{attrs:{span:"8"}},[e("span",{staticClass:"expand-key"},[t._v("最喜欢的音乐：")]),t._v(" "),e("span",{staticClass:"expand-value"},[t._v(t._s(t.row.music))])])],1)],1)},r=[];a._withStripped=!0;var i={render:a,staticRenderFns:r};n.default=i},372:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("Row",[e("Card",[e("p",{attrs:{slot:"title"},slot:"title"},[e("Icon",{attrs:{type:"compose"}}),t._v("\n                订单详情\n            ")],1),t._v(" "),e("Table",{attrs:{columns:t.order_col,data:t.order_data}}),t._v(" "),e("Modal",{attrs:{width:"700",title:"订单信息"},model:{value:t.showInfo,callback:function(n){t.showInfo=n},expression:"showInfo"}},[e("Table",{attrs:{columns:t.order_col,data:t.order_data}})],1)],1)],1),t._v(" "),e("Row",{staticClass:"margin-top-10"},[e("Card",[e("Row",[e("p",{staticClass:"advanced-router-tip-p"},[t._v("虽然iview-admin支持打开带参数的页面，但是类似于这种需求，还是建议用iview的Modal或者使用表格直接在表格内展开数据")]),t._v(" "),e("p",[e("Button",{attrs:{type:"primary"},on:{click:function(n){t.showInfo=!0}}},[t._v("点击按钮弹出Modal")])],1)]),t._v(" "),e("div",{staticClass:"margin-top-10"},[e("p",{staticClass:"advanced-router-tip-p"},[t._v("iview官方示例"),e("a",{attrs:{href:"https://www.iviewui.com/components/table"}},[t._v("表格")])]),t._v(" "),e("Table",{attrs:{columns:t.columns10,data:t.data9}})],1)],1)],1)],1)},r=[];a._withStripped=!0;var i={render:a,staticRenderFns:r};n.default=i}});