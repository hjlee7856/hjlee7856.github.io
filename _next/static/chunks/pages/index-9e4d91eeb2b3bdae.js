(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[332],{2003:(e,t,a)=>{"use strict";a.r(t),a.d(t,{__N_SSG:()=>N,default:()=>_});var s=a(7876),l=a(4701),r=a(2318),i=a(772),o=a(1662),n=a(2460),c=a(2039),d=a(7268),u=a(6520);let x=e=>{let{post:t,postMetas:a}=e,x=null==a?void 0:a[t.slug],{handleLike:g,likeActive:y}=(0,l.Y)(t.slug,x);return(0,s.jsx)(n.A,{variant:"outlined",sx:{my:2,borderRadius:"8px","&:hover":{cursor:"pointer"}},children:(0,s.jsxs)(c.A,{children:[(0,s.jsx)(d.A,{variant:"h5",color:"grey.900",fontWeight:"bold",gutterBottom:!0,children:t.title}),(0,s.jsx)(d.A,{variant:"h6",color:"grey.500",gutterBottom:!0,children:t.title}),(0,s.jsx)(d.A,{variant:"body2",color:"textSecondary",gutterBottom:!0,children:t.date}),(0,s.jsxs)(u.A,{display:"flex",gap:1,alignItems:"center",children:[(0,s.jsxs)(u.A,{display:"flex",gap:.5,alignItems:"center",children:[(0,s.jsx)(o.A,{color:"disabled",fontSize:"small"}),(0,s.jsx)(d.A,{variant:"body2",color:"textSecondary",children:(null==x?void 0:x.views)||0})]}),(0,s.jsxs)(u.A,{display:"flex",gap:.5,alignItems:"center",onClick:g,children:[y?(0,s.jsx)(r.A,{color:"disabled",fontSize:"small"}):(0,s.jsx)(i.A,{color:"disabled",fontSize:"small"}),(0,s.jsx)(d.A,{variant:"body2",color:"textSecondary",children:(null==x?void 0:x.likes)||0})]})]})]})})},g=[{title:"전체",categoryName:""},{title:"개발 일지",categoryName:"development"},{title:"에러 로그",categoryName:"error"}];var y=a(4232);let p=e=>{let[t,a]=(0,y.useState)(""),[s,l]=(0,y.useState)(0);return{filteredPosts:e.filter(e=>""===t||e.category===t),changeCategory:(e,t)=>{l(t),a(g[t].categoryName)},value:s}};var h=a(6792);let m=e=>{let[t,a]=(0,y.useState)({});return(0,y.useEffect)(()=>{(async()=>{a(await (0,h.oR)(e.map(e=>e.slug)))})()},[]),{fireMetas:t}},f=e=>{let[t,a]=(0,y.useState)(1),s=Math.ceil(e.length/10);return{currentPosts:e.slice((t-1)*10,10*t),totalPages:s,currentPage:t,setCurrentPage:a}};var v=a(4147),w=a(7570),j=a(882),A=a(918),k=a(8230),S=a.n(k),N=!0;function _(e){let{posts:t}=e,{filteredPosts:a,changeCategory:l,value:r}=p(t),{currentPosts:i,totalPages:o,currentPage:n,setCurrentPage:c}=f(a),{fireMetas:d}=m(t);return(0,s.jsxs)(v.A,{sx:{px:"0 !important",py:0},children:[(0,s.jsx)(u.A,{display:"flex",justifyContent:"flex-start",my:2,children:(0,s.jsx)(w.A,{value:r,onChange:(e,t)=>{l(e,t),c(1)},children:g.map(e=>(0,s.jsx)(j.A,{label:e.title},e.categoryName))})}),i.map(e=>(0,s.jsx)(S(),{href:"/posts/".concat(e.slug),style:{textDecoration:"none",color:"inherit"},children:(0,s.jsx)(x,{post:e,postMetas:d})},e.slug)),(0,s.jsx)(u.A,{display:"flex",justifyContent:"center",my:3,children:(0,s.jsx)(A.A,{count:o,page:n,onChange:(e,t)=>c(t),color:"primary",shape:"rounded"})})]})}},4701:(e,t,a)=>{"use strict";a.d(t,{Y:()=>r});var s=a(6792),l=a(4232);let r=(e,t)=>{let[a,r]=(0,l.useState)(!1);return(0,l.useEffect)(()=>{"true"===localStorage.getItem("like-".concat(e))&&r(!0),(async()=>{await (0,s.n4)(e)})()},[e]),{handleLike:async()=>{if(a){var l;(null!==(l=null==t?void 0:t.likes)&&void 0!==l?l:0)>0&&await (0,s.fz)(e),localStorage.removeItem("like-".concat(e)),r(!1)}else await (0,s.x8)(e),localStorage.setItem("like-".concat(e),"true"),r(!0)},likeActive:a}}},6760:(e,t,a)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return a(2003)}])},6792:(e,t,a)=>{"use strict";a.d(t,{fz:()=>u,EL:()=>n,oR:()=>o,x8:()=>d,n4:()=>c});var s=a(6042),l=a(2964);let r=(0,s.Dk)().length?(0,s.Sx)():(0,s.Wp)({appId:"1:1052205200413:web:c99bdcfa588e07329ec2f4",apiKey:"AIzaSyBdkVvEMKVSHXDDFums9DkNAcFx0uT-e4Y",projectId:"github-blog-c49f3"}),i=(0,l.aU)(r),o=async e=>{let t={},a=(0,l.rJ)(i,"postsMeta"),s=(0,l.P)(a,(0,l._M)("slug","in",e));try{(await (0,l.GG)(s)).forEach(e=>{t[e.id]=e.data()})}catch(e){console.error("Error getting documents: ",e)}return t},n=async e=>{let t=(0,l.H9)(i,"postsMeta",e),a=await (0,l.x7)(t);return a.exists()?a.data():(await (0,l.BN)(t,{views:1,likes:0,slug:e}),{views:1,likes:0,slug:e})},c=async e=>{let t=(0,l.H9)(i,"postsMeta",e);(await (0,l.x7)(t)).exists()?await (0,l.mZ)(t,{views:(0,l.GV)(1)}):await (0,l.BN)(t,{views:1})},d=async e=>{let t=(0,l.H9)(i,"postsMeta",e);(await (0,l.x7)(t)).exists()?await (0,l.mZ)(t,{likes:(0,l.GV)(1)}):await (0,l.BN)(t,{likes:0})},u=async e=>{let t=(0,l.H9)(i,"postsMeta",e);(await (0,l.x7)(t)).exists()?await (0,l.mZ)(t,{likes:(0,l.GV)(-1)}):await (0,l.BN)(t,{views:0})}}},e=>{var t=t=>e(e.s=t);e.O(0,[671,512,718,636,593,792],()=>t(6760)),_N_E=e.O()}]);