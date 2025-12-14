"use strict";(()=>{var e={};e.id=819,e.ids=[819],e.modules={145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},9235:(e,r,t)=>{t.r(r),t.d(r,{config:()=>u,default:()=>l,routeModule:()=>d});var s={};t.r(s),t.d(s,{POST:()=>POST});var n=t(1802),a=t(7153),i=t(6249),o=t(3141);async function POST(e){try{let r=await e.json(),{name:t,email:s,phone:n,date:a,time:i,guests:l}=r;if(!t||!s||!n||!a||!i||!l)return o.Z.json({message:"Alle Felder sind erforderlich."},{status:400});let u=`
Neue Reservierung:
👤 Name: ${t}
📧 Email: ${s}
📞 Telefon: ${n}
📅 Datum: ${a}
⏰ Uhrzeit: ${i}
👥 Anzahl G\xe4ste: ${l}
    `.trim();console.log("Reservierung erhalten:",r);let d=`https://wa.me/01627292743?text=${encodeURIComponent(u)}`;return o.Z.json({message:"Reservierung erfolgreich versendet!",whatsappLink:d},{status:200})}catch(e){return console.error("Fehler bei der Reservierung:",e),o.Z.json({message:"Fehler beim Verarbeiten der Reservierung."},{status:500})}}let l=(0,i.l)(s,"default"),u=(0,i.l)(s,"config"),d=new n.PagesAPIRouteModule({definition:{kind:a.x.PAGES_API,page:"/api/reservation",pathname:"/api/reservation",bundlePath:"",filename:""},userland:s})}};var r=require("../../webpack-api-runtime.js");r.C(e);var __webpack_exec__=e=>r(r.s=e),t=r.X(0,[222,141],()=>__webpack_exec__(9235));module.exports=t})();