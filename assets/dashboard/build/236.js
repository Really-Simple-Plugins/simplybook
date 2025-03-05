"use strict";(globalThis.webpackChunksimplybook_app=globalThis.webpackChunksimplybook_app||[]).push([[236],{1236:(e,t,s)=>{s.r(t),s.d(t,{TanStackRouterDevtools:()=>A,TanStackRouterDevtoolsPanel:()=>P});var r=s(790),n=s(1609),i=s(8332),o=s(6847),a=s(7264),l=s(396),d=s(1561);let c={data:""},f=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||c,u=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,x=/\/\*[^]*?\*\/|  +/g,p=/\n+/g,h=(e,t)=>{let s="",r="",n="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?s=i+" "+o+";":r+="f"==i[1]?h(o,i):i+"{"+h(o,"k"==i[1]?"":t)+"}":"object"==typeof o?r+=h(o,t?t.replace(/([^,])+/g,(e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,(t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)))):i):null!=o&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),n+=h.p?h.p(i,o):i+":"+o+";")}return s+(t&&n?t+"{"+n+"}":n)+r},m={},g=e=>{if("object"==typeof e){let t="";for(let s in e)t+=s+g(e[s]);return t}return e},v=(e,t,s,r,n)=>{let i=g(e),o=m[i]||(m[i]=(e=>{let t=0,s=11;for(;t<e.length;)s=101*s+e.charCodeAt(t++)>>>0;return"go"+s})(i));if(!m[o]){let t=i!==e?e:(e=>{let t,s,r=[{}];for(;t=u.exec(e.replace(x,""));)t[4]?r.shift():t[3]?(s=t[3].replace(p," ").trim(),r.unshift(r[0][s]=r[0][s]||{})):r[0][t[1]]=t[2].replace(p," ").trim();return r[0]})(e);m[o]=h(n?{["@keyframes "+o]:t}:t,s?"":"."+o)}let a=s&&m.g?m.g:null;return s&&(m.g=m[o]),((e,t,s,r)=>{r?t.data=t.data.replace(r,e):-1===t.data.indexOf(e)&&(t.data=s?e+t.data:t.data+e)})(m[o],t,r,a),o};function j(e){let t=this||{},s=e.call?e(t.p):e;return v(s.unshift?s.raw?((e,t,s)=>e.reduce(((e,r,n)=>{let i=t[n];if(i&&i.call){let e=i(s),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":h(e,""):!1===e?"":e}return e+r+(null==i?"":i)}),""))(s,[].slice.call(arguments,1),t.p):s.reduce(((e,s)=>Object.assign(e,s&&s.call?s(t.p):s)),{}):s,f(t.target),t.g,t.o,t.k)}j.bind({g:1}),j.bind({k:1});var $=s(4164);const y=e=>{try{const t=localStorage.getItem(e);return"string"==typeof t?JSON.parse(t):void 0}catch{return}};function b(e,t){const[s,r]=n.useState();return n.useEffect((()=>{const s=y(e);r(null==s?"function"==typeof t?t():t:s)}),[t,e]),[s,n.useCallback((t=>{r((s=>{let r=t;"function"==typeof t&&(r=t(s));try{localStorage.setItem(e,JSON.stringify(r))}catch{}return r}))}),[e])]}const k="undefined"==typeof window;function C(e){return e.isFetching&&"success"===e.status?"beforeLoad"===e.isFetching?"purple":"blue":{pending:"yellow",success:"green",error:"red",notFound:"purple",redirected:"gray"}[e.status]}function w(e,t){const s=e.find((e=>e.routeId===t.id));return s?C(s):"gray"}function z(){const[e,t]=n.useState(!1);return n[k?"useEffect":"useLayoutEffect"]((()=>{t(!0)}),[]),e}const F=e=>{const t=Object.getOwnPropertyNames(Object(e)),s="bigint"==typeof e?`${e.toString()}n`:e;try{return JSON.stringify(s,t)}catch(e){return"unable to stringify"}};function R(e){const t=z(),[s,r]=n.useState(e);return[s,n.useCallback((e=>{var s;s=()=>{t&&r(e)},Promise.resolve().then(s).catch((e=>setTimeout((()=>{throw e}))))}),[t])]}function N(e,t=[e=>e]){return e.map(((e,t)=>[e,t])).sort((([e,s],[r,n])=>{for(const s of t){const t=s(e),n=s(r);if(void 0===t){if(void 0===n)continue;return 1}if(t!==n)return t>n?1:-1}return s-n})).map((([e])=>e))}const S={colors:{inherit:"inherit",current:"currentColor",transparent:"transparent",black:"#000000",white:"#ffffff",neutral:{50:"#f9fafb",100:"#f2f4f7",200:"#eaecf0",300:"#d0d5dd",400:"#98a2b3",500:"#667085",600:"#475467",700:"#344054",800:"#1d2939",900:"#101828"},darkGray:{50:"#525c7a",100:"#49536e",200:"#414962",300:"#394056",400:"#313749",500:"#292e3d",600:"#212530",700:"#191c24",800:"#111318",900:"#0b0d10"},gray:{50:"#f9fafb",100:"#f2f4f7",200:"#eaecf0",300:"#d0d5dd",400:"#98a2b3",500:"#667085",600:"#475467",700:"#344054",800:"#1d2939",900:"#101828"},blue:{25:"#F5FAFF",50:"#EFF8FF",100:"#D1E9FF",200:"#B2DDFF",300:"#84CAFF",400:"#53B1FD",500:"#2E90FA",600:"#1570EF",700:"#175CD3",800:"#1849A9",900:"#194185"},green:{25:"#F6FEF9",50:"#ECFDF3",100:"#D1FADF",200:"#A6F4C5",300:"#6CE9A6",400:"#32D583",500:"#12B76A",600:"#039855",700:"#027A48",800:"#05603A",900:"#054F31"},red:{50:"#fef2f2",100:"#fee2e2",200:"#fecaca",300:"#fca5a5",400:"#f87171",500:"#ef4444",600:"#dc2626",700:"#b91c1c",800:"#991b1b",900:"#7f1d1d",950:"#450a0a"},yellow:{25:"#FFFCF5",50:"#FFFAEB",100:"#FEF0C7",200:"#FEDF89",300:"#FEC84B",400:"#FDB022",500:"#F79009",600:"#DC6803",700:"#B54708",800:"#93370D",900:"#7A2E0E"},purple:{25:"#FAFAFF",50:"#F4F3FF",100:"#EBE9FE",200:"#D9D6FE",300:"#BDB4FE",400:"#9B8AFB",500:"#7A5AF8",600:"#6938EF",700:"#5925DC",800:"#4A1FB8",900:"#3E1C96"},teal:{25:"#F6FEFC",50:"#F0FDF9",100:"#CCFBEF",200:"#99F6E0",300:"#5FE9D0",400:"#2ED3B7",500:"#15B79E",600:"#0E9384",700:"#107569",800:"#125D56",900:"#134E48"},pink:{25:"#fdf2f8",50:"#fce7f3",100:"#fbcfe8",200:"#f9a8d4",300:"#f472b6",400:"#ec4899",500:"#db2777",600:"#be185d",700:"#9d174d",800:"#831843",900:"#500724"},cyan:{25:"#ecfeff",50:"#cffafe",100:"#a5f3fc",200:"#67e8f9",300:"#22d3ee",400:"#06b6d4",500:"#0891b2",600:"#0e7490",700:"#155e75",800:"#164e63",900:"#083344"}},alpha:{100:"ff",90:"e5",80:"cc",70:"b3",60:"99",50:"80",40:"66",30:"4d",20:"33",10:"1a",0:"00"},font:{size:{"2xs":"calc(var(--tsrd-font-size) * 0.625)",xs:"calc(var(--tsrd-font-size) * 0.75)",sm:"calc(var(--tsrd-font-size) * 0.875)",md:"var(--tsrd-font-size)",lg:"calc(var(--tsrd-font-size) * 1.125)",xl:"calc(var(--tsrd-font-size) * 1.25)","2xl":"calc(var(--tsrd-font-size) * 1.5)","3xl":"calc(var(--tsrd-font-size) * 1.875)","4xl":"calc(var(--tsrd-font-size) * 2.25)","5xl":"calc(var(--tsrd-font-size) * 3)","6xl":"calc(var(--tsrd-font-size) * 3.75)","7xl":"calc(var(--tsrd-font-size) * 4.5)","8xl":"calc(var(--tsrd-font-size) * 6)","9xl":"calc(var(--tsrd-font-size) * 8)"},lineHeight:{"3xs":"calc(var(--tsrd-font-size) * 0.75)","2xs":"calc(var(--tsrd-font-size) * 0.875)",xs:"calc(var(--tsrd-font-size) * 1)",sm:"calc(var(--tsrd-font-size) * 1.25)",md:"calc(var(--tsrd-font-size) * 1.5)",lg:"calc(var(--tsrd-font-size) * 1.75)",xl:"calc(var(--tsrd-font-size) * 2)","2xl":"calc(var(--tsrd-font-size) * 2.25)","3xl":"calc(var(--tsrd-font-size) * 2.5)","4xl":"calc(var(--tsrd-font-size) * 2.75)","5xl":"calc(var(--tsrd-font-size) * 3)","6xl":"calc(var(--tsrd-font-size) * 3.25)","7xl":"calc(var(--tsrd-font-size) * 3.5)","8xl":"calc(var(--tsrd-font-size) * 3.75)","9xl":"calc(var(--tsrd-font-size) * 4)"},weight:{thin:"100",extralight:"200",light:"300",normal:"400",medium:"500",semibold:"600",bold:"700",extrabold:"800",black:"900"},fontFamily:{sans:"ui-sans-serif, Inter, system-ui, sans-serif, sans-serif",mono:"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"}},breakpoints:{xs:"320px",sm:"640px",md:"768px",lg:"1024px",xl:"1280px","2xl":"1536px"},border:{radius:{none:"0px",xs:"calc(var(--tsrd-font-size) * 0.125)",sm:"calc(var(--tsrd-font-size) * 0.25)",md:"calc(var(--tsrd-font-size) * 0.375)",lg:"calc(var(--tsrd-font-size) * 0.5)",xl:"calc(var(--tsrd-font-size) * 0.75)","2xl":"calc(var(--tsrd-font-size) * 1)","3xl":"calc(var(--tsrd-font-size) * 1.5)",full:"9999px"}},size:{0:"0px",.25:"calc(var(--tsrd-font-size) * 0.0625)",.5:"calc(var(--tsrd-font-size) * 0.125)",1:"calc(var(--tsrd-font-size) * 0.25)",1.5:"calc(var(--tsrd-font-size) * 0.375)",2:"calc(var(--tsrd-font-size) * 0.5)",2.5:"calc(var(--tsrd-font-size) * 0.625)",3:"calc(var(--tsrd-font-size) * 0.75)",3.5:"calc(var(--tsrd-font-size) * 0.875)",4:"calc(var(--tsrd-font-size) * 1)",4.5:"calc(var(--tsrd-font-size) * 1.125)",5:"calc(var(--tsrd-font-size) * 1.25)",5.5:"calc(var(--tsrd-font-size) * 1.375)",6:"calc(var(--tsrd-font-size) * 1.5)",6.5:"calc(var(--tsrd-font-size) * 1.625)",7:"calc(var(--tsrd-font-size) * 1.75)",8:"calc(var(--tsrd-font-size) * 2)",9:"calc(var(--tsrd-font-size) * 2.25)",10:"calc(var(--tsrd-font-size) * 2.5)",11:"calc(var(--tsrd-font-size) * 2.75)",12:"calc(var(--tsrd-font-size) * 3)",14:"calc(var(--tsrd-font-size) * 3.5)",16:"calc(var(--tsrd-font-size) * 4)",20:"calc(var(--tsrd-font-size) * 5)",24:"calc(var(--tsrd-font-size) * 6)",28:"calc(var(--tsrd-font-size) * 7)",32:"calc(var(--tsrd-font-size) * 8)",36:"calc(var(--tsrd-font-size) * 9)",40:"calc(var(--tsrd-font-size) * 10)",44:"calc(var(--tsrd-font-size) * 11)",48:"calc(var(--tsrd-font-size) * 12)",52:"calc(var(--tsrd-font-size) * 13)",56:"calc(var(--tsrd-font-size) * 14)",60:"calc(var(--tsrd-font-size) * 15)",64:"calc(var(--tsrd-font-size) * 16)",72:"calc(var(--tsrd-font-size) * 18)",80:"calc(var(--tsrd-font-size) * 20)",96:"calc(var(--tsrd-font-size) * 24)"},shadow:{xs:(e="rgb(0 0 0 / 0.1)")=>"0 1px 2px 0 rgb(0 0 0 / 0.05)",sm:(e="rgb(0 0 0 / 0.1)")=>`0 1px 3px 0 ${e}, 0 1px 2px -1px ${e}`,md:(e="rgb(0 0 0 / 0.1)")=>`0 4px 6px -1px ${e}, 0 2px 4px -2px ${e}`,lg:(e="rgb(0 0 0 / 0.1)")=>`0 10px 15px -3px ${e}, 0 4px 6px -4px ${e}`,xl:(e="rgb(0 0 0 / 0.1)")=>`0 20px 25px -5px ${e}, 0 8px 10px -6px ${e}`,"2xl":(e="rgb(0 0 0 / 0.25)")=>`0 25px 50px -12px ${e}`,inner:(e="rgb(0 0 0 / 0.05)")=>`inset 0 2px 4px 0 ${e}`,none:()=>"none"},zIndices:{hide:-1,auto:"auto",base:0,docked:10,dropdown:1e3,sticky:1100,banner:1200,overlay:1300,modal:1400,popover:1500,skipLink:1600,toast:1700,tooltip:1800}},E=n.createContext(void 0),U=n.createContext(void 0),D=({expanded:e,style:t={}})=>{const s=L();return(0,r.jsx)("span",{className:s.expander,children:(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"12",height:"12",fill:"none",viewBox:"0 0 24 24",className:(0,$.$)(s.expanderIcon(e)),children:(0,r.jsx)("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M9 18l6-6-6-6"})})})},O=({handleEntry:e,label:t,value:s,subEntries:i=[],subEntryPages:o=[],type:a,expanded:l=!1,toggleExpanded:d,pageSize:c,renderer:f})=>{const[u,x]=n.useState([]),[p,h]=n.useState(void 0),m=L();return(0,r.jsx)("div",{className:m.entry,children:o.length?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("button",{className:m.expandButton,onClick:()=>d(),children:[(0,r.jsx)(D,{expanded:l}),t,(0,r.jsxs)("span",{className:m.info,children:["iterable"===String(a).toLowerCase()?"(Iterable) ":"",i.length," ",i.length>1?"items":"item"]})]}),l?1===o.length?(0,r.jsx)("div",{className:m.subEntries,children:i.map(((t,s)=>e(t)))}):(0,r.jsx)("div",{className:m.subEntries,children:o.map(((t,s)=>(0,r.jsx)("div",{children:(0,r.jsxs)("div",{className:m.entry,children:[(0,r.jsxs)("button",{className:(0,$.$)(m.labelButton,"labelButton"),onClick:()=>x((e=>e.includes(s)?e.filter((e=>e!==s)):[...e,s])),children:[(0,r.jsx)(D,{expanded:u.includes(s)})," ","[",s*c," ..."," ",s*c+c-1,"]"]}),u.includes(s)?(0,r.jsx)("div",{className:m.subEntries,children:t.map((t=>e(t)))}):null]})},s)))}):null]}):"function"===a?(0,r.jsx)(r.Fragment,{children:(0,r.jsx)(B,{renderer:f,label:(0,r.jsxs)("button",{onClick:()=>{h(s())},className:m.refreshValueBtn,children:[(0,r.jsx)("span",{children:t})," 🔄"," "]}),value:p,defaultExpanded:{}})}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("span",{children:[t,":"]})," ",(0,r.jsx)("span",{className:m.value,children:F(s)})]})})};function B({value:e,defaultExpanded:t,renderer:s=O,pageSize:i=100,filterSubEntries:o,...a}){const[l,d]=n.useState(Boolean(t)),c=n.useCallback((()=>d((e=>!e))),[]);let f=typeof e,u=[];const x=e=>{const s=!0===t?{[e.label]:!0}:null==t?void 0:t[e.label];return{...e,defaultExpanded:s}};var p;Array.isArray(e)?(f="array",u=e.map(((e,t)=>x({label:t.toString(),value:e})))):null!==e&&"object"==typeof e&&(p=e,Symbol.iterator in p)&&"function"==typeof e[Symbol.iterator]?(f="Iterable",u=Array.from(e,((e,t)=>x({label:t.toString(),value:e})))):"object"==typeof e&&null!==e&&(f="object",u=Object.entries(e).map((([e,t])=>x({label:e,value:t})))),u=o?o(u):u;const h=function(e,t){if(t<1)return[];let s=0;const r=[];for(;s<e.length;)r.push(e.slice(s,s+t)),s+=t;return r}(u,i);return s({handleEntry:t=>(0,r.jsx)(B,{value:e,renderer:s,filterSubEntries:o,...a,...t},t.label),type:f,subEntries:u,subEntryPages:h,value:e,expanded:l,toggleExpanded:c,pageSize:i,...a})}const M=e=>{const{colors:t,font:s,size:r,alpha:n,shadow:i,border:o}=S,{fontFamily:a,lineHeight:l,size:d}=s,c=e?j.bind({target:e}):j;return{entry:c`
      font-family: ${a.mono};
      font-size: ${d.xs};
      line-height: ${l.sm};
      outline: none;
      word-break: break-word;
    `,labelButton:c`
      cursor: pointer;
      color: inherit;
      font: inherit;
      outline: inherit;
      background: transparent;
      border: none;
      padding: 0;
    `,expander:c`
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: ${r[3]};
      height: ${r[3]};
      padding-left: 3px;
      box-sizing: content-box;
    `,expanderIcon:e=>e?c`
          transform: rotate(90deg);
          transition: transform 0.1s ease;
        `:c`
        transform: rotate(0deg);
        transition: transform 0.1s ease;
      `,expandButton:c`
      display: flex;
      gap: ${r[1]};
      align-items: center;
      cursor: pointer;
      color: inherit;
      font: inherit;
      outline: inherit;
      background: transparent;
      border: none;
      padding: 0;
    `,value:c`
      color: ${t.purple[400]};
    `,subEntries:c`
      margin-left: ${r[2]};
      padding-left: ${r[2]};
      border-left: 2px solid ${t.darkGray[400]};
    `,info:c`
      color: ${t.gray[500]};
      font-size: ${d["2xs"]};
      padding-left: ${r[1]};
    `,refreshValueBtn:c`
      appearance: none;
      border: 0;
      cursor: pointer;
      background: transparent;
      color: inherit;
      padding: 0;
      font-family: ${a.mono};
      font-size: ${d.xs};
    `}};function L(){const e=n.useContext(E),[t]=n.useState((()=>M(e)));return t}function I(){const e=n.useId();return(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",enableBackground:"new 0 0 634 633",viewBox:"0 0 634 633",children:(0,r.jsxs)("g",{transform:"translate(1)",children:[(0,r.jsxs)("linearGradient",{id:`a-${e}`,x1:"-641.486",x2:"-641.486",y1:"856.648",y2:"855.931",gradientTransform:"matrix(633 0 0 -633 406377 542258)",gradientUnits:"userSpaceOnUse",children:[(0,r.jsx)("stop",{offset:"0",stopColor:"#6bdaff"}),(0,r.jsx)("stop",{offset:"0.319",stopColor:"#f9ffb5"}),(0,r.jsx)("stop",{offset:"0.706",stopColor:"#ffa770"}),(0,r.jsx)("stop",{offset:"1",stopColor:"#ff7373"})]}),(0,r.jsx)("circle",{cx:"316.5",cy:"316.5",r:"316.5",fill:`url(#a-${e})`,fillRule:"evenodd",clipRule:"evenodd"}),(0,r.jsx)("defs",{children:(0,r.jsx)("filter",{id:`b-${e}`,width:"454",height:"396.9",x:"-137.5",y:"412",filterUnits:"userSpaceOnUse",children:(0,r.jsx)("feColorMatrix",{values:"1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"})})}),(0,r.jsx)("mask",{id:`c-${e}`,width:"454",height:"396.9",x:"-137.5",y:"412",maskUnits:"userSpaceOnUse",children:(0,r.jsx)("g",{filter:`url(#b-${e})`,children:(0,r.jsx)("circle",{cx:"316.5",cy:"316.5",r:"316.5",fill:"#FFF",fillRule:"evenodd",clipRule:"evenodd"})})}),(0,r.jsx)("ellipse",{cx:"89.5",cy:"610.5",fill:"#015064",fillRule:"evenodd",stroke:"#00CFE2",strokeWidth:"25",clipRule:"evenodd",mask:`url(#c-${e})`,rx:"214.5",ry:"186"}),(0,r.jsx)("defs",{children:(0,r.jsx)("filter",{id:`d-${e}`,width:"454",height:"396.9",x:"316.5",y:"412",filterUnits:"userSpaceOnUse",children:(0,r.jsx)("feColorMatrix",{values:"1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"})})}),(0,r.jsx)("mask",{id:`e-${e}`,width:"454",height:"396.9",x:"316.5",y:"412",maskUnits:"userSpaceOnUse",children:(0,r.jsx)("g",{filter:`url(#d-${e})`,children:(0,r.jsx)("circle",{cx:"316.5",cy:"316.5",r:"316.5",fill:"#FFF",fillRule:"evenodd",clipRule:"evenodd"})})}),(0,r.jsx)("ellipse",{cx:"543.5",cy:"610.5",fill:"#015064",fillRule:"evenodd",stroke:"#00CFE2",strokeWidth:"25",clipRule:"evenodd",mask:`url(#e-${e})`,rx:"214.5",ry:"186"}),(0,r.jsx)("defs",{children:(0,r.jsx)("filter",{id:`f-${e}`,width:"454",height:"396.9",x:"-137.5",y:"450",filterUnits:"userSpaceOnUse",children:(0,r.jsx)("feColorMatrix",{values:"1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"})})}),(0,r.jsx)("mask",{id:`g-${e}`,width:"454",height:"396.9",x:"-137.5",y:"450",maskUnits:"userSpaceOnUse",children:(0,r.jsx)("g",{filter:`url(#f-${e})`,children:(0,r.jsx)("circle",{cx:"316.5",cy:"316.5",r:"316.5",fill:"#FFF",fillRule:"evenodd",clipRule:"evenodd"})})}),(0,r.jsx)("ellipse",{cx:"89.5",cy:"648.5",fill:"#015064",fillRule:"evenodd",stroke:"#00A8B8",strokeWidth:"25",clipRule:"evenodd",mask:`url(#g-${e})`,rx:"214.5",ry:"186"}),(0,r.jsx)("defs",{children:(0,r.jsx)("filter",{id:`h-${e}`,width:"454",height:"396.9",x:"316.5",y:"450",filterUnits:"userSpaceOnUse",children:(0,r.jsx)("feColorMatrix",{values:"1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"})})}),(0,r.jsx)("mask",{id:`i-${e}`,width:"454",height:"396.9",x:"316.5",y:"450",maskUnits:"userSpaceOnUse",children:(0,r.jsx)("g",{filter:`url(#h-${e})`,children:(0,r.jsx)("circle",{cx:"316.5",cy:"316.5",r:"316.5",fill:"#FFF",fillRule:"evenodd",clipRule:"evenodd"})})}),(0,r.jsx)("ellipse",{cx:"543.5",cy:"648.5",fill:"#015064",fillRule:"evenodd",stroke:"#00A8B8",strokeWidth:"25",clipRule:"evenodd",mask:`url(#i-${e})`,rx:"214.5",ry:"186"}),(0,r.jsx)("defs",{children:(0,r.jsx)("filter",{id:`j-${e}`,width:"454",height:"396.9",x:"-137.5",y:"486",filterUnits:"userSpaceOnUse",children:(0,r.jsx)("feColorMatrix",{values:"1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"})})}),(0,r.jsx)("mask",{id:`k-${e}`,width:"454",height:"396.9",x:"-137.5",y:"486",maskUnits:"userSpaceOnUse",children:(0,r.jsx)("g",{filter:`url(#j-${e})`,children:(0,r.jsx)("circle",{cx:"316.5",cy:"316.5",r:"316.5",fill:"#FFF",fillRule:"evenodd",clipRule:"evenodd"})})}),(0,r.jsx)("ellipse",{cx:"89.5",cy:"684.5",fill:"#015064",fillRule:"evenodd",stroke:"#007782",strokeWidth:"25",clipRule:"evenodd",mask:`url(#k-${e})`,rx:"214.5",ry:"186"}),(0,r.jsx)("defs",{children:(0,r.jsx)("filter",{id:`l-${e}`,width:"454",height:"396.9",x:"316.5",y:"486",filterUnits:"userSpaceOnUse",children:(0,r.jsx)("feColorMatrix",{values:"1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"})})}),(0,r.jsx)("mask",{id:`m-${e}`,width:"454",height:"396.9",x:"316.5",y:"486",maskUnits:"userSpaceOnUse",children:(0,r.jsx)("g",{filter:`url(#l-${e})`,children:(0,r.jsx)("circle",{cx:"316.5",cy:"316.5",r:"316.5",fill:"#FFF",fillRule:"evenodd",clipRule:"evenodd"})})}),(0,r.jsx)("ellipse",{cx:"543.5",cy:"684.5",fill:"#015064",fillRule:"evenodd",stroke:"#007782",strokeWidth:"25",clipRule:"evenodd",mask:`url(#m-${e})`,rx:"214.5",ry:"186"}),(0,r.jsx)("defs",{children:(0,r.jsx)("filter",{id:`n-${e}`,width:"176.9",height:"129.3",x:"272.2",y:"308",filterUnits:"userSpaceOnUse",children:(0,r.jsx)("feColorMatrix",{values:"1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"})})}),(0,r.jsx)("mask",{id:`o-${e}`,width:"176.9",height:"129.3",x:"272.2",y:"308",maskUnits:"userSpaceOnUse",children:(0,r.jsx)("g",{filter:`url(#n-${e})`,children:(0,r.jsx)("circle",{cx:"316.5",cy:"316.5",r:"316.5",fill:"#FFF",fillRule:"evenodd",clipRule:"evenodd"})})}),(0,r.jsxs)("g",{mask:`url(#o-${e})`,children:[(0,r.jsx)("path",{fill:"none",stroke:"#000",strokeLinecap:"round",strokeLinejoin:"bevel",strokeWidth:"11",d:"M436 403.2l-5 28.6m-140-90.3l-10.9 62m52.8-19.4l-4.3 27.1"}),(0,r.jsxs)("linearGradient",{id:`p-${e}`,x1:"-645.656",x2:"-646.499",y1:"854.878",y2:"854.788",gradientTransform:"matrix(-184.159 -32.4722 11.4608 -64.9973 -128419.844 34938.836)",gradientUnits:"userSpaceOnUse",children:[(0,r.jsx)("stop",{offset:"0",stopColor:"#ee2700"}),(0,r.jsx)("stop",{offset:"1",stopColor:"#ff008e"})]}),(0,r.jsx)("path",{fill:`url(#p-${e})`,fillRule:"evenodd",d:"M344.1 363l97.7 17.2c5.8 2.1 8.2 6.2 7.1 12.1-1 5.9-4.7 9.2-11 9.9l-106-18.7-57.5-59.2c-3.2-4.8-2.9-9.1.8-12.8 3.7-3.7 8.3-4.4 13.7-2.1l55.2 53.6z",clipRule:"evenodd"}),(0,r.jsx)("path",{fill:"#D8D8D8",fillRule:"evenodd",stroke:"#FFF",strokeLinecap:"round",strokeLinejoin:"bevel",strokeWidth:"7",d:"M428.3 384.5l.9-6.5m-33.9 1.5l.9-6.5m-34 .5l.9-6.1m-38.9-16.1l4.2-3.9m-25.2-16.1l4.2-3.9",clipRule:"evenodd"})]}),(0,r.jsx)("defs",{children:(0,r.jsx)("filter",{id:`q-${e}`,width:"280.6",height:"317.4",x:"73.2",y:"113.9",filterUnits:"userSpaceOnUse",children:(0,r.jsx)("feColorMatrix",{values:"1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"})})}),(0,r.jsx)("mask",{id:`r-${e}`,width:"280.6",height:"317.4",x:"73.2",y:"113.9",maskUnits:"userSpaceOnUse",children:(0,r.jsx)("g",{filter:`url(#q-${e})`,children:(0,r.jsx)("circle",{cx:"316.5",cy:"316.5",r:"316.5",fill:"#FFF",fillRule:"evenodd",clipRule:"evenodd"})})}),(0,r.jsxs)("g",{mask:`url(#r-${e})`,children:[(0,r.jsxs)("linearGradient",{id:`s-${e}`,x1:"-646.8",x2:"-646.8",y1:"854.844",y2:"853.844",gradientTransform:"matrix(-100.1751 48.8587 -97.9753 -200.879 19124.773 203538.61)",gradientUnits:"userSpaceOnUse",children:[(0,r.jsx)("stop",{offset:"0",stopColor:"#a17500"}),(0,r.jsx)("stop",{offset:"1",stopColor:"#5d2100"})]}),(0,r.jsx)("path",{fill:`url(#s-${e})`,fillRule:"evenodd",d:"M192.3 203c8.1 37.3 14 73.6 17.8 109.1 3.8 35.4 2.8 75.2-2.9 119.2l61.2-16.7c-15.6-59-25.2-97.9-28.6-116.6-3.4-18.7-10.8-51.8-22.2-99.6l-25.3 4.6",clipRule:"evenodd"}),(0,r.jsxs)("linearGradient",{id:`t-${e}`,x1:"-635.467",x2:"-635.467",y1:"852.115",y2:"851.115",gradientTransform:"matrix(92.6873 4.8575 2.0257 -38.6535 57323.695 36176.047)",gradientUnits:"userSpaceOnUse",children:[(0,r.jsx)("stop",{offset:"0",stopColor:"#2f8a00"}),(0,r.jsx)("stop",{offset:"1",stopColor:"#90ff57"})]}),(0,r.jsx)("path",{fill:`url(#t-${e})`,fillRule:"evenodd",stroke:"#2F8A00",strokeWidth:"13",d:"M195 183.9s-12.6-22.1-36.5-29.9c-15.9-5.2-34.4-1.5-55.5 11.1 15.9 14.3 29.5 22.6 40.7 24.9 16.8 3.6 51.3-6.1 51.3-6.1z",clipRule:"evenodd"}),(0,r.jsxs)("linearGradient",{id:`u-${e}`,x1:"-636.573",x2:"-636.573",y1:"855.444",y2:"854.444",gradientTransform:"matrix(109.9945 5.7646 6.3597 -121.3507 64719.133 107659.336)",gradientUnits:"userSpaceOnUse",children:[(0,r.jsx)("stop",{offset:"0",stopColor:"#2f8a00"}),(0,r.jsx)("stop",{offset:"1",stopColor:"#90ff57"})]}),(0,r.jsx)("path",{fill:`url(#u-${e})`,fillRule:"evenodd",stroke:"#2F8A00",strokeWidth:"13",d:"M194.9 184.5s-47.5-8.5-83.2 15.7c-23.8 16.2-34.3 49.3-31.6 99.3 30.3-27.8 52.1-48.5 65.2-61.9 19.8-20 49.6-53.1 49.6-53.1z",clipRule:"evenodd"}),(0,r.jsxs)("linearGradient",{id:`v-${e}`,x1:"-632.145",x2:"-632.145",y1:"854.174",y2:"853.174",gradientTransform:"matrix(62.9558 3.2994 3.5021 -66.8246 37035.367 59284.227)",gradientUnits:"userSpaceOnUse",children:[(0,r.jsx)("stop",{offset:"0",stopColor:"#2f8a00"}),(0,r.jsx)("stop",{offset:"1",stopColor:"#90ff57"})]}),(0,r.jsx)("path",{fill:`url(#v-${e})`,fillRule:"evenodd",stroke:"#2F8A00",strokeWidth:"13",d:"M195 183.9c-.8-21.9 6-38 20.6-48.2 14.6-10.2 29.8-15.3 45.5-15.3-6.1 21.4-14.5 35.8-25.2 43.4-10.7 7.5-24.4 14.2-40.9 20.1z",clipRule:"evenodd"}),(0,r.jsxs)("linearGradient",{id:`w-${e}`,x1:"-638.224",x2:"-638.224",y1:"853.801",y2:"852.801",gradientTransform:"matrix(152.4666 7.9904 3.0934 -59.0251 94939.86 55646.855)",gradientUnits:"userSpaceOnUse",children:[(0,r.jsx)("stop",{offset:"0",stopColor:"#2f8a00"}),(0,r.jsx)("stop",{offset:"1",stopColor:"#90ff57"})]}),(0,r.jsx)("path",{fill:`url(#w-${e})`,fillRule:"evenodd",stroke:"#2F8A00",strokeWidth:"13",d:"M194.9 184.5c31.9-30 64.1-39.7 96.7-29 32.6 10.7 50.8 30.4 54.6 59.1-35.2-5.5-60.4-9.6-75.8-12.1-15.3-2.6-40.5-8.6-75.5-18z",clipRule:"evenodd"}),(0,r.jsxs)("linearGradient",{id:`x-${e}`,x1:"-637.723",x2:"-637.723",y1:"855.103",y2:"854.103",gradientTransform:"matrix(136.467 7.1519 5.2165 -99.5377 82830.875 89859.578)",gradientUnits:"userSpaceOnUse",children:[(0,r.jsx)("stop",{offset:"0",stopColor:"#2f8a00"}),(0,r.jsx)("stop",{offset:"1",stopColor:"#90ff57"})]}),(0,r.jsx)("path",{fill:`url(#x-${e})`,fillRule:"evenodd",stroke:"#2F8A00",strokeWidth:"13",d:"M194.9 184.5c35.8-7.6 65.6-.2 89.2 22 23.6 22.2 37.7 49 42.3 80.3-39.8-9.7-68.3-23.8-85.5-42.4-17.2-18.5-32.5-38.5-46-59.9z",clipRule:"evenodd"}),(0,r.jsxs)("linearGradient",{id:`y-${e}`,x1:"-631.79",x2:"-631.79",y1:"855.872",y2:"854.872",gradientTransform:"matrix(60.8683 3.19 8.7771 -167.4773 31110.818 145537.61)",gradientUnits:"userSpaceOnUse",children:[(0,r.jsx)("stop",{offset:"0",stopColor:"#2f8a00"}),(0,r.jsx)("stop",{offset:"1",stopColor:"#90ff57"})]}),(0,r.jsx)("path",{fill:`url(#y-${e})`,fillRule:"evenodd",stroke:"#2F8A00",strokeWidth:"13",d:"M194.9 184.5c-33.6 13.8-53.6 35.7-60.1 65.6-6.5 29.9-3.6 63.1 8.7 99.6 27.4-40.3 43.2-69.6 47.4-88 4.2-18.3 5.5-44.1 4-77.2z",clipRule:"evenodd"}),(0,r.jsx)("path",{fill:"none",stroke:"#2F8A00",strokeLinecap:"round",strokeWidth:"8",d:"M196.5 182.3c-14.8 21.6-25.1 41.4-30.8 59.4-5.7 18-9.4 33-11.1 45.1"}),(0,r.jsx)("path",{fill:"none",stroke:"#2F8A00",strokeLinecap:"round",strokeWidth:"8",d:"M194.8 185.7c-24.4 1.7-43.8 9-58.1 21.8-14.3 12.8-24.7 25.4-31.3 37.8m99.1-68.9c29.7-6.7 52-8.4 67-5 15 3.4 26.9 8.7 35.8 15.9m-110.8-5.9c20.3 9.9 38.2 20.5 53.9 31.9 15.7 11.4 27.4 22.1 35.1 32"})]}),(0,r.jsx)("defs",{children:(0,r.jsx)("filter",{id:`z-${e}`,width:"532",height:"633",x:"50.5",y:"399",filterUnits:"userSpaceOnUse",children:(0,r.jsx)("feColorMatrix",{values:"1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"})})}),(0,r.jsx)("mask",{id:`A-${e}`,width:"532",height:"633",x:"50.5",y:"399",maskUnits:"userSpaceOnUse",children:(0,r.jsx)("g",{filter:`url(#z-${e})`,children:(0,r.jsx)("circle",{cx:"316.5",cy:"316.5",r:"316.5",fill:"#FFF",fillRule:"evenodd",clipRule:"evenodd"})})}),(0,r.jsxs)("linearGradient",{id:`B-${e}`,x1:"-641.104",x2:"-641.278",y1:"856.577",y2:"856.183",gradientTransform:"matrix(532 0 0 -633 341484.5 542657)",gradientUnits:"userSpaceOnUse",children:[(0,r.jsx)("stop",{offset:"0",stopColor:"#fff400"}),(0,r.jsx)("stop",{offset:"1",stopColor:"#3c8700"})]}),(0,r.jsx)("ellipse",{cx:"316.5",cy:"715.5",fill:`url(#B-${e})`,fillRule:"evenodd",clipRule:"evenodd",mask:`url(#A-${e})`,rx:"266",ry:"316.5"}),(0,r.jsx)("defs",{children:(0,r.jsx)("filter",{id:`C-${e}`,width:"288",height:"283",x:"391",y:"-24",filterUnits:"userSpaceOnUse",children:(0,r.jsx)("feColorMatrix",{values:"1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"})})}),(0,r.jsx)("mask",{id:`D-${e}`,width:"288",height:"283",x:"391",y:"-24",maskUnits:"userSpaceOnUse",children:(0,r.jsx)("g",{filter:`url(#C-${e})`,children:(0,r.jsx)("circle",{cx:"316.5",cy:"316.5",r:"316.5",fill:"#FFF",fillRule:"evenodd",clipRule:"evenodd"})})}),(0,r.jsx)("g",{mask:`url(#D-${e})`,children:(0,r.jsxs)("g",{transform:"translate(397 -24)",children:[(0,r.jsxs)("linearGradient",{id:`E-${e}`,x1:"-1036.672",x2:"-1036.672",y1:"880.018",y2:"879.018",gradientTransform:"matrix(227 0 0 -227 235493 199764)",gradientUnits:"userSpaceOnUse",children:[(0,r.jsx)("stop",{offset:"0",stopColor:"#ffdf00"}),(0,r.jsx)("stop",{offset:"1",stopColor:"#ff9d00"})]}),(0,r.jsx)("circle",{cx:"168.5",cy:"113.5",r:"113.5",fill:`url(#E-${e})`,fillRule:"evenodd",clipRule:"evenodd"}),(0,r.jsxs)("linearGradient",{id:`F-${e}`,x1:"-1017.329",x2:"-1018.602",y1:"658.003",y2:"657.998",gradientTransform:"matrix(30 0 0 -1 30558 771)",gradientUnits:"userSpaceOnUse",children:[(0,r.jsx)("stop",{offset:"0",stopColor:"#ffa400"}),(0,r.jsx)("stop",{offset:"1",stopColor:"#ff5e00"})]}),(0,r.jsx)("path",{fill:"none",stroke:`url(#F-${e})`,strokeLinecap:"round",strokeLinejoin:"bevel",strokeWidth:"12",d:"M30 113H0"}),(0,r.jsxs)("linearGradient",{id:`G-${e}`,x1:"-1014.501",x2:"-1015.774",y1:"839.985",y2:"839.935",gradientTransform:"matrix(26.5 0 0 -5.5 26925 4696.5)",gradientUnits:"userSpaceOnUse",children:[(0,r.jsx)("stop",{offset:"0",stopColor:"#ffa400"}),(0,r.jsx)("stop",{offset:"1",stopColor:"#ff5e00"})]}),(0,r.jsx)("path",{fill:"none",stroke:`url(#G-${e})`,strokeLinecap:"round",strokeLinejoin:"bevel",strokeWidth:"12",d:"M33.5 79.5L7 74"}),(0,r.jsxs)("linearGradient",{id:`H-${e}`,x1:"-1016.59",x2:"-1017.862",y1:"852.671",y2:"852.595",gradientTransform:"matrix(29 0 0 -8 29523 6971)",gradientUnits:"userSpaceOnUse",children:[(0,r.jsx)("stop",{offset:"0",stopColor:"#ffa400"}),(0,r.jsx)("stop",{offset:"1",stopColor:"#ff5e00"})]}),(0,r.jsx)("path",{fill:"none",stroke:`url(#H-${e})`,strokeLinecap:"round",strokeLinejoin:"bevel",strokeWidth:"12",d:"M34 146l-29 8"}),(0,r.jsxs)("linearGradient",{id:`I-${e}`,x1:"-1011.984",x2:"-1013.257",y1:"863.523",y2:"863.229",gradientTransform:"matrix(24 0 0 -13 24339 11407)",gradientUnits:"userSpaceOnUse",children:[(0,r.jsx)("stop",{offset:"0",stopColor:"#ffa400"}),(0,r.jsx)("stop",{offset:"1",stopColor:"#ff5e00"})]}),(0,r.jsx)("path",{fill:"none",stroke:`url(#I-${e})`,strokeLinecap:"round",strokeLinejoin:"bevel",strokeWidth:"12",d:"M45 177l-24 13"}),(0,r.jsxs)("linearGradient",{id:`J-${e}`,x1:"-1006.673",x2:"-1007.946",y1:"869.279",y2:"868.376",gradientTransform:"matrix(20 0 0 -19 20205 16720)",gradientUnits:"userSpaceOnUse",children:[(0,r.jsx)("stop",{offset:"0",stopColor:"#ffa400"}),(0,r.jsx)("stop",{offset:"1",stopColor:"#ff5e00"})]}),(0,r.jsx)("path",{fill:"none",stroke:`url(#J-${e})`,strokeLinecap:"round",strokeLinejoin:"bevel",strokeWidth:"12",d:"M67 204l-20 19"}),(0,r.jsxs)("linearGradient",{id:`K-${e}`,x1:"-992.85",x2:"-993.317",y1:"871.258",y2:"870.258",gradientTransform:"matrix(13.8339 0 0 -22.8467 13825.796 20131.938)",gradientUnits:"userSpaceOnUse",children:[(0,r.jsx)("stop",{offset:"0",stopColor:"#ffa400"}),(0,r.jsx)("stop",{offset:"1",stopColor:"#ff5e00"})]}),(0,r.jsx)("path",{fill:"none",stroke:`url(#K-${e})`,strokeLinecap:"round",strokeLinejoin:"bevel",strokeWidth:"12",d:"M94.4 227l-13.8 22.8"}),(0,r.jsxs)("linearGradient",{id:`L-${e}`,x1:"-953.835",x2:"-953.965",y1:"871.9",y2:"870.9",gradientTransform:"matrix(7.5 0 0 -24.5 7278 21605)",gradientUnits:"userSpaceOnUse",children:[(0,r.jsx)("stop",{offset:"0",stopColor:"#ffa400"}),(0,r.jsx)("stop",{offset:"1",stopColor:"#ff5e00"})]}),(0,r.jsx)("path",{fill:"none",stroke:`url(#L-${e})`,strokeLinecap:"round",strokeLinejoin:"bevel",strokeWidth:"12",d:"M127.5 243.5L120 268"}),(0,r.jsxs)("linearGradient",{id:`M-${e}`,x1:"244.504",x2:"244.496",y1:"871.898",y2:"870.898",gradientTransform:"matrix(.5 0 0 -24.5 45.5 21614)",gradientUnits:"userSpaceOnUse",children:[(0,r.jsx)("stop",{offset:"0",stopColor:"#ffa400"}),(0,r.jsx)("stop",{offset:"1",stopColor:"#ff5e00"})]}),(0,r.jsx)("path",{fill:"none",stroke:`url(#M-${e})`,strokeLinecap:"round",strokeLinejoin:"bevel",strokeWidth:"12",d:"M167.5 252.5l.5 24.5"})]})})]})})}function T(e){const{className:t,...s}=e,n=V();return(0,r.jsxs)("button",{...s,className:(0,$.$)(n.logo,t),children:[(0,r.jsx)("div",{className:n.tanstackLogo,children:"TANSTACK"}),(0,r.jsx)("div",{className:n.routerLogo,children:"React Router v1"})]})}function A(e){const{shadowDOMTarget:t}=e;return(0,r.jsx)(E.Provider,{value:t,children:(0,r.jsx)(G,{...e})})}function G({initialIsOpen:e,panelProps:t={},closeButtonProps:s={},toggleButtonProps:i={},position:o="bottom-left",containerElement:a="footer",router:l,shadowDOMTarget:d}){const[c,f]=n.useState(),u=n.useRef(null),[x,p]=b("tanstackRouterDevtoolsOpen",e),[h,m]=b("tanstackRouterDevtoolsHeight",null),[g,v]=R(!1),[j,y]=R(!1),k=z(),C=V(),w=x??!1;n.useEffect((()=>{v(x??!1)}),[x,g,v]),n.useEffect((()=>{var e;if(g){const t=null==(e=null==c?void 0:c.parentElement)?void 0:e.style.paddingBottom,s=()=>{var e;const t=null==(e=u.current)?void 0:e.getBoundingClientRect().height;(null==c?void 0:c.parentElement)&&(c.parentElement.style.paddingBottom=`${t}px`)};if(s(),"undefined"!=typeof window)return window.addEventListener("resize",s),()=>{window.removeEventListener("resize",s),(null==c?void 0:c.parentElement)&&"string"==typeof t&&(c.parentElement.style.paddingBottom=t)}}}),[g,null==c?void 0:c.parentElement]),n.useEffect((()=>{if(c){const e=c,t=getComputedStyle(e).fontSize;e.style.setProperty("--tsrd-font-size",t)}}),[c]);const{style:F={},...N}=t,{style:S={},onClick:E,...D}=s,{onClick:O,className:B,...M}=i;if(!k)return null;const L=h??500;return(0,r.jsxs)(a,{ref:f,className:"TanStackRouterDevtools",children:[(0,r.jsx)(U.Provider,{value:{onCloseClick:E??(()=>{})},children:(0,r.jsx)(H,{ref:u,...N,router:l,className:(0,$.$)(C.devtoolsPanelContainer,C.devtoolsPanelContainerVisibility(!!x),C.devtoolsPanelContainerResizing(j),C.devtoolsPanelContainerAnimation(g,L+16)),style:{height:L,...F},isOpen:g,setIsOpen:p,handleDragStart:e=>((e,t)=>{if(0!==t.button)return;y(!0);const s=(null==e?void 0:e.getBoundingClientRect().height)??0,r=t.pageY,n=e=>{const t=r-e.pageY,n=s+t;m(n),p(!(n<70))},i=()=>{y(!1),document.removeEventListener("mousemove",n),document.removeEventListener("mouseUp",i)};document.addEventListener("mousemove",n),document.addEventListener("mouseup",i)})(u.current,e),shadowDOMTarget:d})}),(0,r.jsxs)("button",{type:"button",...M,"aria-label":"Open TanStack Router Devtools",onClick:e=>{p(!0),O&&O(e)},className:(0,$.$)(C.mainCloseBtn,C.mainCloseBtnPosition(o),C.mainCloseBtnAnimation(!w),B),children:[(0,r.jsxs)("div",{className:C.mainCloseBtnIconContainer,children:[(0,r.jsx)("div",{className:C.mainCloseBtnIconOuter,children:(0,r.jsx)(I,{})}),(0,r.jsx)("div",{className:C.mainCloseBtnIconInner,children:(0,r.jsx)(I,{})})]}),(0,r.jsx)("div",{className:C.mainCloseBtnDivider,children:"-"}),(0,r.jsx)("div",{className:C.routerLogoCloseButton,children:"TanStack Router"})]})]})}const P=n.forwardRef((function(e,t){const{shadowDOMTarget:s}=e;return(0,r.jsx)(E.Provider,{value:s,children:(0,r.jsx)(U.Provider,{value:{onCloseClick:()=>{}},children:(0,r.jsx)(H,{ref:t,...e})})})}));function W({router:e,route:t,isRoot:s,activeId:l,setActiveId:d}){var c;const f=(0,i.k)({router:e}),u=V(),x=f.pendingMatches||f.matches,p=f.matches.find((e=>e.routeId===t.id)),h=n.useMemo((()=>{try{if(null==p?void 0:p.params){const e=p.params,s=t.path||(0,o.cg)(t.id);if(s.startsWith("$")){const t=s.slice(1);if(e[t])return`(${e[t]})`}}return""}catch(e){return""}}),[p,t]);return(0,r.jsxs)("div",{children:[(0,r.jsxs)("div",{role:"button","aria-label":`Open match details for ${t.id}`,onClick:()=>{p&&d(l===t.id?"":t.id)},className:(0,$.$)(u.routesRowContainer(t.id===l,!!p)),children:[(0,r.jsx)("div",{className:(0,$.$)(u.matchIndicator(w(x,t)))}),(0,r.jsxs)("div",{className:(0,$.$)(u.routesRow(!!p)),children:[(0,r.jsxs)("div",{children:[(0,r.jsxs)("code",{className:u.code,children:[s?a.n:t.path||(0,o.cg)(t.id)," "]}),(0,r.jsx)("code",{className:u.routeParamInfo,children:h})]}),(0,r.jsx)(_,{match:p,router:e})]})]}),(null==(c=t.children)?void 0:c.length)?(0,r.jsx)("div",{className:u.nestedRouteRow(!!s),children:[...t.children].sort(((e,t)=>e.rank-t.rank)).map((t=>(0,r.jsx)(W,{router:e,route:t,activeId:l,setActiveId:d},t.id)))}):null]})}const H=n.forwardRef((function(e,t){var s,o;const{isOpen:c=!0,setIsOpen:f,handleDragStart:u,router:x,shadowDOMTarget:p,...h}=e,{onCloseClick:m}=(()=>{const e=n.useContext(U);if(!e)throw new Error("useDevtoolsOnClose must be used within a TanStackRouterDevtools component");return e})(),g=V(),{className:v,...j}=h,y=(0,l.r)({warn:!1}),k=x??y,w=(0,i.k)({router:k});(0,d.A)(k,"No router was found for the TanStack Router Devtools. Please place the devtools in the <RouterProvider> component tree or pass the router instance to the devtools manually.");const[z,F]=b("tanstackRouterDevtoolsShowMatches",!0),[R,S]=b("tanstackRouterDevtoolsActiveRouteId",""),E=n.useMemo((()=>[...w.pendingMatches??[],...w.matches,...w.cachedMatches].find((e=>e.routeId===R||e.id===R))),[R,w.cachedMatches,w.matches,w.pendingMatches]),D=Object.keys(w.location.search).length,O={...k,state:k.state};return(0,r.jsxs)("div",{ref:t,className:(0,$.$)(g.devtoolsPanel,"TanStackRouterDevtoolsPanel",v),...j,children:[u?(0,r.jsx)("div",{className:g.dragHandle,onMouseDown:u}):null,(0,r.jsx)("button",{className:g.panelCloseBtn,onClick:e=>{f(!1),m(e)},children:(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"10",height:"6",fill:"none",viewBox:"0 0 10 6",className:g.panelCloseBtnIcon,children:(0,r.jsx)("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"1.667",d:"M1 1l4 4 4-4"})})}),(0,r.jsxs)("div",{className:g.firstContainer,children:[(0,r.jsx)("div",{className:g.row,children:(0,r.jsx)(T,{"aria-hidden":!0,onClick:e=>{f(!1),m(e)}})}),(0,r.jsx)("div",{className:g.routerExplorerContainer,children:(0,r.jsx)("div",{className:g.routerExplorer,children:(0,r.jsx)(B,{label:"Router",value:Object.fromEntries(N(Object.keys(O),["state","routesById","routesByPath","flatRoutes","options","manifest"].map((e=>t=>t!==e))).map((e=>[e,O[e]])).filter((e=>"function"!=typeof e[1]&&!["__store","basepath","injectedHtml","subscribers","latestLoadPromise","navigateTimeout","resetNextScroll","tempLocationKey","latestLocation","routeTree","history"].includes(e[0])))),defaultExpanded:{state:{},context:{},options:{}},filterSubEntries:e=>e.filter((e=>"function"!=typeof e.value))})})})]}),(0,r.jsxs)("div",{className:g.secondContainer,children:[(0,r.jsxs)("div",{className:g.matchesContainer,children:[(0,r.jsxs)("div",{className:g.detailsHeader,children:[(0,r.jsx)("span",{children:"Pathname"}),w.location.maskedLocation?(0,r.jsx)("div",{className:g.maskedBadgeContainer,children:(0,r.jsx)("span",{className:g.maskedBadge,children:"masked"})}):null]}),(0,r.jsxs)("div",{className:g.detailsContent,children:[(0,r.jsx)("code",{children:w.location.pathname}),w.location.maskedLocation?(0,r.jsx)("code",{className:g.maskedLocation,children:w.location.maskedLocation.pathname}):null]}),(0,r.jsxs)("div",{className:g.detailsHeader,children:[(0,r.jsxs)("div",{className:g.routeMatchesToggle,children:[(0,r.jsx)("button",{type:"button",onClick:()=>{F(!1)},disabled:!z,className:(0,$.$)(g.routeMatchesToggleBtn(!z,!0)),children:"Routes"}),(0,r.jsx)("button",{type:"button",onClick:()=>{F(!0)},disabled:z,className:(0,$.$)(g.routeMatchesToggleBtn(!!z,!1)),children:"Matches"})]}),(0,r.jsx)("div",{className:g.detailsHeaderInfo,children:(0,r.jsx)("div",{children:"age / staleTime / gcTime"})})]}),(0,r.jsx)("div",{className:(0,$.$)(g.routesContainer),children:z?(0,r.jsx)("div",{children:((null==(s=w.pendingMatches)?void 0:s.length)?w.pendingMatches:w.matches).map(((e,t)=>(0,r.jsxs)("div",{role:"button","aria-label":`Open match details for ${e.id}`,onClick:()=>S(R===e.id?"":e.id),className:(0,$.$)(g.matchRow(e===E)),children:[(0,r.jsx)("div",{className:(0,$.$)(g.matchIndicator(C(e)))}),(0,r.jsx)("code",{className:g.matchID,children:`${e.routeId===a.n?a.n:e.pathname}`}),(0,r.jsx)(_,{match:e,router:k})]},e.id||t)))}):(0,r.jsx)(W,{router:k,route:k.routeTree,isRoot:!0,activeId:R,setActiveId:S})})]}),w.cachedMatches.length?(0,r.jsxs)("div",{className:g.cachedMatchesContainer,children:[(0,r.jsxs)("div",{className:g.detailsHeader,children:[(0,r.jsx)("div",{children:"Cached Matches"}),(0,r.jsx)("div",{className:g.detailsHeaderInfo,children:"age / staleTime / gcTime"})]}),(0,r.jsx)("div",{children:w.cachedMatches.map((e=>(0,r.jsxs)("div",{role:"button","aria-label":`Open match details for ${e.id}`,onClick:()=>S(R===e.id?"":e.id),className:(0,$.$)(g.matchRow(e===E)),children:[(0,r.jsx)("div",{className:(0,$.$)(g.matchIndicator(C(e)))}),(0,r.jsx)("code",{className:g.matchID,children:`${e.id}`}),(0,r.jsx)(_,{match:e,router:k})]},e.id)))})]}):null]}),E?(0,r.jsxs)("div",{className:g.thirdContainer,children:[(0,r.jsx)("div",{className:g.detailsHeader,children:"Match Details"}),(0,r.jsx)("div",{children:(0,r.jsxs)("div",{className:g.matchDetails,children:[(0,r.jsx)("div",{className:g.matchStatus(E.status,E.isFetching),children:(0,r.jsx)("div",{children:"success"===E.status&&E.isFetching?"fetching":E.status})}),(0,r.jsxs)("div",{className:g.matchDetailsInfoLabel,children:[(0,r.jsx)("div",{children:"ID:"}),(0,r.jsx)("div",{className:g.matchDetailsInfo,children:(0,r.jsx)("code",{children:E.id})})]}),(0,r.jsxs)("div",{className:g.matchDetailsInfoLabel,children:[(0,r.jsx)("div",{children:"State:"}),(0,r.jsx)("div",{className:g.matchDetailsInfo,children:(null==(o=w.pendingMatches)?void 0:o.find((e=>e.id===E.id)))?"Pending":w.matches.find((e=>e.id===E.id))?"Active":"Cached"})]}),(0,r.jsxs)("div",{className:g.matchDetailsInfoLabel,children:[(0,r.jsx)("div",{children:"Last Updated:"}),(0,r.jsx)("div",{className:g.matchDetailsInfo,children:E.updatedAt?new Date(E.updatedAt).toLocaleTimeString():"N/A"})]})]})}),E.loaderData?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{className:g.detailsHeader,children:"Loader Data"}),(0,r.jsx)("div",{className:g.detailsContent,children:(0,r.jsx)(B,{label:"loaderData",value:E.loaderData,defaultExpanded:{}})})]}):null,(0,r.jsx)("div",{className:g.detailsHeader,children:"Explorer"}),(0,r.jsx)("div",{className:g.detailsContent,children:(0,r.jsx)(B,{label:"Match",value:E,defaultExpanded:{}})})]}):null,D?(0,r.jsxs)("div",{className:g.fourthContainer,children:[(0,r.jsx)("div",{className:g.detailsHeader,children:"Search Params"}),(0,r.jsx)("div",{className:g.detailsContent,children:(0,r.jsx)(B,{value:w.location.search,defaultExpanded:Object.keys(w.location.search).reduce(((e,t)=>(e[t]={},e)),{})})})]}):null]})}));function _({match:e,router:t}){const s=V(),i=n.useReducer((()=>({})),(()=>({})))[1];if(n.useEffect((()=>{const e=setInterval((()=>{i()}),1e3);return()=>{clearInterval(e)}}),[i]),!e)return null;const o=t.looseRoutesById[e.routeId];if(!o.options.loader)return null;const a=Date.now()-e.updatedAt,l=o.options.staleTime??t.options.defaultStaleTime??0,d=o.options.gcTime??t.options.defaultGcTime??18e5;return(0,r.jsxs)("div",{className:(0,$.$)(s.ageTicker(a>l)),children:[(0,r.jsx)("div",{children:J(a)}),(0,r.jsx)("div",{children:"/"}),(0,r.jsx)("div",{children:J(l)}),(0,r.jsx)("div",{children:"/"}),(0,r.jsx)("div",{children:J(d)})]})}function J(e){const t=[e/1e3,e/6e4,e/36e5,e/864e5];let s=0;for(let e=1;e<t.length&&!(t[e]<1);e++)s=e;return new Intl.NumberFormat(navigator.language,{compactDisplay:"short",notation:"compact",maximumFractionDigits:0}).format(t[s])+["s","min","h","d"][s]}const K=e=>{const{colors:t,font:s,size:r,alpha:n,shadow:i,border:o}=S,{fontFamily:a,lineHeight:l,size:d}=s,c=e?j.bind({target:e}):j;return{devtoolsPanelContainer:c`
      direction: ltr;
      position: fixed;
      bottom: 0;
      right: 0;
      z-index: 99999;
      width: 100%;
      max-height: 90%;
      border-top: 1px solid ${t.gray[700]};
      transform-origin: top;
    `,devtoolsPanelContainerVisibility:e=>c`
        visibility: ${e?"visible":"hidden"};
      `,devtoolsPanelContainerResizing:e=>e?c`
          transition: none;
        `:c`
        transition: all 0.4s ease;
      `,devtoolsPanelContainerAnimation:(e,t)=>e?c`
          pointer-events: auto;
          transform: translateY(0);
        `:c`
        pointer-events: none;
        transform: translateY(${t}px);
      `,logo:c`
      cursor: pointer;
      display: flex;
      flex-direction: column;
      background-color: transparent;
      border: none;
      font-family: ${a.sans};
      gap: ${S.size[.5]};
      padding: 0px;
      &:hover {
        opacity: 0.7;
      }
      &:focus-visible {
        outline-offset: 4px;
        border-radius: ${o.radius.xs};
        outline: 2px solid ${t.blue[800]};
      }
    `,tanstackLogo:c`
      font-size: ${s.size.md};
      font-weight: ${s.weight.bold};
      line-height: ${s.lineHeight.xs};
      white-space: nowrap;
      color: ${t.gray[300]};
    `,routerLogo:c`
      font-weight: ${s.weight.semibold};
      font-size: ${s.size.xs};
      background: linear-gradient(to right, #84cc16, #10b981);
      background-clip: text;
      -webkit-background-clip: text;
      line-height: 1;
      -webkit-text-fill-color: transparent;
      white-space: nowrap;
    `,devtoolsPanel:c`
      display: flex;
      font-size: ${d.sm};
      font-family: ${a.sans};
      background-color: ${t.darkGray[700]};
      color: ${t.gray[300]};

      @media (max-width: 700px) {
        flex-direction: column;
      }
      @media (max-width: 600px) {
        font-size: ${d.xs};
      }
    `,dragHandle:c`
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 4px;
      cursor: row-resize;
      z-index: 100000;
      &:hover {
        background-color: ${t.purple[400]}${n[90]};
      }
    `,firstContainer:c`
      flex: 1 1 500px;
      min-height: 40%;
      max-height: 100%;
      overflow: auto;
      border-right: 1px solid ${t.gray[700]};
      display: flex;
      flex-direction: column;
    `,routerExplorerContainer:c`
      overflow-y: auto;
      flex: 1;
    `,routerExplorer:c`
      padding: ${S.size[2]};
    `,row:c`
      display: flex;
      align-items: center;
      padding: ${S.size[2]} ${S.size[2.5]};
      gap: ${S.size[2.5]};
      border-bottom: ${t.darkGray[500]} 1px solid;
      align-items: center;
    `,detailsHeader:c`
      font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
      position: sticky;
      top: 0;
      z-index: 2;
      background-color: ${t.darkGray[600]};
      padding: 0px ${S.size[2]};
      font-weight: ${s.weight.medium};
      font-size: ${s.size.xs};
      min-height: ${S.size[8]};
      line-height: ${s.lineHeight.xs};
      text-align: left;
      display: flex;
      align-items: center;
    `,maskedBadge:c`
      background: ${t.yellow[900]}${n[70]};
      color: ${t.yellow[300]};
      display: inline-block;
      padding: ${S.size[0]} ${S.size[2.5]};
      border-radius: ${o.radius.full};
      font-size: ${s.size.xs};
      font-weight: ${s.weight.normal};
      border: 1px solid ${t.yellow[300]};
    `,maskedLocation:c`
      color: ${t.yellow[300]};
    `,detailsContent:c`
      padding: ${S.size[1.5]} ${S.size[2]};
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: ${s.size.xs};
    `,routeMatchesToggle:c`
      display: flex;
      align-items: center;
      border: 1px solid ${t.gray[500]};
      border-radius: ${o.radius.sm};
      overflow: hidden;
    `,routeMatchesToggleBtn:(e,r)=>{const i=[c`
        appearance: none;
        border: none;
        font-size: 12px;
        padding: 4px 8px;
        background: transparent;
        cursor: pointer;
        font-family: ${a.sans};
        font-weight: ${s.weight.medium};
      `];if(e){const e=c`
          background: ${t.darkGray[400]};
          color: ${t.gray[300]};
        `;i.push(e)}else{const e=c`
          color: ${t.gray[500]};
          background: ${t.darkGray[800]}${n[20]};
        `;i.push(e)}return r&&i.push(c`
          border-right: 1px solid ${S.colors.gray[500]};
        `),i},detailsHeaderInfo:c`
      flex: 1;
      justify-content: flex-end;
      display: flex;
      align-items: center;
      font-weight: ${s.weight.normal};
      color: ${t.gray[400]};
    `,matchRow:e=>{const s=[c`
        display: flex;
        border-bottom: 1px solid ${t.darkGray[400]};
        cursor: pointer;
        align-items: center;
        padding: ${r[1]} ${r[2]};
        gap: ${r[2]};
        font-size: ${d.xs};
        color: ${t.gray[300]};
      `];if(e){const e=c`
          background: ${t.darkGray[500]};
        `;s.push(e)}return s},matchIndicator:e=>{const s=[c`
        flex: 0 0 auto;
        width: ${r[3]};
        height: ${r[3]};
        background: ${t[e][900]};
        border: 1px solid ${t[e][500]};
        border-radius: ${o.radius.full};
        transition: all 0.25s ease-out;
        box-sizing: border-box;
      `];if("gray"===e){const e=c`
          background: ${t.gray[700]};
          border-color: ${t.gray[400]};
        `;s.push(e)}return s},matchID:c`
      flex: 1;
      line-height: ${l.xs};
    `,ageTicker:e=>{const s=[c`
        display: flex;
        gap: ${r[1]};
        font-size: ${d.xs};
        color: ${t.gray[400]};
        font-variant-numeric: tabular-nums;
        line-height: ${l.xs};
      `];if(e){const e=c`
          color: ${t.yellow[400]};
        `;s.push(e)}return s},secondContainer:c`
      flex: 1 1 500px;
      min-height: 40%;
      max-height: 100%;
      overflow: auto;
      border-right: 1px solid ${t.gray[700]};
      display: flex;
      flex-direction: column;
    `,thirdContainer:c`
      flex: 1 1 500px;
      overflow: auto;
      display: flex;
      flex-direction: column;
      height: 100%;
      border-right: 1px solid ${t.gray[700]};

      @media (max-width: 700px) {
        border-top: 2px solid ${t.gray[700]};
      }
    `,fourthContainer:c`
      flex: 1 1 500px;
      min-height: 40%;
      max-height: 100%;
      overflow: auto;
      display: flex;
      flex-direction: column;
    `,routesContainer:c`
      overflow-x: auto;
      overflow-y: visible;
    `,routesRowContainer:(e,s)=>{const n=[c`
        display: flex;
        border-bottom: 1px solid ${t.darkGray[400]};
        align-items: center;
        padding: ${r[1]} ${r[2]};
        gap: ${r[2]};
        font-size: ${d.xs};
        color: ${t.gray[300]};
        cursor: ${s?"pointer":"default"};
        line-height: ${l.xs};
      `];if(e){const e=c`
          background: ${t.darkGray[500]};
        `;n.push(e)}return n},routesRow:e=>{const s=[c`
        flex: 1 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: ${d.xs};
        line-height: ${l.xs};
      `];if(!e){const e=c`
          color: ${t.gray[400]};
        `;s.push(e)}return s},routeParamInfo:c`
      color: ${t.gray[400]};
      font-size: ${d.xs};
      line-height: ${l.xs};
    `,nestedRouteRow:e=>c`
        margin-left: ${e?0:r[3.5]};
        border-left: ${e?"":`solid 1px ${t.gray[700]}`};
      `,code:c`
      font-size: ${d.xs};
      line-height: ${l.xs};
    `,matchesContainer:c`
      flex: 1 1 auto;
      overflow-y: auto;
    `,cachedMatchesContainer:c`
      flex: 1 1 auto;
      overflow-y: auto;
      max-height: 50%;
    `,maskedBadgeContainer:c`
      flex: 1;
      justify-content: flex-end;
      display: flex;
    `,matchDetails:c`
      display: flex;
      flex-direction: column;
      padding: ${S.size[2]};
      font-size: ${S.font.size.xs};
      color: ${S.colors.gray[300]};
      line-height: ${S.font.lineHeight.sm};
    `,matchStatus:(e,t)=>{const s=t&&"success"===e?"beforeLoad"===t?"purple":"blue":{pending:"yellow",success:"green",error:"red",notFound:"purple",redirected:"gray"}[e];return c`
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        border-radius: ${S.border.radius.sm};
        font-weight: ${S.font.weight.normal};
        background-color: ${S.colors[s][900]}${S.alpha[90]};
        color: ${S.colors[s][300]};
        border: 1px solid ${S.colors[s][600]};
        margin-bottom: ${S.size[2]};
        transition: all 0.25s ease-out;
      `},matchDetailsInfo:c`
      display: flex;
      justify-content: flex-end;
      flex: 1;
    `,matchDetailsInfoLabel:c`
      display: flex;
    `,mainCloseBtn:c`
      background: ${t.darkGray[700]};
      padding: ${r[1]} ${r[2]} ${r[1]} ${r[1.5]};
      border-radius: ${o.radius.md};
      position: fixed;
      z-index: 99999;
      display: inline-flex;
      width: fit-content;
      cursor: pointer;
      appearance: none;
      border: 0;
      gap: 8px;
      align-items: center;
      border: 1px solid ${t.gray[500]};
      font-size: ${s.size.xs};
      cursor: pointer;
      transition: all 0.25s ease-out;

      &:hover {
        background: ${t.darkGray[500]};
      }
    `,mainCloseBtnPosition:e=>c`
        ${"top-left"===e?`top: ${r[2]}; left: ${r[2]};`:""}
        ${"top-right"===e?`top: ${r[2]}; right: ${r[2]};`:""}
        ${"bottom-left"===e?`bottom: ${r[2]}; left: ${r[2]};`:""}
        ${"bottom-right"===e?`bottom: ${r[2]}; right: ${r[2]};`:""}
      `,mainCloseBtnAnimation:e=>e?c`
          opacity: 1;
          pointer-events: auto;
          visibility: visible;
        `:c`
        opacity: 0;
        pointer-events: none;
        visibility: hidden;
      `,routerLogoCloseButton:c`
      font-weight: ${s.weight.semibold};
      font-size: ${s.size.xs};
      background: linear-gradient(to right, #98f30c, #00f4a3);
      background-clip: text;
      -webkit-background-clip: text;
      line-height: 1;
      -webkit-text-fill-color: transparent;
      white-space: nowrap;
    `,mainCloseBtnDivider:c`
      width: 1px;
      background: ${S.colors.gray[600]};
      height: 100%;
      border-radius: 999999px;
      color: transparent;
    `,mainCloseBtnIconContainer:c`
      position: relative;
      width: ${r[5]};
      height: ${r[5]};
      background: pink;
      border-radius: 999999px;
      overflow: hidden;
    `,mainCloseBtnIconOuter:c`
      width: ${r[5]};
      height: ${r[5]};
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      filter: blur(3px) saturate(1.8) contrast(2);
    `,mainCloseBtnIconInner:c`
      width: ${r[4]};
      height: ${r[4]};
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    `,panelCloseBtn:c`
      position: absolute;
      cursor: pointer;
      z-index: 100001;
      display: flex;
      align-items: center;
      justify-content: center;
      outline: none;
      background-color: ${t.darkGray[700]};
      &:hover {
        background-color: ${t.darkGray[500]};
      }

      top: 0;
      right: ${r[2]};
      transform: translate(0, -100%);
      border-right: ${t.darkGray[300]} 1px solid;
      border-left: ${t.darkGray[300]} 1px solid;
      border-top: ${t.darkGray[300]} 1px solid;
      border-bottom: none;
      border-radius: ${o.radius.sm} ${o.radius.sm} 0px 0px;
      padding: ${r[1]} ${r[1.5]} ${r[.5]} ${r[1.5]};

      &::after {
        content: ' ';
        position: absolute;
        top: 100%;
        left: -${r[2.5]};
        height: ${r[1.5]};
        width: calc(100% + ${r[5]});
      }
    `,panelCloseBtnIcon:c`
      color: ${t.gray[400]};
      width: ${r[2]};
      height: ${r[2]};
    `}};function V(){const e=n.useContext(E),[t]=n.useState((()=>K(e)));return t}},4164:(e,t,s)=>{function r(e){var t,s,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e)){var i=e.length;for(t=0;t<i;t++)e[t]&&(s=r(e[t]))&&(n&&(n+=" "),n+=s)}else for(s in e)e[s]&&(n&&(n+=" "),n+=s);return n}function n(){for(var e,t,s=0,n="",i=arguments.length;s<i;s++)(e=arguments[s])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}s.d(t,{$:()=>n,A:()=>i});const i=n}}]);