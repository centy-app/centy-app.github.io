import{a as de,b as R}from"./chunk-VOUEVP2L.js";import{a as fe}from"./chunk-6JA4QFV5.js";import"./chunk-UMAUW5TW.js";import{a as pe,e as _,j as ue}from"./chunk-O5LUZGNK.js";import{$ as w,Ab as $,C as b,Cc as se,Db as z,Ic as me,Jc as ce,Ka as l,Kc as le,Ma as p,Oa as u,Pa as I,Qa as L,Ra as s,Sa as o,Sb as A,Ta as f,Tb as N,Va as j,W as D,Wa as B,Xa as x,Ya as T,a as v,aa as y,bb as c,cb as V,dc as U,ea as E,ec as g,fb as H,fc as K,gb as S,gc as J,hb as P,hc as Q,ic as C,jc as W,kc as X,la as O,lc as Y,ma as k,mc as Z,nc as ee,ob as q,oc as te,pc as ie,q as h,qc as re,ra as F,rc as ne,sc as oe,tc as ae,w as M,ya as a,za as d,zb as G}from"./chunk-TO2CRQFP.js";var ge=(()=>{let t=class t{constructor(r,i){this.http=r,this.loginService=i,this.registerUrl=ue.baseApiUrl+"auth/register"}registerAndLoginRemote(r){var i={email:"",token:"",baseCurrencyCode:""};return this.registerRemote(r).pipe(M(m=>m.success?this.loginService.loginRemote({email:r.email,password:r.password}):h(v(v({},m),i))),b(m=>h(v({errors:m?.error?.errors,success:!1},i))))}registerRemote(r){let i={"content-type":"application/json"};return this.http.post(this.registerUrl,r,{headers:i}).pipe(M(()=>h({errors:[],success:!0})),b(m=>h({errors:m?.error?.errors,success:!1})))}};t.\u0275fac=function(i){return new(i||t)(w(z),w(fe))},t.\u0275prov=D({token:t,factory:t.\u0275fac,providedIn:"root"});let e=t;return e})();var ye=(e,t)=>t.code;function Me(e,t){e&1&&f(0,"mat-spinner")}function be(e,t){e&1&&f(0,"img",3)}function we(e,t){e&1&&(s(0,"mat-error"),c(1,"Email is invalid"),o())}function xe(e,t){e&1&&(s(0,"mat-error"),c(1,"Password is required"),o())}function Se(e,t){e&1&&(s(0,"mat-error"),c(1,"Password should match"),o())}function Pe(e,t){if(e&1&&(s(0,"mat-option",7),c(1),o()),e&2){let n=t.$implicit;T("value",n.code),a(),V(n.description)}}function Re(e,t){if(e&1){let n=j();s(0,"form",2),B("ngSubmit",function(){O(n);let i=x();return k(i.onRegister())}),l(1,be,1,0,"img",3),s(2,"mat-form-field")(3,"mat-label"),c(4,"Email"),o(),f(5,"input",4),l(6,we,2,0,"mat-error"),o(),s(7,"mat-form-field")(8,"mat-label"),c(9,"Password"),o(),f(10,"input",5),l(11,xe,2,0,"mat-error"),o(),s(12,"mat-form-field")(13,"mat-label"),c(14,"Confirm password"),o(),f(15,"input",5),l(16,Se,2,0,"mat-error"),o(),s(17,"mat-form-field")(18,"mat-label"),c(19,"Base currency"),o(),s(20,"mat-select",6),I(21,Pe,2,2,"mat-option",7,ye),S(23,"async"),o()(),s(24,"button",8),c(25,"Register"),o()()}if(e&2){let n=x();p("formGroup",n.registerForm),a(),u(n.isDesktopHeight.matches?1:-1),a(4),p("formControl",n.email),a(),u(n.email.invalid?6:-1),a(4),p("formControl",n.password),a(),u(n.password.invalid?11:-1),a(4),p("formControl",n.confirm),a(),u(n.confirm.invalid?16:-1),a(4),p("formControl",n.currency),a(),L(P(23,10,n.currencies$)),a(3),p("disabled",!n.registerForm.valid||n.submitButtonDisabled)}}var et=(()=>{let t=class t{constructor(r,i,m,he,Ce){this.registerService=r,this.changeDetectorRef=i,this.media=m,this.snackBar=he,this.store=Ce,this.submitButtonDisabled=!1,this.currencies$=y(_).select(R.getCurrencies),this.isLoading$=y(_).select(R.getIsLoading),this.destroyRef=y(F)}ngOnInit(){this.initialyzeMediaMatcherListener(),this.initialyzeFormComponents(),this.store.dispatch(new de)}onRegister(){this.submitButtonDisabled=!0,this.registerService.registerAndLoginRemote({email:this.email.value,password:this.password.value,baseCurrencyCode:this.currency.value}).pipe(pe(this.destroyRef)).subscribe(r=>{r.success||r.errors.forEach(i=>{this.snackBar.open(i,"OK")}),this.submitButtonDisabled=!1})}initialyzeMediaMatcherListener(){this.isDesktopHeight=this.media.matchMedia("(min-height: 700px)"),this.isDesktopHeightListener=()=>this.changeDetectorRef.detectChanges(),this.isDesktopHeight.addEventListener("change",this.isDesktopHeightListener)}initialyzeFormComponents(){this.email=new C("",[g.required,g.email]),this.password=new C("",g.required),this.confirm=new C("",g.required),this.currency=new C("",g.required),this.confirm.addValidators(this.createCompareValidator(this.password,this.confirm)),this.registerForm=new Q({email:this.email,password:this.password,confirm:this.confirm,currency:this.currency})}createCompareValidator(r,i){return()=>r.value!==i.value?{match_error:"Password should match"}:null}ngOnDestroy(){this.isDesktopHeight.removeEventListener("change",this.isDesktopHeightListener)}};t.\u0275fac=function(i){return new(i||t)(d(ge),d(q),d(A),d(me),d(_))},t.\u0275cmp=E({type:t,selectors:[["app-register"]],standalone:!0,features:[H],decls:4,vars:3,consts:[["id","register-page"],["id","register-form",3,"formGroup"],["id","register-form",3,"ngSubmit","formGroup"],["src","../../../assets/typing.gif","alt","cat"],["matInput","","required","","autocomplete","new-email","placeholder","name@domain.com","required","",3,"formControl"],["matInput","","type","password","autocomplete","new-password",3,"formControl"],["required","",3,"formControl"],[3,"value"],["mat-raised-button","","color","primary",3,"disabled"]],template:function(i,m){i&1&&(s(0,"div",0),l(1,Me,1,0,"mat-spinner"),S(2,"async"),l(3,Re,26,12,"form",1),o()),i&2&&(a(),u(P(2,1,m.isLoading$)?1:3))},dependencies:[$,G,le,oe,ne,ie,re,se,ae,N,ce,ee,W,U,K,J,Z,te,X,Y],styles:["#register-page[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;height:100%}#register-page[_ngcontent-%COMP%]   #register-form[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center}#register-page[_ngcontent-%COMP%]   #register-form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:-webkit-autofill, #register-page[_ngcontent-%COMP%]   #register-form[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:-webkit-autofill:focus{transition:background-color 600000s 0s,color 600000s 0s}#register-page[_ngcontent-%COMP%]   #register-form[_ngcontent-%COMP%]   input[data-autocompleted][_ngcontent-%COMP%]{background-color:transparent!important}#register-page[_ngcontent-%COMP%]   #register-form[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:210px;margin-bottom:12pt;border-radius:5%}#register-page[_ngcontent-%COMP%]   #register-form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:160pt;height:40pt;font-size:11pt}"]});let e=t;return e})();export{et as RegisterComponent};
