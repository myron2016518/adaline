(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["log"],{"9b16":function(e,t,a){"use strict";a.r(t);var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"wrapper manage"},[a("el-form",{ref:"ruleForm",staticClass:"ope-form",attrs:{model:e.ruleForm,inline:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.submitSearch(t)}}},[a("el-form-item",{attrs:{label:"姓名"}},[a("el-input",{attrs:{placeholder:"请输入姓名",clearable:""},model:{value:e.ruleForm.userName,callback:function(t){e.$set(e.ruleForm,"userName",t)},expression:"ruleForm.userName"}})],1),a("el-form-item",{attrs:{label:"手机"}},[a("el-input",{attrs:{placeholder:"请输入手机号码",clearable:""},model:{value:e.ruleForm.mobile,callback:function(t){e.$set(e.ruleForm,"mobile",t)},expression:"ruleForm.mobile"}})],1),a("el-form-item",{attrs:{label:"Vin"}},[a("el-input",{attrs:{placeholder:"请输入Vin码",clearable:""},model:{value:e.ruleForm.vin,callback:function(t){e.$set(e.ruleForm,"vin",t)},expression:"ruleForm.vin"}})],1),a("el-form-item",{attrs:{label:"序列号"}},[a("el-input",{attrs:{placeholder:"请输入序列号",clearable:""},model:{value:e.ruleForm.sn,callback:function(t){e.$set(e.ruleForm,"sn",t)},expression:"ruleForm.sn"}})],1),a("el-form-item",{attrs:{label:"编号"}},[a("el-input",{attrs:{placeholder:"请输入编号",clearable:""},model:{value:e.ruleForm.baseId,callback:function(t){e.$set(e.ruleForm,"baseId",t)},expression:"ruleForm.baseId"}})],1),a("el-form-item",{attrs:{label:"软件包id"}},[a("el-input",{attrs:{placeholder:"请输入软件包id",clearable:""},model:{value:e.ruleForm.softwareId,callback:function(t){e.$set(e.ruleForm,"softwareId",t)},expression:"ruleForm.softwareId"}})],1),a("el-form-item",{attrs:{label:"提交日期"}},[a("el-date-picker",{staticClass:"data-picker",attrs:{align:"right",editable:!1,type:"date","value-format":"yyyy-MM-dd",placeholder:"提交日期","picker-options":e.dataPickerOptions},model:{value:e.ruleForm.submitDate,callback:function(t){e.$set(e.ruleForm,"submitDate",t)},expression:"ruleForm.submitDate"}})],1),a("el-form-item",{attrs:{label:"审核结果"}},[a("el-select",{attrs:{placeholder:"请选择",clearable:""},model:{value:e.ruleForm.status,callback:function(t){e.$set(e.ruleForm,"status",t)},expression:"ruleForm.status"}},[a("el-option",{attrs:{label:"待解析",value:e.CHECK_STATUS.not}}),a("el-option",{attrs:{label:"审核中",value:e.CHECK_STATUS.wait}}),a("el-option",{attrs:{label:"通过",value:e.CHECK_STATUS.yes}}),a("el-option",{attrs:{label:"不通过",value:e.CHECK_STATUS.no}})],1)],1),a("el-form-item",{attrs:{label:"类型"}},[a("el-select",{attrs:{placeholder:"请选择",clearable:""},model:{value:e.ruleForm.type,callback:function(t){e.$set(e.ruleForm,"type",t)},expression:"ruleForm.type"}},[a("el-option",{attrs:{label:"回放",value:e.FILE_TYPE.adaline}}),a("el-option",{attrs:{label:"模拟",value:e.FILE_TYPE.simulation}})],1)],1),a("el-form-item",[a("el-button",{ref:"searchBtn",staticStyle:{"letter-spacing":"1px"},attrs:{type:"danger"},on:{click:function(t){return e.submitSearch(t)}}},[e._v("搜索\n                ")])],1)],1),a("div",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],ref:"content",staticClass:"content"},[e.listError?a("div",{staticClass:"alert alert-warning"},[e._m(0),e._v("\n                "+e._s(e.listError)+"\n            ")]):a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.list,stripe:!0,"highlight-current-row":!0,height:"100%"}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-form",{staticClass:"table-expand",attrs:{"label-position":"left",inline:""}},[a("el-form-item",{attrs:{label:"品牌："}},[a("span",[e._v(e._s(t.row.car_brand))])]),a("el-form-item",{attrs:{label:"车型："}},[a("span",[e._v(e._s(t.row.car_model))])]),a("el-form-item",{attrs:{label:"年款："}},[a("span",[e._v(e._s(t.row.car_year))])]),a("el-form-item",{attrs:{label:"采集人："}},[a("span",[e._v(e._s(t.row.user_name))])]),a("el-form-item",{attrs:{label:"手机："}},[a("span",[e._v(e._s(t.row.phone))])]),a("el-form-item",{attrs:{label:"诊断时间："}},[a("span",[e._v(e._s(t.row.diagnose_start_time_format))])]),t.row.file_type===e.FILE_TYPE.simulation?a("el-form-item",{attrs:{label:"系统个数："}},[a("span",[e._v(e._s(t.row.sys_num))])]):e._e()],1)]}}])}),a("el-table-column",{attrs:{label:"日志",prop:"file_name","header-align":"center","min-width":"248"}}),a("el-table-column",{attrs:{label:"VIN",prop:"vin",align:"center","header-align":"center","min-width":"166"}}),a("el-table-column",{attrs:{label:"类型",prop:"file_type_format",align:"center","header-align":"center","min-width":"52"}}),a("el-table-column",{attrs:{label:"编号",prop:"base_id",align:"center","header-align":"center","min-width":"54"}}),a("el-table-column",{attrs:{label:"软件包id",prop:"software_id",align:"center","header-align":"center"}}),a("el-table-column",{attrs:{label:"审核结果",prop:"status_format",align:"center","header-align":"center","min-width":"78"}}),a("el-table-column",{attrs:{label:"提交时间",prop:"created_format",align:"center","header-align":"center","min-width":"132"}}),a("el-table-column",{attrs:{label:"操作",align:"center","header-align":"center","min-width":"76"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){return e.onDownloadLog(t.$index,t.row)}}},[e._v("下载")])]}}])})],1)],1),e.list.length>0?a("div",{staticClass:"footer"},[a("el-pagination",{attrs:{"current-page":e.pageNum,"page-size":e.pagesize,layout:"total, prev, pager, next, jumper",total:1*e.totalNum},on:{"current-change":e.handleCurrentChange}})],1):e._e(),a("el-dialog",{ref:"uploadDialog",attrs:{title:"日志上传",visible:e.uploadDialogVisible,width:"460px","close-on-click-modal":!1,"close-on-press-escape":!1,"destroy-on-close":!0},on:{"update:visible":function(t){e.uploadDialogVisible=t}}},[a("template",{slot:"footer"},[a("el-button",{on:{click:function(t){e.uploadDialogVisible=!1}}},[e._v("取消")]),a("el-button",{attrs:{type:"danger"},on:{click:e.onUploadLogSubmit}},[e._v("确定")])],1)],2)],1)},r=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("h4",[a("i",{staticClass:"fa fa-warning"}),e._v(" 提示：")])}],i=(a("6821f"),a("517b")),n=a("7ac3"),o=a("33a1"),s=a("03ef");function c(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,l)}return a}function u(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?c(a,!0).forEach(function(t){m(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):c(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}function m(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var p={disabledDate:function(e){return e.getTime()>Date.now()},shortcuts:[{text:"今天",onClick:function(e){e.$emit("pick",new Date)}},{text:"昨天",onClick:function(e){var t=new Date;t.setTime(t.getTime()-864e5),e.$emit("pick",t)}},{text:"前天",onClick:function(e){var t=new Date;t.setTime(t.getTime()-1728e5),e.$emit("pick",t)}}]},d={name:"Log",data:function(){return{totalNum:0,pagesize:10,pageNum:1,ruleForm:{userName:"",mobile:"",vin:"",sn:"",baseId:"",softwareId:"",status:"",submitDate:"",type:""},dataPickerOptions:p,search:{userName:"",mobile:"",vin:"",sn:"",baseId:"",softwareId:"",status:"",submitDate:"",type:""},listLoading:!1,listError:"",list:[],uploadDialogVisible:!1}},created:function(){this.FILE_TYPE=o["d"],this.CHECK_STATUS=o["c"]},activated:function(){this._reset(),this._renderTable(this.pageNum,this.pagesize,{})},methods:{submitSearch:Object(i["a"])(function(e){var t=e.target;if(13===e.keyCode&&(t===this.$refs.searchBtn.$el||t===this.$refs.exportExcelBtn.$el))return!1;for(var a in this.ruleForm)this.search[a]=this.ruleForm[a];this.pageNum=1,this._renderTable(this.pageNum,this.pagesize,u({},this.search,{submitDate:(this.search.submitDate+"").slice(0,10)}))},1e3,n["a"]),handleCurrentChange:function(e){this.pageNum=e,this._renderTable(e,this.pagesize,u({},this.search,{submitDate:(this.search.submitDate+"").slice(0,10)}))},onUploadLog:function(){this.uploadDialogVisible=!0,this.$refs.uploadDialog.$el.style.bottom="0"},onUploadLogSubmit:Object(i["a"])(function(e){},1e3,n["a"]),onDownloadLog:Object(i["a"])(function(e,t){var a,l=Object(n["b"])(new Date(1e3*t.created),"yyyy-MM-dd");if(t.file_type===o["d"].adaline)a="".concat(o["g"],"/Public/PlayBack/").concat(l,"/").concat(t.file_name);else{if(t.file_type!==o["d"].simulation)return!1;a="".concat(o["g"],"/Public/LearningMachine/").concat(l,"/").concat(t.file_name)}window.open(a,"_blank")},1e3,n["a"]),_renderTable:function(e,t,a){var l=this,r={};for(var i in a)""!==a[i]&&"null"!==a[i]&&(r[i]=a[i]);this.listLoading=!0,this.$refs.content.scrollTop=0,this.listError="",s["a"].getList(e,t,r).then(function(e){l.listLoading=!1,l.totalNum=e.count;for(var t=[],a=e.list,r=0;r<a.length;r++)a[r].file_type===o["d"].adaline?a[r].file_type_format="回放":a[r].file_type===o["d"].simulation?a[r].file_type_format="模拟":a[r].file_type_format="",a[r].status===o["c"].not?a[r].status_format="待解析":a[r].status===o["c"].wait?a[r].status_format="审核中":a[r].status===o["c"].yes?a[r].status_format="通过":a[r].status===o["c"].no&&(a[r].status_format="不通过"),a[r].diagnose_start_time_format=Object(n["b"])(new Date(1e3*a[r].diagnose_start_time),"yyyy-MM-dd hh:mm"),a[r].created_format=Object(n["b"])(new Date(1e3*a[r].created),"yyyy-MM-dd hh:mm"),t.push(a[r]);l.list=a}).catch(function(e){l.listLoading=!1,l.list=[],l.listError=10002===e?"错误：缺少参数，Code：10002":10004===e?"错误：签名错误，Code：10004":e})},_reset:function(){this.pageNum=1,this.ruleForm={userName:"",mobile:"",vin:"",sn:"",baseId:"",softwareId:"",status:"",submitDate:"",type:""},this.search={userName:"",mobile:"",vin:"",sn:"",baseId:"",softwareId:"",status:"",submitDate:"",type:""}}}},b=d,f=(a("cbbf"),a("2877")),h=Object(f["a"])(b,l,r,!1,null,"163d6de2",null);t["default"]=h.exports},cbbf:function(e,t,a){"use strict";var l=a("e005"),r=a.n(l);r.a},e005:function(e,t,a){}}]);