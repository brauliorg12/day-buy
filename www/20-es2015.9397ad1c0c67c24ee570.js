(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{wDXw:function(t,n,i){"use strict";i.r(n),i.d(n,"LoginPageModule",(function(){return R}));var o=i("ofXK"),e=i("3Pt+"),c=i("tyNb"),r=i("TEn/"),s=i("mrSG"),a=i("fXoL"),l=i("on2l"),p=i("5egi"),d=i("e8h1");function u(t,n){1&t&&(a.dc(0,"ion-header"),a.dc(1,"ion-toolbar",2),a.dc(2,"ion-buttons",3),a.Yb(3,"ion-back-button",4),a.dc(4,"ion-title"),a.Lc(5,"Iniciar Sesi\xf3n"),a.cc(),a.cc(),a.cc(),a.cc())}function f(t,n){if(1&t){const t=a.ec();a.dc(0,"ion-icon",17),a.lc("click",(function(){return a.Dc(t),a.pc(3).changeTypeText()})),a.cc()}}function g(t,n){if(1&t){const t=a.ec();a.dc(0,"ion-icon",18),a.lc("click",(function(){return a.Dc(t),a.pc(3).changeTypePass()})),a.cc()}}function b(t,n){1&t&&(a.dc(0,"ion-button",19),a.Lc(1," Ingresar "),a.cc())}function m(t,n){1&t&&(a.dc(0,"ion-button",20),a.Lc(1," Ingresar "),a.cc())}function h(t,n){if(1&t){const t=a.ec();a.bc(0),a.dc(1,"form",6,7),a.lc("ngSubmit",(function(){a.Dc(t);const n=a.Ac(2);return a.pc(2).login(n)})),a.dc(3,"ion-row"),a.dc(4,"ion-col"),a.dc(5,"ion-list"),a.dc(6,"ion-item",8),a.dc(7,"ion-label",2),a.Lc(8,"Email: "),a.cc(),a.dc(9,"ion-input",9,10),a.lc("ngModelChange",(function(n){return a.Dc(t),a.pc(2).loginUser.email=n})),a.cc(),a.cc(),a.dc(11,"ion-item",8),a.dc(12,"ion-label",2),a.Lc(13,"Contrase\xf1a: "),a.cc(),a.dc(14,"ion-input",11),a.lc("ngModelChange",(function(n){return a.Dc(t),a.pc(2).loginUser.password=n})),a.cc(),a.Kc(15,f,1,0,"ion-icon",12),a.Kc(16,g,1,0,"ion-icon",13),a.cc(),a.cc(),a.cc(),a.cc(),a.dc(17,"ion-row"),a.dc(18,"ion-col"),a.Kc(19,b,2,0,"ion-button",14),a.Kc(20,m,2,0,"ion-button",15),a.cc(),a.cc(),a.Yb(21,"br"),a.dc(22,"ion-button",16),a.lc("click",(function(){return a.Dc(t),a.pc(2).backNewL()})),a.dc(23,"ion-text"),a.Lc(24,"Volver"),a.cc(),a.cc(),a.cc(),a.ac()}if(2&t){const t=a.Ac(2),n=a.pc(2);a.Mb(9),a.uc("ngModel",n.loginUser.email),a.Mb(5),a.uc("type",n.passtype)("ngModel",n.loginUser.password),a.Mb(1),a.uc("ngIf","password"===n.passtype),a.Mb(1),a.uc("ngIf","text"===n.passtype),a.Mb(3),a.uc("ngIf",n.loginUser.email&&n.loginUser.password&&t.valid),a.Mb(1),a.uc("ngIf",!n.loginUser.email||!n.loginUser.password||!t.valid)}}function y(t,n){if(1&t){const t=a.ec();a.bc(0),a.dc(1,"ion-row"),a.dc(2,"ion-col"),a.dc(3,"ion-button",21),a.lc("click",(function(){return a.Dc(t),a.pc(3).registerNew()})),a.dc(4,"b"),a.Lc(5,"Registrarme"),a.cc(),a.cc(),a.cc(),a.cc(),a.ac()}}function w(t,n){if(1&t){const t=a.ec();a.bc(0),a.dc(1,"ion-row"),a.dc(2,"ion-col"),a.dc(3,"ion-button",16),a.lc("click",(function(){return a.Dc(t),a.pc(3).fbToLogin()})),a.dc(4,"ion-text",2),a.dc(5,"b"),a.Lc(6,"Iniciar sesi\xf3n"),a.cc(),a.cc(),a.cc(),a.cc(),a.cc(),a.ac()}}function x(t,n){if(1&t){const t=a.ec();a.bc(0),a.dc(1,"ion-row"),a.dc(2,"ion-col"),a.dc(3,"ion-button",22),a.lc("click",(function(){return a.Dc(t),a.pc(3).registerNew()})),a.dc(4,"ion-text",2),a.dc(5,"b"),a.Lc(6,"Registrarme"),a.cc(),a.cc(),a.cc(),a.cc(),a.cc(),a.dc(7,"ion-row"),a.dc(8,"ion-col"),a.dc(9,"ion-text",23),a.Lc(10,"\xbfYa ten\xe9s cuenta? "),a.dc(11,"ion-text",2),a.dc(12,"b",24),a.lc("click",(function(){return a.Dc(t),a.pc(3).fbToLogin()})),a.Lc(13,"Iniciar sesi\xf3n"),a.cc(),a.cc(),a.cc(),a.cc(),a.cc(),a.ac()}}function _(t,n){if(1&t&&(a.bc(0),a.Yb(1,"br"),a.Kc(2,y,6,0,"ng-container",0),a.Zb(3),a.Kc(4,w,7,0,"ng-container",0),a.Kc(5,x,14,0,"ng-container",0),a.ac()),2&t){const t=a.pc(2);a.Mb(2),a.uc("ngIf",t.web),a.Mb(2),a.uc("ngIf",t.web),a.Mb(1),a.uc("ngIf",!t.web)}}function M(t,n){if(1&t&&(a.dc(0,"div"),a.dc(1,"ion-grid",5),a.Kc(2,h,25,7,"ng-container",0),a.Kc(3,_,6,3,"ng-container",0),a.cc(),a.cc()),2&t){const t=a.pc();a.Mb(2),a.uc("ngIf","login"===t.fborlogin&&t.touchL),a.Mb(1),a.uc("ngIf","fb"===t.fborlogin&&!t.touchR&&!t.touchL)}}function v(t,n){if(1&t){const t=a.ec();a.dc(0,"ion-icon",17),a.lc("click",(function(){return a.Dc(t),a.pc(2).changeTypeText()})),a.cc()}}function k(t,n){if(1&t){const t=a.ec();a.dc(0,"ion-icon",18),a.lc("click",(function(){return a.Dc(t),a.pc(2).changeTypePass()})),a.cc()}}function C(t,n){1&t&&(a.dc(0,"ion-text",35),a.Lc(1,"\xa0 "),a.Yb(2,"ion-icon",36),a.Lc(3,"\xa0Las contrase\xf1as no coinciden "),a.cc())}function O(t,n){if(1&t){const t=a.ec();a.dc(0,"ion-button",37),a.lc("click",(function(){return a.Dc(t),a.pc(2).registro()})),a.Lc(1," Crear usuario "),a.cc()}}function P(t,n){1&t&&(a.dc(0,"ion-button",38),a.Lc(1," Crear usuario "),a.cc())}function L(t,n){if(1&t){const t=a.ec();a.dc(0,"div"),a.dc(1,"ion-grid"),a.dc(2,"form",25),a.dc(3,"ion-row"),a.dc(4,"ion-col"),a.dc(5,"ion-list"),a.dc(6,"ion-item",8),a.dc(7,"ion-label",26),a.Lc(8,"Email:"),a.cc(),a.Yb(9,"ion-input",27,28),a.cc(),a.dc(11,"ion-item",8),a.dc(12,"ion-label",26),a.Lc(13,"Nombre:"),a.cc(),a.Yb(14,"ion-input",29),a.cc(),a.dc(15,"ion-item",8),a.dc(16,"ion-label",26),a.Lc(17,"Contrase\xf1a:"),a.cc(),a.Yb(18,"ion-input",30),a.Kc(19,v,1,0,"ion-icon",12),a.Kc(20,k,1,0,"ion-icon",13),a.cc(),a.dc(21,"ion-item",8),a.dc(22,"ion-label",26),a.Lc(23,"Repetir Contrase\xf1a:"),a.cc(),a.Yb(24,"ion-input",31),a.cc(),a.Kc(25,C,4,0,"ion-text",32),a.cc(),a.cc(),a.cc(),a.Yb(26,"br"),a.dc(27,"ion-row"),a.dc(28,"ion-col"),a.Kc(29,O,2,0,"ion-button",33),a.Kc(30,P,2,0,"ion-button",34),a.cc(),a.cc(),a.Yb(31,"br"),a.dc(32,"ion-button",16),a.lc("click",(function(){return a.Dc(t),a.pc().backNewR()})),a.dc(33,"ion-text"),a.Lc(34,"Volver"),a.cc(),a.cc(),a.cc(),a.cc(),a.cc()}if(2&t){const t=a.pc();a.Mb(2),a.uc("formGroup",t.registerUser),a.Mb(16),a.uc("type",t.passtype),a.Mb(1),a.uc("ngIf","password"===t.passtype),a.Mb(1),a.uc("ngIf","text"===t.passtype),a.Mb(4),a.uc("type",t.passtype),a.Mb(1),a.uc("ngIf",t.registerUser.get("password_c").errors&&(t.registerUser.get("password_c").dirty||t.registerUser.get("password_c").touched)),a.Mb(4),a.uc("ngIf",t.registerUser.valid),a.Mb(1),a.uc("ngIf",!t.registerUser.valid)}}const I=[{path:"",component:(()=>{class t{constructor(t,n,i,o,c,r,s,a){this.router=t,this.navCtrl=n,this.usuarioService=i,this.uiService=o,this.storage=c,this.formBuilder=r,this.platform=s,this.loadingController=a,this.loginUser={email:"",password:""},this.fborlogin="fb",this.userReady="false",this.passtype="password",this.isLoggedIn=!1,this.large=23232323,this.short=23,this.confirmp=!1,this.touchL=!1,this.touchR=!1,this.isGoogleLogin=!1,this.registerUser=this.formBuilder.group({_id:[""],email:["",e.s.required],nombre:["",e.s.required],password:new e.c("",e.s.compose([e.s.minLength(5),e.s.required])),password_c:["",[e.s.required,this.matchValues("password")]],avatar:["av-1.png"],role:["user"],fb:["false"]})}matchValues(t){return n=>n.parent&&n.parent.value&&n.value===n.parent.controls[t].value?null:{isMatching:!1}}ionViewWillEnter(){this.storage.get("token").then(t=>{t?this.navCtrl.navigateRoot("/inicio",{animated:!0,animationDirection:"forward"}):this.userReady="false"})}ngOnInit(){return Object(s.a)(this,void 0,void 0,(function*(){this.platform.is("capacitor")?this.platform.ready().then(()=>{}):this.web=!0,this.loading=yield this.loadingController.create({message:"Connecting ..."})}))}changeTypeText(){this.passtype="text"}changeTypePass(){this.passtype="password"}login(t){return Object(s.a)(this,void 0,void 0,(function*(){this.userReady="true",t.invalid||(yield this.usuarioService.login(this.loginUser.email,this.loginUser.password).then(t=>Object(s.a)(this,void 0,void 0,(function*(){if(t){const t="false";yield this.storage.set("user",{fb:t}).then(t=>{this.user={fb:t.fb},this.navCtrl.navigateRoot("/inicio",{animated:!0,animationDirection:"forward"}),this.loginUser.email="",this.loginUser.password="",this.touchL=!1,this.fborlogin="fb"},t=>{}),this.userReady="ok"}else this.userReady="false",this.uiService.alertaInformativa("Usuario y contrase\xf1a no son correctos.")}))))}))}registro(){return Object(s.a)(this,void 0,void 0,(function*(){this.userReady="true",yield this.usuarioService.registro(this.registerUser.value).then(t=>Object(s.a)(this,void 0,void 0,(function*(){if(t){const t="false";yield this.storage.set("user",{fb:t}).then(t=>{this.user={fb:t.fb},this.navCtrl.navigateRoot("/inicio",{animated:!0,animationDirection:"forward"}),this.registerUser.reset(),this.touchR=!1,this.fborlogin="fb"},t=>{}),this.userReady="ok"}else this.userReady="false",this.uiService.alertaInformativa("Ese correo electr\xf3nico ya existe.")})))}))}clicksWhatsapp(){window.location.href="whatsapp://send?text=Hola, tengo inconvenientes para entrar en CoDi.&phone=+5492364624963"}fbToLogin(){this.fborlogin="login",this.touchL=!0,setTimeout(()=>{this.inputEmailL.setFocus()},500)}registerNew(){this.fborlogin="login",this.touchR=!0,setTimeout(()=>{this.inputEmailR.setFocus()},500)}backNewR(){this.fborlogin="fb",this.touchR=!1}backNewL(){this.fborlogin="fb",this.touchL=!1}loginToFb(){this.fborlogin="fb"}openEmergency(){this.router.navigateByUrl("/main/tabs/emergencias")}}return t.\u0275fac=function(n){return new(n||t)(a.Xb(c.g),a.Xb(r.Z),a.Xb(l.a),a.Xb(p.a),a.Xb(d.b),a.Xb(e.b),a.Xb(r.bb),a.Xb(r.W))},t.\u0275cmp=a.Rb({type:t,selectors:[["app-login"]],viewQuery:function(t,n){var i;1&t&&(a.Pc(r.v,!0),a.Pc(r.v,!0)),2&t&&(a.zc(i=a.mc())&&(n.inputEmailR=i.first),a.zc(i=a.mc())&&(n.inputEmailL=i.first))},decls:4,vars:3,consts:[[4,"ngIf"],[1,"ion-text-center"],["color","primary"],["slot","start"],["defaultHref","/tab/inicio"],[1,"grid_login"],[3,"ngSubmit"],["fLogin","ngForm"],["lines","inset"],["name","email","type","email","autocomplete","email","required","","pattern","[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$",3,"ngModel","ngModelChange"],["inputEmailL",""],["name","password","autocomplete","current-password","required","",3,"type","ngModel","ngModelChange"],["name","eye-off-outline",3,"click",4,"ngIf"],["name","eye-outline",3,"click",4,"ngIf"],["type","submit","color","primary","fill","outline","shape","round",4,"ngIf"],["color","primary","fill","outline","shape","round","disabled","",4,"ngIf"],["fill","outline","shape","round",3,"click"],["name","eye-off-outline",3,"click"],["name","eye-outline",3,"click"],["type","submit","color","primary","fill","outline","shape","round"],["color","primary","fill","outline","shape","round","disabled",""],["icon-right","","fill","outline","shape","round","color","none","fill","outline",3,"click"],["fill","outline","shape","round","color","medium",3,"click"],[1,"text_login_y","pointer"],[3,"click"],["novalidate","",3,"formGroup"],["color","primary",1,"form_r"],["type","email","autocomplete","email","formControlName","email","required","","pattern","[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"],["inputEmailR",""],["type","text","formControlName","nombre","autocomplete","name","required","","autocapitalize","on"],["autocomplete","new-password","formControlName","password","required","",3,"type"],["autocomplete","new-password","formControlName","password_c","required","",3,"type"],["color","danger","class","error",4,"ngIf"],["type","submit","color","primary","shape","round",3,"click",4,"ngIf"],["type","submit","color","primary","shape","round","disabled","",4,"ngIf"],["color","danger",1,"error"],["name","alert",1,"icon_error"],["type","submit","color","primary","shape","round",3,"click"],["type","submit","color","primary","shape","round","disabled",""]],template:function(t,n){1&t&&(a.Kc(0,u,6,0,"ion-header",0),a.dc(1,"ion-content",1),a.Kc(2,M,4,2,"div",0),a.Kc(3,L,35,8,"div",0),a.cc()),2&t&&(a.uc("ngIf","false"===n.userReady),a.Mb(2),a.uc("ngIf","false"===n.userReady),a.Mb(1),a.uc("ngIf","false"===n.userReady&&n.touchR))},directives:[o.l,r.p,r.s,r.T,r.i,r.e,r.f,r.R,r.r,e.t,e.m,e.n,r.G,r.o,r.z,r.w,r.y,r.v,r.fb,e.r,e.p,e.l,e.o,r.h,r.O,r.t,e.e,e.d],styles:['.div_logo[_ngcontent-%COMP%]{display:flex;text-align:center}.text_codi[_ngcontent-%COMP%]{position:absolute;left:42%}.pick-avatar[_ngcontent-%COMP%]{width:80px;opacity:.3}.info_filter[_ngcontent-%COMP%]{font-size:17px;padding:.8rem;margin:1rem}.pick-avatar-seleccionado[_ngcontent-%COMP%]{transition:opacity .5s linear;opacity:1!important}.img_codi[_ngcontent-%COMP%]{width:80px;height:80px}.msg-content[_ngcontent-%COMP%]{float:left;position:relative;background:#0f4994;color:#fff;margin-top:1rem;border-radius:10px;padding:.3rem;box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}.msg-content[_ngcontent-%COMP%]   [_ngcontent-%COMP%]:before{content:"";position:absolute;background:transparent;width:10px;height:8px;left:-10px;top:9px;box-sizing:border-box;border-right:10px solid #0f4994;border-top:8px solid transparent;border-bottom:8px solid transparent}.grid_login[_ngcontent-%COMP%]{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);width:100%}.icon_fb[_ngcontent-%COMP%]{color:#4267b2!important;margin-bottom:2rem;min-width:250px}.icon_go[_ngcontent-%COMP%]{color:#d54c3f!important;margin-top:1rem}.text_login_n[_ngcontent-%COMP%]{font-size:.7rem}.icon_error[_ngcontent-%COMP%]{font-size:13px;vertical-align:middle}.error[_ngcontent-%COMP%]{font-size:12px}.form_r[_ngcontent-%COMP%], .text_login[_ngcontent-%COMP%]{font-size:14px}.text_login_first[_ngcontent-%COMP%]{font-size:1.1rem;display:block}.text_login_second[_ngcontent-%COMP%]{font-size:1rem;display:block}.text_login_y[_ngcontent-%COMP%]{font-size:14px}.col_top[_ngcontent-%COMP%]{background-color:#f0f8ff}.icon_size_home[_ngcontent-%COMP%]{position:relative;width:35px;height:25px}.icon_text_login[_ngcontent-%COMP%]{font-size:13px}.pulse1[_ngcontent-%COMP%]{z-index:1;border:3px solid #4267b2;-webkit-animation:pulsejg1 3s linear infinite;animation:pulsejg1 3s linear infinite;border-radius:999px;box-shadow:inset 0 0 15px 10px #4267b2}.pulse1[_ngcontent-%COMP%], .pulse2[_ngcontent-%COMP%]{position:absolute;width:200px;height:200px;margin:auto;top:0;left:0;bottom:0;right:0;opacity:0;box-sizing:border-box}.pulse2[_ngcontent-%COMP%]{z-index:2;border:1px solid #1d28c2;-webkit-animation:pulsejg2 3s linear infinite;animation:pulsejg2 3s linear infinite;border-radius:999px;box-shadow:inset 0 0 12px 5px #4267b2}@-webkit-keyframes pulsejg1{0%{-webkit-transform:scale(.6);opacity:0}50%{-webkit-transform:scale(.6);opacity:0}60%{-webkit-transform:scale(.9);opacity:.2}70%{-webkit-transform:scale(1.1);opacity:.35}80%{-webkit-transform:scale(1.25);opacity:.2}to{-webkit-transform:scale(1.4);opacity:0}}@keyframes pulsejg1{0%{transform:scale(.6);opacity:0}50%{transform:scale(.6);opacity:0}60%{transform:scale(.9);opacity:.1}70%{transform:scale(1.1);opacity:.25}80%{transform:scale(1.25);opacity:.1}to{transform:scale(1.4);opacity:0}}@-webkit-keyframes pulsejg2{0%{-webkit-transform:scale(.6);opacity:0}40%{-webkit-transform:scale(.8);opacity:.05}50%{-webkit-transform:scale(1);opacity:.1}60%{-webkit-transform:scale(1.1);opacity:.3}80%{-webkit-transform:scale(1.2);opacity:.1}to{-webkit-transform:scale(1.3);opacity:0}}@keyframes pulsejg2{0%{transform:scale(.6);opacity:0}40%{transform:scale(.8);opacity:.05}50%{transform:scale(1);opacity:.1}60%{transform:scale(1.1);opacity:.3}80%{transform:scale(1.2);opacity:.1}to{transform:scale(1.3);opacity:0}}.divider_normal[_ngcontent-%COMP%]{min-height:1px}.divider[_ngcontent-%COMP%]{display:flex}.divider[_ngcontent-%COMP%]:after, .divider[_ngcontent-%COMP%]:before{content:"";flex:1}.line[_ngcontent-%COMP%]{align-items:center}.line[_ngcontent-%COMP%]:after, .line[_ngcontent-%COMP%]:before{height:1px;margin:0 1em}.one-line[_ngcontent-%COMP%]:after, .one-line[_ngcontent-%COMP%]:before{background:#b5b5b5}']}),t})()}];let R=(()=>{class t{}return t.\u0275mod=a.Vb({type:t}),t.\u0275inj=a.Ub({factory:function(n){return new(n||t)},imports:[[o.b,e.f,r.U,e.q,c.i.forChild(I)]]}),t})()}}]);