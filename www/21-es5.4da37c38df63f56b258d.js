!function(){function n(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function t(n,t){for(var e=0;e<t.length;e++){var o=t[e];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(n,o.key,o)}}(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{Tntf:function(e,o,c){"use strict";c.r(o),c.d(o,"ProfilePageModule",(function(){return y}));var i=c("ofXK"),r=c("3Pt+"),a=c("tyNb"),s=c("TEn/"),u=c("mrSG"),l=c("fXoL"),f=c("on2l"),b=c("5egi"),d=c("e8h1"),g=c("riPR");function p(n,t){if(1&n){var e=l.ec();l.dc(0,"div",5),l.dc(1,"ion-tab-button",6),l.lc("click",(function(){return l.Dc(e),l.pc().logout()})),l.Yb(2,"ion-icon",7),l.dc(3,"ion-text",8),l.Lc(4,"Salir"),l.cc(),l.cc(),l.cc()}}function h(n,t){1&n&&(l.dc(0,"ion-content"),l.dc(1,"ion-row",9),l.Yb(2,"ion-spinner",10),l.cc(),l.cc())}function m(n,t){1&n&&(l.dc(0,"ion-item",19),l.Yb(1,"ion-icon",20),l.Lc(2,"\xa0\xa0 "),l.dc(3,"ion-label"),l.dc(4,"h2"),l.Lc(5,"Conectado con Facebook"),l.cc(),l.cc(),l.cc())}function v(n,t){if(1&n){var e=l.ec();l.dc(0,"ion-content"),l.dc(1,"ion-row",11),l.dc(2,"ion-col",12),l.Yb(3,"ion-icon",13),l.cc(),l.cc(),l.dc(4,"ion-row"),l.dc(5,"ion-col"),l.dc(6,"ion-list"),l.dc(7,"ion-item",14),l.dc(8,"ion-label",15),l.Lc(9,"Email"),l.cc(),l.dc(10,"ion-input",16),l.lc("ngModelChange",(function(n){return l.Dc(e),l.pc().user.email=n})),l.cc(),l.cc(),l.dc(11,"ion-item",14),l.dc(12,"ion-label",15),l.Lc(13,"Nombre"),l.cc(),l.dc(14,"ion-input",17),l.lc("ngModelChange",(function(n){return l.Dc(e),l.pc().user.nombre=n})),l.cc(),l.cc(),l.Kc(15,m,6,0,"ion-item",18),l.cc(),l.cc(),l.cc(),l.cc()}if(2&n){var o=l.pc();l.Mb(10),l.uc("ngModel",o.user.email),l.Mb(4),l.uc("ngModel",o.user.nombre),l.Mb(1),l.uc("ngIf","fb"===o.status)}}var x,M,w=[{path:"",component:(x=function(){function e(t,o,c,i,r){n(this,e),this.usuarioService=t,this.uiService=o,this.route=c,this.storage=i,this.refreshEvent=r,this.usuario={},this.user={nombre:"",email:"",avatar:"",avatarfb:"",fb:""},this.status="loading"}var o,c,i;return o=e,(c=[{key:"ionViewWillEnter",value:function(){var n=this;this.status="loading",this.storage.get("usuariocache").then((function(t){return Object(u.a)(n,void 0,void 0,regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(n.t0=t,!n.t0){n.next=19;break}return n.next=4,t.nombre;case 4:return n.t1=n.sent,n.next=7,t.email;case 7:return n.t2=n.sent,n.next=10,t.avatarfb;case 10:return n.t3=n.sent,n.next=13,t.avatar;case 13:return n.t4=n.sent,n.next=16,t.fb;case 16:n.t5=n.sent,this.user={nombre:n.t1,email:n.t2,avatarfb:n.t3,avatar:n.t4,fb:n.t5},this.status="true"===this.user.fb?"fb":"nofb";case 19:case"end":return n.stop()}}),n,this)})))}),(function(n){}))}},{key:"actualizar",value:function(){return Object(u.a)(this,void 0,void 0,regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,this.usuarioService.actualizarUsuario(this.usuario);case 2:if(!n.sent){n.next=6;break}this.uiService.presentToast("Usuario actualizado"),this.route.navigateByUrl("/main/tabs/tab3"),n.next=7;break;case 6:this.uiService.presentToast("No se pudo actualizar");case 7:case"end":return n.stop()}}),n,this)})))}},{key:"logout",value:function(){var n=this;this.usuarioService.logout().then((function(t){t&&(n.user={nombre:"",email:"",avatarfb:"",avatar:"",fb:""},n.refreshEvent.Page())}))}}])&&t(o.prototype,c),i&&t(o,i),e}(),x.\u0275fac=function(n){return new(n||x)(l.Xb(f.a),l.Xb(b.a),l.Xb(a.g),l.Xb(d.b),l.Xb(g.a))},x.\u0275cmp=l.Rb({type:x,selectors:[["app-profile"]],decls:9,vars:3,consts:[["color","primary"],["slot","start"],["defaultHref","/"],["class","ion-float-right",4,"ngIf"],[4,"ngIf"],[1,"ion-float-right"],[3,"click"],["name","exit",1,"blanco"],[1,"blanco"],[1,"center","ion-text-center"],["name","crescent","color","primary"],[1,"top-2"],["size","12",1,"ion-text-center"],["name","person","color","primary",1,"icon_profile"],["lines","inset"],["position","floating","color","primary",1,"text_floating"],["name","email","type","email","required","","readonly","",3,"ngModel","ngModelChange"],["name","nombre","type","text","required","","readonly","",3,"ngModel","ngModelChange"],["lines","none",4,"ngIf"],["lines","none"],["name","logo-facebook",1,"icon_fb"]],template:function(n,t){1&n&&(l.dc(0,"ion-header"),l.dc(1,"ion-toolbar",0),l.dc(2,"ion-buttons",1),l.Yb(3,"ion-back-button",2),l.dc(4,"ion-title"),l.Lc(5,"Mi Perfil"),l.cc(),l.cc(),l.Kc(6,p,5,0,"div",3),l.cc(),l.cc(),l.Kc(7,h,3,0,"ion-content",4),l.Kc(8,v,16,3,"ion-content",4)),2&n&&(l.Mb(6),l.uc("ngIf","loading"!==t.status),l.Mb(1),l.uc("ngIf","loading"===t.status),l.Mb(1),l.uc("ngIf","loading"!==t.status))},directives:[s.s,s.T,s.i,s.e,s.f,s.R,i.l,s.N,s.t,s.O,s.p,s.G,s.M,s.o,s.z,s.w,s.y,s.v,s.fb,r.r,r.l,r.o],styles:[".img-avatar[_ngcontent-%COMP%]{width:170px;border-radius:50%}.col_avatar[_ngcontent-%COMP%]{min-height:182px}.top-20[_ngcontent-%COMP%]{margin-top:20px}.text_floating[_ngcontent-%COMP%]{font-size:18px}.icon_profile[_ngcontent-%COMP%]{width:80px;height:80px}.btn_profile[_ngcontent-%COMP%]{background-color:#0f4c94;color:#fff}.icon_fb[_ngcontent-%COMP%]{color:#4267b2!important}"]}),x)}],y=((M=function t(){n(this,t)}).\u0275mod=l.Vb({type:M}),M.\u0275inj=l.Ub({factory:function(n){return new(n||M)},imports:[[i.b,r.f,s.U,a.i.forChild(w)]]}),M)}}])}();