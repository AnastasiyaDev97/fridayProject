"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[452],{1964:function(a,s,e){e.d(s,{w:function(){return i}});var r=e(2791),t=e(4299),c=e(4456),n=e(7931),i=function(a){var s=a.isLoading,e=a.isSuccess,i=a.isError,d=a.errorText,u=(0,c.TL)();(0,r.useEffect)((function(){s&&u((0,n.Wf)({status:t.Q.LOADING})),e&&u((0,n.Wf)({status:t.Q.SUCCEEDED})),i&&(u((0,n.Wf)({status:t.Q.FAILED})),u((0,n.K8)({errorText:d||"Something went wrong"})))}),[u,s,e,i,d])}},9452:function(a,s,e){e.r(s),e.d(s,{default:function(){return k}});var r=e(9439),t=e(2791),c=e(7689),n=e(1087),i="Cards_wrapper__D0N7r",d="Cards_cursor__UviEa",u="Cards_addButton__0eTTD",o="Cards_title__L+6TK",l=e(9056),f=e(5512),p=e(44),m=e(6398),_=e(1964),g=e(6246),C=e(184),k=(0,t.memo)((function(){var a,s=(0,c.UO)(),e=(0,n.lr)(),k=(0,r.Z)(e,1)[0],h=(0,c.s0)(),v=(0,c.TH)(),w=s.id,E=k.get("sort")||"0updated",x=Number(k.get("page"))||1,N=null===v||void 0===v||null===(a=v.state)||void 0===a?void 0:a.packs,T=(0,t.useState)(),L=(0,r.Z)(T,2),j=L[0],I=L[1],b=(0,m.WH)({cardsPack_id:w,page:x,sortCards:E,pageCount:p.tC},{skip:!w}),D=b.data,P=b.isSuccess,S=b.isLoading,W=b.isFetching,A=b.isError;return(0,_.w)({isLoading:W||S,isSuccess:P,isError:A}),(0,t.useEffect)((function(){if(P&&null!==D&&void 0!==D&&D.cards){var a=D.cards.map((function(a){var s=a.question,e=a.answer,r=a.updated,t=a.grade;return{id:a._id,userId:a.user_id,cardsPackId:a.cardsPack_id,tableValues:{question:s,answer:e,updated:(0,g.fc)(r),rating:(0,C.jsx)(l.iG,{grade:t})}}}));I(a)}}),[P,D]),P&&j?(0,C.jsxs)("div",{className:i,children:[(0,C.jsx)("h2",{onClick:function(){h({pathname:"/packs",search:"?".concat((0,n.fW)(N))})},className:"".concat(d," ").concat(o),children:"\u2190 Pack Name"}),(0,C.jsxs)(f.n$,{itemName:"cards",cardsPackId:w,children:[" ",(0,C.jsx)(l.zL,{className:u,children:"Add card"})]}),(0,C.jsx)(l.iA,{tableTitles:p.Cw,tableItems:j,itemName:"cards"}),(0,C.jsx)(l.tl,{totalItemCount:D.cardsTotalCount,currentPage:x})]}):null}))}}]);
//# sourceMappingURL=452.adfee9b7.chunk.js.map