"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[929],{535:function(e,r,s){s.d(r,{Oo:function(){return o},o3:function(){return n}});var i="password",n=[{register:"email",placeholder:"Enter your email",type:"email"},{register:"password",placeholder:"Enter a new password",type:i},{register:"confirmPassword",placeholder:"Confirm your password",type:i}],o={REMEMBER_ME:"rememberMe",EMAIL:"email",PASSWORD:"password",NAME:"name",CONFIRM_PASSWORD:"confirmPassword"}},1964:function(e,r,s){s.d(r,{w:function(){return a}});var i=s(2791),n=s(4299),o=s(4456),t=s(7931),a=function(e){var r=e.isLoading,s=e.isSuccess,a=e.isError,l=e.errorText,d=(0,o.TL)();(0,i.useEffect)((function(){r&&d((0,t.Wf)({status:n.Q.LOADING})),s&&d((0,t.Wf)({status:n.Q.SUCCEEDED})),a&&(d((0,t.Wf)({status:n.Q.FAILED})),d((0,t.K8)({errorText:l||"Something went wrong"})))}),[d,r,s,a,l])}},5929:function(e,r,s){s.r(r);var i=s(1413),n=s(9439),o=s(2791),t=s(5705),a=s(7689),l=s(1087),d=s(7181),c=s(9056),u=s(535),m=s(3763),p=s(1955),_=s(1679),g=s(1964),f=s(4456),L=s(7931),E=s(6246),h=s(184);r.default=function(){var e,r,s,w=(0,f.TL)(),v=(0,a.TH)(),M=(0,_.YA)(),S=(0,n.Z)(M,2),b=S[0],x=S[1],O=x.data,R=x.isError,A=x.isLoading,Z=x.isSuccess,k=(0,f.CG)((function(e){return e.auth.isLoggedIn})),B=(null===v||void 0===v||null===(e=v.state)||void 0===e||null===(r=e.from)||void 0===r?void 0:r.pathname)||"/",j=null===v||void 0===v||null===(s=v.state)||void 0===s?void 0:s.emailFromRegister;(0,o.useEffect)((function(){O&&(w((0,L.uA)(!0)),w((0,L._J)(O)))}),[O,w]),(0,g.w)({isLoading:A,isSuccess:Z,isError:R});var y=(0,t.TA)({initialValues:{email:j||"nastyh1233@gmail.com",password:"12345678",rememberMe:!1},validate:function(e){var r={};return(0,E.m7)(e,r),r},onSubmit:function(e){b(e)}}),D=!(!y.errors.email&&!y.errors.password)||A;return k?(0,h.jsx)(a.Fg,{to:B}):(0,h.jsxs)("div",{className:d.Z.wrapper,children:[(0,h.jsx)("h2",{className:d.Z.title,children:"Welcome"}),(0,h.jsxs)("form",{className:d.Z.form,onSubmit:y.handleSubmit,children:[(0,h.jsxs)("div",{className:d.Z.inputsWrapper,children:[(0,h.jsx)(c.Sp,{validationErr:y.touched.email&&y.errors.email||m.v6,formikProps:y.getFieldProps(u.Oo.EMAIL)}),(0,h.jsx)(c.Sp,{validationErr:y.touched.password&&y.errors.password||m.v6,formikProps:y.getFieldProps(u.Oo.PASSWORD),type:"password"})]}),(0,h.jsx)(c._t,(0,i.Z)((0,i.Z)({checked:y.values.rememberMe},y.getFieldProps(u.Oo.REMEMBER_ME)),{},{children:"Remember Me"})),(0,h.jsx)(c.zL,{className:d.Z.submitBtn,type:"submit",disabled:D,children:"Login"})]}),(0,h.jsxs)("div",{className:d.Z.row,children:[(0,h.jsx)(l.OL,{className:d.Z.registerLink,to:p.Z.REGISTRATION,children:"Register"}),(0,h.jsx)(l.OL,{className:d.Z.registerLink,to:p.Z.FORGOT_PASSWORD,children:"Lost Password?"})]})]})}},7181:function(e,r){r.Z={wrapper:"Login_wrapper__1rI2S",form:"Login_form__LxTDf",inputsWrapper:"Login_inputsWrapper__FcfGc",registrationBtns:"Login_registrationBtns__4bEon",submitBtn:"Login_submitBtn__oXced",registerLink:"Login_registerLink__D-fug",row:"Login_row__bysr9",title:"Login_title__-Qf3T",sendMailBlock:"Login_sendMailBlock__0MDly",sendMailBtn:"Login_sendMailBtn__DEA8C",sendMailMessage:"Login_sendMailMessage__VIUxh",registerBtn:"Login_registerBtn__OeUh8"}}}]);
//# sourceMappingURL=929.3473246c.chunk.js.map