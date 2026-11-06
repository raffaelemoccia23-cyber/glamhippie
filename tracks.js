/* GlamHippie: dati condivisi da tutte le pagine */
(function(){
var SESSION = 1800, MAXGAIN = 0.25;
// Sample values: replace with Erin's approved list of 35 tracks.
var TRACKS = [
 {id:"deep-sleep",cat:"binaural",title:"Deep Sleep",freq:"2 Hz delta · 180 Hz carrier",carrier:180,beat:2,c1:"#C9B8F0",c2:"#F1A3A3",hp:true,desc:"Intended to support deep relaxation before sleep."},
 {id:"schumann",cat:"binaural",title:"Schumann Resonance",freq:"7.83 Hz beat",carrier:200,beat:7.83,c1:"#A8D8C8",c2:"#F6D7A7",hp:true,desc:"Intended to support a calm, grounded feeling."},
 {id:"mood-booster",cat:"binaural",title:"Mood Booster",freq:"10 Hz · Alpha",carrier:200,beat:10,c1:"#FFC9A8",c2:"#F1A3A3",hp:true,desc:"Intended to support a bright, uplifted mood."},
 {id:"positive-mindset",cat:"binaural",title:"Positive Mindset",freq:"10 Hz · Alpha",carrier:210,beat:10,c1:"#FBE3A1",c2:"#F7B6C8",hp:true,desc:"Intended to support a positive, open mindset."},
 {id:"energy",cat:"binaural",title:"Energy",freq:"18 Hz · Beta",carrier:220,beat:18,c1:"#FFB38A",c2:"#FFE08A",hp:true,desc:"Intended to support energy and vitality."},
 {id:"mind-body-detox",cat:"binaural",title:"Mind Body Detox 741Hz",freq:"6 Hz · Theta",carrier:741,beat:6,c1:"#9FD3E6",c2:"#C9B8F0",hp:true,desc:"Intended to support relaxation and wellness."},
 {id:"tissue-repair",cat:"binaural",title:"Tissue Repair 285Hz",freq:"2 Hz · Delta",carrier:285,beat:2,c1:"#F4C7D9",c2:"#B9D7F2",hp:true,desc:"Intended to support rest and relaxation."},
 {id:"immunity",cat:"binaural",title:"Immunity",freq:"8 Hz · Alpha/Theta",carrier:200,beat:8,c1:"#BFE3C0",c2:"#F1A3A3",hp:true,desc:"Intended to support relaxation and wellness."},
 {id:"root",cat:"chakra",title:"Root Chakra",freq:"396 Hz · Red",tone:396,c1:"#F29A9A",c2:"#F6C1A0",hp:false,desc:"Intended to support a grounded, steady feeling."},
 {id:"sacral",cat:"chakra",title:"Sacral Chakra",freq:"417 Hz · Orange",tone:417,c1:"#F7B27A",c2:"#FBD3A6",hp:false,desc:"Intended to support creativity and flow."},
 {id:"solar",cat:"chakra",title:"Solar Plexus Chakra",freq:"528 Hz · Yellow",tone:528,c1:"#F6D66B",c2:"#FBE9A8",hp:false,desc:"Intended to support confidence and calm."},
 {id:"heart",cat:"chakra",title:"Heart Chakra",freq:"639 Hz · Green",tone:639,c1:"#9ED6A6",c2:"#CBEBC9",hp:false,desc:"Intended to support warmth and connection."},
 {id:"throat",cat:"chakra",title:"Throat Chakra",freq:"741 Hz · Blue",tone:741,c1:"#8EC9EC",c2:"#C6E4F5",hp:false,desc:"Intended to support clear, easy expression."},
 {id:"third-eye",cat:"chakra",title:"Third Eye Chakra",freq:"852 Hz · Indigo",tone:852,c1:"#9DA8E8",c2:"#C9C9F2",hp:false,desc:"Intended to support focus and reflection."},
 {id:"crown",cat:"chakra",title:"Crown Chakra",freq:"963 Hz · Violet",tone:963,c1:"#C6A6E8",c2:"#EBD6F5",hp:false,desc:"Intended to support stillness and calm."},
 {id:"inner-peace-111",cat:"isochronic",title:"Inner Peace 111",freq:"111 Hz · 10 Hz pulse",tone:111,pulse:10,c1:"#F1A3A3",c2:"#FDE6D8",hp:false,desc:"Intended to support energy and vitality."},
 {id:"lucky-777",cat:"isochronic",title:"Lucky 777",freq:"777 Hz · 7 Hz pulse",tone:777,pulse:7,c1:"#FFE08A",c2:"#F7B6C8",hp:false,desc:"Intended to support a feeling free of fear."},
 {id:"money-magnet-888",cat:"isochronic",title:"Money Magnet 888",freq:"888 Hz · 8 Hz pulse",tone:888,pulse:8,c1:"#F6D27A",c2:"#F1A3A3",hp:false,desc:"Intended to support a sense of abundance."},
 {id:"tone-741",cat:"isochronic",title:"741 Hz Tone",freq:"741 Hz · 6 Hz pulse",tone:741,pulse:6,c1:"#A9DDE0",c2:"#F6E2B3",hp:false,desc:"Intended to support relaxation and wellness."},
 {id:"tone-285",cat:"isochronic",title:"285 Hz Tone",freq:"285 Hz · 4 Hz pulse",tone:285,pulse:4,c1:"#BFDCEB",c2:"#F1D3D3",hp:true,desc:"Intended to support rest and relaxation."},
 {id:"tone-174",cat:"isochronic",title:"174 Hz Tone",freq:"174 Hz · 4 Hz pulse",tone:174,pulse:4,c1:"#D9C4F0",c2:"#F4D6E4",hp:true,desc:"Intended to support rest and relaxation."}
];
var CATS = [
 {id:"binaural",label:"Binaural",count:17,kind:"Binaural beat"},
 {id:"chakra",label:"Chakras",count:7,kind:"Chakra tone"},
 {id:"isochronic",label:"Isochronic",count:11,kind:"Isochronic tone"}
];
var HP_ICON = '<svg class="i" viewBox="0 0 24 24" role="img" aria-label="Headphones recommended" style="width:16px;height:16px;color:#5A4E53"><path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="4" height="7" rx="2"/><rect x="17" y="14" width="4" height="7" rx="2"/></svg>';
var CHEV = '<svg class="i" viewBox="0 0 24 24" aria-hidden="true" style="width:18px;height:18px"><path d="M9 6l6 6-6 6"/></svg>';

function rgba(h,a){var n=parseInt(h.slice(1),16);return "rgba("+((n>>16)&255)+","+((n>>8)&255)+","+(n&255)+","+a+")";}
function mmss(s){s=Math.max(0,Math.round(s));var m=Math.floor(s/60),r=s%60;return (m<10?"0":"")+m+":"+(r<10?"0":"")+r;}
function dot(t){return "radial-gradient(circle at 30% 28%,rgba(255,255,255,.95) 0%,rgba(255,255,255,0) 46%),linear-gradient(135deg,"+t.c1+","+t.c2+")";}
function cloud(t){return "radial-gradient(circle at 32% 32%,"+t.c1+" 0%,"+rgba(t.c1,0)+" 62%),radial-gradient(circle at 70% 70%,"+t.c2+" 0%,"+rgba(t.c2,0)+" 64%)";}
function byId(id){for(var i=0;i<TRACKS.length;i++)if(TRACKS[i].id===id)return TRACKS[i];return null;}
function cat(id){for(var i=0;i<CATS.length;i++)if(CATS[i].id===id)return CATS[i];return CATS[0];}
window.GH={SESSION:SESSION,MAXGAIN:MAXGAIN,TRACKS:TRACKS,CATS:CATS,HP_ICON:HP_ICON,CHEV:CHEV,rgba:rgba,mmss:mmss,dot:dot,cloud:cloud,byId:byId,cat:cat};
})();
