(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[7],{270:function(t,a,e){"use strict";e.d(a,"a",(function(){return d}));var c=e(0),s=e(142),r=e(21),n=e(65),d=function(t){var a=t.isLoading,e=t.isSuccess,d=t.isError,i=Object(r.b)();Object(c.useEffect)((function(){a&&i(Object(n.a)({status:s.a.LOADING})),e&&i(Object(n.a)({status:s.a.SUCCEEDED})),d&&(i(Object(n.a)({status:s.a.FAILED})),i(Object(n.b)({errorText:"Something went wrong"})))}),[i,a,e,d])}},279:function(t,a,e){t.exports={wrapper:"Cards_wrapper__1uBgm",btn:"Cards_btn__1JwZG",cursor:"Cards_cursor__h5j34",addButton:"Cards_addButton__1VzKM",title:"Cards_title__1Wh2f"}},287:function(t,a,e){"use strict";e.r(a);var c=e(4),s=e(0),r=e(13),n=e(23),d=e(279),i=e.n(d),u=e(75),o=e(122),b=e(88),j=e(52),l=e(270),p=e(66),O=e(1),m=Object(s.memo)((function(){var t,a=Object(r.q)(),e=Object(n.d)(),d=Object(c.a)(e,1)[0],m=Object(r.o)(),_=Object(r.l)(),f=a.id,g=d.get("sort")||"0updated",h=Number(d.get("page"))||1,C=null===_||void 0===_||null===(t=_.state)||void 0===t?void 0:t.packs,k=Object(s.useState)(),v=Object(c.a)(k,2),w=v[0],x=v[1],E=Object(j.c)({cardsPack_id:f,page:h,sortCards:g,pageCount:b.c},{skip:!f}),N=E.data,I=E.isSuccess,P=E.isLoading,S=E.isError;return Object(l.a)({isLoading:P,isSuccess:I,isError:S}),Object(s.useEffect)((function(){if(I&&null!==N&&void 0!==N&&N.cards){var t=N.cards.map((function(t){var a=t.question,e=t.answer,c=t.updated,s=t.grade;return{id:t._id,userId:t.user_id,cardsPackId:t.cardsPack_id,tableValues:{question:a,answer:e,updated:Object(p.a)(c),rating:Object(O.jsx)(u.n,{grade:s})}}}));x(t)}}),[I,N]),I&&w?Object(O.jsxs)("div",{className:i.a.wrapper,children:[Object(O.jsx)("h2",{onClick:function(){m({pathname:"/packs",search:"?".concat(Object(n.c)(C))})},className:"".concat(i.a.cursor," ").concat(i.a.title),children:"\u2190 Pack Name"}),Object(O.jsxs)(o.a,{itemName:"cards",cardsPackId:f,children:[" ",Object(O.jsx)(u.r,{className:i.a.addButton,children:"Add card"})]}),Object(O.jsx)(u.u,{tableTitles:b.a,tableItems:w,itemName:"cards"}),Object(O.jsx)(u.j,{totalItemCount:N.cardsTotalCount,currentPage:h})]}):null}));a.default=m}}]);
//# sourceMappingURL=7.394785f2.chunk.js.map