(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[6],{285:function(e,r,t){e.exports={wrapper:"Login_wrapper__2x3h7",form:"Login_form__1Y1Hi",inputsWrapper:"Login_inputsWrapper__3uV0P",registrationBtns:"Login_registrationBtns__egO9s",submitBtn:"Login_submitBtn__2rn6V",registerLink:"Login_registerLink__1o25-",row:"Login_row__Et2_Y",title:"Login_title__20JwF",sendMailBlock:"Login_sendMailBlock__3_DYD",sendMailBtn:"Login_sendMailBtn__3L4Rz",sendMailMessage:"Login_sendMailMessage__1FO15",registerBtn:"Login_registerBtn__1q6kn"}},286:function(e,r,t){"use strict";t.d(r,"b",(function(){return s})),t.d(r,"a",(function(){return a}));var i="password",s=[{register:"email",placeholder:"Enter your email",type:"email"},{register:"password",placeholder:"Enter a new password",type:i},{register:"confirmPassword",placeholder:"Confirm your password",type:i}],a={REMEMBER_ME:"rememberMe",EMAIL:"email",PASSWORD:"password",NAME:"name",CONFIRM_PASSWORD:"confirmPassword"}},303:function(e,r,t){"use strict";t.r(r);var i=t(4),s=t(0),a=t(287),n=t(13),o=t(112),c=t(286),l=t(40),d=t(26),p=t(113),u=t(285),m=t.n(u),_=t(22),b=t(75),g=t(73),j=t(1);r.default=function(){var e,r,t=Object(_.b)(),u=Object(p.d)(),O=Object(i.a)(u,2),h=O[0],f=O[1],w=f.data,v=f.isError,L=Object(n.o)(),M=Object(_.c)((function(e){return e.auth.isRegistered})),B=Object(a.a)({initialValues:{email:l.a,password:l.a,confirmPassword:l.a},validate:function(e){var r={};return Object(g.h)(e,r),r},onSubmit:function(e){var r=e.email,t=e.password;h({email:r,password:t})}}),y=(null===(e=Object.keys(B.errors))||void 0===e?void 0:e.length)>0||0===(null===(r=Object.keys(B.touched))||void 0===r?void 0:r.length);Object(s.useEffect)((function(){w&&t(Object(b.e)(!0)),v&&Object(g.b)(t)}),[w,t,v]);var k,x=Object(s.useCallback)((function(){B.resetForm(),L(d.a.LOGIN)}),[B,L]);return M?Object(j.jsx)(n.a,{to:d.a.LOGIN,state:{emailFromRegister:null===w||void 0===w||null===(k=w.addedUser)||void 0===k?void 0:k.email},replace:!0}):Object(j.jsxs)("div",{className:m.a.wrapper,children:[Object(j.jsx)("h2",{className:m.a.title,children:"Sign up"}),Object(j.jsxs)("form",{onSubmit:B.handleSubmit,className:m.a.form,children:[Object(j.jsx)("div",{className:m.a.inputsWrapper,children:c.b.map((function(e){var r=e.register,t=e.placeholder,i=e.type;return Object(j.jsx)(o.u,{validationErr:B.touched[r]&&B.errors[r]||l.a,formikProps:B.getFieldProps(r),type:i,placeholder:t},r)}))}),Object(j.jsx)("div",{className:m.a.row,children:Object(j.jsxs)("div",{className:m.a.registrationBtns,children:[Object(j.jsx)(o.q,{type:"submit",className:m.a.registerBtn,disabled:y,children:"Register"}),Object(j.jsx)(o.q,{type:"button",onClick:x,className:m.a.registerBtn,children:"Cancel"})]})})]})]})}}}]);
//# sourceMappingURL=6.4b0da330.chunk.js.map