webpackJsonp([31],{277:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=r(322),n=r.n(o);for(var i in o)"default"!==i&&function(t){r.d(e,t,function(){return o[t]})}(i);var a=r(396),s=r.n(a),l=r(0),d=l(n.a,s.a,!1,null,null,null);d.options.__file="src/views/jump/index.vue",e.default=d.exports},322:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=r(10),n=function(t){return t&&t.__esModule?t:{default:t}}(o);e.default={data:function(){var t=this;return{loading:!0,selectIds:[],listdomain:[],columns7:[{type:"index",width:60,align:"center"},{type:"selection",width:60,align:"center"},{title:"URL查找条件",width:300,sortable:!0,key:"url",render:function(t,e){return t("a",{attrs:{href:e.row.url,target:"_blank"}},e.row.url?e.row.url:"")}},{title:"是否跳转",key:"isJump",sortable:!0,width:120,render:function(e,r){return e("i-switch",{props:{value:r.row.isJump,size:"large"},on:{"on-change":function(e){t.loading=!t.loading,n.default.put("/jump",{_id:r.row._id,isJump:e},function(o){t.loading=!t.loading,0==o.data.code?(r.row.isJump=e,t.$Message.success({content:o.data.message})):t.$Message.error({content:o.data.message}),t.listdata=t.listdata.map(function(t){return t._id==r.row._id?r.row:t})})}}},[e("span",{slot:"open"},"开启"),e("span",{slot:"close"},"关闭")])}},{title:"跳到哪里",sortable:!0,key:"toJump",render:function(t,e){return t("a",{attrs:{href:e.row.toJump,target:"_blank"}},e.row.toJump?e.row.toJump:"")}},{title:"跳转次数",width:120,sortable:!0,key:"jumpNum"},{title:"优先级",width:120,sortable:!0,key:"priority",render:function(e,r){return r.row.color=1===r.row.priority?"blue":2===r.row.priority?"green":"red",r.row.text=1===r.row.priority?"低":2===r.row.priority?"中":"高",e("Tag",{props:{type:"dot",color:r.row.color},nativeOn:{click:function(){var e;e=3==r.row.priority?1:r.row.priority+1,t.loading=!t.loading,n.default.put("/jump",{_id:r.row._id,priority:e},function(o){0==o.data.code?(t.loading=!t.loading,t.$Message.success({content:o.data.message}),r.row.priority=e,r.row.color=1===r.row.priority?"blue":2===r.row.priority?"green":"red",r.row.text=1===r.row.priority?"低":2===r.row.priority?"中":"高"):t.$Message.error({content:o.data.message})})}}},r.row.text)}},{title:"操作",key:"action",width:100,align:"center",render:function(e,r){return e("div",[e("Button",{props:{type:"warning",size:"small"},style:{marginRight:"5px"},on:{click:function(){t.$router.push({name:"jump_edit",params:{_id:r.row._id}})}}},"编辑")])}}],listdata:[]}},methods:{delAll:function(){var t=this;this.$Loading.start(),n.default.delete("/jump",{del:"all"},function(e){0==e.data.code?(t.$Loading.finish(),t.$Message.success("成功清空了"+e.data.data.n+"条数据!"),t.getdata()):(t.$Loading.error(),t.$Message.error(e.data.message))})},delSelect:function(){var t=this;if(0==this.selectIds.length)return void this.$Message.error("先选中,再删除");this.$Loading.start(),n.default.delete("/jump",{_id:this.selectIds},function(e){0==e.data.code?(t.$Loading.finish(),t.$Message.success("成功删除了"+e.data.data.n+"条数据!"),t.getdata()):(t.$Loading.error(),t.$Message.error("删除失败!"))})},selectAll:function(t){var e=this;this.selectIds=[],t.forEach(function(t){e.selectIds.push(t._id)})},edit:function(){var t=this;this.$Modal.confirm({render:function(e){return e("domainedit",{props:{model:formInline,rules:ruleInline},on:{input:function(e){t.value=e}}})}})},getdata:function(){var t=this;n.default.get("/jump",{},function(e){t.listdata=e.data.data,t.loading=!1;var r=[],o=[];t.listdata.forEach(function(t){o.push(t.domain)}),o=n.default.arrunique(o),o.forEach(function(t){r.push({label:t,value:t})}),t.columns7.forEach(function(t){t.key,"domain"==t.key&&(t.filters=r)})})}},mounted:function(){this.getdata()}}},396:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("Card",[r("Table",{ref:"selection",attrs:{border:"",stripe:"",loading:t.loading,height:"600",columns:t.columns7,data:t.listdata},on:{"on-selection-change":t.selectAll}}),t._v(" "),r("Row",{staticStyle:{"margin-top":"10px"},attrs:{type:"flex",justify:"start"}},[r("Col",{attrs:{span:"6"}},[r("Poptip",{attrs:{confirm:"",title:"确定要删除选中项吗?",placement:"top-start"},on:{"on-ok":t.delSelect}},[r("Button",[t._v("删除选中")])],1),t._v(" "),r("Poptip",{staticStyle:{"margin-left":"60px"},attrs:{confirm:"",title:"确定要清空此数据吗!",placement:"top-start"},on:{"on-ok":t.delAll}},[r("Button",{attrs:{type:"error"}},[t._v("清空数据")])],1)],1)],1)],1)},n=[];o._withStripped=!0;var i={render:o,staticRenderFns:n};e.default=i}});