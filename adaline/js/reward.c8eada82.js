(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["reward"],{"00d8":function(e,t){(function(){var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",r={rotl:function(e,t){return e<<t|e>>>32-t},rotr:function(e,t){return e<<32-t|e>>>t},endian:function(e){if(e.constructor==Number)return 16711935&r.rotl(e,8)|4278255360&r.rotl(e,24);for(var t=0;t<e.length;t++)e[t]=r.endian(e[t]);return e},randomBytes:function(e){for(var t=[];e>0;e--)t.push(Math.floor(256*Math.random()));return t},bytesToWords:function(e){for(var t=[],r=0,n=0;r<e.length;r++,n+=8)t[n>>>5]|=e[r]<<24-n%32;return t},wordsToBytes:function(e){for(var t=[],r=0;r<32*e.length;r+=8)t.push(e[r>>>5]>>>24-r%32&255);return t},bytesToHex:function(e){for(var t=[],r=0;r<e.length;r++)t.push((e[r]>>>4).toString(16)),t.push((15&e[r]).toString(16));return t.join("")},hexToBytes:function(e){for(var t=[],r=0;r<e.length;r+=2)t.push(parseInt(e.substr(r,2),16));return t},bytesToBase64:function(e){for(var r=[],n=0;n<e.length;n+=3)for(var a=e[n]<<16|e[n+1]<<8|e[n+2],o=0;o<4;o++)8*n+6*o<=8*e.length?r.push(t.charAt(a>>>6*(3-o)&63)):r.push("=");return r.join("")},base64ToBytes:function(e){e=e.replace(/[^A-Z0-9+\/]/gi,"");for(var r=[],n=0,a=0;n<e.length;a=++n%4)0!=a&&r.push((t.indexOf(e.charAt(n-1))&Math.pow(2,-2*a+8)-1)<<2*a|t.indexOf(e.charAt(n))>>>6-2*a);return r}};e.exports=r})()},"044b":function(e,t){function r(e){return!!e.constructor&&"function"===typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}function n(e){return"function"===typeof e.readFloatLE&&"function"===typeof e.slice&&r(e.slice(0,0))}
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
e.exports=function(e){return null!=e&&(r(e)||n(e)||!!e._isBuffer)}},"517b":function(e,t,r){"use strict";function n(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}var a=n,o=r("5ea3"),i="object"==typeof self&&self&&self.Object===Object&&self,l=o["a"]||i||Function("return this")(),s=l,c=function(){return s.Date.now()},u=c,p=s.Symbol,f=p,m=Object.prototype,d=m.hasOwnProperty,b=m.toString,y=f?f.toStringTag:void 0;function h(e){var t=d.call(e,y),r=e[y];try{e[y]=void 0;var n=!0}catch(o){}var a=b.call(e);return n&&(t?e[y]=r:delete e[y]),a}var g=h,_=Object.prototype,v=_.toString;function w(e){return v.call(e)}var x=w,S="[object Null]",T="[object Undefined]",O=f?f.toStringTag:void 0;function F(e){return null==e?void 0===e?T:S:O&&O in Object(e)?g(e):x(e)}var E=F;function j(e){return null!=e&&"object"==typeof e}var k=j,C="[object Symbol]";function D(e){return"symbol"==typeof e||k(e)&&E(e)==C}var N=D,$=NaN,R=/^\s+|\s+$/g,A=/^[-+]0x[0-9a-f]+$/i,L=/^0b[01]+$/i,B=/^0o[0-7]+$/i,M=parseInt;function P(e){if("number"==typeof e)return e;if(N(e))return $;if(a(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=a(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(R,"");var r=L.test(e);return r||B.test(e)?M(e.slice(2),r?2:8):A.test(e)?$:+e}var z=P,W="Expected a function",V=Math.max,I=Math.min;function U(e,t,r){var n,o,i,l,s,c,p=0,f=!1,m=!1,d=!0;if("function"!=typeof e)throw new TypeError(W);function b(t){var r=n,a=o;return n=o=void 0,p=t,l=e.apply(a,r),l}function y(e){return p=e,s=setTimeout(_,t),f?b(e):l}function h(e){var r=e-c,n=e-p,a=t-r;return m?I(a,i-n):a}function g(e){var r=e-c,n=e-p;return void 0===c||r>=t||r<0||m&&n>=i}function _(){var e=u();if(g(e))return v(e);s=setTimeout(_,h(e))}function v(e){return s=void 0,d&&n?b(e):(n=o=void 0,l)}function w(){void 0!==s&&clearTimeout(s),p=0,n=c=o=s=void 0}function x(){return void 0===s?l:v(u())}function S(){var e=u(),r=g(e);if(n=arguments,o=this,c=e,r){if(void 0===s)return y(c);if(m)return clearTimeout(s),s=setTimeout(_,t),b(c)}return void 0===s&&(s=setTimeout(_,t)),l}return t=z(t)||0,a(r)&&(f=!!r.leading,m="maxWait"in r,i=m?V(z(r.maxWait)||0,t):i,d="trailing"in r?!!r.trailing:d),S.cancel=w,S.flush=x,S}var H=U,Y="Expected a function";function J(e,t,r){var n=!0,o=!0;if("function"!=typeof e)throw new TypeError(Y);return a(r)&&(n="leading"in r?!!r.leading:n,o="trailing"in r?!!r.trailing:o),H(e,t,{leading:n,maxWait:t,trailing:o})}t["a"]=J},"589b":function(e,t,r){"use strict";var n=r("8d54"),a=r.n(n);a.a},"5ea3":function(e,t,r){"use strict";(function(e){var r="object"==typeof e&&e&&e.Object===Object&&e;t["a"]=r}).call(this,r("c8ba"))},"6821f":function(e,t,r){(function(){var t=r("00d8"),n=r("9a63").utf8,a=r("044b"),o=r("9a63").bin,i=function(e,r){e.constructor==String?e=r&&"binary"===r.encoding?o.stringToBytes(e):n.stringToBytes(e):a(e)?e=Array.prototype.slice.call(e,0):Array.isArray(e)||(e=e.toString());for(var l=t.bytesToWords(e),s=8*e.length,c=1732584193,u=-271733879,p=-1732584194,f=271733878,m=0;m<l.length;m++)l[m]=16711935&(l[m]<<8|l[m]>>>24)|4278255360&(l[m]<<24|l[m]>>>8);l[s>>>5]|=128<<s%32,l[14+(s+64>>>9<<4)]=s;var d=i._ff,b=i._gg,y=i._hh,h=i._ii;for(m=0;m<l.length;m+=16){var g=c,_=u,v=p,w=f;c=d(c,u,p,f,l[m+0],7,-680876936),f=d(f,c,u,p,l[m+1],12,-389564586),p=d(p,f,c,u,l[m+2],17,606105819),u=d(u,p,f,c,l[m+3],22,-1044525330),c=d(c,u,p,f,l[m+4],7,-176418897),f=d(f,c,u,p,l[m+5],12,1200080426),p=d(p,f,c,u,l[m+6],17,-1473231341),u=d(u,p,f,c,l[m+7],22,-45705983),c=d(c,u,p,f,l[m+8],7,1770035416),f=d(f,c,u,p,l[m+9],12,-1958414417),p=d(p,f,c,u,l[m+10],17,-42063),u=d(u,p,f,c,l[m+11],22,-1990404162),c=d(c,u,p,f,l[m+12],7,1804603682),f=d(f,c,u,p,l[m+13],12,-40341101),p=d(p,f,c,u,l[m+14],17,-1502002290),u=d(u,p,f,c,l[m+15],22,1236535329),c=b(c,u,p,f,l[m+1],5,-165796510),f=b(f,c,u,p,l[m+6],9,-1069501632),p=b(p,f,c,u,l[m+11],14,643717713),u=b(u,p,f,c,l[m+0],20,-373897302),c=b(c,u,p,f,l[m+5],5,-701558691),f=b(f,c,u,p,l[m+10],9,38016083),p=b(p,f,c,u,l[m+15],14,-660478335),u=b(u,p,f,c,l[m+4],20,-405537848),c=b(c,u,p,f,l[m+9],5,568446438),f=b(f,c,u,p,l[m+14],9,-1019803690),p=b(p,f,c,u,l[m+3],14,-187363961),u=b(u,p,f,c,l[m+8],20,1163531501),c=b(c,u,p,f,l[m+13],5,-1444681467),f=b(f,c,u,p,l[m+2],9,-51403784),p=b(p,f,c,u,l[m+7],14,1735328473),u=b(u,p,f,c,l[m+12],20,-1926607734),c=y(c,u,p,f,l[m+5],4,-378558),f=y(f,c,u,p,l[m+8],11,-2022574463),p=y(p,f,c,u,l[m+11],16,1839030562),u=y(u,p,f,c,l[m+14],23,-35309556),c=y(c,u,p,f,l[m+1],4,-1530992060),f=y(f,c,u,p,l[m+4],11,1272893353),p=y(p,f,c,u,l[m+7],16,-155497632),u=y(u,p,f,c,l[m+10],23,-1094730640),c=y(c,u,p,f,l[m+13],4,681279174),f=y(f,c,u,p,l[m+0],11,-358537222),p=y(p,f,c,u,l[m+3],16,-722521979),u=y(u,p,f,c,l[m+6],23,76029189),c=y(c,u,p,f,l[m+9],4,-640364487),f=y(f,c,u,p,l[m+12],11,-421815835),p=y(p,f,c,u,l[m+15],16,530742520),u=y(u,p,f,c,l[m+2],23,-995338651),c=h(c,u,p,f,l[m+0],6,-198630844),f=h(f,c,u,p,l[m+7],10,1126891415),p=h(p,f,c,u,l[m+14],15,-1416354905),u=h(u,p,f,c,l[m+5],21,-57434055),c=h(c,u,p,f,l[m+12],6,1700485571),f=h(f,c,u,p,l[m+3],10,-1894986606),p=h(p,f,c,u,l[m+10],15,-1051523),u=h(u,p,f,c,l[m+1],21,-2054922799),c=h(c,u,p,f,l[m+8],6,1873313359),f=h(f,c,u,p,l[m+15],10,-30611744),p=h(p,f,c,u,l[m+6],15,-1560198380),u=h(u,p,f,c,l[m+13],21,1309151649),c=h(c,u,p,f,l[m+4],6,-145523070),f=h(f,c,u,p,l[m+11],10,-1120210379),p=h(p,f,c,u,l[m+2],15,718787259),u=h(u,p,f,c,l[m+9],21,-343485551),c=c+g>>>0,u=u+_>>>0,p=p+v>>>0,f=f+w>>>0}return t.endian([c,u,p,f])};i._ff=function(e,t,r,n,a,o,i){var l=e+(t&r|~t&n)+(a>>>0)+i;return(l<<o|l>>>32-o)+t},i._gg=function(e,t,r,n,a,o,i){var l=e+(t&n|r&~n)+(a>>>0)+i;return(l<<o|l>>>32-o)+t},i._hh=function(e,t,r,n,a,o,i){var l=e+(t^r^n)+(a>>>0)+i;return(l<<o|l>>>32-o)+t},i._ii=function(e,t,r,n,a,o,i){var l=e+(r^(t|~n))+(a>>>0)+i;return(l<<o|l>>>32-o)+t},i._blocksize=16,i._digestsize=16,e.exports=function(e,r){if(void 0===e||null===e)throw new Error("Illegal argument "+e);var n=t.wordsToBytes(i(e,r));return r&&r.asBytes?n:r&&r.asString?o.bytesToString(n):t.bytesToHex(n)}})()},"8d54":function(e,t,r){},"9a63":function(e,t){var r={utf8:{stringToBytes:function(e){return r.bin.stringToBytes(unescape(encodeURIComponent(e)))},bytesToString:function(e){return decodeURIComponent(escape(r.bin.bytesToString(e)))}},bin:{stringToBytes:function(e){for(var t=[],r=0;r<e.length;r++)t.push(255&e.charCodeAt(r));return t},bytesToString:function(e){for(var t=[],r=0;r<e.length;r++)t.push(String.fromCharCode(e[r]));return t.join("")}}};e.exports=r},bb3e:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"wrapper manage"},[r("el-form",{ref:"ruleForm",staticClass:"ope-form",attrs:{model:e.ruleForm,inline:""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.submitSearch(t)}}},[r("el-form-item",{attrs:{label:"采集人"}},[r("el-input",{attrs:{placeholder:"请输入采集人姓名",clearable:""},model:{value:e.ruleForm.userName,callback:function(t){e.$set(e.ruleForm,"userName",t)},expression:"ruleForm.userName"}})],1),r("el-form-item",{attrs:{label:"手机"}},[r("el-input",{attrs:{placeholder:"请输入手机号码",clearable:""},model:{value:e.ruleForm.mobile,callback:function(t){e.$set(e.ruleForm,"mobile",t)},expression:"ruleForm.mobile"}})],1),r("el-form-item",{attrs:{label:"支付单号"}},[r("el-input",{attrs:{placeholder:"请输入支付单号",clearable:""},model:{value:e.ruleForm.order,callback:function(t){e.$set(e.ruleForm,"order",t)},expression:"ruleForm.order"}})],1),r("el-form-item",{attrs:{label:"发放状态"}},[r("el-select",{attrs:{placeholder:"请选择",clearable:""},model:{value:e.ruleForm.payStatus,callback:function(t){e.$set(e.ruleForm,"payStatus",t)},expression:"ruleForm.payStatus"}},[r("el-option",{attrs:{label:"待发放",value:e.REWARD_STATUS.wait}}),r("el-option",{attrs:{label:"已发放",value:e.REWARD_STATUS.yes}})],1)],1),r("el-form-item",{attrs:{label:"生成时间"}},[r("el-date-picker",{attrs:{type:"datetimerange",editable:!1,"value-format":"yyyy-MM-dd HH:mm:ss","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.ruleForm.created,callback:function(t){e.$set(e.ruleForm,"created",t)},expression:"ruleForm.created"}})],1),r("el-form-item",[r("el-button",{ref:"searchBtn",staticStyle:{"letter-spacing":"1px"},attrs:{type:"danger"},on:{click:function(t){return e.submitSearch(t)}}},[e._v("搜索\n            ")])],1),r("el-form-item",{staticStyle:{float:"right"}},[r("el-button",{ref:"exportExcelBtn",staticStyle:{"letter-spacing":"1px"},attrs:{type:"success"},on:{click:e.onExportExcel}},[e._v("导出\n            ")])],1)],1),r("div",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],ref:"content",staticClass:"content"},[e.listError?r("div",{staticClass:"alert alert-warning"},[e._m(0),e._v("\n            "+e._s(e.listError)+"\n        ")]):r("el-table",{staticStyle:{width:"100%"},attrs:{data:e.list,stripe:!0,"highlight-current-row":!0,height:"100%"}},[r("el-table-column",{attrs:{type:"expand"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-form",{staticClass:"table-expand",attrs:{"label-position":"left",inline:""}},[t.row.pay_status===e.REWARD_STATUS.yes?r("el-form-item",{attrs:{label:"发放人："}},[r("span",[e._v(e._s(t.row.account))])]):e._e(),t.row.pay_status===e.REWARD_STATUS.yes?r("el-form-item",{attrs:{label:"发放时间："}},[r("span",[e._v(e._s(t.row.pay_time_format))])]):e._e(),r("el-form-item",{attrs:{label:"日志："}},[r("span",[e._v(e._s(t.row.file_name))])])],1)]}}])}),r("el-table-column",{attrs:{label:"采集人",prop:"user_name"}}),r("el-table-column",{attrs:{label:"手机",prop:"phone",align:"center","header-align":"center","min-width":"110"}}),r("el-table-column",{attrs:{label:"收款账号",prop:"pay_type_format",align:"center","header-align":"center","min-width":"78"}}),r("el-table-column",{attrs:{label:"类型",prop:"file_type_format",align:"center","header-align":"center","min-width":"52"}}),r("el-table-column",{attrs:{label:"奖励金额",prop:"pay_fee",align:"center","header-align":"center","min-width":"78"}}),r("el-table-column",{attrs:{label:"支付单号",prop:"pay_order_id",align:"center","header-align":"center","min-width":"142"}}),r("el-table-column",{attrs:{label:"生成时间",prop:"created_format",align:"center","header-align":"center","min-width":"136"}}),r("el-table-column",{attrs:{label:"发放状态",prop:"pay_status_format",align:"center","header-align":"center","min-width":"78"}}),r("el-table-column",{attrs:{label:"操作",align:"center","header-align":"center","min-width":"76"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{size:"mini",disabled:t.row.pay_status===e.REWARD_STATUS.yes},on:{click:function(r){return e.openRewardDialog(t.row)}}},[e._v("发放\n                    ")])]}}])})],1)],1),r("div",{staticClass:"footer"},[r("el-pagination",{attrs:{"current-page":e.pageNum,"page-size":e.pagesize,layout:"total, prev, pager, next, jumper",total:1*e.totalNum},on:{"current-change":e.handleCurrentChange}})],1),r("el-dialog",{ref:"rewardDialog",attrs:{title:"发放奖励",visible:e.rewardDialogVisible,width:"400px","close-on-click-modal":!1,"close-on-press-escape":!1,"destroy-on-close":!0},on:{"update:visible":function(t){e.rewardDialogVisible=t}}},[r("p",{staticClass:"line strong red margin-bottom"},[e._v("提示：发放前，请仔细确认以下信息。")]),r("p",{staticClass:"line"},[e._v("采集人："+e._s(e.confirm.userName))]),r("p",{staticClass:"line"},[e._v("手机："+e._s(e.confirm.mobile))]),r("p",{staticClass:"line"},[e._v("品牌/车型："+e._s(e.confirm.brand)+e._s(e.confirm.model))]),e.confirm.fileType===e.FILE_TYPE.simulation?r("p",{staticClass:"line"},[e._v("数据类型：模拟")]):e.confirm.fileType===e.FILE_TYPE.adaline?r("p",{staticClass:"line"},[e._v("数据类型：回放")]):e._e(),e.confirm.fileType===e.FILE_TYPE.simulation?r("p",{staticClass:"line"},[e._v("系统个数："+e._s(e.confirm.systemCount))]):e._e(),r("p",{staticClass:"line margin-bottom"},[e._v("奖励金额："+e._s(e.confirm.rewardMoney)+"元")]),r("template",{slot:"footer"},[r("el-button",{staticClass:"big-size",on:{click:function(t){e.rewardDialogVisible=!1}}},[e._v("取消")]),r("el-button",{staticClass:"big-size",attrs:{type:"danger",loading:e.rewardLoading},on:{click:e.rewardYesHandle}},[e._v("同意发放\n            ")])],1)],2),r("el-dialog",{ref:"exportDialog",attrs:{title:"导出Excel",visible:e.exportDialogVisible,width:"886px","close-on-click-modal":!1,"close-on-press-escape":!1,"destroy-on-close":!0},on:{"update:visible":function(t){e.exportDialogVisible=t}}},[r("el-form",{staticClass:"export-form",attrs:{inline:"",model:e.exportForm}},[r("el-form-item",{attrs:{label:"采集人"}},[r("el-input",{attrs:{placeholder:"请输入采集人姓名",clearable:""},model:{value:e.exportForm.userName,callback:function(t){e.$set(e.exportForm,"userName",t)},expression:"exportForm.userName"}})],1),r("el-form-item",{attrs:{label:"手机"}},[r("el-input",{attrs:{placeholder:"请输入手机号码",clearable:""},model:{value:e.exportForm.mobile,callback:function(t){e.$set(e.exportForm,"mobile",t)},expression:"exportForm.mobile"}})],1),r("el-form-item",{attrs:{label:"支付单号"}},[r("el-input",{attrs:{placeholder:"请输入支付单号",clearable:""},model:{value:e.exportForm.order,callback:function(t){e.$set(e.exportForm,"order",t)},expression:"exportForm.order"}})],1),r("el-form-item",{attrs:{label:"发放状态"}},[r("el-select",{attrs:{placeholder:"请选择",clearable:""},model:{value:e.exportForm.payStatus,callback:function(t){e.$set(e.exportForm,"payStatus",t)},expression:"exportForm.payStatus"}},[r("el-option",{attrs:{label:"待发放",value:e.REWARD_STATUS.wait}}),r("el-option",{attrs:{label:"已发放",value:e.REWARD_STATUS.yes}})],1)],1),r("el-form-item",{attrs:{label:"生成时间"}},[r("el-date-picker",{attrs:{type:"datetimerange",editable:!1,"value-format":"yyyy-MM-dd HH:mm:ss","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.exportForm.created,callback:function(t){e.$set(e.exportForm,"created",t)},expression:"exportForm.created"}})],1)],1),r("template",{slot:"footer"},[r("el-button",{on:{click:function(t){e.exportDialogVisible=!1}}},[e._v("取消")]),r("el-button",{attrs:{type:"danger"},on:{click:e.onExportSubmit}},[e._v("确定")])],1)],2)],1)},a=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("h4",[r("i",{staticClass:"fa fa-warning"}),e._v(" 提示：")])}],o=r("2f62"),i=r("6821f"),l=r.n(i),s=r("517b"),c=r("7ac3"),u=r("b37c"),p=r("33a1");function f(e){return f="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},f(e)}function m(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function d(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function b(e,t,r){return t&&d(e.prototype,t),r&&d(e,r),e}function y(e,t){return!t||"object"!==f(t)&&"function"!==typeof t?h(e):t}function h(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function g(e){return g=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},g(e)}function _(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&v(e,t)}function v(e,t){return v=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},v(e,t)}var w=function(e){function t(){return m(this,t),y(this,g(t).apply(this,arguments))}return _(t,e),b(t,[{key:"getList",value:function(e,t,r){var n,a,o=r.userName,i=r.mobile,s=r.order,c=r.payStatus,u=r.created;u instanceof Array&&2===u.length&&(n=u[0],a=u[1]);var f="action=getRewardList";null!=a&&(f+="&end_time=".concat(a)),f+="&page=".concat(e,"&pagesize=").concat(t),null!=s&&(f+="&pay_order_id=".concat(s)),null!=c&&(f+="&pay_status=".concat(c)),null!=i&&(f+="&phone=".concat(i)),null!=n&&(f+="&start_time=".concat(n)),null!=o&&(f+="&user_name=".concat(o)),f=l()("".concat(l()(f)).concat(p["h"]));var m={page:e,pagesize:t,sign:f};return null!=o&&(m.user_name=o),null!=i&&(m.phone=i),null!=s&&(m.pay_order_id=s),null!=c&&(m.pay_status=c),null!=n&&(m.start_time=n),null!=a&&(m.end_time=a),this.$get("/LearningMachine/Index/getRewardList",m)}},{key:"pay",value:function(e,t){var r=6,n="action=index";n+="&base_id=".concat(e),n+="&user_id=".concat(t),n+="&wx_type=".concat(r),n=l()("".concat(l()(n)).concat(p["h"]));var a={base_id:e,user_id:t,wx_type:r,sign:n};return this.$getMsg("/LearningMachine/Pay/index",a)}}]),t}(u["a"]),x=new w;function S(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function T(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?S(r,!0).forEach(function(t){O(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):S(r).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function O(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var F={yes:"1",wait:"0"},E={name:"Reward",data:function(){return{totalNum:0,pagesize:10,pageNum:1,ruleForm:{userName:"",mobile:"",order:"",payStatus:"",created:""},search:{userName:"",mobile:"",order:"",payStatus:"",created:""},listLoading:!1,listError:"",list:[],rewardSelect:null,rewardDialogVisible:!1,rewardLoading:!1,confirm:{userName:"",mobile:"",brand:"",model:"",fileType:"",systemCount:0,rewardMoney:0},exportDialogVisible:!1,exportForm:{userName:"",mobile:"",order:"",payStatus:"",created:""},exportLoading:!1}},computed:T({},Object(o["c"])(["__manage_userid__"])),created:function(){this.FILE_TYPE=p["d"],this.REWARD_STATUS=F},activated:function(){this._reset(),this._renderTable(this.pageNum,this.pagesize,{})},methods:{submitSearch:Object(s["a"])(function(e){var t=e.target;if(13===e.keyCode&&(t===this.$refs.searchBtn.$el||t===this.$refs.batchRewardBtn.$el||t===this.$refs.exportExcelBtn.$el))return!1;for(var r in this.ruleForm)this.search[r]=this.ruleForm[r];this.pageNum=1,this._renderTable(this.pageNum,this.pagesize,this.search)},1e3,c["a"]),handleCurrentChange:function(e){this.pageNum=e,this._renderTable(e,this.pagesize,this.search)},openRewardDialog:function(e){this.rewardDialogVisible=!0,this.$refs.rewardDialog.$el.style.bottom="0",this.confirm.rewardMoney=0,this.rewardSelect=e,this.confirm.userName=e.user_name,this.confirm.mobile=e.phone,this.confirm.brand=e.car_brand,this.confirm.model=e.car_model,this.confirm.fileType=e.file_type,e.file_type===p["d"].adaline&&(this.confirm.systemCount=e.sys_num),this.confirm.rewardMoney+=1*e.pay_fee},rewardYesHandle:function(){var e=this;this.$confirm("确定同意发放?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",closeOnClickModal:!1,closeOnPressEscape:!1,type:"warning"}).then(function(){e._rewardStream(e.rewardSelect)}).catch(function(){})},_rewardStream:function(e){var t=this;this.rewardLoading=!0,x.pay(e.base_id,this.__manage_userid__).then(function(r){t.rewardLoading=!1,t.$message({type:"info",message:"支付单号：".concat(e.pay_order_id," 奖励发放成功")}),t.rewardDialogVisible=!1,t._renderTable(t.pageNum,t.pagesize,t.search)}).catch(function(e){t.rewardLoading=!1,t.$message({type:"error",message:e,duration:5e3,showClose:!0})})},onExportExcel:function(){this.exportDialogVisible=!0,this.$refs.exportDialog.$el.style.bottom="0",this.exportForm={userName:"",mobile:"",order:"",payStatus:"",created:""}},onExportSubmit:Object(s["a"])(function(e){var t=this,r=this.exportForm,n=!1,a={};for(var o in r)""!==r[o]&&"null"!==r[o]&&null!==r[o]&&(a[o]=r[o],n=!0);if(n){var i,s,c=a.userName,u=a.mobile,f=a.order,m=a.payStatus,d=a.created;d instanceof Array&&2===d.length&&(i=d[0],s=d[1]);var b=1,y="action=getRewardList";null!=s&&(y+="&end_time=".concat(s)),y+="&is_down=".concat(b),null!=f&&(y+="&pay_order_id=".concat(f)),null!=m&&(y+="&pay_status=".concat(m)),null!=u&&(y+="&phone=".concat(u)),null!=i&&(y+="&start_time=".concat(i)),null!=c&&(y+="&user_name=".concat(c)),y=l()("".concat(l()(y)).concat(p["h"]));var h=p["g"];h+="/LearningMachine/Index/getRewardList",h+="?sign=".concat(y,"&is_down=").concat(b),null!=c&&(h+="&user_name=".concat(c)),null!=u&&(h+="&phone=".concat(u)),null!=f&&(h+="&pay_order_id=".concat(f)),null!=m&&(h+="&pay_status=".concat(m)),null!=i&&(h+="&start_time=".concat(i)),null!=s&&(h+="&end_time=".concat(s)),window.open(h,"_blank"),setTimeout(function(){t.exportDialogVisible=!1},1e3)}else this.$message({type:"error",message:"请选择导出条件！"})},1e3,c["a"]),_renderTable:function(e,t,r){var n=this,a={};for(var o in r)""!==r[o]&&"null"!==r[o]&&null!==r[o]&&(a[o]=r[o]);this.listLoading=!0,this.$refs.content.scrollTop=0,this.listError="",x.getList(e,t,a).then(function(e){n.listLoading=!1,n.totalNum=e.count;for(var t=e.list,r=0;r<t.length;r++)t[r].file_type===p["d"].adaline?t[r].file_type_format="回放":t[r].file_type===p["d"].simulation?t[r].file_type_format="模拟":t[r].file_type_format="",t[r].pay_status===F.wait?t[r].pay_status_format="待发放":t[r].pay_status===F.yes?t[r].pay_status_format="已发放":t[r].pay_status_format="",t[r].created_format=Object(c["b"])(new Date(1e3*t[r].created),"yyyy-MM-dd hh:mm"),t[r].pay_time&&"0"!==t[r].pay_time?t[r].pay_time_format=Object(c["b"])(new Date(1e3*t[r].pay_time),"yyyy-MM-dd hh:mm"):t[r].pay_time_format="",t[r].openid&&""!==t[r].openid&&"null"!==t[r].openid?t[r].pay_type_format="微信":t[r].pay_type_format="支付宝";n.list=t}).catch(function(e){n.listLoading=!1,n.list=[],n.listError=10002===e?"错误：缺少参数，Code：10002":10004===e?"错误：签名错误，Code：10004":e})},_reset:function(){this.pageNum=1,this.ruleForm={userName:"",mobile:"",order:"",payStatus:"",created:""},this.search={userName:"",mobile:"",order:"",payStatus:"",created:""}}}},j=E,k=(r("589b"),r("2877")),C=Object(k["a"])(j,n,a,!1,null,"45843cbc",null);t["default"]=C.exports}}]);