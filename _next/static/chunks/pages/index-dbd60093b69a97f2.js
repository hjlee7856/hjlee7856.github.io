(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[332],{3932:(e,t,s)=>{"use strict";s.d(t,{A:()=>a});var l=s(7876),i=s(6520),r=s(5965);let a=()=>(0,l.jsx)(i.A,{sx:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(255, 255, 255, 0.7)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center"},children:(0,l.jsx)(r.A,{})})},6760:(e,t,s)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return s(7273)}])},7273:(e,t,s)=>{"use strict";s.r(t),s.d(t,{__N_SSG:()=>Y,default:()=>G});var l=s(7876),i=s(1648),r=s(6520),a=s(7030),n=s(882);let o=e=>{let{changeCategory:t,value:s,setCurrentPage:o}=e;return(0,l.jsx)(r.A,{display:"flex",justifyContent:"flex-start",sx:{borderBottom:1,borderColor:"divider"},children:(0,l.jsx)(a.A,{value:s,onChange:(e,s)=>{t(e,s),o(1)},variant:"scrollable",children:i.L.map((e,t)=>(0,l.jsx)(n.A,{label:e.categoryName},t))})})};var d=s(3932),x=s(6894),c=s(2009);let u=async e=>{let t=(0,c.H9)(x.db,"posts",e);(await (0,c.x7)(t)).exists()||await (0,c.BN)(t,{slug:e,viewCount:0,likeCount:0,createdAt:new Date})},p=async(e,t)=>{let s=(0,c.H9)(x.db,"users",t,"likes",e),l=(0,c.H9)(x.db,"posts",e);(await (0,c.x7)(s)).exists()||(await (0,c.BN)(s,{createdAt:new Date}),await (0,c.mZ)(l,{likeCount:(0,c.GV)(1)}))},h=async(e,t)=>{let s=(0,c.H9)(x.db,"users",t,"likes",e),l=(0,c.H9)(x.db,"posts",e);(await (0,c.x7)(s)).exists()&&(await (0,c.kd)(s),await (0,c.mZ)(l,{likeCount:(0,c.GV)(-1)}))},f=async(e,t)=>{let s=(0,c.H9)(x.db,"users",t,"likes",e);return(await (0,c.x7)(s)).exists()};var m=s(197),j=s(4232);let y=e=>{let[t,s]=(0,j.useState)(!1),{user:l}=(0,m.A)();return(0,j.useEffect)(()=>{u(e.slug),(async()=>{if(!(null==l?void 0:l.uid)){s(!1);return}s(await f(e.slug,l.uid))})()},[null==l?void 0:l.uid,e.slug]),{handleLike:async()=>{if(null==l?void 0:l.uid)if(t){var i;(null!==(i=e.likeCount)&&void 0!==i?i:0)>0&&await h(e.slug,l.uid),s(!1)}else await p(e.slug,l.uid),s(!0);else alert("로그인이 필요한 서비스 입니다.")},likeActive:t}};var g=s(4687),A=s(2318),b=s(772),v=s(1662),w=s(1428),k=s(6557),C=s.n(k);let S=e=>{let{post:t}=e,{handleLike:s,likeActive:i}=y(t);return(0,l.jsxs)(r.A,{display:"flex",justifyContent:"space-between",sx:{marginTop:{xs:2,sm:0}},children:[(0,l.jsxs)(r.A,{display:"flex",gap:.5,alignItems:{xs:"flex-start",sm:"center"},flexDirection:{xs:"column",sm:"row"},children:[(0,l.jsx)(w.A,{variant:"body2",color:"textSecondary",children:t.author}),(0,l.jsx)(w.A,{variant:"body2",color:"textSecondary",display:{xs:"none",sm:"block"},children:"•"}),(0,l.jsx)(w.A,{variant:"body2",color:"textSecondary",children:t.createdAt&&C()(t.createdAt.toDate()).format("YYYY년 MM월 DD일")})]}),(0,l.jsxs)(r.A,{display:"flex",gap:1,alignItems:{xs:"flex-end",sm:"center"},children:[(0,l.jsxs)(r.A,{display:"flex",gap:.5,alignItems:"center",children:[(0,l.jsx)(v.A,{color:"disabled",fontSize:"small"}),(0,l.jsx)(w.A,{variant:"body2",color:"textSecondary",children:t.viewCount})]}),(0,l.jsxs)(r.A,{display:"flex",gap:.5,alignItems:"center",onClick:e=>{e.stopPropagation(),s()},children:[i?(0,l.jsx)(A.A,{color:"disabled",fontSize:"small"}):(0,l.jsx)(b.A,{color:"disabled",fontSize:"small"}),(0,l.jsx)(w.A,{variant:"body2",color:"textSecondary",children:t.likeCount})]}),(0,l.jsxs)(r.A,{display:"flex",gap:.5,alignItems:"center",children:[(0,l.jsx)(g.A,{color:"disabled",fontSize:"small"}),(0,l.jsx)(w.A,{variant:"body2",color:"textSecondary",children:t.commentCount})]})]})]})};var _=s(4587),D=s.n(_);let B=e=>{let{post:t}=e;return(0,l.jsx)(r.A,{position:"relative",borderRadius:"8px",overflow:"hidden",sx:{width:{xs:"120px",sm:"180px"},height:{xs:"67.5px",sm:"101.25px"},flexShrink:0,margin:{xs:0,sm:1}},children:(0,l.jsx)(D(),{src:t.thumbnail,alt:"썸네일 이미지",fill:!0})})},I=e=>{let{post:t}=e;return(0,l.jsxs)(r.A,{position:"relative",width:"100%",children:[(0,l.jsx)(w.A,{variant:"h6",gutterBottom:!0,sx:{maxWidth:"95%",wordBreak:"break-word",display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical",overflow:"hidden"},children:t.title}),(0,l.jsx)(w.A,{variant:"subtitle1",color:"textSecondary",gutterBottom:!0,sx:{maxWidth:"95%",wordBreak:"break-word",display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical",overflow:"hidden"},children:t.subTitle})]})};var N=s(2460),E=s(2039),P=s(1480);let W=e=>{let{post:t}=e,s=(0,P.useRouter)();return(0,l.jsx)(N.A,{variant:"outlined",sx:{my:1,borderRadius:"8px","&:hover":{cursor:"pointer"}},onClick:()=>s.push("/posts/".concat(t.slug)),children:(0,l.jsx)(E.A,{sx:{pb:"16px !important"},children:(0,l.jsxs)(r.A,{display:"flex",justifyContent:"space-between",children:[(0,l.jsxs)(r.A,{flex:1,display:"flex",flexDirection:"column",justifyContent:"space-between",sx:{mr:{xs:0,sm:2}},children:[(0,l.jsxs)(r.A,{sx:{display:{xs:"flex"},flex:{xs:"1"},flexDirection:{xs:"row"}},justifyContent:"space-between",children:[(0,l.jsx)(I,{post:t}),(0,l.jsx)(r.A,{sx:{display:{xs:"flex",sm:"none"},alignItems:"center"},children:(0,l.jsx)(B,{post:t})})]}),(0,l.jsx)(S,{post:t})]}),(0,l.jsx)(r.A,{sx:{display:{xs:"none",sm:"flex"},alignItems:"center"},children:(0,l.jsx)(B,{post:t})})]})})})};var H=s(8583);let T=e=>{let{filteredPosts:t}=e;return(0,l.jsx)(H.A,{sx:{paddingX:"0 !important"},children:t.map((e,t)=>(0,l.jsx)(W,{post:e},t))})};var z=s(6786),L=s(8143);let M=function(e,t){let s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:10,[l,i]=(0,j.useState)([]);return(0,j.useEffect)(()=>{if(!e.length)return;let l=(0,c.rJ)(x.db,"posts"),r=(t-1)*s,a=e.slice(r,r+s).map(e=>e.slug),n=(0,c.aQ)((0,c.P)(l,(0,c._M)("slug","in",a)),t=>{let s={};t.forEach(e=>{s[e.id]=e.data()}),i(e.map(e=>({...e,...s[e.slug]})))});return()=>n()},[e]),{postWithMeta:l}};var O=s(3830),Y=!0;function G(e){let{posts:t}=e,{currentPage:s,setCurrentPage:i,totalPages:a,perPage:n}=(0,L.W)(t.length),{postWithMeta:x}=M(t,s,n),{filteredPosts:c,changeCategory:u,selectIdx:p}=(0,z.e)(x);return t?(c.length>0&&c.filter(e=>e.createdAt&&"function"==typeof e.createdAt.toDate).sort((e,t)=>{var s,l;let i=null!==(s=e.createdAt.toDate().getTime())&&void 0!==s?s:0;return(null!==(l=t.createdAt.toDate().getTime())&&void 0!==l?l:0)-i}),(0,l.jsxs)(r.A,{children:[(0,l.jsx)(o,{changeCategory:u,setCurrentPage:i,value:p}),(0,l.jsx)(T,{filteredPosts:c}),(0,l.jsx)(r.A,{display:"flex",justifyContent:"center",my:3,children:(0,l.jsx)(O.A,{count:a,page:s,onChange:(e,t)=>i(t),color:"primary",shape:"rounded"})})]})):(0,l.jsx)(d.A,{})}},8143:(e,t,s)=>{"use strict";s.d(t,{W:()=>i});var l=s(4232);let i=e=>{let[t,s]=(0,l.useState)(1);return{totalPages:Math.ceil(e/5),currentPage:t,setCurrentPage:s,perPage:5}}}},e=>{var t=t=>e(e.s=t);e.O(0,[573,32,636,593,792],()=>t(6760)),_N_E=e.O()}]);