"use client";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

// ── FLAVORS ──────────────────────────────────────────────────────────────────
const FLAVORS = [
  { id:"original", name:"ORIGINAL", sub:"RED BLAST",    primary:"#dc2626", glow:"rgba(220,38,38,0.75)",  ring:"rgba(220,38,38,0.35)",  bg:"radial-gradient(ellipse at 32% 55%,rgba(220,38,38,0.22) 0%,transparent 62%)",   cardBg:"linear-gradient(145deg,#1c0000,#090000)", img:"/images/can.png",  icon:"⚡", badge:"ULTRA BOOST" },
  { id:"venom",    name:"VENOM",    sub:"TOXIC GREEN",  primary:"#16a34a", glow:"rgba(22,163,74,0.75)",  ring:"rgba(22,163,74,0.35)",  bg:"radial-gradient(ellipse at 68% 45%,rgba(22,163,74,0.22) 0%,transparent 62%)",  cardBg:"linear-gradient(145deg,#001c06,#000a03)", img:"/images/can2.png", icon:"☣", badge:"TOXIC SURGE" },
  { id:"vortex",   name:"VORTEX",   sub:"PURPLE STORM", primary:"#7c3aed", glow:"rgba(124,58,237,0.75)", ring:"rgba(124,58,237,0.35)", bg:"radial-gradient(ellipse at 55% 30%,rgba(124,58,237,0.22) 0%,transparent 62%)", cardBg:"linear-gradient(145deg,#0e0022,#060012)", img:"/images/can3.png", icon:"⟳", badge:"MIND WARP"  },
];

// ── CURSOR ───────────────────────────────────────────────────────────────────
function Cursor() {
  const dot = useRef(null), ring = useRef(null);
  useEffect(() => {
    let raf, tx=0, ty=0, rx=0, ry=0;
    const mv = e => { tx=e.clientX; ty=e.clientY; };
    document.addEventListener("mousemove", mv);
    const loop = () => {
      rx+=(tx-rx)*.18; ry+=(ty-ry)*.18;
      if(dot.current)  { dot.current.style.left=`${tx}px`;  dot.current.style.top=`${ty}px`; }
      if(ring.current) { ring.current.style.left=`${rx}px`; ring.current.style.top=`${ry}px`; }
      raf=requestAnimationFrame(loop);
    };
    raf=requestAnimationFrame(loop);
    const on=()=>{ dot.current?.classList.add("h"); ring.current?.classList.add("h"); };
    const off=()=>{ dot.current?.classList.remove("h"); ring.current?.classList.remove("h"); };
    document.querySelectorAll("button,a,[data-h]").forEach(el=>{ el.addEventListener("mouseenter",on); el.addEventListener("mouseleave",off); });
    return ()=>{ cancelAnimationFrame(raf); document.removeEventListener("mousemove",mv); };
  }, []);
  return (
    <>
      <div ref={dot}  style={{ position:"fixed",width:10,height:10,background:"#fff",borderRadius:"50%",pointerEvents:"none",zIndex:9999,mixBlendMode:"difference",transform:"translate(-50%,-50%)",transition:"transform .1s" }} className="cd" />
      <div ref={ring} style={{ position:"fixed",width:36,height:36,border:"1.5px solid rgba(255,255,255,.35)",borderRadius:"50%",pointerEvents:"none",zIndex:9998,transform:"translate(-50%,-50%)",transition:"width .25s,height .25s" }} className="cr" />
    </>
  );
}

// ── TICKER ────────────────────────────────────────────────────────────────────
function Ticker({ c, current }) {
  const items = useMemo(() => {
    const now = current?.name ? `CURRENT FLAVOR ${current.name}` : "CURRENT FLAVOR";
    return [
      "VOLTX ENERGY",
      "EXTREME FORMULA",
      "300MG CAFFEINE",
      "ZERO SUGAR",
      now,
      current?.sub || "SIGNATURE BLEND",
      "UNLEASH THE ENERGY",
      "FUEL THE GRIND",
      "NO LIMITS",
    ];
  }, [current]);

  return (
    <div style={{ position:"fixed",bottom:0,left:0,right:0,zIndex:50,padding:"13px 0",borderTop:"1px solid rgba(255,255,255,.06)",overflow:"hidden",background:"rgba(0,0,0,.65)",backdropFilter:"blur(20px)" }}>
      <div style={{ display:"flex",whiteSpace:"nowrap",animation:"tickerScroll 22s linear infinite" }}>
        {[...items,...items].map((t,i)=>{
          const active = current?.name && t.toUpperCase().includes(current.name);
          return (
          <div key={i} style={{ fontFamily:"var(--fd)",fontSize:13,letterSpacing:5,color:active?c:"rgba(255,255,255,.22)",padding:"0 48px",textTransform:"uppercase",transition:"color .4s" }}>{t}</div>
        )})}
      </div>
    </div>
  );
}

// ── FLAVOR CARD ───────────────────────────────────────────────────────────────
function FlavorCard({ fl, onSelect }) {
  return (
    <div
      className="fcard"
      data-h
      onClick={onSelect}
      style={{
        position:"relative",
        overflow:"hidden",
        cursor:"pointer",
        minHeight:420,
        transition:"transform .4s cubic-bezier(.16,1,.3,1), box-shadow .35s",
        borderRadius:18,
        border:`1px solid ${fl.primary}55`,
        boxShadow:`0 12px 32px rgba(0,0,0,.35), 0 0 28px ${fl.primary}26 inset`,
        backgroundImage:`linear-gradient(90deg,rgba(0,0,0,.86) 0%,rgba(0,0,0,.55) 42%,rgba(0,0,0,.16) 100%), radial-gradient(ellipse at 80% 40%,${fl.primary}26 0%,transparent 62%), url("${fl.img}"), ${fl.cardBg}`,
        backgroundRepeat:"no-repeat, no-repeat, no-repeat, no-repeat",
        backgroundPosition:"center, center, right -6px center, center",
        backgroundSize:"cover, cover, auto 88%, cover",
      }}
      onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-6px) scale(1.02)"; e.currentTarget.style.boxShadow=`0 24px 42px rgba(0,0,0,.48), 0 0 42px ${fl.primary}44 inset`; }}
      onMouseLeave={e=>{ e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow=`0 12px 32px rgba(0,0,0,.35), 0 0 28px ${fl.primary}26 inset`; }}
    >
      <div style={{ position:"absolute",inset:0,background:`linear-gradient(130deg,transparent 28%,${fl.primary}22 56%,transparent 70%)`,mixBlendMode:"screen",opacity:.36,pointerEvents:"none" }} />
      <div style={{ position:"relative",zIndex:5,padding:"clamp(24px,4vw,40px) clamp(20px,3vw,32px)",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",gap:8 }}>
          <div style={{ fontFamily:"var(--fb)",fontSize:10,letterSpacing:4,textTransform:"uppercase",color:fl.primary,opacity:.9 }}>VOLTX Energy</div>
          <div style={{ fontFamily:"var(--fb)",fontSize:10,letterSpacing:2,textTransform:"uppercase",padding:"6px 10px",borderRadius:999,border:`1px solid ${fl.primary}66`,background:`${fl.primary}24`,color:"#fff" }}>{fl.badge}</div>
        </div>
        <div>
          <div style={{ fontFamily:"var(--fd)",fontSize:"clamp(44px,5vw,66px)",lineHeight:.88,color:"#fff",letterSpacing:2 }}>{fl.name}</div>
          <div style={{ fontFamily:"var(--fc)",fontSize:15,letterSpacing:3,textTransform:"uppercase",color:"rgba(255,255,255,.6)",marginTop:8 }}>{fl.sub}</div>
          <div style={{ display:"inline-block",padding:"8px 14px",borderRadius:50,fontFamily:"var(--fb)",fontSize:10,fontWeight:600,letterSpacing:2,textTransform:"uppercase",marginTop:18,border:`1px solid ${fl.primary}66`,color:"#fff",background:`${fl.primary}2c`,width:"fit-content" }}>500ml · Sugar Free</div>
        </div>
      </div>
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function Hero({ onShopNow, onWatchFilm }) {
  const [active, setActive] = useState(0);
  const canRef   = useRef(null), floatRef = useRef(null), autoRef = useRef(null);
  const hovRef   = useRef(false), rotRef  = useRef(false);
  const dragRef  = useRef({ x:0, ry:0 }), rotY = useRef(0);
  const entRef   = useRef(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const f    = FLAVORS[active];
  const prev = FLAVORS[(active+FLAVORS.length-1)%FLAVORS.length];
  const next = FLAVORS[(active+1)%FLAVORS.length];

  const switchTo = useCallback(idx => {
    if(idx===active) return;
    gsap.to(canRef.current,{ opacity:0,scale:.6,rotationY:25,y:-28,duration:.38,ease:"power2.in",
      onComplete:()=>{ setActive(idx); gsap.fromTo(canRef.current,{ opacity:0,scale:.55,rotationY:-25,y:36 },{ opacity:1,scale:1,rotationY:0,y:0,duration:.72,ease:"back.out(1.5)" }); }
    });
  },[active]);

  const startAuto = useCallback(()=>{
    clearInterval(autoRef.current);
    autoRef.current = setInterval(()=>{ if(!hovRef.current) setActive(p=>(p+1)%FLAVORS.length); },3200);
  },[]);

  useEffect(()=>{
    if (prefersReducedMotion) return;
    if(!canRef.current) return;
    floatRef.current = gsap.to(canRef.current,{ y:-20,duration:3,ease:"sine.inOut",yoyo:true,repeat:-1 });
    return ()=>floatRef.current?.kill();
  },[prefersReducedMotion]);

  useEffect(()=>{ startAuto(); return ()=>clearInterval(autoRef.current); },[startAuto]);

  useEffect(()=>{
    if (prefersReducedMotion) return;
    if(entRef.current) return; entRef.current=true;
    const tl = gsap.timeline({ defaults:{ ease:"power3.out" } });
    tl.from(".e0",{ x:-40,opacity:0,duration:.65 },.4)
      .from(".e1",{ y:90,opacity:0,duration:.8,stagger:.1 },.55)
      .from(".e2",{ y:28,opacity:0,duration:.6 },.95)
      .from(".e3",{ y:18,opacity:0,duration:.55 },1.1)
      .from(".e4",{ y:18,opacity:0,duration:.5 },1.25)
      .from(".e5",{ y:18,opacity:0,duration:.5,stagger:.09 },1.35)
      .from(canRef.current,{ scale:.45,opacity:0,y:70,rotationY:-35,duration:1.05,ease:"back.out(1.6)" },.6)
      .from(".eg",{ opacity:0,duration:.6 },1.2)
      .from(".eb,.et,.ep",{ opacity:0,y:-16,duration:.5,stagger:.1 },1.4)
      .from(".bw",{ scale:1.35,opacity:0,duration:1.6,ease:"power2.out" },0);

    const legendTl = gsap.timeline({ defaults:{ ease:"power3.out" }, delay:.4 });
    legendTl
      .from(".tl-l",{ x:-70,opacity:0,scale:.92,duration:.9 })
      .from(".tl-r",{ x:70,opacity:0,duration:.8 }, "-=.6")
      .from(".fcard",{ y:38,opacity:0,duration:.65,stagger:.12 }, "-=.3");

    const sciTl = gsap.timeline({ defaults:{ ease:"power3.out" }, delay:.8 });
    sciTl
      .from(".sci-a0",{ y:20,opacity:0,duration:.55 })
      .from(".sci-a1",{ y:34,opacity:0,duration:.8 }, "-=.35")
      .from(".sci-a2",{ y:20,opacity:0,duration:.6 }, "-=.45")
      .from(".sci-a3",{ y:24,opacity:0,duration:.55,stagger:.1 }, "-=.35")
      .from(".sci-a4",{ scale:.82,opacity:0,duration:.9 }, "-=.5");
  },[prefersReducedMotion]);

  const onMD = e=>{ rotRef.current=true; dragRef.current={ x:e.clientX,ry:rotY.current }; e.preventDefault(); };
  useEffect(()=>{
    const mm = e=>{ if(!rotRef.current) return; rotY.current=dragRef.current.ry+(e.clientX-dragRef.current.x)*.55; gsap.to(canRef.current,{ rotationY:rotY.current,duration:.08,ease:"none" }); };
    const mu = ()=>{ rotRef.current=false; };
    window.addEventListener("mousemove",mm); window.addEventListener("mouseup",mu);
    return ()=>{ window.removeEventListener("mousemove",mm); window.removeEventListener("mouseup",mu); };
  },[]);

  const onSM = e=>{
    if(rotRef.current||!hovRef.current) return;
    const r=e.currentTarget.getBoundingClientRect();
    const dx=(e.clientX-r.left-r.width/2)/(r.width/2), dy=(e.clientY-r.top-r.height/2)/(r.height/2);
    gsap.to(canRef.current,{ rotationY:dx*28,rotationX:-dy*20,duration:.3,ease:"power2.out",overwrite:"auto" });
  };

  return (
    <div style={{ background:"#050505",minHeight:"100vh",overflowX:"hidden" }}>
      <style>{`
        :root{--fd:'Bebas Neue',sans-serif;--fc:'Barlow Condensed',sans-serif;--fb:'Space Grotesk',sans-serif}
        @keyframes tickerScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes ringPulse{0%{transform:scale(.4);opacity:.9}100%{transform:scale(3);opacity:0}}
        @keyframes shimmer{0%{transform:translateX(-150%)}100%{transform:translateX(250%)}}
        .cd.h{transform:translate(-50%,-50%) scale(3)!important}
        .cr.h{width:0!important;height:0!important}
        /* ── HERO ── */
        .hs{position:relative;z-index:10;min-height:100vh;display:flex;align-items:center;padding:100px clamp(20px,5vw,80px) 60px}
        .hg{display:grid;grid-template-columns:1fr 1.08fr;gap:0;align-items:center;width:100%;max-width:1440px;margin:0 auto;position:relative;z-index:5}
        .hl{padding-top:20px}
        .bw{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:var(--fd);font-size:clamp(100px,20vw,300px);color:transparent;-webkit-text-stroke:1px rgba(255,255,255,.035);white-space:nowrap;pointer-events:none;letter-spacing:12px;z-index:0;user-select:none}
        .hh{font-family:var(--fd);font-size:clamp(72px,10vw,190px);line-height:.87;color:#fff;letter-spacing:-1px;margin-bottom:18px}
        .hh span{display:block}
        .hh .energy-inline{font-size:clamp(84px,11vw,210px);line-height:.82}
        .hs-sub{font-family:var(--fc);font-size:clamp(14px,2vw,28px);color:rgba(255,255,255,.28);font-weight:400;letter-spacing:5px;text-transform:uppercase;margin-bottom:24px}
        .hs-desc{font-family:var(--fb);font-size:clamp(13px,1.2vw,15px);color:rgba(255,255,255,.42);line-height:1.82;max-width:390px;margin-bottom:38px}
        .hs-btns{display:flex;gap:14px;align-items:center;margin-bottom:48px;flex-wrap:wrap}
        .hs-stats{display:flex;gap:clamp(20px,4vw,44px);flex-wrap:wrap}
        .sv{font-family:var(--fd);font-size:clamp(36px,4vw,60px);line-height:1;color:#fff}
        .sl{font-family:var(--fb);font-size:10px;letter-spacing:3px;color:rgba(255,255,255,.3);text-transform:uppercase;margin-top:5px}
        /* can stage */
        .cs{position:relative;height:clamp(480px,60vw,700px);display:flex;align-items:center;justify-content:center}
        .cgo{position:absolute;width:400px;height:400px;border-radius:50%;filter:blur(90px);opacity:.72;pointer-events:none}
        .cr2{position:absolute;width:300px;height:300px;border-radius:50%;border:1px solid;animation:ringPulse 3.2s ease-out infinite;pointer-events:none}
        .cgh{position:absolute;opacity:.14;filter:blur(4px);pointer-events:none;z-index:4}
        .cgh.l{left:clamp(-60px,-8vw,-60px);top:50%;transform:translateY(-50%) rotate(-16deg) scale(.82)}
        .cgh.r{right:clamp(-60px,-8vw,-60px);top:50%;transform:translateY(-50%) rotate(16deg) scale(.82)}
        .cmw{position:absolute;z-index:10;cursor:grab;transform-style:preserve-3d;perspective:900px}
        .cpill{display:flex;flex-direction:column;gap:10px}
        .cbadge{position:absolute;top:clamp(20px,3vw,44px);left:clamp(-10px,-1.5vw,-14px);z-index:20;display:flex;align-items:center;gap:12px;padding:12px 20px;background:rgba(0,0,0,.82);backdrop-filter:blur(24px);border-radius:16px}
        .ctag{position:absolute;left:clamp(-14px,-2vw,-26px);bottom:clamp(40px,6vw,72px);z-index:20;padding:16px 22px;background:rgba(0,0,0,.78);border:1px solid rgba(255,255,255,.09);backdrop-filter:blur(24px);border-radius:16px;min-width:clamp(150px,18vw,188px)}
        .cpr{display:none}
        /* pill btn */
        .btn-primary{position:relative;overflow:hidden;padding:clamp(14px,2vw,18px) clamp(28px,4vw,48px);font-family:var(--fc);font-size:clamp(13px,1.4vw,16px);font-weight:700;letter-spacing:4px;text-transform:uppercase;color:#fff;border:none;cursor:pointer;transition:transform .2s,box-shadow .3s}
        .btn-primary::after{content:'';position:absolute;inset:0;background:linear-gradient(45deg,transparent 35%,rgba(255,255,255,.22) 50%,transparent 65%);animation:shimmer 2.8s linear infinite}
        .btn-primary:hover{transform:translateY(-3px) scale(1.02)}
        .btn-ghost{padding:clamp(14px,2vw,18px) clamp(28px,4vw,48px);font-family:var(--fc);font-size:clamp(13px,1.4vw,16px);font-weight:700;letter-spacing:4px;text-transform:uppercase;border:1.5px solid rgba(255,255,255,.18);background:transparent;color:rgba(255,255,255,.6);cursor:pointer;transition:all .3s}
        .btn-ghost:hover{border-color:#fff;color:#fff;transform:translateY(-2px)}
        /* cans showcase */
        .cas{position:relative;z-index:10;padding:clamp(60px,8vw,110px) clamp(20px,5vw,80px) clamp(60px,8vw,100px);text-align:center}
        .sc-eye{font-family:var(--fb);font-size:11px;letter-spacing:5px;text-transform:uppercase;margin-bottom:16px}
        .sc-h{font-family:var(--fd);font-size:clamp(52px,7vw,110px);color:#fff;letter-spacing:2px;line-height:1;margin-bottom:14px}
        .sc-sub{font-family:var(--fb);font-size:13px;color:rgba(255,255,255,.3);letter-spacing:4px;text-transform:uppercase;margin-bottom:clamp(40px,6vw,72px)}
        .csi{display:flex;justify-content:center;margin-bottom:clamp(40px,6vw,70px)}
        .fgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;max-width:1360px;margin:0 auto}
        .tl-wrap{display:grid;grid-template-columns:1.1fr .9fr;gap:clamp(34px,5vw,80px);align-items:center;max-width:1280px;margin:0 auto;margin-bottom:clamp(50px,7vw,90px)}
        .tl-l{display:flex;justify-content:center}
        .tl-r{text-align:left}
        .tl-img{width:100%;max-width:720px;height:auto;object-fit:contain}
        .of-eyebrow{font-family:var(--fb);font-size:10px;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,.5);margin-bottom:14px}
        .of-grid{display:grid;grid-template-columns:1fr;gap:14px}
        .of-item{padding:16px 18px;border:1px solid rgba(255,255,255,.14);background:linear-gradient(130deg,rgba(255,255,255,.08),rgba(255,255,255,.01));border-radius:14px;position:relative;overflow:hidden;backdrop-filter:blur(10px)}
        .of-item::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:linear-gradient(180deg,transparent,${f.primary},transparent);box-shadow:0 0 28px ${f.glow}}
        .of-item::after{content:'';position:absolute;left:-30%;top:-120%;width:65%;height:280%;background:linear-gradient(180deg,transparent,${f.primary}30,transparent);transform:rotate(18deg);animation:ofSweep 3.2s ease-in-out infinite}
        @keyframes ofSweep{0%,100%{left:-40%;opacity:.3}50%{left:120%;opacity:.8}}
        /* science */
        .sci{position:relative;z-index:10;padding:clamp(70px,9vw,110px) clamp(20px,5vw,80px) clamp(120px,12vw,180px)}
        .scig{display:grid;grid-template-columns:1fr 1fr;gap:clamp(40px,8vw,100px);align-items:center;max-width:1360px;margin:0 auto}
        .sct{font-family:var(--fd);font-size:clamp(52px,6vw,98px);line-height:.88;color:#fff;margin-bottom:28px;letter-spacing:1px}
        .scd{font-family:var(--fb);font-size:clamp(13px,1.2vw,15px);color:rgba(255,255,255,.42);line-height:1.82;margin-bottom:36px}
        .igrid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
        .ic{padding:18px 20px;border:1px solid rgba(255,255,255,.12);border-radius:14px;background:linear-gradient(130deg,rgba(255,255,255,.08),rgba(255,255,255,.01));transition:border-color .3s,background .3s,transform .3s;position:relative;overflow:hidden}
        .ic::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:linear-gradient(180deg,transparent,${f.primary},transparent);box-shadow:0 0 18px ${f.glow}}
        .ic:hover{border-color:rgba(255,255,255,.24);background:rgba(255,255,255,.05);transform:translateY(-4px)}
        .sciv{position:relative;height:clamp(380px,45vw,520px);display:flex;align-items:center;justify-content:center}
        .scinum{position:absolute;font-family:var(--fd);font-size:clamp(120px,18vw,210px);color:transparent;-webkit-text-stroke:1px rgba(255,255,255,.025);letter-spacing:-8px;pointer-events:none;user-select:none}
        .sciv-card{position:absolute;inset:auto auto 0 auto;width:min(88%,420px);padding:14px 16px;border:1px solid rgba(255,255,255,.16);border-radius:14px;background:linear-gradient(145deg,rgba(255,255,255,.08),rgba(255,255,255,.02));backdrop-filter:blur(12px);z-index:8}
        .sci-shell{border:1px solid rgba(255,255,255,.08);border-radius:20px;padding:clamp(24px,4vw,42px);background:linear-gradient(145deg,rgba(255,255,255,.04),rgba(255,255,255,.01));position:relative;overflow:hidden}
        .sci-shell::after{content:'';position:absolute;width:min(44vw,520px);height:min(44vw,520px);right:-14%;top:-22%;border-radius:50%;filter:blur(90px);background:radial-gradient(circle,${f.primary}40,transparent 70%);pointer-events:none}
        /* noise / grid bg */
        .nbg{position:fixed;inset:0;z-index:0;pointer-events:none;background-image:linear-gradient(rgba(255,255,255,.028) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.028) 1px,transparent 1px);background-size:60px 60px}
        .sc{position:fixed;inset:0;z-index:2;pointer-events:none;background:repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,.09) 3px,rgba(0,0,0,.09) 4px)}
        /* RESPONSIVE */
        @media(max-width:1200px){
          .tl-wrap{grid-template-columns:1fr;gap:34px}
          .tl-r{text-align:center}
          .tl-r p{margin-left:auto;margin-right:auto}
          .tl-r .tl-list{justify-content:center}
          .tl-img{max-width:760px}
          .fgrid{grid-template-columns:repeat(2,1fr)}
          .fcard{min-height:380px!important;background-size:cover, cover, auto 82%, cover!important}
        }
        @media(max-width:900px){
          .hg{grid-template-columns:1fr;text-align:center}
          .cs{height:clamp(360px,80vw,520px);order:-1}
          .cgh.l,.cgh.r{display:none}
          .cbadge{display:none}
          .cpr{right:-8px;top:auto;bottom:8px;transform:none;flex-direction:row;gap:8px}
          .cpill{flex-direction:row}
          .ctag{left:50%;transform:translateX(-50%);bottom:-48px;text-align:center;width:fit-content}
          .hs-desc{margin-left:auto;margin-right:auto}
          .hs-stats{justify-content:center}
          .hs-btns{justify-content:center}
          .fgrid{grid-template-columns:1fr}
          .tl-img{max-width:680px}
          .fcard{min-height:360px!important;background-size:cover, cover, auto 78%, cover!important;background-position:center, center, right -14px center, center!important}
          .scig{grid-template-columns:1fr;gap:40px}
          .sciv{height:300px;order:-1}
          .igrid{grid-template-columns:1fr 1fr}
          .bw{display:none}
        }
        @media(max-width:600px){
          .fgrid{grid-template-columns:1fr}
          .igrid{grid-template-columns:1fr}
          .hs-btns{flex-direction:column;align-items:center}
          .btn-primary,.btn-ghost{width:100%;max-width:280px;text-align:center}
          .tl-img{max-width:95vw}
          .fcard{min-height:340px!important;background-size:cover, cover, auto 72%, cover!important}
        }
        /* scrollbar */
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:#050505}
        ::-webkit-scrollbar-thumb{background:#dc2626;border-radius:2px}
        ::selection{background:rgba(220,38,38,.35);color:#fff}
      `}</style>

      <Cursor />
      <div className="nbg" /><div className="sc" />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="hs" style={{ background:`${f.bg},#050505`,transition:"background 1.1s ease" }}>
        <div className="bw">VOLTX</div>
        <div className="hg">

          {/* LEFT */}
          <div className="hl">
            <div className="e0" style={{ display:"flex",alignItems:"center",gap:14,marginBottom:28 }}>
              <div style={{ width:38,height:1.5,background:f.primary,transition:"background .5s",flexShrink:0 }} />
              <span style={{ fontFamily:"var(--fb)",fontSize:11,letterSpacing:5,color:f.primary,textTransform:"uppercase",fontWeight:600,transition:"color .5s" }}>New Formula 2025 — Extreme Energy</span>
            </div>

            <h1 className="hh">
              <span className="e1">UN<span style={{ WebkitTextStroke:`2px ${f.primary}`,color:"transparent",transition:"all .5s" }}>LEASH</span></span>
              <span className="e1">THE <span className="energy-inline" style={{ WebkitTextStroke:`2px ${f.primary}`,color:"transparent",transition:"all .5s" }}>ENERGY</span></span>
            </h1>

            <p className="e2 hs-sub">VOLTX · EXTREME ENERGY DRINK</p>
            <p className="e3 hs-desc">Next-generation fuel for the relentless. 300mg caffeine. Zero sugar. Three legendary flavors. No limits.</p>

            <div className="e4 hs-btns">
              <button onClick={onShopNow} className="btn-primary" data-h style={{ background:f.primary,boxShadow:`0 0 44px ${f.glow}`,transition:"background .5s,box-shadow .5s" }}>Shop Now →</button>
              <button onClick={onWatchFilm} className="btn-ghost"   data-h>Watch Film</button>
            </div>

            <div className="hs-stats">
              {[{v:"300",u:"mg",l:"Caffeine"},{v:"0",u:"g",l:"Sugar"},{v:"500",u:"ml",l:"Per Can"}].map(s=>(
                <div className="e5" key={s.l}>
                  <div className="sv">{s.v}<span style={{ color:f.primary,transition:"color .5s" }}>{s.u}</span></div>
                  <div className="sl">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CAN STAGE */}
          <div className="cs" onMouseMove={onSM}>
            <div className="cgo" style={{ background:`radial-gradient(circle,${f.glow},transparent 70%)`,transition:"background 1s" }} />
            {[0,1,2].map(i=>(
              <div key={i} className="cr2" style={{ borderColor:f.ring,animationDelay:`${i*1.05}s`,transition:"border-color .6s" }} />
            ))}
            <div className="cgh eg l"><Image src={prev?.img || "/images/can.png"} alt="" width={140} height={252} sizes="(max-width: 900px) 80px, 140px" loading="lazy" style={{ objectFit:"contain",width:"clamp(80px,10vw,140px)",height:"auto" }} /></div>
            <div ref={canRef} className="cmw" onMouseDown={onMD} onMouseEnter={()=>{ hovRef.current=true; floatRef.current?.pause(); clearInterval(autoRef.current); }} onMouseLeave={()=>{ hovRef.current=false; floatRef.current?.resume(); gsap.to(canRef.current,{ rotationY:0,rotationX:0,duration:.9,ease:"power2.out" }); rotY.current=0; startAuto(); }}>
              <Image src={f?.img || "/images/can.png"} alt={`VOLTX ${f.name}`} width={300} height={540} priority draggable={false} sizes="(max-width: 900px) 180px, 300px"
                style={{ width:"clamp(180px,20vw,300px)",height:"auto",objectFit:"contain",userSelect:"none",pointerEvents:"none",filter:`drop-shadow(0 0 72px ${f.glow})`,transition:"filter .8s" }} />
            </div>
            <div className="cgh eg r"><Image src={next?.img || "/images/can.png"} alt="" width={140} height={252} sizes="(max-width: 900px) 80px, 140px" loading="lazy" style={{ objectFit:"contain",width:"clamp(80px,10vw,140px)",height:"auto" }} /></div>

            {/* Pills */}
            <div className="eb cpr"><div className="cpill">
              {FLAVORS.map((fl,i)=>(
                <div key={fl.id} data-h onClick={()=>switchTo(i)}
                  style={{ width:44,height:44,borderRadius:12,border:`1.5px solid ${i===active?fl.primary:"rgba(255,255,255,.09)"}`,background:i===active?`${fl.primary}22`:"rgba(255,255,255,.03)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:i===active?`0 0 20px ${fl.primary}88`:"none",transition:"all .3s" }}>
                  <div style={{ width:12,height:12,borderRadius:"50%",background:fl.primary,boxShadow:`0 0 10px ${fl.primary}` }} />
                </div>
              ))}
            </div></div>

            {/* Badge */}
            <div className="eb cbadge" style={{ border:`1px solid ${f.primary}44`,transition:"border-color .5s" }}>
              <div style={{ fontSize:20,width:38,height:38,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",background:`${f.primary}30`,flexShrink:0,transition:"background .5s" }}>{f.icon}</div>
              <div>
                <div style={{ fontFamily:"var(--fc)",fontSize:16,fontWeight:700,color:"#fff",letterSpacing:2.5 }}>{f.badge}</div>
                <div style={{ fontFamily:"var(--fb)",fontSize:10,color:"rgba(255,255,255,.4)",marginTop:2 }}>Clinical-grade energy</div>
              </div>
            </div>

            {/* Tag */}
            <div className="et ctag">
              <div style={{ fontFamily:"var(--fd)",fontSize:28,color:"#fff",letterSpacing:2 }}>{f.name}</div>
              <div style={{ fontFamily:"var(--fb)",fontSize:10,color:"rgba(255,255,255,.4)",letterSpacing:3,textTransform:"uppercase",marginTop:3 }}>{f.sub}</div>
              <div style={{ height:2,marginTop:12,borderRadius:2,background:`linear-gradient(90deg,${f.primary},transparent)`,width:"78%",transition:"background .5s" }} />
            </div>
          </div>
        </div>
      </section>

     {/* ── 3-CAN SHOWCASE ───────────────────────────────────────────────── */}
<section id="flavors" className="cas">
  <div className="sc-eye" style={{ color:f.primary,transition:"color .5s" }}>
    The Collection
  </div>

  <h2 className="sc-h">
    THREE <span style={{ color:f.primary,transition:"color .5s" }}>LEGENDS</span>
  </h2>

  <p className="sc-sub">Every flavor engineered to dominate.</p>

  {/* 🔥 NEW PROFESSIONAL SPLIT SECTION */}
  <div className="tl-wrap">
    {/* LEFT IMAGE */}
    <div className="tl-l">
      <Image
        src="/images/cans-all.png"
        alt="VOLTX All Flavors"
        width={1300}
        height={1100}
        priority
        sizes="(max-width: 1200px) 95vw, 720px"
        className="tl-img"
        style={{ filter: `drop-shadow(0 50px 120px ${f.glow})` }}
      />
    </div>

    {/* RIGHT TEXT */}
    <div className="tl-r">
      <h3
        style={{
          fontFamily: "var(--fd)",
          fontSize: "clamp(40px,5vw,70px)",
          color: "#fff",
          lineHeight: 1,
          marginBottom: 20
        }}
      >
        BUILT FOR <span style={{ color: f.primary }}>DOMINANCE</span>
      </h3>

      <p className="tl-copy"
        style={{
          fontFamily: "var(--fb)",
          fontSize: "clamp(13px,1.2vw,15px)",
          color: "rgba(255,255,255,.42)",
          lineHeight: 1.8,
          marginBottom: 30,
          maxWidth: "420px"
        }}
      >
        Every can in the VOLTX lineup is built with purpose-driven formulation, premium ingredient synergy,
        and a clean finish that sustains output without the crash. From explosive lift to focused endurance,
        each profile is tuned for performance moments that demand more than ordinary energy.
      </p>

      <div className="of-eyebrow">OUR FLAVOURS</div>
      <div className="of-grid tl-list">
        {FLAVORS.map((fl) => (
          <div key={fl.id} className="of-item">
            <div
              style={{
                fontFamily: "var(--fd)",
                fontSize: 24,
                color: "#fff",
                letterSpacing: 1.2
              }}
            >
              {fl.name}
            </div>
            <div
              style={{
                fontFamily: "var(--fb)",
                fontSize: 11,
                color: "rgba(255,255,255,.4)",
                letterSpacing: 2.4,
                textTransform: "uppercase"
              }}
            >
              {fl.sub}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* ✅ YOUR ORIGINAL GRID (UNCHANGED) */}
  <div className="fgrid">
    {FLAVORS.map((fl,i)=>(
      <FlavorCard
        key={fl.id}
        fl={fl}
        onSelect={()=>{ 
          switchTo(i); 
          window.scrollTo({top:0,behavior:"smooth"}); 
        }}
      />
    ))}
  </div>
</section>
      {/* ── SCIENCE ──────────────────────────────────────────────────────── */}
      <section id="science" className="sci">
        <div className="scig sci-shell">
          <div>
            <div className="sci-a0 sc-eye" style={{ color:f.primary,transition:"color .5s",textAlign:"left" }}>The Science</div>
            <h2 className="sci-a1 sct">ENGINEERED<br/>FOR <span style={{ color:f.primary,transition:"color .5s" }}>PEAK</span><br/>PERFORMANCE</h2>
            <p className="sci-a2 scd">Every ingredient clinically dosed for max performance. No fillers. Pure raw energy with precision-calibrated delivery.</p>
            <div className="igrid">
              {[{name:"300mg Caffeine",desc:"Peak alertness"},{name:"Taurine",desc:"Endurance boost"},{name:"B-Vitamins",desc:"Metabolic energy"},{name:"Zero Sugar",desc:"Clean fuel only"}].map(ing=>(
                <div key={ing.name} className="sci-a3 ic">
                  <div style={{ fontFamily:"var(--fc)",fontSize:17,fontWeight:700,color:"#fff",letterSpacing:2 }}>{ing.name}</div>
                  <div style={{ fontFamily:"var(--fb)",fontSize:11,color:"rgba(255,255,255,.32)",marginTop:4 }}>{ing.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="sci-a4 sciv">
            <div style={{ position:"absolute",width:"clamp(260px,35vw,360px)",height:"clamp(260px,35vw,360px)",borderRadius:"50%",filter:"blur(90px)",opacity:.52,background:`radial-gradient(circle,${f.primary},transparent 70%)`,transition:"background 1s" }} />
            <div style={{ position:"absolute", width:"clamp(260px,34vw,420px)", height:"clamp(300px,42vw,480px)", border:`1px solid ${f.primary}55`, borderRadius:28, background:"linear-gradient(160deg,rgba(255,255,255,.08),rgba(255,255,255,.02))", boxShadow:`0 0 40px ${f.glow}` }} />
            <div className="scinum">500</div>
            <Image src={f?.img || "/images/can.png"} alt={`VOLTX ${f.name}`} width={220} height={396} sizes="(max-width: 900px) 140px, 220px" loading="lazy"
              style={{ width:"clamp(140px,16vw,220px)",height:"auto",objectFit:"contain",filter:`drop-shadow(0 0 80px ${f.primary})`,position:"relative",zIndex:5,transition:"filter .8s" }} />
            <div className="sciv-card">
              <div style={{ fontFamily:"var(--fc)", fontSize:14, letterSpacing:3, textTransform:"uppercase", color:"#fff" }}>Power Profile</div>
              <div style={{ display:"flex", gap:14, marginTop:8, flexWrap:"wrap" }}>
                <span style={{ fontFamily:"var(--fb)", fontSize:11, color:"rgba(255,255,255,.72)" }}>Boost 9.8/10</span>
                <span style={{ fontFamily:"var(--fb)", fontSize:11, color:"rgba(255,255,255,.72)" }}>Focus 9.3/10</span>
                <span style={{ fontFamily:"var(--fb)", fontSize:11, color:"rgba(255,255,255,.72)" }}>Crash 1.2/10</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Ticker c={f.primary} current={f} />
    </div>
  );
}