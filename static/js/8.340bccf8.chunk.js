(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[8],{274:function(a,e,t){a.exports={wrapper:"Cards_wrapper__1uBgm",btn:"Cards_btn__1JwZG",cursor:"Cards_cursor__h5j34",addButton:"Cards_addButton__1VzKM"}},281:function(a,e,t){"use strict";t.r(e);var c=t(4),s=t(0),r=t(13),d=t(24),n=t(274),u=t.n(n),i=t(140),o=t(117),j=t(79),b=t(47),p=t(84),l=t(1),O=Object(s.memo)((function(){var a,e=Object(r.q)(),t=Object(d.d)(),n=Object(c.a)(t,1)[0],O=Object(r.o)(),m=Object(r.l)(),_=e.id,g=n.get("sort")||"0updated",h=Number(n.get("page"))||1,k=null===m||void 0===m||null===(a=m.state)||void 0===a?void 0:a.packs,f=Object(s.useState)(),v=Object(c.a)(f,2),x=v[0],C=v[1],w=Object(b.c)({cardsPack_id:_,page:h,sortCards:g,pageCount:j.c},{skip:!_}),N=w.data,P=w.isSuccess,I=w.isLoading;return Object(s.useEffect)((function(){if(P&&null!==N&&void 0!==N&&N.cards){var a=N.cards.map((function(a){var e=a.question,t=a.answer,c=a.updated,s=a.grade;return{id:a._id,userId:a.user_id,cardsPackId:a.cardsPack_id,tableValues:{question:e,answer:t,updated:Object(p.a)(c),rating:Object(l.jsx)(i.k,{grade:s})}}}));C(a)}}),[P,N]),I?Object(l.jsx)(i.h,{}):P&&x?Object(l.jsxs)("div",{className:u.a.wrapper,children:[Object(l.jsx)("h2",{onClick:function(){O({pathname:"/packs",search:"?".concat(Object(d.c)(k))})},className:u.a.cursor,children:"\u2190 Pack Name"}),Object(l.jsxs)(o.a,{itemName:"cards",cardsPackId:_,children:[" ",Object(l.jsx)(i.m,{className:u.a.addButton,children:"Add card"})]}),Object(l.jsx)(i.p,{tableTitles:j.a,tableItems:x,itemName:"cards"}),Object(l.jsx)(i.g,{totalItemCount:N.cardsTotalCount,currentPage:h})]}):null}));e.default=O}}]);
//# sourceMappingURL=8.340bccf8.chunk.js.map