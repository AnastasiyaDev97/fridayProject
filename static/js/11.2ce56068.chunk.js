(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[11],{298:function(e,t,a){e.exports={title:"Profile_title__2i4e6",wrapper:"Profile_wrapper__2Tsef"}},308:function(e,t,a){"use strict";a.r(t);var r=a(4),n=a(0),i=a(298),c=a.n(i),u=a(116),o=a(112),l=a(29),p=a.n(l),s=a(41).a.injectEndpoints({endpoints:function(e){return{updateProfile:e.mutation({query:function(e){return{url:new p.a("auth/me").toString(),method:"PUT",body:e}}})}},overrideExisting:!1}).useUpdateProfileMutation,f=a(22),b=a(75),d=a(1);t.default=function(){var e=Object(f.b)(),t=s(),a=Object(r.a)(t,2),i=a[0],l=a[1],p=l.data,j=l.isError,O=Object(f.c)((function(e){return e.profile.email})),m=Object(f.c)((function(e){return e.profile.avatar})),h=Object(f.c)((function(e){return e.profile.name})),P=Object(f.c)((function(e){return e.profile.publicCardPacksCount})),v=Object(n.useMemo)((function(){return{email:O,avatar:m,name:h,publicCardPacksCount:P}}),[O,m,h,P]),x=Object(n.useCallback)((function(e){e!==m&&i({avatar:e})}),[i,m]),C=Object(n.useCallback)((function(e){e!==h&&i({name:e})}),[i,h]);return Object(n.useEffect)((function(){p&&e(Object(b.d)(p.updatedUser)),j&&e(Object(b.a)({errorText:"Profile failed to update"}))}),[p,e,j]),v?Object(d.jsxs)("div",{className:c.a.wrapper,children:[Object(d.jsx)("h2",{className:c.a.title,children:"Profile Page"}),Object(d.jsx)(o.k,{profileData:v,nameChildren:Object(d.jsx)(o.b,{title:h,updateTitle:C}),avatarChildren:Object(d.jsx)(o.d,{updateImage:x,image:m||u.a})})]}):null}}}]);
//# sourceMappingURL=11.2ce56068.chunk.js.map