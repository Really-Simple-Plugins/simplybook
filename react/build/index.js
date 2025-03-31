<<<<<<< HEAD
(()=>{var t,e,s,n,r={6244:(t,e,s)=>{"use strict";s.d(e,{A:()=>c});var n=s(6087),r=s(5556),o=s.n(r),i=s(7723);class a extends n.Component{constructor(t){super(t),this.state={hasError:!1,error:null,errorInfo:null,copied:!1},this.resetError=this.resetError.bind(this),this.copyError=this.copyError.bind(this)}static getDerivedStateFromError(t){return{hasError:!0}}componentDidCatch(t,e){this.setState({error:t,errorInfo:e})}resetError(){this.setState({hasError:!1,error:null,errorInfo:null})}copyError(){navigator.clipboard.writeText(`${this.state.error&&this.state.error.toString()}\nStack trace: ${this.state.errorInfo&&this.state.errorInfo.componentStack}`),this.setState({copied:!0})}render(){return this.state.hasError?React.createElement("div",{className:"rounded-md bg-white p-5 text-black shadow-md"},React.createElement("h3",{className:"mb-4 text-xl font-bold text-black"},(0,i.__)("Uh-oh! We stumbled upon an error.","simplybook")),React.createElement("div",{className:"mb-6 rounded-sm border bg-gray-50 p-4"},React.createElement("p",{className:"mb-2 text-base text-black"},this.state.error&&this.state.error.toString()),React.createElement("p",{className:"max-h-48 overflow-x-scroll text-xs text-black"},"Stack trace:"," ",this.state.errorInfo&&this.state.errorInfo.componentStack),React.createElement("button",{className:`mt-4 rounded-md px-4 py-2 font-medium text-white ${this.state.copied?"bg-green-500":"bg-blue-500 hover:bg-blue-600"} focus:outline-hidden focus:ring-2 focus:ring-blue-500`,onClick:this.copyError},this.state.copied?(0,i.__)("Copied","simplybook"):(0,i.__)("Copy Error","simplybook"))),React.createElement("p",{className:"mb-4 text-black"},(0,i.__)("We're sorry for the trouble. Please take a moment to report this issue on the WordPress forums so we can work on fixing it. Here’s how you can report the issue:","simplybook")),React.createElement("ol",{className:"list-inside list-decimal space-y-2 text-black"},React.createElement("li",null,(0,i.sprintf)((0,i.__)("Copy the error details by clicking the %s button above.","simplybook"),'"Copy Error"')),React.createElement("li",null,React.createElement("a",{href:"https://wordpress.org/support/plugin/simplybook/#new-topic-0",className:"text-blue-600 underline hover:text-blue-800"},(0,i.__)("Navigate to the Support Forum.","simplybook"))),React.createElement("li",null,(0,i.__)("If you haven’t already, log in to your WordPress.org account or create a new account.","simplybook")),React.createElement("li",null,(0,i.sprintf)((0,i.__)("Once logged in, click on %s under the Burst Statistics forum.","simplybook"),'"Create Topic"')),React.createElement("li",null,(0,i.sprintf)((0,i.__)("Title: Mention %s along with a brief hint of the error.","simplybook"),"'Error Encountered'")),React.createElement("li",null,(0,i.__)("Description: Paste the copied error details and explain what you were doing when the error occurred.","simplybook")),React.createElement("li",null,(0,i.sprintf)((0,i.__)("Click %s to post your topic. Our team will look into the issue and provide assistance.","simplybook"),'"Submit"')))):this.props.children}}a.propTypes={children:o().node,fallback:o().node},a.displayName="ErrorBoundary";const c=a},7159:t=>{"use strict";const e={},s=e.hasOwnProperty,n=(t,e)=>{for(const n in t)s.call(t,n)&&e(n,t[n])},r=t=>"\\u"+("0000"+t).slice(-4),o=(t,e)=>{let s=t.toString(16);return e?s:s.toUpperCase()},i=e.toString,a=Array.isArray,c=t=>"bigint"==typeof t,u={"\\":"\\\\","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t"},l=/[\\\b\f\n\r\t]/,h=/[0-9]/,d=/[\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/,p=/([\uD800-\uDBFF][\uDC00-\uDFFF])|([\uD800-\uDFFF])|(['"`])|[^]/g,f=/([\uD800-\uDBFF][\uDC00-\uDFFF])|([\uD800-\uDFFF])|(['"`])|[^ !#-&\(-\[\]-_a-~]/g,m=(t,e)=>{const s=()=>{_=R,++e.indentLevel,R=e.indent.repeat(e.indentLevel)},v={escapeEverything:!1,minimal:!1,isScriptContext:!1,quotes:"single",wrap:!1,es6:!1,json:!1,compact:!0,lowercaseHex:!1,numbers:"decimal",indent:"\t",indentLevel:0,__inline1__:!1,__inline2__:!1},y=e&&e.json;var g,b;y&&(v.quotes="double",v.wrap=!0),g=v,e=(b=e)?(n(b,((t,e)=>{g[t]=e})),g):g,"single"!=e.quotes&&"double"!=e.quotes&&"backtick"!=e.quotes&&(e.quotes="single");const S="double"==e.quotes?'"':"backtick"==e.quotes?"`":"'",w=e.compact,C=e.lowercaseHex;let R=e.indent.repeat(e.indentLevel),_="";const P=e.__inline1__,x=e.__inline2__,O=w?"":"\n";let E,k=!0;const M="binary"==e.numbers,L="octal"==e.numbers,F="decimal"==e.numbers,j="hexadecimal"==e.numbers;if(y&&t&&"function"==typeof t.toJSON&&(t=t.toJSON()),"string"!=typeof(I=t)&&"[object String]"!=i.call(I)){if((t=>"[object Map]"==i.call(t))(t))return 0==t.size?"new Map()":(w||(e.__inline1__=!0,e.__inline2__=!1),"new Map("+m(Array.from(t),e)+")");if((t=>"[object Set]"==i.call(t))(t))return 0==t.size?"new Set()":"new Set("+m(Array.from(t),e)+")";if((t=>"function"==typeof Buffer&&Buffer.isBuffer(t))(t))return 0==t.length?"Buffer.from([])":"Buffer.from("+m(Array.from(t),e)+")";if(a(t))return E=[],e.wrap=!0,P&&(e.__inline1__=!1,e.__inline2__=!0),x||s(),((t,e)=>{const s=t.length;let n=-1;for(;++n<s;)e(t[n])})(t,(t=>{k=!1,x&&(e.__inline2__=!1),E.push((w||x?"":R)+m(t,e))})),k?"[]":x?"["+E.join(", ")+"]":"["+O+E.join(","+O)+O+(w?"":_)+"]";if((t=>"number"==typeof t||"[object Number]"==i.call(t))(t)||c(t)){if(y)return JSON.stringify(Number(t));let e;if(F)e=String(t);else if(j){let s=t.toString(16);C||(s=s.toUpperCase()),e="0x"+s}else M?e="0b"+t.toString(2):L&&(e="0o"+t.toString(8));return c(t)?e+"n":e}return c(t)?y?JSON.stringify(Number(t)):t+"n":(t=>"[object Object]"==i.call(t))(t)?(E=[],e.wrap=!0,s(),n(t,((t,s)=>{k=!1,E.push((w?"":R)+m(t,e)+":"+(w?"":" ")+m(s,e))})),k?"{}":"{"+O+E.join(","+O)+O+(w?"":_)+"}"):y?JSON.stringify(t)||"null":String(t)}var I;const A=e.escapeEverything?p:f;return E=t.replace(A,((t,s,n,i,a,c)=>{if(s){if(e.minimal)return s;const t=s.charCodeAt(0),n=s.charCodeAt(1);return e.es6?"\\u{"+o(1024*(t-55296)+n-56320+65536,C)+"}":r(o(t,C))+r(o(n,C))}if(n)return r(o(n.charCodeAt(0),C));if("\0"==t&&!y&&!h.test(c.charAt(a+1)))return"\\0";if(i)return i==S||e.escapeEverything?"\\"+i:i;if(l.test(t))return u[t];if(e.minimal&&!d.test(t))return t;const p=o(t.charCodeAt(0),C);return y||p.length>2?r(p):"\\x"+("00"+p).slice(-2)})),"`"==S&&(E=E.replace(/\$\{/g,"\\${")),e.isScriptContext&&(E=E.replace(/<\/(script|style)/gi,"<\\/$1").replace(/<!--/g,y?"\\u003C!--":"\\x3C!--")),e.wrap&&(E=S+E+S),E};m.version="3.0.2",t.exports=m},2694:(t,e,s)=>{"use strict";var n=s(6925);function r(){}function o(){}o.resetWarningCache=r,t.exports=function(){function t(t,e,s,r,o,i){if(i!==n){var a=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw a.name="Invariant Violation",a}}function e(){return t}t.isRequired=t;var s={array:t,bigint:t,bool:t,func:t,number:t,object:t,string:t,symbol:t,any:t,arrayOf:e,element:t,elementType:t,instanceOf:e,node:t,objectOf:e,oneOf:e,oneOfType:e,shape:e,exact:e,checkPropTypes:o,resetWarningCache:r};return s.PropTypes=s,s}},5556:(t,e,s)=>{t.exports=s(2694)()},6925:t=>{"use strict";t.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},7573:(t,e,s)=>{"use strict";s.d(e,{A:()=>n});const n=function(t,e){}},8493:(t,e,s)=>{"use strict";var n=s(1609),r="function"==typeof Object.is?Object.is:function(t,e){return t===e&&(0!==t||1/t==1/e)||t!=t&&e!=e},o=n.useState,i=n.useEffect,a=n.useLayoutEffect,c=n.useDebugValue;function u(t){var e=t.getSnapshot;t=t.value;try{var s=e();return!r(t,s)}catch(t){return!0}}var l="undefined"==typeof window||void 0===window.document||void 0===window.document.createElement?function(t,e){return e()}:function(t,e){var s=e(),n=o({inst:{value:s,getSnapshot:e}}),r=n[0].inst,l=n[1];return a((function(){r.value=s,r.getSnapshot=e,u(r)&&l({inst:r})}),[t,s,e]),i((function(){return u(r)&&l({inst:r}),t((function(){u(r)&&l({inst:r})}))}),[t]),c(s),s};e.useSyncExternalStore=void 0!==n.useSyncExternalStore?n.useSyncExternalStore:l},2162:(t,e,s)=>{"use strict";var n=s(1609),r=s(9888),o="function"==typeof Object.is?Object.is:function(t,e){return t===e&&(0!==t||1/t==1/e)||t!=t&&e!=e},i=r.useSyncExternalStore,a=n.useRef,c=n.useEffect,u=n.useMemo,l=n.useDebugValue;e.useSyncExternalStoreWithSelector=function(t,e,s,n,r){var h=a(null);if(null===h.current){var d={hasValue:!1,value:null};h.current=d}else d=h.current;h=u((function(){function t(t){if(!c){if(c=!0,i=t,t=n(t),void 0!==r&&d.hasValue){var e=d.value;if(r(e,t))return a=e}return a=t}if(e=a,o(i,t))return e;var s=n(t);return void 0!==r&&r(e,s)?(i=t,e):(i=t,a=s)}var i,a,c=!1,u=void 0===s?null:s;return[function(){return t(e())},null===u?void 0:function(){return t(u())}]}),[e,s,n,r]);var p=i(t,h[0],h[1]);return c((function(){d.hasValue=!0,d.value=p}),[p]),l(p),p}},9888:(t,e,s)=>{"use strict";t.exports=s(8493)},9242:(t,e,s)=>{"use strict";t.exports=s(2162)},1609:t=>{"use strict";t.exports=window.React},5795:t=>{"use strict";t.exports=window.ReactDOM},790:t=>{"use strict";t.exports=window.ReactJSXRuntime},1455:t=>{"use strict";t.exports=window.wp.apiFetch},6087:t=>{"use strict";t.exports=window.wp.element},7723:t=>{"use strict";t.exports=window.wp.i18n},9658:(t,e,s)=>{"use strict";s.d(e,{m:()=>o});var n=s(6500),r=s(4880),o=new class extends n.Q{#t;#e;#s;constructor(){super(),this.#s=t=>{if(!r.S$&&window.addEventListener){const e=()=>t();return window.addEventListener("visibilitychange",e,!1),()=>{window.removeEventListener("visibilitychange",e)}}}}onSubscribe(){this.#e||this.setEventListener(this.#s)}onUnsubscribe(){this.hasListeners()||(this.#e?.(),this.#e=void 0)}setEventListener(t){this.#s=t,this.#e?.(),this.#e=t((t=>{"boolean"==typeof t?this.setFocused(t):this.onFocus()}))}setFocused(t){this.#t!==t&&(this.#t=t,this.onFocus())}onFocus(){const t=this.isFocused();this.listeners.forEach((e=>{e(t)}))}isFocused(){return"boolean"==typeof this.#t?this.#t:"hidden"!==globalThis.document?.visibilityState}}},6158:(t,e,s)=>{"use strict";s.d(e,{$:()=>a,s:()=>i});var n=s(6261),r=s(1692),o=s(8904),i=class extends r.k{#n;#r;#o;constructor(t){super(),this.mutationId=t.mutationId,this.#r=t.mutationCache,this.#n=[],this.state=t.state||{context:void 0,data:void 0,error:null,failureCount:0,failureReason:null,isPaused:!1,status:"idle",variables:void 0,submittedAt:0},this.setOptions(t.options),this.scheduleGc()}setOptions(t){this.options=t,this.updateGcTime(this.options.gcTime)}get meta(){return this.options.meta}addObserver(t){this.#n.includes(t)||(this.#n.push(t),this.clearGcTimeout(),this.#r.notify({type:"observerAdded",mutation:this,observer:t}))}removeObserver(t){this.#n=this.#n.filter((e=>e!==t)),this.scheduleGc(),this.#r.notify({type:"observerRemoved",mutation:this,observer:t})}optionalRemove(){this.#n.length||("pending"===this.state.status?this.scheduleGc():this.#r.remove(this))}continue(){return this.#o?.continue()??this.execute(this.state.variables)}async execute(t){this.#o=(0,o.II)({fn:()=>this.options.mutationFn?this.options.mutationFn(t):Promise.reject(new Error("No mutationFn found")),onFail:(t,e)=>{this.#i({type:"failed",failureCount:t,error:e})},onPause:()=>{this.#i({type:"pause"})},onContinue:()=>{this.#i({type:"continue"})},retry:this.options.retry??0,retryDelay:this.options.retryDelay,networkMode:this.options.networkMode,canRun:()=>this.#r.canRun(this)});const e="pending"===this.state.status,s=!this.#o.canStart();try{if(!e){this.#i({type:"pending",variables:t,isPaused:s}),await(this.#r.config.onMutate?.(t,this));const e=await(this.options.onMutate?.(t));e!==this.state.context&&this.#i({type:"pending",context:e,variables:t,isPaused:s})}const n=await this.#o.start();return await(this.#r.config.onSuccess?.(n,t,this.state.context,this)),await(this.options.onSuccess?.(n,t,this.state.context)),await(this.#r.config.onSettled?.(n,null,this.state.variables,this.state.context,this)),await(this.options.onSettled?.(n,null,t,this.state.context)),this.#i({type:"success",data:n}),n}catch(e){try{throw await(this.#r.config.onError?.(e,t,this.state.context,this)),await(this.options.onError?.(e,t,this.state.context)),await(this.#r.config.onSettled?.(void 0,e,this.state.variables,this.state.context,this)),await(this.options.onSettled?.(void 0,e,t,this.state.context)),e}finally{this.#i({type:"error",error:e})}}finally{this.#r.runNext(this)}}#i(t){this.state=(e=>{switch(t.type){case"failed":return{...e,failureCount:t.failureCount,failureReason:t.error};case"pause":return{...e,isPaused:!0};case"continue":return{...e,isPaused:!1};case"pending":return{...e,context:t.context,data:void 0,failureCount:0,failureReason:null,error:null,isPaused:t.isPaused,status:"pending",variables:t.variables,submittedAt:Date.now()};case"success":return{...e,data:t.data,failureCount:0,failureReason:null,error:null,status:"success",isPaused:!1};case"error":return{...e,data:void 0,error:t.error,failureCount:e.failureCount+1,failureReason:t.error,isPaused:!1,status:"error"}}})(this.state),n.j.batch((()=>{this.#n.forEach((e=>{e.onMutationUpdate(t)})),this.#r.notify({mutation:this,type:"updated",action:t})}))}};function a(){return{context:void 0,data:void 0,error:null,failureCount:0,failureReason:null,isPaused:!1,status:"idle",variables:void 0,submittedAt:0}}},6261:(t,e,s)=>{"use strict";s.d(e,{j:()=>n});var n=function(){let t=[],e=0,s=t=>{t()},n=t=>{t()},r=t=>setTimeout(t,0);const o=n=>{e?t.push(n):r((()=>{s(n)}))};return{batch:o=>{let i;e++;try{i=o()}finally{e--,e||(()=>{const e=t;t=[],e.length&&r((()=>{n((()=>{e.forEach((t=>{s(t)}))}))}))})()}return i},batchCalls:t=>(...e)=>{o((()=>{t(...e)}))},schedule:o,setNotifyFunction:t=>{s=t},setBatchNotifyFunction:t=>{n=t},setScheduler:t=>{r=t}}}()},6035:(t,e,s)=>{"use strict";s.d(e,{t:()=>o});var n=s(6500),r=s(4880),o=new class extends n.Q{#a=!0;#e;#s;constructor(){super(),this.#s=t=>{if(!r.S$&&window.addEventListener){const e=()=>t(!0),s=()=>t(!1);return window.addEventListener("online",e,!1),window.addEventListener("offline",s,!1),()=>{window.removeEventListener("online",e),window.removeEventListener("offline",s)}}}}onSubscribe(){this.#e||this.setEventListener(this.#s)}onUnsubscribe(){this.hasListeners()||(this.#e?.(),this.#e=void 0)}setEventListener(t){this.#s=t,this.#e?.(),this.#e=t(this.setOnline.bind(this))}setOnline(t){this.#a!==t&&(this.#a=t,this.listeners.forEach((e=>{e(t)})))}isOnline(){return this.#a}}},9757:(t,e,s)=>{"use strict";s.d(e,{X:()=>a,k:()=>c});var n=s(4880),r=s(6261),o=s(8904),i=s(1692),a=class extends i.k{#c;#u;#l;#h;#o;#d;#p;constructor(t){super(),this.#p=!1,this.#d=t.defaultOptions,this.setOptions(t.options),this.observers=[],this.#h=t.client,this.#l=this.#h.getQueryCache(),this.queryKey=t.queryKey,this.queryHash=t.queryHash,this.#c=function(t){const e="function"==typeof t.initialData?t.initialData():t.initialData,s=void 0!==e,n=s?"function"==typeof t.initialDataUpdatedAt?t.initialDataUpdatedAt():t.initialDataUpdatedAt:0;return{data:e,dataUpdateCount:0,dataUpdatedAt:s?n??Date.now():0,error:null,errorUpdateCount:0,errorUpdatedAt:0,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:null,isInvalidated:!1,status:s?"success":"pending",fetchStatus:"idle"}}(this.options),this.state=t.state??this.#c,this.scheduleGc()}get meta(){return this.options.meta}get promise(){return this.#o?.promise}setOptions(t){this.options={...this.#d,...t},this.updateGcTime(this.options.gcTime)}optionalRemove(){this.observers.length||"idle"!==this.state.fetchStatus||this.#l.remove(this)}setData(t,e){const s=(0,n.pl)(this.state.data,t,this.options);return this.#i({data:s,type:"success",dataUpdatedAt:e?.updatedAt,manual:e?.manual}),s}setState(t,e){this.#i({type:"setState",state:t,setStateOptions:e})}cancel(t){const e=this.#o?.promise;return this.#o?.cancel(t),e?e.then(n.lQ).catch(n.lQ):Promise.resolve()}destroy(){super.destroy(),this.cancel({silent:!0})}reset(){this.destroy(),this.setState(this.#c)}isActive(){return this.observers.some((t=>!1!==(0,n.Eh)(t.options.enabled,this)))}isDisabled(){return this.getObserversCount()>0?!this.isActive():this.options.queryFn===n.hT||this.state.dataUpdateCount+this.state.errorUpdateCount===0}isStale(){return!!this.state.isInvalidated||(this.getObserversCount()>0?this.observers.some((t=>t.getCurrentResult().isStale)):void 0===this.state.data)}isStaleByTime(t=0){return this.state.isInvalidated||void 0===this.state.data||!(0,n.j3)(this.state.dataUpdatedAt,t)}onFocus(){const t=this.observers.find((t=>t.shouldFetchOnWindowFocus()));t?.refetch({cancelRefetch:!1}),this.#o?.continue()}onOnline(){const t=this.observers.find((t=>t.shouldFetchOnReconnect()));t?.refetch({cancelRefetch:!1}),this.#o?.continue()}addObserver(t){this.observers.includes(t)||(this.observers.push(t),this.clearGcTimeout(),this.#l.notify({type:"observerAdded",query:this,observer:t}))}removeObserver(t){this.observers.includes(t)&&(this.observers=this.observers.filter((e=>e!==t)),this.observers.length||(this.#o&&(this.#p?this.#o.cancel({revert:!0}):this.#o.cancelRetry()),this.scheduleGc()),this.#l.notify({type:"observerRemoved",query:this,observer:t}))}getObserversCount(){return this.observers.length}invalidate(){this.state.isInvalidated||this.#i({type:"invalidate"})}fetch(t,e){if("idle"!==this.state.fetchStatus)if(void 0!==this.state.data&&e?.cancelRefetch)this.cancel({silent:!0});else if(this.#o)return this.#o.continueRetry(),this.#o.promise;if(t&&this.setOptions(t),!this.options.queryFn){const t=this.observers.find((t=>t.options.queryFn));t&&this.setOptions(t.options)}const s=new AbortController,r=t=>{Object.defineProperty(t,"signal",{enumerable:!0,get:()=>(this.#p=!0,s.signal)})},i={fetchOptions:e,options:this.options,queryKey:this.queryKey,client:this.#h,state:this.state,fetchFn:()=>{const t=(0,n.ZM)(this.options,e),s={client:this.#h,queryKey:this.queryKey,meta:this.meta};return r(s),this.#p=!1,this.options.persister?this.options.persister(t,s,this):t(s)}};r(i),this.options.behavior?.onFetch(i,this),this.#u=this.state,"idle"!==this.state.fetchStatus&&this.state.fetchMeta===i.fetchOptions?.meta||this.#i({type:"fetch",meta:i.fetchOptions?.meta});const a=t=>{(0,o.wm)(t)&&t.silent||this.#i({type:"error",error:t}),(0,o.wm)(t)||(this.#l.config.onError?.(t,this),this.#l.config.onSettled?.(this.state.data,t,this)),this.scheduleGc()};return this.#o=(0,o.II)({initialPromise:e?.initialPromise,fn:i.fetchFn,abort:s.abort.bind(s),onSuccess:t=>{if(void 0!==t){try{this.setData(t)}catch(t){return void a(t)}this.#l.config.onSuccess?.(t,this),this.#l.config.onSettled?.(t,this.state.error,this),this.scheduleGc()}else a(new Error(`${this.queryHash} data is undefined`))},onError:a,onFail:(t,e)=>{this.#i({type:"failed",failureCount:t,error:e})},onPause:()=>{this.#i({type:"pause"})},onContinue:()=>{this.#i({type:"continue"})},retry:i.options.retry,retryDelay:i.options.retryDelay,networkMode:i.options.networkMode,canRun:()=>!0}),this.#o.start()}#i(t){this.state=(e=>{switch(t.type){case"failed":return{...e,fetchFailureCount:t.failureCount,fetchFailureReason:t.error};case"pause":return{...e,fetchStatus:"paused"};case"continue":return{...e,fetchStatus:"fetching"};case"fetch":return{...e,...c(e.data,this.options),fetchMeta:t.meta??null};case"success":return{...e,data:t.data,dataUpdateCount:e.dataUpdateCount+1,dataUpdatedAt:t.dataUpdatedAt??Date.now(),error:null,isInvalidated:!1,status:"success",...!t.manual&&{fetchStatus:"idle",fetchFailureCount:0,fetchFailureReason:null}};case"error":const s=t.error;return(0,o.wm)(s)&&s.revert&&this.#u?{...this.#u,fetchStatus:"idle"}:{...e,error:s,errorUpdateCount:e.errorUpdateCount+1,errorUpdatedAt:Date.now(),fetchFailureCount:e.fetchFailureCount+1,fetchFailureReason:s,fetchStatus:"idle",status:"error"};case"invalidate":return{...e,isInvalidated:!0};case"setState":return{...e,...t.state}}})(this.state),r.j.batch((()=>{this.observers.forEach((t=>{t.onQueryUpdate()})),this.#l.notify({query:this,type:"updated",action:t})}))}};function c(t,e){return{fetchFailureCount:0,fetchFailureReason:null,fetchStatus:(0,o.v_)(e.networkMode)?"fetching":"paused",...void 0===t&&{error:null,status:"pending"}}}},1692:(t,e,s)=>{"use strict";s.d(e,{k:()=>r});var n=s(4880),r=class{#f;destroy(){this.clearGcTimeout()}scheduleGc(){this.clearGcTimeout(),(0,n.gn)(this.gcTime)&&(this.#f=setTimeout((()=>{this.optionalRemove()}),this.gcTime))}updateGcTime(t){this.gcTime=Math.max(this.gcTime||0,t??(n.S$?1/0:3e5))}clearGcTimeout(){this.#f&&(clearTimeout(this.#f),this.#f=void 0)}}},8904:(t,e,s)=>{"use strict";s.d(e,{II:()=>h,v_:()=>c,wm:()=>l});var n=s(9658),r=s(6035),o=s(4658),i=s(4880);function a(t){return Math.min(1e3*2**t,3e4)}function c(t){return"online"!==(t??"online")||r.t.isOnline()}var u=class extends Error{constructor(t){super("CancelledError"),this.revert=t?.revert,this.silent=t?.silent}};function l(t){return t instanceof u}function h(t){let e,s=!1,l=0,h=!1;const d=(0,o.T)(),p=()=>n.m.isFocused()&&("always"===t.networkMode||r.t.isOnline())&&t.canRun(),f=()=>c(t.networkMode)&&t.canRun(),m=s=>{h||(h=!0,t.onSuccess?.(s),e?.(),d.resolve(s))},v=s=>{h||(h=!0,t.onError?.(s),e?.(),d.reject(s))},y=()=>new Promise((s=>{e=t=>{(h||p())&&s(t)},t.onPause?.()})).then((()=>{e=void 0,h||t.onContinue?.()})),g=()=>{if(h)return;let e;const n=0===l?t.initialPromise:void 0;try{e=n??t.fn()}catch(t){e=Promise.reject(t)}Promise.resolve(e).then(m).catch((e=>{if(h)return;const n=t.retry??(i.S$?0:3),r=t.retryDelay??a,o="function"==typeof r?r(l,e):r,c=!0===n||"number"==typeof n&&l<n||"function"==typeof n&&n(l,e);!s&&c?(l++,t.onFail?.(l,e),(0,i.yy)(o).then((()=>p()?void 0:y())).then((()=>{s?v(e):g()}))):v(e)}))};return{promise:d,cancel:e=>{h||(v(new u(e)),t.abort?.())},continue:()=>(e?.(),d),cancelRetry:()=>{s=!0},continueRetry:()=>{s=!1},canStart:f,start:()=>(f()?g():y().then(g),d)}}},6500:(t,e,s)=>{"use strict";s.d(e,{Q:()=>n});var n=class{constructor(){this.listeners=new Set,this.subscribe=this.subscribe.bind(this)}subscribe(t){return this.listeners.add(t),this.onSubscribe(),()=>{this.listeners.delete(t),this.onUnsubscribe()}}hasListeners(){return this.listeners.size>0}onSubscribe(){}onUnsubscribe(){}}},4658:(t,e,s)=>{"use strict";function n(){let t,e;const s=new Promise(((s,n)=>{t=s,e=n}));function n(t){Object.assign(s,t),delete s.resolve,delete s.reject}return s.status="pending",s.catch((()=>{})),s.resolve=e=>{n({status:"fulfilled",value:e}),t(e)},s.reject=t=>{n({status:"rejected",reason:t}),e(t)},s}s.d(e,{T:()=>n})},4880:(t,e,s)=>{"use strict";s.d(e,{Cp:()=>f,EN:()=>p,Eh:()=>u,F$:()=>d,MK:()=>l,S$:()=>n,ZM:()=>P,ZZ:()=>R,Zw:()=>o,d2:()=>c,f8:()=>v,gn:()=>i,hT:()=>_,j3:()=>a,lQ:()=>r,nJ:()=>h,pl:()=>w,y9:()=>C,yy:()=>S});var n="undefined"==typeof window||"Deno"in globalThis;function r(){}function o(t,e){return"function"==typeof t?t(e):t}function i(t){return"number"==typeof t&&t>=0&&t!==1/0}function a(t,e){return Math.max(t+(e||0)-Date.now(),0)}function c(t,e){return"function"==typeof t?t(e):t}function u(t,e){return"function"==typeof t?t(e):t}function l(t,e){const{type:s="all",exact:n,fetchStatus:r,predicate:o,queryKey:i,stale:a}=t;if(i)if(n){if(e.queryHash!==d(i,e.options))return!1}else if(!f(e.queryKey,i))return!1;if("all"!==s){const t=e.isActive();if("active"===s&&!t)return!1;if("inactive"===s&&t)return!1}return!("boolean"==typeof a&&e.isStale()!==a||r&&r!==e.state.fetchStatus||o&&!o(e))}function h(t,e){const{exact:s,status:n,predicate:r,mutationKey:o}=t;if(o){if(!e.options.mutationKey)return!1;if(s){if(p(e.options.mutationKey)!==p(o))return!1}else if(!f(e.options.mutationKey,o))return!1}return!(n&&e.state.status!==n||r&&!r(e))}function d(t,e){return(e?.queryKeyHashFn||p)(t)}function p(t){return JSON.stringify(t,((t,e)=>g(e)?Object.keys(e).sort().reduce(((t,s)=>(t[s]=e[s],t)),{}):e))}function f(t,e){return t===e||typeof t==typeof e&&!(!t||!e||"object"!=typeof t||"object"!=typeof e)&&!Object.keys(e).some((s=>!f(t[s],e[s])))}function m(t,e){if(t===e)return t;const s=y(t)&&y(e);if(s||g(t)&&g(e)){const n=s?t:Object.keys(t),r=n.length,o=s?e:Object.keys(e),i=o.length,a=s?[]:{};let c=0;for(let r=0;r<i;r++){const i=s?r:o[r];(!s&&n.includes(i)||s)&&void 0===t[i]&&void 0===e[i]?(a[i]=void 0,c++):(a[i]=m(t[i],e[i]),a[i]===t[i]&&void 0!==t[i]&&c++)}return r===i&&c===r?t:a}return e}function v(t,e){if(!e||Object.keys(t).length!==Object.keys(e).length)return!1;for(const s in t)if(t[s]!==e[s])return!1;return!0}function y(t){return Array.isArray(t)&&t.length===Object.keys(t).length}function g(t){if(!b(t))return!1;const e=t.constructor;if(void 0===e)return!0;const s=e.prototype;return!!b(s)&&!!s.hasOwnProperty("isPrototypeOf")&&Object.getPrototypeOf(t)===Object.prototype}function b(t){return"[object Object]"===Object.prototype.toString.call(t)}function S(t){return new Promise((e=>{setTimeout(e,t)}))}function w(t,e,s){return"function"==typeof s.structuralSharing?s.structuralSharing(t,e):!1!==s.structuralSharing?m(t,e):e}function C(t,e,s=0){const n=[...t,e];return s&&n.length>s?n.slice(1):n}function R(t,e,s=0){const n=[e,...t];return s&&n.length>s?n.slice(0,-1):n}var _=Symbol();function P(t,e){return!t.queryFn&&e?.initialPromise?()=>e.initialPromise:t.queryFn&&t.queryFn!==_?t.queryFn:()=>Promise.reject(new Error(`Missing queryFn: '${t.queryHash}'`))}},7665:(t,e,s)=>{"use strict";s.d(e,{Ht:()=>a,jE:()=>i});var n=s(1609),r=s(790),o=n.createContext(void 0),i=t=>{const e=n.useContext(o);if(t)return t;if(!e)throw new Error("No QueryClient set, use QueryClientProvider to set one");return e},a=({client:t,children:e})=>(n.useEffect((()=>(t.mount(),()=>{t.unmount()})),[t]),(0,r.jsx)(o.Provider,{value:t,children:e}))},2927:(t,e,s)=>{"use strict";s.d(e,{A:()=>a,g:()=>o});var n=s(790),r=s(1609);function o(t){const e=t.errorComponent??a;return(0,n.jsx)(i,{getResetKey:t.getResetKey,onCatch:t.onCatch,children:({error:s,reset:n})=>s?r.createElement(e,{error:s,reset:n}):t.children})}class i extends r.Component{constructor(){super(...arguments),this.state={error:null}}static getDerivedStateFromProps(t){return{resetKey:t.getResetKey()}}static getDerivedStateFromError(t){return{error:t}}reset(){this.setState({error:null})}componentDidUpdate(t,e){e.error&&e.resetKey!==this.state.resetKey&&this.reset()}componentDidCatch(t,e){this.props.onCatch&&this.props.onCatch(t,e)}render(){return this.props.children({error:this.state.resetKey!==this.props.getResetKey()?null:this.state.error,reset:()=>{this.reset()}})}}function a({error:t}){const[e,s]=r.useState(!1);return(0,n.jsxs)("div",{style:{padding:".5rem",maxWidth:"100%"},children:[(0,n.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:".5rem"},children:[(0,n.jsx)("strong",{style:{fontSize:"1rem"},children:"Something went wrong!"}),(0,n.jsx)("button",{style:{appearance:"none",fontSize:".6em",border:"1px solid currentColor",padding:".1rem .2rem",fontWeight:"bold",borderRadius:".25rem"},onClick:()=>s((t=>!t)),children:e?"Hide Error":"Show Error"})]}),(0,n.jsx)("div",{style:{height:".25rem"}}),e?(0,n.jsx)("div",{children:(0,n.jsx)("pre",{style:{fontSize:".7em",border:"1px solid red",borderRadius:".25rem",padding:".3rem",color:"red",overflow:"auto"},children:t.message?(0,n.jsx)("code",{children:t.message}):null})}):null]})}},1245:(t,e,s)=>{"use strict";s.d(e,{YG:()=>b,sv:()=>C});var n=s(790),r=s(1609),o=s(1561),i=s(7573),a=s(7264),c=s(37),u=s(9239),l=s(2927),h=s(8332),d=s(396),p=s(6946),f=s(1459),m=s(6712),v=s(8541);function y(t,e,s){return e.options.notFoundComponent?(0,n.jsx)(e.options.notFoundComponent,{data:s}):t.options.defaultNotFoundComponent?(0,n.jsx)(t.options.defaultNotFoundComponent,{data:s}):(0,n.jsx)(p.A2,{})}var g=s(1259);const b=r.memo((function({matchId:t}){var e,s;const c=(0,d.r)(),u=(0,h.k)({select:e=>{var s;return null==(s=e.matches.find((e=>e.id===t)))?void 0:s.routeId}});(0,o.A)(u,`Could not find routeId for matchId "${t}". Please file an issue!`);const f=c.routesById[u],y=f.options.pendingComponent??c.options.defaultPendingComponent,b=y?(0,n.jsx)(y,{}):null,C=f.options.errorComponent??c.options.defaultErrorComponent,R=f.options.onCatch??c.options.defaultOnCatch,_=f.isRoot?f.options.notFoundComponent??(null==(e=c.options.notFoundRoute)?void 0:e.options.component):f.options.notFoundComponent,P=f.isRoot&&!f.options.wrapInSuspense||!(f.options.wrapInSuspense??y??(null==(s=f.options.errorComponent)?void 0:s.preload))?v._:r.Suspense,x=C?l.g:v._,O=_?p.PA:v._,E=(0,h.k)({select:t=>t.loadedAt}),k=(0,h.k)({select:e=>{var s;const n=e.matches.findIndex((e=>e.id===t));return null==(s=e.matches[n-1])?void 0:s.routeId}});return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(m.$.Provider,{value:t,children:(0,n.jsx)(P,{fallback:b,children:(0,n.jsx)(x,{getResetKey:()=>E,errorComponent:C||l.A,onCatch:(e,s)=>{if((0,p.c4)(e))throw e;(0,i.A)(!1,`Error in route match: ${t}`),null==R||R(e,s)},children:(0,n.jsx)(O,{fallback:t=>{if(!_||t.routeId&&t.routeId!==u||!t.routeId&&!f.isRoot)throw t;return r.createElement(_,t)},children:(0,n.jsx)(w,{matchId:t})})})})}),k===a.n?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(S,{}),(0,n.jsx)(g.OA,{})]}):null]})}));function S(){var t;const e=(0,d.r)(),s=r.useRef(void 0);return(0,n.jsx)("script",{suppressHydrationWarning:!0,ref:t=>{t?e.emit({type:"onRendered",...(0,c.C)(e.state)}):s.current=e.state.resolvedLocation}},null==(t=e.state.resolvedLocation)?void 0:t.state.key)}const w=r.memo((function({matchId:t}){var e,s,i;const a=(0,d.r)(),{match:c,key:m,routeId:v}=(0,h.k)({select:e=>{const s=e.matches.findIndex((e=>e.id===t)),n=e.matches[s],r=n.routeId,o=a.routesById[r].options.remountDeps??a.options.defaultRemountDeps,i=null==o?void 0:o({routeId:r,loaderDeps:n.loaderDeps,params:n._strictParams,search:n._strictSearch});return{key:i?JSON.stringify(i):void 0,routeId:r,match:(0,u.Up)(n,["id","status","error"])}},structuralSharing:!0}),g=a.routesById[v],b=r.useMemo((()=>{const t=g.options.component??a.options.defaultComponent;return t?(0,n.jsx)(t,{},m):(0,n.jsx)(C,{})}),[m,g.options.component,a.options.defaultComponent]),S=(g.options.errorComponent??a.options.defaultErrorComponent)||l.A;if("notFound"===c.status)return(0,o.A)((0,p.c4)(c.error),"Expected a notFound error"),y(a,g,c.error);if("redirected"===c.status)throw(0,o.A)((0,f.N6)(c.error),"Expected a redirect error"),null==(e=a.getMatch(c.id))?void 0:e.loadPromise;if("error"===c.status){if(a.isServer)return(0,n.jsx)(S,{error:c.error,reset:void 0,info:{componentStack:""}});throw c.error}if("pending"===c.status){const t=g.options.pendingMinMs??a.options.defaultPendingMinMs;if(t&&!(null==(s=a.getMatch(c.id))?void 0:s.minPendingPromise)&&!a.isServer){const e=(0,u.Su)();Promise.resolve().then((()=>{a.updateMatch(c.id,(t=>({...t,minPendingPromise:e})))})),setTimeout((()=>{e.resolve(),a.updateMatch(c.id,(t=>({...t,minPendingPromise:void 0})))}),t)}throw null==(i=a.getMatch(c.id))?void 0:i.loadPromise}return b})),C=r.memo((function(){const t=(0,d.r)(),e=r.useContext(m.$),s=(0,h.k)({select:t=>{var s;return null==(s=t.matches.find((t=>t.id===e)))?void 0:s.routeId}}),i=t.routesById[s],c=(0,h.k)({select:t=>{const s=t.matches.find((t=>t.id===e));return(0,o.A)(s,`Could not find parent match for matchId "${e}"`),s.globalNotFound}}),u=(0,h.k)({select:t=>{var s;const n=t.matches,r=n.findIndex((t=>t.id===e));return null==(s=n[r+1])?void 0:s.id}});if(c)return y(t,i,void 0);if(!u)return null;const l=(0,n.jsx)(b,{matchId:u}),p=t.options.defaultPendingComponent?(0,n.jsx)(t.options.defaultPendingComponent,{}):null;return e===a.n?(0,n.jsx)(r.Suspense,{fallback:p,children:l}):l}))},8541:(t,e,s)=>{"use strict";s.d(e,{_:()=>r});var n=s(790);function r(t){return(0,n.jsx)(n.Fragment,{children:t.children})}},6037:(t,e,s)=>{"use strict";s.d(e,{WK:()=>h,uV:()=>f});var n=s(7573),r=s(1843),o=s(4396),i=s(584),a=s(5698),c=s(8081),u=s(835),l=s(2166);function h(t){return new d(t,{silent:!0}).createRoute}class d{constructor(t,e){this.path=t,this.createRoute=t=>{(0,n.A)(this.silent,"FileRoute is deprecated and will be removed in the next major version. Use the createFileRoute(path)(options) function instead.");const e=(0,r.un)(t);return e.isRoot=!1,e},this.silent=null==e?void 0:e.silent}}class p{constructor(t){this.useMatch=t=>(0,o.R)({select:null==t?void 0:t.select,from:this.options.id,structuralSharing:null==t?void 0:t.structuralSharing}),this.useRouteContext=t=>(0,o.R)({from:this.options.id,select:e=>(null==t?void 0:t.select)?t.select(e.context):e.context}),this.useSearch=t=>(0,c.S)({select:null==t?void 0:t.select,structuralSharing:null==t?void 0:t.structuralSharing,from:this.options.id}),this.useParams=t=>(0,u.g)({select:null==t?void 0:t.select,structuralSharing:null==t?void 0:t.structuralSharing,from:this.options.id}),this.useLoaderDeps=t=>(0,i.x)({...t,from:this.options.id}),this.useLoaderData=t=>(0,a.L)({...t,from:this.options.id}),this.useNavigate=()=>(0,l.Z)({from:this.options.id}),this.options=t,this.$$typeof=Symbol.for("react.memo")}}function f(t){return e=>new p({id:t,...e})}},6712:(t,e,s)=>{"use strict";s.d(e,{$:()=>r,n:()=>o});var n=s(1609);const r=n.createContext(void 0),o=n.createContext(void 0)},6946:(t,e,s)=>{"use strict";s.d(e,{A2:()=>c,PA:()=>a,c4:()=>i});var n=s(790),r=s(2927),o=s(8332);function i(t){return!!(null==t?void 0:t.isNotFound)}function a(t){const e=(0,o.k)({select:t=>`not-found-${t.location.pathname}-${t.status}`});return(0,n.jsx)(r.g,{getResetKey:()=>e,onCatch:(e,s)=>{var n;if(!i(e))throw e;null==(n=t.onCatch)||n.call(t,e,s)},errorComponent:({error:e})=>{var s;if(i(e))return null==(s=t.fallback)?void 0:s.call(t,e);throw e},children:t.children})}function c(){return(0,n.jsx)("p",{children:"Not Found"})}},1459:(t,e,s)=>{"use strict";function n(t){return!!(null==t?void 0:t.isRedirect)}function r(t){return!!(null==t?void 0:t.isRedirect)&&t.href}s.d(e,{N6:()=>n,PN:()=>r})},1843:(t,e,s)=>{"use strict";s.d(e,{gI:()=>m,l7:()=>v,un:()=>p});var n=s(1561),r=s(7264),o=s(6847),i=s(5698),a=s(584),c=s(835),u=s(8081),l=s(2166),h=s(4396);class d{constructor(t){this.init=t=>{var e,s;this.originalIndex=t.originalIndex;const i=this.options,a=!(null==i?void 0:i.path)&&!(null==i?void 0:i.id);this.parentRoute=null==(s=(e=this.options).getParentRoute)?void 0:s.call(e),a?this._path=r.n:(0,n.A)(this.parentRoute,"Child Route instances must pass a 'getParentRoute: () => ParentRoute' option that returns a Route instance.");let c=a?r.n:i.path;c&&"/"!==c&&(c=(0,o.p1)(c));const u=(null==i?void 0:i.id)||c;let l=a?r.n:(0,o.HS)([this.parentRoute.id===r.n?"":this.parentRoute.id,u]);c===r.n&&(c="/"),l!==r.n&&(l=(0,o.HS)(["/",l]));const h=l===r.n?"/":(0,o.HS)([this.parentRoute.fullPath,c]);this._path=c,this._id=l,this._fullPath=h,this._to=h,this._ssr=(null==i?void 0:i.ssr)??t.defaultSsr??!0},this.updateLoader=t=>(Object.assign(this.options,t),this),this.update=t=>(Object.assign(this.options,t),this),this.lazy=t=>(this.lazyFn=t,this),this.useMatch=t=>(0,h.R)({select:null==t?void 0:t.select,from:this.id,structuralSharing:null==t?void 0:t.structuralSharing}),this.useRouteContext=t=>(0,h.R)({...t,from:this.id,select:e=>(null==t?void 0:t.select)?t.select(e.context):e.context}),this.useSearch=t=>(0,u.S)({select:null==t?void 0:t.select,structuralSharing:null==t?void 0:t.structuralSharing,from:this.id}),this.useParams=t=>(0,c.g)({select:null==t?void 0:t.select,structuralSharing:null==t?void 0:t.structuralSharing,from:this.id}),this.useLoaderDeps=t=>(0,a.x)({...t,from:this.id}),this.useLoaderData=t=>(0,i.L)({...t,from:this.id}),this.useNavigate=()=>(0,l.Z)({from:this.id}),this.options=t||{},this.isRoot=!(null==t?void 0:t.getParentRoute),(0,n.A)(!((null==t?void 0:t.id)&&(null==t?void 0:t.path)),"Route cannot have both an 'id' and a 'path' option."),this.$$typeof=Symbol.for("react.memo")}get to(){return this._to}get id(){return this._id}get path(){return this._path}get fullPath(){return this._fullPath}get ssr(){return this._ssr}addChildren(t){return this._addFileChildren(t)}_addFileChildren(t){return Array.isArray(t)&&(this.children=t),"object"==typeof t&&null!==t&&(this.children=Object.values(t)),this}}function p(t){return new d(t)}class f extends d{constructor(t){super(t)}addChildren(t){return super.addChildren(t),this}_addFileChildren(t){return super._addFileChildren(t),this}_addFileTypes(){return this}}function m(t){return new f(t)}class v extends d{constructor(t){super({...t,id:"404"})}}},414:(t,e,s)=>{"use strict";s.d(e,{H:()=>r});const n=s(1609).createContext(null);function r(){return"undefined"==typeof document?n:window.__TSR_ROUTER_CONTEXT__?window.__TSR_ROUTER_CONTEXT__:(window.__TSR_ROUTER_CONTEXT__=n,n)}},1259:(t,e,s)=>{"use strict";s.d(e,{OA:()=>m,j1:()=>f});var n=s(790),r=s(9239),o=s(396);function i({children:t,log:e}){return"undefined"!=typeof document?null:(0,n.jsx)("script",{className:"tsr-once",dangerouslySetInnerHTML:{__html:[t,"",'if (typeof __TSR_SSR__ !== "undefined") __TSR_SSR__.cleanScripts()'].filter(Boolean).join("\n")}})}s(7159);const a="tsr-scroll-restoration-v1_3",c="undefined"!=typeof window&&window.sessionStorage,u=(t,e)=>{let s;return(...n)=>{s||(s=setTimeout((()=>{t(...n),s=null}),e))}},l=c?{state:JSON.parse(window.sessionStorage.getItem(a)||"null")||{},set:t=>(l.state=(0,r.Zw)(t,l.state)||l.state,window.sessionStorage.setItem(a,JSON.stringify(l.state)))}:void 0,h=t=>t.state.key||t.href;let d=!1;function p(t,e,s,n){var r;let o;try{o=JSON.parse(sessionStorage.getItem(t)||"{}")}catch(t){return void console.error(t)}const i=o[e||(null==(r=window.history.state)?void 0:r.key)];d=!0,(()=>{if(n&&i){for(const t in i){const e=i[t];if("window"===t)window.scrollTo({top:e.scrollY,left:e.scrollX,behavior:s});else if(t){const s=document.querySelector(t);s&&(s.scrollLeft=e.scrollX,s.scrollTop=e.scrollY)}}return}const t=window.location.hash.split("#")[1];if(t){const e=(window.history.state||{}).__hashScrollIntoViewOptions??!0;if(e){const s=document.getElementById(t);s&&s.scrollIntoView(e)}}else window.scrollTo({top:0,left:0,behavior:s})})(),d=!1}function f(t,e){if((e??t.options.scrollRestoration??!1)&&(t.isScrollRestoring=!0),"undefined"==typeof document||t.isScrollRestorationSetup)return;t.isScrollRestorationSetup=!0,d=!1;const s=t.options.getScrollRestorationKey||h;window.history.scrollRestoration="manual";"undefined"!=typeof document&&document.addEventListener("scroll",u((e=>{if(d||!t.isScrollRestoring)return;let n="";if(e.target===document||e.target===window)n="window";else{const t=e.target.getAttribute("data-scroll-restoration-id");n=t?`[data-scroll-restoration-id="${t}"]`:function(t){const e=[];let s;for(;s=t.parentNode;)e.unshift(`${t.tagName}:nth-child(${[].indexOf.call(s.children,t)+1})`),t=s;return`${e.join(" > ")}`.toLowerCase()}(e.target)}const r=s(t.state.location);l.set((t=>{const e=t[r]=t[r]||{},s=e[n]=e[n]||{};if("window"===n)s.scrollX=window.scrollX||0,s.scrollY=window.scrollY||0;else if(n){const t=document.querySelector(n);t&&(s.scrollX=t.scrollLeft||0,s.scrollY=t.scrollTop||0)}return t}))}),100),!0),t.subscribe("onRendered",(e=>{const n=s(e.toLocation);t.resetNextScroll?(p(a,n,t.options.scrollRestorationBehavior,t.isScrollRestoring),t.isScrollRestoring&&l.set((t=>(t[n]=t[n]||{},t)))):t.resetNextScroll=!0}))}function m(){const t=(0,o.r)(),e=(t.options.getScrollRestorationKey||h)(t.latestLocation),s=e!==h(t.latestLocation)?e:null;return t.isScrollRestoring&&t.isServer?(0,n.jsx)(i,{children:`(${p.toString()})(${JSON.stringify(a)},${JSON.stringify(s)}, undefined, true)`,log:!1}):null}},5698:(t,e,s)=>{"use strict";s.d(e,{L:()=>r});var n=s(4396);function r(t){return(0,n.R)({from:t.from,strict:t.strict,structuralSharing:t.structuralSharing,select:e=>t.select?t.select(e.loaderData):e.loaderData})}},584:(t,e,s)=>{"use strict";s.d(e,{x:()=>r});var n=s(4396);function r(t){const{select:e,...s}=t;return(0,n.R)({...s,select:t=>e?e(t.loaderDeps):t.loaderDeps})}},4396:(t,e,s)=>{"use strict";s.d(e,{R:()=>a});var n=s(1609),r=s(1561),o=s(8332),i=s(6712);function a(t){const e=n.useContext(t.from?i.n:i.$);return(0,o.k)({select:s=>{const n=s.matches.find((s=>t.from?t.from===s.routeId:s.id===e));if((0,r.A)(!((t.shouldThrow??1)&&!n),"Could not find "+(t.from?`an active match from "${t.from}"`:"a nearest match!")),void 0!==n)return t.select?t.select(n):n},structuralSharing:t.structuralSharing})}},2166:(t,e,s)=>{"use strict";s.d(e,{Z:()=>o});var n=s(1609),r=s(396);function o(t){const{navigate:e}=(0,r.r)();return n.useCallback((t=>e({...t})),[e])}},835:(t,e,s)=>{"use strict";s.d(e,{g:()=>r});var n=s(4396);function r(t){return(0,n.R)({from:t.from,strict:t.strict,structuralSharing:t.structuralSharing,select:e=>t.select?t.select(e.params):e.params})}},396:(t,e,s)=>{"use strict";s.d(e,{r:()=>i});var n=s(1609),r=s(7573),o=s(414);function i(t){const e=n.useContext((0,o.H)());return(0,r.A)(!(((null==t?void 0:t.warn)??1)&&!e),"useRouter must be used inside a <RouterProvider> component!"),e}},8332:(t,e,s)=>{"use strict";s.d(e,{k:()=>c});var n=s(9242);function r(t,e){if(Object.is(t,e))return!0;if("object"!=typeof t||null===t||"object"!=typeof e||null===e)return!1;if(t instanceof Map&&e instanceof Map){if(t.size!==e.size)return!1;for(const[s,n]of t)if(!e.has(s)||!Object.is(n,e.get(s)))return!1;return!0}if(t instanceof Set&&e instanceof Set){if(t.size!==e.size)return!1;for(const s of t)if(!e.has(s))return!1;return!0}const s=Object.keys(t);if(s.length!==Object.keys(e).length)return!1;for(let n=0;n<s.length;n++)if(!Object.prototype.hasOwnProperty.call(e,s[n])||!Object.is(t[s[n]],e[s[n]]))return!1;return!0}var o=s(1609),i=s(9239),a=s(396);function c(t){const e=(0,a.r)({warn:void 0===(null==t?void 0:t.router)}),s=(null==t?void 0:t.router)||e,c=(0,o.useRef)(void 0);return function(t,e=t=>t){return(0,n.useSyncExternalStoreWithSelector)(t.subscribe,(()=>t.state),(()=>t.state),e,r)}(s.__store,(e=>{if(null==t?void 0:t.select){if(t.structuralSharing??s.options.defaultStructuralSharing){const s=(0,i.BH)(c.current,t.select(e));return c.current=s,s}return t.select(e)}return e}))}},8081:(t,e,s)=>{"use strict";s.d(e,{S:()=>r});var n=s(4396);function r(t){return(0,n.R)({from:t.from,strict:t.strict,structuralSharing:t.structuralSharing,select:e=>t.select?t.select(e.search):e.search})}},3655:(t,e,s)=>{"use strict";s.d(e,{BL:()=>i,N:()=>a,Nf:()=>r,ZC:()=>o});var n=s(1609);const r="undefined"!=typeof window?n.useLayoutEffect:n.useEffect;function o(t){const e=n.useRef({value:t,prev:null}),s=e.current.value;return t!==s&&(e.current={value:t,prev:s}),e.current.prev}function i(t,e,s={},r={}){const o=n.useRef("function"==typeof IntersectionObserver),i=n.useRef(null);return n.useEffect((()=>{if(t.current&&o.current&&!r.disabled)return i.current=new IntersectionObserver((([t])=>{e(t)}),s),i.current.observe(t.current),()=>{var t;null==(t=i.current)||t.disconnect()}}),[e,s,r.disabled,t]),i.current}function a(t){const e=n.useRef(null);return n.useEffect((()=>{t&&("function"==typeof t?t(e.current):t.current=e.current)})),e}},6847:(t,e,s)=>{"use strict";s.d(e,{HS:()=>r,UC:()=>u,WN:()=>f,cg:()=>c,gx:()=>a,kX:()=>d,l$:()=>l,o1:()=>h,p1:()=>i,ts:()=>o,xv:()=>p});var n=s(9239);function r(t){return o(t.filter((t=>void 0!==t)).join("/"))}function o(t){return t.replace(/\/{2,}/g,"/")}function i(t){return"/"===t?t:t.replace(/^\/{1,}/,"")}function a(t){return"/"===t?t:t.replace(/\/{1,}$/,"")}function c(t){return a(i(t))}function u(t,e){return t.endsWith("/")&&"/"!==t&&t!==`${e}/`?t.slice(0,-1):t}function l(t,e,s){return u(t,s)===u(e,s)}function h({basepath:t,base:e,to:s,trailingSlash:i="never",caseSensitive:a}){var c,u;e=m(t,e,a),s=m(t,s,a);let l=d(e);const h=d(s);return l.length>1&&"/"===(null==(c=(0,n.HV)(l))?void 0:c.value)&&l.pop(),h.forEach(((t,e)=>{"/"===t.value?e?e===h.length-1&&l.push(t):l=[t]:".."===t.value?l.pop():"."===t.value||l.push(t)})),l.length>1&&("/"===(null==(u=(0,n.HV)(l))?void 0:u.value)?"never"===i&&l.pop():"always"===i&&l.push({type:"pathname",value:"/"})),o(r([t,...l.map((t=>t.value))]))}function d(t){if(!t)return[];const e=[];if("/"===(t=o(t)).slice(0,1)&&(t=t.substring(1),e.push({type:"pathname",value:"/"})),!t)return e;const s=t.split("/").filter(Boolean);return e.push(...s.map((t=>"$"===t||"*"===t?{type:"wildcard",value:t}:"$"===t.charAt(0)?{type:"param",value:t}:{type:"pathname",value:decodeURI(t)}))),"/"===t.slice(-1)&&(t=t.substring(1),e.push({type:"pathname",value:"/"})),e}function p({path:t,params:e,leaveWildcards:s,leaveParams:n,decodeCharMap:o}){const i=d(t);function a(t){const s=e[t],n="string"==typeof s;return["*","_splat"].includes(t)?n?encodeURI(s):s:n?function(t,e){let s=encodeURIComponent(t);if(e)for(const[t,n]of e)s=s.replaceAll(t,n);return s}(s,o):s}const c={},u=r(i.map((t=>{if("wildcard"===t.type){c._splat=e._splat;const n=a("_splat");return s?`${t.value}${n??""}`:n}if("param"===t.type){const s=t.value.substring(1);if(c[s]=e[s],n){const e=a(t.value);return`${t.value}${e??""}`}return a(s)??"undefined"}return t.value})));return{usedParams:c,interpolatedPath:u}}function f(t,e,s){const n=function(t,e,s){if("/"!==t&&!e.startsWith(t))return;e=m(t,e,s.caseSensitive);const n=m(t,`${s.to??"$"}`,s.caseSensitive),o=d(e),i=d(n);e.startsWith("/")||o.unshift({type:"pathname",value:"/"}),n.startsWith("/")||i.unshift({type:"pathname",value:"/"});const a={};return(()=>{for(let t=0;t<Math.max(o.length,i.length);t++){const e=o[t],n=i[t],c=t>=o.length-1,u=t>=i.length-1;if(n){if("wildcard"===n.type){const e=decodeURI(r(o.slice(t).map((t=>t.value))));return a["*"]=e,a._splat=e,!0}if("pathname"===n.type){if("/"===n.value&&!(null==e?void 0:e.value))return!0;if(e)if(s.caseSensitive){if(n.value!==e.value)return!1}else if(n.value.toLowerCase()!==e.value.toLowerCase())return!1}if(!e)return!1;if("param"===n.type){if("/"===e.value)return!1;"$"!==e.value.charAt(0)&&(a[n.value.substring(1)]=decodeURIComponent(e.value))}}if(!c&&u)return a["**"]=r(o.slice(t+1).map((t=>t.value))),!!s.fuzzy&&"/"!==(null==n?void 0:n.value)}return!0})()?a:void 0}(t,e,s);if(!s.to||n)return n??{}}function m(t,e,s=!1){const n=s?t:t.toLowerCase(),r=s?e:e.toLowerCase();switch(!0){case"/"===n:return e;case r===n:return"";case e.length<t.length:case"/"!==r[n.length]:return e;case r.startsWith(n):return e.slice(t.length);default:return e}}},7264:(t,e,s)=>{"use strict";s.d(e,{n:()=>n});const n="__root__"},37:(t,e,s)=>{"use strict";function n(t){const e=t.resolvedLocation,s=t.location;return{fromLocation:e,toLocation:s,pathChanged:(null==e?void 0:e.pathname)!==s.pathname,hrefChanged:(null==e?void 0:e.href)!==s.href,hashChanged:(null==e?void 0:e.hash)!==s.hash}}s.d(e,{C:()=>n})},9239:(t,e,s)=>{"use strict";function n(t){return t[t.length-1]}function r(t,e){return"function"==typeof t?t(e):t}function o(t,e){return e.reduce(((e,s)=>(e[s]=t[s],e)),{})}function i(t,e){if(t===e)return t;const s=e,n=u(t)&&u(s);if(n||a(t)&&a(s)){const e=n?t:Object.keys(t),r=e.length,o=n?s:Object.keys(s),a=o.length,c=n?[]:{};let u=0;for(let r=0;r<a;r++){const a=n?r:o[r];(!n&&e.includes(a)||n)&&void 0===t[a]&&void 0===s[a]?(c[a]=void 0,u++):(c[a]=i(t[a],s[a]),c[a]===t[a]&&void 0!==t[a]&&u++)}return r===a&&u===r?t:c}return s}function a(t){if(!c(t))return!1;const e=t.constructor;if(void 0===e)return!0;const s=e.prototype;return!!c(s)&&!!s.hasOwnProperty("isPrototypeOf")}function c(t){return"[object Object]"===Object.prototype.toString.call(t)}function u(t){return Array.isArray(t)&&t.length===Object.keys(t).length}function l(t,e){let s=Object.keys(t);return e&&(s=s.filter((e=>void 0!==t[e]))),s}function h(t,e,s){if(t===e)return!0;if(typeof t!=typeof e)return!1;if(a(t)&&a(e)){const n=(null==s?void 0:s.ignoreUndefined)??!0,r=l(t,n),o=l(e,n);return!(!(null==s?void 0:s.partial)&&r.length!==o.length)&&o.every((n=>h(t[n],e[n],s)))}return!(!Array.isArray(t)||!Array.isArray(e)||t.length!==e.length||t.some(((t,n)=>!h(t,e[n],s))))}function d(t){let e,s;const n=new Promise(((t,n)=>{e=t,s=n}));return n.status="pending",n.resolve=s=>{n.status="resolved",n.value=s,e(s),null==t||t(s)},n.reject=t=>{n.status="rejected",s(t)},n}s.d(e,{BH:()=>i,HV:()=>n,Su:()=>d,Up:()=>o,Zw:()=>r,bD:()=>h})},1561:(t,e,s)=>{"use strict";s.d(e,{A:()=>o});var n=!0,r="Invariant failed";function o(t,e){if(!t){if(n)throw new Error(r);var s="function"==typeof e?e():e,o=s?"".concat(r,": ").concat(s):r;throw new Error(o)}}}},o={};function i(t){var e=o[t];if(void 0!==e)return e.exports;var s=o[t]={id:t,loaded:!1,exports:{}};return r[t](s,s.exports,i),s.loaded=!0,s.exports}i.m=r,i.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return i.d(e,{a:e}),e},e=Object.getPrototypeOf?t=>Object.getPrototypeOf(t):t=>t.__proto__,i.t=function(s,n){if(1&n&&(s=this(s)),8&n)return s;if("object"==typeof s&&s){if(4&n&&s.__esModule)return s;if(16&n&&"function"==typeof s.then)return s}var r=Object.create(null);i.r(r);var o={};t=t||[null,e({}),e([]),e(e)];for(var a=2&n&&s;"object"==typeof a&&!~t.indexOf(a);a=e(a))Object.getOwnPropertyNames(a).forEach((t=>o[t]=()=>s[t]));return o.default=()=>s,i.d(r,o),r},i.d=(t,e)=>{for(var s in e)i.o(e,s)&&!i.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},i.f={},i.e=t=>Promise.all(Object.keys(i.f).reduce(((e,s)=>(i.f[s](t,e),e)),[])),i.u=t=>t+".js",i.miniCssF=t=>{},i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),i.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),s={},n="simplybook_app:",i.l=(t,e,r,o)=>{if(s[t])s[t].push(e);else{var a,c;if(void 0!==r)for(var u=document.getElementsByTagName("script"),l=0;l<u.length;l++){var h=u[l];if(h.getAttribute("src")==t||h.getAttribute("data-webpack")==n+r){a=h;break}}a||(c=!0,(a=document.createElement("script")).charset="utf-8",a.timeout=120,i.nc&&a.setAttribute("nonce",i.nc),a.setAttribute("data-webpack",n+r),a.src=t),s[t]=[e];var d=(e,n)=>{a.onerror=a.onload=null,clearTimeout(p);var r=s[t];if(delete s[t],a.parentNode&&a.parentNode.removeChild(a),r&&r.forEach((t=>t(n))),e)return e(n)},p=setTimeout(d.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=d.bind(null,a.onerror),a.onload=d.bind(null,a.onload),c&&document.head.appendChild(a)}},i.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.nmd=t=>(t.paths=[],t.children||(t.children=[]),t),(()=>{var t;i.g.importScripts&&(t=i.g.location+"");var e=i.g.document;if(!t&&e&&(e.currentScript&&"SCRIPT"===e.currentScript.tagName.toUpperCase()&&(t=e.currentScript.src),!t)){var s=e.getElementsByTagName("script");if(s.length)for(var n=s.length-1;n>-1&&(!t||!/^http(s?):/.test(t));)t=s[n--].src}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),i.p=t})(),(()=>{var t={57:0};i.f.j=(e,s)=>{var n=i.o(t,e)?t[e]:void 0;if(0!==n)if(n)s.push(n[2]);else{var r=new Promise(((s,r)=>n=t[e]=[s,r]));s.push(n[2]=r);var o=i.p+i.u(e),a=new Error;i.l(o,(s=>{if(i.o(t,e)&&(0!==(n=t[e])&&(t[e]=void 0),n)){var r=s&&("load"===s.type?"missing":s.type),o=s&&s.target&&s.target.src;a.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",a.name="ChunkLoadError",a.type=r,a.request=o,n[1](a)}}),"chunk-"+e,e)}};var e=(e,s)=>{var n,r,[o,a,c]=s,u=0;if(o.some((e=>0!==t[e]))){for(n in a)i.o(a,n)&&(i.m[n]=a[n]);c&&c(i)}for(e&&e(s);u<o.length;u++)r=o[u],i.o(t,r)&&t[r]&&t[r][0](),t[r]=0},s=globalThis.webpackChunksimplybook_app=globalThis.webpackChunksimplybook_app||[];s.forEach(e.bind(null,0)),s.push=e.bind(null,s.push.bind(s))})(),i.nc=void 0,(()=>{"use strict";var t=i(6087),e=i(4880),s=i(9757),n=i(6261),r=i(6500),o=class extends r.Q{constructor(t={}){super(),this.config=t,this.#m=new Map}#m;build(t,n,r){const o=n.queryKey,i=n.queryHash??(0,e.F$)(o,n);let a=this.get(i);return a||(a=new s.X({client:t,queryKey:o,queryHash:i,options:t.defaultQueryOptions(n),state:r,defaultOptions:t.getQueryDefaults(o)}),this.add(a)),a}add(t){this.#m.has(t.queryHash)||(this.#m.set(t.queryHash,t),this.notify({type:"added",query:t}))}remove(t){const e=this.#m.get(t.queryHash);e&&(t.destroy(),e===t&&this.#m.delete(t.queryHash),this.notify({type:"removed",query:t}))}clear(){n.j.batch((()=>{this.getAll().forEach((t=>{this.remove(t)}))}))}get(t){return this.#m.get(t)}getAll(){return[...this.#m.values()]}find(t){const s={exact:!0,...t};return this.getAll().find((t=>(0,e.MK)(s,t)))}findAll(t={}){const s=this.getAll();return Object.keys(t).length>0?s.filter((s=>(0,e.MK)(t,s))):s}notify(t){n.j.batch((()=>{this.listeners.forEach((e=>{e(t)}))}))}onFocus(){n.j.batch((()=>{this.getAll().forEach((t=>{t.onFocus()}))}))}onOnline(){n.j.batch((()=>{this.getAll().forEach((t=>{t.onOnline()}))}))}},a=i(6158),c=class extends r.Q{constructor(t={}){super(),this.config=t,this.#v=new Set,this.#y=new Map,this.#g=0}#v;#y;#g;build(t,e,s){const n=new a.s({mutationCache:this,mutationId:++this.#g,options:t.defaultMutationOptions(e),state:s});return this.add(n),n}add(t){this.#v.add(t);const e=u(t);if("string"==typeof e){const s=this.#y.get(e);s?s.push(t):this.#y.set(e,[t])}this.notify({type:"added",mutation:t})}remove(t){if(this.#v.delete(t)){const e=u(t);if("string"==typeof e){const s=this.#y.get(e);if(s)if(s.length>1){const e=s.indexOf(t);-1!==e&&s.splice(e,1)}else s[0]===t&&this.#y.delete(e)}}this.notify({type:"removed",mutation:t})}canRun(t){const e=u(t);if("string"==typeof e){const s=this.#y.get(e),n=s?.find((t=>"pending"===t.state.status));return!n||n===t}return!0}runNext(t){const e=u(t);if("string"==typeof e){const s=this.#y.get(e)?.find((e=>e!==t&&e.state.isPaused));return s?.continue()??Promise.resolve()}return Promise.resolve()}clear(){n.j.batch((()=>{this.#v.forEach((t=>{this.notify({type:"removed",mutation:t})})),this.#v.clear(),this.#y.clear()}))}getAll(){return Array.from(this.#v)}find(t){const s={exact:!0,...t};return this.getAll().find((t=>(0,e.nJ)(s,t)))}findAll(t={}){return this.getAll().filter((s=>(0,e.nJ)(t,s)))}notify(t){n.j.batch((()=>{this.listeners.forEach((e=>{e(t)}))}))}resumePausedMutations(){const t=this.getAll().filter((t=>t.state.isPaused));return n.j.batch((()=>Promise.all(t.map((t=>t.continue().catch(e.lQ))))))}};function u(t){return t.options.scope?.id}var l=i(9658),h=i(6035);function d(t){return{onFetch:(s,n)=>{const r=s.options,o=s.fetchOptions?.meta?.fetchMore?.direction,i=s.state.data?.pages||[],a=s.state.data?.pageParams||[];let c={pages:[],pageParams:[]},u=0;const l=async()=>{let n=!1;const l=(0,e.ZM)(s.options,s.fetchOptions),h=async(t,r,o)=>{if(n)return Promise.reject();if(null==r&&t.pages.length)return Promise.resolve(t);const i={client:s.client,queryKey:s.queryKey,pageParam:r,direction:o?"backward":"forward",meta:s.options.meta};var a;a=i,Object.defineProperty(a,"signal",{enumerable:!0,get:()=>(s.signal.aborted?n=!0:s.signal.addEventListener("abort",(()=>{n=!0})),s.signal)});const c=await l(i),{maxPages:u}=s.options,h=o?e.ZZ:e.y9;return{pages:h(t.pages,c,u),pageParams:h(t.pageParams,r,u)}};if(o&&i.length){const t="backward"===o,e={pages:i,pageParams:a},s=(t?f:p)(r,e);c=await h(e,s,t)}else{const e=t??i.length;do{const t=0===u?a[0]??r.initialPageParam:p(r,c);if(u>0&&null==t)break;c=await h(c,t),u++}while(u<e)}return c};s.options.persister?s.fetchFn=()=>s.options.persister?.(l,{client:s.client,queryKey:s.queryKey,meta:s.options.meta,signal:s.signal},n):s.fetchFn=l}}}function p(t,{pages:e,pageParams:s}){const n=e.length-1;return e.length>0?t.getNextPageParam(e[n],e,s[n],s):void 0}function f(t,{pages:e,pageParams:s}){return e.length>0?t.getPreviousPageParam?.(e[0],e,s[0],s):void 0}var m=i(7665);const v="__TSR_index",y="popstate",g="beforeunload";function b(t){let e=t.getLocation();const s=new Set,n=n=>{e=t.getLocation(),s.forEach((t=>t({location:e,action:n})))},r=s=>{t.notifyOnIndexChange??1?n(s):e=t.getLocation()},o=async({task:s,navigateOpts:n,...r})=>{var o,i;if(null==n?void 0:n.ignoreBlocker)return void s();const a=(null==(o=t.getBlockers)?void 0:o.call(t))??[],c="PUSH"===r.type||"REPLACE"===r.type;if("undefined"!=typeof document&&a.length&&c)for(const s of a){const n=C(r.path,r.state);if(await s.blockerFn({currentLocation:e,nextLocation:n,action:r.type}))return void(null==(i=t.onBlocked)||i.call(t))}s()};return{get location(){return e},get length(){return t.getLength()},subscribers:s,subscribe:t=>(s.add(t),()=>{s.delete(t)}),push:(s,r,i)=>{const a=e.state[v];r=S(a+1,r),o({task:()=>{t.pushState(s,r),n({type:"PUSH"})},navigateOpts:i,type:"PUSH",path:s,state:r})},replace:(s,r,i)=>{const a=e.state[v];r=S(a,r),o({task:()=>{t.replaceState(s,r),n({type:"REPLACE"})},navigateOpts:i,type:"REPLACE",path:s,state:r})},go:(e,s)=>{o({task:()=>{t.go(e),r({type:"GO",index:e})},navigateOpts:s,type:"GO"})},back:e=>{o({task:()=>{t.back((null==e?void 0:e.ignoreBlocker)??!1),r({type:"BACK"})},navigateOpts:e,type:"BACK"})},forward:e=>{o({task:()=>{t.forward((null==e?void 0:e.ignoreBlocker)??!1),r({type:"FORWARD"})},navigateOpts:e,type:"FORWARD"})},canGoBack:()=>0!==e.state[v],createHref:e=>t.createHref(e),block:e=>{var s;if(!t.setBlockers)return()=>{};const n=(null==(s=t.getBlockers)?void 0:s.call(t))??[];return t.setBlockers([...n,e]),()=>{var s,n;const r=(null==(s=t.getBlockers)?void 0:s.call(t))??[];null==(n=t.setBlockers)||n.call(t,r.filter((t=>t!==e)))}},flush:()=>{var e;return null==(e=t.flush)?void 0:e.call(t)},destroy:()=>{var e;return null==(e=t.destroy)?void 0:e.call(t)},notify:n}}function S(t,e){return e||(e={}),{...e,key:R(),[v]:t}}function w(t){var e;const s=(null==t?void 0:t.window)??("undefined"!=typeof document?window:void 0),n=s.history.pushState,r=s.history.replaceState;let o=[];const i=()=>o,a=(null==t?void 0:t.createHref)??(t=>t),c=(null==t?void 0:t.parseLocation)??(()=>C(`${s.location.pathname}${s.location.search}${s.location.hash}`,s.history.state));(null==(e=s.history.state)?void 0:e.key)||s.history.replaceState({[v]:0,key:R()},"");let u,l,h,d=c(),p=!1,f=!1,m=!1,S=!1;const w=()=>{l&&(E._ignoreSubscribers=!0,(l.isPush?s.history.pushState:s.history.replaceState)(l.state,"",l.href),E._ignoreSubscribers=!1,l=void 0,h=void 0,u=void 0)},_=(t,e,s)=>{const n=a(e);h||(u=d),d=C(e,s),l={href:n,state:s,isPush:(null==l?void 0:l.isPush)||"push"===t},h||(h=Promise.resolve().then((()=>w())))},P=t=>{d=c(),E.notify({type:t})},x=async()=>{if(f)return void(f=!1);const t=c(),e=t.state[v]-d.state[v],n=-1===e,r=!(1===e)&&!n||p;p=!1;const o=r?"GO":n?"BACK":"FORWARD",a=r?{type:"GO",index:e}:{type:n?"BACK":"FORWARD"};if(m)m=!1;else{const e=i();if("undefined"!=typeof document&&e.length)for(const n of e)if(await n.blockerFn({currentLocation:d,nextLocation:t,action:o}))return f=!0,s.history.go(1),void E.notify(a)}d=c(),E.notify(a)},O=t=>{if(S)return void(S=!1);let e=!1;const s=i();if("undefined"!=typeof document&&s.length)for(const t of s){const s=t.enableBeforeUnload??!0;if(!0===s){e=!0;break}if("function"==typeof s&&!0===s()){e=!0;break}}return e?(t.preventDefault(),t.returnValue=""):void 0},E=b({getLocation:()=>d,getLength:()=>s.history.length,pushState:(t,e)=>_("push",t,e),replaceState:(t,e)=>_("replace",t,e),back:t=>(t&&(m=!0),S=!0,s.history.back()),forward:t=>{t&&(m=!0),S=!0,s.history.forward()},go:t=>{p=!0,s.history.go(t)},createHref:t=>a(t),flush:w,destroy:()=>{s.history.pushState=n,s.history.replaceState=r,s.removeEventListener(g,O,{capture:!0}),s.removeEventListener(y,x)},onBlocked:()=>{u&&d!==u&&(d=u)},getBlockers:i,setBlockers:t=>o=t,notifyOnIndexChange:!1});return s.addEventListener(g,O,{capture:!0}),s.addEventListener(y,x),s.history.pushState=function(...t){const e=n.apply(s.history,t);return E._ignoreSubscribers||P("PUSH"),e},s.history.replaceState=function(...t){const e=r.apply(s.history,t);return E._ignoreSubscribers||P("REPLACE"),e},E}function C(t,e){const s=t.indexOf("#"),n=t.indexOf("?");return{href:t,pathname:t.substring(0,s>0?n>0?Math.min(s,n):s:n>0?n:t.length),hash:s>-1?t.substring(s):"",search:n>-1?t.slice(n,-1===s?void 0:s):"",state:e||{[v]:0,key:R()}}}function R(){return(Math.random()+1).toString(36).substring(7)}var _=i(1843);class P{constructor(t){this.listeners=new Set,this._subscriptions=[],this.lastSeenDepValues=[],this.getDepVals=()=>{const t=[],e=[];for(const s of this.options.deps)t.push(s.prevState),e.push(s.state);return this.lastSeenDepValues=e,{prevDepVals:t,currDepVals:e,prevVal:this.prevState??void 0}},this.recompute=()=>{var t,e;this.prevState=this.state;const{prevDepVals:s,currDepVals:n,prevVal:r}=this.getDepVals();this.state=this.options.fn({prevDepVals:s,currDepVals:n,prevVal:r}),null==(e=(t=this.options).onUpdate)||e.call(t)},this.checkIfRecalculationNeededDeeply=()=>{for(const t of this.options.deps)t instanceof P&&t.checkIfRecalculationNeededDeeply();let t=!1;const e=this.lastSeenDepValues,{currDepVals:s}=this.getDepVals();for(let n=0;n<s.length;n++)if(s[n]!==e[n]){t=!0;break}t&&this.recompute()},this.mount=()=>(this.registerOnGraph(),this.checkIfRecalculationNeededDeeply(),()=>{this.unregisterFromGraph();for(const t of this._subscriptions)t()}),this.subscribe=t=>{var e,s;this.listeners.add(t);const n=null==(s=(e=this.options).onSubscribe)?void 0:s.call(e,t,this);return()=>{this.listeners.delete(t),null==n||n()}},this.options=t,this.state=t.fn({prevDepVals:void 0,prevVal:void 0,currDepVals:this.getDepVals().currDepVals})}registerOnGraph(t=this.options.deps){for(const e of t)if(e instanceof P)e.registerOnGraph(),this.registerOnGraph(e.options.deps);else if(e instanceof q){let t=x.get(e);t||(t=new Set,x.set(e,t)),t.add(this);let s=O.get(this);s||(s=new Set,O.set(this,s)),s.add(e)}}unregisterFromGraph(t=this.options.deps){for(const e of t)if(e instanceof P)this.unregisterFromGraph(e.options.deps);else if(e instanceof q){const t=x.get(e);t&&t.delete(this);const s=O.get(this);s&&s.delete(e)}}}const x=new WeakMap,O=new WeakMap,E={current:[]};let k=!1,M=0;const L=new Set,F=new Map;function j(t){const e=Array.from(t).sort(((t,e)=>t instanceof P&&t.options.deps.includes(e)?1:e instanceof P&&e.options.deps.includes(t)?-1:0));for(const t of e){if(E.current.includes(t))continue;E.current.push(t),t.recompute();const e=O.get(t);if(e)for(const t of e){const e=x.get(t);e&&j(e)}}}function I(t){t.listeners.forEach((e=>e({prevVal:t.prevState,currentVal:t.state})))}function A(t){t.listeners.forEach((e=>e({prevVal:t.prevState,currentVal:t.state})))}function D(t){if(M>0&&!F.has(t)&&F.set(t,t.prevState),L.add(t),!(M>0||k))try{for(k=!0;L.size>0;){const t=Array.from(L);L.clear();for(const e of t){const t=F.get(e)??e.prevState;e.prevState=t,I(e)}for(const e of t){const t=x.get(e);t&&(E.current.push(e),j(t))}for(const e of t){const t=x.get(e);if(t)for(const e of t)A(e)}}}finally{k=!1,E.current=[],F.clear()}}function T(t){M++;try{t()}finally{if(M--,0===M){const t=Array.from(L)[0];t&&D(t)}}}class q{constructor(t,e){this.listeners=new Set,this.subscribe=t=>{var e,s;this.listeners.add(t);const n=null==(s=null==(e=this.options)?void 0:e.onSubscribe)?void 0:s.call(e,t,this);return()=>{this.listeners.delete(t),null==n||n()}},this.setState=t=>{var e,s,n;this.prevState=this.state,this.state=(null==(e=this.options)?void 0:e.updateFn)?this.options.updateFn(this.prevState)(t):t(this.prevState),null==(n=null==(s=this.options)?void 0:s.onUpdate)||n.call(s),D(this)},this.prevState=t,this.state=t,this.options=e}}var N=i(1561),B=i(6847),$=i(9239),K=i(7264),H=i(37);function V(t){if(!t)return"";const e=decodeURIComponent(t);return"false"!==e&&("true"===e||(0*+e==0&&+e+""===e?+e:e))}const U=(Q=JSON.parse,t=>{"?"===t.substring(0,1)&&(t=t.substring(1));const e=function(t){let e,s;const n={},r=t.split("&");for(;e=r.shift();){const t=e.indexOf("=");if(-1!==t){s=e.slice(0,t),s=decodeURIComponent(s);const r=e.slice(t+1);void 0!==n[s]?n[s]=[].concat(n[s],V(r)):n[s]=V(r)}else s=e,s=decodeURIComponent(s),n[s]=""}return n}(t);for(const t in e){const s=e[t];if("string"==typeof s)try{e[t]=Q(s)}catch(t){}}return e});var Q;const z=function(t,e){return s=>{s={...s},Object.keys(s).forEach((n=>{const r=s[n];void 0===r||void 0===r?delete s[n]:s[n]=function(s){if("object"==typeof s&&null!==s)try{return t(s)}catch(t){}else if("string"==typeof s&&"function"==typeof e)try{return e(s),t(s)}catch(t){}return s}(r)}));const n=function(t){let e,s,n,r="";for(e in t)if(void 0!==(n=t[e]))if(Array.isArray(n))for(s=0;s<n.length;s++)r&&(r+="&"),r+=encodeURIComponent(e)+"="+encodeURIComponent(n[s]);else r&&(r+="&"),r+=encodeURIComponent(e)+"="+encodeURIComponent(n);return""+r}(s).toString();return n?`?${n}`:""}}(JSON.stringify,JSON.parse);var W=i(1459),G=i(6946),Z=i(1259);const J=["component","errorComponent","pendingComponent","notFoundComponent"];function X(t,e){if(null==t)return{};if("~standard"in t){const s=t["~standard"].validate(e);if(s instanceof Promise)throw new Y("Async validation not supported");if(s.issues)throw new Y(JSON.stringify(s.issues,void 0,2),{cause:s});return s.value}return"parse"in t?t.parse(e):"function"==typeof t?t(e):{}}class Y extends Error{}class tt extends Error{}var et=i(790),st=i(1609),nt=i(7573),rt=i(2927),ot=i(8332),it=i(396),at=i(3655);function ct(){const t=(0,it.r)(),e=st.useRef({router:t,mounted:!1}),s=(0,ot.k)({select:({isLoading:t})=>t}),[n,r]=st.useState(!1),o=(0,ot.k)({select:t=>t.matches.some((t=>"pending"===t.status)),structuralSharing:!0}),i=(0,at.ZC)(s),a=s||n||o,c=(0,at.ZC)(a),u=s||o,l=(0,at.ZC)(u);return t.isServer||(t.startReactTransition=t=>{r(!0),st.startTransition((()=>{t(),r(!1)}))}),st.useEffect((()=>{const e=t.history.subscribe(t.load),s=t.buildLocation({to:t.latestLocation.pathname,search:!0,params:!0,hash:!0,state:!0,_includeValidateSearch:!0});return(0,B.gx)(t.latestLocation.href)!==(0,B.gx)(s.href)&&t.commitLocation({...s,replace:!0}),()=>{e()}}),[t,t.history]),(0,at.Nf)((()=>{"undefined"!=typeof window&&t.clientSsr||e.current.router===t&&e.current.mounted||(e.current={router:t,mounted:!0},(async()=>{try{await t.load()}catch(t){console.error(t)}})())}),[t]),(0,at.Nf)((()=>{i&&!s&&t.emit({type:"onLoad",...(0,H.C)(t.state)})}),[i,t,s]),(0,at.Nf)((()=>{l&&!u&&t.emit({type:"onBeforeRouteMount",...(0,H.C)(t.state)})}),[u,l,t]),(0,at.Nf)((()=>{c&&!a&&(t.emit({type:"onResolved",...(0,H.C)(t.state)}),t.__store.setState((t=>({...t,status:"idle",resolvedLocation:t.location}))))}),[a,c,t]),null}var ut=i(6712),lt=i(1245),ht=i(8541);function dt(){const t=(0,it.r)(),e=t.options.defaultPendingComponent?(0,et.jsx)(t.options.defaultPendingComponent,{}):null,s=t.isServer||"undefined"!=typeof document&&t.clientSsr?ht._:st.Suspense,n=(0,et.jsxs)(s,{fallback:e,children:[(0,et.jsx)(ct,{}),(0,et.jsx)(pt,{})]});return t.options.InnerWrap?(0,et.jsx)(t.options.InnerWrap,{children:n}):n}function pt(){const t=(0,ot.k)({select:t=>{var e;return null==(e=t.matches[0])?void 0:e.id}}),e=(0,ot.k)({select:t=>t.loadedAt});return(0,et.jsx)(ut.$.Provider,{value:t,children:(0,et.jsx)(rt.g,{getResetKey:()=>e,errorComponent:rt.A,onCatch:t=>{(0,nt.A)(!1,"The following error wasn't caught by any route! At the very least, consider setting an 'errorComponent' in your RootRoute!"),(0,nt.A)(!1,t.message||t.toString())},children:t?(0,et.jsx)(lt.YG,{matchId:t}):null})})}var ft=i(414);function mt({router:t,children:e,...s}){t.update({...t.options,...s,context:{...t.options.context,...s.context}});const n=(0,ft.H)(),r=(0,et.jsx)(n.Provider,{value:t,children:e});return t.options.Wrap?(0,et.jsx)(t.options.Wrap,{children:r}):r}function vt({router:t,...e}){return(0,et.jsx)(mt,{router:t,...e,children:(0,et.jsx)(dt,{})})}var yt=i(6244);React.lazy((()=>i.e(236).then(i.bind(i,1236)).then((t=>({default:t.TanStackRouterDevtools})))));const gt=(0,_.gI)({component:()=>React.createElement(yt.A,null,React.createElement(lt.sv,null),!1)});var bt=i(6037),St=(0,bt.WK)("/settings")(),wt=(0,bt.WK)("/onboarding")(),Ct=(0,bt.WK)("/")(),Rt=(0,bt.WK)("/settings/$settingsId")(),_t=(0,bt.WK)("/onboarding/tips-and-tricks")(),Pt=(0,bt.WK)("/onboarding/style-widget")(),xt=(0,bt.WK)("/onboarding/information-check")(),Ot=(0,bt.WK)("/onboarding/implementation")(),Et=(0,bt.WK)("/onboarding/create-your-account")(),kt=(0,bt.WK)("/onboarding/confirm-email")(),Mt=St.update({id:"/settings",path:"/settings",getParentRoute:function(){return gt}}).lazy((function(){return Promise.all([i.e(454),i.e(298),i.e(610)]).then(i.bind(i,1610)).then((function(t){return t.Route}))})),Lt=wt.update({id:"/onboarding",path:"/onboarding",getParentRoute:function(){return gt}}).lazy((function(){return i.e(943).then(i.bind(i,1943)).then((function(t){return t.Route}))})),Ft=Ct.update({id:"/",path:"/",getParentRoute:function(){return gt}}).lazy((function(){return Promise.all([i.e(454),i.e(60)]).then(i.bind(i,7060)).then((function(t){return t.Route}))})),jt=Rt.update({id:"/$settingsId",path:"/$settingsId",getParentRoute:function(){return Mt}}).lazy((function(){return Promise.all([i.e(454),i.e(298),i.e(15)]).then(i.bind(i,3287)).then((function(t){return t.Route}))})),It=_t.update({id:"/tips-and-tricks",path:"/tips-and-tricks",getParentRoute:function(){return Lt}}).lazy((function(){return Promise.all([i.e(454),i.e(298),i.e(777)]).then(i.bind(i,4777)).then((function(t){return t.Route}))})),At=Pt.update({id:"/style-widget",path:"/style-widget",getParentRoute:function(){return Lt}}).lazy((function(){return Promise.all([i.e(454),i.e(298),i.e(182)]).then(i.bind(i,3182)).then((function(t){return t.Route}))})),Dt=xt.update({id:"/information-check",path:"/information-check",getParentRoute:function(){return Lt}}).lazy((function(){return Promise.all([i.e(454),i.e(298),i.e(939)]).then(i.bind(i,9939)).then((function(t){return t.Route}))})),Tt=Ot.update({id:"/implementation",path:"/implementation",getParentRoute:function(){return Lt}}).lazy((function(){return Promise.all([i.e(454),i.e(298),i.e(536)]).then(i.bind(i,7536)).then((function(t){return t.Route}))})),qt=Et.update({id:"/create-your-account",path:"/create-your-account",getParentRoute:function(){return Lt}}).lazy((function(){return Promise.all([i.e(454),i.e(298),i.e(446)]).then(i.bind(i,4446)).then((function(t){return t.Route}))})),Nt={OnboardingConfirmEmailLazyRoute:kt.update({id:"/confirm-email",path:"/confirm-email",getParentRoute:function(){return Lt}}).lazy((function(){return Promise.all([i.e(454),i.e(298),i.e(157)]).then(i.bind(i,3157)).then((function(t){return t.Route}))})),OnboardingCreateYourAccountLazyRoute:qt,OnboardingImplementationLazyRoute:Tt,OnboardingInformationCheckLazyRoute:Dt,OnboardingStyleWidgetLazyRoute:At,OnboardingTipsAndTricksLazyRoute:It},Bt={SettingsSettingsIdLazyRoute:jt},$t={IndexLazyRoute:Ft,OnboardingLazyRoute:Lt._addFileChildren(Nt),SettingsLazyRoute:Mt._addFileChildren(Bt)},Kt=gt._addFileChildren($t)._addFileTypes();const Ht=function(){const t="undefined"!=typeof document?window:void 0;return w({window:t,parseLocation:()=>C(t.location.hash.split("#").slice(1).join("#")??"/",t.history.state),createHref:e=>`${t.location.pathname}${t.location.search}#${e}`})}(),Vt=new o({onError:t=>{}});let Ut={defaultOptions:{queries:{staleTime:36e5,refetchOnWindowFocus:!1,retry:!1,suspense:!1}}};Ut={...Ut,queryCache:Vt};const Qt=new class{#b;#r;#d;#S;#w;#C;#R;#_;constructor(t={}){this.#b=t.queryCache||new o,this.#r=t.mutationCache||new c,this.#d=t.defaultOptions||{},this.#S=new Map,this.#w=new Map,this.#C=0}mount(){this.#C++,1===this.#C&&(this.#R=l.m.subscribe((async t=>{t&&(await this.resumePausedMutations(),this.#b.onFocus())})),this.#_=h.t.subscribe((async t=>{t&&(await this.resumePausedMutations(),this.#b.onOnline())})))}unmount(){this.#C--,0===this.#C&&(this.#R?.(),this.#R=void 0,this.#_?.(),this.#_=void 0)}isFetching(t){return this.#b.findAll({...t,fetchStatus:"fetching"}).length}isMutating(t){return this.#r.findAll({...t,status:"pending"}).length}getQueryData(t){const e=this.defaultQueryOptions({queryKey:t});return this.#b.get(e.queryHash)?.state.data}ensureQueryData(t){const s=this.defaultQueryOptions(t),n=this.#b.build(this,s),r=n.state.data;return void 0===r?this.fetchQuery(t):(t.revalidateIfStale&&n.isStaleByTime((0,e.d2)(s.staleTime,n))&&this.prefetchQuery(s),Promise.resolve(r))}getQueriesData(t){return this.#b.findAll(t).map((({queryKey:t,state:e})=>[t,e.data]))}setQueryData(t,s,n){const r=this.defaultQueryOptions({queryKey:t}),o=this.#b.get(r.queryHash),i=o?.state.data,a=(0,e.Zw)(s,i);if(void 0!==a)return this.#b.build(this,r).setData(a,{...n,manual:!0})}setQueriesData(t,e,s){return n.j.batch((()=>this.#b.findAll(t).map((({queryKey:t})=>[t,this.setQueryData(t,e,s)]))))}getQueryState(t){const e=this.defaultQueryOptions({queryKey:t});return this.#b.get(e.queryHash)?.state}removeQueries(t){const e=this.#b;n.j.batch((()=>{e.findAll(t).forEach((t=>{e.remove(t)}))}))}resetQueries(t,e){const s=this.#b,r={type:"active",...t};return n.j.batch((()=>(s.findAll(t).forEach((t=>{t.reset()})),this.refetchQueries(r,e))))}cancelQueries(t,s={}){const r={revert:!0,...s},o=n.j.batch((()=>this.#b.findAll(t).map((t=>t.cancel(r)))));return Promise.all(o).then(e.lQ).catch(e.lQ)}invalidateQueries(t,e={}){return n.j.batch((()=>{if(this.#b.findAll(t).forEach((t=>{t.invalidate()})),"none"===t?.refetchType)return Promise.resolve();const s={...t,type:t?.refetchType??t?.type??"active"};return this.refetchQueries(s,e)}))}refetchQueries(t,s={}){const r={...s,cancelRefetch:s.cancelRefetch??!0},o=n.j.batch((()=>this.#b.findAll(t).filter((t=>!t.isDisabled())).map((t=>{let s=t.fetch(void 0,r);return r.throwOnError||(s=s.catch(e.lQ)),"paused"===t.state.fetchStatus?Promise.resolve():s}))));return Promise.all(o).then(e.lQ)}fetchQuery(t){const s=this.defaultQueryOptions(t);void 0===s.retry&&(s.retry=!1);const n=this.#b.build(this,s);return n.isStaleByTime((0,e.d2)(s.staleTime,n))?n.fetch(s):Promise.resolve(n.state.data)}prefetchQuery(t){return this.fetchQuery(t).then(e.lQ).catch(e.lQ)}fetchInfiniteQuery(t){return t.behavior=d(t.pages),this.fetchQuery(t)}prefetchInfiniteQuery(t){return this.fetchInfiniteQuery(t).then(e.lQ).catch(e.lQ)}ensureInfiniteQueryData(t){return t.behavior=d(t.pages),this.ensureQueryData(t)}resumePausedMutations(){return h.t.isOnline()?this.#r.resumePausedMutations():Promise.resolve()}getQueryCache(){return this.#b}getMutationCache(){return this.#r}getDefaultOptions(){return this.#d}setDefaultOptions(t){this.#d=t}setQueryDefaults(t,s){this.#S.set((0,e.EN)(t),{queryKey:t,defaultOptions:s})}getQueryDefaults(t){const s=[...this.#S.values()],n={};return s.forEach((s=>{(0,e.Cp)(t,s.queryKey)&&Object.assign(n,s.defaultOptions)})),n}setMutationDefaults(t,s){this.#w.set((0,e.EN)(t),{mutationKey:t,defaultOptions:s})}getMutationDefaults(t){const s=[...this.#w.values()];let n={};return s.forEach((s=>{(0,e.Cp)(t,s.mutationKey)&&(n={...n,...s.defaultOptions})})),n}defaultQueryOptions(t){if(t._defaulted)return t;const s={...this.#d.queries,...this.getQueryDefaults(t.queryKey),...t,_defaulted:!0};return s.queryHash||(s.queryHash=(0,e.F$)(s.queryKey,s)),void 0===s.refetchOnReconnect&&(s.refetchOnReconnect="always"!==s.networkMode),void 0===s.throwOnError&&(s.throwOnError=!!s.suspense),!s.networkMode&&s.persister&&(s.networkMode="offlineFirst"),s.queryFn===e.hT&&(s.enabled=!1),s}defaultMutationOptions(t){return t?._defaulted?t:{...this.#d.mutations,...t?.mutationKey&&this.getMutationDefaults(t.mutationKey),...t,_defaulted:!0}}clear(){this.#b.clear(),this.#r.clear()}}(Ut),zt=new _.l7({getParentRoute:()=>gt,component:()=>React.createElement("div",{className:"simplybook"},"404 Not Found")}),Wt=new class{constructor(t){this.tempLocationKey=`${Math.round(1e7*Math.random())}`,this.resetNextScroll=!0,this.shouldViewTransition=void 0,this.isViewTransitionTypesSupported=void 0,this.subscribers=new Set,this.isScrollRestoring=!1,this.isScrollRestorationSetup=!1,this.startReactTransition=t=>t(),this.update=t=>{var e;t.notFoundRoute&&console.warn("The notFoundRoute API is deprecated and will be removed in the next major version. See https://tanstack.com/router/v1/docs/framework/react/guide/not-found-errors#migrating-from-notfoundroute for more info.");const s=this.options;this.options={...this.options,...t},this.isServer=this.options.isServer??"undefined"==typeof document,this.pathParamsDecodeCharMap=this.options.pathParamsAllowedCharacters?new Map(this.options.pathParamsAllowedCharacters.map((t=>[encodeURIComponent(t),t]))):void 0,(!this.basepath||t.basepath&&t.basepath!==s.basepath)&&(void 0===t.basepath||""===t.basepath||"/"===t.basepath?this.basepath="/":this.basepath=`/${(0,B.cg)(t.basepath)}`),(!this.history||this.options.history&&this.options.history!==this.history)&&(this.history=this.options.history??(this.isServer?function(t={initialEntries:["/"]}){const e=t.initialEntries;let s=t.initialIndex?Math.min(Math.max(t.initialIndex,0),e.length-1):e.length-1;const n=e.map(((t,e)=>S(e,void 0)));return b({getLocation:()=>C(e[s],n[s]),getLength:()=>e.length,pushState:(t,r)=>{s<e.length-1&&(e.splice(s+1),n.splice(s+1)),n.push(r),e.push(t),s=Math.max(e.length-1,0)},replaceState:(t,r)=>{n[s]=r,e[s]=t},back:()=>{s=Math.max(s-1,0)},forward:()=>{s=Math.min(s+1,e.length-1)},go:t=>{s=Math.min(Math.max(s+t,0),e.length-1)},createHref:t=>t})}({initialEntries:[this.basepath||"/"]}):w()),this.latestLocation=this.parseLocation()),this.options.routeTree!==this.routeTree&&(this.routeTree=this.options.routeTree,this.buildRouteTree()),this.__store||(this.__store=new q({loadedAt:0,isLoading:!1,isTransitioning:!1,status:"idle",resolvedLocation:void 0,location:this.latestLocation,matches:[],pendingMatches:[],cachedMatches:[],statusCode:200},{onUpdate:()=>{this.__store.state={...this.state,cachedMatches:this.state.cachedMatches.filter((t=>!["redirected"].includes(t.status)))}}}),(0,Z.j1)(this)),"undefined"!=typeof window&&"CSS"in window&&"function"==typeof(null==(e=window.CSS)?void 0:e.supports)&&(this.isViewTransitionTypesSupported=window.CSS.supports("selector(:active-view-transition-type(a)"))},this.buildRouteTree=()=>{this.routesById={},this.routesByPath={};const t=this.options.notFoundRoute;t&&(t.init({originalIndex:99999999999,defaultSsr:this.options.defaultSsr}),this.routesById[t.id]=t);const e=t=>{t.forEach(((t,s)=>{t.init({originalIndex:s,defaultSsr:this.options.defaultSsr});const n=this.routesById[t.id];if((0,N.A)(!n,`Duplicate routes found with id: ${String(t.id)}`),this.routesById[t.id]=t,!t.isRoot&&t.path){const e=(0,B.gx)(t.fullPath);this.routesByPath[e]&&!t.fullPath.endsWith("/")||(this.routesByPath[e]=t)}const r=t.children;(null==r?void 0:r.length)&&e(r)}))};e([this.routeTree]);const s=[];Object.values(this.routesById).forEach(((t,e)=>{var n;if(t.isRoot||!t.path)return;const r=(0,B.p1)(t.fullPath),o=(0,B.kX)(r);for(;o.length>1&&"/"===(null==(n=o[0])?void 0:n.value);)o.shift();const i=o.map((t=>"/"===t.value?.75:"param"===t.type?.5:"wildcard"===t.type?.25:1));s.push({child:t,trimmed:r,parsed:o,index:e,scores:i})})),this.flatRoutes=s.sort(((t,e)=>{const s=Math.min(t.scores.length,e.scores.length);for(let n=0;n<s;n++)if(t.scores[n]!==e.scores[n])return e.scores[n]-t.scores[n];if(t.scores.length!==e.scores.length)return e.scores.length-t.scores.length;for(let n=0;n<s;n++)if(t.parsed[n].value!==e.parsed[n].value)return t.parsed[n].value>e.parsed[n].value?1:-1;return t.index-e.index})).map(((t,e)=>(t.child.rank=e,t.child)))},this.subscribe=(t,e)=>{const s={eventType:t,fn:e};return this.subscribers.add(s),()=>{this.subscribers.delete(s)}},this.emit=t=>{this.subscribers.forEach((e=>{e.eventType===t.type&&e.fn(t)}))},this.parseLocation=(t,e)=>{const s=({pathname:e,search:s,hash:n,state:r})=>{const o=this.options.parseSearch(s),i=this.options.stringifySearch(o);return{pathname:e,searchStr:i,search:(0,$.BH)(null==t?void 0:t.search,o),hash:n.split("#").reverse()[0]??"",href:`${e}${i}${n}`,state:(0,$.BH)(null==t?void 0:t.state,r)}},n=s(e??this.history.location),{__tempLocation:r,__tempKey:o}=n.state;if(r&&(!o||o===this.tempLocationKey)){const t=s(r);return t.state.key=n.state.key,delete t.state.__tempLocation,{...t,maskedLocation:n}}return n},this.resolvePathWithBase=(t,e)=>(0,B.o1)({basepath:this.basepath,base:t,to:(0,B.ts)(e),trailingSlash:this.options.trailingSlash,caseSensitive:this.options.caseSensitive}),this.getMatchedRoutes=(t,e)=>{let s={};const n=(0,B.gx)(t.pathname),r=t=>(0,B.WN)(this.basepath,n,{to:t.fullPath,caseSensitive:t.options.caseSensitive??this.options.caseSensitive,fuzzy:!0});let o=void 0!==(null==e?void 0:e.to)?this.routesByPath[e.to]:void 0;o?s=r(o):o=this.flatRoutes.find((t=>{const e=r(t);return!!e&&(s=e,!0)}));let i=o||this.routesById[K.n];const a=[i];for(;i.parentRoute;)i=i.parentRoute,a.unshift(i);return{matchedRoutes:a,routeParams:s,foundRoute:o}},this.cancelMatch=t=>{const e=this.getMatch(t);e&&(e.abortController.abort(),clearTimeout(e.pendingTimeout))},this.cancelMatches=()=>{var t;null==(t=this.state.pendingMatches)||t.forEach((t=>{this.cancelMatch(t.id)}))},this.buildLocation=t=>{const e=(e={},s)=>{var n,r,o,i,a,c;const u=e._fromLocation?this.matchRoutes(e._fromLocation,{_buildLocation:!0}):this.state.matches,l=null!=e.from?u.find((t=>(0,B.WN)(this.basepath,(0,B.gx)(t.pathname),{to:e.from,caseSensitive:!1,fuzzy:!1}))):void 0,h=(null==l?void 0:l.pathname)||this.latestLocation.pathname;(0,N.A)(null==e.from||null!=l,"Could not find match for from: "+e.from);const d=(null==(n=this.state.pendingMatches)?void 0:n.length)?null==(r=(0,$.HV)(this.state.pendingMatches))?void 0:r.search:(null==(o=(0,$.HV)(u))?void 0:o.search)||this.latestLocation.search,p=null==s?void 0:s.matchedRoutes.filter((t=>u.find((e=>e.routeId===t.id))));let f;if(e.to)f=this.resolvePathWithBase(h,`${e.to}`);else{const t=this.routesById[null==(i=null==p?void 0:p.find((t=>{const e=(0,B.xv)({path:t.fullPath,params:(null==s?void 0:s.routeParams)??{},decodeCharMap:this.pathParamsDecodeCharMap}).interpolatedPath;return(0,B.HS)([this.basepath,e])===h})))?void 0:i.id];f=this.resolvePathWithBase(h,(null==t?void 0:t.to)??h)}const m={...null==(a=(0,$.HV)(u))?void 0:a.params};let v=!0===(e.params??!0)?m:{...m,...(0,$.Zw)(e.params,m)};Object.keys(v).length>0&&(null==s||s.matchedRoutes.map((t=>{var e;return(null==(e=t.options.params)?void 0:e.stringify)??t.options.stringifyParams})).filter(Boolean).forEach((t=>{v={...v,...t(v)}}))),f=(0,B.xv)({path:f,params:v??{},leaveWildcards:!1,leaveParams:t.leaveParams,decodeCharMap:this.pathParamsDecodeCharMap}).interpolatedPath;let y=d;if(t._includeValidateSearch&&(null==(c=this.options.search)?void 0:c.strict)){let t={};null==s||s.matchedRoutes.forEach((e=>{try{e.options.validateSearch&&(t={...t,...X(e.options.validateSearch,{...t,...y})??{}})}catch{}})),y=t}y=(n=>{const r=(null==s?void 0:s.matchedRoutes.reduce(((e,s)=>{var n;const r=[];if("search"in s.options)(null==(n=s.options.search)?void 0:n.middlewares)&&r.push(...s.options.search.middlewares);else if(s.options.preSearchFilters||s.options.postSearchFilters){const t=({search:t,next:e})=>{let n=t;"preSearchFilters"in s.options&&s.options.preSearchFilters&&(n=s.options.preSearchFilters.reduce(((t,e)=>e(t)),t));const r=e(n);return"postSearchFilters"in s.options&&s.options.postSearchFilters?s.options.postSearchFilters.reduce(((t,e)=>e(t)),r):r};r.push(t)}if(t._includeValidateSearch&&s.options.validateSearch){const t=({search:t,next:e})=>{try{const n=e(t);return{...n,...X(s.options.validateSearch,n)??{}}}catch{}};r.push(t)}return e.concat(r)}),[]))??[];r.push((({search:t})=>e.search?!0===e.search?t:(0,$.Zw)(e.search,t):{}));const o=(t,e)=>t>=r.length?e:(0,r[t])({search:e,next:e=>o(t+1,e)});return o(0,n)})(y),y=(0,$.BH)(d,y);const g=this.options.stringifySearch(y),b=!0===e.hash?this.latestLocation.hash:e.hash?(0,$.Zw)(e.hash,this.latestLocation.hash):void 0,S=b?`#${b}`:"";let w=!0===e.state?this.latestLocation.state:e.state?(0,$.Zw)(e.state,this.latestLocation.state):{};return w=(0,$.BH)(this.latestLocation.state,w),{pathname:f,search:y,searchStr:g,state:w,hash:b??"",href:`${f}${g}${S}`,unmaskOnReload:e.unmaskOnReload}},s=(s={},n)=>{var r;const o=e(s);let i=n?e(n):void 0;if(!i){let s={};const a=null==(r=this.options.routeMasks)?void 0:r.find((t=>{const e=(0,B.WN)(this.basepath,o.pathname,{to:t.from,caseSensitive:!1,fuzzy:!1});return!!e&&(s=e,!0)}));if(a){const{from:r,...o}=a;n={...(0,$.Up)(t,["from"]),...o,params:s},i=e(n)}}const a=this.getMatchedRoutes(o,s),c=e(s,a);if(i){const t=this.getMatchedRoutes(i,n),s=e(n,t);c.maskedLocation=s}return c};return t.mask?s(t,{...(0,$.Up)(t,["from"]),...t.mask}):s(t)},this.commitLocation=({viewTransition:t,ignoreBlocker:e,...s})=>{const n=this.latestLocation.href===s.href,r=this.commitLocationPromise;if(this.commitLocationPromise=(0,$.Su)((()=>{null==r||r.resolve()})),n&&(()=>{s.state.key=this.latestLocation.state.key;const t=(0,$.bD)(s.state,this.latestLocation.state);return delete s.state.key,t})())this.load();else{let{maskedLocation:n,hashScrollIntoView:r,...o}=s;n&&(o={...n,state:{...n.state,__tempKey:void 0,__tempLocation:{...o,search:o.searchStr,state:{...o.state,__tempKey:void 0,__tempLocation:void 0,key:void 0}}}},(o.unmaskOnReload??this.options.unmaskOnReload)&&(o.state.__tempKey=this.tempLocationKey)),o.state.__hashScrollIntoViewOptions=r??this.options.defaultHashScrollIntoView??!0,this.shouldViewTransition=t,this.history[s.replace?"replace":"push"](o.href,o.state,{ignoreBlocker:e})}return this.resetNextScroll=s.resetScroll??!0,this.history.subscribers.size||this.load(),this.commitLocationPromise},this.buildAndCommitLocation=({replace:t,resetScroll:e,hashScrollIntoView:s,viewTransition:n,ignoreBlocker:r,href:o,...i}={})=>{if(o){const e=this.history.location.state.__TSR_index,s=C(o,{__TSR_index:t?e:e+1});i.to=s.pathname,i.search=this.options.parseSearch(s.search),i.hash=s.hash.slice(1)}const a=this.buildLocation({...i,_includeValidateSearch:!0});return this.commitLocation({...a,viewTransition:n,replace:t,resetScroll:e,hashScrollIntoView:s,ignoreBlocker:r})},this.navigate=({to:t,reloadDocument:e,href:s,...n})=>{if(!e)return this.buildAndCommitLocation({...n,href:s,to:t});s||(s=this.buildLocation({to:t,...n}).href),n.replace?window.location.replace(s):window.location.href=s},this.load=async t=>{let e,s,n;for(this.latestLocation=this.parseLocation(this.latestLocation),n=new Promise((r=>{this.startReactTransition((async()=>{var o;try{const e=this.latestLocation,s=this.state.resolvedLocation;let n;this.cancelMatches(),T((()=>{n=this.matchRoutes(e),this.__store.setState((t=>({...t,status:"pending",isLoading:!0,location:e,pendingMatches:n,cachedMatches:t.cachedMatches.filter((t=>!n.find((e=>e.id===t.id))))})))})),this.state.redirect||this.emit({type:"onBeforeNavigate",...(0,H.C)({resolvedLocation:s,location:e})}),this.emit({type:"onBeforeLoad",...(0,H.C)({resolvedLocation:s,location:e})}),await this.loadMatches({sync:null==t?void 0:t.sync,matches:n,location:e,onReady:async()=>{this.startViewTransition((async()=>{let t,e,s;T((()=>{this.__store.setState((n=>{const r=n.matches,o=n.pendingMatches||n.matches;return t=r.filter((t=>!o.find((e=>e.id===t.id)))),e=o.filter((t=>!r.find((e=>e.id===t.id)))),s=r.filter((t=>o.find((e=>e.id===t.id)))),{...n,isLoading:!1,loadedAt:Date.now(),matches:o,pendingMatches:void 0,cachedMatches:[...n.cachedMatches,...t.filter((t=>"error"!==t.status))]}})),this.clearExpiredCache()})),[[t,"onLeave"],[e,"onEnter"],[s,"onStay"]].forEach((([t,e])=>{t.forEach((t=>{var s,n;null==(n=(s=this.looseRoutesById[t.routeId].options)[e])||n.call(s,t)}))}))}))}})}catch(t){(0,W.PN)(t)?(e=t,this.isServer||this.navigate({...e,replace:!0,ignoreBlocker:!0})):(0,G.c4)(t)&&(s=t),this.__store.setState((t=>({...t,statusCode:e?e.statusCode:s?404:t.matches.some((t=>"error"===t.status))?500:200,redirect:e})))}this.latestLoadPromise===n&&(null==(o=this.commitLocationPromise)||o.resolve(),this.latestLoadPromise=void 0,this.commitLocationPromise=void 0),r()}))})),this.latestLoadPromise=n,await n;this.latestLoadPromise&&n!==this.latestLoadPromise;)await this.latestLoadPromise},this.startViewTransition=t=>{const e=this.shouldViewTransition??this.options.defaultViewTransition;if(delete this.shouldViewTransition,e&&"undefined"!=typeof document&&"startViewTransition"in document&&"function"==typeof document.startViewTransition){let s;s="object"==typeof e&&this.isViewTransitionTypesSupported?{update:t,types:e.types}:t,document.startViewTransition(s)}else t()},this.updateMatch=(t,e)=>{var s;let n;const r=null==(s=this.state.pendingMatches)?void 0:s.find((e=>e.id===t)),o=this.state.matches.find((e=>e.id===t)),i=this.state.cachedMatches.find((e=>e.id===t)),a=r?"pendingMatches":o?"matches":i?"cachedMatches":"";return a&&this.__store.setState((s=>{var r;return{...s,[a]:null==(r=s[a])?void 0:r.map((s=>s.id===t?n=e(s):s))}})),n},this.getMatch=t=>[...this.state.cachedMatches,...this.state.pendingMatches??[],...this.state.matches].find((e=>e.id===t)),this.loadMatches=async({location:t,matches:e,preload:s,onReady:n,updateMatch:r=this.updateMatch,sync:o})=>{let i,a=!1;const c=async()=>{a||(a=!0,await(null==n?void 0:n()))},u=t=>!(!s||this.state.matches.find((e=>e.id===t)));this.isServer||this.state.matches.length||c();const l=(s,n)=>{var o,i,c,u;if((0,W.PN)(n)&&!n.reloadDocument)throw n;if((0,W.N6)(n)||(0,G.c4)(n)){if(r(s.id,(t=>({...t,status:(0,W.N6)(n)?"redirected":(0,G.c4)(n)?"notFound":"error",isFetching:!1,error:n,beforeLoadPromise:void 0,loaderPromise:void 0}))),n.routeId||(n.routeId=s.routeId),null==(o=s.beforeLoadPromise)||o.resolve(),null==(i=s.loaderPromise)||i.resolve(),null==(c=s.loadPromise)||c.resolve(),(0,W.N6)(n))throw a=!0,n=this.resolveRedirect({...n,_fromLocation:t});if((0,G.c4)(n))throw this._handleNotFound(e,n,{updateMatch:r}),null==(u=this.serverSsr)||u.onMatchSettled({router:this,match:this.getMatch(s.id)}),n}};try{await new Promise(((s,a)=>{(async()=>{var h,d,p;try{const a=(t,s,n)=>{var o,a;const{id:c,routeId:u}=e[t],h=this.looseRoutesById[u];if(s instanceof Promise)throw s;s.routerCode=n,i=i??t,l(this.getMatch(c),s);try{null==(a=(o=h.options).onError)||a.call(o,s)}catch(t){s=t,l(this.getMatch(c),s)}r(c,(t=>{var e,n;return null==(e=t.beforeLoadPromise)||e.resolve(),null==(n=t.loadPromise)||n.resolve(),{...t,error:s,status:"error",isFetching:!1,updatedAt:Date.now(),abortController:new AbortController,beforeLoadPromise:void 0}}))};for(const[s,{id:o,routeId:i}]of e.entries()){const l=this.getMatch(o),f=null==(h=e[s-1])?void 0:h.id,m=this.looseRoutesById[i],v=m.options.pendingMs??this.options.defaultPendingMs,y=!(!n||this.isServer||u(o)||!m.options.loader&&!m.options.beforeLoad||"number"!=typeof v||v===1/0||!(m.options.pendingComponent??this.options.defaultPendingComponent));let g=!0;if((l.beforeLoadPromise||l.loaderPromise)&&(y&&setTimeout((()=>{try{c()}catch{}}),v),await l.beforeLoadPromise,g="success"!==this.getMatch(o).status),g){try{r(o,(t=>({...t,loadPromise:(0,$.Su)((()=>{var e;null==(e=t.loadPromise)||e.resolve()})),beforeLoadPromise:(0,$.Su)()})));const n=new AbortController;let i;y&&(i=setTimeout((()=>{try{c()}catch{}}),v));const{paramsError:l,searchError:h}=this.getMatch(o);l&&a(s,l,"PARSE_PARAMS"),h&&a(s,h,"VALIDATE_SEARCH");const g=()=>f?this.getMatch(f).context:this.options.context??{};r(o,(t=>({...t,isFetching:"beforeLoad",fetchCount:t.fetchCount+1,abortController:n,pendingTimeout:i,context:{...g(),...t.__routeContext}})));const{search:b,params:S,context:w,cause:C}=this.getMatch(o),R=u(o),_={search:b,abortController:n,params:S,preload:R,context:w,location:t,navigate:e=>this.navigate({...e,_fromLocation:t}),buildLocation:this.buildLocation,cause:R?"preload":C,matches:e},P=await(null==(p=(d=m.options).beforeLoad)?void 0:p.call(d,_))??{};((0,W.N6)(P)||(0,G.c4)(P))&&a(s,P,"BEFORE_LOAD"),r(o,(t=>({...t,__beforeLoadContext:P,context:{...g(),...t.__routeContext,...P},abortController:n})))}catch(t){a(s,t,"BEFORE_LOAD")}r(o,(t=>{var e;return null==(e=t.beforeLoadPromise)||e.resolve(),{...t,beforeLoadPromise:void 0,isFetching:!1}}))}}const f=e.slice(0,i),m=[];f.forEach((({id:s,routeId:n},i)=>{m.push((async()=>{const{loaderPromise:a}=this.getMatch(s);let c=!1,h=!1;if(a){await a;const t=this.getMatch(s);t.error&&l(t,t.error)}else{const a=m[i-1],d=this.looseRoutesById[n],p=()=>{const{params:e,loaderDeps:n,abortController:r,context:o,cause:i}=this.getMatch(s),c=u(s);return{params:e,deps:n,preload:!!c,parentMatchPromise:a,abortController:r,context:o,location:t,navigate:e=>this.navigate({...e,_fromLocation:t}),cause:c?"preload":i,route:d}},f=Date.now()-this.getMatch(s).updatedAt,v=u(s),y=v?d.options.preloadStaleTime??this.options.defaultPreloadStaleTime??3e4:d.options.staleTime??this.options.defaultStaleTime??0,g=d.options.shouldReload,b="function"==typeof g?g(p()):g;r(s,(t=>({...t,loaderPromise:(0,$.Su)(),preload:!!v&&!this.state.matches.find((t=>t.id===s))})));const S=async()=>{var t,n,o,i,a,c,u,h,f;try{const m=async()=>{const t=this.getMatch(s);t.minPendingPromise&&await t.minPendingPromise};try{this.loadRouteChunk(d),r(s,(t=>({...t,isFetching:"loader"})));const u=await(null==(n=(t=d.options).loader)?void 0:n.call(t,p()));l(this.getMatch(s),u),await d._lazyPromise,await m();const h=null==(i=(o=d.options).head)?void 0:i.call(o,{matches:e,match:this.getMatch(s),params:this.getMatch(s).params,loaderData:u}),f=null==h?void 0:h.meta,v=null==h?void 0:h.links,y=null==h?void 0:h.scripts,g=null==(c=(a=d.options).headers)?void 0:c.call(a,{loaderData:u});r(s,(t=>({...t,error:void 0,status:"success",isFetching:!1,updatedAt:Date.now(),loaderData:u,meta:f,links:v,scripts:y,headers:g})))}catch(t){let e=t;await m(),l(this.getMatch(s),t);try{null==(h=(u=d.options).onError)||h.call(u,t)}catch(t){e=t,l(this.getMatch(s),t)}r(s,(t=>({...t,error:e,status:"error",isFetching:!1})))}null==(f=this.serverSsr)||f.onMatchSettled({router:this,match:this.getMatch(s)}),await d._componentsPromise}catch(t){r(s,(t=>({...t,loaderPromise:void 0}))),l(this.getMatch(s),t)}},{status:w,invalid:C}=this.getMatch(s);c="success"===w&&(C||(b??f>y)),v&&!1===d.options.preload||(c&&!o?(h=!0,(async()=>{try{await S();const{loaderPromise:t,loadPromise:e}=this.getMatch(s);null==t||t.resolve(),null==e||e.resolve(),r(s,(t=>({...t,loaderPromise:void 0})))}catch(t){(0,W.PN)(t)&&await this.navigate(t)}})()):("success"!==w||c&&o)&&await S())}if(!h){const{loaderPromise:t,loadPromise:e}=this.getMatch(s);null==t||t.resolve(),null==e||e.resolve()}return r(s,(t=>({...t,isFetching:!!h&&t.isFetching,loaderPromise:h?t.loaderPromise:void 0,invalid:!1}))),this.getMatch(s)})())})),await Promise.all(m),s()}catch(t){a(t)}})()})),await c()}catch(t){if((0,W.N6)(t)||(0,G.c4)(t))throw(0,G.c4)(t)&&!s&&await c(),t}return e},this.invalidate=t=>{const e=e=>{var s;return(null==(s=null==t?void 0:t.filter)?void 0:s.call(t,e))??1?{...e,invalid:!0,..."error"===e.status?{status:"pending",error:void 0}:{}}:e};return this.__store.setState((t=>{var s;return{...t,matches:t.matches.map(e),cachedMatches:t.cachedMatches.map(e),pendingMatches:null==(s=t.pendingMatches)?void 0:s.map(e)}})),this.load({sync:null==t?void 0:t.sync})},this.resolveRedirect=t=>{const e=t;return e.href||(e.href=this.buildLocation(e).href),e},this.clearCache=t=>{const e=null==t?void 0:t.filter;void 0!==e?this.__store.setState((t=>({...t,cachedMatches:t.cachedMatches.filter((t=>!e(t)))}))):this.__store.setState((t=>({...t,cachedMatches:[]})))},this.clearExpiredCache=()=>{this.clearCache({filter:t=>{const e=this.looseRoutesById[t.routeId];if(!e.options.loader)return!0;const s=(t.preload?e.options.preloadGcTime??this.options.defaultPreloadGcTime:e.options.gcTime??this.options.defaultGcTime)??3e5;return!("error"!==t.status&&Date.now()-t.updatedAt<s)}})},this.loadRouteChunk=t=>(void 0===t._lazyPromise&&(t.lazyFn?t._lazyPromise=t.lazyFn().then((e=>{const{id:s,...n}=e.options;Object.assign(t.options,n)})):t._lazyPromise=Promise.resolve()),void 0===t._componentsPromise&&(t._componentsPromise=t._lazyPromise.then((()=>Promise.all(J.map((async e=>{const s=t.options[e];(null==s?void 0:s.preload)&&await s.preload()})))))),t._componentsPromise),this.preloadRoute=async t=>{const e=this.buildLocation(t);let s=this.matchRoutes(e,{throwOnError:!0,preload:!0,dest:t});const n=new Set([...this.state.matches,...this.state.pendingMatches??[]].map((t=>t.id))),r=new Set([...n,...this.state.cachedMatches.map((t=>t.id))]);T((()=>{s.forEach((t=>{r.has(t.id)||this.__store.setState((e=>({...e,cachedMatches:[...e.cachedMatches,t]})))}))}));try{return s=await this.loadMatches({matches:s,location:e,preload:!0,updateMatch:(t,e)=>{n.has(t)?s=s.map((s=>s.id===t?e(s):s)):this.updateMatch(t,e)}}),s}catch(t){if((0,W.N6)(t)){if(t.reloadDocument)return;return await this.preloadRoute({...t,_fromLocation:e})}return void((0,G.c4)(t)||console.error(t))}},this.matchRoute=(t,e)=>{const s={...t,to:t.to?this.resolvePathWithBase(t.from||"",t.to):void 0,params:t.params||{},leaveParams:!0},n=this.buildLocation(s);if((null==e?void 0:e.pending)&&"pending"!==this.state.status)return!1;const r=(void 0===(null==e?void 0:e.pending)?!this.state.isLoading:e.pending)?this.latestLocation:this.state.resolvedLocation||this.state.location,o=(0,B.WN)(this.basepath,r.pathname,{...e,to:n.pathname});return!!o&&!(t.params&&!(0,$.bD)(o,t.params,{partial:!0}))&&(o&&((null==e?void 0:e.includeSearch)??1)?!!(0,$.bD)(r.search,n.search,{partial:!0})&&o:o)},this._handleNotFound=(t,e,{updateMatch:s=this.updateMatch}={})=>{const n=Object.fromEntries(t.map((t=>[t.routeId,t])));let r=(e.global?this.looseRoutesById[K.n]:this.looseRoutesById[e.routeId])||this.looseRoutesById[K.n];for(;!r.options.notFoundComponent&&!this.options.defaultNotFoundComponent&&r.id!==K.n;)r=r.parentRoute,(0,N.A)(r,"Found invalid route tree while trying to find not-found handler.");const o=n[r.id];(0,N.A)(o,"Could not find match for route: "+r.id),s(o.id,(t=>({...t,status:"notFound",error:e,isFetching:!1}))),"BEFORE_LOAD"===e.routerCode&&r.parentRoute&&(e.routeId=r.parentRoute.id,this._handleNotFound(t,e,{updateMatch:s}))},this.hasNotFoundMatch=()=>this.__store.state.matches.some((t=>"notFound"===t.status||t.globalNotFound)),this.update({defaultPreloadDelay:50,defaultPendingMs:1e3,defaultPendingMinMs:500,context:void 0,...t,caseSensitive:t.caseSensitive??!1,notFoundMode:t.notFoundMode??"fuzzy",stringifySearch:t.stringifySearch??z,parseSearch:t.parseSearch??U}),"undefined"!=typeof document&&(window.__TSR_ROUTER__=this)}get state(){return this.__store.state}get looseRoutesById(){return this.routesById}matchRoutes(t,e,s){return"string"==typeof t?this.matchRoutesInternal({pathname:t,search:e},s):this.matchRoutesInternal(t,e)}matchRoutesInternal(t,e){const{foundRoute:s,matchedRoutes:n,routeParams:r}=this.getMatchedRoutes(t,null==e?void 0:e.dest);let o=!1;(s?"/"!==s.path&&r["**"]:(0,B.gx)(t.pathname))&&(this.options.notFoundRoute?n.push(this.options.notFoundRoute):o=!0);const i=(()=>{if(o){if("root"!==this.options.notFoundMode)for(let t=n.length-1;t>=0;t--){const e=n[t];if(e.children)return e.id}return K.n}})(),a=n.map((t=>{var s;let n;const o=(null==(s=t.options.params)?void 0:s.parse)??t.options.parseParams;if(o)try{const t=o(r);Object.assign(r,t)}catch(t){if(n=new tt(t.message,{cause:t}),null==e?void 0:e.throwOnError)throw n;return n}})),c=[],u=t=>(null==t?void 0:t.id)?t.context??this.options.context??{}:this.options.context??{};return n.forEach(((s,n)=>{var o,l,h,d;const p=c[n-1],[f,m,v]=(()=>{const n=(null==p?void 0:p.search)??t.search,r=(null==p?void 0:p._strictSearch)??{};try{const t=X(s.options.validateSearch,{...n})??{};return[{...n,...t},{...r,...t},void 0]}catch(t){let s=t;if(t instanceof Y||(s=new Y(t.message,{cause:t})),null==e?void 0:e.throwOnError)throw s;return[n,{},s]}})(),y=(null==(l=(o=s.options).loaderDeps)?void 0:l.call(o,{search:f}))??"",g=y?JSON.stringify(y):"",{usedParams:b,interpolatedPath:S}=(0,B.xv)({path:s.fullPath,params:r,decodeCharMap:this.pathParamsDecodeCharMap}),w=(0,B.xv)({path:s.id,params:r,leaveWildcards:!0,decodeCharMap:this.pathParamsDecodeCharMap}).interpolatedPath+g,C=this.getMatch(w),R=this.state.matches.find((t=>t.routeId===s.id)),_=R?"stay":"enter";let P;if(C)P={...C,cause:_,params:R?(0,$.BH)(R.params,r):r,_strictParams:b,search:R?(0,$.BH)(R.search,f):(0,$.BH)(C.search,f),_strictSearch:m};else{const t=s.options.loader||s.options.beforeLoad||s.lazyFn||function(t){var e;for(const s of J)if(null==(e=t.options[s])?void 0:e.preload)return!0;return!1}(s)?"pending":"success";P={id:w,index:n,routeId:s.id,params:R?(0,$.BH)(R.params,r):r,_strictParams:b,pathname:(0,B.HS)([this.basepath,S]),updatedAt:Date.now(),search:R?(0,$.BH)(R.search,f):f,_strictSearch:m,searchError:void 0,status:t,isFetching:!1,error:void 0,paramsError:a[n],__routeContext:{},__beforeLoadContext:{},context:{},abortController:new AbortController,fetchCount:0,cause:_,loaderDeps:R?(0,$.BH)(R.loaderDeps,y):y,invalid:!1,preload:!1,links:void 0,scripts:void 0,meta:void 0,staticData:s.options.staticData||{},loadPromise:(0,$.Su)(),fullPath:s.fullPath}}"success"===P.status&&(P.headers=null==(d=(h=s.options).headers)?void 0:d.call(h,{loaderData:P.loaderData})),(null==e?void 0:e.preload)||(P.globalNotFound=i===s.id),P.searchError=v;const x=u(p);P.context={...x,...P.__routeContext,...P.__beforeLoadContext},c.push(P)})),c.forEach(((s,n)=>{var r,o,i,a;const l=this.looseRoutesById[s.routeId];if(!this.getMatch(s.id)&&!0!==(null==e?void 0:e._buildLocation)){const e=c[n-1],i=u(e),a={deps:s.loaderDeps,params:s.params,context:i,location:t,navigate:e=>this.navigate({...e,_fromLocation:t}),buildLocation:this.buildLocation,cause:s.cause,abortController:s.abortController,preload:!!s.preload,matches:c};s.__routeContext=(null==(o=(r=l.options).context)?void 0:o.call(r,a))??{},s.context={...i,...s.__routeContext,...s.__beforeLoadContext}}const h=null==(a=(i=l.options).head)?void 0:a.call(i,{matches:c,match:s,params:s.params,loaderData:s.loaderData??void 0});s.links=null==h?void 0:h.links,s.scripts=null==h?void 0:h.scripts,s.meta=null==h?void 0:h.meta})),c}}({routeTree:Kt,notFoundRoute:zt,context:{queryClient:Qt},history:Ht,defaultPreload:"intent",defaultPreloadStaleTime:0});React.lazy((()=>i.e(184).then(i.bind(i,6184)).then((t=>({default:t.ReactQueryDevtools}))))),document.addEventListener("DOMContentLoaded",(()=>{const e=document.getElementById("simplybook_app");e&&(Ut.defaultOptions.queries.suspense=!1,(0,t.createRoot)(e,{hydrate:!0,onRecoverableError:t=>{console.warn("Hydration error (usually harmless):",t)}}).render(React.createElement(React.StrictMode,null,React.createElement(m.Ht,{client:Qt},React.createElement(vt,{router:Wt}),!1))))}))})()})();
=======
<<<<<<< HEAD
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/Common/ErrorBoundary.jsx":
/*!*************************************************!*\
  !*** ./src/components/Common/ErrorBoundary.jsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);



class ErrorBoundary extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      copied: false
    };
    this.resetError = this.resetError.bind(this);
    this.copyError = this.copyError.bind(this);
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true
    };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // You can also log the error to an error reporting service
  }
  resetError() {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  }
  copyError() {
    navigator.clipboard.writeText(`${this.state.error && this.state.error.toString()}\nStack trace: ${this.state.errorInfo && this.state.errorInfo.componentStack}`);
    this.setState({
      copied: true
    });
  }
  render() {
    if (this.state.hasError) {
      return /*#__PURE__*/React.createElement("div", {
        className: "rounded-md bg-white p-5 text-black shadow-md"
      }, /*#__PURE__*/React.createElement("h3", {
        className: "mb-4 text-xl font-bold text-black"
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Uh-oh! We stumbled upon an error.", "simplybook")), /*#__PURE__*/React.createElement("div", {
        className: "mb-6 rounded-sm border bg-gray-50 p-4"
      }, /*#__PURE__*/React.createElement("p", {
        className: "mb-2 text-base text-black"
      }, this.state.error && this.state.error.toString()), /*#__PURE__*/React.createElement("p", {
        className: "max-h-48 overflow-x-scroll text-xs text-black"
      }, "Stack trace:", " ", this.state.errorInfo && this.state.errorInfo.componentStack), /*#__PURE__*/React.createElement("button", {
        className: `mt-4 rounded-md px-4 py-2 font-medium text-white ${this.state.copied ? "bg-green-500" : "bg-blue-500 hover:bg-blue-600"} focus:outline-hidden focus:ring-2 focus:ring-blue-500`,
        onClick: this.copyError
      }, this.state.copied ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Copied", "simplybook") : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Copy Error", "simplybook"))), /*#__PURE__*/React.createElement("p", {
        className: "mb-4 text-black"
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("We're sorry for the trouble. Please take a moment to report this issue on the WordPress forums so we can work on fixing it. Here’s how you can report the issue:", "simplybook")), /*#__PURE__*/React.createElement("ol", {
        className: "list-inside list-decimal space-y-2 text-black"
      }, /*#__PURE__*/React.createElement("li", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Copy the error details by clicking the %s button above.", "simplybook"), '"Copy Error"')), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
        href: "https://wordpress.org/support/plugin/simplybook/#new-topic-0",
        className: "text-blue-600 underline hover:text-blue-800"
      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Navigate to the Support Forum.", "simplybook"))), /*#__PURE__*/React.createElement("li", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("If you haven’t already, log in to your WordPress.org account or create a new account.", "simplybook")), /*#__PURE__*/React.createElement("li", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Once logged in, click on %s under the Burst Statistics forum.", "simplybook"), '"Create Topic"')), /*#__PURE__*/React.createElement("li", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Title: Mention %s along with a brief hint of the error.", "simplybook"), "'Error Encountered'")), /*#__PURE__*/React.createElement("li", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Description: Paste the copied error details and explain what you were doing when the error occurred.", "simplybook")), /*#__PURE__*/React.createElement("li", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Click %s to post your topic. Our team will look into the issue and provide assistance.", "simplybook"), '"Submit"'))));
    }
    return this.props.children;
  }
}
ErrorBoundary.propTypes = {
  children: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().node),
  fallback: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().node)
};
ErrorBoundary.displayName = "ErrorBoundary";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ErrorBoundary);

/***/ }),

/***/ "./src/routes/__root.jsx":
/*!*******************************!*\
  !*** ./src/routes/__root.jsx ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Route: () => (/* binding */ Route)
/* harmony export */ });
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/route.js");
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/Match.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Common_ErrorBoundary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Common/ErrorBoundary */ "./src/components/Common/ErrorBoundary.jsx");




const getData = async ({
  queryKey
}) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return false;
};

// Lazy load router devtools
const TanStackRouterDevtools = React.lazy(() => __webpack_require__.e(/*! import() */ "vendors-node_modules_tanstack_router-devtools_dist_esm_index_js").then(__webpack_require__.bind(__webpack_require__, /*! @tanstack/router-devtools */ "./node_modules/@tanstack/router-devtools/dist/esm/index.js")).then(d => ({
  default: d.TanStackRouterDevtools
})));
const Route = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_2__.createRootRoute)({
  component: () => {
    return /*#__PURE__*/React.createElement(_components_Common_ErrorBoundary__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/React.createElement(_tanstack_react_router__WEBPACK_IMPORTED_MODULE_3__.Outlet, null),  true && /*#__PURE__*/React.createElement(React.Suspense, null, /*#__PURE__*/React.createElement(TanStackRouterDevtools, null)));
  }
});

/***/ }),

/***/ "./src/routeTree.gen.ts":
/*!******************************!*\
  !*** ./src/routeTree.gen.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   routeTree: () => (/* binding */ routeTree)
/* harmony export */ });
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/fileRoute.js");
/* harmony import */ var _routes_root__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./routes/__root */ "./src/routes/__root.jsx");
/* eslint-disable */
// @ts-nocheck
// noinspection JSUnusedGlobalSymbols
// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

// Create Virtual Routes
var SettingsLazyImport = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_1__.createFileRoute)('/settings')();
var OnboardingLazyImport = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_1__.createFileRoute)('/onboarding')();
var IndexLazyImport = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_1__.createFileRoute)('/')();
var SettingsSettingsIdLazyImport = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_1__.createFileRoute)('/settings/$settingsId')();
var OnboardingTipsAndTricksLazyImport = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_1__.createFileRoute)('/onboarding/tips-and-tricks')();
var OnboardingStyleWidgetLazyImport = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_1__.createFileRoute)('/onboarding/style-widget')();
var OnboardingInformationCheckLazyImport = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_1__.createFileRoute)('/onboarding/information-check')();
var OnboardingImplementationLazyImport = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_1__.createFileRoute)('/onboarding/implementation')();
var OnboardingCreateYourAccountLazyImport = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_1__.createFileRoute)('/onboarding/create-your-account')();
var OnboardingConfirmEmailLazyImport = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_1__.createFileRoute)('/onboarding/confirm-email')();
// Create/Update Routes
var SettingsLazyRoute = SettingsLazyImport.update({
  id: '/settings',
  path: '/settings',
  getParentRoute: function () {
    return _routes_root__WEBPACK_IMPORTED_MODULE_0__.Route;
  }
}).lazy(function () {
  return Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_fortawesome_react-fontawesome_index_es_js-node_modules_react-compiler-ru-0e7758"), __webpack_require__.e("vendors-node_modules_radix-ui_react-label_dist_index_mjs-node_modules_radix-ui_react-select_d-f4b4ec"), __webpack_require__.e("vendors-node_modules_lodash_debounce_index_js-node_modules_tanstack_react-query_build_modern_-a1a10e"), __webpack_require__.e("vendors-node_modules_react-color_es_index_js-node_modules_radix-ui_react-popover_dist_index_mjs"), __webpack_require__.e("src_routes_settings_lazy_jsx")]).then(__webpack_require__.bind(__webpack_require__, /*! ./routes/settings.lazy */ "./src/routes/settings.lazy.jsx")).then(function (d) {
    return d.Route;
  });
});
var OnboardingLazyRoute = OnboardingLazyImport.update({
  id: '/onboarding',
  path: '/onboarding',
  getParentRoute: function () {
    return _routes_root__WEBPACK_IMPORTED_MODULE_0__.Route;
  }
}).lazy(function () {
  return Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_fortawesome_react-fontawesome_index_es_js-node_modules_react-compiler-ru-0e7758"), __webpack_require__.e("vendors-node_modules_radix-ui_react-label_dist_index_mjs-node_modules_radix-ui_react-select_d-f4b4ec"), __webpack_require__.e("src_routes_onboarding_lazy_jsx")]).then(__webpack_require__.bind(__webpack_require__, /*! ./routes/onboarding.lazy */ "./src/routes/onboarding.lazy.jsx")).then(function (d) {
    return d.Route;
  });
});
var IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: function () {
    return _routes_root__WEBPACK_IMPORTED_MODULE_0__.Route;
  }
}).lazy(function () {
  return Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_fortawesome_react-fontawesome_index_es_js-node_modules_react-compiler-ru-0e7758"), __webpack_require__.e("vendors-node_modules_lodash_debounce_index_js-node_modules_tanstack_react-query_build_modern_-a1a10e"), __webpack_require__.e("src_routes_index_lazy_jsx")]).then(__webpack_require__.bind(__webpack_require__, /*! ./routes/index.lazy */ "./src/routes/index.lazy.jsx")).then(function (d) {
    return d.Route;
  });
});
var SettingsSettingsIdLazyRoute = SettingsSettingsIdLazyImport.update({
  id: '/$settingsId',
  path: '/$settingsId',
  getParentRoute: function () {
    return SettingsLazyRoute;
  }
}).lazy(function () {
  return Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_fortawesome_react-fontawesome_index_es_js-node_modules_react-compiler-ru-0e7758"), __webpack_require__.e("vendors-node_modules_radix-ui_react-label_dist_index_mjs-node_modules_radix-ui_react-select_d-f4b4ec"), __webpack_require__.e("vendors-node_modules_lodash_debounce_index_js-node_modules_tanstack_react-query_build_modern_-a1a10e"), __webpack_require__.e("vendors-node_modules_react-color_es_index_js-node_modules_radix-ui_react-popover_dist_index_mjs"), __webpack_require__.e("src_hooks_useSettingsMenu_js-src_routes_settings_settingsId_lazy_jsx")]).then(__webpack_require__.bind(__webpack_require__, /*! ./routes/settings/$settingsId.lazy */ "./src/routes/settings/$settingsId.lazy.jsx")).then(function (d) {
    return d.Route;
  });
});
var OnboardingTipsAndTricksLazyRoute = OnboardingTipsAndTricksLazyImport.update({
  id: '/tips-and-tricks',
  path: '/tips-and-tricks',
  getParentRoute: function () {
    return OnboardingLazyRoute;
  }
}).lazy(function () {
  return Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_fortawesome_react-fontawesome_index_es_js-node_modules_react-compiler-ru-0e7758"), __webpack_require__.e("vendors-node_modules_radix-ui_react-label_dist_index_mjs-node_modules_radix-ui_react-select_d-f4b4ec"), __webpack_require__.e("vendors-node_modules_lodash_debounce_index_js-node_modules_tanstack_react-query_build_modern_-a1a10e"), __webpack_require__.e("vendors-node_modules_react-color_es_index_js-node_modules_radix-ui_react-popover_dist_index_mjs"), __webpack_require__.e("src_routes_onboarding_tips-and-tricks_lazy_jsx")]).then(__webpack_require__.bind(__webpack_require__, /*! ./routes/onboarding/tips-and-tricks.lazy */ "./src/routes/onboarding/tips-and-tricks.lazy.jsx")).then(function (d) {
    return d.Route;
  });
});
var OnboardingStyleWidgetLazyRoute = OnboardingStyleWidgetLazyImport.update({
  id: '/style-widget',
  path: '/style-widget',
  getParentRoute: function () {
    return OnboardingLazyRoute;
  }
}).lazy(function () {
  return Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_fortawesome_react-fontawesome_index_es_js-node_modules_react-compiler-ru-0e7758"), __webpack_require__.e("vendors-node_modules_radix-ui_react-label_dist_index_mjs-node_modules_radix-ui_react-select_d-f4b4ec"), __webpack_require__.e("vendors-node_modules_lodash_debounce_index_js-node_modules_tanstack_react-query_build_modern_-a1a10e"), __webpack_require__.e("vendors-node_modules_react-color_es_index_js-node_modules_radix-ui_react-popover_dist_index_mjs"), __webpack_require__.e("src_routes_onboarding_style-widget_lazy_jsx")]).then(__webpack_require__.bind(__webpack_require__, /*! ./routes/onboarding/style-widget.lazy */ "./src/routes/onboarding/style-widget.lazy.jsx")).then(function (d) {
    return d.Route;
  });
});
var OnboardingInformationCheckLazyRoute = OnboardingInformationCheckLazyImport.update({
  id: '/information-check',
  path: '/information-check',
  getParentRoute: function () {
    return OnboardingLazyRoute;
  }
}).lazy(function () {
  return Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_fortawesome_react-fontawesome_index_es_js-node_modules_react-compiler-ru-0e7758"), __webpack_require__.e("vendors-node_modules_radix-ui_react-label_dist_index_mjs-node_modules_radix-ui_react-select_d-f4b4ec"), __webpack_require__.e("vendors-node_modules_lodash_debounce_index_js-node_modules_tanstack_react-query_build_modern_-a1a10e"), __webpack_require__.e("vendors-node_modules_react-color_es_index_js-node_modules_radix-ui_react-popover_dist_index_mjs"), __webpack_require__.e("src_routes_onboarding_information-check_lazy_jsx")]).then(__webpack_require__.bind(__webpack_require__, /*! ./routes/onboarding/information-check.lazy */ "./src/routes/onboarding/information-check.lazy.jsx")).then(function (d) {
    return d.Route;
  });
});
var OnboardingImplementationLazyRoute = OnboardingImplementationLazyImport.update({
  id: '/implementation',
  path: '/implementation',
  getParentRoute: function () {
    return OnboardingLazyRoute;
  }
}).lazy(function () {
  return Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_fortawesome_react-fontawesome_index_es_js-node_modules_react-compiler-ru-0e7758"), __webpack_require__.e("vendors-node_modules_radix-ui_react-label_dist_index_mjs-node_modules_radix-ui_react-select_d-f4b4ec"), __webpack_require__.e("vendors-node_modules_lodash_debounce_index_js-node_modules_tanstack_react-query_build_modern_-a1a10e"), __webpack_require__.e("vendors-node_modules_react-color_es_index_js-node_modules_radix-ui_react-popover_dist_index_mjs"), __webpack_require__.e("src_routes_onboarding_implementation_lazy_jsx")]).then(__webpack_require__.bind(__webpack_require__, /*! ./routes/onboarding/implementation.lazy */ "./src/routes/onboarding/implementation.lazy.jsx")).then(function (d) {
    return d.Route;
  });
});
var OnboardingCreateYourAccountLazyRoute = OnboardingCreateYourAccountLazyImport.update({
  id: '/create-your-account',
  path: '/create-your-account',
  getParentRoute: function () {
    return OnboardingLazyRoute;
  }
}).lazy(function () {
  return Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_fortawesome_react-fontawesome_index_es_js-node_modules_react-compiler-ru-0e7758"), __webpack_require__.e("vendors-node_modules_radix-ui_react-label_dist_index_mjs-node_modules_radix-ui_react-select_d-f4b4ec"), __webpack_require__.e("vendors-node_modules_lodash_debounce_index_js-node_modules_tanstack_react-query_build_modern_-a1a10e"), __webpack_require__.e("vendors-node_modules_react-color_es_index_js-node_modules_radix-ui_react-popover_dist_index_mjs"), __webpack_require__.e("src_routes_onboarding_create-your-account_lazy_jsx")]).then(__webpack_require__.bind(__webpack_require__, /*! ./routes/onboarding/create-your-account.lazy */ "./src/routes/onboarding/create-your-account.lazy.jsx")).then(function (d) {
    return d.Route;
  });
});
var OnboardingConfirmEmailLazyRoute = OnboardingConfirmEmailLazyImport.update({
  id: '/confirm-email',
  path: '/confirm-email',
  getParentRoute: function () {
    return OnboardingLazyRoute;
  }
}).lazy(function () {
  return Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_fortawesome_react-fontawesome_index_es_js-node_modules_react-compiler-ru-0e7758"), __webpack_require__.e("vendors-node_modules_radix-ui_react-label_dist_index_mjs-node_modules_radix-ui_react-select_d-f4b4ec"), __webpack_require__.e("vendors-node_modules_lodash_debounce_index_js-node_modules_tanstack_react-query_build_modern_-a1a10e"), __webpack_require__.e("vendors-node_modules_react-color_es_index_js-node_modules_radix-ui_react-popover_dist_index_mjs"), __webpack_require__.e("src_routes_onboarding_confirm-email_lazy_jsx")]).then(__webpack_require__.bind(__webpack_require__, /*! ./routes/onboarding/confirm-email.lazy */ "./src/routes/onboarding/confirm-email.lazy.jsx")).then(function (d) {
    return d.Route;
  });
});
var OnboardingLazyRouteChildren = {
  OnboardingConfirmEmailLazyRoute: OnboardingConfirmEmailLazyRoute,
  OnboardingCreateYourAccountLazyRoute: OnboardingCreateYourAccountLazyRoute,
  OnboardingImplementationLazyRoute: OnboardingImplementationLazyRoute,
  OnboardingInformationCheckLazyRoute: OnboardingInformationCheckLazyRoute,
  OnboardingStyleWidgetLazyRoute: OnboardingStyleWidgetLazyRoute,
  OnboardingTipsAndTricksLazyRoute: OnboardingTipsAndTricksLazyRoute
};
var OnboardingLazyRouteWithChildren = OnboardingLazyRoute._addFileChildren(OnboardingLazyRouteChildren);
var SettingsLazyRouteChildren = {
  SettingsSettingsIdLazyRoute: SettingsSettingsIdLazyRoute
};
var SettingsLazyRouteWithChildren = SettingsLazyRoute._addFileChildren(SettingsLazyRouteChildren);
var rootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  OnboardingLazyRoute: OnboardingLazyRouteWithChildren,
  SettingsLazyRoute: SettingsLazyRouteWithChildren
};
var routeTree = _routes_root__WEBPACK_IMPORTED_MODULE_0__.Route._addFileChildren(rootRouteChildren)._addFileTypes();
/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.jsx",
      "children": [
        "/",
        "/onboarding",
        "/settings"
      ]
    },
    "/": {
      "filePath": "index.lazy.jsx"
    },
    "/onboarding": {
      "filePath": "onboarding.lazy.jsx",
      "children": [
        "/onboarding/confirm-email",
        "/onboarding/create-your-account",
        "/onboarding/implementation",
        "/onboarding/information-check",
        "/onboarding/style-widget",
        "/onboarding/tips-and-tricks"
      ]
    },
    "/settings": {
      "filePath": "settings.lazy.jsx",
      "children": [
        "/settings/$settingsId"
      ]
    },
    "/onboarding/confirm-email": {
      "filePath": "onboarding/confirm-email.lazy.jsx",
      "parent": "/onboarding"
    },
    "/onboarding/create-your-account": {
      "filePath": "onboarding/create-your-account.lazy.jsx",
      "parent": "/onboarding"
    },
    "/onboarding/implementation": {
      "filePath": "onboarding/implementation.lazy.jsx",
      "parent": "/onboarding"
    },
    "/onboarding/information-check": {
      "filePath": "onboarding/information-check.lazy.jsx",
      "parent": "/onboarding"
    },
    "/onboarding/style-widget": {
      "filePath": "onboarding/style-widget.lazy.jsx",
      "parent": "/onboarding"
    },
    "/onboarding/tips-and-tricks": {
      "filePath": "onboarding/tips-and-tricks.lazy.jsx",
      "parent": "/onboarding"
    },
    "/settings/$settingsId": {
      "filePath": "settings/$settingsId.lazy.jsx",
      "parent": "/settings"
    }
  }
}
ROUTE_MANIFEST_END */

/***/ }),

/***/ "./node_modules/jsesc/jsesc.js":
/*!*************************************!*\
  !*** ./node_modules/jsesc/jsesc.js ***!
  \*************************************/
/***/ ((module) => {

"use strict";


const object = {};
const hasOwnProperty = object.hasOwnProperty;
const forOwn = (object, callback) => {
	for (const key in object) {
		if (hasOwnProperty.call(object, key)) {
			callback(key, object[key]);
		}
	}
};

const extend = (destination, source) => {
	if (!source) {
		return destination;
	}
	forOwn(source, (key, value) => {
		destination[key] = value;
	});
	return destination;
};

const forEach = (array, callback) => {
	const length = array.length;
	let index = -1;
	while (++index < length) {
		callback(array[index]);
	}
};

const fourHexEscape = (hex) => {
	return '\\u' + ('0000' + hex).slice(-4);
}

const hexadecimal = (code, lowercase) => {
	let hexadecimal = code.toString(16);
	if (lowercase) return hexadecimal;
	return hexadecimal.toUpperCase();
};

const toString = object.toString;
const isArray = Array.isArray;
const isBuffer = (value) => {
	return typeof Buffer === 'function' && Buffer.isBuffer(value);
};
const isObject = (value) => {
	// This is a very simple check, but it’s good enough for what we need.
	return toString.call(value) == '[object Object]';
};
const isString = (value) => {
	return typeof value == 'string' ||
		toString.call(value) == '[object String]';
};
const isNumber = (value) => {
	return typeof value == 'number' ||
		toString.call(value) == '[object Number]';
};
const isBigInt = (value) => {
  return typeof value == 'bigint';
};
const isFunction = (value) => {
	return typeof value == 'function';
};
const isMap = (value) => {
	return toString.call(value) == '[object Map]';
};
const isSet = (value) => {
	return toString.call(value) == '[object Set]';
};

/*--------------------------------------------------------------------------*/

// https://mathiasbynens.be/notes/javascript-escapes#single
const singleEscapes = {
	'\\': '\\\\',
	'\b': '\\b',
	'\f': '\\f',
	'\n': '\\n',
	'\r': '\\r',
	'\t': '\\t'
	// `\v` is omitted intentionally, because in IE < 9, '\v' == 'v'.
	// '\v': '\\x0B'
};
const regexSingleEscape = /[\\\b\f\n\r\t]/;

const regexDigit = /[0-9]/;
const regexWhitespace = /[\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/;

const escapeEverythingRegex = /([\uD800-\uDBFF][\uDC00-\uDFFF])|([\uD800-\uDFFF])|(['"`])|[^]/g;
const escapeNonAsciiRegex = /([\uD800-\uDBFF][\uDC00-\uDFFF])|([\uD800-\uDFFF])|(['"`])|[^ !#-&\(-\[\]-_a-~]/g;

const jsesc = (argument, options) => {
	const increaseIndentation = () => {
		oldIndent = indent;
		++options.indentLevel;
		indent = options.indent.repeat(options.indentLevel)
	};
	// Handle options
	const defaults = {
		'escapeEverything': false,
		'minimal': false,
		'isScriptContext': false,
		'quotes': 'single',
		'wrap': false,
		'es6': false,
		'json': false,
		'compact': true,
		'lowercaseHex': false,
		'numbers': 'decimal',
		'indent': '\t',
		'indentLevel': 0,
		'__inline1__': false,
		'__inline2__': false
	};
	const json = options && options.json;
	if (json) {
		defaults.quotes = 'double';
		defaults.wrap = true;
	}
	options = extend(defaults, options);
	if (
		options.quotes != 'single' &&
		options.quotes != 'double' &&
		options.quotes != 'backtick'
	) {
		options.quotes = 'single';
	}
	const quote = options.quotes == 'double' ?
		'"' :
		(options.quotes == 'backtick' ?
			'`' :
			'\''
		);
	const compact = options.compact;
	const lowercaseHex = options.lowercaseHex;
	let indent = options.indent.repeat(options.indentLevel);
	let oldIndent = '';
	const inline1 = options.__inline1__;
	const inline2 = options.__inline2__;
	const newLine = compact ? '' : '\n';
	let result;
	let isEmpty = true;
	const useBinNumbers = options.numbers == 'binary';
	const useOctNumbers = options.numbers == 'octal';
	const useDecNumbers = options.numbers == 'decimal';
	const useHexNumbers = options.numbers == 'hexadecimal';

	if (json && argument && isFunction(argument.toJSON)) {
		argument = argument.toJSON();
	}

	if (!isString(argument)) {
		if (isMap(argument)) {
			if (argument.size == 0) {
				return 'new Map()';
			}
			if (!compact) {
				options.__inline1__ = true;
				options.__inline2__ = false;
			}
			return 'new Map(' + jsesc(Array.from(argument), options) + ')';
		}
		if (isSet(argument)) {
			if (argument.size == 0) {
				return 'new Set()';
			}
			return 'new Set(' + jsesc(Array.from(argument), options) + ')';
		}
		if (isBuffer(argument)) {
			if (argument.length == 0) {
				return 'Buffer.from([])';
			}
			return 'Buffer.from(' + jsesc(Array.from(argument), options) + ')';
		}
		if (isArray(argument)) {
			result = [];
			options.wrap = true;
			if (inline1) {
				options.__inline1__ = false;
				options.__inline2__ = true;
			}
			if (!inline2) {
				increaseIndentation();
			}
			forEach(argument, (value) => {
				isEmpty = false;
				if (inline2) {
					options.__inline2__ = false;
				}
				result.push(
					(compact || inline2 ? '' : indent) +
					jsesc(value, options)
				);
			});
			if (isEmpty) {
				return '[]';
			}
			if (inline2) {
				return '[' + result.join(', ') + ']';
			}
			return '[' + newLine + result.join(',' + newLine) + newLine +
				(compact ? '' : oldIndent) + ']';
		} else if (isNumber(argument) || isBigInt(argument)) {
			if (json) {
				// Some number values (e.g. `Infinity`) cannot be represented in JSON.
				// `BigInt` values less than `-Number.MAX_VALUE` or greater than
        // `Number.MAX_VALUE` cannot be represented in JSON so they will become
        // `-Infinity` or `Infinity`, respectively, and then become `null` when
        // stringified.
				return JSON.stringify(Number(argument));
			}

      let result;
			if (useDecNumbers) {
				result = String(argument);
			} else if (useHexNumbers) {
				let hexadecimal = argument.toString(16);
				if (!lowercaseHex) {
					hexadecimal = hexadecimal.toUpperCase();
				}
				result = '0x' + hexadecimal;
			} else if (useBinNumbers) {
				result = '0b' + argument.toString(2);
			} else if (useOctNumbers) {
				result = '0o' + argument.toString(8);
			}

      if (isBigInt(argument)) {
        return result + 'n';
      }
      return result;
		} else if (isBigInt(argument)) {
			if (json) {
				// `BigInt` values less than `-Number.MAX_VALUE` or greater than
        // `Number.MAX_VALUE` will become `-Infinity` or `Infinity`,
        // respectively, and cannot be represented in JSON.
				return JSON.stringify(Number(argument));
			}
      return argument + 'n';
    } else if (!isObject(argument)) {
			if (json) {
				// For some values (e.g. `undefined`, `function` objects),
				// `JSON.stringify(value)` returns `undefined` (which isn’t valid
				// JSON) instead of `'null'`.
				return JSON.stringify(argument) || 'null';
			}
			return String(argument);
		} else { // it’s an object
			result = [];
			options.wrap = true;
			increaseIndentation();
			forOwn(argument, (key, value) => {
				isEmpty = false;
				result.push(
					(compact ? '' : indent) +
					jsesc(key, options) + ':' +
					(compact ? '' : ' ') +
					jsesc(value, options)
				);
			});
			if (isEmpty) {
				return '{}';
			}
			return '{' + newLine + result.join(',' + newLine) + newLine +
				(compact ? '' : oldIndent) + '}';
		}
	}

	const regex = options.escapeEverything ? escapeEverythingRegex : escapeNonAsciiRegex;
	result = argument.replace(regex, (char, pair, lone, quoteChar, index, string) => {
		if (pair) {
			if (options.minimal) return pair;
			const first = pair.charCodeAt(0);
			const second = pair.charCodeAt(1);
			if (options.es6) {
				// https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
				const codePoint = (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
				const hex = hexadecimal(codePoint, lowercaseHex);
				return '\\u{' + hex + '}';
			}
			return fourHexEscape(hexadecimal(first, lowercaseHex)) + fourHexEscape(hexadecimal(second, lowercaseHex));
		}

		if (lone) {
			return fourHexEscape(hexadecimal(lone.charCodeAt(0), lowercaseHex));
		}

		if (
			char == '\0' &&
			!json &&
			!regexDigit.test(string.charAt(index + 1))
		) {
			return '\\0';
		}

		if (quoteChar) {
			if (quoteChar == quote || options.escapeEverything) {
				return '\\' + quoteChar;
			}
			return quoteChar;
		}

		if (regexSingleEscape.test(char)) {
			// no need for a `hasOwnProperty` check here
			return singleEscapes[char];
		}

		if (options.minimal && !regexWhitespace.test(char)) {
			return char;
		}

		const hex = hexadecimal(char.charCodeAt(0), lowercaseHex);
		if (json || hex.length > 2) {
			return fourHexEscape(hex);
		}

		return '\\x' + ('00' + hex).slice(-2);
	});

	if (quote == '`') {
		result = result.replace(/\$\{/g, '\\${');
	}
	if (options.isScriptContext) {
		// https://mathiasbynens.be/notes/etago
		result = result
			.replace(/<\/(script|style)/gi, '<\\/$1')
			.replace(/<!--/g, json ? '\\u003C!--' : '\\x3C!--');
	}
	if (options.wrap) {
		result = quote + result + quote;
	}
	return result;
};

jsesc.version = '3.0.2';

module.exports = jsesc;


/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "./node_modules/prop-types/checkPropTypes.js":
/*!***************************************************!*\
  !*** ./node_modules/prop-types/checkPropTypes.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var printWarning = function() {};

if (true) {
  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
  var loggedTypeFailures = {};
  var has = __webpack_require__(/*! ./lib/has */ "./node_modules/prop-types/lib/has.js");

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) { /**/ }
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' +
              'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (true) {
    loggedTypeFailures = {};
  }
}

module.exports = checkPropTypes;


/***/ }),

/***/ "./node_modules/prop-types/factoryWithTypeCheckers.js":
/*!************************************************************!*\
  !*** ./node_modules/prop-types/factoryWithTypeCheckers.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/prop-types/node_modules/react-is/index.js");
var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
var has = __webpack_require__(/*! ./lib/has */ "./node_modules/prop-types/lib/has.js");
var checkPropTypes = __webpack_require__(/*! ./checkPropTypes */ "./node_modules/prop-types/checkPropTypes.js");

var printWarning = function() {};

if (true) {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bigint: createPrimitiveTypeChecker('bigint'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message, data) {
    this.message = message;
    this.data = data && typeof data === 'object' ? data: {};
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (true) {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if ( true && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError(
          'Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'),
          {expectedType: expectedType}
        );
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!ReactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (true) {
        if (arguments.length > 1) {
          printWarning(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
       true ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      var expectedTypes = [];
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        var checkerResult = checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
        if (checkerResult == null) {
          return null;
        }
        if (checkerResult.data && has(checkerResult.data, 'expectedType')) {
          expectedTypes.push(checkerResult.data.expectedType);
        }
      }
      var expectedTypesMessage = (expectedTypes.length > 0) ? ', expected one of type [' + expectedTypes.join(', ') + ']': '';
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`' + expectedTypesMessage + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function invalidValidatorError(componentName, location, propFullName, key, type) {
    return new PropTypeError(
      (componentName || 'React class') + ': ' + location + ' type `' + propFullName + '.' + key + '` is invalid; ' +
      'it must be a function, usually from the `prop-types` package, but received `' + type + '`.'
    );
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (has(shapeTypes, key) && typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ "./node_modules/prop-types/index.js":
/*!******************************************!*\
  !*** ./node_modules/prop-types/index.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (true) {
  var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/prop-types/node_modules/react-is/index.js");

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ "./node_modules/prop-types/factoryWithTypeCheckers.js")(ReactIs.isElement, throwOnDirectAccess);
} else {}


/***/ }),

/***/ "./node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!*************************************************************!*\
  !*** ./node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \*************************************************************/
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ "./node_modules/prop-types/lib/has.js":
/*!********************************************!*\
  !*** ./node_modules/prop-types/lib/has.js ***!
  \********************************************/
/***/ ((module) => {

module.exports = Function.call.bind(Object.prototype.hasOwnProperty);


/***/ }),

/***/ "./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}


/***/ }),

/***/ "./node_modules/prop-types/node_modules/react-is/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/prop-types/node_modules/react-is/index.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js");
}


/***/ }),

/***/ "./node_modules/tiny-warning/dist/tiny-warning.esm.js":
/*!************************************************************!*\
  !*** ./node_modules/tiny-warning/dist/tiny-warning.esm.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var isProduction = "development" === 'production';
function warning(condition, message) {
  if (!isProduction) {
    if (condition) {
      return;
    }

    var text = "Warning: " + message;

    if (typeof console !== 'undefined') {
      console.warn(text);
    }

    try {
      throw Error(text);
    } catch (x) {}
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (warning);


/***/ }),

/***/ "./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


 true &&
  (function () {
    function is(x, y) {
      return (x === y && (0 !== x || 1 / x === 1 / y)) || (x !== x && y !== y);
    }
    function useSyncExternalStore$2(subscribe, getSnapshot) {
      didWarnOld18Alpha ||
        void 0 === React.startTransition ||
        ((didWarnOld18Alpha = !0),
        console.error(
          "You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."
        ));
      var value = getSnapshot();
      if (!didWarnUncachedGetSnapshot) {
        var cachedValue = getSnapshot();
        objectIs(value, cachedValue) ||
          (console.error(
            "The result of getSnapshot should be cached to avoid an infinite loop"
          ),
          (didWarnUncachedGetSnapshot = !0));
      }
      cachedValue = useState({
        inst: { value: value, getSnapshot: getSnapshot }
      });
      var inst = cachedValue[0].inst,
        forceUpdate = cachedValue[1];
      useLayoutEffect(
        function () {
          inst.value = value;
          inst.getSnapshot = getSnapshot;
          checkIfSnapshotChanged(inst) && forceUpdate({ inst: inst });
        },
        [subscribe, value, getSnapshot]
      );
      useEffect(
        function () {
          checkIfSnapshotChanged(inst) && forceUpdate({ inst: inst });
          return subscribe(function () {
            checkIfSnapshotChanged(inst) && forceUpdate({ inst: inst });
          });
        },
        [subscribe]
      );
      useDebugValue(value);
      return value;
    }
    function checkIfSnapshotChanged(inst) {
      var latestGetSnapshot = inst.getSnapshot;
      inst = inst.value;
      try {
        var nextValue = latestGetSnapshot();
        return !objectIs(inst, nextValue);
      } catch (error) {
        return !0;
      }
    }
    function useSyncExternalStore$1(subscribe, getSnapshot) {
      return getSnapshot();
    }
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
      "function" ===
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart &&
      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var React = __webpack_require__(/*! react */ "react"),
      objectIs = "function" === typeof Object.is ? Object.is : is,
      useState = React.useState,
      useEffect = React.useEffect,
      useLayoutEffect = React.useLayoutEffect,
      useDebugValue = React.useDebugValue,
      didWarnOld18Alpha = !1,
      didWarnUncachedGetSnapshot = !1,
      shim =
        "undefined" === typeof window ||
        "undefined" === typeof window.document ||
        "undefined" === typeof window.document.createElement
          ? useSyncExternalStore$1
          : useSyncExternalStore$2;
    exports.useSyncExternalStore =
      void 0 !== React.useSyncExternalStore ? React.useSyncExternalStore : shim;
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
      "function" ===
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop &&
      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })();


/***/ }),

/***/ "./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js":
/*!************************************************************************************************************!*\
  !*** ./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * @license React
 * use-sync-external-store-shim/with-selector.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


 true &&
  (function () {
    function is(x, y) {
      return (x === y && (0 !== x || 1 / x === 1 / y)) || (x !== x && y !== y);
    }
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
      "function" ===
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart &&
      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var React = __webpack_require__(/*! react */ "react"),
      shim = __webpack_require__(/*! use-sync-external-store/shim */ "./node_modules/use-sync-external-store/shim/index.js"),
      objectIs = "function" === typeof Object.is ? Object.is : is,
      useSyncExternalStore = shim.useSyncExternalStore,
      useRef = React.useRef,
      useEffect = React.useEffect,
      useMemo = React.useMemo,
      useDebugValue = React.useDebugValue;
    exports.useSyncExternalStoreWithSelector = function (
      subscribe,
      getSnapshot,
      getServerSnapshot,
      selector,
      isEqual
    ) {
      var instRef = useRef(null);
      if (null === instRef.current) {
        var inst = { hasValue: !1, value: null };
        instRef.current = inst;
      } else inst = instRef.current;
      instRef = useMemo(
        function () {
          function memoizedSelector(nextSnapshot) {
            if (!hasMemo) {
              hasMemo = !0;
              memoizedSnapshot = nextSnapshot;
              nextSnapshot = selector(nextSnapshot);
              if (void 0 !== isEqual && inst.hasValue) {
                var currentSelection = inst.value;
                if (isEqual(currentSelection, nextSnapshot))
                  return (memoizedSelection = currentSelection);
              }
              return (memoizedSelection = nextSnapshot);
            }
            currentSelection = memoizedSelection;
            if (objectIs(memoizedSnapshot, nextSnapshot))
              return currentSelection;
            var nextSelection = selector(nextSnapshot);
            if (void 0 !== isEqual && isEqual(currentSelection, nextSelection))
              return (memoizedSnapshot = nextSnapshot), currentSelection;
            memoizedSnapshot = nextSnapshot;
            return (memoizedSelection = nextSelection);
          }
          var hasMemo = !1,
            memoizedSnapshot,
            memoizedSelection,
            maybeGetServerSnapshot =
              void 0 === getServerSnapshot ? null : getServerSnapshot;
          return [
            function () {
              return memoizedSelector(getSnapshot());
            },
            null === maybeGetServerSnapshot
              ? void 0
              : function () {
                  return memoizedSelector(maybeGetServerSnapshot());
                }
          ];
        },
        [getSnapshot, getServerSnapshot, selector, isEqual]
      );
      var value = useSyncExternalStore(subscribe, instRef[0], instRef[1]);
      useEffect(
        function () {
          inst.hasValue = !0;
          inst.value = value;
        },
        [value]
      );
      useDebugValue(value);
      return value;
    };
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
      "function" ===
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop &&
      __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })();


/***/ }),

/***/ "./node_modules/use-sync-external-store/shim/index.js":
/*!************************************************************!*\
  !*** ./node_modules/use-sync-external-store/shim/index.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ../cjs/use-sync-external-store-shim.development.js */ "./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js");
}


/***/ }),

/***/ "./node_modules/use-sync-external-store/shim/with-selector.js":
/*!********************************************************************!*\
  !*** ./node_modules/use-sync-external-store/shim/with-selector.js ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ../cjs/use-sync-external-store-shim/with-selector.development.js */ "./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.development.js");
}


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = window["React"];

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = window["ReactDOM"];

/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["ReactJSXRuntime"];

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./node_modules/@tanstack/history/dist/esm/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@tanstack/history/dist/esm/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createBrowserHistory: () => (/* binding */ createBrowserHistory),
/* harmony export */   createHashHistory: () => (/* binding */ createHashHistory),
/* harmony export */   createHistory: () => (/* binding */ createHistory),
/* harmony export */   createMemoryHistory: () => (/* binding */ createMemoryHistory),
/* harmony export */   parseHref: () => (/* binding */ parseHref)
/* harmony export */ });
const stateIndexKey = "__TSR_index";
const popStateEvent = "popstate";
const beforeUnloadEvent = "beforeunload";
function createHistory(opts) {
  let location = opts.getLocation();
  const subscribers = /* @__PURE__ */ new Set();
  const notify = (action) => {
    location = opts.getLocation();
    subscribers.forEach((subscriber) => subscriber({ location, action }));
  };
  const handleIndexChange = (action) => {
    if (opts.notifyOnIndexChange ?? true) notify(action);
    else location = opts.getLocation();
  };
  const tryNavigation = async ({
    task,
    navigateOpts,
    ...actionInfo
  }) => {
    var _a, _b;
    const ignoreBlocker = (navigateOpts == null ? void 0 : navigateOpts.ignoreBlocker) ?? false;
    if (ignoreBlocker) {
      task();
      return;
    }
    const blockers = ((_a = opts.getBlockers) == null ? void 0 : _a.call(opts)) ?? [];
    const isPushOrReplace = actionInfo.type === "PUSH" || actionInfo.type === "REPLACE";
    if (typeof document !== "undefined" && blockers.length && isPushOrReplace) {
      for (const blocker of blockers) {
        const nextLocation = parseHref(actionInfo.path, actionInfo.state);
        const isBlocked = await blocker.blockerFn({
          currentLocation: location,
          nextLocation,
          action: actionInfo.type
        });
        if (isBlocked) {
          (_b = opts.onBlocked) == null ? void 0 : _b.call(opts);
          return;
        }
      }
    }
    task();
  };
  return {
    get location() {
      return location;
    },
    get length() {
      return opts.getLength();
    },
    subscribers,
    subscribe: (cb) => {
      subscribers.add(cb);
      return () => {
        subscribers.delete(cb);
      };
    },
    push: (path, state, navigateOpts) => {
      const currentIndex = location.state[stateIndexKey];
      state = assignKeyAndIndex(currentIndex + 1, state);
      tryNavigation({
        task: () => {
          opts.pushState(path, state);
          notify({ type: "PUSH" });
        },
        navigateOpts,
        type: "PUSH",
        path,
        state
      });
    },
    replace: (path, state, navigateOpts) => {
      const currentIndex = location.state[stateIndexKey];
      state = assignKeyAndIndex(currentIndex, state);
      tryNavigation({
        task: () => {
          opts.replaceState(path, state);
          notify({ type: "REPLACE" });
        },
        navigateOpts,
        type: "REPLACE",
        path,
        state
      });
    },
    go: (index, navigateOpts) => {
      tryNavigation({
        task: () => {
          opts.go(index);
          handleIndexChange({ type: "GO", index });
        },
        navigateOpts,
        type: "GO"
      });
    },
    back: (navigateOpts) => {
      tryNavigation({
        task: () => {
          opts.back((navigateOpts == null ? void 0 : navigateOpts.ignoreBlocker) ?? false);
          handleIndexChange({ type: "BACK" });
        },
        navigateOpts,
        type: "BACK"
      });
    },
    forward: (navigateOpts) => {
      tryNavigation({
        task: () => {
          opts.forward((navigateOpts == null ? void 0 : navigateOpts.ignoreBlocker) ?? false);
          handleIndexChange({ type: "FORWARD" });
        },
        navigateOpts,
        type: "FORWARD"
      });
    },
    canGoBack: () => location.state[stateIndexKey] !== 0,
    createHref: (str) => opts.createHref(str),
    block: (blocker) => {
      var _a;
      if (!opts.setBlockers) return () => {
      };
      const blockers = ((_a = opts.getBlockers) == null ? void 0 : _a.call(opts)) ?? [];
      opts.setBlockers([...blockers, blocker]);
      return () => {
        var _a2, _b;
        const blockers2 = ((_a2 = opts.getBlockers) == null ? void 0 : _a2.call(opts)) ?? [];
        (_b = opts.setBlockers) == null ? void 0 : _b.call(opts, blockers2.filter((b) => b !== blocker));
      };
    },
    flush: () => {
      var _a;
      return (_a = opts.flush) == null ? void 0 : _a.call(opts);
    },
    destroy: () => {
      var _a;
      return (_a = opts.destroy) == null ? void 0 : _a.call(opts);
    },
    notify
  };
}
function assignKeyAndIndex(index, state) {
  if (!state) {
    state = {};
  }
  return {
    ...state,
    key: createRandomKey(),
    [stateIndexKey]: index
  };
}
function createBrowserHistory(opts) {
  var _a;
  const win = (opts == null ? void 0 : opts.window) ?? (typeof document !== "undefined" ? window : void 0);
  const originalPushState = win.history.pushState;
  const originalReplaceState = win.history.replaceState;
  let blockers = [];
  const _getBlockers = () => blockers;
  const _setBlockers = (newBlockers) => blockers = newBlockers;
  const createHref = (opts == null ? void 0 : opts.createHref) ?? ((path) => path);
  const parseLocation = (opts == null ? void 0 : opts.parseLocation) ?? (() => parseHref(
    `${win.location.pathname}${win.location.search}${win.location.hash}`,
    win.history.state
  ));
  if (!((_a = win.history.state) == null ? void 0 : _a.key)) {
    win.history.replaceState(
      {
        [stateIndexKey]: 0,
        key: createRandomKey()
      },
      ""
    );
  }
  let currentLocation = parseLocation();
  let rollbackLocation;
  let nextPopIsGo = false;
  let ignoreNextPop = false;
  let skipBlockerNextPop = false;
  let ignoreNextBeforeUnload = false;
  const getLocation = () => currentLocation;
  let next;
  let scheduled;
  const flush = () => {
    if (!next) {
      return;
    }
    history._ignoreSubscribers = true;
    (next.isPush ? win.history.pushState : win.history.replaceState)(
      next.state,
      "",
      next.href
    );
    history._ignoreSubscribers = false;
    next = void 0;
    scheduled = void 0;
    rollbackLocation = void 0;
  };
  const queueHistoryAction = (type, destHref, state) => {
    const href = createHref(destHref);
    if (!scheduled) {
      rollbackLocation = currentLocation;
    }
    currentLocation = parseHref(destHref, state);
    next = {
      href,
      state,
      isPush: (next == null ? void 0 : next.isPush) || type === "push"
    };
    if (!scheduled) {
      scheduled = Promise.resolve().then(() => flush());
    }
  };
  const onPushPop = (type) => {
    currentLocation = parseLocation();
    history.notify({ type });
  };
  const onPushPopEvent = async () => {
    if (ignoreNextPop) {
      ignoreNextPop = false;
      return;
    }
    const nextLocation = parseLocation();
    const delta = nextLocation.state[stateIndexKey] - currentLocation.state[stateIndexKey];
    const isForward = delta === 1;
    const isBack = delta === -1;
    const isGo = !isForward && !isBack || nextPopIsGo;
    nextPopIsGo = false;
    const action = isGo ? "GO" : isBack ? "BACK" : "FORWARD";
    const notify = isGo ? {
      type: "GO",
      index: delta
    } : {
      type: isBack ? "BACK" : "FORWARD"
    };
    if (skipBlockerNextPop) {
      skipBlockerNextPop = false;
    } else {
      const blockers2 = _getBlockers();
      if (typeof document !== "undefined" && blockers2.length) {
        for (const blocker of blockers2) {
          const isBlocked = await blocker.blockerFn({
            currentLocation,
            nextLocation,
            action
          });
          if (isBlocked) {
            ignoreNextPop = true;
            win.history.go(1);
            history.notify(notify);
            return;
          }
        }
      }
    }
    currentLocation = parseLocation();
    history.notify(notify);
  };
  const onBeforeUnload = (e) => {
    if (ignoreNextBeforeUnload) {
      ignoreNextBeforeUnload = false;
      return;
    }
    let shouldBlock = false;
    const blockers2 = _getBlockers();
    if (typeof document !== "undefined" && blockers2.length) {
      for (const blocker of blockers2) {
        const shouldHaveBeforeUnload = blocker.enableBeforeUnload ?? true;
        if (shouldHaveBeforeUnload === true) {
          shouldBlock = true;
          break;
        }
        if (typeof shouldHaveBeforeUnload === "function" && shouldHaveBeforeUnload() === true) {
          shouldBlock = true;
          break;
        }
      }
    }
    if (shouldBlock) {
      e.preventDefault();
      return e.returnValue = "";
    }
    return;
  };
  const history = createHistory({
    getLocation,
    getLength: () => win.history.length,
    pushState: (href, state) => queueHistoryAction("push", href, state),
    replaceState: (href, state) => queueHistoryAction("replace", href, state),
    back: (ignoreBlocker) => {
      if (ignoreBlocker) skipBlockerNextPop = true;
      ignoreNextBeforeUnload = true;
      return win.history.back();
    },
    forward: (ignoreBlocker) => {
      if (ignoreBlocker) skipBlockerNextPop = true;
      ignoreNextBeforeUnload = true;
      win.history.forward();
    },
    go: (n) => {
      nextPopIsGo = true;
      win.history.go(n);
    },
    createHref: (href) => createHref(href),
    flush,
    destroy: () => {
      win.history.pushState = originalPushState;
      win.history.replaceState = originalReplaceState;
      win.removeEventListener(beforeUnloadEvent, onBeforeUnload, {
        capture: true
      });
      win.removeEventListener(popStateEvent, onPushPopEvent);
    },
    onBlocked: () => {
      if (rollbackLocation && currentLocation !== rollbackLocation) {
        currentLocation = rollbackLocation;
      }
    },
    getBlockers: _getBlockers,
    setBlockers: _setBlockers,
    notifyOnIndexChange: false
  });
  win.addEventListener(beforeUnloadEvent, onBeforeUnload, { capture: true });
  win.addEventListener(popStateEvent, onPushPopEvent);
  win.history.pushState = function(...args) {
    const res = originalPushState.apply(win.history, args);
    if (!history._ignoreSubscribers) onPushPop("PUSH");
    return res;
  };
  win.history.replaceState = function(...args) {
    const res = originalReplaceState.apply(win.history, args);
    if (!history._ignoreSubscribers) onPushPop("REPLACE");
    return res;
  };
  return history;
}
function createHashHistory(opts) {
  const win = (opts == null ? void 0 : opts.window) ?? (typeof document !== "undefined" ? window : void 0);
  return createBrowserHistory({
    window: win,
    parseLocation: () => {
      const hashHref = win.location.hash.split("#").slice(1).join("#") ?? "/";
      return parseHref(hashHref, win.history.state);
    },
    createHref: (href) => `${win.location.pathname}${win.location.search}#${href}`
  });
}
function createMemoryHistory(opts = {
  initialEntries: ["/"]
}) {
  const entries = opts.initialEntries;
  let index = opts.initialIndex ? Math.min(Math.max(opts.initialIndex, 0), entries.length - 1) : entries.length - 1;
  const states = entries.map(
    (_entry, index2) => assignKeyAndIndex(index2, void 0)
  );
  const getLocation = () => parseHref(entries[index], states[index]);
  return createHistory({
    getLocation,
    getLength: () => entries.length,
    pushState: (path, state) => {
      if (index < entries.length - 1) {
        entries.splice(index + 1);
        states.splice(index + 1);
      }
      states.push(state);
      entries.push(path);
      index = Math.max(entries.length - 1, 0);
    },
    replaceState: (path, state) => {
      states[index] = state;
      entries[index] = path;
    },
    back: () => {
      index = Math.max(index - 1, 0);
    },
    forward: () => {
      index = Math.min(index + 1, entries.length - 1);
    },
    go: (n) => {
      index = Math.min(Math.max(index + n, 0), entries.length - 1);
    },
    createHref: (path) => path
  });
}
function parseHref(href, state) {
  const hashIndex = href.indexOf("#");
  const searchIndex = href.indexOf("?");
  return {
    href,
    pathname: href.substring(
      0,
      hashIndex > 0 ? searchIndex > 0 ? Math.min(hashIndex, searchIndex) : hashIndex : searchIndex > 0 ? searchIndex : href.length
    ),
    hash: hashIndex > -1 ? href.substring(hashIndex) : "",
    search: searchIndex > -1 ? href.slice(searchIndex, hashIndex === -1 ? void 0 : hashIndex) : "",
    state: state || { [stateIndexKey]: 0, key: createRandomKey() }
  };
}
function createRandomKey() {
  return (Math.random() + 1).toString(36).substring(7);
}

//# sourceMappingURL=index.js.map


/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/focusManager.js":
/*!************************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/focusManager.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FocusManager: () => (/* binding */ FocusManager),
/* harmony export */   focusManager: () => (/* binding */ focusManager)
/* harmony export */ });
/* harmony import */ var _subscribable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./subscribable.js */ "./node_modules/@tanstack/query-core/build/modern/subscribable.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/query-core/build/modern/utils.js");
// src/focusManager.ts


var FocusManager = class extends _subscribable_js__WEBPACK_IMPORTED_MODULE_0__.Subscribable {
  #focused;
  #cleanup;
  #setup;
  constructor() {
    super();
    this.#setup = (onFocus) => {
      if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__.isServer && window.addEventListener) {
        const listener = () => onFocus();
        window.addEventListener("visibilitychange", listener, false);
        return () => {
          window.removeEventListener("visibilitychange", listener);
        };
      }
      return;
    };
  }
  onSubscribe() {
    if (!this.#cleanup) {
      this.setEventListener(this.#setup);
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.#cleanup?.();
      this.#cleanup = void 0;
    }
  }
  setEventListener(setup) {
    this.#setup = setup;
    this.#cleanup?.();
    this.#cleanup = setup((focused) => {
      if (typeof focused === "boolean") {
        this.setFocused(focused);
      } else {
        this.onFocus();
      }
    });
  }
  setFocused(focused) {
    const changed = this.#focused !== focused;
    if (changed) {
      this.#focused = focused;
      this.onFocus();
    }
  }
  onFocus() {
    const isFocused = this.isFocused();
    this.listeners.forEach((listener) => {
      listener(isFocused);
    });
  }
  isFocused() {
    if (typeof this.#focused === "boolean") {
      return this.#focused;
    }
    return globalThis.document?.visibilityState !== "hidden";
  }
};
var focusManager = new FocusManager();

//# sourceMappingURL=focusManager.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/infiniteQueryBehavior.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/infiniteQueryBehavior.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hasNextPage: () => (/* binding */ hasNextPage),
/* harmony export */   hasPreviousPage: () => (/* binding */ hasPreviousPage),
/* harmony export */   infiniteQueryBehavior: () => (/* binding */ infiniteQueryBehavior)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/query-core/build/modern/utils.js");
// src/infiniteQueryBehavior.ts

function infiniteQueryBehavior(pages) {
  return {
    onFetch: (context, query) => {
      const options = context.options;
      const direction = context.fetchOptions?.meta?.fetchMore?.direction;
      const oldPages = context.state.data?.pages || [];
      const oldPageParams = context.state.data?.pageParams || [];
      let result = { pages: [], pageParams: [] };
      let currentPage = 0;
      const fetchFn = async () => {
        let cancelled = false;
        const addSignalProperty = (object) => {
          Object.defineProperty(object, "signal", {
            enumerable: true,
            get: () => {
              if (context.signal.aborted) {
                cancelled = true;
              } else {
                context.signal.addEventListener("abort", () => {
                  cancelled = true;
                });
              }
              return context.signal;
            }
          });
        };
        const queryFn = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.ensureQueryFn)(context.options, context.fetchOptions);
        const fetchPage = async (data, param, previous) => {
          if (cancelled) {
            return Promise.reject();
          }
          if (param == null && data.pages.length) {
            return Promise.resolve(data);
          }
          const queryFnContext = {
            client: context.client,
            queryKey: context.queryKey,
            pageParam: param,
            direction: previous ? "backward" : "forward",
            meta: context.options.meta
          };
          addSignalProperty(queryFnContext);
          const page = await queryFn(
            queryFnContext
          );
          const { maxPages } = context.options;
          const addTo = previous ? _utils_js__WEBPACK_IMPORTED_MODULE_0__.addToStart : _utils_js__WEBPACK_IMPORTED_MODULE_0__.addToEnd;
          return {
            pages: addTo(data.pages, page, maxPages),
            pageParams: addTo(data.pageParams, param, maxPages)
          };
        };
        if (direction && oldPages.length) {
          const previous = direction === "backward";
          const pageParamFn = previous ? getPreviousPageParam : getNextPageParam;
          const oldData = {
            pages: oldPages,
            pageParams: oldPageParams
          };
          const param = pageParamFn(options, oldData);
          result = await fetchPage(oldData, param, previous);
        } else {
          const remainingPages = pages ?? oldPages.length;
          do {
            const param = currentPage === 0 ? oldPageParams[0] ?? options.initialPageParam : getNextPageParam(options, result);
            if (currentPage > 0 && param == null) {
              break;
            }
            result = await fetchPage(result, param);
            currentPage++;
          } while (currentPage < remainingPages);
        }
        return result;
      };
      if (context.options.persister) {
        context.fetchFn = () => {
          return context.options.persister?.(
            fetchFn,
            {
              client: context.client,
              queryKey: context.queryKey,
              meta: context.options.meta,
              signal: context.signal
            },
            query
          );
        };
      } else {
        context.fetchFn = fetchFn;
      }
    }
  };
}
function getNextPageParam(options, { pages, pageParams }) {
  const lastIndex = pages.length - 1;
  return pages.length > 0 ? options.getNextPageParam(
    pages[lastIndex],
    pages,
    pageParams[lastIndex],
    pageParams
  ) : void 0;
}
function getPreviousPageParam(options, { pages, pageParams }) {
  return pages.length > 0 ? options.getPreviousPageParam?.(pages[0], pages, pageParams[0], pageParams) : void 0;
}
function hasNextPage(options, data) {
  if (!data)
    return false;
  return getNextPageParam(options, data) != null;
}
function hasPreviousPage(options, data) {
  if (!data || !options.getPreviousPageParam)
    return false;
  return getPreviousPageParam(options, data) != null;
}

//# sourceMappingURL=infiniteQueryBehavior.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/mutation.js":
/*!********************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/mutation.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Mutation: () => (/* binding */ Mutation),
/* harmony export */   getDefaultState: () => (/* binding */ getDefaultState)
/* harmony export */ });
/* harmony import */ var _notifyManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./notifyManager.js */ "./node_modules/@tanstack/query-core/build/modern/notifyManager.js");
/* harmony import */ var _removable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./removable.js */ "./node_modules/@tanstack/query-core/build/modern/removable.js");
/* harmony import */ var _retryer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./retryer.js */ "./node_modules/@tanstack/query-core/build/modern/retryer.js");
// src/mutation.ts



var Mutation = class extends _removable_js__WEBPACK_IMPORTED_MODULE_0__.Removable {
  #observers;
  #mutationCache;
  #retryer;
  constructor(config) {
    super();
    this.mutationId = config.mutationId;
    this.#mutationCache = config.mutationCache;
    this.#observers = [];
    this.state = config.state || getDefaultState();
    this.setOptions(config.options);
    this.scheduleGc();
  }
  setOptions(options) {
    this.options = options;
    this.updateGcTime(this.options.gcTime);
  }
  get meta() {
    return this.options.meta;
  }
  addObserver(observer) {
    if (!this.#observers.includes(observer)) {
      this.#observers.push(observer);
      this.clearGcTimeout();
      this.#mutationCache.notify({
        type: "observerAdded",
        mutation: this,
        observer
      });
    }
  }
  removeObserver(observer) {
    this.#observers = this.#observers.filter((x) => x !== observer);
    this.scheduleGc();
    this.#mutationCache.notify({
      type: "observerRemoved",
      mutation: this,
      observer
    });
  }
  optionalRemove() {
    if (!this.#observers.length) {
      if (this.state.status === "pending") {
        this.scheduleGc();
      } else {
        this.#mutationCache.remove(this);
      }
    }
  }
  continue() {
    return this.#retryer?.continue() ?? // continuing a mutation assumes that variables are set, mutation must have been dehydrated before
    this.execute(this.state.variables);
  }
  async execute(variables) {
    this.#retryer = (0,_retryer_js__WEBPACK_IMPORTED_MODULE_1__.createRetryer)({
      fn: () => {
        if (!this.options.mutationFn) {
          return Promise.reject(new Error("No mutationFn found"));
        }
        return this.options.mutationFn(variables);
      },
      onFail: (failureCount, error) => {
        this.#dispatch({ type: "failed", failureCount, error });
      },
      onPause: () => {
        this.#dispatch({ type: "pause" });
      },
      onContinue: () => {
        this.#dispatch({ type: "continue" });
      },
      retry: this.options.retry ?? 0,
      retryDelay: this.options.retryDelay,
      networkMode: this.options.networkMode,
      canRun: () => this.#mutationCache.canRun(this)
    });
    const restored = this.state.status === "pending";
    const isPaused = !this.#retryer.canStart();
    try {
      if (!restored) {
        this.#dispatch({ type: "pending", variables, isPaused });
        await this.#mutationCache.config.onMutate?.(
          variables,
          this
        );
        const context = await this.options.onMutate?.(variables);
        if (context !== this.state.context) {
          this.#dispatch({
            type: "pending",
            context,
            variables,
            isPaused
          });
        }
      }
      const data = await this.#retryer.start();
      await this.#mutationCache.config.onSuccess?.(
        data,
        variables,
        this.state.context,
        this
      );
      await this.options.onSuccess?.(data, variables, this.state.context);
      await this.#mutationCache.config.onSettled?.(
        data,
        null,
        this.state.variables,
        this.state.context,
        this
      );
      await this.options.onSettled?.(data, null, variables, this.state.context);
      this.#dispatch({ type: "success", data });
      return data;
    } catch (error) {
      try {
        await this.#mutationCache.config.onError?.(
          error,
          variables,
          this.state.context,
          this
        );
        await this.options.onError?.(
          error,
          variables,
          this.state.context
        );
        await this.#mutationCache.config.onSettled?.(
          void 0,
          error,
          this.state.variables,
          this.state.context,
          this
        );
        await this.options.onSettled?.(
          void 0,
          error,
          variables,
          this.state.context
        );
        throw error;
      } finally {
        this.#dispatch({ type: "error", error });
      }
    } finally {
      this.#mutationCache.runNext(this);
    }
  }
  #dispatch(action) {
    const reducer = (state) => {
      switch (action.type) {
        case "failed":
          return {
            ...state,
            failureCount: action.failureCount,
            failureReason: action.error
          };
        case "pause":
          return {
            ...state,
            isPaused: true
          };
        case "continue":
          return {
            ...state,
            isPaused: false
          };
        case "pending":
          return {
            ...state,
            context: action.context,
            data: void 0,
            failureCount: 0,
            failureReason: null,
            error: null,
            isPaused: action.isPaused,
            status: "pending",
            variables: action.variables,
            submittedAt: Date.now()
          };
        case "success":
          return {
            ...state,
            data: action.data,
            failureCount: 0,
            failureReason: null,
            error: null,
            status: "success",
            isPaused: false
          };
        case "error":
          return {
            ...state,
            data: void 0,
            error: action.error,
            failureCount: state.failureCount + 1,
            failureReason: action.error,
            isPaused: false,
            status: "error"
          };
      }
    };
    this.state = reducer(this.state);
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_2__.notifyManager.batch(() => {
      this.#observers.forEach((observer) => {
        observer.onMutationUpdate(action);
      });
      this.#mutationCache.notify({
        mutation: this,
        type: "updated",
        action
      });
    });
  }
};
function getDefaultState() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: false,
    status: "idle",
    variables: void 0,
    submittedAt: 0
  };
}

//# sourceMappingURL=mutation.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/mutationCache.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/mutationCache.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MutationCache: () => (/* binding */ MutationCache)
/* harmony export */ });
/* harmony import */ var _notifyManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./notifyManager.js */ "./node_modules/@tanstack/query-core/build/modern/notifyManager.js");
/* harmony import */ var _mutation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mutation.js */ "./node_modules/@tanstack/query-core/build/modern/mutation.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/query-core/build/modern/utils.js");
/* harmony import */ var _subscribable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./subscribable.js */ "./node_modules/@tanstack/query-core/build/modern/subscribable.js");
// src/mutationCache.ts




var MutationCache = class extends _subscribable_js__WEBPACK_IMPORTED_MODULE_0__.Subscribable {
  constructor(config = {}) {
    super();
    this.config = config;
    this.#mutations = /* @__PURE__ */ new Set();
    this.#scopes = /* @__PURE__ */ new Map();
    this.#mutationId = 0;
  }
  #mutations;
  #scopes;
  #mutationId;
  build(client, options, state) {
    const mutation = new _mutation_js__WEBPACK_IMPORTED_MODULE_1__.Mutation({
      mutationCache: this,
      mutationId: ++this.#mutationId,
      options: client.defaultMutationOptions(options),
      state
    });
    this.add(mutation);
    return mutation;
  }
  add(mutation) {
    this.#mutations.add(mutation);
    const scope = scopeFor(mutation);
    if (typeof scope === "string") {
      const scopedMutations = this.#scopes.get(scope);
      if (scopedMutations) {
        scopedMutations.push(mutation);
      } else {
        this.#scopes.set(scope, [mutation]);
      }
    }
    this.notify({ type: "added", mutation });
  }
  remove(mutation) {
    if (this.#mutations.delete(mutation)) {
      const scope = scopeFor(mutation);
      if (typeof scope === "string") {
        const scopedMutations = this.#scopes.get(scope);
        if (scopedMutations) {
          if (scopedMutations.length > 1) {
            const index = scopedMutations.indexOf(mutation);
            if (index !== -1) {
              scopedMutations.splice(index, 1);
            }
          } else if (scopedMutations[0] === mutation) {
            this.#scopes.delete(scope);
          }
        }
      }
    }
    this.notify({ type: "removed", mutation });
  }
  canRun(mutation) {
    const scope = scopeFor(mutation);
    if (typeof scope === "string") {
      const mutationsWithSameScope = this.#scopes.get(scope);
      const firstPendingMutation = mutationsWithSameScope?.find(
        (m) => m.state.status === "pending"
      );
      return !firstPendingMutation || firstPendingMutation === mutation;
    } else {
      return true;
    }
  }
  runNext(mutation) {
    const scope = scopeFor(mutation);
    if (typeof scope === "string") {
      const foundMutation = this.#scopes.get(scope)?.find((m) => m !== mutation && m.state.isPaused);
      return foundMutation?.continue() ?? Promise.resolve();
    } else {
      return Promise.resolve();
    }
  }
  clear() {
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_2__.notifyManager.batch(() => {
      this.#mutations.forEach((mutation) => {
        this.notify({ type: "removed", mutation });
      });
      this.#mutations.clear();
      this.#scopes.clear();
    });
  }
  getAll() {
    return Array.from(this.#mutations);
  }
  find(filters) {
    const defaultedFilters = { exact: true, ...filters };
    return this.getAll().find(
      (mutation) => (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.matchMutation)(defaultedFilters, mutation)
    );
  }
  findAll(filters = {}) {
    return this.getAll().filter((mutation) => (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.matchMutation)(filters, mutation));
  }
  notify(event) {
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_2__.notifyManager.batch(() => {
      this.listeners.forEach((listener) => {
        listener(event);
      });
    });
  }
  resumePausedMutations() {
    const pausedMutations = this.getAll().filter((x) => x.state.isPaused);
    return _notifyManager_js__WEBPACK_IMPORTED_MODULE_2__.notifyManager.batch(
      () => Promise.all(
        pausedMutations.map((mutation) => mutation.continue().catch(_utils_js__WEBPACK_IMPORTED_MODULE_3__.noop))
      )
    );
  }
};
function scopeFor(mutation) {
  return mutation.options.scope?.id;
}

//# sourceMappingURL=mutationCache.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/notifyManager.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/notifyManager.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createNotifyManager: () => (/* binding */ createNotifyManager),
/* harmony export */   notifyManager: () => (/* binding */ notifyManager)
/* harmony export */ });
// src/notifyManager.ts
function createNotifyManager() {
  let queue = [];
  let transactions = 0;
  let notifyFn = (callback) => {
    callback();
  };
  let batchNotifyFn = (callback) => {
    callback();
  };
  let scheduleFn = (cb) => setTimeout(cb, 0);
  const schedule = (callback) => {
    if (transactions) {
      queue.push(callback);
    } else {
      scheduleFn(() => {
        notifyFn(callback);
      });
    }
  };
  const flush = () => {
    const originalQueue = queue;
    queue = [];
    if (originalQueue.length) {
      scheduleFn(() => {
        batchNotifyFn(() => {
          originalQueue.forEach((callback) => {
            notifyFn(callback);
          });
        });
      });
    }
  };
  return {
    batch: (callback) => {
      let result;
      transactions++;
      try {
        result = callback();
      } finally {
        transactions--;
        if (!transactions) {
          flush();
        }
      }
      return result;
    },
    /**
     * All calls to the wrapped function will be batched.
     */
    batchCalls: (callback) => {
      return (...args) => {
        schedule(() => {
          callback(...args);
        });
      };
    },
    schedule,
    /**
     * Use this method to set a custom notify function.
     * This can be used to for example wrap notifications with `React.act` while running tests.
     */
    setNotifyFunction: (fn) => {
      notifyFn = fn;
    },
    /**
     * Use this method to set a custom function to batch notifications together into a single tick.
     * By default React Query will use the batch function provided by ReactDOM or React Native.
     */
    setBatchNotifyFunction: (fn) => {
      batchNotifyFn = fn;
    },
    setScheduler: (fn) => {
      scheduleFn = fn;
    }
  };
}
var notifyManager = createNotifyManager();

//# sourceMappingURL=notifyManager.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/onlineManager.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/onlineManager.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OnlineManager: () => (/* binding */ OnlineManager),
/* harmony export */   onlineManager: () => (/* binding */ onlineManager)
/* harmony export */ });
/* harmony import */ var _subscribable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./subscribable.js */ "./node_modules/@tanstack/query-core/build/modern/subscribable.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/query-core/build/modern/utils.js");
// src/onlineManager.ts


var OnlineManager = class extends _subscribable_js__WEBPACK_IMPORTED_MODULE_0__.Subscribable {
  #online = true;
  #cleanup;
  #setup;
  constructor() {
    super();
    this.#setup = (onOnline) => {
      if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__.isServer && window.addEventListener) {
        const onlineListener = () => onOnline(true);
        const offlineListener = () => onOnline(false);
        window.addEventListener("online", onlineListener, false);
        window.addEventListener("offline", offlineListener, false);
        return () => {
          window.removeEventListener("online", onlineListener);
          window.removeEventListener("offline", offlineListener);
        };
      }
      return;
    };
  }
  onSubscribe() {
    if (!this.#cleanup) {
      this.setEventListener(this.#setup);
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.#cleanup?.();
      this.#cleanup = void 0;
    }
  }
  setEventListener(setup) {
    this.#setup = setup;
    this.#cleanup?.();
    this.#cleanup = setup(this.setOnline.bind(this));
  }
  setOnline(online) {
    const changed = this.#online !== online;
    if (changed) {
      this.#online = online;
      this.listeners.forEach((listener) => {
        listener(online);
      });
    }
  }
  isOnline() {
    return this.#online;
  }
};
var onlineManager = new OnlineManager();

//# sourceMappingURL=onlineManager.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/query.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/query.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Query: () => (/* binding */ Query),
/* harmony export */   fetchState: () => (/* binding */ fetchState)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/query-core/build/modern/utils.js");
/* harmony import */ var _notifyManager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./notifyManager.js */ "./node_modules/@tanstack/query-core/build/modern/notifyManager.js");
/* harmony import */ var _retryer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./retryer.js */ "./node_modules/@tanstack/query-core/build/modern/retryer.js");
/* harmony import */ var _removable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./removable.js */ "./node_modules/@tanstack/query-core/build/modern/removable.js");
// src/query.ts




var Query = class extends _removable_js__WEBPACK_IMPORTED_MODULE_0__.Removable {
  #initialState;
  #revertState;
  #cache;
  #client;
  #retryer;
  #defaultOptions;
  #abortSignalConsumed;
  constructor(config) {
    super();
    this.#abortSignalConsumed = false;
    this.#defaultOptions = config.defaultOptions;
    this.setOptions(config.options);
    this.observers = [];
    this.#client = config.client;
    this.#cache = this.#client.getQueryCache();
    this.queryKey = config.queryKey;
    this.queryHash = config.queryHash;
    this.#initialState = getDefaultState(this.options);
    this.state = config.state ?? this.#initialState;
    this.scheduleGc();
  }
  get meta() {
    return this.options.meta;
  }
  get promise() {
    return this.#retryer?.promise;
  }
  setOptions(options) {
    this.options = { ...this.#defaultOptions, ...options };
    this.updateGcTime(this.options.gcTime);
  }
  optionalRemove() {
    if (!this.observers.length && this.state.fetchStatus === "idle") {
      this.#cache.remove(this);
    }
  }
  setData(newData, options) {
    const data = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.replaceData)(this.state.data, newData, this.options);
    this.#dispatch({
      data,
      type: "success",
      dataUpdatedAt: options?.updatedAt,
      manual: options?.manual
    });
    return data;
  }
  setState(state, setStateOptions) {
    this.#dispatch({ type: "setState", state, setStateOptions });
  }
  cancel(options) {
    const promise = this.#retryer?.promise;
    this.#retryer?.cancel(options);
    return promise ? promise.then(_utils_js__WEBPACK_IMPORTED_MODULE_1__.noop).catch(_utils_js__WEBPACK_IMPORTED_MODULE_1__.noop) : Promise.resolve();
  }
  destroy() {
    super.destroy();
    this.cancel({ silent: true });
  }
  reset() {
    this.destroy();
    this.setState(this.#initialState);
  }
  isActive() {
    return this.observers.some(
      (observer) => (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.resolveEnabled)(observer.options.enabled, this) !== false
    );
  }
  isDisabled() {
    if (this.getObserversCount() > 0) {
      return !this.isActive();
    }
    return this.options.queryFn === _utils_js__WEBPACK_IMPORTED_MODULE_1__.skipToken || this.state.dataUpdateCount + this.state.errorUpdateCount === 0;
  }
  isStale() {
    if (this.state.isInvalidated) {
      return true;
    }
    if (this.getObserversCount() > 0) {
      return this.observers.some(
        (observer) => observer.getCurrentResult().isStale
      );
    }
    return this.state.data === void 0;
  }
  isStaleByTime(staleTime = 0) {
    return this.state.isInvalidated || this.state.data === void 0 || !(0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.timeUntilStale)(this.state.dataUpdatedAt, staleTime);
  }
  onFocus() {
    const observer = this.observers.find((x) => x.shouldFetchOnWindowFocus());
    observer?.refetch({ cancelRefetch: false });
    this.#retryer?.continue();
  }
  onOnline() {
    const observer = this.observers.find((x) => x.shouldFetchOnReconnect());
    observer?.refetch({ cancelRefetch: false });
    this.#retryer?.continue();
  }
  addObserver(observer) {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
      this.clearGcTimeout();
      this.#cache.notify({ type: "observerAdded", query: this, observer });
    }
  }
  removeObserver(observer) {
    if (this.observers.includes(observer)) {
      this.observers = this.observers.filter((x) => x !== observer);
      if (!this.observers.length) {
        if (this.#retryer) {
          if (this.#abortSignalConsumed) {
            this.#retryer.cancel({ revert: true });
          } else {
            this.#retryer.cancelRetry();
          }
        }
        this.scheduleGc();
      }
      this.#cache.notify({ type: "observerRemoved", query: this, observer });
    }
  }
  getObserversCount() {
    return this.observers.length;
  }
  invalidate() {
    if (!this.state.isInvalidated) {
      this.#dispatch({ type: "invalidate" });
    }
  }
  fetch(options, fetchOptions) {
    if (this.state.fetchStatus !== "idle") {
      if (this.state.data !== void 0 && fetchOptions?.cancelRefetch) {
        this.cancel({ silent: true });
      } else if (this.#retryer) {
        this.#retryer.continueRetry();
        return this.#retryer.promise;
      }
    }
    if (options) {
      this.setOptions(options);
    }
    if (!this.options.queryFn) {
      const observer = this.observers.find((x) => x.options.queryFn);
      if (observer) {
        this.setOptions(observer.options);
      }
    }
    if (true) {
      if (!Array.isArray(this.options.queryKey)) {
        console.error(
          `As of v4, queryKey needs to be an Array. If you are using a string like 'repoData', please change it to an Array, e.g. ['repoData']`
        );
      }
    }
    const abortController = new AbortController();
    const addSignalProperty = (object) => {
      Object.defineProperty(object, "signal", {
        enumerable: true,
        get: () => {
          this.#abortSignalConsumed = true;
          return abortController.signal;
        }
      });
    };
    const fetchFn = () => {
      const queryFn = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.ensureQueryFn)(this.options, fetchOptions);
      const queryFnContext = {
        client: this.#client,
        queryKey: this.queryKey,
        meta: this.meta
      };
      addSignalProperty(queryFnContext);
      this.#abortSignalConsumed = false;
      if (this.options.persister) {
        return this.options.persister(
          queryFn,
          queryFnContext,
          this
        );
      }
      return queryFn(queryFnContext);
    };
    const context = {
      fetchOptions,
      options: this.options,
      queryKey: this.queryKey,
      client: this.#client,
      state: this.state,
      fetchFn
    };
    addSignalProperty(context);
    this.options.behavior?.onFetch(
      context,
      this
    );
    this.#revertState = this.state;
    if (this.state.fetchStatus === "idle" || this.state.fetchMeta !== context.fetchOptions?.meta) {
      this.#dispatch({ type: "fetch", meta: context.fetchOptions?.meta });
    }
    const onError = (error) => {
      if (!((0,_retryer_js__WEBPACK_IMPORTED_MODULE_2__.isCancelledError)(error) && error.silent)) {
        this.#dispatch({
          type: "error",
          error
        });
      }
      if (!(0,_retryer_js__WEBPACK_IMPORTED_MODULE_2__.isCancelledError)(error)) {
        this.#cache.config.onError?.(
          error,
          this
        );
        this.#cache.config.onSettled?.(
          this.state.data,
          error,
          this
        );
      }
      this.scheduleGc();
    };
    this.#retryer = (0,_retryer_js__WEBPACK_IMPORTED_MODULE_2__.createRetryer)({
      initialPromise: fetchOptions?.initialPromise,
      fn: context.fetchFn,
      abort: abortController.abort.bind(abortController),
      onSuccess: (data) => {
        if (data === void 0) {
          if (true) {
            console.error(
              `Query data cannot be undefined. Please make sure to return a value other than undefined from your query function. Affected query key: ${this.queryHash}`
            );
          }
          onError(new Error(`${this.queryHash} data is undefined`));
          return;
        }
        try {
          this.setData(data);
        } catch (error) {
          onError(error);
          return;
        }
        this.#cache.config.onSuccess?.(data, this);
        this.#cache.config.onSettled?.(
          data,
          this.state.error,
          this
        );
        this.scheduleGc();
      },
      onError,
      onFail: (failureCount, error) => {
        this.#dispatch({ type: "failed", failureCount, error });
      },
      onPause: () => {
        this.#dispatch({ type: "pause" });
      },
      onContinue: () => {
        this.#dispatch({ type: "continue" });
      },
      retry: context.options.retry,
      retryDelay: context.options.retryDelay,
      networkMode: context.options.networkMode,
      canRun: () => true
    });
    return this.#retryer.start();
  }
  #dispatch(action) {
    const reducer = (state) => {
      switch (action.type) {
        case "failed":
          return {
            ...state,
            fetchFailureCount: action.failureCount,
            fetchFailureReason: action.error
          };
        case "pause":
          return {
            ...state,
            fetchStatus: "paused"
          };
        case "continue":
          return {
            ...state,
            fetchStatus: "fetching"
          };
        case "fetch":
          return {
            ...state,
            ...fetchState(state.data, this.options),
            fetchMeta: action.meta ?? null
          };
        case "success":
          return {
            ...state,
            data: action.data,
            dataUpdateCount: state.dataUpdateCount + 1,
            dataUpdatedAt: action.dataUpdatedAt ?? Date.now(),
            error: null,
            isInvalidated: false,
            status: "success",
            ...!action.manual && {
              fetchStatus: "idle",
              fetchFailureCount: 0,
              fetchFailureReason: null
            }
          };
        case "error":
          const error = action.error;
          if ((0,_retryer_js__WEBPACK_IMPORTED_MODULE_2__.isCancelledError)(error) && error.revert && this.#revertState) {
            return { ...this.#revertState, fetchStatus: "idle" };
          }
          return {
            ...state,
            error,
            errorUpdateCount: state.errorUpdateCount + 1,
            errorUpdatedAt: Date.now(),
            fetchFailureCount: state.fetchFailureCount + 1,
            fetchFailureReason: error,
            fetchStatus: "idle",
            status: "error"
          };
        case "invalidate":
          return {
            ...state,
            isInvalidated: true
          };
        case "setState":
          return {
            ...state,
            ...action.state
          };
      }
    };
    this.state = reducer(this.state);
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_3__.notifyManager.batch(() => {
      this.observers.forEach((observer) => {
        observer.onQueryUpdate();
      });
      this.#cache.notify({ query: this, type: "updated", action });
    });
  }
};
function fetchState(data, options) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: (0,_retryer_js__WEBPACK_IMPORTED_MODULE_2__.canFetch)(options.networkMode) ? "fetching" : "paused",
    ...data === void 0 && {
      error: null,
      status: "pending"
    }
  };
}
function getDefaultState(options) {
  const data = typeof options.initialData === "function" ? options.initialData() : options.initialData;
  const hasData = data !== void 0;
  const initialDataUpdatedAt = hasData ? typeof options.initialDataUpdatedAt === "function" ? options.initialDataUpdatedAt() : options.initialDataUpdatedAt : 0;
  return {
    data,
    dataUpdateCount: 0,
    dataUpdatedAt: hasData ? initialDataUpdatedAt ?? Date.now() : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: false,
    status: hasData ? "success" : "pending",
    fetchStatus: "idle"
  };
}

//# sourceMappingURL=query.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/queryCache.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/queryCache.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QueryCache: () => (/* binding */ QueryCache)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/query-core/build/modern/utils.js");
/* harmony import */ var _query_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./query.js */ "./node_modules/@tanstack/query-core/build/modern/query.js");
/* harmony import */ var _notifyManager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./notifyManager.js */ "./node_modules/@tanstack/query-core/build/modern/notifyManager.js");
/* harmony import */ var _subscribable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./subscribable.js */ "./node_modules/@tanstack/query-core/build/modern/subscribable.js");
// src/queryCache.ts




var QueryCache = class extends _subscribable_js__WEBPACK_IMPORTED_MODULE_0__.Subscribable {
  constructor(config = {}) {
    super();
    this.config = config;
    this.#queries = /* @__PURE__ */ new Map();
  }
  #queries;
  build(client, options, state) {
    const queryKey = options.queryKey;
    const queryHash = options.queryHash ?? (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.hashQueryKeyByOptions)(queryKey, options);
    let query = this.get(queryHash);
    if (!query) {
      query = new _query_js__WEBPACK_IMPORTED_MODULE_2__.Query({
        client,
        queryKey,
        queryHash,
        options: client.defaultQueryOptions(options),
        state,
        defaultOptions: client.getQueryDefaults(queryKey)
      });
      this.add(query);
    }
    return query;
  }
  add(query) {
    if (!this.#queries.has(query.queryHash)) {
      this.#queries.set(query.queryHash, query);
      this.notify({
        type: "added",
        query
      });
    }
  }
  remove(query) {
    const queryInMap = this.#queries.get(query.queryHash);
    if (queryInMap) {
      query.destroy();
      if (queryInMap === query) {
        this.#queries.delete(query.queryHash);
      }
      this.notify({ type: "removed", query });
    }
  }
  clear() {
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_3__.notifyManager.batch(() => {
      this.getAll().forEach((query) => {
        this.remove(query);
      });
    });
  }
  get(queryHash) {
    return this.#queries.get(queryHash);
  }
  getAll() {
    return [...this.#queries.values()];
  }
  find(filters) {
    const defaultedFilters = { exact: true, ...filters };
    return this.getAll().find(
      (query) => (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.matchQuery)(defaultedFilters, query)
    );
  }
  findAll(filters = {}) {
    const queries = this.getAll();
    return Object.keys(filters).length > 0 ? queries.filter((query) => (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.matchQuery)(filters, query)) : queries;
  }
  notify(event) {
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_3__.notifyManager.batch(() => {
      this.listeners.forEach((listener) => {
        listener(event);
      });
    });
  }
  onFocus() {
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_3__.notifyManager.batch(() => {
      this.getAll().forEach((query) => {
        query.onFocus();
      });
    });
  }
  onOnline() {
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_3__.notifyManager.batch(() => {
      this.getAll().forEach((query) => {
        query.onOnline();
      });
    });
  }
};

//# sourceMappingURL=queryCache.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/queryClient.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/queryClient.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QueryClient: () => (/* binding */ QueryClient)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/query-core/build/modern/utils.js");
/* harmony import */ var _queryCache_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./queryCache.js */ "./node_modules/@tanstack/query-core/build/modern/queryCache.js");
/* harmony import */ var _mutationCache_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mutationCache.js */ "./node_modules/@tanstack/query-core/build/modern/mutationCache.js");
/* harmony import */ var _focusManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./focusManager.js */ "./node_modules/@tanstack/query-core/build/modern/focusManager.js");
/* harmony import */ var _onlineManager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./onlineManager.js */ "./node_modules/@tanstack/query-core/build/modern/onlineManager.js");
/* harmony import */ var _notifyManager_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./notifyManager.js */ "./node_modules/@tanstack/query-core/build/modern/notifyManager.js");
/* harmony import */ var _infiniteQueryBehavior_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./infiniteQueryBehavior.js */ "./node_modules/@tanstack/query-core/build/modern/infiniteQueryBehavior.js");
// src/queryClient.ts







var QueryClient = class {
  #queryCache;
  #mutationCache;
  #defaultOptions;
  #queryDefaults;
  #mutationDefaults;
  #mountCount;
  #unsubscribeFocus;
  #unsubscribeOnline;
  constructor(config = {}) {
    this.#queryCache = config.queryCache || new _queryCache_js__WEBPACK_IMPORTED_MODULE_0__.QueryCache();
    this.#mutationCache = config.mutationCache || new _mutationCache_js__WEBPACK_IMPORTED_MODULE_1__.MutationCache();
    this.#defaultOptions = config.defaultOptions || {};
    this.#queryDefaults = /* @__PURE__ */ new Map();
    this.#mutationDefaults = /* @__PURE__ */ new Map();
    this.#mountCount = 0;
  }
  mount() {
    this.#mountCount++;
    if (this.#mountCount !== 1)
      return;
    this.#unsubscribeFocus = _focusManager_js__WEBPACK_IMPORTED_MODULE_2__.focusManager.subscribe(async (focused) => {
      if (focused) {
        await this.resumePausedMutations();
        this.#queryCache.onFocus();
      }
    });
    this.#unsubscribeOnline = _onlineManager_js__WEBPACK_IMPORTED_MODULE_3__.onlineManager.subscribe(async (online) => {
      if (online) {
        await this.resumePausedMutations();
        this.#queryCache.onOnline();
      }
    });
  }
  unmount() {
    this.#mountCount--;
    if (this.#mountCount !== 0)
      return;
    this.#unsubscribeFocus?.();
    this.#unsubscribeFocus = void 0;
    this.#unsubscribeOnline?.();
    this.#unsubscribeOnline = void 0;
  }
  isFetching(filters) {
    return this.#queryCache.findAll({ ...filters, fetchStatus: "fetching" }).length;
  }
  isMutating(filters) {
    return this.#mutationCache.findAll({ ...filters, status: "pending" }).length;
  }
  getQueryData(queryKey) {
    const options = this.defaultQueryOptions({ queryKey });
    return this.#queryCache.get(options.queryHash)?.state.data;
  }
  ensureQueryData(options) {
    const defaultedOptions = this.defaultQueryOptions(options);
    const query = this.#queryCache.build(this, defaultedOptions);
    const cachedData = query.state.data;
    if (cachedData === void 0) {
      return this.fetchQuery(options);
    }
    if (options.revalidateIfStale && query.isStaleByTime((0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.resolveStaleTime)(defaultedOptions.staleTime, query))) {
      void this.prefetchQuery(defaultedOptions);
    }
    return Promise.resolve(cachedData);
  }
  getQueriesData(filters) {
    return this.#queryCache.findAll(filters).map(({ queryKey, state }) => {
      const data = state.data;
      return [queryKey, data];
    });
  }
  setQueryData(queryKey, updater, options) {
    const defaultedOptions = this.defaultQueryOptions({ queryKey });
    const query = this.#queryCache.get(
      defaultedOptions.queryHash
    );
    const prevData = query?.state.data;
    const data = (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.functionalUpdate)(updater, prevData);
    if (data === void 0) {
      return void 0;
    }
    return this.#queryCache.build(this, defaultedOptions).setData(data, { ...options, manual: true });
  }
  setQueriesData(filters, updater, options) {
    return _notifyManager_js__WEBPACK_IMPORTED_MODULE_5__.notifyManager.batch(
      () => this.#queryCache.findAll(filters).map(({ queryKey }) => [
        queryKey,
        this.setQueryData(queryKey, updater, options)
      ])
    );
  }
  getQueryState(queryKey) {
    const options = this.defaultQueryOptions({ queryKey });
    return this.#queryCache.get(
      options.queryHash
    )?.state;
  }
  removeQueries(filters) {
    const queryCache = this.#queryCache;
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_5__.notifyManager.batch(() => {
      queryCache.findAll(filters).forEach((query) => {
        queryCache.remove(query);
      });
    });
  }
  resetQueries(filters, options) {
    const queryCache = this.#queryCache;
    const refetchFilters = {
      type: "active",
      ...filters
    };
    return _notifyManager_js__WEBPACK_IMPORTED_MODULE_5__.notifyManager.batch(() => {
      queryCache.findAll(filters).forEach((query) => {
        query.reset();
      });
      return this.refetchQueries(refetchFilters, options);
    });
  }
  cancelQueries(filters, cancelOptions = {}) {
    const defaultedCancelOptions = { revert: true, ...cancelOptions };
    const promises = _notifyManager_js__WEBPACK_IMPORTED_MODULE_5__.notifyManager.batch(
      () => this.#queryCache.findAll(filters).map((query) => query.cancel(defaultedCancelOptions))
    );
    return Promise.all(promises).then(_utils_js__WEBPACK_IMPORTED_MODULE_4__.noop).catch(_utils_js__WEBPACK_IMPORTED_MODULE_4__.noop);
  }
  invalidateQueries(filters, options = {}) {
    return _notifyManager_js__WEBPACK_IMPORTED_MODULE_5__.notifyManager.batch(() => {
      this.#queryCache.findAll(filters).forEach((query) => {
        query.invalidate();
      });
      if (filters?.refetchType === "none") {
        return Promise.resolve();
      }
      const refetchFilters = {
        ...filters,
        type: filters?.refetchType ?? filters?.type ?? "active"
      };
      return this.refetchQueries(refetchFilters, options);
    });
  }
  refetchQueries(filters, options = {}) {
    const fetchOptions = {
      ...options,
      cancelRefetch: options.cancelRefetch ?? true
    };
    const promises = _notifyManager_js__WEBPACK_IMPORTED_MODULE_5__.notifyManager.batch(
      () => this.#queryCache.findAll(filters).filter((query) => !query.isDisabled()).map((query) => {
        let promise = query.fetch(void 0, fetchOptions);
        if (!fetchOptions.throwOnError) {
          promise = promise.catch(_utils_js__WEBPACK_IMPORTED_MODULE_4__.noop);
        }
        return query.state.fetchStatus === "paused" ? Promise.resolve() : promise;
      })
    );
    return Promise.all(promises).then(_utils_js__WEBPACK_IMPORTED_MODULE_4__.noop);
  }
  fetchQuery(options) {
    const defaultedOptions = this.defaultQueryOptions(options);
    if (defaultedOptions.retry === void 0) {
      defaultedOptions.retry = false;
    }
    const query = this.#queryCache.build(this, defaultedOptions);
    return query.isStaleByTime(
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.resolveStaleTime)(defaultedOptions.staleTime, query)
    ) ? query.fetch(defaultedOptions) : Promise.resolve(query.state.data);
  }
  prefetchQuery(options) {
    return this.fetchQuery(options).then(_utils_js__WEBPACK_IMPORTED_MODULE_4__.noop).catch(_utils_js__WEBPACK_IMPORTED_MODULE_4__.noop);
  }
  fetchInfiniteQuery(options) {
    options.behavior = (0,_infiniteQueryBehavior_js__WEBPACK_IMPORTED_MODULE_6__.infiniteQueryBehavior)(options.pages);
    return this.fetchQuery(options);
  }
  prefetchInfiniteQuery(options) {
    return this.fetchInfiniteQuery(options).then(_utils_js__WEBPACK_IMPORTED_MODULE_4__.noop).catch(_utils_js__WEBPACK_IMPORTED_MODULE_4__.noop);
  }
  ensureInfiniteQueryData(options) {
    options.behavior = (0,_infiniteQueryBehavior_js__WEBPACK_IMPORTED_MODULE_6__.infiniteQueryBehavior)(options.pages);
    return this.ensureQueryData(options);
  }
  resumePausedMutations() {
    if (_onlineManager_js__WEBPACK_IMPORTED_MODULE_3__.onlineManager.isOnline()) {
      return this.#mutationCache.resumePausedMutations();
    }
    return Promise.resolve();
  }
  getQueryCache() {
    return this.#queryCache;
  }
  getMutationCache() {
    return this.#mutationCache;
  }
  getDefaultOptions() {
    return this.#defaultOptions;
  }
  setDefaultOptions(options) {
    this.#defaultOptions = options;
  }
  setQueryDefaults(queryKey, options) {
    this.#queryDefaults.set((0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.hashKey)(queryKey), {
      queryKey,
      defaultOptions: options
    });
  }
  getQueryDefaults(queryKey) {
    const defaults = [...this.#queryDefaults.values()];
    const result = {};
    defaults.forEach((queryDefault) => {
      if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.partialMatchKey)(queryKey, queryDefault.queryKey)) {
        Object.assign(result, queryDefault.defaultOptions);
      }
    });
    return result;
  }
  setMutationDefaults(mutationKey, options) {
    this.#mutationDefaults.set((0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.hashKey)(mutationKey), {
      mutationKey,
      defaultOptions: options
    });
  }
  getMutationDefaults(mutationKey) {
    const defaults = [...this.#mutationDefaults.values()];
    let result = {};
    defaults.forEach((queryDefault) => {
      if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.partialMatchKey)(mutationKey, queryDefault.mutationKey)) {
        result = { ...result, ...queryDefault.defaultOptions };
      }
    });
    return result;
  }
  defaultQueryOptions(options) {
    if (options._defaulted) {
      return options;
    }
    const defaultedOptions = {
      ...this.#defaultOptions.queries,
      ...this.getQueryDefaults(options.queryKey),
      ...options,
      _defaulted: true
    };
    if (!defaultedOptions.queryHash) {
      defaultedOptions.queryHash = (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.hashQueryKeyByOptions)(
        defaultedOptions.queryKey,
        defaultedOptions
      );
    }
    if (defaultedOptions.refetchOnReconnect === void 0) {
      defaultedOptions.refetchOnReconnect = defaultedOptions.networkMode !== "always";
    }
    if (defaultedOptions.throwOnError === void 0) {
      defaultedOptions.throwOnError = !!defaultedOptions.suspense;
    }
    if (!defaultedOptions.networkMode && defaultedOptions.persister) {
      defaultedOptions.networkMode = "offlineFirst";
    }
    if (defaultedOptions.queryFn === _utils_js__WEBPACK_IMPORTED_MODULE_4__.skipToken) {
      defaultedOptions.enabled = false;
    }
    return defaultedOptions;
  }
  defaultMutationOptions(options) {
    if (options?._defaulted) {
      return options;
    }
    return {
      ...this.#defaultOptions.mutations,
      ...options?.mutationKey && this.getMutationDefaults(options.mutationKey),
      ...options,
      _defaulted: true
    };
  }
  clear() {
    this.#queryCache.clear();
    this.#mutationCache.clear();
  }
};

//# sourceMappingURL=queryClient.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/removable.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/removable.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Removable: () => (/* binding */ Removable)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/query-core/build/modern/utils.js");
// src/removable.ts

var Removable = class {
  #gcTimeout;
  destroy() {
    this.clearGcTimeout();
  }
  scheduleGc() {
    this.clearGcTimeout();
    if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isValidTimeout)(this.gcTime)) {
      this.#gcTimeout = setTimeout(() => {
        this.optionalRemove();
      }, this.gcTime);
    }
  }
  updateGcTime(newGcTime) {
    this.gcTime = Math.max(
      this.gcTime || 0,
      newGcTime ?? (_utils_js__WEBPACK_IMPORTED_MODULE_0__.isServer ? Infinity : 5 * 60 * 1e3)
    );
  }
  clearGcTimeout() {
    if (this.#gcTimeout) {
      clearTimeout(this.#gcTimeout);
      this.#gcTimeout = void 0;
    }
  }
};

//# sourceMappingURL=removable.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/retryer.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/retryer.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CancelledError: () => (/* binding */ CancelledError),
/* harmony export */   canFetch: () => (/* binding */ canFetch),
/* harmony export */   createRetryer: () => (/* binding */ createRetryer),
/* harmony export */   isCancelledError: () => (/* binding */ isCancelledError)
/* harmony export */ });
/* harmony import */ var _focusManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./focusManager.js */ "./node_modules/@tanstack/query-core/build/modern/focusManager.js");
/* harmony import */ var _onlineManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./onlineManager.js */ "./node_modules/@tanstack/query-core/build/modern/onlineManager.js");
/* harmony import */ var _thenable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./thenable.js */ "./node_modules/@tanstack/query-core/build/modern/thenable.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/query-core/build/modern/utils.js");
// src/retryer.ts




function defaultRetryDelay(failureCount) {
  return Math.min(1e3 * 2 ** failureCount, 3e4);
}
function canFetch(networkMode) {
  return (networkMode ?? "online") === "online" ? _onlineManager_js__WEBPACK_IMPORTED_MODULE_0__.onlineManager.isOnline() : true;
}
var CancelledError = class extends Error {
  constructor(options) {
    super("CancelledError");
    this.revert = options?.revert;
    this.silent = options?.silent;
  }
};
function isCancelledError(value) {
  return value instanceof CancelledError;
}
function createRetryer(config) {
  let isRetryCancelled = false;
  let failureCount = 0;
  let isResolved = false;
  let continueFn;
  const thenable = (0,_thenable_js__WEBPACK_IMPORTED_MODULE_1__.pendingThenable)();
  const cancel = (cancelOptions) => {
    if (!isResolved) {
      reject(new CancelledError(cancelOptions));
      config.abort?.();
    }
  };
  const cancelRetry = () => {
    isRetryCancelled = true;
  };
  const continueRetry = () => {
    isRetryCancelled = false;
  };
  const canContinue = () => _focusManager_js__WEBPACK_IMPORTED_MODULE_2__.focusManager.isFocused() && (config.networkMode === "always" || _onlineManager_js__WEBPACK_IMPORTED_MODULE_0__.onlineManager.isOnline()) && config.canRun();
  const canStart = () => canFetch(config.networkMode) && config.canRun();
  const resolve = (value) => {
    if (!isResolved) {
      isResolved = true;
      config.onSuccess?.(value);
      continueFn?.();
      thenable.resolve(value);
    }
  };
  const reject = (value) => {
    if (!isResolved) {
      isResolved = true;
      config.onError?.(value);
      continueFn?.();
      thenable.reject(value);
    }
  };
  const pause = () => {
    return new Promise((continueResolve) => {
      continueFn = (value) => {
        if (isResolved || canContinue()) {
          continueResolve(value);
        }
      };
      config.onPause?.();
    }).then(() => {
      continueFn = void 0;
      if (!isResolved) {
        config.onContinue?.();
      }
    });
  };
  const run = () => {
    if (isResolved) {
      return;
    }
    let promiseOrValue;
    const initialPromise = failureCount === 0 ? config.initialPromise : void 0;
    try {
      promiseOrValue = initialPromise ?? config.fn();
    } catch (error) {
      promiseOrValue = Promise.reject(error);
    }
    Promise.resolve(promiseOrValue).then(resolve).catch((error) => {
      if (isResolved) {
        return;
      }
      const retry = config.retry ?? (_utils_js__WEBPACK_IMPORTED_MODULE_3__.isServer ? 0 : 3);
      const retryDelay = config.retryDelay ?? defaultRetryDelay;
      const delay = typeof retryDelay === "function" ? retryDelay(failureCount, error) : retryDelay;
      const shouldRetry = retry === true || typeof retry === "number" && failureCount < retry || typeof retry === "function" && retry(failureCount, error);
      if (isRetryCancelled || !shouldRetry) {
        reject(error);
        return;
      }
      failureCount++;
      config.onFail?.(failureCount, error);
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.sleep)(delay).then(() => {
        return canContinue() ? void 0 : pause();
      }).then(() => {
        if (isRetryCancelled) {
          reject(error);
        } else {
          run();
        }
      });
    });
  };
  return {
    promise: thenable,
    cancel,
    continue: () => {
      continueFn?.();
      return thenable;
    },
    cancelRetry,
    continueRetry,
    canStart,
    start: () => {
      if (canStart()) {
        run();
      } else {
        pause().then(run);
      }
      return thenable;
    }
  };
}

//# sourceMappingURL=retryer.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/subscribable.js":
/*!************************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/subscribable.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Subscribable: () => (/* binding */ Subscribable)
/* harmony export */ });
// src/subscribable.ts
var Subscribable = class {
  constructor() {
    this.listeners = /* @__PURE__ */ new Set();
    this.subscribe = this.subscribe.bind(this);
  }
  subscribe(listener) {
    this.listeners.add(listener);
    this.onSubscribe();
    return () => {
      this.listeners.delete(listener);
      this.onUnsubscribe();
    };
  }
  hasListeners() {
    return this.listeners.size > 0;
  }
  onSubscribe() {
  }
  onUnsubscribe() {
  }
};

//# sourceMappingURL=subscribable.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/thenable.js":
/*!********************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/thenable.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   pendingThenable: () => (/* binding */ pendingThenable)
/* harmony export */ });
// src/thenable.ts
function pendingThenable() {
  let resolve;
  let reject;
  const thenable = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  thenable.status = "pending";
  thenable.catch(() => {
  });
  function finalize(data) {
    Object.assign(thenable, data);
    delete thenable.resolve;
    delete thenable.reject;
  }
  thenable.resolve = (value) => {
    finalize({
      status: "fulfilled",
      value
    });
    resolve(value);
  };
  thenable.reject = (reason) => {
    finalize({
      status: "rejected",
      reason
    });
    reject(reason);
  };
  return thenable;
}

//# sourceMappingURL=thenable.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/utils.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/utils.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addToEnd: () => (/* binding */ addToEnd),
/* harmony export */   addToStart: () => (/* binding */ addToStart),
/* harmony export */   ensureQueryFn: () => (/* binding */ ensureQueryFn),
/* harmony export */   functionalUpdate: () => (/* binding */ functionalUpdate),
/* harmony export */   hashKey: () => (/* binding */ hashKey),
/* harmony export */   hashQueryKeyByOptions: () => (/* binding */ hashQueryKeyByOptions),
/* harmony export */   isPlainArray: () => (/* binding */ isPlainArray),
/* harmony export */   isPlainObject: () => (/* binding */ isPlainObject),
/* harmony export */   isServer: () => (/* binding */ isServer),
/* harmony export */   isValidTimeout: () => (/* binding */ isValidTimeout),
/* harmony export */   keepPreviousData: () => (/* binding */ keepPreviousData),
/* harmony export */   matchMutation: () => (/* binding */ matchMutation),
/* harmony export */   matchQuery: () => (/* binding */ matchQuery),
/* harmony export */   noop: () => (/* binding */ noop),
/* harmony export */   partialMatchKey: () => (/* binding */ partialMatchKey),
/* harmony export */   replaceData: () => (/* binding */ replaceData),
/* harmony export */   replaceEqualDeep: () => (/* binding */ replaceEqualDeep),
/* harmony export */   resolveEnabled: () => (/* binding */ resolveEnabled),
/* harmony export */   resolveStaleTime: () => (/* binding */ resolveStaleTime),
/* harmony export */   shallowEqualObjects: () => (/* binding */ shallowEqualObjects),
/* harmony export */   skipToken: () => (/* binding */ skipToken),
/* harmony export */   sleep: () => (/* binding */ sleep),
/* harmony export */   timeUntilStale: () => (/* binding */ timeUntilStale)
/* harmony export */ });
// src/utils.ts
var isServer = typeof window === "undefined" || "Deno" in globalThis;
function noop() {
}
function functionalUpdate(updater, input) {
  return typeof updater === "function" ? updater(input) : updater;
}
function isValidTimeout(value) {
  return typeof value === "number" && value >= 0 && value !== Infinity;
}
function timeUntilStale(updatedAt, staleTime) {
  return Math.max(updatedAt + (staleTime || 0) - Date.now(), 0);
}
function resolveStaleTime(staleTime, query) {
  return typeof staleTime === "function" ? staleTime(query) : staleTime;
}
function resolveEnabled(enabled, query) {
  return typeof enabled === "function" ? enabled(query) : enabled;
}
function matchQuery(filters, query) {
  const {
    type = "all",
    exact,
    fetchStatus,
    predicate,
    queryKey,
    stale
  } = filters;
  if (queryKey) {
    if (exact) {
      if (query.queryHash !== hashQueryKeyByOptions(queryKey, query.options)) {
        return false;
      }
    } else if (!partialMatchKey(query.queryKey, queryKey)) {
      return false;
    }
  }
  if (type !== "all") {
    const isActive = query.isActive();
    if (type === "active" && !isActive) {
      return false;
    }
    if (type === "inactive" && isActive) {
      return false;
    }
  }
  if (typeof stale === "boolean" && query.isStale() !== stale) {
    return false;
  }
  if (fetchStatus && fetchStatus !== query.state.fetchStatus) {
    return false;
  }
  if (predicate && !predicate(query)) {
    return false;
  }
  return true;
}
function matchMutation(filters, mutation) {
  const { exact, status, predicate, mutationKey } = filters;
  if (mutationKey) {
    if (!mutation.options.mutationKey) {
      return false;
    }
    if (exact) {
      if (hashKey(mutation.options.mutationKey) !== hashKey(mutationKey)) {
        return false;
      }
    } else if (!partialMatchKey(mutation.options.mutationKey, mutationKey)) {
      return false;
    }
  }
  if (status && mutation.state.status !== status) {
    return false;
  }
  if (predicate && !predicate(mutation)) {
    return false;
  }
  return true;
}
function hashQueryKeyByOptions(queryKey, options) {
  const hashFn = options?.queryKeyHashFn || hashKey;
  return hashFn(queryKey);
}
function hashKey(queryKey) {
  return JSON.stringify(
    queryKey,
    (_, val) => isPlainObject(val) ? Object.keys(val).sort().reduce((result, key) => {
      result[key] = val[key];
      return result;
    }, {}) : val
  );
}
function partialMatchKey(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (a && b && typeof a === "object" && typeof b === "object") {
    return !Object.keys(b).some((key) => !partialMatchKey(a[key], b[key]));
  }
  return false;
}
function replaceEqualDeep(a, b) {
  if (a === b) {
    return a;
  }
  const array = isPlainArray(a) && isPlainArray(b);
  if (array || isPlainObject(a) && isPlainObject(b)) {
    const aItems = array ? a : Object.keys(a);
    const aSize = aItems.length;
    const bItems = array ? b : Object.keys(b);
    const bSize = bItems.length;
    const copy = array ? [] : {};
    let equalItems = 0;
    for (let i = 0; i < bSize; i++) {
      const key = array ? i : bItems[i];
      if ((!array && aItems.includes(key) || array) && a[key] === void 0 && b[key] === void 0) {
        copy[key] = void 0;
        equalItems++;
      } else {
        copy[key] = replaceEqualDeep(a[key], b[key]);
        if (copy[key] === a[key] && a[key] !== void 0) {
          equalItems++;
        }
      }
    }
    return aSize === bSize && equalItems === aSize ? a : copy;
  }
  return b;
}
function shallowEqualObjects(a, b) {
  if (!b || Object.keys(a).length !== Object.keys(b).length) {
    return false;
  }
  for (const key in a) {
    if (a[key] !== b[key]) {
      return false;
    }
  }
  return true;
}
function isPlainArray(value) {
  return Array.isArray(value) && value.length === Object.keys(value).length;
}
function isPlainObject(o) {
  if (!hasObjectPrototype(o)) {
    return false;
  }
  const ctor = o.constructor;
  if (ctor === void 0) {
    return true;
  }
  const prot = ctor.prototype;
  if (!hasObjectPrototype(prot)) {
    return false;
  }
  if (!prot.hasOwnProperty("isPrototypeOf")) {
    return false;
  }
  if (Object.getPrototypeOf(o) !== Object.prototype) {
    return false;
  }
  return true;
}
function hasObjectPrototype(o) {
  return Object.prototype.toString.call(o) === "[object Object]";
}
function sleep(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
function replaceData(prevData, data, options) {
  if (typeof options.structuralSharing === "function") {
    return options.structuralSharing(prevData, data);
  } else if (options.structuralSharing !== false) {
    if (true) {
      try {
        return replaceEqualDeep(prevData, data);
      } catch (error) {
        console.error(
          `Structural sharing requires data to be JSON serializable. To fix this, turn off structuralSharing or return JSON-serializable data from your queryFn. [${options.queryHash}]: ${error}`
        );
      }
    }
    return replaceEqualDeep(prevData, data);
  }
  return data;
}
function keepPreviousData(previousData) {
  return previousData;
}
function addToEnd(items, item, max = 0) {
  const newItems = [...items, item];
  return max && newItems.length > max ? newItems.slice(1) : newItems;
}
function addToStart(items, item, max = 0) {
  const newItems = [item, ...items];
  return max && newItems.length > max ? newItems.slice(0, -1) : newItems;
}
var skipToken = Symbol();
function ensureQueryFn(options, fetchOptions) {
  if (true) {
    if (options.queryFn === skipToken) {
      console.error(
        `Attempted to invoke queryFn when set to skipToken. This is likely a configuration error. Query hash: '${options.queryHash}'`
      );
    }
  }
  if (!options.queryFn && fetchOptions?.initialPromise) {
    return () => fetchOptions.initialPromise;
  }
  if (!options.queryFn || options.queryFn === skipToken) {
    return () => Promise.reject(new Error(`Missing queryFn: '${options.queryHash}'`));
  }
  return options.queryFn;
}

//# sourceMappingURL=utils.js.map

/***/ }),

/***/ "./node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QueryClientContext: () => (/* binding */ QueryClientContext),
/* harmony export */   QueryClientProvider: () => (/* binding */ QueryClientProvider),
/* harmony export */   useQueryClient: () => (/* binding */ useQueryClient)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
"use client";

// src/QueryClientProvider.tsx


var QueryClientContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(
  void 0
);
var useQueryClient = (queryClient) => {
  const client = react__WEBPACK_IMPORTED_MODULE_0__.useContext(QueryClientContext);
  if (queryClient) {
    return queryClient;
  }
  if (!client) {
    throw new Error("No QueryClient set, use QueryClientProvider to set one");
  }
  return client;
};
var QueryClientProvider = ({
  client,
  children
}) => {
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    client.mount();
    return () => {
      client.unmount();
    };
  }, [client]);
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(QueryClientContext.Provider, { value: client, children });
};

//# sourceMappingURL=QueryClientProvider.js.map

/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/CatchBoundary.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/CatchBoundary.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CatchBoundary: () => (/* binding */ CatchBoundary),
/* harmony export */   ErrorComponent: () => (/* binding */ ErrorComponent)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");


function CatchBoundary(props) {
  const errorComponent = props.errorComponent ?? ErrorComponent;
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
    CatchBoundaryImpl,
    {
      getResetKey: props.getResetKey,
      onCatch: props.onCatch,
      children: ({ error, reset }) => {
        if (error) {
          return react__WEBPACK_IMPORTED_MODULE_1__.createElement(errorComponent, {
            error,
            reset
          });
        }
        return props.children;
      }
    }
  );
}
class CatchBoundaryImpl extends react__WEBPACK_IMPORTED_MODULE_1__.Component {
  constructor() {
    super(...arguments);
    this.state = { error: null };
  }
  static getDerivedStateFromProps(props) {
    return { resetKey: props.getResetKey() };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  reset() {
    this.setState({ error: null });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.error && prevState.resetKey !== this.state.resetKey) {
      this.reset();
    }
  }
  componentDidCatch(error, errorInfo) {
    if (this.props.onCatch) {
      this.props.onCatch(error, errorInfo);
    }
  }
  render() {
    return this.props.children({
      error: this.state.resetKey !== this.props.getResetKey() ? null : this.state.error,
      reset: () => {
        this.reset();
      }
    });
  }
}
function ErrorComponent({ error }) {
  const [show, setShow] = react__WEBPACK_IMPORTED_MODULE_1__.useState("development" !== "production");
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { style: { padding: ".5rem", maxWidth: "100%" }, children: [
    /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: ".5rem" }, children: [
      /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", { style: { fontSize: "1rem" }, children: "Something went wrong!" }),
      /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
        "button",
        {
          style: {
            appearance: "none",
            fontSize: ".6em",
            border: "1px solid currentColor",
            padding: ".1rem .2rem",
            fontWeight: "bold",
            borderRadius: ".25rem"
          },
          onClick: () => setShow((d) => !d),
          children: show ? "Hide Error" : "Show Error"
        }
      )
    ] }),
    /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { style: { height: ".25rem" } }),
    show ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", { children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
      "pre",
      {
        style: {
          fontSize: ".7em",
          border: "1px solid red",
          borderRadius: ".25rem",
          padding: ".3rem",
          color: "red",
          overflow: "auto"
        },
        children: error.message ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("code", { children: error.message }) : null
      }
    ) }) : null
  ] });
}

//# sourceMappingURL=CatchBoundary.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/Match.js":
/*!***************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/Match.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Match: () => (/* binding */ Match),
/* harmony export */   MatchInner: () => (/* binding */ MatchInner),
/* harmony export */   Outlet: () => (/* binding */ Outlet)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var tiny_invariant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tiny-invariant */ "./node_modules/tiny-invariant/dist/esm/tiny-invariant.js");
/* harmony import */ var tiny_warning__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tiny-warning */ "./node_modules/tiny-warning/dist/tiny-warning.esm.js");
/* harmony import */ var _tanstack_router_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @tanstack/router-core */ "./node_modules/@tanstack/router-core/dist/esm/root.js");
/* harmony import */ var _tanstack_router_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @tanstack/router-core */ "./node_modules/@tanstack/router-core/dist/esm/router.js");
/* harmony import */ var _tanstack_router_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @tanstack/router-core */ "./node_modules/@tanstack/router-core/dist/esm/utils.js");
/* harmony import */ var _CatchBoundary_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./CatchBoundary.js */ "./node_modules/@tanstack/react-router/dist/esm/CatchBoundary.js");
/* harmony import */ var _useRouterState_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./useRouterState.js */ "./node_modules/@tanstack/react-router/dist/esm/useRouterState.js");
/* harmony import */ var _useRouter_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./useRouter.js */ "./node_modules/@tanstack/react-router/dist/esm/useRouter.js");
/* harmony import */ var _not_found_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./not-found.js */ "./node_modules/@tanstack/react-router/dist/esm/not-found.js");
/* harmony import */ var _redirects_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./redirects.js */ "./node_modules/@tanstack/react-router/dist/esm/redirects.js");
/* harmony import */ var _matchContext_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./matchContext.js */ "./node_modules/@tanstack/react-router/dist/esm/matchContext.js");
/* harmony import */ var _SafeFragment_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SafeFragment.js */ "./node_modules/@tanstack/react-router/dist/esm/SafeFragment.js");
/* harmony import */ var _renderRouteNotFound_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./renderRouteNotFound.js */ "./node_modules/@tanstack/react-router/dist/esm/renderRouteNotFound.js");
/* harmony import */ var _scroll_restoration_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./scroll-restoration.js */ "./node_modules/@tanstack/react-router/dist/esm/scroll-restoration.js");
"use client";














const Match = react__WEBPACK_IMPORTED_MODULE_1__.memo(function MatchImpl({
  matchId
}) {
  var _a, _b;
  const router = (0,_useRouter_js__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
  const routeId = (0,_useRouterState_js__WEBPACK_IMPORTED_MODULE_4__.useRouterState)({
    select: (s) => {
      var _a2;
      return (_a2 = s.matches.find((d) => d.id === matchId)) == null ? void 0 : _a2.routeId;
    }
  });
  (0,tiny_invariant__WEBPACK_IMPORTED_MODULE_2__["default"])(
    routeId,
    `Could not find routeId for matchId "${matchId}". Please file an issue!`
  );
  const route = router.routesById[routeId];
  const PendingComponent = route.options.pendingComponent ?? router.options.defaultPendingComponent;
  const pendingElement = PendingComponent ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(PendingComponent, {}) : null;
  const routeErrorComponent = route.options.errorComponent ?? router.options.defaultErrorComponent;
  const routeOnCatch = route.options.onCatch ?? router.options.defaultOnCatch;
  const routeNotFoundComponent = route.isRoot ? (
    // If it's the root route, use the globalNotFound option, with fallback to the notFoundRoute's component
    route.options.notFoundComponent ?? ((_a = router.options.notFoundRoute) == null ? void 0 : _a.options.component)
  ) : route.options.notFoundComponent;
  const ResolvedSuspenseBoundary = (
    // If we're on the root route, allow forcefully wrapping in suspense
    (!route.isRoot || route.options.wrapInSuspense) && (route.options.wrapInSuspense ?? PendingComponent ?? ((_b = route.options.errorComponent) == null ? void 0 : _b.preload)) ? react__WEBPACK_IMPORTED_MODULE_1__.Suspense : _SafeFragment_js__WEBPACK_IMPORTED_MODULE_5__.SafeFragment
  );
  const ResolvedCatchBoundary = routeErrorComponent ? _CatchBoundary_js__WEBPACK_IMPORTED_MODULE_6__.CatchBoundary : _SafeFragment_js__WEBPACK_IMPORTED_MODULE_5__.SafeFragment;
  const ResolvedNotFoundBoundary = routeNotFoundComponent ? _not_found_js__WEBPACK_IMPORTED_MODULE_7__.CatchNotFound : _SafeFragment_js__WEBPACK_IMPORTED_MODULE_5__.SafeFragment;
  const resetKey = (0,_useRouterState_js__WEBPACK_IMPORTED_MODULE_4__.useRouterState)({
    select: (s) => s.loadedAt
  });
  const parentRouteId = (0,_useRouterState_js__WEBPACK_IMPORTED_MODULE_4__.useRouterState)({
    select: (s) => {
      var _a2;
      const index = s.matches.findIndex((d) => d.id === matchId);
      return (_a2 = s.matches[index - 1]) == null ? void 0 : _a2.routeId;
    }
  });
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: [
    /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_matchContext_js__WEBPACK_IMPORTED_MODULE_8__.matchContext.Provider, { value: matchId, children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ResolvedSuspenseBoundary, { fallback: pendingElement, children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
      ResolvedCatchBoundary,
      {
        getResetKey: () => resetKey,
        errorComponent: routeErrorComponent || _CatchBoundary_js__WEBPACK_IMPORTED_MODULE_6__.ErrorComponent,
        onCatch: (error, errorInfo) => {
          if ((0,_not_found_js__WEBPACK_IMPORTED_MODULE_7__.isNotFound)(error)) throw error;
          (0,tiny_warning__WEBPACK_IMPORTED_MODULE_9__["default"])(false, `Error in route match: ${matchId}`);
          routeOnCatch == null ? void 0 : routeOnCatch(error, errorInfo);
        },
        children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
          ResolvedNotFoundBoundary,
          {
            fallback: (error) => {
              if (!routeNotFoundComponent || error.routeId && error.routeId !== routeId || !error.routeId && !route.isRoot)
                throw error;
              return react__WEBPACK_IMPORTED_MODULE_1__.createElement(routeNotFoundComponent, error);
            },
            children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(MatchInner, { matchId })
          }
        )
      }
    ) }) }),
    parentRouteId === _tanstack_router_core__WEBPACK_IMPORTED_MODULE_10__.rootRouteId ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: [
      /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(OnRendered, {}),
      /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_scroll_restoration_js__WEBPACK_IMPORTED_MODULE_11__.ScrollRestoration, {})
    ] }) : null
  ] });
});
function OnRendered() {
  var _a;
  const router = (0,_useRouter_js__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
  const prevLocationRef = react__WEBPACK_IMPORTED_MODULE_1__.useRef(
    void 0
  );
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
    "script",
    {
      suppressHydrationWarning: true,
      ref: (el) => {
        if (el) {
          router.emit({
            type: "onRendered",
            ...(0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_12__.getLocationChangeInfo)(router.state)
          });
        } else {
          prevLocationRef.current = router.state.resolvedLocation;
        }
      }
    },
    (_a = router.state.resolvedLocation) == null ? void 0 : _a.state.key
  );
}
const MatchInner = react__WEBPACK_IMPORTED_MODULE_1__.memo(function MatchInnerImpl({
  matchId
}) {
  var _a, _b, _c;
  const router = (0,_useRouter_js__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
  const { match, key, routeId } = (0,_useRouterState_js__WEBPACK_IMPORTED_MODULE_4__.useRouterState)({
    select: (s) => {
      const matchIndex = s.matches.findIndex((d) => d.id === matchId);
      const match2 = s.matches[matchIndex];
      const routeId2 = match2.routeId;
      const remountFn = router.routesById[routeId2].options.remountDeps ?? router.options.defaultRemountDeps;
      const remountDeps = remountFn == null ? void 0 : remountFn({
        routeId: routeId2,
        loaderDeps: match2.loaderDeps,
        params: match2._strictParams,
        search: match2._strictSearch
      });
      const key2 = remountDeps ? JSON.stringify(remountDeps) : void 0;
      return {
        key: key2,
        routeId: routeId2,
        match: (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_13__.pick)(match2, ["id", "status", "error"])
      };
    },
    structuralSharing: true
  });
  const route = router.routesById[routeId];
  const out = react__WEBPACK_IMPORTED_MODULE_1__.useMemo(() => {
    const Comp = route.options.component ?? router.options.defaultComponent;
    if (Comp) {
      return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Comp, {}, key);
    }
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Outlet, {});
  }, [key, route.options.component, router.options.defaultComponent]);
  const RouteErrorComponent = (route.options.errorComponent ?? router.options.defaultErrorComponent) || _CatchBoundary_js__WEBPACK_IMPORTED_MODULE_6__.ErrorComponent;
  if (match.status === "notFound") {
    (0,tiny_invariant__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_not_found_js__WEBPACK_IMPORTED_MODULE_7__.isNotFound)(match.error), "Expected a notFound error");
    return (0,_renderRouteNotFound_js__WEBPACK_IMPORTED_MODULE_14__.renderRouteNotFound)(router, route, match.error);
  }
  if (match.status === "redirected") {
    (0,tiny_invariant__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_redirects_js__WEBPACK_IMPORTED_MODULE_15__.isRedirect)(match.error), "Expected a redirect error");
    throw (_a = router.getMatch(match.id)) == null ? void 0 : _a.loadPromise;
  }
  if (match.status === "error") {
    if (router.isServer) {
      return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
        RouteErrorComponent,
        {
          error: match.error,
          reset: void 0,
          info: {
            componentStack: ""
          }
        }
      );
    }
    throw match.error;
  }
  if (match.status === "pending") {
    const pendingMinMs = route.options.pendingMinMs ?? router.options.defaultPendingMinMs;
    if (pendingMinMs && !((_b = router.getMatch(match.id)) == null ? void 0 : _b.minPendingPromise)) {
      if (!router.isServer) {
        const minPendingPromise = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_13__.createControlledPromise)();
        Promise.resolve().then(() => {
          router.updateMatch(match.id, (prev) => ({
            ...prev,
            minPendingPromise
          }));
        });
        setTimeout(() => {
          minPendingPromise.resolve();
          router.updateMatch(match.id, (prev) => ({
            ...prev,
            minPendingPromise: void 0
          }));
        }, pendingMinMs);
      }
    }
    throw (_c = router.getMatch(match.id)) == null ? void 0 : _c.loadPromise;
  }
  return out;
});
const Outlet = react__WEBPACK_IMPORTED_MODULE_1__.memo(function OutletImpl() {
  const router = (0,_useRouter_js__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
  const matchId = react__WEBPACK_IMPORTED_MODULE_1__.useContext(_matchContext_js__WEBPACK_IMPORTED_MODULE_8__.matchContext);
  const routeId = (0,_useRouterState_js__WEBPACK_IMPORTED_MODULE_4__.useRouterState)({
    select: (s) => {
      var _a;
      return (_a = s.matches.find((d) => d.id === matchId)) == null ? void 0 : _a.routeId;
    }
  });
  const route = router.routesById[routeId];
  const parentGlobalNotFound = (0,_useRouterState_js__WEBPACK_IMPORTED_MODULE_4__.useRouterState)({
    select: (s) => {
      const matches = s.matches;
      const parentMatch = matches.find((d) => d.id === matchId);
      (0,tiny_invariant__WEBPACK_IMPORTED_MODULE_2__["default"])(
        parentMatch,
        `Could not find parent match for matchId "${matchId}"`
      );
      return parentMatch.globalNotFound;
    }
  });
  const childMatchId = (0,_useRouterState_js__WEBPACK_IMPORTED_MODULE_4__.useRouterState)({
    select: (s) => {
      var _a;
      const matches = s.matches;
      const index = matches.findIndex((d) => d.id === matchId);
      return (_a = matches[index + 1]) == null ? void 0 : _a.id;
    }
  });
  if (parentGlobalNotFound) {
    return (0,_renderRouteNotFound_js__WEBPACK_IMPORTED_MODULE_14__.renderRouteNotFound)(router, route, void 0);
  }
  if (!childMatchId) {
    return null;
  }
  const nextMatch = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Match, { matchId: childMatchId });
  const pendingElement = router.options.defaultPendingComponent ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(router.options.defaultPendingComponent, {}) : null;
  if (matchId === _tanstack_router_core__WEBPACK_IMPORTED_MODULE_10__.rootRouteId) {
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react__WEBPACK_IMPORTED_MODULE_1__.Suspense, { fallback: pendingElement, children: nextMatch });
  }
  return nextMatch;
});

//# sourceMappingURL=Match.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/Matches.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/Matches.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MatchRoute: () => (/* binding */ MatchRoute),
/* harmony export */   Matches: () => (/* binding */ Matches),
/* harmony export */   useChildMatches: () => (/* binding */ useChildMatches),
/* harmony export */   useMatchRoute: () => (/* binding */ useMatchRoute),
/* harmony export */   useMatches: () => (/* binding */ useMatches),
/* harmony export */   useParentMatches: () => (/* binding */ useParentMatches)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var tiny_warning__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tiny-warning */ "./node_modules/tiny-warning/dist/tiny-warning.esm.js");
/* harmony import */ var _CatchBoundary_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./CatchBoundary.js */ "./node_modules/@tanstack/react-router/dist/esm/CatchBoundary.js");
/* harmony import */ var _useRouterState_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./useRouterState.js */ "./node_modules/@tanstack/react-router/dist/esm/useRouterState.js");
/* harmony import */ var _useRouter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useRouter.js */ "./node_modules/@tanstack/react-router/dist/esm/useRouter.js");
/* harmony import */ var _Transitioner_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Transitioner.js */ "./node_modules/@tanstack/react-router/dist/esm/Transitioner.js");
/* harmony import */ var _matchContext_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./matchContext.js */ "./node_modules/@tanstack/react-router/dist/esm/matchContext.js");
/* harmony import */ var _Match_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Match.js */ "./node_modules/@tanstack/react-router/dist/esm/Match.js");
/* harmony import */ var _SafeFragment_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SafeFragment.js */ "./node_modules/@tanstack/react-router/dist/esm/SafeFragment.js");










function Matches() {
  const router = (0,_useRouter_js__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
  const pendingElement = router.options.defaultPendingComponent ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(router.options.defaultPendingComponent, {}) : null;
  const ResolvedSuspense = router.isServer || typeof document !== "undefined" && router.clientSsr ? _SafeFragment_js__WEBPACK_IMPORTED_MODULE_3__.SafeFragment : react__WEBPACK_IMPORTED_MODULE_1__.Suspense;
  const inner = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(ResolvedSuspense, { fallback: pendingElement, children: [
    /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Transitioner_js__WEBPACK_IMPORTED_MODULE_4__.Transitioner, {}),
    /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(MatchesInner, {})
  ] });
  return router.options.InnerWrap ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(router.options.InnerWrap, { children: inner }) : inner;
}
function MatchesInner() {
  const matchId = (0,_useRouterState_js__WEBPACK_IMPORTED_MODULE_5__.useRouterState)({
    select: (s) => {
      var _a;
      return (_a = s.matches[0]) == null ? void 0 : _a.id;
    }
  });
  const resetKey = (0,_useRouterState_js__WEBPACK_IMPORTED_MODULE_5__.useRouterState)({
    select: (s) => s.loadedAt
  });
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_matchContext_js__WEBPACK_IMPORTED_MODULE_6__.matchContext.Provider, { value: matchId, children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
    _CatchBoundary_js__WEBPACK_IMPORTED_MODULE_7__.CatchBoundary,
    {
      getResetKey: () => resetKey,
      errorComponent: _CatchBoundary_js__WEBPACK_IMPORTED_MODULE_7__.ErrorComponent,
      onCatch: (error) => {
        (0,tiny_warning__WEBPACK_IMPORTED_MODULE_8__["default"])(
          false,
          `The following error wasn't caught by any route! At the very least, consider setting an 'errorComponent' in your RootRoute!`
        );
        (0,tiny_warning__WEBPACK_IMPORTED_MODULE_8__["default"])(false, error.message || error.toString());
      },
      children: matchId ? /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Match_js__WEBPACK_IMPORTED_MODULE_9__.Match, { matchId }) : null
    }
  ) });
}
function useMatchRoute() {
  const router = (0,_useRouter_js__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
  (0,_useRouterState_js__WEBPACK_IMPORTED_MODULE_5__.useRouterState)({
    select: (s) => {
      var _a;
      return [s.location.href, (_a = s.resolvedLocation) == null ? void 0 : _a.href, s.status];
    },
    structuralSharing: true
  });
  return react__WEBPACK_IMPORTED_MODULE_1__.useCallback(
    (opts) => {
      const { pending, caseSensitive, fuzzy, includeSearch, ...rest } = opts;
      return router.matchRoute(rest, {
        pending,
        caseSensitive,
        fuzzy,
        includeSearch
      });
    },
    [router]
  );
}
function MatchRoute(props) {
  const matchRoute = useMatchRoute();
  const params = matchRoute(props);
  if (typeof props.children === "function") {
    return props.children(params);
  }
  return params ? props.children : null;
}
function useMatches(opts) {
  return (0,_useRouterState_js__WEBPACK_IMPORTED_MODULE_5__.useRouterState)({
    select: (state) => {
      const matches = state.matches;
      return (opts == null ? void 0 : opts.select) ? opts.select(matches) : matches;
    },
    structuralSharing: opts == null ? void 0 : opts.structuralSharing
  });
}
function useParentMatches(opts) {
  const contextMatchId = react__WEBPACK_IMPORTED_MODULE_1__.useContext(_matchContext_js__WEBPACK_IMPORTED_MODULE_6__.matchContext);
  return useMatches({
    select: (matches) => {
      matches = matches.slice(
        0,
        matches.findIndex((d) => d.id === contextMatchId)
      );
      return (opts == null ? void 0 : opts.select) ? opts.select(matches) : matches;
    },
    structuralSharing: opts == null ? void 0 : opts.structuralSharing
  });
}
function useChildMatches(opts) {
  const contextMatchId = react__WEBPACK_IMPORTED_MODULE_1__.useContext(_matchContext_js__WEBPACK_IMPORTED_MODULE_6__.matchContext);
  return useMatches({
    select: (matches) => {
      matches = matches.slice(
        matches.findIndex((d) => d.id === contextMatchId) + 1
      );
      return (opts == null ? void 0 : opts.select) ? opts.select(matches) : matches;
    },
    structuralSharing: opts == null ? void 0 : opts.structuralSharing
  });
}

//# sourceMappingURL=Matches.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/RouterProvider.js":
/*!************************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/RouterProvider.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RouterContextProvider: () => (/* binding */ RouterContextProvider),
/* harmony export */   RouterProvider: () => (/* binding */ RouterProvider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var _Matches_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Matches.js */ "./node_modules/@tanstack/react-router/dist/esm/Matches.js");
/* harmony import */ var _routerContext_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./routerContext.js */ "./node_modules/@tanstack/react-router/dist/esm/routerContext.js");



function RouterContextProvider({
  router,
  children,
  ...rest
}) {
  router.update({
    ...router.options,
    ...rest,
    context: {
      ...router.options.context,
      ...rest.context
    }
  });
  const routerContext = (0,_routerContext_js__WEBPACK_IMPORTED_MODULE_1__.getRouterContext)();
  const provider = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(routerContext.Provider, { value: router, children });
  if (router.options.Wrap) {
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(router.options.Wrap, { children: provider });
  }
  return provider;
}
function RouterProvider({ router, ...rest }) {
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(RouterContextProvider, { router, ...rest, children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_Matches_js__WEBPACK_IMPORTED_MODULE_2__.Matches, {}) });
}

//# sourceMappingURL=RouterProvider.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/SafeFragment.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/SafeFragment.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SafeFragment: () => (/* binding */ SafeFragment)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");

function SafeFragment(props) {
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, { children: props.children });
}

//# sourceMappingURL=SafeFragment.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/ScriptOnce.js":
/*!********************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/ScriptOnce.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ScriptOnce: () => (/* binding */ ScriptOnce)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var jsesc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jsesc */ "./node_modules/jsesc/jsesc.js");


function ScriptOnce({
  children,
  log
}) {
  if (typeof document !== "undefined") {
    return null;
  }
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
    "script",
    {
      className: "tsr-once",
      dangerouslySetInnerHTML: {
        __html: [
          children,
          (log ?? true) && "development" === "development" ? `console.info(\`Injected From Server:
${jsesc__WEBPACK_IMPORTED_MODULE_1__(children.toString(), { quotes: "backtick" })}\`)` : "",
          'if (typeof __TSR_SSR__ !== "undefined") __TSR_SSR__.cleanScripts()'
        ].filter(Boolean).join("\n")
      }
    }
  );
}

//# sourceMappingURL=ScriptOnce.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/Transitioner.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/Transitioner.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Transitioner: () => (/* binding */ Transitioner)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _tanstack_router_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @tanstack/router-core */ "./node_modules/@tanstack/router-core/dist/esm/path.js");
/* harmony import */ var _tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @tanstack/router-core */ "./node_modules/@tanstack/router-core/dist/esm/router.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/react-router/dist/esm/utils.js");
/* harmony import */ var _useRouter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useRouter.js */ "./node_modules/@tanstack/react-router/dist/esm/useRouter.js");
/* harmony import */ var _useRouterState_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useRouterState.js */ "./node_modules/@tanstack/react-router/dist/esm/useRouterState.js");





function Transitioner() {
  const router = (0,_useRouter_js__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
  const mountLoadForRouter = react__WEBPACK_IMPORTED_MODULE_0__.useRef({ router, mounted: false });
  const isLoading = (0,_useRouterState_js__WEBPACK_IMPORTED_MODULE_2__.useRouterState)({
    select: ({ isLoading: isLoading2 }) => isLoading2
  });
  const [isTransitioning, setIsTransitioning] = react__WEBPACK_IMPORTED_MODULE_0__.useState(false);
  const hasPendingMatches = (0,_useRouterState_js__WEBPACK_IMPORTED_MODULE_2__.useRouterState)({
    select: (s) => s.matches.some((d) => d.status === "pending"),
    structuralSharing: true
  });
  const previousIsLoading = (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.usePrevious)(isLoading);
  const isAnyPending = isLoading || isTransitioning || hasPendingMatches;
  const previousIsAnyPending = (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.usePrevious)(isAnyPending);
  const isPagePending = isLoading || hasPendingMatches;
  const previousIsPagePending = (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.usePrevious)(isPagePending);
  if (!router.isServer) {
    router.startReactTransition = (fn) => {
      setIsTransitioning(true);
      react__WEBPACK_IMPORTED_MODULE_0__.startTransition(() => {
        fn();
        setIsTransitioning(false);
      });
    };
  }
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    const unsub = router.history.subscribe(router.load);
    const nextLocation = router.buildLocation({
      to: router.latestLocation.pathname,
      search: true,
      params: true,
      hash: true,
      state: true,
      _includeValidateSearch: true
    });
    if ((0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_4__.trimPathRight)(router.latestLocation.href) !== (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_4__.trimPathRight)(nextLocation.href)) {
      router.commitLocation({ ...nextLocation, replace: true });
    }
    return () => {
      unsub();
    };
  }, [router, router.history]);
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.useLayoutEffect)(() => {
    if (typeof window !== "undefined" && router.clientSsr || mountLoadForRouter.current.router === router && mountLoadForRouter.current.mounted) {
      return;
    }
    mountLoadForRouter.current = { router, mounted: true };
    const tryLoad = async () => {
      try {
        await router.load();
      } catch (err) {
        console.error(err);
      }
    };
    tryLoad();
  }, [router]);
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.useLayoutEffect)(() => {
    if (previousIsLoading && !isLoading) {
      router.emit({
        type: "onLoad",
        // When the new URL has committed, when the new matches have been loaded into state.matches
        ...(0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.getLocationChangeInfo)(router.state)
      });
    }
  }, [previousIsLoading, router, isLoading]);
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.useLayoutEffect)(() => {
    if (previousIsPagePending && !isPagePending) {
      router.emit({
        type: "onBeforeRouteMount",
        ...(0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.getLocationChangeInfo)(router.state)
      });
    }
  }, [isPagePending, previousIsPagePending, router]);
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.useLayoutEffect)(() => {
    if (previousIsAnyPending && !isAnyPending) {
      router.emit({
        type: "onResolved",
        ...(0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.getLocationChangeInfo)(router.state)
      });
      router.__store.setState((s) => ({
        ...s,
        status: "idle",
        resolvedLocation: s.location
      }));
    }
  }, [isAnyPending, previousIsAnyPending, router]);
  return null;
}

//# sourceMappingURL=Transitioner.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/fileRoute.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/fileRoute.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FileRoute: () => (/* binding */ FileRoute),
/* harmony export */   FileRouteLoader: () => (/* binding */ FileRouteLoader),
/* harmony export */   LazyRoute: () => (/* binding */ LazyRoute),
/* harmony export */   createFileRoute: () => (/* binding */ createFileRoute),
/* harmony export */   createLazyFileRoute: () => (/* binding */ createLazyFileRoute),
/* harmony export */   createLazyRoute: () => (/* binding */ createLazyRoute)
/* harmony export */ });
/* harmony import */ var tiny_warning__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tiny-warning */ "./node_modules/tiny-warning/dist/tiny-warning.esm.js");
/* harmony import */ var _route_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./route.js */ "./node_modules/@tanstack/react-router/dist/esm/route.js");
/* harmony import */ var _useMatch_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useMatch.js */ "./node_modules/@tanstack/react-router/dist/esm/useMatch.js");
/* harmony import */ var _useLoaderDeps_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./useLoaderDeps.js */ "./node_modules/@tanstack/react-router/dist/esm/useLoaderDeps.js");
/* harmony import */ var _useLoaderData_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./useLoaderData.js */ "./node_modules/@tanstack/react-router/dist/esm/useLoaderData.js");
/* harmony import */ var _useSearch_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./useSearch.js */ "./node_modules/@tanstack/react-router/dist/esm/useSearch.js");
/* harmony import */ var _useParams_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./useParams.js */ "./node_modules/@tanstack/react-router/dist/esm/useParams.js");
/* harmony import */ var _useNavigate_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./useNavigate.js */ "./node_modules/@tanstack/react-router/dist/esm/useNavigate.js");








function createFileRoute(path) {
  return new FileRoute(path, {
    silent: true
  }).createRoute;
}
class FileRoute {
  constructor(path, _opts) {
    this.path = path;
    this.createRoute = (options) => {
      (0,tiny_warning__WEBPACK_IMPORTED_MODULE_0__["default"])(
        this.silent,
        "FileRoute is deprecated and will be removed in the next major version. Use the createFileRoute(path)(options) function instead."
      );
      const route = (0,_route_js__WEBPACK_IMPORTED_MODULE_1__.createRoute)(options);
      route.isRoot = false;
      return route;
    };
    this.silent = _opts == null ? void 0 : _opts.silent;
  }
}
function FileRouteLoader(_path) {
  (0,tiny_warning__WEBPACK_IMPORTED_MODULE_0__["default"])(
    false,
    `FileRouteLoader is deprecated and will be removed in the next major version. Please place the loader function in the the main route file, inside the \`createFileRoute('/path/to/file')(options)\` options`
  );
  return (loaderFn) => loaderFn;
}
class LazyRoute {
  constructor(opts) {
    this.useMatch = (opts2) => {
      return (0,_useMatch_js__WEBPACK_IMPORTED_MODULE_2__.useMatch)({
        select: opts2 == null ? void 0 : opts2.select,
        from: this.options.id,
        structuralSharing: opts2 == null ? void 0 : opts2.structuralSharing
      });
    };
    this.useRouteContext = (opts2) => {
      return (0,_useMatch_js__WEBPACK_IMPORTED_MODULE_2__.useMatch)({
        from: this.options.id,
        select: (d) => (opts2 == null ? void 0 : opts2.select) ? opts2.select(d.context) : d.context
      });
    };
    this.useSearch = (opts2) => {
      return (0,_useSearch_js__WEBPACK_IMPORTED_MODULE_3__.useSearch)({
        select: opts2 == null ? void 0 : opts2.select,
        structuralSharing: opts2 == null ? void 0 : opts2.structuralSharing,
        from: this.options.id
      });
    };
    this.useParams = (opts2) => {
      return (0,_useParams_js__WEBPACK_IMPORTED_MODULE_4__.useParams)({
        select: opts2 == null ? void 0 : opts2.select,
        structuralSharing: opts2 == null ? void 0 : opts2.structuralSharing,
        from: this.options.id
      });
    };
    this.useLoaderDeps = (opts2) => {
      return (0,_useLoaderDeps_js__WEBPACK_IMPORTED_MODULE_5__.useLoaderDeps)({ ...opts2, from: this.options.id });
    };
    this.useLoaderData = (opts2) => {
      return (0,_useLoaderData_js__WEBPACK_IMPORTED_MODULE_6__.useLoaderData)({ ...opts2, from: this.options.id });
    };
    this.useNavigate = () => {
      return (0,_useNavigate_js__WEBPACK_IMPORTED_MODULE_7__.useNavigate)({ from: this.options.id });
    };
    this.options = opts;
    this.$$typeof = Symbol.for("react.memo");
  }
}
function createLazyRoute(id) {
  return (opts) => {
    return new LazyRoute({ id, ...opts });
  };
}
function createLazyFileRoute(id) {
  return (opts) => new LazyRoute({ id, ...opts });
}

//# sourceMappingURL=fileRoute.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/matchContext.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/matchContext.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dummyMatchContext: () => (/* binding */ dummyMatchContext),
/* harmony export */   matchContext: () => (/* binding */ matchContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");

const matchContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(void 0);
const dummyMatchContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(
  void 0
);

//# sourceMappingURL=matchContext.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/not-found.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/not-found.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CatchNotFound: () => (/* binding */ CatchNotFound),
/* harmony export */   DefaultGlobalNotFound: () => (/* binding */ DefaultGlobalNotFound),
/* harmony export */   isNotFound: () => (/* binding */ isNotFound),
/* harmony export */   notFound: () => (/* binding */ notFound)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var _CatchBoundary_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CatchBoundary.js */ "./node_modules/@tanstack/react-router/dist/esm/CatchBoundary.js");
/* harmony import */ var _useRouterState_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useRouterState.js */ "./node_modules/@tanstack/react-router/dist/esm/useRouterState.js");



function notFound(options = {}) {
  options.isNotFound = true;
  if (options.throw) throw options;
  return options;
}
function isNotFound(obj) {
  return !!(obj == null ? void 0 : obj.isNotFound);
}
function CatchNotFound(props) {
  const resetKey = (0,_useRouterState_js__WEBPACK_IMPORTED_MODULE_1__.useRouterState)({
    select: (s) => `not-found-${s.location.pathname}-${s.status}`
  });
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
    _CatchBoundary_js__WEBPACK_IMPORTED_MODULE_2__.CatchBoundary,
    {
      getResetKey: () => resetKey,
      onCatch: (error, errorInfo) => {
        var _a;
        if (isNotFound(error)) {
          (_a = props.onCatch) == null ? void 0 : _a.call(props, error, errorInfo);
        } else {
          throw error;
        }
      },
      errorComponent: ({ error }) => {
        var _a;
        if (isNotFound(error)) {
          return (_a = props.fallback) == null ? void 0 : _a.call(props, error);
        } else {
          throw error;
        }
      },
      children: props.children
    }
  );
}
function DefaultGlobalNotFound() {
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", { children: "Not Found" });
}

//# sourceMappingURL=not-found.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/redirects.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/redirects.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isRedirect: () => (/* binding */ isRedirect),
/* harmony export */   isResolvedRedirect: () => (/* binding */ isResolvedRedirect),
/* harmony export */   redirect: () => (/* binding */ redirect)
/* harmony export */ });
function redirect(opts) {
  opts.isRedirect = true;
  opts.statusCode = opts.statusCode || opts.code || 307;
  opts.headers = opts.headers || {};
  if (!opts.reloadDocument) {
    opts.reloadDocument = false;
    try {
      new URL(`${opts.href}`);
      opts.reloadDocument = true;
    } catch {
    }
  }
  if (opts.throw) {
    throw opts;
  }
  return opts;
}
function isRedirect(obj) {
  return !!(obj == null ? void 0 : obj.isRedirect);
}
function isResolvedRedirect(obj) {
  return !!(obj == null ? void 0 : obj.isRedirect) && obj.href;
}

//# sourceMappingURL=redirects.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/renderRouteNotFound.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/renderRouteNotFound.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderRouteNotFound: () => (/* binding */ renderRouteNotFound)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var tiny_warning__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tiny-warning */ "./node_modules/tiny-warning/dist/tiny-warning.esm.js");
/* harmony import */ var _not_found_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./not-found.js */ "./node_modules/@tanstack/react-router/dist/esm/not-found.js");



function renderRouteNotFound(router, route, data) {
  if (!route.options.notFoundComponent) {
    if (router.options.defaultNotFoundComponent) {
      return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(router.options.defaultNotFoundComponent, { data });
    }
    if (true) {
      (0,tiny_warning__WEBPACK_IMPORTED_MODULE_1__["default"])(
        route.options.notFoundComponent,
        `A notFoundError was encountered on the route with ID "${route.id}", but a notFoundComponent option was not configured, nor was a router level defaultNotFoundComponent configured. Consider configuring at least one of these to avoid TanStack Router's overly generic defaultNotFoundComponent (<div>Not Found<div>)`
      );
    }
    return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_not_found_js__WEBPACK_IMPORTED_MODULE_2__.DefaultGlobalNotFound, {});
  }
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(route.options.notFoundComponent, { data });
}

//# sourceMappingURL=renderRouteNotFound.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/route.js":
/*!***************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/route.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NotFoundRoute: () => (/* binding */ NotFoundRoute),
/* harmony export */   RootRoute: () => (/* binding */ RootRoute),
/* harmony export */   Route: () => (/* binding */ Route),
/* harmony export */   RouteApi: () => (/* binding */ RouteApi),
/* harmony export */   createRootRoute: () => (/* binding */ createRootRoute),
/* harmony export */   createRootRouteWithContext: () => (/* binding */ createRootRouteWithContext),
/* harmony export */   createRoute: () => (/* binding */ createRoute),
/* harmony export */   createRouteMask: () => (/* binding */ createRouteMask),
/* harmony export */   getRouteApi: () => (/* binding */ getRouteApi),
/* harmony export */   rootRouteWithContext: () => (/* binding */ rootRouteWithContext)
/* harmony export */ });
/* harmony import */ var tiny_invariant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tiny-invariant */ "./node_modules/tiny-invariant/dist/esm/tiny-invariant.js");
/* harmony import */ var _tanstack_router_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @tanstack/router-core */ "./node_modules/@tanstack/router-core/dist/esm/root.js");
/* harmony import */ var _tanstack_router_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @tanstack/router-core */ "./node_modules/@tanstack/router-core/dist/esm/path.js");
/* harmony import */ var _useLoaderData_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./useLoaderData.js */ "./node_modules/@tanstack/react-router/dist/esm/useLoaderData.js");
/* harmony import */ var _useLoaderDeps_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./useLoaderDeps.js */ "./node_modules/@tanstack/react-router/dist/esm/useLoaderDeps.js");
/* harmony import */ var _useParams_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./useParams.js */ "./node_modules/@tanstack/react-router/dist/esm/useParams.js");
/* harmony import */ var _useSearch_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useSearch.js */ "./node_modules/@tanstack/react-router/dist/esm/useSearch.js");
/* harmony import */ var _not_found_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./not-found.js */ "./node_modules/@tanstack/react-router/dist/esm/not-found.js");
/* harmony import */ var _useNavigate_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./useNavigate.js */ "./node_modules/@tanstack/react-router/dist/esm/useNavigate.js");
/* harmony import */ var _useMatch_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useMatch.js */ "./node_modules/@tanstack/react-router/dist/esm/useMatch.js");









function getRouteApi(id) {
  return new RouteApi({ id });
}
class RouteApi {
  /**
   * @deprecated Use the `getRouteApi` function instead.
   */
  constructor({ id }) {
    this.useMatch = (opts) => {
      return (0,_useMatch_js__WEBPACK_IMPORTED_MODULE_1__.useMatch)({
        select: opts == null ? void 0 : opts.select,
        from: this.id,
        structuralSharing: opts == null ? void 0 : opts.structuralSharing
      });
    };
    this.useRouteContext = (opts) => {
      return (0,_useMatch_js__WEBPACK_IMPORTED_MODULE_1__.useMatch)({
        from: this.id,
        select: (d) => (opts == null ? void 0 : opts.select) ? opts.select(d.context) : d.context
      });
    };
    this.useSearch = (opts) => {
      return (0,_useSearch_js__WEBPACK_IMPORTED_MODULE_2__.useSearch)({
        select: opts == null ? void 0 : opts.select,
        structuralSharing: opts == null ? void 0 : opts.structuralSharing,
        from: this.id
      });
    };
    this.useParams = (opts) => {
      return (0,_useParams_js__WEBPACK_IMPORTED_MODULE_3__.useParams)({
        select: opts == null ? void 0 : opts.select,
        structuralSharing: opts == null ? void 0 : opts.structuralSharing,
        from: this.id
      });
    };
    this.useLoaderDeps = (opts) => {
      return (0,_useLoaderDeps_js__WEBPACK_IMPORTED_MODULE_4__.useLoaderDeps)({ ...opts, from: this.id, strict: false });
    };
    this.useLoaderData = (opts) => {
      return (0,_useLoaderData_js__WEBPACK_IMPORTED_MODULE_5__.useLoaderData)({ ...opts, from: this.id, strict: false });
    };
    this.useNavigate = () => {
      return (0,_useNavigate_js__WEBPACK_IMPORTED_MODULE_6__.useNavigate)({ from: this.id });
    };
    this.notFound = (opts) => {
      return (0,_not_found_js__WEBPACK_IMPORTED_MODULE_7__.notFound)({ routeId: this.id, ...opts });
    };
    this.id = id;
  }
}
class Route {
  /**
   * @deprecated Use the `createRoute` function instead.
   */
  constructor(options) {
    this.init = (opts) => {
      var _a, _b;
      this.originalIndex = opts.originalIndex;
      const options2 = this.options;
      const isRoot = !(options2 == null ? void 0 : options2.path) && !(options2 == null ? void 0 : options2.id);
      this.parentRoute = (_b = (_a = this.options).getParentRoute) == null ? void 0 : _b.call(_a);
      if (isRoot) {
        this._path = _tanstack_router_core__WEBPACK_IMPORTED_MODULE_8__.rootRouteId;
      } else {
        (0,tiny_invariant__WEBPACK_IMPORTED_MODULE_0__["default"])(
          this.parentRoute,
          `Child Route instances must pass a 'getParentRoute: () => ParentRoute' option that returns a Route instance.`
        );
      }
      let path = isRoot ? _tanstack_router_core__WEBPACK_IMPORTED_MODULE_8__.rootRouteId : options2.path;
      if (path && path !== "/") {
        path = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_9__.trimPathLeft)(path);
      }
      const customId = (options2 == null ? void 0 : options2.id) || path;
      let id = isRoot ? _tanstack_router_core__WEBPACK_IMPORTED_MODULE_8__.rootRouteId : (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_9__.joinPaths)([
        this.parentRoute.id === _tanstack_router_core__WEBPACK_IMPORTED_MODULE_8__.rootRouteId ? "" : this.parentRoute.id,
        customId
      ]);
      if (path === _tanstack_router_core__WEBPACK_IMPORTED_MODULE_8__.rootRouteId) {
        path = "/";
      }
      if (id !== _tanstack_router_core__WEBPACK_IMPORTED_MODULE_8__.rootRouteId) {
        id = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_9__.joinPaths)(["/", id]);
      }
      const fullPath = id === _tanstack_router_core__WEBPACK_IMPORTED_MODULE_8__.rootRouteId ? "/" : (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_9__.joinPaths)([this.parentRoute.fullPath, path]);
      this._path = path;
      this._id = id;
      this._fullPath = fullPath;
      this._to = fullPath;
      this._ssr = (options2 == null ? void 0 : options2.ssr) ?? opts.defaultSsr ?? true;
    };
    this.updateLoader = (options2) => {
      Object.assign(this.options, options2);
      return this;
    };
    this.update = (options2) => {
      Object.assign(this.options, options2);
      return this;
    };
    this.lazy = (lazyFn) => {
      this.lazyFn = lazyFn;
      return this;
    };
    this.useMatch = (opts) => {
      return (0,_useMatch_js__WEBPACK_IMPORTED_MODULE_1__.useMatch)({
        select: opts == null ? void 0 : opts.select,
        from: this.id,
        structuralSharing: opts == null ? void 0 : opts.structuralSharing
      });
    };
    this.useRouteContext = (opts) => {
      return (0,_useMatch_js__WEBPACK_IMPORTED_MODULE_1__.useMatch)({
        ...opts,
        from: this.id,
        select: (d) => (opts == null ? void 0 : opts.select) ? opts.select(d.context) : d.context
      });
    };
    this.useSearch = (opts) => {
      return (0,_useSearch_js__WEBPACK_IMPORTED_MODULE_2__.useSearch)({
        select: opts == null ? void 0 : opts.select,
        structuralSharing: opts == null ? void 0 : opts.structuralSharing,
        from: this.id
      });
    };
    this.useParams = (opts) => {
      return (0,_useParams_js__WEBPACK_IMPORTED_MODULE_3__.useParams)({
        select: opts == null ? void 0 : opts.select,
        structuralSharing: opts == null ? void 0 : opts.structuralSharing,
        from: this.id
      });
    };
    this.useLoaderDeps = (opts) => {
      return (0,_useLoaderDeps_js__WEBPACK_IMPORTED_MODULE_4__.useLoaderDeps)({ ...opts, from: this.id });
    };
    this.useLoaderData = (opts) => {
      return (0,_useLoaderData_js__WEBPACK_IMPORTED_MODULE_5__.useLoaderData)({ ...opts, from: this.id });
    };
    this.useNavigate = () => {
      return (0,_useNavigate_js__WEBPACK_IMPORTED_MODULE_6__.useNavigate)({ from: this.id });
    };
    this.options = options || {};
    this.isRoot = !(options == null ? void 0 : options.getParentRoute);
    (0,tiny_invariant__WEBPACK_IMPORTED_MODULE_0__["default"])(
      !((options == null ? void 0 : options.id) && (options == null ? void 0 : options.path)),
      `Route cannot have both an 'id' and a 'path' option.`
    );
    this.$$typeof = Symbol.for("react.memo");
  }
  get to() {
    return this._to;
  }
  get id() {
    return this._id;
  }
  get path() {
    return this._path;
  }
  get fullPath() {
    return this._fullPath;
  }
  get ssr() {
    return this._ssr;
  }
  addChildren(children) {
    return this._addFileChildren(children);
  }
  _addFileChildren(children) {
    if (Array.isArray(children)) {
      this.children = children;
    }
    if (typeof children === "object" && children !== null) {
      this.children = Object.values(children);
    }
    return this;
  }
}
function createRoute(options) {
  return new Route(options);
}
function createRootRouteWithContext() {
  return (options) => {
    return createRootRoute(options);
  };
}
const rootRouteWithContext = createRootRouteWithContext;
class RootRoute extends Route {
  /**
   * @deprecated `RootRoute` is now an internal implementation detail. Use `createRootRoute()` instead.
   */
  constructor(options) {
    super(options);
  }
  addChildren(children) {
    super.addChildren(children);
    return this;
  }
  _addFileChildren(children) {
    super._addFileChildren(children);
    return this;
  }
  _addFileTypes() {
    return this;
  }
}
function createRootRoute(options) {
  return new RootRoute(options);
}
function createRouteMask(opts) {
  return opts;
}
class NotFoundRoute extends Route {
  constructor(options) {
    super({
      ...options,
      id: "404"
    });
  }
}

//# sourceMappingURL=route.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/router.js":
/*!****************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/router.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PathParamError: () => (/* binding */ PathParamError),
/* harmony export */   Router: () => (/* binding */ Router),
/* harmony export */   SearchParamError: () => (/* binding */ SearchParamError),
/* harmony export */   componentTypes: () => (/* binding */ componentTypes),
/* harmony export */   createRouter: () => (/* binding */ createRouter),
/* harmony export */   getInitialRouterState: () => (/* binding */ getInitialRouterState),
/* harmony export */   lazyFn: () => (/* binding */ lazyFn)
/* harmony export */ });
/* harmony import */ var _tanstack_history__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tanstack/history */ "./node_modules/@tanstack/history/dist/esm/index.js");
/* harmony import */ var _tanstack_react_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tanstack/react-store */ "./node_modules/@tanstack/store/dist/esm/store.js");
/* harmony import */ var _tanstack_react_store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @tanstack/react-store */ "./node_modules/@tanstack/store/dist/esm/scheduler.js");
/* harmony import */ var tiny_invariant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tiny-invariant */ "./node_modules/tiny-invariant/dist/esm/tiny-invariant.js");
/* harmony import */ var _tanstack_router_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tanstack/router-core */ "./node_modules/@tanstack/router-core/dist/esm/path.js");
/* harmony import */ var _tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @tanstack/router-core */ "./node_modules/@tanstack/router-core/dist/esm/utils.js");
/* harmony import */ var _tanstack_router_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @tanstack/router-core */ "./node_modules/@tanstack/router-core/dist/esm/root.js");
/* harmony import */ var _tanstack_router_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @tanstack/router-core */ "./node_modules/@tanstack/router-core/dist/esm/router.js");
/* harmony import */ var _tanstack_router_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @tanstack/router-core */ "./node_modules/@tanstack/router-core/dist/esm/searchParams.js");
/* harmony import */ var _redirects_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./redirects.js */ "./node_modules/@tanstack/react-router/dist/esm/redirects.js");
/* harmony import */ var _not_found_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./not-found.js */ "./node_modules/@tanstack/react-router/dist/esm/not-found.js");
/* harmony import */ var _scroll_restoration_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scroll-restoration.js */ "./node_modules/@tanstack/react-router/dist/esm/scroll-restoration.js");







const componentTypes = [
  "component",
  "errorComponent",
  "pendingComponent",
  "notFoundComponent"
];
function routeNeedsPreload(route) {
  var _a;
  for (const componentType of componentTypes) {
    if ((_a = route.options[componentType]) == null ? void 0 : _a.preload) {
      return true;
    }
  }
  return false;
}
function validateSearch(validateSearch2, input) {
  if (validateSearch2 == null) return {};
  if ("~standard" in validateSearch2) {
    const result = validateSearch2["~standard"].validate(input);
    if (result instanceof Promise)
      throw new SearchParamError("Async validation not supported");
    if (result.issues)
      throw new SearchParamError(JSON.stringify(result.issues, void 0, 2), {
        cause: result
      });
    return result.value;
  }
  if ("parse" in validateSearch2) {
    return validateSearch2.parse(input);
  }
  if (typeof validateSearch2 === "function") {
    return validateSearch2(input);
  }
  return {};
}
function createRouter(options) {
  return new Router(options);
}
class Router {
  /**
   * @deprecated Use the `createRouter` function instead
   */
  constructor(options) {
    this.tempLocationKey = `${Math.round(
      Math.random() * 1e7
    )}`;
    this.resetNextScroll = true;
    this.shouldViewTransition = void 0;
    this.isViewTransitionTypesSupported = void 0;
    this.subscribers = /* @__PURE__ */ new Set();
    this.isScrollRestoring = false;
    this.isScrollRestorationSetup = false;
    this.startReactTransition = (fn) => fn();
    this.update = (newOptions) => {
      var _a;
      if (newOptions.notFoundRoute) {
        console.warn(
          "The notFoundRoute API is deprecated and will be removed in the next major version. See https://tanstack.com/router/v1/docs/framework/react/guide/not-found-errors#migrating-from-notfoundroute for more info."
        );
      }
      const previousOptions = this.options;
      this.options = {
        ...this.options,
        ...newOptions
      };
      this.isServer = this.options.isServer ?? typeof document === "undefined";
      this.pathParamsDecodeCharMap = this.options.pathParamsAllowedCharacters ? new Map(
        this.options.pathParamsAllowedCharacters.map((char) => [
          encodeURIComponent(char),
          char
        ])
      ) : void 0;
      if (!this.basepath || newOptions.basepath && newOptions.basepath !== previousOptions.basepath) {
        if (newOptions.basepath === void 0 || newOptions.basepath === "" || newOptions.basepath === "/") {
          this.basepath = "/";
        } else {
          this.basepath = `/${(0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_1__.trimPath)(newOptions.basepath)}`;
        }
      }
      if (
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        !this.history || this.options.history && this.options.history !== this.history
      ) {
        this.history = this.options.history ?? (this.isServer ? (0,_tanstack_history__WEBPACK_IMPORTED_MODULE_2__.createMemoryHistory)({
          initialEntries: [this.basepath || "/"]
        }) : (0,_tanstack_history__WEBPACK_IMPORTED_MODULE_2__.createBrowserHistory)());
        this.latestLocation = this.parseLocation();
      }
      if (this.options.routeTree !== this.routeTree) {
        this.routeTree = this.options.routeTree;
        this.buildRouteTree();
      }
      if (!this.__store) {
        this.__store = new _tanstack_react_store__WEBPACK_IMPORTED_MODULE_3__.Store(getInitialRouterState(this.latestLocation), {
          onUpdate: () => {
            this.__store.state = {
              ...this.state,
              cachedMatches: this.state.cachedMatches.filter(
                (d) => !["redirected"].includes(d.status)
              )
            };
          }
        });
        (0,_scroll_restoration_js__WEBPACK_IMPORTED_MODULE_4__.setupScrollRestoration)(this);
      }
      if (typeof window !== "undefined" && "CSS" in window && // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      typeof ((_a = window.CSS) == null ? void 0 : _a.supports) === "function") {
        this.isViewTransitionTypesSupported = window.CSS.supports(
          "selector(:active-view-transition-type(a)"
        );
      }
    };
    this.buildRouteTree = () => {
      this.routesById = {};
      this.routesByPath = {};
      const notFoundRoute = this.options.notFoundRoute;
      if (notFoundRoute) {
        notFoundRoute.init({
          originalIndex: 99999999999,
          defaultSsr: this.options.defaultSsr
        });
        this.routesById[notFoundRoute.id] = notFoundRoute;
      }
      const recurseRoutes = (childRoutes) => {
        childRoutes.forEach((childRoute, i) => {
          childRoute.init({
            originalIndex: i,
            defaultSsr: this.options.defaultSsr
          });
          const existingRoute = this.routesById[childRoute.id];
          (0,tiny_invariant__WEBPACK_IMPORTED_MODULE_0__["default"])(
            !existingRoute,
            `Duplicate routes found with id: ${String(childRoute.id)}`
          );
          this.routesById[childRoute.id] = childRoute;
          if (!childRoute.isRoot && childRoute.path) {
            const trimmedFullPath = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_1__.trimPathRight)(childRoute.fullPath);
            if (!this.routesByPath[trimmedFullPath] || childRoute.fullPath.endsWith("/")) {
              this.routesByPath[trimmedFullPath] = childRoute;
            }
          }
          const children = childRoute.children;
          if (children == null ? void 0 : children.length) {
            recurseRoutes(children);
          }
        });
      };
      recurseRoutes([this.routeTree]);
      const scoredRoutes = [];
      const routes = Object.values(this.routesById);
      routes.forEach((d, i) => {
        var _a;
        if (d.isRoot || !d.path) {
          return;
        }
        const trimmed = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_1__.trimPathLeft)(d.fullPath);
        const parsed = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_1__.parsePathname)(trimmed);
        while (parsed.length > 1 && ((_a = parsed[0]) == null ? void 0 : _a.value) === "/") {
          parsed.shift();
        }
        const scores = parsed.map((segment) => {
          if (segment.value === "/") {
            return 0.75;
          }
          if (segment.type === "param") {
            return 0.5;
          }
          if (segment.type === "wildcard") {
            return 0.25;
          }
          return 1;
        });
        scoredRoutes.push({ child: d, trimmed, parsed, index: i, scores });
      });
      this.flatRoutes = scoredRoutes.sort((a, b) => {
        const minLength = Math.min(a.scores.length, b.scores.length);
        for (let i = 0; i < minLength; i++) {
          if (a.scores[i] !== b.scores[i]) {
            return b.scores[i] - a.scores[i];
          }
        }
        if (a.scores.length !== b.scores.length) {
          return b.scores.length - a.scores.length;
        }
        for (let i = 0; i < minLength; i++) {
          if (a.parsed[i].value !== b.parsed[i].value) {
            return a.parsed[i].value > b.parsed[i].value ? 1 : -1;
          }
        }
        return a.index - b.index;
      }).map((d, i) => {
        d.child.rank = i;
        return d.child;
      });
    };
    this.subscribe = (eventType, fn) => {
      const listener = {
        eventType,
        fn
      };
      this.subscribers.add(listener);
      return () => {
        this.subscribers.delete(listener);
      };
    };
    this.emit = (routerEvent) => {
      this.subscribers.forEach((listener) => {
        if (listener.eventType === routerEvent.type) {
          listener.fn(routerEvent);
        }
      });
    };
    this.parseLocation = (previousLocation, locationToParse) => {
      const parse = ({
        pathname,
        search,
        hash,
        state
      }) => {
        const parsedSearch = this.options.parseSearch(search);
        const searchStr = this.options.stringifySearch(parsedSearch);
        return {
          pathname,
          searchStr,
          search: (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.replaceEqualDeep)(previousLocation == null ? void 0 : previousLocation.search, parsedSearch),
          hash: hash.split("#").reverse()[0] ?? "",
          href: `${pathname}${searchStr}${hash}`,
          state: (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.replaceEqualDeep)(previousLocation == null ? void 0 : previousLocation.state, state)
        };
      };
      const location = parse(locationToParse ?? this.history.location);
      const { __tempLocation, __tempKey } = location.state;
      if (__tempLocation && (!__tempKey || __tempKey === this.tempLocationKey)) {
        const parsedTempLocation = parse(__tempLocation);
        parsedTempLocation.state.key = location.state.key;
        delete parsedTempLocation.state.__tempLocation;
        return {
          ...parsedTempLocation,
          maskedLocation: location
        };
      }
      return location;
    };
    this.resolvePathWithBase = (from, path) => {
      const resolvedPath = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_1__.resolvePath)({
        basepath: this.basepath,
        base: from,
        to: (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_1__.cleanPath)(path),
        trailingSlash: this.options.trailingSlash,
        caseSensitive: this.options.caseSensitive
      });
      return resolvedPath;
    };
    this.getMatchedRoutes = (next, dest) => {
      let routeParams = {};
      const trimmedPath = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_1__.trimPathRight)(next.pathname);
      const getMatchedParams = (route) => {
        const result = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_1__.matchPathname)(this.basepath, trimmedPath, {
          to: route.fullPath,
          caseSensitive: route.options.caseSensitive ?? this.options.caseSensitive,
          fuzzy: true
        });
        return result;
      };
      let foundRoute = (dest == null ? void 0 : dest.to) !== void 0 ? this.routesByPath[dest.to] : void 0;
      if (foundRoute) {
        routeParams = getMatchedParams(foundRoute);
      } else {
        foundRoute = this.flatRoutes.find((route) => {
          const matchedParams = getMatchedParams(route);
          if (matchedParams) {
            routeParams = matchedParams;
            return true;
          }
          return false;
        });
      }
      let routeCursor = foundRoute || this.routesById[_tanstack_router_core__WEBPACK_IMPORTED_MODULE_6__.rootRouteId];
      const matchedRoutes = [routeCursor];
      while (routeCursor.parentRoute) {
        routeCursor = routeCursor.parentRoute;
        matchedRoutes.unshift(routeCursor);
      }
      return { matchedRoutes, routeParams, foundRoute };
    };
    this.cancelMatch = (id) => {
      const match = this.getMatch(id);
      if (!match) return;
      match.abortController.abort();
      clearTimeout(match.pendingTimeout);
    };
    this.cancelMatches = () => {
      var _a;
      (_a = this.state.pendingMatches) == null ? void 0 : _a.forEach((match) => {
        this.cancelMatch(match.id);
      });
    };
    this.buildLocation = (opts) => {
      const build = (dest = {}, matchedRoutesResult) => {
        var _a, _b, _c, _d, _e, _f;
        const fromMatches = dest._fromLocation ? this.matchRoutes(dest._fromLocation, { _buildLocation: true }) : this.state.matches;
        const fromMatch = dest.from != null ? fromMatches.find(
          (d) => (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_1__.matchPathname)(this.basepath, (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_1__.trimPathRight)(d.pathname), {
            to: dest.from,
            caseSensitive: false,
            fuzzy: false
          })
        ) : void 0;
        const fromPath = (fromMatch == null ? void 0 : fromMatch.pathname) || this.latestLocation.pathname;
        (0,tiny_invariant__WEBPACK_IMPORTED_MODULE_0__["default"])(
          dest.from == null || fromMatch != null,
          "Could not find match for from: " + dest.from
        );
        const fromSearch = ((_a = this.state.pendingMatches) == null ? void 0 : _a.length) ? (_b = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.last)(this.state.pendingMatches)) == null ? void 0 : _b.search : ((_c = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.last)(fromMatches)) == null ? void 0 : _c.search) || this.latestLocation.search;
        const stayingMatches = matchedRoutesResult == null ? void 0 : matchedRoutesResult.matchedRoutes.filter(
          (d) => fromMatches.find((e) => e.routeId === d.id)
        );
        let pathname;
        if (dest.to) {
          pathname = this.resolvePathWithBase(fromPath, `${dest.to}`);
        } else {
          const fromRouteByFromPathRouteId = this.routesById[(_d = stayingMatches == null ? void 0 : stayingMatches.find((route) => {
            const interpolatedPath = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_1__.interpolatePath)({
              path: route.fullPath,
              params: (matchedRoutesResult == null ? void 0 : matchedRoutesResult.routeParams) ?? {},
              decodeCharMap: this.pathParamsDecodeCharMap
            }).interpolatedPath;
            const pathname2 = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_1__.joinPaths)([this.basepath, interpolatedPath]);
            return pathname2 === fromPath;
          })) == null ? void 0 : _d.id];
          pathname = this.resolvePathWithBase(
            fromPath,
            (fromRouteByFromPathRouteId == null ? void 0 : fromRouteByFromPathRouteId.to) ?? fromPath
          );
        }
        const prevParams = { ...(_e = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.last)(fromMatches)) == null ? void 0 : _e.params };
        let nextParams = (dest.params ?? true) === true ? prevParams : {
          ...prevParams,
          ...(0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.functionalUpdate)(dest.params, prevParams)
        };
        if (Object.keys(nextParams).length > 0) {
          matchedRoutesResult == null ? void 0 : matchedRoutesResult.matchedRoutes.map((route) => {
            var _a2;
            return ((_a2 = route.options.params) == null ? void 0 : _a2.stringify) ?? route.options.stringifyParams;
          }).filter(Boolean).forEach((fn) => {
            nextParams = { ...nextParams, ...fn(nextParams) };
          });
        }
        pathname = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_1__.interpolatePath)({
          path: pathname,
          params: nextParams ?? {},
          leaveWildcards: false,
          leaveParams: opts.leaveParams,
          decodeCharMap: this.pathParamsDecodeCharMap
        }).interpolatedPath;
        let search = fromSearch;
        if (opts._includeValidateSearch && ((_f = this.options.search) == null ? void 0 : _f.strict)) {
          let validatedSearch = {};
          matchedRoutesResult == null ? void 0 : matchedRoutesResult.matchedRoutes.forEach((route) => {
            try {
              if (route.options.validateSearch) {
                validatedSearch = {
                  ...validatedSearch,
                  ...validateSearch(route.options.validateSearch, {
                    ...validatedSearch,
                    ...search
                  }) ?? {}
                };
              }
            } catch {
            }
          });
          search = validatedSearch;
        }
        const applyMiddlewares = (search2) => {
          const allMiddlewares = (matchedRoutesResult == null ? void 0 : matchedRoutesResult.matchedRoutes.reduce(
            (acc, route) => {
              var _a2;
              const middlewares = [];
              if ("search" in route.options) {
                if ((_a2 = route.options.search) == null ? void 0 : _a2.middlewares) {
                  middlewares.push(...route.options.search.middlewares);
                }
              } else if (route.options.preSearchFilters || route.options.postSearchFilters) {
                const legacyMiddleware = ({
                  search: search3,
                  next
                }) => {
                  let nextSearch = search3;
                  if ("preSearchFilters" in route.options && route.options.preSearchFilters) {
                    nextSearch = route.options.preSearchFilters.reduce(
                      (prev, next2) => next2(prev),
                      search3
                    );
                  }
                  const result = next(nextSearch);
                  if ("postSearchFilters" in route.options && route.options.postSearchFilters) {
                    return route.options.postSearchFilters.reduce(
                      (prev, next2) => next2(prev),
                      result
                    );
                  }
                  return result;
                };
                middlewares.push(legacyMiddleware);
              }
              if (opts._includeValidateSearch && route.options.validateSearch) {
                const validate = ({ search: search3, next }) => {
                  try {
                    const result = next(search3);
                    const validatedSearch = {
                      ...result,
                      ...validateSearch(
                        route.options.validateSearch,
                        result
                      ) ?? {}
                    };
                    return validatedSearch;
                  } catch {
                  }
                };
                middlewares.push(validate);
              }
              return acc.concat(middlewares);
            },
            []
          )) ?? [];
          const final = ({ search: search3 }) => {
            if (!dest.search) {
              return {};
            }
            if (dest.search === true) {
              return search3;
            }
            return (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.functionalUpdate)(dest.search, search3);
          };
          allMiddlewares.push(final);
          const applyNext = (index, currentSearch) => {
            if (index >= allMiddlewares.length) {
              return currentSearch;
            }
            const middleware = allMiddlewares[index];
            const next = (newSearch) => {
              return applyNext(index + 1, newSearch);
            };
            return middleware({ search: currentSearch, next });
          };
          return applyNext(0, search2);
        };
        search = applyMiddlewares(search);
        search = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.replaceEqualDeep)(fromSearch, search);
        const searchStr = this.options.stringifySearch(search);
        const hash = dest.hash === true ? this.latestLocation.hash : dest.hash ? (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.functionalUpdate)(dest.hash, this.latestLocation.hash) : void 0;
        const hashStr = hash ? `#${hash}` : "";
        let nextState = dest.state === true ? this.latestLocation.state : dest.state ? (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.functionalUpdate)(dest.state, this.latestLocation.state) : {};
        nextState = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.replaceEqualDeep)(this.latestLocation.state, nextState);
        return {
          pathname,
          search,
          searchStr,
          state: nextState,
          hash: hash ?? "",
          href: `${pathname}${searchStr}${hashStr}`,
          unmaskOnReload: dest.unmaskOnReload
        };
      };
      const buildWithMatches = (dest = {}, maskedDest) => {
        var _a;
        const next = build(dest);
        let maskedNext = maskedDest ? build(maskedDest) : void 0;
        if (!maskedNext) {
          let params = {};
          const foundMask = (_a = this.options.routeMasks) == null ? void 0 : _a.find((d) => {
            const match = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_1__.matchPathname)(this.basepath, next.pathname, {
              to: d.from,
              caseSensitive: false,
              fuzzy: false
            });
            if (match) {
              params = match;
              return true;
            }
            return false;
          });
          if (foundMask) {
            const { from: _from, ...maskProps } = foundMask;
            maskedDest = {
              ...(0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.pick)(opts, ["from"]),
              ...maskProps,
              params
            };
            maskedNext = build(maskedDest);
          }
        }
        const nextMatches = this.getMatchedRoutes(next, dest);
        const final = build(dest, nextMatches);
        if (maskedNext) {
          const maskedMatches = this.getMatchedRoutes(maskedNext, maskedDest);
          const maskedFinal = build(maskedDest, maskedMatches);
          final.maskedLocation = maskedFinal;
        }
        return final;
      };
      if (opts.mask) {
        return buildWithMatches(opts, {
          ...(0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.pick)(opts, ["from"]),
          ...opts.mask
        });
      }
      return buildWithMatches(opts);
    };
    this.commitLocation = ({
      viewTransition,
      ignoreBlocker,
      ...next
    }) => {
      const isSameState = () => {
        next.state.key = this.latestLocation.state.key;
        const isEqual = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.deepEqual)(next.state, this.latestLocation.state);
        delete next.state.key;
        return isEqual;
      };
      const isSameUrl = this.latestLocation.href === next.href;
      const previousCommitPromise = this.commitLocationPromise;
      this.commitLocationPromise = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.createControlledPromise)(() => {
        previousCommitPromise == null ? void 0 : previousCommitPromise.resolve();
      });
      if (isSameUrl && isSameState()) {
        this.load();
      } else {
        let { maskedLocation, hashScrollIntoView, ...nextHistory } = next;
        if (maskedLocation) {
          nextHistory = {
            ...maskedLocation,
            state: {
              ...maskedLocation.state,
              __tempKey: void 0,
              __tempLocation: {
                ...nextHistory,
                search: nextHistory.searchStr,
                state: {
                  ...nextHistory.state,
                  __tempKey: void 0,
                  __tempLocation: void 0,
                  key: void 0
                }
              }
            }
          };
          if (nextHistory.unmaskOnReload ?? this.options.unmaskOnReload ?? false) {
            nextHistory.state.__tempKey = this.tempLocationKey;
          }
        }
        nextHistory.state.__hashScrollIntoViewOptions = hashScrollIntoView ?? this.options.defaultHashScrollIntoView ?? true;
        this.shouldViewTransition = viewTransition;
        this.history[next.replace ? "replace" : "push"](
          nextHistory.href,
          nextHistory.state,
          { ignoreBlocker }
        );
      }
      this.resetNextScroll = next.resetScroll ?? true;
      if (!this.history.subscribers.size) {
        this.load();
      }
      return this.commitLocationPromise;
    };
    this.buildAndCommitLocation = ({
      replace,
      resetScroll,
      hashScrollIntoView,
      viewTransition,
      ignoreBlocker,
      href,
      ...rest
    } = {}) => {
      if (href) {
        const currentIndex = this.history.location.state.__TSR_index;
        const parsed = (0,_tanstack_history__WEBPACK_IMPORTED_MODULE_2__.parseHref)(href, {
          __TSR_index: replace ? currentIndex : currentIndex + 1
        });
        rest.to = parsed.pathname;
        rest.search = this.options.parseSearch(parsed.search);
        rest.hash = parsed.hash.slice(1);
      }
      const location = this.buildLocation({
        ...rest,
        _includeValidateSearch: true
      });
      return this.commitLocation({
        ...location,
        viewTransition,
        replace,
        resetScroll,
        hashScrollIntoView,
        ignoreBlocker
      });
    };
    this.navigate = ({ to, reloadDocument, href, ...rest }) => {
      if (reloadDocument) {
        if (!href) {
          const location = this.buildLocation({ to, ...rest });
          href = location.href;
        }
        if (rest.replace) {
          window.location.replace(href);
        } else {
          window.location.href = href;
        }
        return;
      }
      return this.buildAndCommitLocation({
        ...rest,
        href,
        to
      });
    };
    this.load = async (opts) => {
      this.latestLocation = this.parseLocation(this.latestLocation);
      let redirect;
      let notFound;
      let loadPromise;
      loadPromise = new Promise((resolve) => {
        this.startReactTransition(async () => {
          var _a;
          try {
            const next = this.latestLocation;
            const prevLocation = this.state.resolvedLocation;
            this.cancelMatches();
            let pendingMatches;
            (0,_tanstack_react_store__WEBPACK_IMPORTED_MODULE_7__.batch)(() => {
              pendingMatches = this.matchRoutes(next);
              this.__store.setState((s) => ({
                ...s,
                status: "pending",
                isLoading: true,
                location: next,
                pendingMatches,
                // If a cached moved to pendingMatches, remove it from cachedMatches
                cachedMatches: s.cachedMatches.filter((d) => {
                  return !pendingMatches.find((e) => e.id === d.id);
                })
              }));
            });
            if (!this.state.redirect) {
              this.emit({
                type: "onBeforeNavigate",
                ...(0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_8__.getLocationChangeInfo)({
                  resolvedLocation: prevLocation,
                  location: next
                })
              });
            }
            this.emit({
              type: "onBeforeLoad",
              ...(0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_8__.getLocationChangeInfo)({
                resolvedLocation: prevLocation,
                location: next
              })
            });
            await this.loadMatches({
              sync: opts == null ? void 0 : opts.sync,
              matches: pendingMatches,
              location: next,
              // eslint-disable-next-line @typescript-eslint/require-await
              onReady: async () => {
                this.startViewTransition(async () => {
                  let exitingMatches;
                  let enteringMatches;
                  let stayingMatches;
                  (0,_tanstack_react_store__WEBPACK_IMPORTED_MODULE_7__.batch)(() => {
                    this.__store.setState((s) => {
                      const previousMatches = s.matches;
                      const newMatches = s.pendingMatches || s.matches;
                      exitingMatches = previousMatches.filter(
                        (match) => !newMatches.find((d) => d.id === match.id)
                      );
                      enteringMatches = newMatches.filter(
                        (match) => !previousMatches.find((d) => d.id === match.id)
                      );
                      stayingMatches = previousMatches.filter(
                        (match) => newMatches.find((d) => d.id === match.id)
                      );
                      return {
                        ...s,
                        isLoading: false,
                        loadedAt: Date.now(),
                        matches: newMatches,
                        pendingMatches: void 0,
                        cachedMatches: [
                          ...s.cachedMatches,
                          ...exitingMatches.filter((d) => d.status !== "error")
                        ]
                      };
                    });
                    this.clearExpiredCache();
                  });
                  [
                    [exitingMatches, "onLeave"],
                    [enteringMatches, "onEnter"],
                    [stayingMatches, "onStay"]
                  ].forEach(([matches, hook]) => {
                    matches.forEach((match) => {
                      var _a2, _b;
                      (_b = (_a2 = this.looseRoutesById[match.routeId].options)[hook]) == null ? void 0 : _b.call(_a2, match);
                    });
                  });
                });
              }
            });
          } catch (err) {
            if ((0,_redirects_js__WEBPACK_IMPORTED_MODULE_9__.isResolvedRedirect)(err)) {
              redirect = err;
              if (!this.isServer) {
                this.navigate({
                  ...redirect,
                  replace: true,
                  ignoreBlocker: true
                });
              }
            } else if ((0,_not_found_js__WEBPACK_IMPORTED_MODULE_10__.isNotFound)(err)) {
              notFound = err;
            }
            this.__store.setState((s) => ({
              ...s,
              statusCode: redirect ? redirect.statusCode : notFound ? 404 : s.matches.some((d) => d.status === "error") ? 500 : 200,
              redirect
            }));
          }
          if (this.latestLoadPromise === loadPromise) {
            (_a = this.commitLocationPromise) == null ? void 0 : _a.resolve();
            this.latestLoadPromise = void 0;
            this.commitLocationPromise = void 0;
          }
          resolve();
        });
      });
      this.latestLoadPromise = loadPromise;
      await loadPromise;
      while (this.latestLoadPromise && loadPromise !== this.latestLoadPromise) {
        await this.latestLoadPromise;
      }
    };
    this.startViewTransition = (fn) => {
      const shouldViewTransition = this.shouldViewTransition ?? this.options.defaultViewTransition;
      delete this.shouldViewTransition;
      if (shouldViewTransition && typeof document !== "undefined" && "startViewTransition" in document && typeof document.startViewTransition === "function") {
        let startViewTransitionParams;
        if (typeof shouldViewTransition === "object" && this.isViewTransitionTypesSupported) {
          startViewTransitionParams = {
            update: fn,
            types: shouldViewTransition.types
          };
        } else {
          startViewTransitionParams = fn;
        }
        document.startViewTransition(startViewTransitionParams);
      } else {
        fn();
      }
    };
    this.updateMatch = (id, updater) => {
      var _a;
      let updated;
      const isPending = (_a = this.state.pendingMatches) == null ? void 0 : _a.find((d) => d.id === id);
      const isMatched = this.state.matches.find((d) => d.id === id);
      const isCached = this.state.cachedMatches.find((d) => d.id === id);
      const matchesKey = isPending ? "pendingMatches" : isMatched ? "matches" : isCached ? "cachedMatches" : "";
      if (matchesKey) {
        this.__store.setState((s) => {
          var _a2;
          return {
            ...s,
            [matchesKey]: (_a2 = s[matchesKey]) == null ? void 0 : _a2.map(
              (d) => d.id === id ? updated = updater(d) : d
            )
          };
        });
      }
      return updated;
    };
    this.getMatch = (matchId) => {
      return [
        ...this.state.cachedMatches,
        ...this.state.pendingMatches ?? [],
        ...this.state.matches
      ].find((d) => d.id === matchId);
    };
    this.loadMatches = async ({
      location,
      matches,
      preload: allPreload,
      onReady,
      updateMatch = this.updateMatch,
      sync
    }) => {
      let firstBadMatchIndex;
      let rendered = false;
      const triggerOnReady = async () => {
        if (!rendered) {
          rendered = true;
          await (onReady == null ? void 0 : onReady());
        }
      };
      const resolvePreload = (matchId) => {
        return !!(allPreload && !this.state.matches.find((d) => d.id === matchId));
      };
      if (!this.isServer && !this.state.matches.length) {
        triggerOnReady();
      }
      const handleRedirectAndNotFound = (match, err) => {
        var _a, _b, _c, _d;
        if ((0,_redirects_js__WEBPACK_IMPORTED_MODULE_9__.isResolvedRedirect)(err)) {
          if (!err.reloadDocument) {
            throw err;
          }
        }
        if ((0,_redirects_js__WEBPACK_IMPORTED_MODULE_9__.isRedirect)(err) || (0,_not_found_js__WEBPACK_IMPORTED_MODULE_10__.isNotFound)(err)) {
          updateMatch(match.id, (prev) => ({
            ...prev,
            status: (0,_redirects_js__WEBPACK_IMPORTED_MODULE_9__.isRedirect)(err) ? "redirected" : (0,_not_found_js__WEBPACK_IMPORTED_MODULE_10__.isNotFound)(err) ? "notFound" : "error",
            isFetching: false,
            error: err,
            beforeLoadPromise: void 0,
            loaderPromise: void 0
          }));
          if (!err.routeId) {
            err.routeId = match.routeId;
          }
          (_a = match.beforeLoadPromise) == null ? void 0 : _a.resolve();
          (_b = match.loaderPromise) == null ? void 0 : _b.resolve();
          (_c = match.loadPromise) == null ? void 0 : _c.resolve();
          if ((0,_redirects_js__WEBPACK_IMPORTED_MODULE_9__.isRedirect)(err)) {
            rendered = true;
            err = this.resolveRedirect({ ...err, _fromLocation: location });
            throw err;
          } else if ((0,_not_found_js__WEBPACK_IMPORTED_MODULE_10__.isNotFound)(err)) {
            this._handleNotFound(matches, err, {
              updateMatch
            });
            (_d = this.serverSsr) == null ? void 0 : _d.onMatchSettled({
              router: this,
              match: this.getMatch(match.id)
            });
            throw err;
          }
        }
      };
      try {
        await new Promise((resolveAll, rejectAll) => {
          ;
          (async () => {
            var _a, _b, _c;
            try {
              const handleSerialError = (index, err, routerCode) => {
                var _a2, _b2;
                const { id: matchId, routeId } = matches[index];
                const route = this.looseRoutesById[routeId];
                if (err instanceof Promise) {
                  throw err;
                }
                err.routerCode = routerCode;
                firstBadMatchIndex = firstBadMatchIndex ?? index;
                handleRedirectAndNotFound(this.getMatch(matchId), err);
                try {
                  (_b2 = (_a2 = route.options).onError) == null ? void 0 : _b2.call(_a2, err);
                } catch (errorHandlerErr) {
                  err = errorHandlerErr;
                  handleRedirectAndNotFound(this.getMatch(matchId), err);
                }
                updateMatch(matchId, (prev) => {
                  var _a3, _b3;
                  (_a3 = prev.beforeLoadPromise) == null ? void 0 : _a3.resolve();
                  (_b3 = prev.loadPromise) == null ? void 0 : _b3.resolve();
                  return {
                    ...prev,
                    error: err,
                    status: "error",
                    isFetching: false,
                    updatedAt: Date.now(),
                    abortController: new AbortController(),
                    beforeLoadPromise: void 0
                  };
                });
              };
              for (const [index, { id: matchId, routeId }] of matches.entries()) {
                const existingMatch = this.getMatch(matchId);
                const parentMatchId = (_a = matches[index - 1]) == null ? void 0 : _a.id;
                const route = this.looseRoutesById[routeId];
                const pendingMs = route.options.pendingMs ?? this.options.defaultPendingMs;
                const shouldPending = !!(onReady && !this.isServer && !resolvePreload(matchId) && (route.options.loader || route.options.beforeLoad) && typeof pendingMs === "number" && pendingMs !== Infinity && (route.options.pendingComponent ?? this.options.defaultPendingComponent));
                let executeBeforeLoad = true;
                if (
                  // If we are in the middle of a load, either of these will be present
                  // (not to be confused with `loadPromise`, which is always defined)
                  existingMatch.beforeLoadPromise || existingMatch.loaderPromise
                ) {
                  if (shouldPending) {
                    setTimeout(() => {
                      try {
                        triggerOnReady();
                      } catch {
                      }
                    }, pendingMs);
                  }
                  await existingMatch.beforeLoadPromise;
                  executeBeforeLoad = this.getMatch(matchId).status !== "success";
                }
                if (executeBeforeLoad) {
                  try {
                    updateMatch(matchId, (prev) => ({
                      ...prev,
                      loadPromise: (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.createControlledPromise)(() => {
                        var _a2;
                        (_a2 = prev.loadPromise) == null ? void 0 : _a2.resolve();
                      }),
                      beforeLoadPromise: (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.createControlledPromise)()
                    }));
                    const abortController = new AbortController();
                    let pendingTimeout;
                    if (shouldPending) {
                      pendingTimeout = setTimeout(() => {
                        try {
                          triggerOnReady();
                        } catch {
                        }
                      }, pendingMs);
                    }
                    const { paramsError, searchError } = this.getMatch(matchId);
                    if (paramsError) {
                      handleSerialError(index, paramsError, "PARSE_PARAMS");
                    }
                    if (searchError) {
                      handleSerialError(index, searchError, "VALIDATE_SEARCH");
                    }
                    const getParentMatchContext = () => parentMatchId ? this.getMatch(parentMatchId).context : this.options.context ?? {};
                    updateMatch(matchId, (prev) => ({
                      ...prev,
                      isFetching: "beforeLoad",
                      fetchCount: prev.fetchCount + 1,
                      abortController,
                      pendingTimeout,
                      context: {
                        ...getParentMatchContext(),
                        ...prev.__routeContext
                      }
                    }));
                    const { search, params, context, cause } = this.getMatch(matchId);
                    const preload = resolvePreload(matchId);
                    const beforeLoadFnContext = {
                      search,
                      abortController,
                      params,
                      preload,
                      context,
                      location,
                      navigate: (opts) => this.navigate({ ...opts, _fromLocation: location }),
                      buildLocation: this.buildLocation,
                      cause: preload ? "preload" : cause,
                      matches
                    };
                    const beforeLoadContext = await ((_c = (_b = route.options).beforeLoad) == null ? void 0 : _c.call(_b, beforeLoadFnContext)) ?? {};
                    if ((0,_redirects_js__WEBPACK_IMPORTED_MODULE_9__.isRedirect)(beforeLoadContext) || (0,_not_found_js__WEBPACK_IMPORTED_MODULE_10__.isNotFound)(beforeLoadContext)) {
                      handleSerialError(index, beforeLoadContext, "BEFORE_LOAD");
                    }
                    updateMatch(matchId, (prev) => {
                      return {
                        ...prev,
                        __beforeLoadContext: beforeLoadContext,
                        context: {
                          ...getParentMatchContext(),
                          ...prev.__routeContext,
                          ...beforeLoadContext
                        },
                        abortController
                      };
                    });
                  } catch (err) {
                    handleSerialError(index, err, "BEFORE_LOAD");
                  }
                  updateMatch(matchId, (prev) => {
                    var _a2;
                    (_a2 = prev.beforeLoadPromise) == null ? void 0 : _a2.resolve();
                    return {
                      ...prev,
                      beforeLoadPromise: void 0,
                      isFetching: false
                    };
                  });
                }
              }
              const validResolvedMatches = matches.slice(0, firstBadMatchIndex);
              const matchPromises = [];
              validResolvedMatches.forEach(({ id: matchId, routeId }, index) => {
                matchPromises.push(
                  (async () => {
                    const { loaderPromise: prevLoaderPromise } = this.getMatch(matchId);
                    let loaderShouldRunAsync = false;
                    let loaderIsRunningAsync = false;
                    if (prevLoaderPromise) {
                      await prevLoaderPromise;
                      const match = this.getMatch(matchId);
                      if (match.error) {
                        handleRedirectAndNotFound(match, match.error);
                      }
                    } else {
                      const parentMatchPromise = matchPromises[index - 1];
                      const route = this.looseRoutesById[routeId];
                      const getLoaderContext = () => {
                        const {
                          params,
                          loaderDeps,
                          abortController,
                          context,
                          cause
                        } = this.getMatch(matchId);
                        const preload2 = resolvePreload(matchId);
                        return {
                          params,
                          deps: loaderDeps,
                          preload: !!preload2,
                          parentMatchPromise,
                          abortController,
                          context,
                          location,
                          navigate: (opts) => this.navigate({ ...opts, _fromLocation: location }),
                          cause: preload2 ? "preload" : cause,
                          route
                        };
                      };
                      const age = Date.now() - this.getMatch(matchId).updatedAt;
                      const preload = resolvePreload(matchId);
                      const staleAge = preload ? route.options.preloadStaleTime ?? this.options.defaultPreloadStaleTime ?? 3e4 : route.options.staleTime ?? this.options.defaultStaleTime ?? 0;
                      const shouldReloadOption = route.options.shouldReload;
                      const shouldReload = typeof shouldReloadOption === "function" ? shouldReloadOption(getLoaderContext()) : shouldReloadOption;
                      updateMatch(matchId, (prev) => ({
                        ...prev,
                        loaderPromise: (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.createControlledPromise)(),
                        preload: !!preload && !this.state.matches.find((d) => d.id === matchId)
                      }));
                      const runLoader = async () => {
                        var _a2, _b2, _c2, _d, _e, _f, _g, _h, _i;
                        try {
                          const potentialPendingMinPromise = async () => {
                            const latestMatch = this.getMatch(matchId);
                            if (latestMatch.minPendingPromise) {
                              await latestMatch.minPendingPromise;
                            }
                          };
                          try {
                            this.loadRouteChunk(route);
                            updateMatch(matchId, (prev) => ({
                              ...prev,
                              isFetching: "loader"
                            }));
                            const loaderData = await ((_b2 = (_a2 = route.options).loader) == null ? void 0 : _b2.call(_a2, getLoaderContext()));
                            handleRedirectAndNotFound(
                              this.getMatch(matchId),
                              loaderData
                            );
                            await route._lazyPromise;
                            await potentialPendingMinPromise();
                            const headFnContent = (_d = (_c2 = route.options).head) == null ? void 0 : _d.call(_c2, {
                              matches,
                              match: this.getMatch(matchId),
                              params: this.getMatch(matchId).params,
                              loaderData
                            });
                            const meta = headFnContent == null ? void 0 : headFnContent.meta;
                            const links = headFnContent == null ? void 0 : headFnContent.links;
                            const scripts = headFnContent == null ? void 0 : headFnContent.scripts;
                            const headers = (_f = (_e = route.options).headers) == null ? void 0 : _f.call(_e, {
                              loaderData
                            });
                            updateMatch(matchId, (prev) => ({
                              ...prev,
                              error: void 0,
                              status: "success",
                              isFetching: false,
                              updatedAt: Date.now(),
                              loaderData,
                              meta,
                              links,
                              scripts,
                              headers
                            }));
                          } catch (e) {
                            let error = e;
                            await potentialPendingMinPromise();
                            handleRedirectAndNotFound(this.getMatch(matchId), e);
                            try {
                              (_h = (_g = route.options).onError) == null ? void 0 : _h.call(_g, e);
                            } catch (onErrorError) {
                              error = onErrorError;
                              handleRedirectAndNotFound(
                                this.getMatch(matchId),
                                onErrorError
                              );
                            }
                            updateMatch(matchId, (prev) => ({
                              ...prev,
                              error,
                              status: "error",
                              isFetching: false
                            }));
                          }
                          (_i = this.serverSsr) == null ? void 0 : _i.onMatchSettled({
                            router: this,
                            match: this.getMatch(matchId)
                          });
                          await route._componentsPromise;
                        } catch (err) {
                          updateMatch(matchId, (prev) => ({
                            ...prev,
                            loaderPromise: void 0
                          }));
                          handleRedirectAndNotFound(this.getMatch(matchId), err);
                        }
                      };
                      const { status, invalid } = this.getMatch(matchId);
                      loaderShouldRunAsync = status === "success" && (invalid || (shouldReload ?? age > staleAge));
                      if (preload && route.options.preload === false) {
                      } else if (loaderShouldRunAsync && !sync) {
                        loaderIsRunningAsync = true;
                        (async () => {
                          try {
                            await runLoader();
                            const { loaderPromise, loadPromise } = this.getMatch(matchId);
                            loaderPromise == null ? void 0 : loaderPromise.resolve();
                            loadPromise == null ? void 0 : loadPromise.resolve();
                            updateMatch(matchId, (prev) => ({
                              ...prev,
                              loaderPromise: void 0
                            }));
                          } catch (err) {
                            if ((0,_redirects_js__WEBPACK_IMPORTED_MODULE_9__.isResolvedRedirect)(err)) {
                              await this.navigate(err);
                            }
                          }
                        })();
                      } else if (status !== "success" || loaderShouldRunAsync && sync) {
                        await runLoader();
                      }
                    }
                    if (!loaderIsRunningAsync) {
                      const { loaderPromise, loadPromise } = this.getMatch(matchId);
                      loaderPromise == null ? void 0 : loaderPromise.resolve();
                      loadPromise == null ? void 0 : loadPromise.resolve();
                    }
                    updateMatch(matchId, (prev) => ({
                      ...prev,
                      isFetching: loaderIsRunningAsync ? prev.isFetching : false,
                      loaderPromise: loaderIsRunningAsync ? prev.loaderPromise : void 0,
                      invalid: false
                    }));
                    return this.getMatch(matchId);
                  })()
                );
              });
              await Promise.all(matchPromises);
              resolveAll();
            } catch (err) {
              rejectAll(err);
            }
          })();
        });
        await triggerOnReady();
      } catch (err) {
        if ((0,_redirects_js__WEBPACK_IMPORTED_MODULE_9__.isRedirect)(err) || (0,_not_found_js__WEBPACK_IMPORTED_MODULE_10__.isNotFound)(err)) {
          if ((0,_not_found_js__WEBPACK_IMPORTED_MODULE_10__.isNotFound)(err) && !allPreload) {
            await triggerOnReady();
          }
          throw err;
        }
      }
      return matches;
    };
    this.invalidate = (opts) => {
      const invalidate = (d) => {
        var _a;
        if (((_a = opts == null ? void 0 : opts.filter) == null ? void 0 : _a.call(opts, d)) ?? true) {
          return {
            ...d,
            invalid: true,
            ...d.status === "error" ? { status: "pending", error: void 0 } : {}
          };
        }
        return d;
      };
      this.__store.setState((s) => {
        var _a;
        return {
          ...s,
          matches: s.matches.map(invalidate),
          cachedMatches: s.cachedMatches.map(invalidate),
          pendingMatches: (_a = s.pendingMatches) == null ? void 0 : _a.map(invalidate)
        };
      });
      return this.load({ sync: opts == null ? void 0 : opts.sync });
    };
    this.resolveRedirect = (err) => {
      const redirect = err;
      if (!redirect.href) {
        redirect.href = this.buildLocation(redirect).href;
      }
      return redirect;
    };
    this.clearCache = (opts) => {
      const filter = opts == null ? void 0 : opts.filter;
      if (filter !== void 0) {
        this.__store.setState((s) => {
          return {
            ...s,
            cachedMatches: s.cachedMatches.filter(
              (m) => !filter(m)
            )
          };
        });
      } else {
        this.__store.setState((s) => {
          return {
            ...s,
            cachedMatches: []
          };
        });
      }
    };
    this.clearExpiredCache = () => {
      const filter = (d) => {
        const route = this.looseRoutesById[d.routeId];
        if (!route.options.loader) {
          return true;
        }
        const gcTime = (d.preload ? route.options.preloadGcTime ?? this.options.defaultPreloadGcTime : route.options.gcTime ?? this.options.defaultGcTime) ?? 5 * 60 * 1e3;
        return !(d.status !== "error" && Date.now() - d.updatedAt < gcTime);
      };
      this.clearCache({ filter });
    };
    this.loadRouteChunk = (route) => {
      if (route._lazyPromise === void 0) {
        if (route.lazyFn) {
          route._lazyPromise = route.lazyFn().then((lazyRoute) => {
            const { id: _id, ...options2 } = lazyRoute.options;
            Object.assign(route.options, options2);
          });
        } else {
          route._lazyPromise = Promise.resolve();
        }
      }
      if (route._componentsPromise === void 0) {
        route._componentsPromise = route._lazyPromise.then(
          () => Promise.all(
            componentTypes.map(async (type) => {
              const component = route.options[type];
              if (component == null ? void 0 : component.preload) {
                await component.preload();
              }
            })
          )
        );
      }
      return route._componentsPromise;
    };
    this.preloadRoute = async (opts) => {
      const next = this.buildLocation(opts);
      let matches = this.matchRoutes(next, {
        throwOnError: true,
        preload: true,
        dest: opts
      });
      const activeMatchIds = new Set(
        [...this.state.matches, ...this.state.pendingMatches ?? []].map(
          (d) => d.id
        )
      );
      const loadedMatchIds = /* @__PURE__ */ new Set([
        ...activeMatchIds,
        ...this.state.cachedMatches.map((d) => d.id)
      ]);
      (0,_tanstack_react_store__WEBPACK_IMPORTED_MODULE_7__.batch)(() => {
        matches.forEach((match) => {
          if (!loadedMatchIds.has(match.id)) {
            this.__store.setState((s) => ({
              ...s,
              cachedMatches: [...s.cachedMatches, match]
            }));
          }
        });
      });
      try {
        matches = await this.loadMatches({
          matches,
          location: next,
          preload: true,
          updateMatch: (id, updater) => {
            if (activeMatchIds.has(id)) {
              matches = matches.map((d) => d.id === id ? updater(d) : d);
            } else {
              this.updateMatch(id, updater);
            }
          }
        });
        return matches;
      } catch (err) {
        if ((0,_redirects_js__WEBPACK_IMPORTED_MODULE_9__.isRedirect)(err)) {
          if (err.reloadDocument) {
            return void 0;
          }
          return await this.preloadRoute({
            ...err,
            _fromLocation: next
          });
        }
        if (!(0,_not_found_js__WEBPACK_IMPORTED_MODULE_10__.isNotFound)(err)) {
          console.error(err);
        }
        return void 0;
      }
    };
    this.matchRoute = (location, opts) => {
      const matchLocation = {
        ...location,
        to: location.to ? this.resolvePathWithBase(
          location.from || "",
          location.to
        ) : void 0,
        params: location.params || {},
        leaveParams: true
      };
      const next = this.buildLocation(matchLocation);
      if ((opts == null ? void 0 : opts.pending) && this.state.status !== "pending") {
        return false;
      }
      const pending = (opts == null ? void 0 : opts.pending) === void 0 ? !this.state.isLoading : opts.pending;
      const baseLocation = pending ? this.latestLocation : this.state.resolvedLocation || this.state.location;
      const match = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_1__.matchPathname)(this.basepath, baseLocation.pathname, {
        ...opts,
        to: next.pathname
      });
      if (!match) {
        return false;
      }
      if (location.params) {
        if (!(0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.deepEqual)(match, location.params, { partial: true })) {
          return false;
        }
      }
      if (match && ((opts == null ? void 0 : opts.includeSearch) ?? true)) {
        return (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.deepEqual)(baseLocation.search, next.search, { partial: true }) ? match : false;
      }
      return match;
    };
    this._handleNotFound = (matches, err, {
      updateMatch = this.updateMatch
    } = {}) => {
      const matchesByRouteId = Object.fromEntries(
        matches.map((match2) => [match2.routeId, match2])
      );
      let routeCursor = (err.global ? this.looseRoutesById[_tanstack_router_core__WEBPACK_IMPORTED_MODULE_6__.rootRouteId] : this.looseRoutesById[err.routeId]) || this.looseRoutesById[_tanstack_router_core__WEBPACK_IMPORTED_MODULE_6__.rootRouteId];
      while (!routeCursor.options.notFoundComponent && !this.options.defaultNotFoundComponent && routeCursor.id !== _tanstack_router_core__WEBPACK_IMPORTED_MODULE_6__.rootRouteId) {
        routeCursor = routeCursor.parentRoute;
        (0,tiny_invariant__WEBPACK_IMPORTED_MODULE_0__["default"])(
          routeCursor,
          "Found invalid route tree while trying to find not-found handler."
        );
      }
      const match = matchesByRouteId[routeCursor.id];
      (0,tiny_invariant__WEBPACK_IMPORTED_MODULE_0__["default"])(match, "Could not find match for route: " + routeCursor.id);
      updateMatch(match.id, (prev) => ({
        ...prev,
        status: "notFound",
        error: err,
        isFetching: false
      }));
      if (err.routerCode === "BEFORE_LOAD" && routeCursor.parentRoute) {
        err.routeId = routeCursor.parentRoute.id;
        this._handleNotFound(matches, err, {
          updateMatch
        });
      }
    };
    this.hasNotFoundMatch = () => {
      return this.__store.state.matches.some(
        (d) => d.status === "notFound" || d.globalNotFound
      );
    };
    this.update({
      defaultPreloadDelay: 50,
      defaultPendingMs: 1e3,
      defaultPendingMinMs: 500,
      context: void 0,
      ...options,
      caseSensitive: options.caseSensitive ?? false,
      notFoundMode: options.notFoundMode ?? "fuzzy",
      stringifySearch: options.stringifySearch ?? _tanstack_router_core__WEBPACK_IMPORTED_MODULE_11__.defaultStringifySearch,
      parseSearch: options.parseSearch ?? _tanstack_router_core__WEBPACK_IMPORTED_MODULE_11__.defaultParseSearch
    });
    if (typeof document !== "undefined") {
      window.__TSR_ROUTER__ = this;
    }
  }
  get state() {
    return this.__store.state;
  }
  get looseRoutesById() {
    return this.routesById;
  }
  matchRoutes(pathnameOrNext, locationSearchOrOpts, opts) {
    if (typeof pathnameOrNext === "string") {
      return this.matchRoutesInternal(
        {
          pathname: pathnameOrNext,
          search: locationSearchOrOpts
        },
        opts
      );
    } else {
      return this.matchRoutesInternal(pathnameOrNext, locationSearchOrOpts);
    }
  }
  matchRoutesInternal(next, opts) {
    const { foundRoute, matchedRoutes, routeParams } = this.getMatchedRoutes(
      next,
      opts == null ? void 0 : opts.dest
    );
    let isGlobalNotFound = false;
    if (
      // If we found a route, and it's not an index route and we have left over path
      foundRoute ? foundRoute.path !== "/" && routeParams["**"] : (
        // Or if we didn't find a route and we have left over path
        (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_1__.trimPathRight)(next.pathname)
      )
    ) {
      if (this.options.notFoundRoute) {
        matchedRoutes.push(this.options.notFoundRoute);
      } else {
        isGlobalNotFound = true;
      }
    }
    const globalNotFoundRouteId = (() => {
      if (!isGlobalNotFound) {
        return void 0;
      }
      if (this.options.notFoundMode !== "root") {
        for (let i = matchedRoutes.length - 1; i >= 0; i--) {
          const route = matchedRoutes[i];
          if (route.children) {
            return route.id;
          }
        }
      }
      return _tanstack_router_core__WEBPACK_IMPORTED_MODULE_6__.rootRouteId;
    })();
    const parseErrors = matchedRoutes.map((route) => {
      var _a;
      let parsedParamsError;
      const parseParams = ((_a = route.options.params) == null ? void 0 : _a.parse) ?? route.options.parseParams;
      if (parseParams) {
        try {
          const parsedParams = parseParams(routeParams);
          Object.assign(routeParams, parsedParams);
        } catch (err) {
          parsedParamsError = new PathParamError(err.message, {
            cause: err
          });
          if (opts == null ? void 0 : opts.throwOnError) {
            throw parsedParamsError;
          }
          return parsedParamsError;
        }
      }
      return;
    });
    const matches = [];
    const getParentContext = (parentMatch) => {
      const parentMatchId = parentMatch == null ? void 0 : parentMatch.id;
      const parentContext = !parentMatchId ? this.options.context ?? {} : parentMatch.context ?? this.options.context ?? {};
      return parentContext;
    };
    matchedRoutes.forEach((route, index) => {
      var _a, _b, _c, _d;
      const parentMatch = matches[index - 1];
      const [preMatchSearch, strictMatchSearch, searchError] = (() => {
        const parentSearch = (parentMatch == null ? void 0 : parentMatch.search) ?? next.search;
        const parentStrictSearch = (parentMatch == null ? void 0 : parentMatch._strictSearch) ?? {};
        try {
          const strictSearch = validateSearch(route.options.validateSearch, { ...parentSearch }) ?? {};
          return [
            {
              ...parentSearch,
              ...strictSearch
            },
            { ...parentStrictSearch, ...strictSearch },
            void 0
          ];
        } catch (err) {
          let searchParamError = err;
          if (!(err instanceof SearchParamError)) {
            searchParamError = new SearchParamError(err.message, {
              cause: err
            });
          }
          if (opts == null ? void 0 : opts.throwOnError) {
            throw searchParamError;
          }
          return [parentSearch, {}, searchParamError];
        }
      })();
      const loaderDeps = ((_b = (_a = route.options).loaderDeps) == null ? void 0 : _b.call(_a, {
        search: preMatchSearch
      })) ?? "";
      const loaderDepsHash = loaderDeps ? JSON.stringify(loaderDeps) : "";
      const { usedParams, interpolatedPath } = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_1__.interpolatePath)({
        path: route.fullPath,
        params: routeParams,
        decodeCharMap: this.pathParamsDecodeCharMap
      });
      const matchId = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_1__.interpolatePath)({
        path: route.id,
        params: routeParams,
        leaveWildcards: true,
        decodeCharMap: this.pathParamsDecodeCharMap
      }).interpolatedPath + loaderDepsHash;
      const existingMatch = this.getMatch(matchId);
      const previousMatch = this.state.matches.find(
        (d) => d.routeId === route.id
      );
      const cause = previousMatch ? "stay" : "enter";
      let match;
      if (existingMatch) {
        match = {
          ...existingMatch,
          cause,
          params: previousMatch ? (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.replaceEqualDeep)(previousMatch.params, routeParams) : routeParams,
          _strictParams: usedParams,
          search: previousMatch ? (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.replaceEqualDeep)(previousMatch.search, preMatchSearch) : (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.replaceEqualDeep)(existingMatch.search, preMatchSearch),
          _strictSearch: strictMatchSearch
        };
      } else {
        const status = route.options.loader || route.options.beforeLoad || route.lazyFn || routeNeedsPreload(route) ? "pending" : "success";
        match = {
          id: matchId,
          index,
          routeId: route.id,
          params: previousMatch ? (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.replaceEqualDeep)(previousMatch.params, routeParams) : routeParams,
          _strictParams: usedParams,
          pathname: (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_1__.joinPaths)([this.basepath, interpolatedPath]),
          updatedAt: Date.now(),
          search: previousMatch ? (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.replaceEqualDeep)(previousMatch.search, preMatchSearch) : preMatchSearch,
          _strictSearch: strictMatchSearch,
          searchError: void 0,
          status,
          isFetching: false,
          error: void 0,
          paramsError: parseErrors[index],
          __routeContext: {},
          __beforeLoadContext: {},
          context: {},
          abortController: new AbortController(),
          fetchCount: 0,
          cause,
          loaderDeps: previousMatch ? (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.replaceEqualDeep)(previousMatch.loaderDeps, loaderDeps) : loaderDeps,
          invalid: false,
          preload: false,
          links: void 0,
          scripts: void 0,
          meta: void 0,
          staticData: route.options.staticData || {},
          loadPromise: (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_5__.createControlledPromise)(),
          fullPath: route.fullPath
        };
      }
      if (match.status === "success") {
        match.headers = (_d = (_c = route.options).headers) == null ? void 0 : _d.call(_c, {
          loaderData: match.loaderData
        });
      }
      if (!(opts == null ? void 0 : opts.preload)) {
        match.globalNotFound = globalNotFoundRouteId === route.id;
      }
      match.searchError = searchError;
      const parentContext = getParentContext(parentMatch);
      match.context = {
        ...parentContext,
        ...match.__routeContext,
        ...match.__beforeLoadContext
      };
      matches.push(match);
    });
    matches.forEach((match, index) => {
      var _a, _b, _c, _d;
      const route = this.looseRoutesById[match.routeId];
      const existingMatch = this.getMatch(match.id);
      if (!existingMatch && (opts == null ? void 0 : opts._buildLocation) !== true) {
        const parentMatch = matches[index - 1];
        const parentContext = getParentContext(parentMatch);
        const contextFnContext = {
          deps: match.loaderDeps,
          params: match.params,
          context: parentContext,
          location: next,
          navigate: (opts2) => this.navigate({ ...opts2, _fromLocation: next }),
          buildLocation: this.buildLocation,
          cause: match.cause,
          abortController: match.abortController,
          preload: !!match.preload,
          matches
        };
        match.__routeContext = ((_b = (_a = route.options).context) == null ? void 0 : _b.call(_a, contextFnContext)) ?? {};
        match.context = {
          ...parentContext,
          ...match.__routeContext,
          ...match.__beforeLoadContext
        };
      }
      const headFnContent = (_d = (_c = route.options).head) == null ? void 0 : _d.call(_c, {
        matches,
        match,
        params: match.params,
        loaderData: match.loaderData ?? void 0
      });
      match.links = headFnContent == null ? void 0 : headFnContent.links;
      match.scripts = headFnContent == null ? void 0 : headFnContent.scripts;
      match.meta = headFnContent == null ? void 0 : headFnContent.meta;
    });
    return matches;
  }
}
function lazyFn(fn, key) {
  return async (...args) => {
    const imported = await fn();
    return imported[key || "default"](...args);
  };
}
class SearchParamError extends Error {
}
class PathParamError extends Error {
}
function getInitialRouterState(location) {
  return {
    loadedAt: 0,
    isLoading: false,
    isTransitioning: false,
    status: "idle",
    resolvedLocation: void 0,
    location,
    matches: [],
    pendingMatches: [],
    cachedMatches: [],
    statusCode: 200
  };
}

//# sourceMappingURL=router.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/routerContext.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/routerContext.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getRouterContext: () => (/* binding */ getRouterContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");

const routerContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
function getRouterContext() {
  if (typeof document === "undefined") {
    return routerContext;
  }
  if (window.__TSR_ROUTER_CONTEXT__) {
    return window.__TSR_ROUTER_CONTEXT__;
  }
  window.__TSR_ROUTER_CONTEXT__ = routerContext;
  return routerContext;
}

//# sourceMappingURL=routerContext.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/scroll-restoration.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/scroll-restoration.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ScrollRestoration: () => (/* binding */ ScrollRestoration),
/* harmony export */   defaultGetScrollRestorationKey: () => (/* binding */ defaultGetScrollRestorationKey),
/* harmony export */   getCssSelector: () => (/* binding */ getCssSelector),
/* harmony export */   restoreScroll: () => (/* binding */ restoreScroll),
/* harmony export */   scrollRestorationCache: () => (/* binding */ scrollRestorationCache),
/* harmony export */   setupScrollRestoration: () => (/* binding */ setupScrollRestoration),
/* harmony export */   storageKey: () => (/* binding */ storageKey)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var _tanstack_router_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tanstack/router-core */ "./node_modules/@tanstack/router-core/dist/esm/utils.js");
/* harmony import */ var _useRouter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useRouter.js */ "./node_modules/@tanstack/react-router/dist/esm/useRouter.js");
/* harmony import */ var _ScriptOnce_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ScriptOnce.js */ "./node_modules/@tanstack/react-router/dist/esm/ScriptOnce.js");




const storageKey = "tsr-scroll-restoration-v1_3";
const sessionsStorage = typeof window !== "undefined" && window.sessionStorage;
const throttle = (fn, wait) => {
  let timeout;
  return (...args) => {
    if (!timeout) {
      timeout = setTimeout(() => {
        fn(...args);
        timeout = null;
      }, wait);
    }
  };
};
const scrollRestorationCache = sessionsStorage ? (() => {
  const state = JSON.parse(window.sessionStorage.getItem(storageKey) || "null") || {};
  return {
    state,
    // This setter is simply to make sure that we set the sessionStorage right
    // after the state is updated. It doesn't necessarily need to be a functional
    // update.
    set: (updater) => (scrollRestorationCache.state = // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_1__.functionalUpdate)(updater, scrollRestorationCache.state) || scrollRestorationCache.state, window.sessionStorage.setItem(
      storageKey,
      JSON.stringify(scrollRestorationCache.state)
    ))
  };
})() : void 0;
const defaultGetScrollRestorationKey = (location) => {
  return location.state.key || location.href;
};
function getCssSelector(el) {
  const path = [];
  let parent;
  while (parent = el.parentNode) {
    path.unshift(
      `${el.tagName}:nth-child(${[].indexOf.call(parent.children, el) + 1})`
    );
    el = parent;
  }
  return `${path.join(" > ")}`.toLowerCase();
}
let ignoreScroll = false;
function restoreScroll(storageKey2, key, behavior, shouldScrollRestoration) {
  var _a;
  let byKey;
  try {
    byKey = JSON.parse(sessionStorage.getItem(storageKey2) || "{}");
  } catch (error) {
    console.error(error);
    return;
  }
  const resolvedKey = key || ((_a = window.history.state) == null ? void 0 : _a.key);
  const elementEntries = byKey[resolvedKey];
  ignoreScroll = true;
  (() => {
    if (shouldScrollRestoration && elementEntries) {
      for (const elementSelector in elementEntries) {
        const entry = elementEntries[elementSelector];
        if (elementSelector === "window") {
          window.scrollTo({
            top: entry.scrollY,
            left: entry.scrollX,
            behavior
          });
        } else if (elementSelector) {
          const element = document.querySelector(elementSelector);
          if (element) {
            element.scrollLeft = entry.scrollX;
            element.scrollTop = entry.scrollY;
          }
        }
      }
      return;
    }
    const hash = window.location.hash.split("#")[1];
    if (hash) {
      const hashScrollIntoViewOptions = (window.history.state || {}).__hashScrollIntoViewOptions ?? true;
      if (hashScrollIntoViewOptions) {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView(hashScrollIntoViewOptions);
        }
      }
      return;
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior
    });
  })();
  ignoreScroll = false;
}
function setupScrollRestoration(router, force) {
  const shouldScrollRestoration = force ?? router.options.scrollRestoration ?? false;
  if (shouldScrollRestoration) {
    router.isScrollRestoring = true;
  }
  if (typeof document === "undefined" || router.isScrollRestorationSetup) {
    return;
  }
  router.isScrollRestorationSetup = true;
  ignoreScroll = false;
  const getKey = router.options.getScrollRestorationKey || defaultGetScrollRestorationKey;
  window.history.scrollRestoration = "manual";
  const onScroll = (event) => {
    if (ignoreScroll || !router.isScrollRestoring) {
      return;
    }
    let elementSelector = "";
    if (event.target === document || event.target === window) {
      elementSelector = "window";
    } else {
      const attrId = event.target.getAttribute(
        "data-scroll-restoration-id"
      );
      if (attrId) {
        elementSelector = `[data-scroll-restoration-id="${attrId}"]`;
      } else {
        elementSelector = getCssSelector(event.target);
      }
    }
    const restoreKey = getKey(router.state.location);
    scrollRestorationCache.set((state) => {
      const keyEntry = state[restoreKey] = state[restoreKey] || {};
      const elementEntry = keyEntry[elementSelector] = keyEntry[elementSelector] || {};
      if (elementSelector === "window") {
        elementEntry.scrollX = window.scrollX || 0;
        elementEntry.scrollY = window.scrollY || 0;
      } else if (elementSelector) {
        const element = document.querySelector(elementSelector);
        if (element) {
          elementEntry.scrollX = element.scrollLeft || 0;
          elementEntry.scrollY = element.scrollTop || 0;
        }
      }
      return state;
    });
  };
  if (typeof document !== "undefined") {
    document.addEventListener("scroll", throttle(onScroll, 100), true);
  }
  router.subscribe("onRendered", (event) => {
    const cacheKey = getKey(event.toLocation);
    if (!router.resetNextScroll) {
      router.resetNextScroll = true;
      return;
    }
    restoreScroll(
      storageKey,
      cacheKey,
      router.options.scrollRestorationBehavior,
      router.isScrollRestoring
    );
    if (router.isScrollRestoring) {
      scrollRestorationCache.set((state) => {
        state[cacheKey] = state[cacheKey] || {};
        return state;
      });
    }
  });
}
function ScrollRestoration() {
  const router = (0,_useRouter_js__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
  const getKey = router.options.getScrollRestorationKey || defaultGetScrollRestorationKey;
  const userKey = getKey(router.latestLocation);
  const resolvedKey = userKey !== defaultGetScrollRestorationKey(router.latestLocation) ? userKey : null;
  if (!router.isScrollRestoring || !router.isServer) {
    return null;
  }
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
    _ScriptOnce_js__WEBPACK_IMPORTED_MODULE_3__.ScriptOnce,
    {
      children: `(${restoreScroll.toString()})(${JSON.stringify(storageKey)},${JSON.stringify(resolvedKey)}, undefined, true)`,
      log: false
    }
  );
}

//# sourceMappingURL=scroll-restoration.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/useLoaderData.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/useLoaderData.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useLoaderData: () => (/* binding */ useLoaderData)
/* harmony export */ });
/* harmony import */ var _useMatch_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useMatch.js */ "./node_modules/@tanstack/react-router/dist/esm/useMatch.js");

function useLoaderData(opts) {
  return (0,_useMatch_js__WEBPACK_IMPORTED_MODULE_0__.useMatch)({
    from: opts.from,
    strict: opts.strict,
    structuralSharing: opts.structuralSharing,
    select: (s) => {
      return opts.select ? opts.select(s.loaderData) : s.loaderData;
    }
  });
}

//# sourceMappingURL=useLoaderData.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/useLoaderDeps.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/useLoaderDeps.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useLoaderDeps: () => (/* binding */ useLoaderDeps)
/* harmony export */ });
/* harmony import */ var _useMatch_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useMatch.js */ "./node_modules/@tanstack/react-router/dist/esm/useMatch.js");

function useLoaderDeps(opts) {
  const { select, ...rest } = opts;
  return (0,_useMatch_js__WEBPACK_IMPORTED_MODULE_0__.useMatch)({
    ...rest,
    select: (s) => {
      return select ? select(s.loaderDeps) : s.loaderDeps;
    }
  });
}

//# sourceMappingURL=useLoaderDeps.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/useMatch.js":
/*!******************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/useMatch.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useMatch: () => (/* binding */ useMatch)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var tiny_invariant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tiny-invariant */ "./node_modules/tiny-invariant/dist/esm/tiny-invariant.js");
/* harmony import */ var _useRouterState_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./useRouterState.js */ "./node_modules/@tanstack/react-router/dist/esm/useRouterState.js");
/* harmony import */ var _matchContext_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./matchContext.js */ "./node_modules/@tanstack/react-router/dist/esm/matchContext.js");




function useMatch(opts) {
  const nearestMatchId = react__WEBPACK_IMPORTED_MODULE_0__.useContext(
    opts.from ? _matchContext_js__WEBPACK_IMPORTED_MODULE_2__.dummyMatchContext : _matchContext_js__WEBPACK_IMPORTED_MODULE_2__.matchContext
  );
  const matchSelection = (0,_useRouterState_js__WEBPACK_IMPORTED_MODULE_3__.useRouterState)({
    select: (state) => {
      const match = state.matches.find(
        (d) => opts.from ? opts.from === d.routeId : d.id === nearestMatchId
      );
      (0,tiny_invariant__WEBPACK_IMPORTED_MODULE_1__["default"])(
        !((opts.shouldThrow ?? true) && !match),
        `Could not find ${opts.from ? `an active match from "${opts.from}"` : "a nearest match!"}`
      );
      if (match === void 0) {
        return void 0;
      }
      return opts.select ? opts.select(match) : match;
    },
    structuralSharing: opts.structuralSharing
  });
  return matchSelection;
}

//# sourceMappingURL=useMatch.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/useNavigate.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/useNavigate.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Navigate: () => (/* binding */ Navigate),
/* harmony export */   useNavigate: () => (/* binding */ useNavigate)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _useRouter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useRouter.js */ "./node_modules/@tanstack/react-router/dist/esm/useRouter.js");


function useNavigate(_defaultOpts) {
  const { navigate } = (0,_useRouter_js__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
  return react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
    (options) => {
      return navigate({
        ...options
      });
    },
    [navigate]
  );
}
function Navigate(props) {
  const { navigate } = (0,_useRouter_js__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    navigate({
      ...props
    });
  }, [navigate, props]);
  return null;
}

//# sourceMappingURL=useNavigate.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/useParams.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/useParams.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useParams: () => (/* binding */ useParams)
/* harmony export */ });
/* harmony import */ var _useMatch_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useMatch.js */ "./node_modules/@tanstack/react-router/dist/esm/useMatch.js");

function useParams(opts) {
  return (0,_useMatch_js__WEBPACK_IMPORTED_MODULE_0__.useMatch)({
    from: opts.from,
    strict: opts.strict,
    structuralSharing: opts.structuralSharing,
    select: (match) => {
      return opts.select ? opts.select(match.params) : match.params;
    }
  });
}

//# sourceMappingURL=useParams.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/useRouter.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/useRouter.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useRouter: () => (/* binding */ useRouter)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var tiny_warning__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tiny-warning */ "./node_modules/tiny-warning/dist/tiny-warning.esm.js");
/* harmony import */ var _routerContext_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./routerContext.js */ "./node_modules/@tanstack/react-router/dist/esm/routerContext.js");



function useRouter(opts) {
  const value = react__WEBPACK_IMPORTED_MODULE_0__.useContext((0,_routerContext_js__WEBPACK_IMPORTED_MODULE_1__.getRouterContext)());
  (0,tiny_warning__WEBPACK_IMPORTED_MODULE_2__["default"])(
    !(((opts == null ? void 0 : opts.warn) ?? true) && !value),
    "useRouter must be used inside a <RouterProvider> component!"
  );
  return value;
}

//# sourceMappingURL=useRouter.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/useRouterState.js":
/*!************************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/useRouterState.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useRouterState: () => (/* binding */ useRouterState)
/* harmony export */ });
/* harmony import */ var _tanstack_react_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tanstack/react-store */ "./node_modules/@tanstack/react-store/dist/esm/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _tanstack_router_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tanstack/router-core */ "./node_modules/@tanstack/router-core/dist/esm/utils.js");
/* harmony import */ var _useRouter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useRouter.js */ "./node_modules/@tanstack/react-router/dist/esm/useRouter.js");




function useRouterState(opts) {
  const contextRouter = (0,_useRouter_js__WEBPACK_IMPORTED_MODULE_1__.useRouter)({
    warn: (opts == null ? void 0 : opts.router) === void 0
  });
  const router = (opts == null ? void 0 : opts.router) || contextRouter;
  const previousResult = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(void 0);
  return (0,_tanstack_react_store__WEBPACK_IMPORTED_MODULE_2__.useStore)(router.__store, (state) => {
    if (opts == null ? void 0 : opts.select) {
      if (opts.structuralSharing ?? router.options.defaultStructuralSharing) {
        const newSlice = (0,_tanstack_router_core__WEBPACK_IMPORTED_MODULE_3__.replaceEqualDeep)(
          previousResult.current,
          opts.select(state)
        );
        previousResult.current = newSlice;
        return newSlice;
      }
      return opts.select(state);
    }
    return state;
  });
}

//# sourceMappingURL=useRouterState.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/useSearch.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/useSearch.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useSearch: () => (/* binding */ useSearch)
/* harmony export */ });
/* harmony import */ var _useMatch_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useMatch.js */ "./node_modules/@tanstack/react-router/dist/esm/useMatch.js");

function useSearch(opts) {
  return (0,_useMatch_js__WEBPACK_IMPORTED_MODULE_0__.useMatch)({
    from: opts.from,
    strict: opts.strict,
    structuralSharing: opts.structuralSharing,
    select: (match) => {
      return opts.select ? opts.select(match.search) : match.search;
    }
  });
}

//# sourceMappingURL=useSearch.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-router/dist/esm/utils.js":
/*!***************************************************************!*\
  !*** ./node_modules/@tanstack/react-router/dist/esm/utils.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useForwardedRef: () => (/* binding */ useForwardedRef),
/* harmony export */   useIntersectionObserver: () => (/* binding */ useIntersectionObserver),
/* harmony export */   useLayoutEffect: () => (/* binding */ useLayoutEffect),
/* harmony export */   usePrevious: () => (/* binding */ usePrevious),
/* harmony export */   useStableCallback: () => (/* binding */ useStableCallback)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");

function useStableCallback(fn) {
  const fnRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(fn);
  fnRef.current = fn;
  const ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef((...args) => fnRef.current(...args));
  return ref.current;
}
const useLayoutEffect = typeof window !== "undefined" ? react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect : react__WEBPACK_IMPORTED_MODULE_0__.useEffect;
function usePrevious(value) {
  const ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef({
    value,
    prev: null
  });
  const current = ref.current.value;
  if (value !== current) {
    ref.current = {
      value,
      prev: current
    };
  }
  return ref.current.prev;
}
function useIntersectionObserver(ref, callback, intersectionObserverOptions = {}, options = {}) {
  const isIntersectionObserverAvailable = react__WEBPACK_IMPORTED_MODULE_0__.useRef(
    typeof IntersectionObserver === "function"
  );
  const observerRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (!ref.current || !isIntersectionObserverAvailable.current || options.disabled) {
      return;
    }
    observerRef.current = new IntersectionObserver(([entry]) => {
      callback(entry);
    }, intersectionObserverOptions);
    observerRef.current.observe(ref.current);
    return () => {
      var _a;
      (_a = observerRef.current) == null ? void 0 : _a.disconnect();
    };
  }, [callback, intersectionObserverOptions, options.disabled, ref]);
  return observerRef.current;
}
function useForwardedRef(ref) {
  const innerRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (!ref) return;
    if (typeof ref === "function") {
      ref(innerRef.current);
    } else {
      ref.current = innerRef.current;
    }
  });
  return innerRef;
}

//# sourceMappingURL=utils.js.map


/***/ }),

/***/ "./node_modules/@tanstack/react-store/dist/esm/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/@tanstack/react-store/dist/esm/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Derived: () => (/* reexport safe */ _tanstack_store__WEBPACK_IMPORTED_MODULE_1__.Derived),
/* harmony export */   Effect: () => (/* reexport safe */ _tanstack_store__WEBPACK_IMPORTED_MODULE_1__.Effect),
/* harmony export */   Store: () => (/* reexport safe */ _tanstack_store__WEBPACK_IMPORTED_MODULE_1__.Store),
/* harmony export */   __depsThatHaveWrittenThisTick: () => (/* reexport safe */ _tanstack_store__WEBPACK_IMPORTED_MODULE_1__.__depsThatHaveWrittenThisTick),
/* harmony export */   __derivedToStore: () => (/* reexport safe */ _tanstack_store__WEBPACK_IMPORTED_MODULE_1__.__derivedToStore),
/* harmony export */   __flush: () => (/* reexport safe */ _tanstack_store__WEBPACK_IMPORTED_MODULE_1__.__flush),
/* harmony export */   __storeToDerived: () => (/* reexport safe */ _tanstack_store__WEBPACK_IMPORTED_MODULE_1__.__storeToDerived),
/* harmony export */   batch: () => (/* reexport safe */ _tanstack_store__WEBPACK_IMPORTED_MODULE_1__.batch),
/* harmony export */   shallow: () => (/* binding */ shallow),
/* harmony export */   useStore: () => (/* binding */ useStore)
/* harmony export */ });
/* harmony import */ var use_sync_external_store_shim_with_selector_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! use-sync-external-store/shim/with-selector.js */ "./node_modules/use-sync-external-store/shim/with-selector.js");
/* harmony import */ var _tanstack_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tanstack/store */ "./node_modules/@tanstack/store/dist/esm/index.js");


function useStore(store, selector = (d) => d) {
  const slice = (0,use_sync_external_store_shim_with_selector_js__WEBPACK_IMPORTED_MODULE_0__.useSyncExternalStoreWithSelector)(
    store.subscribe,
    () => store.state,
    () => store.state,
    selector,
    shallow
  );
  return slice;
}
function shallow(objA, objB) {
  if (Object.is(objA, objB)) {
    return true;
  }
  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
    return false;
  }
  if (objA instanceof Map && objB instanceof Map) {
    if (objA.size !== objB.size) return false;
    for (const [k, v] of objA) {
      if (!objB.has(k) || !Object.is(v, objB.get(k))) return false;
    }
    return true;
  }
  if (objA instanceof Set && objB instanceof Set) {
    if (objA.size !== objB.size) return false;
    for (const v of objA) {
      if (!objB.has(v)) return false;
    }
    return true;
  }
  const keysA = Object.keys(objA);
  if (keysA.length !== Object.keys(objB).length) {
    return false;
  }
  for (let i = 0; i < keysA.length; i++) {
    if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || !Object.is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }
  return true;
}

//# sourceMappingURL=index.js.map


/***/ }),

/***/ "./node_modules/@tanstack/router-core/dist/esm/path.js":
/*!*************************************************************!*\
  !*** ./node_modules/@tanstack/router-core/dist/esm/path.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cleanPath: () => (/* binding */ cleanPath),
/* harmony export */   exactPathTest: () => (/* binding */ exactPathTest),
/* harmony export */   interpolatePath: () => (/* binding */ interpolatePath),
/* harmony export */   joinPaths: () => (/* binding */ joinPaths),
/* harmony export */   matchByPath: () => (/* binding */ matchByPath),
/* harmony export */   matchPathname: () => (/* binding */ matchPathname),
/* harmony export */   parsePathname: () => (/* binding */ parsePathname),
/* harmony export */   removeBasepath: () => (/* binding */ removeBasepath),
/* harmony export */   removeTrailingSlash: () => (/* binding */ removeTrailingSlash),
/* harmony export */   resolvePath: () => (/* binding */ resolvePath),
/* harmony export */   trimPath: () => (/* binding */ trimPath),
/* harmony export */   trimPathLeft: () => (/* binding */ trimPathLeft),
/* harmony export */   trimPathRight: () => (/* binding */ trimPathRight)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/router-core/dist/esm/utils.js");

function joinPaths(paths) {
  return cleanPath(
    paths.filter((val) => {
      return val !== void 0;
    }).join("/")
  );
}
function cleanPath(path) {
  return path.replace(/\/{2,}/g, "/");
}
function trimPathLeft(path) {
  return path === "/" ? path : path.replace(/^\/{1,}/, "");
}
function trimPathRight(path) {
  return path === "/" ? path : path.replace(/\/{1,}$/, "");
}
function trimPath(path) {
  return trimPathRight(trimPathLeft(path));
}
function removeTrailingSlash(value, basepath) {
  if (value.endsWith("/") && value !== "/" && value !== `${basepath}/`) {
    return value.slice(0, -1);
  }
  return value;
}
function exactPathTest(pathName1, pathName2, basepath) {
  return removeTrailingSlash(pathName1, basepath) === removeTrailingSlash(pathName2, basepath);
}
function resolvePath({
  basepath,
  base,
  to,
  trailingSlash = "never",
  caseSensitive
}) {
  var _a, _b;
  base = removeBasepath(basepath, base, caseSensitive);
  to = removeBasepath(basepath, to, caseSensitive);
  let baseSegments = parsePathname(base);
  const toSegments = parsePathname(to);
  if (baseSegments.length > 1 && ((_a = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.last)(baseSegments)) == null ? void 0 : _a.value) === "/") {
    baseSegments.pop();
  }
  toSegments.forEach((toSegment, index) => {
    if (toSegment.value === "/") {
      if (!index) {
        baseSegments = [toSegment];
      } else if (index === toSegments.length - 1) {
        baseSegments.push(toSegment);
      } else ;
    } else if (toSegment.value === "..") {
      baseSegments.pop();
    } else if (toSegment.value === ".") ;
    else {
      baseSegments.push(toSegment);
    }
  });
  if (baseSegments.length > 1) {
    if (((_b = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.last)(baseSegments)) == null ? void 0 : _b.value) === "/") {
      if (trailingSlash === "never") {
        baseSegments.pop();
      }
    } else if (trailingSlash === "always") {
      baseSegments.push({ type: "pathname", value: "/" });
    }
  }
  const joined = joinPaths([basepath, ...baseSegments.map((d) => d.value)]);
  return cleanPath(joined);
}
function parsePathname(pathname) {
  if (!pathname) {
    return [];
  }
  pathname = cleanPath(pathname);
  const segments = [];
  if (pathname.slice(0, 1) === "/") {
    pathname = pathname.substring(1);
    segments.push({
      type: "pathname",
      value: "/"
    });
  }
  if (!pathname) {
    return segments;
  }
  const split = pathname.split("/").filter(Boolean);
  segments.push(
    ...split.map((part) => {
      if (part === "$" || part === "*") {
        return {
          type: "wildcard",
          value: part
        };
      }
      if (part.charAt(0) === "$") {
        return {
          type: "param",
          value: part
        };
      }
      return {
        type: "pathname",
        value: decodeURI(part)
      };
    })
  );
  if (pathname.slice(-1) === "/") {
    pathname = pathname.substring(1);
    segments.push({
      type: "pathname",
      value: "/"
    });
  }
  return segments;
}
function interpolatePath({
  path,
  params,
  leaveWildcards,
  leaveParams,
  decodeCharMap
}) {
  const interpolatedPathSegments = parsePathname(path);
  function encodeParam(key) {
    const value = params[key];
    const isValueString = typeof value === "string";
    if (["*", "_splat"].includes(key)) {
      return isValueString ? encodeURI(value) : value;
    } else {
      return isValueString ? encodePathParam(value, decodeCharMap) : value;
    }
  }
  const usedParams = {};
  const interpolatedPath = joinPaths(
    interpolatedPathSegments.map((segment) => {
      if (segment.type === "wildcard") {
        usedParams._splat = params._splat;
        const value = encodeParam("_splat");
        if (leaveWildcards) return `${segment.value}${value ?? ""}`;
        return value;
      }
      if (segment.type === "param") {
        const key = segment.value.substring(1);
        usedParams[key] = params[key];
        if (leaveParams) {
          const value = encodeParam(segment.value);
          return `${segment.value}${value ?? ""}`;
        }
        return encodeParam(key) ?? "undefined";
      }
      return segment.value;
    })
  );
  return { usedParams, interpolatedPath };
}
function encodePathParam(value, decodeCharMap) {
  let encoded = encodeURIComponent(value);
  if (decodeCharMap) {
    for (const [encodedChar, char] of decodeCharMap) {
      encoded = encoded.replaceAll(encodedChar, char);
    }
  }
  return encoded;
}
function matchPathname(basepath, currentPathname, matchLocation) {
  const pathParams = matchByPath(basepath, currentPathname, matchLocation);
  if (matchLocation.to && !pathParams) {
    return;
  }
  return pathParams ?? {};
}
function removeBasepath(basepath, pathname, caseSensitive = false) {
  const normalizedBasepath = caseSensitive ? basepath : basepath.toLowerCase();
  const normalizedPathname = caseSensitive ? pathname : pathname.toLowerCase();
  switch (true) {
    // default behaviour is to serve app from the root - pathname
    // left untouched
    case normalizedBasepath === "/":
      return pathname;
    // shortcut for removing the basepath if it matches the pathname
    case normalizedPathname === normalizedBasepath:
      return "";
    // in case pathname is shorter than basepath - there is
    // nothing to remove
    case pathname.length < basepath.length:
      return pathname;
    // avoid matching partial segments - strict equality handled
    // earlier, otherwise, basepath separated from pathname with
    // separator, therefore lack of separator means partial
    // segment match (`/app` should not match `/application`)
    case normalizedPathname[normalizedBasepath.length] !== "/":
      return pathname;
    // remove the basepath from the pathname if it starts with it
    case normalizedPathname.startsWith(normalizedBasepath):
      return pathname.slice(basepath.length);
    // otherwise, return the pathname as is
    default:
      return pathname;
  }
}
function matchByPath(basepath, from, matchLocation) {
  if (basepath !== "/" && !from.startsWith(basepath)) {
    return void 0;
  }
  from = removeBasepath(basepath, from, matchLocation.caseSensitive);
  const to = removeBasepath(
    basepath,
    `${matchLocation.to ?? "$"}`,
    matchLocation.caseSensitive
  );
  const baseSegments = parsePathname(from);
  const routeSegments = parsePathname(to);
  if (!from.startsWith("/")) {
    baseSegments.unshift({
      type: "pathname",
      value: "/"
    });
  }
  if (!to.startsWith("/")) {
    routeSegments.unshift({
      type: "pathname",
      value: "/"
    });
  }
  const params = {};
  const isMatch = (() => {
    for (let i = 0; i < Math.max(baseSegments.length, routeSegments.length); i++) {
      const baseSegment = baseSegments[i];
      const routeSegment = routeSegments[i];
      const isLastBaseSegment = i >= baseSegments.length - 1;
      const isLastRouteSegment = i >= routeSegments.length - 1;
      if (routeSegment) {
        if (routeSegment.type === "wildcard") {
          const _splat = decodeURI(
            joinPaths(baseSegments.slice(i).map((d) => d.value))
          );
          params["*"] = _splat;
          params["_splat"] = _splat;
          return true;
        }
        if (routeSegment.type === "pathname") {
          if (routeSegment.value === "/" && !(baseSegment == null ? void 0 : baseSegment.value)) {
            return true;
          }
          if (baseSegment) {
            if (matchLocation.caseSensitive) {
              if (routeSegment.value !== baseSegment.value) {
                return false;
              }
            } else if (routeSegment.value.toLowerCase() !== baseSegment.value.toLowerCase()) {
              return false;
            }
          }
        }
        if (!baseSegment) {
          return false;
        }
        if (routeSegment.type === "param") {
          if (baseSegment.value === "/") {
            return false;
          }
          if (baseSegment.value.charAt(0) !== "$") {
            params[routeSegment.value.substring(1)] = decodeURIComponent(
              baseSegment.value
            );
          }
        }
      }
      if (!isLastBaseSegment && isLastRouteSegment) {
        params["**"] = joinPaths(baseSegments.slice(i + 1).map((d) => d.value));
        return !!matchLocation.fuzzy && (routeSegment == null ? void 0 : routeSegment.value) !== "/";
      }
    }
    return true;
  })();
  return isMatch ? params : void 0;
}

//# sourceMappingURL=path.js.map


/***/ }),

/***/ "./node_modules/@tanstack/router-core/dist/esm/qss.js":
/*!************************************************************!*\
  !*** ./node_modules/@tanstack/router-core/dist/esm/qss.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decode: () => (/* binding */ decode),
/* harmony export */   encode: () => (/* binding */ encode)
/* harmony export */ });
function encode(obj, pfx) {
  let k, i, tmp, str = "";
  for (k in obj) {
    if ((tmp = obj[k]) !== void 0) {
      if (Array.isArray(tmp)) {
        for (i = 0; i < tmp.length; i++) {
          str && (str += "&");
          str += encodeURIComponent(k) + "=" + encodeURIComponent(tmp[i]);
        }
      } else {
        str && (str += "&");
        str += encodeURIComponent(k) + "=" + encodeURIComponent(tmp);
      }
    }
  }
  return (pfx || "") + str;
}
function toValue(mix) {
  if (!mix) return "";
  const str = decodeURIComponent(mix);
  if (str === "false") return false;
  if (str === "true") return true;
  return +str * 0 === 0 && +str + "" === str ? +str : str;
}
function decode(str, pfx) {
  let tmp, k;
  const out = {}, arr = (pfx ? str.substr(pfx.length) : str).split("&");
  while (tmp = arr.shift()) {
    const equalIndex = tmp.indexOf("=");
    if (equalIndex !== -1) {
      k = tmp.slice(0, equalIndex);
      k = decodeURIComponent(k);
      const value = tmp.slice(equalIndex + 1);
      if (out[k] !== void 0) {
        out[k] = [].concat(out[k], toValue(value));
      } else {
        out[k] = toValue(value);
      }
    } else {
      k = tmp;
      k = decodeURIComponent(k);
      out[k] = "";
    }
  }
  return out;
}

//# sourceMappingURL=qss.js.map


/***/ }),

/***/ "./node_modules/@tanstack/router-core/dist/esm/root.js":
/*!*************************************************************!*\
  !*** ./node_modules/@tanstack/router-core/dist/esm/root.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   rootRouteId: () => (/* binding */ rootRouteId)
/* harmony export */ });
const rootRouteId = "__root__";

//# sourceMappingURL=root.js.map


/***/ }),

/***/ "./node_modules/@tanstack/router-core/dist/esm/router.js":
/*!***************************************************************!*\
  !*** ./node_modules/@tanstack/router-core/dist/esm/router.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultSerializeError: () => (/* binding */ defaultSerializeError),
/* harmony export */   getLocationChangeInfo: () => (/* binding */ getLocationChangeInfo)
/* harmony export */ });
function defaultSerializeError(err) {
  if (err instanceof Error) {
    const obj = {
      name: err.name,
      message: err.message
    };
    if (true) {
      obj.stack = err.stack;
    }
    return obj;
  }
  return {
    data: err
  };
}
function getLocationChangeInfo(routerState) {
  const fromLocation = routerState.resolvedLocation;
  const toLocation = routerState.location;
  const pathChanged = (fromLocation == null ? void 0 : fromLocation.pathname) !== toLocation.pathname;
  const hrefChanged = (fromLocation == null ? void 0 : fromLocation.href) !== toLocation.href;
  const hashChanged = (fromLocation == null ? void 0 : fromLocation.hash) !== toLocation.hash;
  return { fromLocation, toLocation, pathChanged, hrefChanged, hashChanged };
}

//# sourceMappingURL=router.js.map


/***/ }),

/***/ "./node_modules/@tanstack/router-core/dist/esm/searchParams.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@tanstack/router-core/dist/esm/searchParams.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultParseSearch: () => (/* binding */ defaultParseSearch),
/* harmony export */   defaultStringifySearch: () => (/* binding */ defaultStringifySearch),
/* harmony export */   parseSearchWith: () => (/* binding */ parseSearchWith),
/* harmony export */   stringifySearchWith: () => (/* binding */ stringifySearchWith)
/* harmony export */ });
/* harmony import */ var _qss_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./qss.js */ "./node_modules/@tanstack/router-core/dist/esm/qss.js");

const defaultParseSearch = parseSearchWith(JSON.parse);
const defaultStringifySearch = stringifySearchWith(
  JSON.stringify,
  JSON.parse
);
function parseSearchWith(parser) {
  return (searchStr) => {
    if (searchStr.substring(0, 1) === "?") {
      searchStr = searchStr.substring(1);
    }
    const query = (0,_qss_js__WEBPACK_IMPORTED_MODULE_0__.decode)(searchStr);
    for (const key in query) {
      const value = query[key];
      if (typeof value === "string") {
        try {
          query[key] = parser(value);
        } catch (err) {
        }
      }
    }
    return query;
  };
}
function stringifySearchWith(stringify, parser) {
  function stringifyValue(val) {
    if (typeof val === "object" && val !== null) {
      try {
        return stringify(val);
      } catch (err) {
      }
    } else if (typeof val === "string" && typeof parser === "function") {
      try {
        parser(val);
        return stringify(val);
      } catch (err) {
      }
    }
    return val;
  }
  return (search) => {
    search = { ...search };
    Object.keys(search).forEach((key) => {
      const val = search[key];
      if (typeof val === "undefined" || val === void 0) {
        delete search[key];
      } else {
        search[key] = stringifyValue(val);
      }
    });
    const searchStr = (0,_qss_js__WEBPACK_IMPORTED_MODULE_0__.encode)(search).toString();
    return searchStr ? `?${searchStr}` : "";
  };
}

//# sourceMappingURL=searchParams.js.map


/***/ }),

/***/ "./node_modules/@tanstack/router-core/dist/esm/utils.js":
/*!**************************************************************!*\
  !*** ./node_modules/@tanstack/router-core/dist/esm/utils.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createControlledPromise: () => (/* binding */ createControlledPromise),
/* harmony export */   deepEqual: () => (/* binding */ deepEqual),
/* harmony export */   escapeJSON: () => (/* binding */ escapeJSON),
/* harmony export */   functionalUpdate: () => (/* binding */ functionalUpdate),
/* harmony export */   isPlainArray: () => (/* binding */ isPlainArray),
/* harmony export */   isPlainObject: () => (/* binding */ isPlainObject),
/* harmony export */   last: () => (/* binding */ last),
/* harmony export */   pick: () => (/* binding */ pick),
/* harmony export */   replaceEqualDeep: () => (/* binding */ replaceEqualDeep),
/* harmony export */   shallow: () => (/* binding */ shallow)
/* harmony export */ });
function last(arr) {
  return arr[arr.length - 1];
}
function isFunction(d) {
  return typeof d === "function";
}
function functionalUpdate(updater, previous) {
  if (isFunction(updater)) {
    return updater(previous);
  }
  return updater;
}
function pick(parent, keys) {
  return keys.reduce((obj, key) => {
    obj[key] = parent[key];
    return obj;
  }, {});
}
function replaceEqualDeep(prev, _next) {
  if (prev === _next) {
    return prev;
  }
  const next = _next;
  const array = isPlainArray(prev) && isPlainArray(next);
  if (array || isPlainObject(prev) && isPlainObject(next)) {
    const prevItems = array ? prev : Object.keys(prev);
    const prevSize = prevItems.length;
    const nextItems = array ? next : Object.keys(next);
    const nextSize = nextItems.length;
    const copy = array ? [] : {};
    let equalItems = 0;
    for (let i = 0; i < nextSize; i++) {
      const key = array ? i : nextItems[i];
      if ((!array && prevItems.includes(key) || array) && prev[key] === void 0 && next[key] === void 0) {
        copy[key] = void 0;
        equalItems++;
      } else {
        copy[key] = replaceEqualDeep(prev[key], next[key]);
        if (copy[key] === prev[key] && prev[key] !== void 0) {
          equalItems++;
        }
      }
    }
    return prevSize === nextSize && equalItems === prevSize ? prev : copy;
  }
  return next;
}
function isPlainObject(o) {
  if (!hasObjectPrototype(o)) {
    return false;
  }
  const ctor = o.constructor;
  if (typeof ctor === "undefined") {
    return true;
  }
  const prot = ctor.prototype;
  if (!hasObjectPrototype(prot)) {
    return false;
  }
  if (!prot.hasOwnProperty("isPrototypeOf")) {
    return false;
  }
  return true;
}
function hasObjectPrototype(o) {
  return Object.prototype.toString.call(o) === "[object Object]";
}
function isPlainArray(value) {
  return Array.isArray(value) && value.length === Object.keys(value).length;
}
function getObjectKeys(obj, ignoreUndefined) {
  let keys = Object.keys(obj);
  if (ignoreUndefined) {
    keys = keys.filter((key) => obj[key] !== void 0);
  }
  return keys;
}
function deepEqual(a, b, opts) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (isPlainObject(a) && isPlainObject(b)) {
    const ignoreUndefined = (opts == null ? void 0 : opts.ignoreUndefined) ?? true;
    const aKeys = getObjectKeys(a, ignoreUndefined);
    const bKeys = getObjectKeys(b, ignoreUndefined);
    if (!(opts == null ? void 0 : opts.partial) && aKeys.length !== bKeys.length) {
      return false;
    }
    return bKeys.every((key) => deepEqual(a[key], b[key], opts));
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }
    return !a.some((item, index) => !deepEqual(item, b[index], opts));
  }
  return false;
}
function createControlledPromise(onResolve) {
  let resolveLoadPromise;
  let rejectLoadPromise;
  const controlledPromise = new Promise((resolve, reject) => {
    resolveLoadPromise = resolve;
    rejectLoadPromise = reject;
  });
  controlledPromise.status = "pending";
  controlledPromise.resolve = (value) => {
    controlledPromise.status = "resolved";
    controlledPromise.value = value;
    resolveLoadPromise(value);
    onResolve == null ? void 0 : onResolve(value);
  };
  controlledPromise.reject = (e) => {
    controlledPromise.status = "rejected";
    rejectLoadPromise(e);
  };
  return controlledPromise;
}
function escapeJSON(jsonString) {
  return jsonString.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/"/g, '\\"');
}
function shallow(objA, objB) {
  if (Object.is(objA, objB)) {
    return true;
  }
  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
    return false;
  }
  const keysA = Object.keys(objA);
  if (keysA.length !== Object.keys(objB).length) {
    return false;
  }
  for (const item of keysA) {
    if (!Object.prototype.hasOwnProperty.call(objB, item) || !Object.is(objA[item], objB[item])) {
      return false;
    }
  }
  return true;
}

//# sourceMappingURL=utils.js.map


/***/ }),

/***/ "./node_modules/@tanstack/store/dist/esm/derived.js":
/*!**********************************************************!*\
  !*** ./node_modules/@tanstack/store/dist/esm/derived.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Derived: () => (/* binding */ Derived)
/* harmony export */ });
/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store.js */ "./node_modules/@tanstack/store/dist/esm/store.js");
/* harmony import */ var _scheduler_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scheduler.js */ "./node_modules/@tanstack/store/dist/esm/scheduler.js");


class Derived {
  constructor(options) {
    this.listeners = /* @__PURE__ */ new Set();
    this._subscriptions = [];
    this.lastSeenDepValues = [];
    this.getDepVals = () => {
      const prevDepVals = [];
      const currDepVals = [];
      for (const dep of this.options.deps) {
        prevDepVals.push(dep.prevState);
        currDepVals.push(dep.state);
      }
      this.lastSeenDepValues = currDepVals;
      return {
        prevDepVals,
        currDepVals,
        prevVal: this.prevState ?? void 0
      };
    };
    this.recompute = () => {
      var _a, _b;
      this.prevState = this.state;
      const { prevDepVals, currDepVals, prevVal } = this.getDepVals();
      this.state = this.options.fn({
        prevDepVals,
        currDepVals,
        prevVal
      });
      (_b = (_a = this.options).onUpdate) == null ? void 0 : _b.call(_a);
    };
    this.checkIfRecalculationNeededDeeply = () => {
      for (const dep of this.options.deps) {
        if (dep instanceof Derived) {
          dep.checkIfRecalculationNeededDeeply();
        }
      }
      let shouldRecompute = false;
      const lastSeenDepValues = this.lastSeenDepValues;
      const { currDepVals } = this.getDepVals();
      for (let i = 0; i < currDepVals.length; i++) {
        if (currDepVals[i] !== lastSeenDepValues[i]) {
          shouldRecompute = true;
          break;
        }
      }
      if (shouldRecompute) {
        this.recompute();
      }
    };
    this.mount = () => {
      this.registerOnGraph();
      this.checkIfRecalculationNeededDeeply();
      return () => {
        this.unregisterFromGraph();
        for (const cleanup of this._subscriptions) {
          cleanup();
        }
      };
    };
    this.subscribe = (listener) => {
      var _a, _b;
      this.listeners.add(listener);
      const unsub = (_b = (_a = this.options).onSubscribe) == null ? void 0 : _b.call(_a, listener, this);
      return () => {
        this.listeners.delete(listener);
        unsub == null ? void 0 : unsub();
      };
    };
    this.options = options;
    this.state = options.fn({
      prevDepVals: void 0,
      prevVal: void 0,
      currDepVals: this.getDepVals().currDepVals
    });
  }
  registerOnGraph(deps = this.options.deps) {
    for (const dep of deps) {
      if (dep instanceof Derived) {
        dep.registerOnGraph();
        this.registerOnGraph(dep.options.deps);
      } else if (dep instanceof _store_js__WEBPACK_IMPORTED_MODULE_0__.Store) {
        let relatedLinkedDerivedVals = _scheduler_js__WEBPACK_IMPORTED_MODULE_1__.__storeToDerived.get(dep);
        if (!relatedLinkedDerivedVals) {
          relatedLinkedDerivedVals = /* @__PURE__ */ new Set();
          _scheduler_js__WEBPACK_IMPORTED_MODULE_1__.__storeToDerived.set(dep, relatedLinkedDerivedVals);
        }
        relatedLinkedDerivedVals.add(this);
        let relatedStores = _scheduler_js__WEBPACK_IMPORTED_MODULE_1__.__derivedToStore.get(this);
        if (!relatedStores) {
          relatedStores = /* @__PURE__ */ new Set();
          _scheduler_js__WEBPACK_IMPORTED_MODULE_1__.__derivedToStore.set(this, relatedStores);
        }
        relatedStores.add(dep);
      }
    }
  }
  unregisterFromGraph(deps = this.options.deps) {
    for (const dep of deps) {
      if (dep instanceof Derived) {
        this.unregisterFromGraph(dep.options.deps);
      } else if (dep instanceof _store_js__WEBPACK_IMPORTED_MODULE_0__.Store) {
        const relatedLinkedDerivedVals = _scheduler_js__WEBPACK_IMPORTED_MODULE_1__.__storeToDerived.get(dep);
        if (relatedLinkedDerivedVals) {
          relatedLinkedDerivedVals.delete(this);
        }
        const relatedStores = _scheduler_js__WEBPACK_IMPORTED_MODULE_1__.__derivedToStore.get(this);
        if (relatedStores) {
          relatedStores.delete(dep);
        }
      }
    }
  }
}

//# sourceMappingURL=derived.js.map


/***/ }),

/***/ "./node_modules/@tanstack/store/dist/esm/effect.js":
/*!*********************************************************!*\
  !*** ./node_modules/@tanstack/store/dist/esm/effect.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Effect: () => (/* binding */ Effect)
/* harmony export */ });
/* harmony import */ var _derived_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./derived.js */ "./node_modules/@tanstack/store/dist/esm/derived.js");

class Effect {
  constructor(opts) {
    const { eager, fn, ...derivedProps } = opts;
    this._derived = new _derived_js__WEBPACK_IMPORTED_MODULE_0__.Derived({
      ...derivedProps,
      fn: () => {
      },
      onUpdate() {
        fn();
      }
    });
    if (eager) {
      fn();
    }
  }
  mount() {
    return this._derived.mount();
  }
}

//# sourceMappingURL=effect.js.map


/***/ }),

/***/ "./node_modules/@tanstack/store/dist/esm/index.js":
/*!********************************************************!*\
  !*** ./node_modules/@tanstack/store/dist/esm/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Derived: () => (/* reexport safe */ _derived_js__WEBPACK_IMPORTED_MODULE_0__.Derived),
/* harmony export */   Effect: () => (/* reexport safe */ _effect_js__WEBPACK_IMPORTED_MODULE_1__.Effect),
/* harmony export */   Store: () => (/* reexport safe */ _store_js__WEBPACK_IMPORTED_MODULE_2__.Store),
/* harmony export */   __depsThatHaveWrittenThisTick: () => (/* reexport safe */ _scheduler_js__WEBPACK_IMPORTED_MODULE_3__.__depsThatHaveWrittenThisTick),
/* harmony export */   __derivedToStore: () => (/* reexport safe */ _scheduler_js__WEBPACK_IMPORTED_MODULE_3__.__derivedToStore),
/* harmony export */   __flush: () => (/* reexport safe */ _scheduler_js__WEBPACK_IMPORTED_MODULE_3__.__flush),
/* harmony export */   __storeToDerived: () => (/* reexport safe */ _scheduler_js__WEBPACK_IMPORTED_MODULE_3__.__storeToDerived),
/* harmony export */   batch: () => (/* reexport safe */ _scheduler_js__WEBPACK_IMPORTED_MODULE_3__.batch)
/* harmony export */ });
/* harmony import */ var _derived_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./derived.js */ "./node_modules/@tanstack/store/dist/esm/derived.js");
/* harmony import */ var _effect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./effect.js */ "./node_modules/@tanstack/store/dist/esm/effect.js");
/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./store.js */ "./node_modules/@tanstack/store/dist/esm/store.js");
/* harmony import */ var _scheduler_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scheduler.js */ "./node_modules/@tanstack/store/dist/esm/scheduler.js");





//# sourceMappingURL=index.js.map


/***/ }),

/***/ "./node_modules/@tanstack/store/dist/esm/scheduler.js":
/*!************************************************************!*\
  !*** ./node_modules/@tanstack/store/dist/esm/scheduler.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __depsThatHaveWrittenThisTick: () => (/* binding */ __depsThatHaveWrittenThisTick),
/* harmony export */   __derivedToStore: () => (/* binding */ __derivedToStore),
/* harmony export */   __flush: () => (/* binding */ __flush),
/* harmony export */   __storeToDerived: () => (/* binding */ __storeToDerived),
/* harmony export */   batch: () => (/* binding */ batch)
/* harmony export */ });
/* harmony import */ var _derived_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./derived.js */ "./node_modules/@tanstack/store/dist/esm/derived.js");

const __storeToDerived = /* @__PURE__ */ new WeakMap();
const __derivedToStore = /* @__PURE__ */ new WeakMap();
const __depsThatHaveWrittenThisTick = {
  current: []
};
let __isFlushing = false;
let __batchDepth = 0;
const __pendingUpdates = /* @__PURE__ */ new Set();
const __initialBatchValues = /* @__PURE__ */ new Map();
function __flush_internals(relatedVals) {
  const sorted = Array.from(relatedVals).sort((a, b) => {
    if (a instanceof _derived_js__WEBPACK_IMPORTED_MODULE_0__.Derived && a.options.deps.includes(b)) return 1;
    if (b instanceof _derived_js__WEBPACK_IMPORTED_MODULE_0__.Derived && b.options.deps.includes(a)) return -1;
    return 0;
  });
  for (const derived of sorted) {
    if (__depsThatHaveWrittenThisTick.current.includes(derived)) {
      continue;
    }
    __depsThatHaveWrittenThisTick.current.push(derived);
    derived.recompute();
    const stores = __derivedToStore.get(derived);
    if (stores) {
      for (const store of stores) {
        const relatedLinkedDerivedVals = __storeToDerived.get(store);
        if (!relatedLinkedDerivedVals) continue;
        __flush_internals(relatedLinkedDerivedVals);
      }
    }
  }
}
function __notifyListeners(store) {
  store.listeners.forEach(
    (listener) => listener({
      prevVal: store.prevState,
      currentVal: store.state
    })
  );
}
function __notifyDerivedListeners(derived) {
  derived.listeners.forEach(
    (listener) => listener({
      prevVal: derived.prevState,
      currentVal: derived.state
    })
  );
}
function __flush(store) {
  if (__batchDepth > 0 && !__initialBatchValues.has(store)) {
    __initialBatchValues.set(store, store.prevState);
  }
  __pendingUpdates.add(store);
  if (__batchDepth > 0) return;
  if (__isFlushing) return;
  try {
    __isFlushing = true;
    while (__pendingUpdates.size > 0) {
      const stores = Array.from(__pendingUpdates);
      __pendingUpdates.clear();
      for (const store2 of stores) {
        const prevState = __initialBatchValues.get(store2) ?? store2.prevState;
        store2.prevState = prevState;
        __notifyListeners(store2);
      }
      for (const store2 of stores) {
        const derivedVals = __storeToDerived.get(store2);
        if (!derivedVals) continue;
        __depsThatHaveWrittenThisTick.current.push(store2);
        __flush_internals(derivedVals);
      }
      for (const store2 of stores) {
        const derivedVals = __storeToDerived.get(store2);
        if (!derivedVals) continue;
        for (const derived of derivedVals) {
          __notifyDerivedListeners(derived);
        }
      }
    }
  } finally {
    __isFlushing = false;
    __depsThatHaveWrittenThisTick.current = [];
    __initialBatchValues.clear();
  }
}
function batch(fn) {
  __batchDepth++;
  try {
    fn();
  } finally {
    __batchDepth--;
    if (__batchDepth === 0) {
      const pendingUpdateToFlush = Array.from(__pendingUpdates)[0];
      if (pendingUpdateToFlush) {
        __flush(pendingUpdateToFlush);
      }
    }
  }
}

//# sourceMappingURL=scheduler.js.map


/***/ }),

/***/ "./node_modules/@tanstack/store/dist/esm/store.js":
/*!********************************************************!*\
  !*** ./node_modules/@tanstack/store/dist/esm/store.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Store: () => (/* binding */ Store)
/* harmony export */ });
/* harmony import */ var _scheduler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scheduler.js */ "./node_modules/@tanstack/store/dist/esm/scheduler.js");

class Store {
  constructor(initialState, options) {
    this.listeners = /* @__PURE__ */ new Set();
    this.subscribe = (listener) => {
      var _a, _b;
      this.listeners.add(listener);
      const unsub = (_b = (_a = this.options) == null ? void 0 : _a.onSubscribe) == null ? void 0 : _b.call(_a, listener, this);
      return () => {
        this.listeners.delete(listener);
        unsub == null ? void 0 : unsub();
      };
    };
    this.setState = (updater) => {
      var _a, _b, _c;
      this.prevState = this.state;
      this.state = ((_a = this.options) == null ? void 0 : _a.updateFn) ? this.options.updateFn(this.prevState)(updater) : updater(this.prevState);
      (_c = (_b = this.options) == null ? void 0 : _b.onUpdate) == null ? void 0 : _c.call(_b);
      (0,_scheduler_js__WEBPACK_IMPORTED_MODULE_0__.__flush)(this);
    };
    this.prevState = initialState;
    this.state = initialState;
    this.options = options;
  }
}

//# sourceMappingURL=store.js.map


/***/ }),

/***/ "./node_modules/tiny-invariant/dist/esm/tiny-invariant.js":
/*!****************************************************************!*\
  !*** ./node_modules/tiny-invariant/dist/esm/tiny-invariant.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ invariant)
/* harmony export */ });
var isProduction = "development" === 'production';
var prefix = 'Invariant failed';
function invariant(condition, message) {
    if (condition) {
        return;
    }
    if (isProduction) {
        throw new Error(prefix);
    }
    var provided = typeof message === 'function' ? message() : message;
    var value = provided ? "".concat(prefix, ": ").concat(provided) : prefix;
    throw new Error(value);
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "simplybook_app:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunksimplybook_app"] = globalThis["webpackChunksimplybook_app"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/query-core/build/modern/queryCache.js");
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/query-core/build/modern/queryClient.js");
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js");
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/history/dist/esm/index.js");
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/route.js");
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/router.js");
/* harmony import */ var _tanstack_react_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @tanstack/react-router */ "./node_modules/@tanstack/react-router/dist/esm/RouterProvider.js");
/* harmony import */ var _routes_root_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./routes/__root.jsx */ "./src/routes/__root.jsx");
/* harmony import */ var _routeTree_gen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./routeTree.gen */ "./src/routeTree.gen.ts");





// Import the generated route tree

const hashHistory = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_3__.createHashHistory)();
const HOUR_IN_SECONDS = 3600;
const queryCache = new _tanstack_react_query__WEBPACK_IMPORTED_MODULE_4__.QueryCache({
  onError: error => {
    // any error handling code...
  }
});
let config = {
  defaultOptions: {
    queries: {
      staleTime: HOUR_IN_SECONDS * 1000,
      // hour in ms
      refetchOnWindowFocus: false,
      retry: false,
      suspense: false
    }
  }
};

// merge queryCache with config
config = {
  ...config,
  ...{
    queryCache
  }
};
const queryClient = new _tanstack_react_query__WEBPACK_IMPORTED_MODULE_5__.QueryClient(config);
const notFoundRoute = new _tanstack_react_router__WEBPACK_IMPORTED_MODULE_6__.NotFoundRoute({
  getParentRoute: () => _routes_root_jsx__WEBPACK_IMPORTED_MODULE_1__.Route,
  component: () => /*#__PURE__*/React.createElement("div", {
    className: "simplybook"
  }, "404 Not Found")
});
const router = (0,_tanstack_react_router__WEBPACK_IMPORTED_MODULE_7__.createRouter)({
  routeTree: _routeTree_gen__WEBPACK_IMPORTED_MODULE_2__.routeTree,
  notFoundRoute,
  context: {
    queryClient
  },
  history: hashHistory,
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0
});

// Lazy load dev tools
const ReactQueryDevtools = React.lazy(() => __webpack_require__.e(/*! import() */ "vendors-node_modules_tanstack_react-query-devtools_build_modern_index_js").then(__webpack_require__.bind(__webpack_require__, /*! @tanstack/react-query-devtools */ "./node_modules/@tanstack/react-query-devtools/build/modern/index.js")).then(d => ({
  default: d.ReactQueryDevtools
})));
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("simplybook_app");
  if (container) {
    // Disable React Query's suspense by default
    config.defaultOptions.queries.suspense = false;

    // Don't clear the container immediately
    const root = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createRoot)(container, {
      hydrate: true,
      // Tell React to hydrate instead of render
      onRecoverableError: err => {
        console.warn('Hydration error (usually harmless):', err);
      }
    });
    root.render(/*#__PURE__*/React.createElement(React.StrictMode, null, /*#__PURE__*/React.createElement(_tanstack_react_query__WEBPACK_IMPORTED_MODULE_8__.QueryClientProvider, {
      client: queryClient
    }, /*#__PURE__*/React.createElement(_tanstack_react_router__WEBPACK_IMPORTED_MODULE_9__.RouterProvider, {
      router: router
    }),  true && /*#__PURE__*/React.createElement(React.Suspense, null, /*#__PURE__*/React.createElement(ReactQueryDevtools, null)))));
  }
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map
=======
(()=>{var t,e,s,n,r={6244:(t,e,s)=>{"use strict";s.d(e,{A:()=>c});var n=s(6087),r=s(5556),o=s.n(r),i=s(7723);class a extends n.Component{constructor(t){super(t),this.state={hasError:!1,error:null,errorInfo:null,copied:!1},this.resetError=this.resetError.bind(this),this.copyError=this.copyError.bind(this)}static getDerivedStateFromError(t){return{hasError:!0}}componentDidCatch(t,e){this.setState({error:t,errorInfo:e})}resetError(){this.setState({hasError:!1,error:null,errorInfo:null})}copyError(){navigator.clipboard.writeText(`${this.state.error&&this.state.error.toString()}\nStack trace: ${this.state.errorInfo&&this.state.errorInfo.componentStack}`),this.setState({copied:!0})}render(){return this.state.hasError?React.createElement("div",{className:"rounded-md bg-white p-5 text-black shadow-md"},React.createElement("h3",{className:"mb-4 text-xl font-bold text-black"},(0,i.__)("Uh-oh! We stumbled upon an error.","simplybook")),React.createElement("div",{className:"mb-6 rounded-sm border bg-gray-50 p-4"},React.createElement("p",{className:"mb-2 text-base text-black"},this.state.error&&this.state.error.toString()),React.createElement("p",{className:"max-h-48 overflow-x-scroll text-xs text-black"},"Stack trace:"," ",this.state.errorInfo&&this.state.errorInfo.componentStack),React.createElement("button",{className:`mt-4 rounded-md px-4 py-2 font-medium text-white ${this.state.copied?"bg-green-500":"bg-blue-500 hover:bg-blue-600"} focus:outline-hidden focus:ring-2 focus:ring-blue-500`,onClick:this.copyError},this.state.copied?(0,i.__)("Copied","simplybook"):(0,i.__)("Copy Error","simplybook"))),React.createElement("p",{className:"mb-4 text-black"},(0,i.__)("We're sorry for the trouble. Please take a moment to report this issue on the WordPress forums so we can work on fixing it. Here’s how you can report the issue:","simplybook")),React.createElement("ol",{className:"list-inside list-decimal space-y-2 text-black"},React.createElement("li",null,(0,i.sprintf)((0,i.__)("Copy the error details by clicking the %s button above.","simplybook"),'"Copy Error"')),React.createElement("li",null,React.createElement("a",{href:"https://wordpress.org/support/plugin/simplybook/#new-topic-0",className:"text-blue-600 underline hover:text-blue-800"},(0,i.__)("Navigate to the Support Forum.","simplybook"))),React.createElement("li",null,(0,i.__)("If you haven’t already, log in to your WordPress.org account or create a new account.","simplybook")),React.createElement("li",null,(0,i.sprintf)((0,i.__)("Once logged in, click on %s under the Burst Statistics forum.","simplybook"),'"Create Topic"')),React.createElement("li",null,(0,i.sprintf)((0,i.__)("Title: Mention %s along with a brief hint of the error.","simplybook"),"'Error Encountered'")),React.createElement("li",null,(0,i.__)("Description: Paste the copied error details and explain what you were doing when the error occurred.","simplybook")),React.createElement("li",null,(0,i.sprintf)((0,i.__)("Click %s to post your topic. Our team will look into the issue and provide assistance.","simplybook"),'"Submit"')))):this.props.children}}a.propTypes={children:o().node,fallback:o().node},a.displayName="ErrorBoundary";const c=a},7159:t=>{"use strict";const e={},s=e.hasOwnProperty,n=(t,e)=>{for(const n in t)s.call(t,n)&&e(n,t[n])},r=t=>"\\u"+("0000"+t).slice(-4),o=(t,e)=>{let s=t.toString(16);return e?s:s.toUpperCase()},i=e.toString,a=Array.isArray,c=t=>"bigint"==typeof t,u={"\\":"\\\\","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t"},l=/[\\\b\f\n\r\t]/,h=/[0-9]/,d=/[\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/,p=/([\uD800-\uDBFF][\uDC00-\uDFFF])|([\uD800-\uDFFF])|(['"`])|[^]/g,f=/([\uD800-\uDBFF][\uDC00-\uDFFF])|([\uD800-\uDFFF])|(['"`])|[^ !#-&\(-\[\]-_a-~]/g,m=(t,e)=>{const s=()=>{_=R,++e.indentLevel,R=e.indent.repeat(e.indentLevel)},v={escapeEverything:!1,minimal:!1,isScriptContext:!1,quotes:"single",wrap:!1,es6:!1,json:!1,compact:!0,lowercaseHex:!1,numbers:"decimal",indent:"\t",indentLevel:0,__inline1__:!1,__inline2__:!1},y=e&&e.json;var g,b;y&&(v.quotes="double",v.wrap=!0),g=v,e=(b=e)?(n(b,((t,e)=>{g[t]=e})),g):g,"single"!=e.quotes&&"double"!=e.quotes&&"backtick"!=e.quotes&&(e.quotes="single");const S="double"==e.quotes?'"':"backtick"==e.quotes?"`":"'",w=e.compact,C=e.lowercaseHex;let R=e.indent.repeat(e.indentLevel),_="";const P=e.__inline1__,x=e.__inline2__,O=w?"":"\n";let E,k=!0;const M="binary"==e.numbers,L="octal"==e.numbers,F="decimal"==e.numbers,j="hexadecimal"==e.numbers;if(y&&t&&"function"==typeof t.toJSON&&(t=t.toJSON()),"string"!=typeof(I=t)&&"[object String]"!=i.call(I)){if((t=>"[object Map]"==i.call(t))(t))return 0==t.size?"new Map()":(w||(e.__inline1__=!0,e.__inline2__=!1),"new Map("+m(Array.from(t),e)+")");if((t=>"[object Set]"==i.call(t))(t))return 0==t.size?"new Set()":"new Set("+m(Array.from(t),e)+")";if((t=>"function"==typeof Buffer&&Buffer.isBuffer(t))(t))return 0==t.length?"Buffer.from([])":"Buffer.from("+m(Array.from(t),e)+")";if(a(t))return E=[],e.wrap=!0,P&&(e.__inline1__=!1,e.__inline2__=!0),x||s(),((t,e)=>{const s=t.length;let n=-1;for(;++n<s;)e(t[n])})(t,(t=>{k=!1,x&&(e.__inline2__=!1),E.push((w||x?"":R)+m(t,e))})),k?"[]":x?"["+E.join(", ")+"]":"["+O+E.join(","+O)+O+(w?"":_)+"]";if((t=>"number"==typeof t||"[object Number]"==i.call(t))(t)||c(t)){if(y)return JSON.stringify(Number(t));let e;if(F)e=String(t);else if(j){let s=t.toString(16);C||(s=s.toUpperCase()),e="0x"+s}else M?e="0b"+t.toString(2):L&&(e="0o"+t.toString(8));return c(t)?e+"n":e}return c(t)?y?JSON.stringify(Number(t)):t+"n":(t=>"[object Object]"==i.call(t))(t)?(E=[],e.wrap=!0,s(),n(t,((t,s)=>{k=!1,E.push((w?"":R)+m(t,e)+":"+(w?"":" ")+m(s,e))})),k?"{}":"{"+O+E.join(","+O)+O+(w?"":_)+"}"):y?JSON.stringify(t)||"null":String(t)}var I;const A=e.escapeEverything?p:f;return E=t.replace(A,((t,s,n,i,a,c)=>{if(s){if(e.minimal)return s;const t=s.charCodeAt(0),n=s.charCodeAt(1);return e.es6?"\\u{"+o(1024*(t-55296)+n-56320+65536,C)+"}":r(o(t,C))+r(o(n,C))}if(n)return r(o(n.charCodeAt(0),C));if("\0"==t&&!y&&!h.test(c.charAt(a+1)))return"\\0";if(i)return i==S||e.escapeEverything?"\\"+i:i;if(l.test(t))return u[t];if(e.minimal&&!d.test(t))return t;const p=o(t.charCodeAt(0),C);return y||p.length>2?r(p):"\\x"+("00"+p).slice(-2)})),"`"==S&&(E=E.replace(/\$\{/g,"\\${")),e.isScriptContext&&(E=E.replace(/<\/(script|style)/gi,"<\\/$1").replace(/<!--/g,y?"\\u003C!--":"\\x3C!--")),e.wrap&&(E=S+E+S),E};m.version="3.0.2",t.exports=m},2694:(t,e,s)=>{"use strict";var n=s(6925);function r(){}function o(){}o.resetWarningCache=r,t.exports=function(){function t(t,e,s,r,o,i){if(i!==n){var a=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw a.name="Invariant Violation",a}}function e(){return t}t.isRequired=t;var s={array:t,bigint:t,bool:t,func:t,number:t,object:t,string:t,symbol:t,any:t,arrayOf:e,element:t,elementType:t,instanceOf:e,node:t,objectOf:e,oneOf:e,oneOfType:e,shape:e,exact:e,checkPropTypes:o,resetWarningCache:r};return s.PropTypes=s,s}},5556:(t,e,s)=>{t.exports=s(2694)()},6925:t=>{"use strict";t.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},7573:(t,e,s)=>{"use strict";s.d(e,{A:()=>n});const n=function(t,e){}},8493:(t,e,s)=>{"use strict";var n=s(1609),r="function"==typeof Object.is?Object.is:function(t,e){return t===e&&(0!==t||1/t==1/e)||t!=t&&e!=e},o=n.useState,i=n.useEffect,a=n.useLayoutEffect,c=n.useDebugValue;function u(t){var e=t.getSnapshot;t=t.value;try{var s=e();return!r(t,s)}catch(t){return!0}}var l="undefined"==typeof window||void 0===window.document||void 0===window.document.createElement?function(t,e){return e()}:function(t,e){var s=e(),n=o({inst:{value:s,getSnapshot:e}}),r=n[0].inst,l=n[1];return a((function(){r.value=s,r.getSnapshot=e,u(r)&&l({inst:r})}),[t,s,e]),i((function(){return u(r)&&l({inst:r}),t((function(){u(r)&&l({inst:r})}))}),[t]),c(s),s};e.useSyncExternalStore=void 0!==n.useSyncExternalStore?n.useSyncExternalStore:l},2162:(t,e,s)=>{"use strict";var n=s(1609),r=s(9888),o="function"==typeof Object.is?Object.is:function(t,e){return t===e&&(0!==t||1/t==1/e)||t!=t&&e!=e},i=r.useSyncExternalStore,a=n.useRef,c=n.useEffect,u=n.useMemo,l=n.useDebugValue;e.useSyncExternalStoreWithSelector=function(t,e,s,n,r){var h=a(null);if(null===h.current){var d={hasValue:!1,value:null};h.current=d}else d=h.current;h=u((function(){function t(t){if(!c){if(c=!0,i=t,t=n(t),void 0!==r&&d.hasValue){var e=d.value;if(r(e,t))return a=e}return a=t}if(e=a,o(i,t))return e;var s=n(t);return void 0!==r&&r(e,s)?(i=t,e):(i=t,a=s)}var i,a,c=!1,u=void 0===s?null:s;return[function(){return t(e())},null===u?void 0:function(){return t(u())}]}),[e,s,n,r]);var p=i(t,h[0],h[1]);return c((function(){d.hasValue=!0,d.value=p}),[p]),l(p),p}},9888:(t,e,s)=>{"use strict";t.exports=s(8493)},9242:(t,e,s)=>{"use strict";t.exports=s(2162)},1609:t=>{"use strict";t.exports=window.React},5795:t=>{"use strict";t.exports=window.ReactDOM},790:t=>{"use strict";t.exports=window.ReactJSXRuntime},1455:t=>{"use strict";t.exports=window.wp.apiFetch},6087:t=>{"use strict";t.exports=window.wp.element},7723:t=>{"use strict";t.exports=window.wp.i18n},9658:(t,e,s)=>{"use strict";s.d(e,{m:()=>o});var n=s(6500),r=s(4880),o=new class extends n.Q{#t;#e;#s;constructor(){super(),this.#s=t=>{if(!r.S$&&window.addEventListener){const e=()=>t();return window.addEventListener("visibilitychange",e,!1),()=>{window.removeEventListener("visibilitychange",e)}}}}onSubscribe(){this.#e||this.setEventListener(this.#s)}onUnsubscribe(){this.hasListeners()||(this.#e?.(),this.#e=void 0)}setEventListener(t){this.#s=t,this.#e?.(),this.#e=t((t=>{"boolean"==typeof t?this.setFocused(t):this.onFocus()}))}setFocused(t){this.#t!==t&&(this.#t=t,this.onFocus())}onFocus(){const t=this.isFocused();this.listeners.forEach((e=>{e(t)}))}isFocused(){return"boolean"==typeof this.#t?this.#t:"hidden"!==globalThis.document?.visibilityState}}},6158:(t,e,s)=>{"use strict";s.d(e,{$:()=>a,s:()=>i});var n=s(6261),r=s(1692),o=s(8904),i=class extends r.k{#n;#r;#o;constructor(t){super(),this.mutationId=t.mutationId,this.#r=t.mutationCache,this.#n=[],this.state=t.state||{context:void 0,data:void 0,error:null,failureCount:0,failureReason:null,isPaused:!1,status:"idle",variables:void 0,submittedAt:0},this.setOptions(t.options),this.scheduleGc()}setOptions(t){this.options=t,this.updateGcTime(this.options.gcTime)}get meta(){return this.options.meta}addObserver(t){this.#n.includes(t)||(this.#n.push(t),this.clearGcTimeout(),this.#r.notify({type:"observerAdded",mutation:this,observer:t}))}removeObserver(t){this.#n=this.#n.filter((e=>e!==t)),this.scheduleGc(),this.#r.notify({type:"observerRemoved",mutation:this,observer:t})}optionalRemove(){this.#n.length||("pending"===this.state.status?this.scheduleGc():this.#r.remove(this))}continue(){return this.#o?.continue()??this.execute(this.state.variables)}async execute(t){this.#o=(0,o.II)({fn:()=>this.options.mutationFn?this.options.mutationFn(t):Promise.reject(new Error("No mutationFn found")),onFail:(t,e)=>{this.#i({type:"failed",failureCount:t,error:e})},onPause:()=>{this.#i({type:"pause"})},onContinue:()=>{this.#i({type:"continue"})},retry:this.options.retry??0,retryDelay:this.options.retryDelay,networkMode:this.options.networkMode,canRun:()=>this.#r.canRun(this)});const e="pending"===this.state.status,s=!this.#o.canStart();try{if(!e){this.#i({type:"pending",variables:t,isPaused:s}),await(this.#r.config.onMutate?.(t,this));const e=await(this.options.onMutate?.(t));e!==this.state.context&&this.#i({type:"pending",context:e,variables:t,isPaused:s})}const n=await this.#o.start();return await(this.#r.config.onSuccess?.(n,t,this.state.context,this)),await(this.options.onSuccess?.(n,t,this.state.context)),await(this.#r.config.onSettled?.(n,null,this.state.variables,this.state.context,this)),await(this.options.onSettled?.(n,null,t,this.state.context)),this.#i({type:"success",data:n}),n}catch(e){try{throw await(this.#r.config.onError?.(e,t,this.state.context,this)),await(this.options.onError?.(e,t,this.state.context)),await(this.#r.config.onSettled?.(void 0,e,this.state.variables,this.state.context,this)),await(this.options.onSettled?.(void 0,e,t,this.state.context)),e}finally{this.#i({type:"error",error:e})}}finally{this.#r.runNext(this)}}#i(t){this.state=(e=>{switch(t.type){case"failed":return{...e,failureCount:t.failureCount,failureReason:t.error};case"pause":return{...e,isPaused:!0};case"continue":return{...e,isPaused:!1};case"pending":return{...e,context:t.context,data:void 0,failureCount:0,failureReason:null,error:null,isPaused:t.isPaused,status:"pending",variables:t.variables,submittedAt:Date.now()};case"success":return{...e,data:t.data,failureCount:0,failureReason:null,error:null,status:"success",isPaused:!1};case"error":return{...e,data:void 0,error:t.error,failureCount:e.failureCount+1,failureReason:t.error,isPaused:!1,status:"error"}}})(this.state),n.j.batch((()=>{this.#n.forEach((e=>{e.onMutationUpdate(t)})),this.#r.notify({mutation:this,type:"updated",action:t})}))}};function a(){return{context:void 0,data:void 0,error:null,failureCount:0,failureReason:null,isPaused:!1,status:"idle",variables:void 0,submittedAt:0}}},6261:(t,e,s)=>{"use strict";s.d(e,{j:()=>n});var n=function(){let t=[],e=0,s=t=>{t()},n=t=>{t()},r=t=>setTimeout(t,0);const o=n=>{e?t.push(n):r((()=>{s(n)}))};return{batch:o=>{let i;e++;try{i=o()}finally{e--,e||(()=>{const e=t;t=[],e.length&&r((()=>{n((()=>{e.forEach((t=>{s(t)}))}))}))})()}return i},batchCalls:t=>(...e)=>{o((()=>{t(...e)}))},schedule:o,setNotifyFunction:t=>{s=t},setBatchNotifyFunction:t=>{n=t},setScheduler:t=>{r=t}}}()},6035:(t,e,s)=>{"use strict";s.d(e,{t:()=>o});var n=s(6500),r=s(4880),o=new class extends n.Q{#a=!0;#e;#s;constructor(){super(),this.#s=t=>{if(!r.S$&&window.addEventListener){const e=()=>t(!0),s=()=>t(!1);return window.addEventListener("online",e,!1),window.addEventListener("offline",s,!1),()=>{window.removeEventListener("online",e),window.removeEventListener("offline",s)}}}}onSubscribe(){this.#e||this.setEventListener(this.#s)}onUnsubscribe(){this.hasListeners()||(this.#e?.(),this.#e=void 0)}setEventListener(t){this.#s=t,this.#e?.(),this.#e=t(this.setOnline.bind(this))}setOnline(t){this.#a!==t&&(this.#a=t,this.listeners.forEach((e=>{e(t)})))}isOnline(){return this.#a}}},9757:(t,e,s)=>{"use strict";s.d(e,{X:()=>a,k:()=>c});var n=s(4880),r=s(6261),o=s(8904),i=s(1692),a=class extends i.k{#c;#u;#l;#h;#o;#d;#p;constructor(t){super(),this.#p=!1,this.#d=t.defaultOptions,this.setOptions(t.options),this.observers=[],this.#h=t.client,this.#l=this.#h.getQueryCache(),this.queryKey=t.queryKey,this.queryHash=t.queryHash,this.#c=function(t){const e="function"==typeof t.initialData?t.initialData():t.initialData,s=void 0!==e,n=s?"function"==typeof t.initialDataUpdatedAt?t.initialDataUpdatedAt():t.initialDataUpdatedAt:0;return{data:e,dataUpdateCount:0,dataUpdatedAt:s?n??Date.now():0,error:null,errorUpdateCount:0,errorUpdatedAt:0,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:null,isInvalidated:!1,status:s?"success":"pending",fetchStatus:"idle"}}(this.options),this.state=t.state??this.#c,this.scheduleGc()}get meta(){return this.options.meta}get promise(){return this.#o?.promise}setOptions(t){this.options={...this.#d,...t},this.updateGcTime(this.options.gcTime)}optionalRemove(){this.observers.length||"idle"!==this.state.fetchStatus||this.#l.remove(this)}setData(t,e){const s=(0,n.pl)(this.state.data,t,this.options);return this.#i({data:s,type:"success",dataUpdatedAt:e?.updatedAt,manual:e?.manual}),s}setState(t,e){this.#i({type:"setState",state:t,setStateOptions:e})}cancel(t){const e=this.#o?.promise;return this.#o?.cancel(t),e?e.then(n.lQ).catch(n.lQ):Promise.resolve()}destroy(){super.destroy(),this.cancel({silent:!0})}reset(){this.destroy(),this.setState(this.#c)}isActive(){return this.observers.some((t=>!1!==(0,n.Eh)(t.options.enabled,this)))}isDisabled(){return this.getObserversCount()>0?!this.isActive():this.options.queryFn===n.hT||this.state.dataUpdateCount+this.state.errorUpdateCount===0}isStale(){return!!this.state.isInvalidated||(this.getObserversCount()>0?this.observers.some((t=>t.getCurrentResult().isStale)):void 0===this.state.data)}isStaleByTime(t=0){return this.state.isInvalidated||void 0===this.state.data||!(0,n.j3)(this.state.dataUpdatedAt,t)}onFocus(){const t=this.observers.find((t=>t.shouldFetchOnWindowFocus()));t?.refetch({cancelRefetch:!1}),this.#o?.continue()}onOnline(){const t=this.observers.find((t=>t.shouldFetchOnReconnect()));t?.refetch({cancelRefetch:!1}),this.#o?.continue()}addObserver(t){this.observers.includes(t)||(this.observers.push(t),this.clearGcTimeout(),this.#l.notify({type:"observerAdded",query:this,observer:t}))}removeObserver(t){this.observers.includes(t)&&(this.observers=this.observers.filter((e=>e!==t)),this.observers.length||(this.#o&&(this.#p?this.#o.cancel({revert:!0}):this.#o.cancelRetry()),this.scheduleGc()),this.#l.notify({type:"observerRemoved",query:this,observer:t}))}getObserversCount(){return this.observers.length}invalidate(){this.state.isInvalidated||this.#i({type:"invalidate"})}fetch(t,e){if("idle"!==this.state.fetchStatus)if(void 0!==this.state.data&&e?.cancelRefetch)this.cancel({silent:!0});else if(this.#o)return this.#o.continueRetry(),this.#o.promise;if(t&&this.setOptions(t),!this.options.queryFn){const t=this.observers.find((t=>t.options.queryFn));t&&this.setOptions(t.options)}const s=new AbortController,r=t=>{Object.defineProperty(t,"signal",{enumerable:!0,get:()=>(this.#p=!0,s.signal)})},i={fetchOptions:e,options:this.options,queryKey:this.queryKey,client:this.#h,state:this.state,fetchFn:()=>{const t=(0,n.ZM)(this.options,e),s={client:this.#h,queryKey:this.queryKey,meta:this.meta};return r(s),this.#p=!1,this.options.persister?this.options.persister(t,s,this):t(s)}};r(i),this.options.behavior?.onFetch(i,this),this.#u=this.state,"idle"!==this.state.fetchStatus&&this.state.fetchMeta===i.fetchOptions?.meta||this.#i({type:"fetch",meta:i.fetchOptions?.meta});const a=t=>{(0,o.wm)(t)&&t.silent||this.#i({type:"error",error:t}),(0,o.wm)(t)||(this.#l.config.onError?.(t,this),this.#l.config.onSettled?.(this.state.data,t,this)),this.scheduleGc()};return this.#o=(0,o.II)({initialPromise:e?.initialPromise,fn:i.fetchFn,abort:s.abort.bind(s),onSuccess:t=>{if(void 0!==t){try{this.setData(t)}catch(t){return void a(t)}this.#l.config.onSuccess?.(t,this),this.#l.config.onSettled?.(t,this.state.error,this),this.scheduleGc()}else a(new Error(`${this.queryHash} data is undefined`))},onError:a,onFail:(t,e)=>{this.#i({type:"failed",failureCount:t,error:e})},onPause:()=>{this.#i({type:"pause"})},onContinue:()=>{this.#i({type:"continue"})},retry:i.options.retry,retryDelay:i.options.retryDelay,networkMode:i.options.networkMode,canRun:()=>!0}),this.#o.start()}#i(t){this.state=(e=>{switch(t.type){case"failed":return{...e,fetchFailureCount:t.failureCount,fetchFailureReason:t.error};case"pause":return{...e,fetchStatus:"paused"};case"continue":return{...e,fetchStatus:"fetching"};case"fetch":return{...e,...c(e.data,this.options),fetchMeta:t.meta??null};case"success":return{...e,data:t.data,dataUpdateCount:e.dataUpdateCount+1,dataUpdatedAt:t.dataUpdatedAt??Date.now(),error:null,isInvalidated:!1,status:"success",...!t.manual&&{fetchStatus:"idle",fetchFailureCount:0,fetchFailureReason:null}};case"error":const s=t.error;return(0,o.wm)(s)&&s.revert&&this.#u?{...this.#u,fetchStatus:"idle"}:{...e,error:s,errorUpdateCount:e.errorUpdateCount+1,errorUpdatedAt:Date.now(),fetchFailureCount:e.fetchFailureCount+1,fetchFailureReason:s,fetchStatus:"idle",status:"error"};case"invalidate":return{...e,isInvalidated:!0};case"setState":return{...e,...t.state}}})(this.state),r.j.batch((()=>{this.observers.forEach((t=>{t.onQueryUpdate()})),this.#l.notify({query:this,type:"updated",action:t})}))}};function c(t,e){return{fetchFailureCount:0,fetchFailureReason:null,fetchStatus:(0,o.v_)(e.networkMode)?"fetching":"paused",...void 0===t&&{error:null,status:"pending"}}}},1692:(t,e,s)=>{"use strict";s.d(e,{k:()=>r});var n=s(4880),r=class{#f;destroy(){this.clearGcTimeout()}scheduleGc(){this.clearGcTimeout(),(0,n.gn)(this.gcTime)&&(this.#f=setTimeout((()=>{this.optionalRemove()}),this.gcTime))}updateGcTime(t){this.gcTime=Math.max(this.gcTime||0,t??(n.S$?1/0:3e5))}clearGcTimeout(){this.#f&&(clearTimeout(this.#f),this.#f=void 0)}}},8904:(t,e,s)=>{"use strict";s.d(e,{II:()=>h,v_:()=>c,wm:()=>l});var n=s(9658),r=s(6035),o=s(4658),i=s(4880);function a(t){return Math.min(1e3*2**t,3e4)}function c(t){return"online"!==(t??"online")||r.t.isOnline()}var u=class extends Error{constructor(t){super("CancelledError"),this.revert=t?.revert,this.silent=t?.silent}};function l(t){return t instanceof u}function h(t){let e,s=!1,l=0,h=!1;const d=(0,o.T)(),p=()=>n.m.isFocused()&&("always"===t.networkMode||r.t.isOnline())&&t.canRun(),f=()=>c(t.networkMode)&&t.canRun(),m=s=>{h||(h=!0,t.onSuccess?.(s),e?.(),d.resolve(s))},v=s=>{h||(h=!0,t.onError?.(s),e?.(),d.reject(s))},y=()=>new Promise((s=>{e=t=>{(h||p())&&s(t)},t.onPause?.()})).then((()=>{e=void 0,h||t.onContinue?.()})),g=()=>{if(h)return;let e;const n=0===l?t.initialPromise:void 0;try{e=n??t.fn()}catch(t){e=Promise.reject(t)}Promise.resolve(e).then(m).catch((e=>{if(h)return;const n=t.retry??(i.S$?0:3),r=t.retryDelay??a,o="function"==typeof r?r(l,e):r,c=!0===n||"number"==typeof n&&l<n||"function"==typeof n&&n(l,e);!s&&c?(l++,t.onFail?.(l,e),(0,i.yy)(o).then((()=>p()?void 0:y())).then((()=>{s?v(e):g()}))):v(e)}))};return{promise:d,cancel:e=>{h||(v(new u(e)),t.abort?.())},continue:()=>(e?.(),d),cancelRetry:()=>{s=!0},continueRetry:()=>{s=!1},canStart:f,start:()=>(f()?g():y().then(g),d)}}},6500:(t,e,s)=>{"use strict";s.d(e,{Q:()=>n});var n=class{constructor(){this.listeners=new Set,this.subscribe=this.subscribe.bind(this)}subscribe(t){return this.listeners.add(t),this.onSubscribe(),()=>{this.listeners.delete(t),this.onUnsubscribe()}}hasListeners(){return this.listeners.size>0}onSubscribe(){}onUnsubscribe(){}}},4658:(t,e,s)=>{"use strict";function n(){let t,e;const s=new Promise(((s,n)=>{t=s,e=n}));function n(t){Object.assign(s,t),delete s.resolve,delete s.reject}return s.status="pending",s.catch((()=>{})),s.resolve=e=>{n({status:"fulfilled",value:e}),t(e)},s.reject=t=>{n({status:"rejected",reason:t}),e(t)},s}s.d(e,{T:()=>n})},4880:(t,e,s)=>{"use strict";s.d(e,{Cp:()=>f,EN:()=>p,Eh:()=>u,F$:()=>d,MK:()=>l,S$:()=>n,ZM:()=>P,ZZ:()=>R,Zw:()=>o,d2:()=>c,f8:()=>v,gn:()=>i,hT:()=>_,j3:()=>a,lQ:()=>r,nJ:()=>h,pl:()=>w,y9:()=>C,yy:()=>S});var n="undefined"==typeof window||"Deno"in globalThis;function r(){}function o(t,e){return"function"==typeof t?t(e):t}function i(t){return"number"==typeof t&&t>=0&&t!==1/0}function a(t,e){return Math.max(t+(e||0)-Date.now(),0)}function c(t,e){return"function"==typeof t?t(e):t}function u(t,e){return"function"==typeof t?t(e):t}function l(t,e){const{type:s="all",exact:n,fetchStatus:r,predicate:o,queryKey:i,stale:a}=t;if(i)if(n){if(e.queryHash!==d(i,e.options))return!1}else if(!f(e.queryKey,i))return!1;if("all"!==s){const t=e.isActive();if("active"===s&&!t)return!1;if("inactive"===s&&t)return!1}return!("boolean"==typeof a&&e.isStale()!==a||r&&r!==e.state.fetchStatus||o&&!o(e))}function h(t,e){const{exact:s,status:n,predicate:r,mutationKey:o}=t;if(o){if(!e.options.mutationKey)return!1;if(s){if(p(e.options.mutationKey)!==p(o))return!1}else if(!f(e.options.mutationKey,o))return!1}return!(n&&e.state.status!==n||r&&!r(e))}function d(t,e){return(e?.queryKeyHashFn||p)(t)}function p(t){return JSON.stringify(t,((t,e)=>g(e)?Object.keys(e).sort().reduce(((t,s)=>(t[s]=e[s],t)),{}):e))}function f(t,e){return t===e||typeof t==typeof e&&!(!t||!e||"object"!=typeof t||"object"!=typeof e)&&!Object.keys(e).some((s=>!f(t[s],e[s])))}function m(t,e){if(t===e)return t;const s=y(t)&&y(e);if(s||g(t)&&g(e)){const n=s?t:Object.keys(t),r=n.length,o=s?e:Object.keys(e),i=o.length,a=s?[]:{};let c=0;for(let r=0;r<i;r++){const i=s?r:o[r];(!s&&n.includes(i)||s)&&void 0===t[i]&&void 0===e[i]?(a[i]=void 0,c++):(a[i]=m(t[i],e[i]),a[i]===t[i]&&void 0!==t[i]&&c++)}return r===i&&c===r?t:a}return e}function v(t,e){if(!e||Object.keys(t).length!==Object.keys(e).length)return!1;for(const s in t)if(t[s]!==e[s])return!1;return!0}function y(t){return Array.isArray(t)&&t.length===Object.keys(t).length}function g(t){if(!b(t))return!1;const e=t.constructor;if(void 0===e)return!0;const s=e.prototype;return!!b(s)&&!!s.hasOwnProperty("isPrototypeOf")&&Object.getPrototypeOf(t)===Object.prototype}function b(t){return"[object Object]"===Object.prototype.toString.call(t)}function S(t){return new Promise((e=>{setTimeout(e,t)}))}function w(t,e,s){return"function"==typeof s.structuralSharing?s.structuralSharing(t,e):!1!==s.structuralSharing?m(t,e):e}function C(t,e,s=0){const n=[...t,e];return s&&n.length>s?n.slice(1):n}function R(t,e,s=0){const n=[e,...t];return s&&n.length>s?n.slice(0,-1):n}var _=Symbol();function P(t,e){return!t.queryFn&&e?.initialPromise?()=>e.initialPromise:t.queryFn&&t.queryFn!==_?t.queryFn:()=>Promise.reject(new Error(`Missing queryFn: '${t.queryHash}'`))}},7665:(t,e,s)=>{"use strict";s.d(e,{Ht:()=>a,jE:()=>i});var n=s(1609),r=s(790),o=n.createContext(void 0),i=t=>{const e=n.useContext(o);if(t)return t;if(!e)throw new Error("No QueryClient set, use QueryClientProvider to set one");return e},a=({client:t,children:e})=>(n.useEffect((()=>(t.mount(),()=>{t.unmount()})),[t]),(0,r.jsx)(o.Provider,{value:t,children:e}))},2927:(t,e,s)=>{"use strict";s.d(e,{A:()=>a,g:()=>o});var n=s(790),r=s(1609);function o(t){const e=t.errorComponent??a;return(0,n.jsx)(i,{getResetKey:t.getResetKey,onCatch:t.onCatch,children:({error:s,reset:n})=>s?r.createElement(e,{error:s,reset:n}):t.children})}class i extends r.Component{constructor(){super(...arguments),this.state={error:null}}static getDerivedStateFromProps(t){return{resetKey:t.getResetKey()}}static getDerivedStateFromError(t){return{error:t}}reset(){this.setState({error:null})}componentDidUpdate(t,e){e.error&&e.resetKey!==this.state.resetKey&&this.reset()}componentDidCatch(t,e){this.props.onCatch&&this.props.onCatch(t,e)}render(){return this.props.children({error:this.state.resetKey!==this.props.getResetKey()?null:this.state.error,reset:()=>{this.reset()}})}}function a({error:t}){const[e,s]=r.useState(!1);return(0,n.jsxs)("div",{style:{padding:".5rem",maxWidth:"100%"},children:[(0,n.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:".5rem"},children:[(0,n.jsx)("strong",{style:{fontSize:"1rem"},children:"Something went wrong!"}),(0,n.jsx)("button",{style:{appearance:"none",fontSize:".6em",border:"1px solid currentColor",padding:".1rem .2rem",fontWeight:"bold",borderRadius:".25rem"},onClick:()=>s((t=>!t)),children:e?"Hide Error":"Show Error"})]}),(0,n.jsx)("div",{style:{height:".25rem"}}),e?(0,n.jsx)("div",{children:(0,n.jsx)("pre",{style:{fontSize:".7em",border:"1px solid red",borderRadius:".25rem",padding:".3rem",color:"red",overflow:"auto"},children:t.message?(0,n.jsx)("code",{children:t.message}):null})}):null]})}},1245:(t,e,s)=>{"use strict";s.d(e,{YG:()=>b,sv:()=>C});var n=s(790),r=s(1609),o=s(1561),i=s(7573),a=s(7264),c=s(37),u=s(9239),l=s(2927),h=s(8332),d=s(396),p=s(6946),f=s(1459),m=s(6712),v=s(8541);function y(t,e,s){return e.options.notFoundComponent?(0,n.jsx)(e.options.notFoundComponent,{data:s}):t.options.defaultNotFoundComponent?(0,n.jsx)(t.options.defaultNotFoundComponent,{data:s}):(0,n.jsx)(p.A2,{})}var g=s(1259);const b=r.memo((function({matchId:t}){var e,s;const c=(0,d.r)(),u=(0,h.k)({select:e=>{var s;return null==(s=e.matches.find((e=>e.id===t)))?void 0:s.routeId}});(0,o.A)(u,`Could not find routeId for matchId "${t}". Please file an issue!`);const f=c.routesById[u],y=f.options.pendingComponent??c.options.defaultPendingComponent,b=y?(0,n.jsx)(y,{}):null,C=f.options.errorComponent??c.options.defaultErrorComponent,R=f.options.onCatch??c.options.defaultOnCatch,_=f.isRoot?f.options.notFoundComponent??(null==(e=c.options.notFoundRoute)?void 0:e.options.component):f.options.notFoundComponent,P=f.isRoot&&!f.options.wrapInSuspense||!(f.options.wrapInSuspense??y??(null==(s=f.options.errorComponent)?void 0:s.preload))?v._:r.Suspense,x=C?l.g:v._,O=_?p.PA:v._,E=(0,h.k)({select:t=>t.loadedAt}),k=(0,h.k)({select:e=>{var s;const n=e.matches.findIndex((e=>e.id===t));return null==(s=e.matches[n-1])?void 0:s.routeId}});return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(m.$.Provider,{value:t,children:(0,n.jsx)(P,{fallback:b,children:(0,n.jsx)(x,{getResetKey:()=>E,errorComponent:C||l.A,onCatch:(e,s)=>{if((0,p.c4)(e))throw e;(0,i.A)(!1,`Error in route match: ${t}`),null==R||R(e,s)},children:(0,n.jsx)(O,{fallback:t=>{if(!_||t.routeId&&t.routeId!==u||!t.routeId&&!f.isRoot)throw t;return r.createElement(_,t)},children:(0,n.jsx)(w,{matchId:t})})})})}),k===a.n?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(S,{}),(0,n.jsx)(g.OA,{})]}):null]})}));function S(){var t;const e=(0,d.r)(),s=r.useRef(void 0);return(0,n.jsx)("script",{suppressHydrationWarning:!0,ref:t=>{t?e.emit({type:"onRendered",...(0,c.C)(e.state)}):s.current=e.state.resolvedLocation}},null==(t=e.state.resolvedLocation)?void 0:t.state.key)}const w=r.memo((function({matchId:t}){var e,s,i;const a=(0,d.r)(),{match:c,key:m,routeId:v}=(0,h.k)({select:e=>{const s=e.matches.findIndex((e=>e.id===t)),n=e.matches[s],r=n.routeId,o=a.routesById[r].options.remountDeps??a.options.defaultRemountDeps,i=null==o?void 0:o({routeId:r,loaderDeps:n.loaderDeps,params:n._strictParams,search:n._strictSearch});return{key:i?JSON.stringify(i):void 0,routeId:r,match:(0,u.Up)(n,["id","status","error"])}},structuralSharing:!0}),g=a.routesById[v],b=r.useMemo((()=>{const t=g.options.component??a.options.defaultComponent;return t?(0,n.jsx)(t,{},m):(0,n.jsx)(C,{})}),[m,g.options.component,a.options.defaultComponent]),S=(g.options.errorComponent??a.options.defaultErrorComponent)||l.A;if("notFound"===c.status)return(0,o.A)((0,p.c4)(c.error),"Expected a notFound error"),y(a,g,c.error);if("redirected"===c.status)throw(0,o.A)((0,f.N6)(c.error),"Expected a redirect error"),null==(e=a.getMatch(c.id))?void 0:e.loadPromise;if("error"===c.status){if(a.isServer)return(0,n.jsx)(S,{error:c.error,reset:void 0,info:{componentStack:""}});throw c.error}if("pending"===c.status){const t=g.options.pendingMinMs??a.options.defaultPendingMinMs;if(t&&!(null==(s=a.getMatch(c.id))?void 0:s.minPendingPromise)&&!a.isServer){const e=(0,u.Su)();Promise.resolve().then((()=>{a.updateMatch(c.id,(t=>({...t,minPendingPromise:e})))})),setTimeout((()=>{e.resolve(),a.updateMatch(c.id,(t=>({...t,minPendingPromise:void 0})))}),t)}throw null==(i=a.getMatch(c.id))?void 0:i.loadPromise}return b})),C=r.memo((function(){const t=(0,d.r)(),e=r.useContext(m.$),s=(0,h.k)({select:t=>{var s;return null==(s=t.matches.find((t=>t.id===e)))?void 0:s.routeId}}),i=t.routesById[s],c=(0,h.k)({select:t=>{const s=t.matches.find((t=>t.id===e));return(0,o.A)(s,`Could not find parent match for matchId "${e}"`),s.globalNotFound}}),u=(0,h.k)({select:t=>{var s;const n=t.matches,r=n.findIndex((t=>t.id===e));return null==(s=n[r+1])?void 0:s.id}});if(c)return y(t,i,void 0);if(!u)return null;const l=(0,n.jsx)(b,{matchId:u}),p=t.options.defaultPendingComponent?(0,n.jsx)(t.options.defaultPendingComponent,{}):null;return e===a.n?(0,n.jsx)(r.Suspense,{fallback:p,children:l}):l}))},8541:(t,e,s)=>{"use strict";s.d(e,{_:()=>r});var n=s(790);function r(t){return(0,n.jsx)(n.Fragment,{children:t.children})}},6037:(t,e,s)=>{"use strict";s.d(e,{WK:()=>h,uV:()=>f});var n=s(7573),r=s(1843),o=s(4396),i=s(584),a=s(5698),c=s(8081),u=s(835),l=s(2166);function h(t){return new d(t,{silent:!0}).createRoute}class d{constructor(t,e){this.path=t,this.createRoute=t=>{(0,n.A)(this.silent,"FileRoute is deprecated and will be removed in the next major version. Use the createFileRoute(path)(options) function instead.");const e=(0,r.un)(t);return e.isRoot=!1,e},this.silent=null==e?void 0:e.silent}}class p{constructor(t){this.useMatch=t=>(0,o.R)({select:null==t?void 0:t.select,from:this.options.id,structuralSharing:null==t?void 0:t.structuralSharing}),this.useRouteContext=t=>(0,o.R)({from:this.options.id,select:e=>(null==t?void 0:t.select)?t.select(e.context):e.context}),this.useSearch=t=>(0,c.S)({select:null==t?void 0:t.select,structuralSharing:null==t?void 0:t.structuralSharing,from:this.options.id}),this.useParams=t=>(0,u.g)({select:null==t?void 0:t.select,structuralSharing:null==t?void 0:t.structuralSharing,from:this.options.id}),this.useLoaderDeps=t=>(0,i.x)({...t,from:this.options.id}),this.useLoaderData=t=>(0,a.L)({...t,from:this.options.id}),this.useNavigate=()=>(0,l.Z)({from:this.options.id}),this.options=t,this.$$typeof=Symbol.for("react.memo")}}function f(t){return e=>new p({id:t,...e})}},6712:(t,e,s)=>{"use strict";s.d(e,{$:()=>r,n:()=>o});var n=s(1609);const r=n.createContext(void 0),o=n.createContext(void 0)},6946:(t,e,s)=>{"use strict";s.d(e,{A2:()=>c,PA:()=>a,c4:()=>i});var n=s(790),r=s(2927),o=s(8332);function i(t){return!!(null==t?void 0:t.isNotFound)}function a(t){const e=(0,o.k)({select:t=>`not-found-${t.location.pathname}-${t.status}`});return(0,n.jsx)(r.g,{getResetKey:()=>e,onCatch:(e,s)=>{var n;if(!i(e))throw e;null==(n=t.onCatch)||n.call(t,e,s)},errorComponent:({error:e})=>{var s;if(i(e))return null==(s=t.fallback)?void 0:s.call(t,e);throw e},children:t.children})}function c(){return(0,n.jsx)("p",{children:"Not Found"})}},1459:(t,e,s)=>{"use strict";function n(t){return!!(null==t?void 0:t.isRedirect)}function r(t){return!!(null==t?void 0:t.isRedirect)&&t.href}s.d(e,{N6:()=>n,PN:()=>r})},1843:(t,e,s)=>{"use strict";s.d(e,{gI:()=>m,l7:()=>v,un:()=>p});var n=s(1561),r=s(7264),o=s(6847),i=s(5698),a=s(584),c=s(835),u=s(8081),l=s(2166),h=s(4396);class d{constructor(t){this.init=t=>{var e,s;this.originalIndex=t.originalIndex;const i=this.options,a=!(null==i?void 0:i.path)&&!(null==i?void 0:i.id);this.parentRoute=null==(s=(e=this.options).getParentRoute)?void 0:s.call(e),a?this._path=r.n:(0,n.A)(this.parentRoute,"Child Route instances must pass a 'getParentRoute: () => ParentRoute' option that returns a Route instance.");let c=a?r.n:i.path;c&&"/"!==c&&(c=(0,o.p1)(c));const u=(null==i?void 0:i.id)||c;let l=a?r.n:(0,o.HS)([this.parentRoute.id===r.n?"":this.parentRoute.id,u]);c===r.n&&(c="/"),l!==r.n&&(l=(0,o.HS)(["/",l]));const h=l===r.n?"/":(0,o.HS)([this.parentRoute.fullPath,c]);this._path=c,this._id=l,this._fullPath=h,this._to=h,this._ssr=(null==i?void 0:i.ssr)??t.defaultSsr??!0},this.updateLoader=t=>(Object.assign(this.options,t),this),this.update=t=>(Object.assign(this.options,t),this),this.lazy=t=>(this.lazyFn=t,this),this.useMatch=t=>(0,h.R)({select:null==t?void 0:t.select,from:this.id,structuralSharing:null==t?void 0:t.structuralSharing}),this.useRouteContext=t=>(0,h.R)({...t,from:this.id,select:e=>(null==t?void 0:t.select)?t.select(e.context):e.context}),this.useSearch=t=>(0,u.S)({select:null==t?void 0:t.select,structuralSharing:null==t?void 0:t.structuralSharing,from:this.id}),this.useParams=t=>(0,c.g)({select:null==t?void 0:t.select,structuralSharing:null==t?void 0:t.structuralSharing,from:this.id}),this.useLoaderDeps=t=>(0,a.x)({...t,from:this.id}),this.useLoaderData=t=>(0,i.L)({...t,from:this.id}),this.useNavigate=()=>(0,l.Z)({from:this.id}),this.options=t||{},this.isRoot=!(null==t?void 0:t.getParentRoute),(0,n.A)(!((null==t?void 0:t.id)&&(null==t?void 0:t.path)),"Route cannot have both an 'id' and a 'path' option."),this.$$typeof=Symbol.for("react.memo")}get to(){return this._to}get id(){return this._id}get path(){return this._path}get fullPath(){return this._fullPath}get ssr(){return this._ssr}addChildren(t){return this._addFileChildren(t)}_addFileChildren(t){return Array.isArray(t)&&(this.children=t),"object"==typeof t&&null!==t&&(this.children=Object.values(t)),this}}function p(t){return new d(t)}class f extends d{constructor(t){super(t)}addChildren(t){return super.addChildren(t),this}_addFileChildren(t){return super._addFileChildren(t),this}_addFileTypes(){return this}}function m(t){return new f(t)}class v extends d{constructor(t){super({...t,id:"404"})}}},414:(t,e,s)=>{"use strict";s.d(e,{H:()=>r});const n=s(1609).createContext(null);function r(){return"undefined"==typeof document?n:window.__TSR_ROUTER_CONTEXT__?window.__TSR_ROUTER_CONTEXT__:(window.__TSR_ROUTER_CONTEXT__=n,n)}},1259:(t,e,s)=>{"use strict";s.d(e,{OA:()=>m,j1:()=>f});var n=s(790),r=s(9239),o=s(396);function i({children:t,log:e}){return"undefined"!=typeof document?null:(0,n.jsx)("script",{className:"tsr-once",dangerouslySetInnerHTML:{__html:[t,"",'if (typeof __TSR_SSR__ !== "undefined") __TSR_SSR__.cleanScripts()'].filter(Boolean).join("\n")}})}s(7159);const a="tsr-scroll-restoration-v1_3",c="undefined"!=typeof window&&window.sessionStorage,u=(t,e)=>{let s;return(...n)=>{s||(s=setTimeout((()=>{t(...n),s=null}),e))}},l=c?{state:JSON.parse(window.sessionStorage.getItem(a)||"null")||{},set:t=>(l.state=(0,r.Zw)(t,l.state)||l.state,window.sessionStorage.setItem(a,JSON.stringify(l.state)))}:void 0,h=t=>t.state.key||t.href;let d=!1;function p(t,e,s,n){var r;let o;try{o=JSON.parse(sessionStorage.getItem(t)||"{}")}catch(t){return void console.error(t)}const i=o[e||(null==(r=window.history.state)?void 0:r.key)];d=!0,(()=>{if(n&&i){for(const t in i){const e=i[t];if("window"===t)window.scrollTo({top:e.scrollY,left:e.scrollX,behavior:s});else if(t){const s=document.querySelector(t);s&&(s.scrollLeft=e.scrollX,s.scrollTop=e.scrollY)}}return}const t=window.location.hash.split("#")[1];if(t){const e=(window.history.state||{}).__hashScrollIntoViewOptions??!0;if(e){const s=document.getElementById(t);s&&s.scrollIntoView(e)}}else window.scrollTo({top:0,left:0,behavior:s})})(),d=!1}function f(t,e){if((e??t.options.scrollRestoration??!1)&&(t.isScrollRestoring=!0),"undefined"==typeof document||t.isScrollRestorationSetup)return;t.isScrollRestorationSetup=!0,d=!1;const s=t.options.getScrollRestorationKey||h;window.history.scrollRestoration="manual";"undefined"!=typeof document&&document.addEventListener("scroll",u((e=>{if(d||!t.isScrollRestoring)return;let n="";if(e.target===document||e.target===window)n="window";else{const t=e.target.getAttribute("data-scroll-restoration-id");n=t?`[data-scroll-restoration-id="${t}"]`:function(t){const e=[];let s;for(;s=t.parentNode;)e.unshift(`${t.tagName}:nth-child(${[].indexOf.call(s.children,t)+1})`),t=s;return`${e.join(" > ")}`.toLowerCase()}(e.target)}const r=s(t.state.location);l.set((t=>{const e=t[r]=t[r]||{},s=e[n]=e[n]||{};if("window"===n)s.scrollX=window.scrollX||0,s.scrollY=window.scrollY||0;else if(n){const t=document.querySelector(n);t&&(s.scrollX=t.scrollLeft||0,s.scrollY=t.scrollTop||0)}return t}))}),100),!0),t.subscribe("onRendered",(e=>{const n=s(e.toLocation);t.resetNextScroll?(p(a,n,t.options.scrollRestorationBehavior,t.isScrollRestoring),t.isScrollRestoring&&l.set((t=>(t[n]=t[n]||{},t)))):t.resetNextScroll=!0}))}function m(){const t=(0,o.r)(),e=(t.options.getScrollRestorationKey||h)(t.latestLocation),s=e!==h(t.latestLocation)?e:null;return t.isScrollRestoring&&t.isServer?(0,n.jsx)(i,{children:`(${p.toString()})(${JSON.stringify(a)},${JSON.stringify(s)}, undefined, true)`,log:!1}):null}},5698:(t,e,s)=>{"use strict";s.d(e,{L:()=>r});var n=s(4396);function r(t){return(0,n.R)({from:t.from,strict:t.strict,structuralSharing:t.structuralSharing,select:e=>t.select?t.select(e.loaderData):e.loaderData})}},584:(t,e,s)=>{"use strict";s.d(e,{x:()=>r});var n=s(4396);function r(t){const{select:e,...s}=t;return(0,n.R)({...s,select:t=>e?e(t.loaderDeps):t.loaderDeps})}},4396:(t,e,s)=>{"use strict";s.d(e,{R:()=>a});var n=s(1609),r=s(1561),o=s(8332),i=s(6712);function a(t){const e=n.useContext(t.from?i.n:i.$);return(0,o.k)({select:s=>{const n=s.matches.find((s=>t.from?t.from===s.routeId:s.id===e));if((0,r.A)(!((t.shouldThrow??1)&&!n),"Could not find "+(t.from?`an active match from "${t.from}"`:"a nearest match!")),void 0!==n)return t.select?t.select(n):n},structuralSharing:t.structuralSharing})}},2166:(t,e,s)=>{"use strict";s.d(e,{Z:()=>o});var n=s(1609),r=s(396);function o(t){const{navigate:e}=(0,r.r)();return n.useCallback((t=>e({...t})),[e])}},835:(t,e,s)=>{"use strict";s.d(e,{g:()=>r});var n=s(4396);function r(t){return(0,n.R)({from:t.from,strict:t.strict,structuralSharing:t.structuralSharing,select:e=>t.select?t.select(e.params):e.params})}},396:(t,e,s)=>{"use strict";s.d(e,{r:()=>i});var n=s(1609),r=s(7573),o=s(414);function i(t){const e=n.useContext((0,o.H)());return(0,r.A)(!(((null==t?void 0:t.warn)??1)&&!e),"useRouter must be used inside a <RouterProvider> component!"),e}},8332:(t,e,s)=>{"use strict";s.d(e,{k:()=>c});var n=s(9242);function r(t,e){if(Object.is(t,e))return!0;if("object"!=typeof t||null===t||"object"!=typeof e||null===e)return!1;if(t instanceof Map&&e instanceof Map){if(t.size!==e.size)return!1;for(const[s,n]of t)if(!e.has(s)||!Object.is(n,e.get(s)))return!1;return!0}if(t instanceof Set&&e instanceof Set){if(t.size!==e.size)return!1;for(const s of t)if(!e.has(s))return!1;return!0}const s=Object.keys(t);if(s.length!==Object.keys(e).length)return!1;for(let n=0;n<s.length;n++)if(!Object.prototype.hasOwnProperty.call(e,s[n])||!Object.is(t[s[n]],e[s[n]]))return!1;return!0}var o=s(1609),i=s(9239),a=s(396);function c(t){const e=(0,a.r)({warn:void 0===(null==t?void 0:t.router)}),s=(null==t?void 0:t.router)||e,c=(0,o.useRef)(void 0);return function(t,e=t=>t){return(0,n.useSyncExternalStoreWithSelector)(t.subscribe,(()=>t.state),(()=>t.state),e,r)}(s.__store,(e=>{if(null==t?void 0:t.select){if(t.structuralSharing??s.options.defaultStructuralSharing){const s=(0,i.BH)(c.current,t.select(e));return c.current=s,s}return t.select(e)}return e}))}},8081:(t,e,s)=>{"use strict";s.d(e,{S:()=>r});var n=s(4396);function r(t){return(0,n.R)({from:t.from,strict:t.strict,structuralSharing:t.structuralSharing,select:e=>t.select?t.select(e.search):e.search})}},3655:(t,e,s)=>{"use strict";s.d(e,{BL:()=>i,N:()=>a,Nf:()=>r,ZC:()=>o});var n=s(1609);const r="undefined"!=typeof window?n.useLayoutEffect:n.useEffect;function o(t){const e=n.useRef({value:t,prev:null}),s=e.current.value;return t!==s&&(e.current={value:t,prev:s}),e.current.prev}function i(t,e,s={},r={}){const o=n.useRef("function"==typeof IntersectionObserver),i=n.useRef(null);return n.useEffect((()=>{if(t.current&&o.current&&!r.disabled)return i.current=new IntersectionObserver((([t])=>{e(t)}),s),i.current.observe(t.current),()=>{var t;null==(t=i.current)||t.disconnect()}}),[e,s,r.disabled,t]),i.current}function a(t){const e=n.useRef(null);return n.useEffect((()=>{t&&("function"==typeof t?t(e.current):t.current=e.current)})),e}},6847:(t,e,s)=>{"use strict";s.d(e,{HS:()=>r,UC:()=>u,WN:()=>f,cg:()=>c,gx:()=>a,kX:()=>d,l$:()=>l,o1:()=>h,p1:()=>i,ts:()=>o,xv:()=>p});var n=s(9239);function r(t){return o(t.filter((t=>void 0!==t)).join("/"))}function o(t){return t.replace(/\/{2,}/g,"/")}function i(t){return"/"===t?t:t.replace(/^\/{1,}/,"")}function a(t){return"/"===t?t:t.replace(/\/{1,}$/,"")}function c(t){return a(i(t))}function u(t,e){return t.endsWith("/")&&"/"!==t&&t!==`${e}/`?t.slice(0,-1):t}function l(t,e,s){return u(t,s)===u(e,s)}function h({basepath:t,base:e,to:s,trailingSlash:i="never",caseSensitive:a}){var c,u;e=m(t,e,a),s=m(t,s,a);let l=d(e);const h=d(s);return l.length>1&&"/"===(null==(c=(0,n.HV)(l))?void 0:c.value)&&l.pop(),h.forEach(((t,e)=>{"/"===t.value?e?e===h.length-1&&l.push(t):l=[t]:".."===t.value?l.pop():"."===t.value||l.push(t)})),l.length>1&&("/"===(null==(u=(0,n.HV)(l))?void 0:u.value)?"never"===i&&l.pop():"always"===i&&l.push({type:"pathname",value:"/"})),o(r([t,...l.map((t=>t.value))]))}function d(t){if(!t)return[];const e=[];if("/"===(t=o(t)).slice(0,1)&&(t=t.substring(1),e.push({type:"pathname",value:"/"})),!t)return e;const s=t.split("/").filter(Boolean);return e.push(...s.map((t=>"$"===t||"*"===t?{type:"wildcard",value:t}:"$"===t.charAt(0)?{type:"param",value:t}:{type:"pathname",value:decodeURI(t)}))),"/"===t.slice(-1)&&(t=t.substring(1),e.push({type:"pathname",value:"/"})),e}function p({path:t,params:e,leaveWildcards:s,leaveParams:n,decodeCharMap:o}){const i=d(t);function a(t){const s=e[t],n="string"==typeof s;return["*","_splat"].includes(t)?n?encodeURI(s):s:n?function(t,e){let s=encodeURIComponent(t);if(e)for(const[t,n]of e)s=s.replaceAll(t,n);return s}(s,o):s}const c={},u=r(i.map((t=>{if("wildcard"===t.type){c._splat=e._splat;const n=a("_splat");return s?`${t.value}${n??""}`:n}if("param"===t.type){const s=t.value.substring(1);if(c[s]=e[s],n){const e=a(t.value);return`${t.value}${e??""}`}return a(s)??"undefined"}return t.value})));return{usedParams:c,interpolatedPath:u}}function f(t,e,s){const n=function(t,e,s){if("/"!==t&&!e.startsWith(t))return;e=m(t,e,s.caseSensitive);const n=m(t,`${s.to??"$"}`,s.caseSensitive),o=d(e),i=d(n);e.startsWith("/")||o.unshift({type:"pathname",value:"/"}),n.startsWith("/")||i.unshift({type:"pathname",value:"/"});const a={};return(()=>{for(let t=0;t<Math.max(o.length,i.length);t++){const e=o[t],n=i[t],c=t>=o.length-1,u=t>=i.length-1;if(n){if("wildcard"===n.type){const e=decodeURI(r(o.slice(t).map((t=>t.value))));return a["*"]=e,a._splat=e,!0}if("pathname"===n.type){if("/"===n.value&&!(null==e?void 0:e.value))return!0;if(e)if(s.caseSensitive){if(n.value!==e.value)return!1}else if(n.value.toLowerCase()!==e.value.toLowerCase())return!1}if(!e)return!1;if("param"===n.type){if("/"===e.value)return!1;"$"!==e.value.charAt(0)&&(a[n.value.substring(1)]=decodeURIComponent(e.value))}}if(!c&&u)return a["**"]=r(o.slice(t+1).map((t=>t.value))),!!s.fuzzy&&"/"!==(null==n?void 0:n.value)}return!0})()?a:void 0}(t,e,s);if(!s.to||n)return n??{}}function m(t,e,s=!1){const n=s?t:t.toLowerCase(),r=s?e:e.toLowerCase();switch(!0){case"/"===n:return e;case r===n:return"";case e.length<t.length:case"/"!==r[n.length]:return e;case r.startsWith(n):return e.slice(t.length);default:return e}}},7264:(t,e,s)=>{"use strict";s.d(e,{n:()=>n});const n="__root__"},37:(t,e,s)=>{"use strict";function n(t){const e=t.resolvedLocation,s=t.location;return{fromLocation:e,toLocation:s,pathChanged:(null==e?void 0:e.pathname)!==s.pathname,hrefChanged:(null==e?void 0:e.href)!==s.href,hashChanged:(null==e?void 0:e.hash)!==s.hash}}s.d(e,{C:()=>n})},9239:(t,e,s)=>{"use strict";function n(t){return t[t.length-1]}function r(t,e){return"function"==typeof t?t(e):t}function o(t,e){return e.reduce(((e,s)=>(e[s]=t[s],e)),{})}function i(t,e){if(t===e)return t;const s=e,n=u(t)&&u(s);if(n||a(t)&&a(s)){const e=n?t:Object.keys(t),r=e.length,o=n?s:Object.keys(s),a=o.length,c=n?[]:{};let u=0;for(let r=0;r<a;r++){const a=n?r:o[r];(!n&&e.includes(a)||n)&&void 0===t[a]&&void 0===s[a]?(c[a]=void 0,u++):(c[a]=i(t[a],s[a]),c[a]===t[a]&&void 0!==t[a]&&u++)}return r===a&&u===r?t:c}return s}function a(t){if(!c(t))return!1;const e=t.constructor;if(void 0===e)return!0;const s=e.prototype;return!!c(s)&&!!s.hasOwnProperty("isPrototypeOf")}function c(t){return"[object Object]"===Object.prototype.toString.call(t)}function u(t){return Array.isArray(t)&&t.length===Object.keys(t).length}function l(t,e){let s=Object.keys(t);return e&&(s=s.filter((e=>void 0!==t[e]))),s}function h(t,e,s){if(t===e)return!0;if(typeof t!=typeof e)return!1;if(a(t)&&a(e)){const n=(null==s?void 0:s.ignoreUndefined)??!0,r=l(t,n),o=l(e,n);return!(!(null==s?void 0:s.partial)&&r.length!==o.length)&&o.every((n=>h(t[n],e[n],s)))}return!(!Array.isArray(t)||!Array.isArray(e)||t.length!==e.length||t.some(((t,n)=>!h(t,e[n],s))))}function d(t){let e,s;const n=new Promise(((t,n)=>{e=t,s=n}));return n.status="pending",n.resolve=s=>{n.status="resolved",n.value=s,e(s),null==t||t(s)},n.reject=t=>{n.status="rejected",s(t)},n}s.d(e,{BH:()=>i,HV:()=>n,Su:()=>d,Up:()=>o,Zw:()=>r,bD:()=>h})},1561:(t,e,s)=>{"use strict";s.d(e,{A:()=>o});var n=!0,r="Invariant failed";function o(t,e){if(!t){if(n)throw new Error(r);var s="function"==typeof e?e():e,o=s?"".concat(r,": ").concat(s):r;throw new Error(o)}}}},o={};function i(t){var e=o[t];if(void 0!==e)return e.exports;var s=o[t]={id:t,loaded:!1,exports:{}};return r[t](s,s.exports,i),s.loaded=!0,s.exports}i.m=r,i.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return i.d(e,{a:e}),e},e=Object.getPrototypeOf?t=>Object.getPrototypeOf(t):t=>t.__proto__,i.t=function(s,n){if(1&n&&(s=this(s)),8&n)return s;if("object"==typeof s&&s){if(4&n&&s.__esModule)return s;if(16&n&&"function"==typeof s.then)return s}var r=Object.create(null);i.r(r);var o={};t=t||[null,e({}),e([]),e(e)];for(var a=2&n&&s;"object"==typeof a&&!~t.indexOf(a);a=e(a))Object.getOwnPropertyNames(a).forEach((t=>o[t]=()=>s[t]));return o.default=()=>s,i.d(r,o),r},i.d=(t,e)=>{for(var s in e)i.o(e,s)&&!i.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},i.f={},i.e=t=>Promise.all(Object.keys(i.f).reduce(((e,s)=>(i.f[s](t,e),e)),[])),i.u=t=>t+".js",i.miniCssF=t=>{},i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),i.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),s={},n="simplybook_app:",i.l=(t,e,r,o)=>{if(s[t])s[t].push(e);else{var a,c;if(void 0!==r)for(var u=document.getElementsByTagName("script"),l=0;l<u.length;l++){var h=u[l];if(h.getAttribute("src")==t||h.getAttribute("data-webpack")==n+r){a=h;break}}a||(c=!0,(a=document.createElement("script")).charset="utf-8",a.timeout=120,i.nc&&a.setAttribute("nonce",i.nc),a.setAttribute("data-webpack",n+r),a.src=t),s[t]=[e];var d=(e,n)=>{a.onerror=a.onload=null,clearTimeout(p);var r=s[t];if(delete s[t],a.parentNode&&a.parentNode.removeChild(a),r&&r.forEach((t=>t(n))),e)return e(n)},p=setTimeout(d.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=d.bind(null,a.onerror),a.onload=d.bind(null,a.onload),c&&document.head.appendChild(a)}},i.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.nmd=t=>(t.paths=[],t.children||(t.children=[]),t),(()=>{var t;i.g.importScripts&&(t=i.g.location+"");var e=i.g.document;if(!t&&e&&(e.currentScript&&"SCRIPT"===e.currentScript.tagName.toUpperCase()&&(t=e.currentScript.src),!t)){var s=e.getElementsByTagName("script");if(s.length)for(var n=s.length-1;n>-1&&(!t||!/^http(s?):/.test(t));)t=s[n--].src}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),i.p=t})(),(()=>{var t={57:0};i.f.j=(e,s)=>{var n=i.o(t,e)?t[e]:void 0;if(0!==n)if(n)s.push(n[2]);else{var r=new Promise(((s,r)=>n=t[e]=[s,r]));s.push(n[2]=r);var o=i.p+i.u(e),a=new Error;i.l(o,(s=>{if(i.o(t,e)&&(0!==(n=t[e])&&(t[e]=void 0),n)){var r=s&&("load"===s.type?"missing":s.type),o=s&&s.target&&s.target.src;a.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",a.name="ChunkLoadError",a.type=r,a.request=o,n[1](a)}}),"chunk-"+e,e)}};var e=(e,s)=>{var n,r,[o,a,c]=s,u=0;if(o.some((e=>0!==t[e]))){for(n in a)i.o(a,n)&&(i.m[n]=a[n]);c&&c(i)}for(e&&e(s);u<o.length;u++)r=o[u],i.o(t,r)&&t[r]&&t[r][0](),t[r]=0},s=globalThis.webpackChunksimplybook_app=globalThis.webpackChunksimplybook_app||[];s.forEach(e.bind(null,0)),s.push=e.bind(null,s.push.bind(s))})(),i.nc=void 0,(()=>{"use strict";var t=i(6087),e=i(4880),s=i(9757),n=i(6261),r=i(6500),o=class extends r.Q{constructor(t={}){super(),this.config=t,this.#m=new Map}#m;build(t,n,r){const o=n.queryKey,i=n.queryHash??(0,e.F$)(o,n);let a=this.get(i);return a||(a=new s.X({client:t,queryKey:o,queryHash:i,options:t.defaultQueryOptions(n),state:r,defaultOptions:t.getQueryDefaults(o)}),this.add(a)),a}add(t){this.#m.has(t.queryHash)||(this.#m.set(t.queryHash,t),this.notify({type:"added",query:t}))}remove(t){const e=this.#m.get(t.queryHash);e&&(t.destroy(),e===t&&this.#m.delete(t.queryHash),this.notify({type:"removed",query:t}))}clear(){n.j.batch((()=>{this.getAll().forEach((t=>{this.remove(t)}))}))}get(t){return this.#m.get(t)}getAll(){return[...this.#m.values()]}find(t){const s={exact:!0,...t};return this.getAll().find((t=>(0,e.MK)(s,t)))}findAll(t={}){const s=this.getAll();return Object.keys(t).length>0?s.filter((s=>(0,e.MK)(t,s))):s}notify(t){n.j.batch((()=>{this.listeners.forEach((e=>{e(t)}))}))}onFocus(){n.j.batch((()=>{this.getAll().forEach((t=>{t.onFocus()}))}))}onOnline(){n.j.batch((()=>{this.getAll().forEach((t=>{t.onOnline()}))}))}},a=i(6158),c=class extends r.Q{constructor(t={}){super(),this.config=t,this.#v=new Set,this.#y=new Map,this.#g=0}#v;#y;#g;build(t,e,s){const n=new a.s({mutationCache:this,mutationId:++this.#g,options:t.defaultMutationOptions(e),state:s});return this.add(n),n}add(t){this.#v.add(t);const e=u(t);if("string"==typeof e){const s=this.#y.get(e);s?s.push(t):this.#y.set(e,[t])}this.notify({type:"added",mutation:t})}remove(t){if(this.#v.delete(t)){const e=u(t);if("string"==typeof e){const s=this.#y.get(e);if(s)if(s.length>1){const e=s.indexOf(t);-1!==e&&s.splice(e,1)}else s[0]===t&&this.#y.delete(e)}}this.notify({type:"removed",mutation:t})}canRun(t){const e=u(t);if("string"==typeof e){const s=this.#y.get(e),n=s?.find((t=>"pending"===t.state.status));return!n||n===t}return!0}runNext(t){const e=u(t);if("string"==typeof e){const s=this.#y.get(e)?.find((e=>e!==t&&e.state.isPaused));return s?.continue()??Promise.resolve()}return Promise.resolve()}clear(){n.j.batch((()=>{this.#v.forEach((t=>{this.notify({type:"removed",mutation:t})})),this.#v.clear(),this.#y.clear()}))}getAll(){return Array.from(this.#v)}find(t){const s={exact:!0,...t};return this.getAll().find((t=>(0,e.nJ)(s,t)))}findAll(t={}){return this.getAll().filter((s=>(0,e.nJ)(t,s)))}notify(t){n.j.batch((()=>{this.listeners.forEach((e=>{e(t)}))}))}resumePausedMutations(){const t=this.getAll().filter((t=>t.state.isPaused));return n.j.batch((()=>Promise.all(t.map((t=>t.continue().catch(e.lQ))))))}};function u(t){return t.options.scope?.id}var l=i(9658),h=i(6035);function d(t){return{onFetch:(s,n)=>{const r=s.options,o=s.fetchOptions?.meta?.fetchMore?.direction,i=s.state.data?.pages||[],a=s.state.data?.pageParams||[];let c={pages:[],pageParams:[]},u=0;const l=async()=>{let n=!1;const l=(0,e.ZM)(s.options,s.fetchOptions),h=async(t,r,o)=>{if(n)return Promise.reject();if(null==r&&t.pages.length)return Promise.resolve(t);const i={client:s.client,queryKey:s.queryKey,pageParam:r,direction:o?"backward":"forward",meta:s.options.meta};var a;a=i,Object.defineProperty(a,"signal",{enumerable:!0,get:()=>(s.signal.aborted?n=!0:s.signal.addEventListener("abort",(()=>{n=!0})),s.signal)});const c=await l(i),{maxPages:u}=s.options,h=o?e.ZZ:e.y9;return{pages:h(t.pages,c,u),pageParams:h(t.pageParams,r,u)}};if(o&&i.length){const t="backward"===o,e={pages:i,pageParams:a},s=(t?f:p)(r,e);c=await h(e,s,t)}else{const e=t??i.length;do{const t=0===u?a[0]??r.initialPageParam:p(r,c);if(u>0&&null==t)break;c=await h(c,t),u++}while(u<e)}return c};s.options.persister?s.fetchFn=()=>s.options.persister?.(l,{client:s.client,queryKey:s.queryKey,meta:s.options.meta,signal:s.signal},n):s.fetchFn=l}}}function p(t,{pages:e,pageParams:s}){const n=e.length-1;return e.length>0?t.getNextPageParam(e[n],e,s[n],s):void 0}function f(t,{pages:e,pageParams:s}){return e.length>0?t.getPreviousPageParam?.(e[0],e,s[0],s):void 0}var m=i(7665);const v="__TSR_index",y="popstate",g="beforeunload";function b(t){let e=t.getLocation();const s=new Set,n=n=>{e=t.getLocation(),s.forEach((t=>t({location:e,action:n})))},r=s=>{t.notifyOnIndexChange??1?n(s):e=t.getLocation()},o=async({task:s,navigateOpts:n,...r})=>{var o,i;if(null==n?void 0:n.ignoreBlocker)return void s();const a=(null==(o=t.getBlockers)?void 0:o.call(t))??[],c="PUSH"===r.type||"REPLACE"===r.type;if("undefined"!=typeof document&&a.length&&c)for(const s of a){const n=C(r.path,r.state);if(await s.blockerFn({currentLocation:e,nextLocation:n,action:r.type}))return void(null==(i=t.onBlocked)||i.call(t))}s()};return{get location(){return e},get length(){return t.getLength()},subscribers:s,subscribe:t=>(s.add(t),()=>{s.delete(t)}),push:(s,r,i)=>{const a=e.state[v];r=S(a+1,r),o({task:()=>{t.pushState(s,r),n({type:"PUSH"})},navigateOpts:i,type:"PUSH",path:s,state:r})},replace:(s,r,i)=>{const a=e.state[v];r=S(a,r),o({task:()=>{t.replaceState(s,r),n({type:"REPLACE"})},navigateOpts:i,type:"REPLACE",path:s,state:r})},go:(e,s)=>{o({task:()=>{t.go(e),r({type:"GO",index:e})},navigateOpts:s,type:"GO"})},back:e=>{o({task:()=>{t.back((null==e?void 0:e.ignoreBlocker)??!1),r({type:"BACK"})},navigateOpts:e,type:"BACK"})},forward:e=>{o({task:()=>{t.forward((null==e?void 0:e.ignoreBlocker)??!1),r({type:"FORWARD"})},navigateOpts:e,type:"FORWARD"})},canGoBack:()=>0!==e.state[v],createHref:e=>t.createHref(e),block:e=>{var s;if(!t.setBlockers)return()=>{};const n=(null==(s=t.getBlockers)?void 0:s.call(t))??[];return t.setBlockers([...n,e]),()=>{var s,n;const r=(null==(s=t.getBlockers)?void 0:s.call(t))??[];null==(n=t.setBlockers)||n.call(t,r.filter((t=>t!==e)))}},flush:()=>{var e;return null==(e=t.flush)?void 0:e.call(t)},destroy:()=>{var e;return null==(e=t.destroy)?void 0:e.call(t)},notify:n}}function S(t,e){return e||(e={}),{...e,key:R(),[v]:t}}function w(t){var e;const s=(null==t?void 0:t.window)??("undefined"!=typeof document?window:void 0),n=s.history.pushState,r=s.history.replaceState;let o=[];const i=()=>o,a=(null==t?void 0:t.createHref)??(t=>t),c=(null==t?void 0:t.parseLocation)??(()=>C(`${s.location.pathname}${s.location.search}${s.location.hash}`,s.history.state));(null==(e=s.history.state)?void 0:e.key)||s.history.replaceState({[v]:0,key:R()},"");let u,l,h,d=c(),p=!1,f=!1,m=!1,S=!1;const w=()=>{l&&(E._ignoreSubscribers=!0,(l.isPush?s.history.pushState:s.history.replaceState)(l.state,"",l.href),E._ignoreSubscribers=!1,l=void 0,h=void 0,u=void 0)},_=(t,e,s)=>{const n=a(e);h||(u=d),d=C(e,s),l={href:n,state:s,isPush:(null==l?void 0:l.isPush)||"push"===t},h||(h=Promise.resolve().then((()=>w())))},P=t=>{d=c(),E.notify({type:t})},x=async()=>{if(f)return void(f=!1);const t=c(),e=t.state[v]-d.state[v],n=-1===e,r=!(1===e)&&!n||p;p=!1;const o=r?"GO":n?"BACK":"FORWARD",a=r?{type:"GO",index:e}:{type:n?"BACK":"FORWARD"};if(m)m=!1;else{const e=i();if("undefined"!=typeof document&&e.length)for(const n of e)if(await n.blockerFn({currentLocation:d,nextLocation:t,action:o}))return f=!0,s.history.go(1),void E.notify(a)}d=c(),E.notify(a)},O=t=>{if(S)return void(S=!1);let e=!1;const s=i();if("undefined"!=typeof document&&s.length)for(const t of s){const s=t.enableBeforeUnload??!0;if(!0===s){e=!0;break}if("function"==typeof s&&!0===s()){e=!0;break}}return e?(t.preventDefault(),t.returnValue=""):void 0},E=b({getLocation:()=>d,getLength:()=>s.history.length,pushState:(t,e)=>_("push",t,e),replaceState:(t,e)=>_("replace",t,e),back:t=>(t&&(m=!0),S=!0,s.history.back()),forward:t=>{t&&(m=!0),S=!0,s.history.forward()},go:t=>{p=!0,s.history.go(t)},createHref:t=>a(t),flush:w,destroy:()=>{s.history.pushState=n,s.history.replaceState=r,s.removeEventListener(g,O,{capture:!0}),s.removeEventListener(y,x)},onBlocked:()=>{u&&d!==u&&(d=u)},getBlockers:i,setBlockers:t=>o=t,notifyOnIndexChange:!1});return s.addEventListener(g,O,{capture:!0}),s.addEventListener(y,x),s.history.pushState=function(...t){const e=n.apply(s.history,t);return E._ignoreSubscribers||P("PUSH"),e},s.history.replaceState=function(...t){const e=r.apply(s.history,t);return E._ignoreSubscribers||P("REPLACE"),e},E}function C(t,e){const s=t.indexOf("#"),n=t.indexOf("?");return{href:t,pathname:t.substring(0,s>0?n>0?Math.min(s,n):s:n>0?n:t.length),hash:s>-1?t.substring(s):"",search:n>-1?t.slice(n,-1===s?void 0:s):"",state:e||{[v]:0,key:R()}}}function R(){return(Math.random()+1).toString(36).substring(7)}var _=i(1843);class P{constructor(t){this.listeners=new Set,this._subscriptions=[],this.lastSeenDepValues=[],this.getDepVals=()=>{const t=[],e=[];for(const s of this.options.deps)t.push(s.prevState),e.push(s.state);return this.lastSeenDepValues=e,{prevDepVals:t,currDepVals:e,prevVal:this.prevState??void 0}},this.recompute=()=>{var t,e;this.prevState=this.state;const{prevDepVals:s,currDepVals:n,prevVal:r}=this.getDepVals();this.state=this.options.fn({prevDepVals:s,currDepVals:n,prevVal:r}),null==(e=(t=this.options).onUpdate)||e.call(t)},this.checkIfRecalculationNeededDeeply=()=>{for(const t of this.options.deps)t instanceof P&&t.checkIfRecalculationNeededDeeply();let t=!1;const e=this.lastSeenDepValues,{currDepVals:s}=this.getDepVals();for(let n=0;n<s.length;n++)if(s[n]!==e[n]){t=!0;break}t&&this.recompute()},this.mount=()=>(this.registerOnGraph(),this.checkIfRecalculationNeededDeeply(),()=>{this.unregisterFromGraph();for(const t of this._subscriptions)t()}),this.subscribe=t=>{var e,s;this.listeners.add(t);const n=null==(s=(e=this.options).onSubscribe)?void 0:s.call(e,t,this);return()=>{this.listeners.delete(t),null==n||n()}},this.options=t,this.state=t.fn({prevDepVals:void 0,prevVal:void 0,currDepVals:this.getDepVals().currDepVals})}registerOnGraph(t=this.options.deps){for(const e of t)if(e instanceof P)e.registerOnGraph(),this.registerOnGraph(e.options.deps);else if(e instanceof q){let t=x.get(e);t||(t=new Set,x.set(e,t)),t.add(this);let s=O.get(this);s||(s=new Set,O.set(this,s)),s.add(e)}}unregisterFromGraph(t=this.options.deps){for(const e of t)if(e instanceof P)this.unregisterFromGraph(e.options.deps);else if(e instanceof q){const t=x.get(e);t&&t.delete(this);const s=O.get(this);s&&s.delete(e)}}}const x=new WeakMap,O=new WeakMap,E={current:[]};let k=!1,M=0;const L=new Set,F=new Map;function j(t){const e=Array.from(t).sort(((t,e)=>t instanceof P&&t.options.deps.includes(e)?1:e instanceof P&&e.options.deps.includes(t)?-1:0));for(const t of e){if(E.current.includes(t))continue;E.current.push(t),t.recompute();const e=O.get(t);if(e)for(const t of e){const e=x.get(t);e&&j(e)}}}function I(t){t.listeners.forEach((e=>e({prevVal:t.prevState,currentVal:t.state})))}function A(t){t.listeners.forEach((e=>e({prevVal:t.prevState,currentVal:t.state})))}function D(t){if(M>0&&!F.has(t)&&F.set(t,t.prevState),L.add(t),!(M>0||k))try{for(k=!0;L.size>0;){const t=Array.from(L);L.clear();for(const e of t){const t=F.get(e)??e.prevState;e.prevState=t,I(e)}for(const e of t){const t=x.get(e);t&&(E.current.push(e),j(t))}for(const e of t){const t=x.get(e);if(t)for(const e of t)A(e)}}}finally{k=!1,E.current=[],F.clear()}}function T(t){M++;try{t()}finally{if(M--,0===M){const t=Array.from(L)[0];t&&D(t)}}}class q{constructor(t,e){this.listeners=new Set,this.subscribe=t=>{var e,s;this.listeners.add(t);const n=null==(s=null==(e=this.options)?void 0:e.onSubscribe)?void 0:s.call(e,t,this);return()=>{this.listeners.delete(t),null==n||n()}},this.setState=t=>{var e,s,n;this.prevState=this.state,this.state=(null==(e=this.options)?void 0:e.updateFn)?this.options.updateFn(this.prevState)(t):t(this.prevState),null==(n=null==(s=this.options)?void 0:s.onUpdate)||n.call(s),D(this)},this.prevState=t,this.state=t,this.options=e}}var N=i(1561),B=i(6847),$=i(9239),K=i(7264),H=i(37);function V(t){if(!t)return"";const e=decodeURIComponent(t);return"false"!==e&&("true"===e||(0*+e==0&&+e+""===e?+e:e))}const U=(Q=JSON.parse,t=>{"?"===t.substring(0,1)&&(t=t.substring(1));const e=function(t){let e,s;const n={},r=t.split("&");for(;e=r.shift();){const t=e.indexOf("=");if(-1!==t){s=e.slice(0,t),s=decodeURIComponent(s);const r=e.slice(t+1);void 0!==n[s]?n[s]=[].concat(n[s],V(r)):n[s]=V(r)}else s=e,s=decodeURIComponent(s),n[s]=""}return n}(t);for(const t in e){const s=e[t];if("string"==typeof s)try{e[t]=Q(s)}catch(t){}}return e});var Q;const z=function(t,e){return s=>{s={...s},Object.keys(s).forEach((n=>{const r=s[n];void 0===r||void 0===r?delete s[n]:s[n]=function(s){if("object"==typeof s&&null!==s)try{return t(s)}catch(t){}else if("string"==typeof s&&"function"==typeof e)try{return e(s),t(s)}catch(t){}return s}(r)}));const n=function(t){let e,s,n,r="";for(e in t)if(void 0!==(n=t[e]))if(Array.isArray(n))for(s=0;s<n.length;s++)r&&(r+="&"),r+=encodeURIComponent(e)+"="+encodeURIComponent(n[s]);else r&&(r+="&"),r+=encodeURIComponent(e)+"="+encodeURIComponent(n);return""+r}(s).toString();return n?`?${n}`:""}}(JSON.stringify,JSON.parse);var W=i(1459),G=i(6946),Z=i(1259);const J=["component","errorComponent","pendingComponent","notFoundComponent"];function X(t,e){if(null==t)return{};if("~standard"in t){const s=t["~standard"].validate(e);if(s instanceof Promise)throw new Y("Async validation not supported");if(s.issues)throw new Y(JSON.stringify(s.issues,void 0,2),{cause:s});return s.value}return"parse"in t?t.parse(e):"function"==typeof t?t(e):{}}class Y extends Error{}class tt extends Error{}var et=i(790),st=i(1609),nt=i(7573),rt=i(2927),ot=i(8332),it=i(396),at=i(3655);function ct(){const t=(0,it.r)(),e=st.useRef({router:t,mounted:!1}),s=(0,ot.k)({select:({isLoading:t})=>t}),[n,r]=st.useState(!1),o=(0,ot.k)({select:t=>t.matches.some((t=>"pending"===t.status)),structuralSharing:!0}),i=(0,at.ZC)(s),a=s||n||o,c=(0,at.ZC)(a),u=s||o,l=(0,at.ZC)(u);return t.isServer||(t.startReactTransition=t=>{r(!0),st.startTransition((()=>{t(),r(!1)}))}),st.useEffect((()=>{const e=t.history.subscribe(t.load),s=t.buildLocation({to:t.latestLocation.pathname,search:!0,params:!0,hash:!0,state:!0,_includeValidateSearch:!0});return(0,B.gx)(t.latestLocation.href)!==(0,B.gx)(s.href)&&t.commitLocation({...s,replace:!0}),()=>{e()}}),[t,t.history]),(0,at.Nf)((()=>{"undefined"!=typeof window&&t.clientSsr||e.current.router===t&&e.current.mounted||(e.current={router:t,mounted:!0},(async()=>{try{await t.load()}catch(t){console.error(t)}})())}),[t]),(0,at.Nf)((()=>{i&&!s&&t.emit({type:"onLoad",...(0,H.C)(t.state)})}),[i,t,s]),(0,at.Nf)((()=>{l&&!u&&t.emit({type:"onBeforeRouteMount",...(0,H.C)(t.state)})}),[u,l,t]),(0,at.Nf)((()=>{c&&!a&&(t.emit({type:"onResolved",...(0,H.C)(t.state)}),t.__store.setState((t=>({...t,status:"idle",resolvedLocation:t.location}))))}),[a,c,t]),null}var ut=i(6712),lt=i(1245),ht=i(8541);function dt(){const t=(0,it.r)(),e=t.options.defaultPendingComponent?(0,et.jsx)(t.options.defaultPendingComponent,{}):null,s=t.isServer||"undefined"!=typeof document&&t.clientSsr?ht._:st.Suspense,n=(0,et.jsxs)(s,{fallback:e,children:[(0,et.jsx)(ct,{}),(0,et.jsx)(pt,{})]});return t.options.InnerWrap?(0,et.jsx)(t.options.InnerWrap,{children:n}):n}function pt(){const t=(0,ot.k)({select:t=>{var e;return null==(e=t.matches[0])?void 0:e.id}}),e=(0,ot.k)({select:t=>t.loadedAt});return(0,et.jsx)(ut.$.Provider,{value:t,children:(0,et.jsx)(rt.g,{getResetKey:()=>e,errorComponent:rt.A,onCatch:t=>{(0,nt.A)(!1,"The following error wasn't caught by any route! At the very least, consider setting an 'errorComponent' in your RootRoute!"),(0,nt.A)(!1,t.message||t.toString())},children:t?(0,et.jsx)(lt.YG,{matchId:t}):null})})}var ft=i(414);function mt({router:t,children:e,...s}){t.update({...t.options,...s,context:{...t.options.context,...s.context}});const n=(0,ft.H)(),r=(0,et.jsx)(n.Provider,{value:t,children:e});return t.options.Wrap?(0,et.jsx)(t.options.Wrap,{children:r}):r}function vt({router:t,...e}){return(0,et.jsx)(mt,{router:t,...e,children:(0,et.jsx)(dt,{})})}var yt=i(6244);React.lazy((()=>i.e(236).then(i.bind(i,1236)).then((t=>({default:t.TanStackRouterDevtools})))));const gt=(0,_.gI)({component:()=>React.createElement(yt.A,null,React.createElement(lt.sv,null),!1)});var bt=i(6037),St=(0,bt.WK)("/settings")(),wt=(0,bt.WK)("/onboarding")(),Ct=(0,bt.WK)("/")(),Rt=(0,bt.WK)("/settings/$settingsId")(),_t=(0,bt.WK)("/onboarding/tips-and-tricks")(),Pt=(0,bt.WK)("/onboarding/style-widget")(),xt=(0,bt.WK)("/onboarding/information-check")(),Ot=(0,bt.WK)("/onboarding/implementation")(),Et=(0,bt.WK)("/onboarding/create-your-account")(),kt=(0,bt.WK)("/onboarding/confirm-email")(),Mt=St.update({id:"/settings",path:"/settings",getParentRoute:function(){return gt}}).lazy((function(){return Promise.all([i.e(739),i.e(350),i.e(530),i.e(346),i.e(610)]).then(i.bind(i,1610)).then((function(t){return t.Route}))})),Lt=wt.update({id:"/onboarding",path:"/onboarding",getParentRoute:function(){return gt}}).lazy((function(){return Promise.all([i.e(739),i.e(350),i.e(932)]).then(i.bind(i,2551)).then((function(t){return t.Route}))})),Ft=Ct.update({id:"/",path:"/",getParentRoute:function(){return gt}}).lazy((function(){return Promise.all([i.e(739),i.e(530),i.e(283)]).then(i.bind(i,2283)).then((function(t){return t.Route}))})),jt=Rt.update({id:"/$settingsId",path:"/$settingsId",getParentRoute:function(){return Mt}}).lazy((function(){return Promise.all([i.e(739),i.e(350),i.e(530),i.e(346),i.e(15)]).then(i.bind(i,3287)).then((function(t){return t.Route}))})),It=_t.update({id:"/tips-and-tricks",path:"/tips-and-tricks",getParentRoute:function(){return Lt}}).lazy((function(){return Promise.all([i.e(739),i.e(350),i.e(530),i.e(346),i.e(777)]).then(i.bind(i,4777)).then((function(t){return t.Route}))})),At=Pt.update({id:"/style-widget",path:"/style-widget",getParentRoute:function(){return Lt}}).lazy((function(){return Promise.all([i.e(739),i.e(350),i.e(530),i.e(346),i.e(182)]).then(i.bind(i,3182)).then((function(t){return t.Route}))})),Dt=xt.update({id:"/information-check",path:"/information-check",getParentRoute:function(){return Lt}}).lazy((function(){return Promise.all([i.e(739),i.e(350),i.e(530),i.e(346),i.e(939)]).then(i.bind(i,9939)).then((function(t){return t.Route}))})),Tt=Ot.update({id:"/implementation",path:"/implementation",getParentRoute:function(){return Lt}}).lazy((function(){return Promise.all([i.e(739),i.e(350),i.e(530),i.e(346),i.e(536)]).then(i.bind(i,7536)).then((function(t){return t.Route}))})),qt=Et.update({id:"/create-your-account",path:"/create-your-account",getParentRoute:function(){return Lt}}).lazy((function(){return Promise.all([i.e(739),i.e(350),i.e(530),i.e(346),i.e(446)]).then(i.bind(i,4446)).then((function(t){return t.Route}))})),Nt={OnboardingConfirmEmailLazyRoute:kt.update({id:"/confirm-email",path:"/confirm-email",getParentRoute:function(){return Lt}}).lazy((function(){return Promise.all([i.e(739),i.e(350),i.e(530),i.e(346),i.e(157)]).then(i.bind(i,3157)).then((function(t){return t.Route}))})),OnboardingCreateYourAccountLazyRoute:qt,OnboardingImplementationLazyRoute:Tt,OnboardingInformationCheckLazyRoute:Dt,OnboardingStyleWidgetLazyRoute:At,OnboardingTipsAndTricksLazyRoute:It},Bt={SettingsSettingsIdLazyRoute:jt},$t={IndexLazyRoute:Ft,OnboardingLazyRoute:Lt._addFileChildren(Nt),SettingsLazyRoute:Mt._addFileChildren(Bt)},Kt=gt._addFileChildren($t)._addFileTypes();const Ht=function(){const t="undefined"!=typeof document?window:void 0;return w({window:t,parseLocation:()=>C(t.location.hash.split("#").slice(1).join("#")??"/",t.history.state),createHref:e=>`${t.location.pathname}${t.location.search}#${e}`})}(),Vt=new o({onError:t=>{}});let Ut={defaultOptions:{queries:{staleTime:36e5,refetchOnWindowFocus:!1,retry:!1,suspense:!1}}};Ut={...Ut,queryCache:Vt};const Qt=new class{#b;#r;#d;#S;#w;#C;#R;#_;constructor(t={}){this.#b=t.queryCache||new o,this.#r=t.mutationCache||new c,this.#d=t.defaultOptions||{},this.#S=new Map,this.#w=new Map,this.#C=0}mount(){this.#C++,1===this.#C&&(this.#R=l.m.subscribe((async t=>{t&&(await this.resumePausedMutations(),this.#b.onFocus())})),this.#_=h.t.subscribe((async t=>{t&&(await this.resumePausedMutations(),this.#b.onOnline())})))}unmount(){this.#C--,0===this.#C&&(this.#R?.(),this.#R=void 0,this.#_?.(),this.#_=void 0)}isFetching(t){return this.#b.findAll({...t,fetchStatus:"fetching"}).length}isMutating(t){return this.#r.findAll({...t,status:"pending"}).length}getQueryData(t){const e=this.defaultQueryOptions({queryKey:t});return this.#b.get(e.queryHash)?.state.data}ensureQueryData(t){const s=this.defaultQueryOptions(t),n=this.#b.build(this,s),r=n.state.data;return void 0===r?this.fetchQuery(t):(t.revalidateIfStale&&n.isStaleByTime((0,e.d2)(s.staleTime,n))&&this.prefetchQuery(s),Promise.resolve(r))}getQueriesData(t){return this.#b.findAll(t).map((({queryKey:t,state:e})=>[t,e.data]))}setQueryData(t,s,n){const r=this.defaultQueryOptions({queryKey:t}),o=this.#b.get(r.queryHash),i=o?.state.data,a=(0,e.Zw)(s,i);if(void 0!==a)return this.#b.build(this,r).setData(a,{...n,manual:!0})}setQueriesData(t,e,s){return n.j.batch((()=>this.#b.findAll(t).map((({queryKey:t})=>[t,this.setQueryData(t,e,s)]))))}getQueryState(t){const e=this.defaultQueryOptions({queryKey:t});return this.#b.get(e.queryHash)?.state}removeQueries(t){const e=this.#b;n.j.batch((()=>{e.findAll(t).forEach((t=>{e.remove(t)}))}))}resetQueries(t,e){const s=this.#b,r={type:"active",...t};return n.j.batch((()=>(s.findAll(t).forEach((t=>{t.reset()})),this.refetchQueries(r,e))))}cancelQueries(t,s={}){const r={revert:!0,...s},o=n.j.batch((()=>this.#b.findAll(t).map((t=>t.cancel(r)))));return Promise.all(o).then(e.lQ).catch(e.lQ)}invalidateQueries(t,e={}){return n.j.batch((()=>{if(this.#b.findAll(t).forEach((t=>{t.invalidate()})),"none"===t?.refetchType)return Promise.resolve();const s={...t,type:t?.refetchType??t?.type??"active"};return this.refetchQueries(s,e)}))}refetchQueries(t,s={}){const r={...s,cancelRefetch:s.cancelRefetch??!0},o=n.j.batch((()=>this.#b.findAll(t).filter((t=>!t.isDisabled())).map((t=>{let s=t.fetch(void 0,r);return r.throwOnError||(s=s.catch(e.lQ)),"paused"===t.state.fetchStatus?Promise.resolve():s}))));return Promise.all(o).then(e.lQ)}fetchQuery(t){const s=this.defaultQueryOptions(t);void 0===s.retry&&(s.retry=!1);const n=this.#b.build(this,s);return n.isStaleByTime((0,e.d2)(s.staleTime,n))?n.fetch(s):Promise.resolve(n.state.data)}prefetchQuery(t){return this.fetchQuery(t).then(e.lQ).catch(e.lQ)}fetchInfiniteQuery(t){return t.behavior=d(t.pages),this.fetchQuery(t)}prefetchInfiniteQuery(t){return this.fetchInfiniteQuery(t).then(e.lQ).catch(e.lQ)}ensureInfiniteQueryData(t){return t.behavior=d(t.pages),this.ensureQueryData(t)}resumePausedMutations(){return h.t.isOnline()?this.#r.resumePausedMutations():Promise.resolve()}getQueryCache(){return this.#b}getMutationCache(){return this.#r}getDefaultOptions(){return this.#d}setDefaultOptions(t){this.#d=t}setQueryDefaults(t,s){this.#S.set((0,e.EN)(t),{queryKey:t,defaultOptions:s})}getQueryDefaults(t){const s=[...this.#S.values()],n={};return s.forEach((s=>{(0,e.Cp)(t,s.queryKey)&&Object.assign(n,s.defaultOptions)})),n}setMutationDefaults(t,s){this.#w.set((0,e.EN)(t),{mutationKey:t,defaultOptions:s})}getMutationDefaults(t){const s=[...this.#w.values()];let n={};return s.forEach((s=>{(0,e.Cp)(t,s.mutationKey)&&(n={...n,...s.defaultOptions})})),n}defaultQueryOptions(t){if(t._defaulted)return t;const s={...this.#d.queries,...this.getQueryDefaults(t.queryKey),...t,_defaulted:!0};return s.queryHash||(s.queryHash=(0,e.F$)(s.queryKey,s)),void 0===s.refetchOnReconnect&&(s.refetchOnReconnect="always"!==s.networkMode),void 0===s.throwOnError&&(s.throwOnError=!!s.suspense),!s.networkMode&&s.persister&&(s.networkMode="offlineFirst"),s.queryFn===e.hT&&(s.enabled=!1),s}defaultMutationOptions(t){return t?._defaulted?t:{...this.#d.mutations,...t?.mutationKey&&this.getMutationDefaults(t.mutationKey),...t,_defaulted:!0}}clear(){this.#b.clear(),this.#r.clear()}}(Ut),zt=new _.l7({getParentRoute:()=>gt,component:()=>React.createElement("div",{className:"simplybook"},"404 Not Found")}),Wt=new class{constructor(t){this.tempLocationKey=`${Math.round(1e7*Math.random())}`,this.resetNextScroll=!0,this.shouldViewTransition=void 0,this.isViewTransitionTypesSupported=void 0,this.subscribers=new Set,this.isScrollRestoring=!1,this.isScrollRestorationSetup=!1,this.startReactTransition=t=>t(),this.update=t=>{var e;t.notFoundRoute&&console.warn("The notFoundRoute API is deprecated and will be removed in the next major version. See https://tanstack.com/router/v1/docs/framework/react/guide/not-found-errors#migrating-from-notfoundroute for more info.");const s=this.options;this.options={...this.options,...t},this.isServer=this.options.isServer??"undefined"==typeof document,this.pathParamsDecodeCharMap=this.options.pathParamsAllowedCharacters?new Map(this.options.pathParamsAllowedCharacters.map((t=>[encodeURIComponent(t),t]))):void 0,(!this.basepath||t.basepath&&t.basepath!==s.basepath)&&(void 0===t.basepath||""===t.basepath||"/"===t.basepath?this.basepath="/":this.basepath=`/${(0,B.cg)(t.basepath)}`),(!this.history||this.options.history&&this.options.history!==this.history)&&(this.history=this.options.history??(this.isServer?function(t={initialEntries:["/"]}){const e=t.initialEntries;let s=t.initialIndex?Math.min(Math.max(t.initialIndex,0),e.length-1):e.length-1;const n=e.map(((t,e)=>S(e,void 0)));return b({getLocation:()=>C(e[s],n[s]),getLength:()=>e.length,pushState:(t,r)=>{s<e.length-1&&(e.splice(s+1),n.splice(s+1)),n.push(r),e.push(t),s=Math.max(e.length-1,0)},replaceState:(t,r)=>{n[s]=r,e[s]=t},back:()=>{s=Math.max(s-1,0)},forward:()=>{s=Math.min(s+1,e.length-1)},go:t=>{s=Math.min(Math.max(s+t,0),e.length-1)},createHref:t=>t})}({initialEntries:[this.basepath||"/"]}):w()),this.latestLocation=this.parseLocation()),this.options.routeTree!==this.routeTree&&(this.routeTree=this.options.routeTree,this.buildRouteTree()),this.__store||(this.__store=new q({loadedAt:0,isLoading:!1,isTransitioning:!1,status:"idle",resolvedLocation:void 0,location:this.latestLocation,matches:[],pendingMatches:[],cachedMatches:[],statusCode:200},{onUpdate:()=>{this.__store.state={...this.state,cachedMatches:this.state.cachedMatches.filter((t=>!["redirected"].includes(t.status)))}}}),(0,Z.j1)(this)),"undefined"!=typeof window&&"CSS"in window&&"function"==typeof(null==(e=window.CSS)?void 0:e.supports)&&(this.isViewTransitionTypesSupported=window.CSS.supports("selector(:active-view-transition-type(a)"))},this.buildRouteTree=()=>{this.routesById={},this.routesByPath={};const t=this.options.notFoundRoute;t&&(t.init({originalIndex:99999999999,defaultSsr:this.options.defaultSsr}),this.routesById[t.id]=t);const e=t=>{t.forEach(((t,s)=>{t.init({originalIndex:s,defaultSsr:this.options.defaultSsr});const n=this.routesById[t.id];if((0,N.A)(!n,`Duplicate routes found with id: ${String(t.id)}`),this.routesById[t.id]=t,!t.isRoot&&t.path){const e=(0,B.gx)(t.fullPath);this.routesByPath[e]&&!t.fullPath.endsWith("/")||(this.routesByPath[e]=t)}const r=t.children;(null==r?void 0:r.length)&&e(r)}))};e([this.routeTree]);const s=[];Object.values(this.routesById).forEach(((t,e)=>{var n;if(t.isRoot||!t.path)return;const r=(0,B.p1)(t.fullPath),o=(0,B.kX)(r);for(;o.length>1&&"/"===(null==(n=o[0])?void 0:n.value);)o.shift();const i=o.map((t=>"/"===t.value?.75:"param"===t.type?.5:"wildcard"===t.type?.25:1));s.push({child:t,trimmed:r,parsed:o,index:e,scores:i})})),this.flatRoutes=s.sort(((t,e)=>{const s=Math.min(t.scores.length,e.scores.length);for(let n=0;n<s;n++)if(t.scores[n]!==e.scores[n])return e.scores[n]-t.scores[n];if(t.scores.length!==e.scores.length)return e.scores.length-t.scores.length;for(let n=0;n<s;n++)if(t.parsed[n].value!==e.parsed[n].value)return t.parsed[n].value>e.parsed[n].value?1:-1;return t.index-e.index})).map(((t,e)=>(t.child.rank=e,t.child)))},this.subscribe=(t,e)=>{const s={eventType:t,fn:e};return this.subscribers.add(s),()=>{this.subscribers.delete(s)}},this.emit=t=>{this.subscribers.forEach((e=>{e.eventType===t.type&&e.fn(t)}))},this.parseLocation=(t,e)=>{const s=({pathname:e,search:s,hash:n,state:r})=>{const o=this.options.parseSearch(s),i=this.options.stringifySearch(o);return{pathname:e,searchStr:i,search:(0,$.BH)(null==t?void 0:t.search,o),hash:n.split("#").reverse()[0]??"",href:`${e}${i}${n}`,state:(0,$.BH)(null==t?void 0:t.state,r)}},n=s(e??this.history.location),{__tempLocation:r,__tempKey:o}=n.state;if(r&&(!o||o===this.tempLocationKey)){const t=s(r);return t.state.key=n.state.key,delete t.state.__tempLocation,{...t,maskedLocation:n}}return n},this.resolvePathWithBase=(t,e)=>(0,B.o1)({basepath:this.basepath,base:t,to:(0,B.ts)(e),trailingSlash:this.options.trailingSlash,caseSensitive:this.options.caseSensitive}),this.getMatchedRoutes=(t,e)=>{let s={};const n=(0,B.gx)(t.pathname),r=t=>(0,B.WN)(this.basepath,n,{to:t.fullPath,caseSensitive:t.options.caseSensitive??this.options.caseSensitive,fuzzy:!0});let o=void 0!==(null==e?void 0:e.to)?this.routesByPath[e.to]:void 0;o?s=r(o):o=this.flatRoutes.find((t=>{const e=r(t);return!!e&&(s=e,!0)}));let i=o||this.routesById[K.n];const a=[i];for(;i.parentRoute;)i=i.parentRoute,a.unshift(i);return{matchedRoutes:a,routeParams:s,foundRoute:o}},this.cancelMatch=t=>{const e=this.getMatch(t);e&&(e.abortController.abort(),clearTimeout(e.pendingTimeout))},this.cancelMatches=()=>{var t;null==(t=this.state.pendingMatches)||t.forEach((t=>{this.cancelMatch(t.id)}))},this.buildLocation=t=>{const e=(e={},s)=>{var n,r,o,i,a,c;const u=e._fromLocation?this.matchRoutes(e._fromLocation,{_buildLocation:!0}):this.state.matches,l=null!=e.from?u.find((t=>(0,B.WN)(this.basepath,(0,B.gx)(t.pathname),{to:e.from,caseSensitive:!1,fuzzy:!1}))):void 0,h=(null==l?void 0:l.pathname)||this.latestLocation.pathname;(0,N.A)(null==e.from||null!=l,"Could not find match for from: "+e.from);const d=(null==(n=this.state.pendingMatches)?void 0:n.length)?null==(r=(0,$.HV)(this.state.pendingMatches))?void 0:r.search:(null==(o=(0,$.HV)(u))?void 0:o.search)||this.latestLocation.search,p=null==s?void 0:s.matchedRoutes.filter((t=>u.find((e=>e.routeId===t.id))));let f;if(e.to)f=this.resolvePathWithBase(h,`${e.to}`);else{const t=this.routesById[null==(i=null==p?void 0:p.find((t=>{const e=(0,B.xv)({path:t.fullPath,params:(null==s?void 0:s.routeParams)??{},decodeCharMap:this.pathParamsDecodeCharMap}).interpolatedPath;return(0,B.HS)([this.basepath,e])===h})))?void 0:i.id];f=this.resolvePathWithBase(h,(null==t?void 0:t.to)??h)}const m={...null==(a=(0,$.HV)(u))?void 0:a.params};let v=!0===(e.params??!0)?m:{...m,...(0,$.Zw)(e.params,m)};Object.keys(v).length>0&&(null==s||s.matchedRoutes.map((t=>{var e;return(null==(e=t.options.params)?void 0:e.stringify)??t.options.stringifyParams})).filter(Boolean).forEach((t=>{v={...v,...t(v)}}))),f=(0,B.xv)({path:f,params:v??{},leaveWildcards:!1,leaveParams:t.leaveParams,decodeCharMap:this.pathParamsDecodeCharMap}).interpolatedPath;let y=d;if(t._includeValidateSearch&&(null==(c=this.options.search)?void 0:c.strict)){let t={};null==s||s.matchedRoutes.forEach((e=>{try{e.options.validateSearch&&(t={...t,...X(e.options.validateSearch,{...t,...y})??{}})}catch{}})),y=t}y=(n=>{const r=(null==s?void 0:s.matchedRoutes.reduce(((e,s)=>{var n;const r=[];if("search"in s.options)(null==(n=s.options.search)?void 0:n.middlewares)&&r.push(...s.options.search.middlewares);else if(s.options.preSearchFilters||s.options.postSearchFilters){const t=({search:t,next:e})=>{let n=t;"preSearchFilters"in s.options&&s.options.preSearchFilters&&(n=s.options.preSearchFilters.reduce(((t,e)=>e(t)),t));const r=e(n);return"postSearchFilters"in s.options&&s.options.postSearchFilters?s.options.postSearchFilters.reduce(((t,e)=>e(t)),r):r};r.push(t)}if(t._includeValidateSearch&&s.options.validateSearch){const t=({search:t,next:e})=>{try{const n=e(t);return{...n,...X(s.options.validateSearch,n)??{}}}catch{}};r.push(t)}return e.concat(r)}),[]))??[];r.push((({search:t})=>e.search?!0===e.search?t:(0,$.Zw)(e.search,t):{}));const o=(t,e)=>t>=r.length?e:(0,r[t])({search:e,next:e=>o(t+1,e)});return o(0,n)})(y),y=(0,$.BH)(d,y);const g=this.options.stringifySearch(y),b=!0===e.hash?this.latestLocation.hash:e.hash?(0,$.Zw)(e.hash,this.latestLocation.hash):void 0,S=b?`#${b}`:"";let w=!0===e.state?this.latestLocation.state:e.state?(0,$.Zw)(e.state,this.latestLocation.state):{};return w=(0,$.BH)(this.latestLocation.state,w),{pathname:f,search:y,searchStr:g,state:w,hash:b??"",href:`${f}${g}${S}`,unmaskOnReload:e.unmaskOnReload}},s=(s={},n)=>{var r;const o=e(s);let i=n?e(n):void 0;if(!i){let s={};const a=null==(r=this.options.routeMasks)?void 0:r.find((t=>{const e=(0,B.WN)(this.basepath,o.pathname,{to:t.from,caseSensitive:!1,fuzzy:!1});return!!e&&(s=e,!0)}));if(a){const{from:r,...o}=a;n={...(0,$.Up)(t,["from"]),...o,params:s},i=e(n)}}const a=this.getMatchedRoutes(o,s),c=e(s,a);if(i){const t=this.getMatchedRoutes(i,n),s=e(n,t);c.maskedLocation=s}return c};return t.mask?s(t,{...(0,$.Up)(t,["from"]),...t.mask}):s(t)},this.commitLocation=({viewTransition:t,ignoreBlocker:e,...s})=>{const n=this.latestLocation.href===s.href,r=this.commitLocationPromise;if(this.commitLocationPromise=(0,$.Su)((()=>{null==r||r.resolve()})),n&&(()=>{s.state.key=this.latestLocation.state.key;const t=(0,$.bD)(s.state,this.latestLocation.state);return delete s.state.key,t})())this.load();else{let{maskedLocation:n,hashScrollIntoView:r,...o}=s;n&&(o={...n,state:{...n.state,__tempKey:void 0,__tempLocation:{...o,search:o.searchStr,state:{...o.state,__tempKey:void 0,__tempLocation:void 0,key:void 0}}}},(o.unmaskOnReload??this.options.unmaskOnReload)&&(o.state.__tempKey=this.tempLocationKey)),o.state.__hashScrollIntoViewOptions=r??this.options.defaultHashScrollIntoView??!0,this.shouldViewTransition=t,this.history[s.replace?"replace":"push"](o.href,o.state,{ignoreBlocker:e})}return this.resetNextScroll=s.resetScroll??!0,this.history.subscribers.size||this.load(),this.commitLocationPromise},this.buildAndCommitLocation=({replace:t,resetScroll:e,hashScrollIntoView:s,viewTransition:n,ignoreBlocker:r,href:o,...i}={})=>{if(o){const e=this.history.location.state.__TSR_index,s=C(o,{__TSR_index:t?e:e+1});i.to=s.pathname,i.search=this.options.parseSearch(s.search),i.hash=s.hash.slice(1)}const a=this.buildLocation({...i,_includeValidateSearch:!0});return this.commitLocation({...a,viewTransition:n,replace:t,resetScroll:e,hashScrollIntoView:s,ignoreBlocker:r})},this.navigate=({to:t,reloadDocument:e,href:s,...n})=>{if(!e)return this.buildAndCommitLocation({...n,href:s,to:t});s||(s=this.buildLocation({to:t,...n}).href),n.replace?window.location.replace(s):window.location.href=s},this.load=async t=>{let e,s,n;for(this.latestLocation=this.parseLocation(this.latestLocation),n=new Promise((r=>{this.startReactTransition((async()=>{var o;try{const e=this.latestLocation,s=this.state.resolvedLocation;let n;this.cancelMatches(),T((()=>{n=this.matchRoutes(e),this.__store.setState((t=>({...t,status:"pending",isLoading:!0,location:e,pendingMatches:n,cachedMatches:t.cachedMatches.filter((t=>!n.find((e=>e.id===t.id))))})))})),this.state.redirect||this.emit({type:"onBeforeNavigate",...(0,H.C)({resolvedLocation:s,location:e})}),this.emit({type:"onBeforeLoad",...(0,H.C)({resolvedLocation:s,location:e})}),await this.loadMatches({sync:null==t?void 0:t.sync,matches:n,location:e,onReady:async()=>{this.startViewTransition((async()=>{let t,e,s;T((()=>{this.__store.setState((n=>{const r=n.matches,o=n.pendingMatches||n.matches;return t=r.filter((t=>!o.find((e=>e.id===t.id)))),e=o.filter((t=>!r.find((e=>e.id===t.id)))),s=r.filter((t=>o.find((e=>e.id===t.id)))),{...n,isLoading:!1,loadedAt:Date.now(),matches:o,pendingMatches:void 0,cachedMatches:[...n.cachedMatches,...t.filter((t=>"error"!==t.status))]}})),this.clearExpiredCache()})),[[t,"onLeave"],[e,"onEnter"],[s,"onStay"]].forEach((([t,e])=>{t.forEach((t=>{var s,n;null==(n=(s=this.looseRoutesById[t.routeId].options)[e])||n.call(s,t)}))}))}))}})}catch(t){(0,W.PN)(t)?(e=t,this.isServer||this.navigate({...e,replace:!0,ignoreBlocker:!0})):(0,G.c4)(t)&&(s=t),this.__store.setState((t=>({...t,statusCode:e?e.statusCode:s?404:t.matches.some((t=>"error"===t.status))?500:200,redirect:e})))}this.latestLoadPromise===n&&(null==(o=this.commitLocationPromise)||o.resolve(),this.latestLoadPromise=void 0,this.commitLocationPromise=void 0),r()}))})),this.latestLoadPromise=n,await n;this.latestLoadPromise&&n!==this.latestLoadPromise;)await this.latestLoadPromise},this.startViewTransition=t=>{const e=this.shouldViewTransition??this.options.defaultViewTransition;if(delete this.shouldViewTransition,e&&"undefined"!=typeof document&&"startViewTransition"in document&&"function"==typeof document.startViewTransition){let s;s="object"==typeof e&&this.isViewTransitionTypesSupported?{update:t,types:e.types}:t,document.startViewTransition(s)}else t()},this.updateMatch=(t,e)=>{var s;let n;const r=null==(s=this.state.pendingMatches)?void 0:s.find((e=>e.id===t)),o=this.state.matches.find((e=>e.id===t)),i=this.state.cachedMatches.find((e=>e.id===t)),a=r?"pendingMatches":o?"matches":i?"cachedMatches":"";return a&&this.__store.setState((s=>{var r;return{...s,[a]:null==(r=s[a])?void 0:r.map((s=>s.id===t?n=e(s):s))}})),n},this.getMatch=t=>[...this.state.cachedMatches,...this.state.pendingMatches??[],...this.state.matches].find((e=>e.id===t)),this.loadMatches=async({location:t,matches:e,preload:s,onReady:n,updateMatch:r=this.updateMatch,sync:o})=>{let i,a=!1;const c=async()=>{a||(a=!0,await(null==n?void 0:n()))},u=t=>!(!s||this.state.matches.find((e=>e.id===t)));this.isServer||this.state.matches.length||c();const l=(s,n)=>{var o,i,c,u;if((0,W.PN)(n)&&!n.reloadDocument)throw n;if((0,W.N6)(n)||(0,G.c4)(n)){if(r(s.id,(t=>({...t,status:(0,W.N6)(n)?"redirected":(0,G.c4)(n)?"notFound":"error",isFetching:!1,error:n,beforeLoadPromise:void 0,loaderPromise:void 0}))),n.routeId||(n.routeId=s.routeId),null==(o=s.beforeLoadPromise)||o.resolve(),null==(i=s.loaderPromise)||i.resolve(),null==(c=s.loadPromise)||c.resolve(),(0,W.N6)(n))throw a=!0,n=this.resolveRedirect({...n,_fromLocation:t});if((0,G.c4)(n))throw this._handleNotFound(e,n,{updateMatch:r}),null==(u=this.serverSsr)||u.onMatchSettled({router:this,match:this.getMatch(s.id)}),n}};try{await new Promise(((s,a)=>{(async()=>{var h,d,p;try{const a=(t,s,n)=>{var o,a;const{id:c,routeId:u}=e[t],h=this.looseRoutesById[u];if(s instanceof Promise)throw s;s.routerCode=n,i=i??t,l(this.getMatch(c),s);try{null==(a=(o=h.options).onError)||a.call(o,s)}catch(t){s=t,l(this.getMatch(c),s)}r(c,(t=>{var e,n;return null==(e=t.beforeLoadPromise)||e.resolve(),null==(n=t.loadPromise)||n.resolve(),{...t,error:s,status:"error",isFetching:!1,updatedAt:Date.now(),abortController:new AbortController,beforeLoadPromise:void 0}}))};for(const[s,{id:o,routeId:i}]of e.entries()){const l=this.getMatch(o),f=null==(h=e[s-1])?void 0:h.id,m=this.looseRoutesById[i],v=m.options.pendingMs??this.options.defaultPendingMs,y=!(!n||this.isServer||u(o)||!m.options.loader&&!m.options.beforeLoad||"number"!=typeof v||v===1/0||!(m.options.pendingComponent??this.options.defaultPendingComponent));let g=!0;if((l.beforeLoadPromise||l.loaderPromise)&&(y&&setTimeout((()=>{try{c()}catch{}}),v),await l.beforeLoadPromise,g="success"!==this.getMatch(o).status),g){try{r(o,(t=>({...t,loadPromise:(0,$.Su)((()=>{var e;null==(e=t.loadPromise)||e.resolve()})),beforeLoadPromise:(0,$.Su)()})));const n=new AbortController;let i;y&&(i=setTimeout((()=>{try{c()}catch{}}),v));const{paramsError:l,searchError:h}=this.getMatch(o);l&&a(s,l,"PARSE_PARAMS"),h&&a(s,h,"VALIDATE_SEARCH");const g=()=>f?this.getMatch(f).context:this.options.context??{};r(o,(t=>({...t,isFetching:"beforeLoad",fetchCount:t.fetchCount+1,abortController:n,pendingTimeout:i,context:{...g(),...t.__routeContext}})));const{search:b,params:S,context:w,cause:C}=this.getMatch(o),R=u(o),_={search:b,abortController:n,params:S,preload:R,context:w,location:t,navigate:e=>this.navigate({...e,_fromLocation:t}),buildLocation:this.buildLocation,cause:R?"preload":C,matches:e},P=await(null==(p=(d=m.options).beforeLoad)?void 0:p.call(d,_))??{};((0,W.N6)(P)||(0,G.c4)(P))&&a(s,P,"BEFORE_LOAD"),r(o,(t=>({...t,__beforeLoadContext:P,context:{...g(),...t.__routeContext,...P},abortController:n})))}catch(t){a(s,t,"BEFORE_LOAD")}r(o,(t=>{var e;return null==(e=t.beforeLoadPromise)||e.resolve(),{...t,beforeLoadPromise:void 0,isFetching:!1}}))}}const f=e.slice(0,i),m=[];f.forEach((({id:s,routeId:n},i)=>{m.push((async()=>{const{loaderPromise:a}=this.getMatch(s);let c=!1,h=!1;if(a){await a;const t=this.getMatch(s);t.error&&l(t,t.error)}else{const a=m[i-1],d=this.looseRoutesById[n],p=()=>{const{params:e,loaderDeps:n,abortController:r,context:o,cause:i}=this.getMatch(s),c=u(s);return{params:e,deps:n,preload:!!c,parentMatchPromise:a,abortController:r,context:o,location:t,navigate:e=>this.navigate({...e,_fromLocation:t}),cause:c?"preload":i,route:d}},f=Date.now()-this.getMatch(s).updatedAt,v=u(s),y=v?d.options.preloadStaleTime??this.options.defaultPreloadStaleTime??3e4:d.options.staleTime??this.options.defaultStaleTime??0,g=d.options.shouldReload,b="function"==typeof g?g(p()):g;r(s,(t=>({...t,loaderPromise:(0,$.Su)(),preload:!!v&&!this.state.matches.find((t=>t.id===s))})));const S=async()=>{var t,n,o,i,a,c,u,h,f;try{const m=async()=>{const t=this.getMatch(s);t.minPendingPromise&&await t.minPendingPromise};try{this.loadRouteChunk(d),r(s,(t=>({...t,isFetching:"loader"})));const u=await(null==(n=(t=d.options).loader)?void 0:n.call(t,p()));l(this.getMatch(s),u),await d._lazyPromise,await m();const h=null==(i=(o=d.options).head)?void 0:i.call(o,{matches:e,match:this.getMatch(s),params:this.getMatch(s).params,loaderData:u}),f=null==h?void 0:h.meta,v=null==h?void 0:h.links,y=null==h?void 0:h.scripts,g=null==(c=(a=d.options).headers)?void 0:c.call(a,{loaderData:u});r(s,(t=>({...t,error:void 0,status:"success",isFetching:!1,updatedAt:Date.now(),loaderData:u,meta:f,links:v,scripts:y,headers:g})))}catch(t){let e=t;await m(),l(this.getMatch(s),t);try{null==(h=(u=d.options).onError)||h.call(u,t)}catch(t){e=t,l(this.getMatch(s),t)}r(s,(t=>({...t,error:e,status:"error",isFetching:!1})))}null==(f=this.serverSsr)||f.onMatchSettled({router:this,match:this.getMatch(s)}),await d._componentsPromise}catch(t){r(s,(t=>({...t,loaderPromise:void 0}))),l(this.getMatch(s),t)}},{status:w,invalid:C}=this.getMatch(s);c="success"===w&&(C||(b??f>y)),v&&!1===d.options.preload||(c&&!o?(h=!0,(async()=>{try{await S();const{loaderPromise:t,loadPromise:e}=this.getMatch(s);null==t||t.resolve(),null==e||e.resolve(),r(s,(t=>({...t,loaderPromise:void 0})))}catch(t){(0,W.PN)(t)&&await this.navigate(t)}})()):("success"!==w||c&&o)&&await S())}if(!h){const{loaderPromise:t,loadPromise:e}=this.getMatch(s);null==t||t.resolve(),null==e||e.resolve()}return r(s,(t=>({...t,isFetching:!!h&&t.isFetching,loaderPromise:h?t.loaderPromise:void 0,invalid:!1}))),this.getMatch(s)})())})),await Promise.all(m),s()}catch(t){a(t)}})()})),await c()}catch(t){if((0,W.N6)(t)||(0,G.c4)(t))throw(0,G.c4)(t)&&!s&&await c(),t}return e},this.invalidate=t=>{const e=e=>{var s;return(null==(s=null==t?void 0:t.filter)?void 0:s.call(t,e))??1?{...e,invalid:!0,..."error"===e.status?{status:"pending",error:void 0}:{}}:e};return this.__store.setState((t=>{var s;return{...t,matches:t.matches.map(e),cachedMatches:t.cachedMatches.map(e),pendingMatches:null==(s=t.pendingMatches)?void 0:s.map(e)}})),this.load({sync:null==t?void 0:t.sync})},this.resolveRedirect=t=>{const e=t;return e.href||(e.href=this.buildLocation(e).href),e},this.clearCache=t=>{const e=null==t?void 0:t.filter;void 0!==e?this.__store.setState((t=>({...t,cachedMatches:t.cachedMatches.filter((t=>!e(t)))}))):this.__store.setState((t=>({...t,cachedMatches:[]})))},this.clearExpiredCache=()=>{this.clearCache({filter:t=>{const e=this.looseRoutesById[t.routeId];if(!e.options.loader)return!0;const s=(t.preload?e.options.preloadGcTime??this.options.defaultPreloadGcTime:e.options.gcTime??this.options.defaultGcTime)??3e5;return!("error"!==t.status&&Date.now()-t.updatedAt<s)}})},this.loadRouteChunk=t=>(void 0===t._lazyPromise&&(t.lazyFn?t._lazyPromise=t.lazyFn().then((e=>{const{id:s,...n}=e.options;Object.assign(t.options,n)})):t._lazyPromise=Promise.resolve()),void 0===t._componentsPromise&&(t._componentsPromise=t._lazyPromise.then((()=>Promise.all(J.map((async e=>{const s=t.options[e];(null==s?void 0:s.preload)&&await s.preload()})))))),t._componentsPromise),this.preloadRoute=async t=>{const e=this.buildLocation(t);let s=this.matchRoutes(e,{throwOnError:!0,preload:!0,dest:t});const n=new Set([...this.state.matches,...this.state.pendingMatches??[]].map((t=>t.id))),r=new Set([...n,...this.state.cachedMatches.map((t=>t.id))]);T((()=>{s.forEach((t=>{r.has(t.id)||this.__store.setState((e=>({...e,cachedMatches:[...e.cachedMatches,t]})))}))}));try{return s=await this.loadMatches({matches:s,location:e,preload:!0,updateMatch:(t,e)=>{n.has(t)?s=s.map((s=>s.id===t?e(s):s)):this.updateMatch(t,e)}}),s}catch(t){if((0,W.N6)(t)){if(t.reloadDocument)return;return await this.preloadRoute({...t,_fromLocation:e})}return void((0,G.c4)(t)||console.error(t))}},this.matchRoute=(t,e)=>{const s={...t,to:t.to?this.resolvePathWithBase(t.from||"",t.to):void 0,params:t.params||{},leaveParams:!0},n=this.buildLocation(s);if((null==e?void 0:e.pending)&&"pending"!==this.state.status)return!1;const r=(void 0===(null==e?void 0:e.pending)?!this.state.isLoading:e.pending)?this.latestLocation:this.state.resolvedLocation||this.state.location,o=(0,B.WN)(this.basepath,r.pathname,{...e,to:n.pathname});return!!o&&!(t.params&&!(0,$.bD)(o,t.params,{partial:!0}))&&(o&&((null==e?void 0:e.includeSearch)??1)?!!(0,$.bD)(r.search,n.search,{partial:!0})&&o:o)},this._handleNotFound=(t,e,{updateMatch:s=this.updateMatch}={})=>{const n=Object.fromEntries(t.map((t=>[t.routeId,t])));let r=(e.global?this.looseRoutesById[K.n]:this.looseRoutesById[e.routeId])||this.looseRoutesById[K.n];for(;!r.options.notFoundComponent&&!this.options.defaultNotFoundComponent&&r.id!==K.n;)r=r.parentRoute,(0,N.A)(r,"Found invalid route tree while trying to find not-found handler.");const o=n[r.id];(0,N.A)(o,"Could not find match for route: "+r.id),s(o.id,(t=>({...t,status:"notFound",error:e,isFetching:!1}))),"BEFORE_LOAD"===e.routerCode&&r.parentRoute&&(e.routeId=r.parentRoute.id,this._handleNotFound(t,e,{updateMatch:s}))},this.hasNotFoundMatch=()=>this.__store.state.matches.some((t=>"notFound"===t.status||t.globalNotFound)),this.update({defaultPreloadDelay:50,defaultPendingMs:1e3,defaultPendingMinMs:500,context:void 0,...t,caseSensitive:t.caseSensitive??!1,notFoundMode:t.notFoundMode??"fuzzy",stringifySearch:t.stringifySearch??z,parseSearch:t.parseSearch??U}),"undefined"!=typeof document&&(window.__TSR_ROUTER__=this)}get state(){return this.__store.state}get looseRoutesById(){return this.routesById}matchRoutes(t,e,s){return"string"==typeof t?this.matchRoutesInternal({pathname:t,search:e},s):this.matchRoutesInternal(t,e)}matchRoutesInternal(t,e){const{foundRoute:s,matchedRoutes:n,routeParams:r}=this.getMatchedRoutes(t,null==e?void 0:e.dest);let o=!1;(s?"/"!==s.path&&r["**"]:(0,B.gx)(t.pathname))&&(this.options.notFoundRoute?n.push(this.options.notFoundRoute):o=!0);const i=(()=>{if(o){if("root"!==this.options.notFoundMode)for(let t=n.length-1;t>=0;t--){const e=n[t];if(e.children)return e.id}return K.n}})(),a=n.map((t=>{var s;let n;const o=(null==(s=t.options.params)?void 0:s.parse)??t.options.parseParams;if(o)try{const t=o(r);Object.assign(r,t)}catch(t){if(n=new tt(t.message,{cause:t}),null==e?void 0:e.throwOnError)throw n;return n}})),c=[],u=t=>(null==t?void 0:t.id)?t.context??this.options.context??{}:this.options.context??{};return n.forEach(((s,n)=>{var o,l,h,d;const p=c[n-1],[f,m,v]=(()=>{const n=(null==p?void 0:p.search)??t.search,r=(null==p?void 0:p._strictSearch)??{};try{const t=X(s.options.validateSearch,{...n})??{};return[{...n,...t},{...r,...t},void 0]}catch(t){let s=t;if(t instanceof Y||(s=new Y(t.message,{cause:t})),null==e?void 0:e.throwOnError)throw s;return[n,{},s]}})(),y=(null==(l=(o=s.options).loaderDeps)?void 0:l.call(o,{search:f}))??"",g=y?JSON.stringify(y):"",{usedParams:b,interpolatedPath:S}=(0,B.xv)({path:s.fullPath,params:r,decodeCharMap:this.pathParamsDecodeCharMap}),w=(0,B.xv)({path:s.id,params:r,leaveWildcards:!0,decodeCharMap:this.pathParamsDecodeCharMap}).interpolatedPath+g,C=this.getMatch(w),R=this.state.matches.find((t=>t.routeId===s.id)),_=R?"stay":"enter";let P;if(C)P={...C,cause:_,params:R?(0,$.BH)(R.params,r):r,_strictParams:b,search:R?(0,$.BH)(R.search,f):(0,$.BH)(C.search,f),_strictSearch:m};else{const t=s.options.loader||s.options.beforeLoad||s.lazyFn||function(t){var e;for(const s of J)if(null==(e=t.options[s])?void 0:e.preload)return!0;return!1}(s)?"pending":"success";P={id:w,index:n,routeId:s.id,params:R?(0,$.BH)(R.params,r):r,_strictParams:b,pathname:(0,B.HS)([this.basepath,S]),updatedAt:Date.now(),search:R?(0,$.BH)(R.search,f):f,_strictSearch:m,searchError:void 0,status:t,isFetching:!1,error:void 0,paramsError:a[n],__routeContext:{},__beforeLoadContext:{},context:{},abortController:new AbortController,fetchCount:0,cause:_,loaderDeps:R?(0,$.BH)(R.loaderDeps,y):y,invalid:!1,preload:!1,links:void 0,scripts:void 0,meta:void 0,staticData:s.options.staticData||{},loadPromise:(0,$.Su)(),fullPath:s.fullPath}}"success"===P.status&&(P.headers=null==(d=(h=s.options).headers)?void 0:d.call(h,{loaderData:P.loaderData})),(null==e?void 0:e.preload)||(P.globalNotFound=i===s.id),P.searchError=v;const x=u(p);P.context={...x,...P.__routeContext,...P.__beforeLoadContext},c.push(P)})),c.forEach(((s,n)=>{var r,o,i,a;const l=this.looseRoutesById[s.routeId];if(!this.getMatch(s.id)&&!0!==(null==e?void 0:e._buildLocation)){const e=c[n-1],i=u(e),a={deps:s.loaderDeps,params:s.params,context:i,location:t,navigate:e=>this.navigate({...e,_fromLocation:t}),buildLocation:this.buildLocation,cause:s.cause,abortController:s.abortController,preload:!!s.preload,matches:c};s.__routeContext=(null==(o=(r=l.options).context)?void 0:o.call(r,a))??{},s.context={...i,...s.__routeContext,...s.__beforeLoadContext}}const h=null==(a=(i=l.options).head)?void 0:a.call(i,{matches:c,match:s,params:s.params,loaderData:s.loaderData??void 0});s.links=null==h?void 0:h.links,s.scripts=null==h?void 0:h.scripts,s.meta=null==h?void 0:h.meta})),c}}({routeTree:Kt,notFoundRoute:zt,context:{queryClient:Qt},history:Ht,defaultPreload:"intent",defaultPreloadStaleTime:0});React.lazy((()=>i.e(184).then(i.bind(i,6184)).then((t=>({default:t.ReactQueryDevtools}))))),document.addEventListener("DOMContentLoaded",(()=>{const e=document.getElementById("simplybook_app");e&&(Ut.defaultOptions.queries.suspense=!1,(0,t.createRoot)(e,{hydrate:!0,onRecoverableError:t=>{console.warn("Hydration error (usually harmless):",t)}}).render(React.createElement(React.StrictMode,null,React.createElement(m.Ht,{client:Qt},React.createElement(vt,{router:Wt}),!1))))}))})()})();
>>>>>>> origin/main
>>>>>>> feature/NL14RSP2-80-onboarding-step3-informationcheck
