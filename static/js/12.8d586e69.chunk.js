(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[12],{299:function(e,s,r){e.exports={usersPage:"Users_usersPage__PcRdQ",title:"Users_title__2CbOb",usersContainer:"Users_usersContainer__3C_0g"}},309:function(e,s,r){"use strict";r.r(s);var t=r(4),a=r(30),u=r(299),n=r.n(u),i=r(116),c=r(112),o=r(94),d=r(17),l=r(29),b=r.n(l),g=r(41).a.injectEndpoints({endpoints:function(e){return{getUsers:e.query({query:function(e){var s=new b.a("social/users");return s.addQuery(Object(d.a)({},e)),{url:s.toString()}}}),getUser:e.query({query:function(e){var s=new b.a("social/user");return s.addQuery(Object(d.a)({},e)),{url:s.toString()}}})}}}),j=g.useGetUsersQuery,m=(g.useGetUserQuery,r(73)),p=r(1),v=Object(m.c)(7);s.default=function(){var e=Object(a.d)(),s=Object(t.a)(e,1)[0],r=s.get("userName"),u=Number(s.get("pageusers"))||1,d=Number(s.get("userMin"))||0,l=Number(s.get("userMax"))||0,b=s.get("sortUsers")||"0created",g=j({page:u,min:d,max:l,userName:r,sortUsers:b,pageCount:o.c}),m=g.data,O=g.isSuccess,C=g.isLoading;g.isError;return Object(p.jsxs)("div",{className:n.a.usersPage,children:[Object(p.jsx)("h2",{className:n.a.title,children:"Users"}),Object(p.jsxs)("div",{className:n.a.usersContainer,children:[O&&m&&m.users.map((function(e){var s=e.avatar,r=e.email,t=e.name,a=e.publicCardPacksCount,u=e._id;return Object(p.jsx)(c.v,{userName:t,userMail:r,cardsCount:a,avatar:null!==s&&void 0!==s?s:i.a},u)})),C&&v.map((function(e){return Object(p.jsx)(c.o,{},e)}))]}),Object(p.jsx)(c.i,{totalItemCount:null===m||void 0===m?void 0:m.usersTotalCount,currentPage:u})]})}}}]);
//# sourceMappingURL=12.8d586e69.chunk.js.map