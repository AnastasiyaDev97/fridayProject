(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[4],{268:function(e,r,s){"use strict";s.d(r,"a",(function(){return o}));var t=s(0),i=s(140),a=s(20),n=s(63),o=function(e){var r=e.isLoading,s=e.isSuccess,o=e.isError,c=Object(a.b)();Object(t.useEffect)((function(){r&&c(Object(n.a)({status:i.a.LOADING})),s&&c(Object(n.a)({status:i.a.SUCCEEDED})),o&&(c(Object(n.a)({status:i.a.FAILED})),c(Object(n.b)({errorText:"Something went wrong"})))}),[c,r,s,o])}},270:function(e,r,s){e.exports={wrapper:"Login_wrapper__2x3h7",form:"Login_form__1Y1Hi",inputsWrapper:"Login_inputsWrapper__3uV0P",registrationBtns:"Login_registrationBtns__egO9s",submitBtn:"Login_submitBtn__2rn6V",registerLink:"Login_registerLink__1o25-",row:"Login_row__Et2_Y",title:"Login_title__20JwF",sendMailBlock:"Login_sendMailBlock__3_DYD",sendMailBtn:"Login_sendMailBtn__3L4Rz",sendMailMessage:"Login_sendMailMessage__1FO15",registerBtn:"Login_registerBtn__1q6kn"}},271:function(e,r,s){"use strict";s.d(r,"b",(function(){return i})),s.d(r,"a",(function(){return a}));var t="password",i=[{register:"email",placeholder:"Enter your email",type:"email"},{register:"password",placeholder:"Enter a new password",type:t},{register:"confirmPassword",placeholder:"Confirm your password",type:t}],a={REMEMBER_ME:"rememberMe",EMAIL:"email",PASSWORD:"password",NAME:"name",CONFIRM_PASSWORD:"confirmPassword"}},291:function(e,r,s){"use strict";s.r(r);var t=s(17),i=s(4),a=s(0),n=s(272),o=s(13),c=s(25),l=s(270),d=s.n(l),u=s(268),b=s(73),m=s(271),p=s(33),j=s(22),O=s(103),_=s(20),g=s(63),f=s(64),L=s(1);r.default=function(){var e,r,s,l=Object(_.b)(),E=Object(o.l)(),h=Object(O.b)(),w=Object(i.a)(h,2),M=w[0],v=w[1],S=v.data,R=v.isError,x=v.isLoading,B=v.isSuccess,P=Object(_.c)((function(e){return e.auth.isLoggedIn})),k=(null===E||void 0===E||null===(e=E.state)||void 0===e||null===(r=e.from)||void 0===r?void 0:r.pathname)||"/",N=null===E||void 0===E||null===(s=E.state)||void 0===s?void 0:s.emailFromRegister;Object(a.useEffect)((function(){S&&(l(Object(g.d)(!0)),l(Object(g.e)(S)))}),[S,l]),Object(u.a)({isLoading:x,isSuccess:B,isError:R});var y=Object(n.a)({initialValues:{email:N||"nastyh1233@gmail.com",password:"12345678",rememberMe:!1},validate:function(e){var r={};return Object(f.e)(e,r),r},onSubmit:function(e){M(e)}}),A=!(!y.errors.email&&!y.errors.password);return P?Object(L.jsx)(o.a,{to:k}):Object(L.jsxs)("div",{className:d.a.wrapper,children:[Object(L.jsx)("h2",{className:d.a.title,children:"Welcome"}),Object(L.jsxs)("form",{className:d.a.form,onSubmit:y.handleSubmit,children:[Object(L.jsxs)("div",{className:d.a.inputsWrapper,children:[Object(L.jsx)(b.u,{validationErr:y.touched.email&&y.errors.email||p.a,formikProps:y.getFieldProps(m.a.EMAIL)}),Object(L.jsx)(b.u,{validationErr:y.touched.password&&y.errors.password||p.a,formikProps:y.getFieldProps(m.a.PASSWORD),type:"password"})]}),Object(L.jsx)(b.r,Object(t.a)(Object(t.a)({checked:y.values.rememberMe},y.getFieldProps(m.a.REMEMBER_ME)),{},{children:"Remember Me"})),Object(L.jsx)(b.q,{className:d.a.submitBtn,type:"submit",disabled:A,children:"Login"})]}),Object(L.jsxs)("div",{className:d.a.row,children:[Object(L.jsx)(c.b,{className:d.a.registerLink,to:j.a.REGISTRATION,children:"Register"}),Object(L.jsx)(c.b,{className:d.a.registerLink,to:j.a.FORGOT_PASSWORD,children:"Lost Password?"})]})]})}}}]);
//# sourceMappingURL=4.eebe56a9.chunk.js.map