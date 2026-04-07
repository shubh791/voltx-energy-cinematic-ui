"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Header({ accentColor="#dc2626", onGetYours }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const ref = useRef(null);

  useEffect(()=>{
    const fn = ()=>setScrolled(window.scrollY>60);
    window.addEventListener("scroll",fn);
    gsap.from(ref.current,{ y:-70,opacity:0,duration:.9,ease:"power3.out",delay:.1 });
    return ()=>window.removeEventListener("scroll",fn);
  },[]);

  const links = [
    { label:"Concept", href:"#concept" },
    { label:"Flavors", href:"#flavors" },
    { label:"Showcase", href:"#canshowcase" },
    { label:"Story", href:"#scrollstory" },
    { label:"Science", href:"#science" },
    { label:"Contact", href:"#contact" },
  ];

  return (
    <header ref={ref} style={{ position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"0 clamp(16px,4vw,40px)",height:72,display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:scrolled?"1px solid rgba(255,255,255,.06)":"1px solid transparent",background:scrolled?"rgba(0,0,0,.85)":"transparent",backdropFilter:scrolled?"blur(24px)":"none",transition:"all .4s ease" }}>
      {/* Logo */}
      <div style={{ fontFamily:"'Bebas Neue',sans-serif",fontSize:34,color:"#fff",letterSpacing:3,userSelect:"none" }}>
        VOLT<span style={{ color:accentColor,transition:"color .5s" }}>X</span>
      </div>

      {/* Desktop Nav */}
      <nav style={{ display:"flex",gap:30,alignItems:"center" }} className="desk-nav">
        {links.map(l=>(
          <a key={l.label} href={l.href}
            style={{ color:"rgba(255,255,255,.42)",fontFamily:"'Space Grotesk',sans-serif",fontSize:12,letterSpacing:3,textDecoration:"none",textTransform:"uppercase",fontWeight:500,transition:"color .25s" }}
            onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,.42)"}>{l.label}</a>
        ))}
      </nav>

      {/* CTA */}
      <button className="desk-cta"
        style={{ padding:"9px 26px",border:`1px solid ${accentColor}66`,borderRadius:50,color:"#fff",fontFamily:"'Space Grotesk',sans-serif",fontSize:12,letterSpacing:2,textTransform:"uppercase",fontWeight:600,cursor:"pointer",background:"transparent",transition:"all .3s" }}
        onClick={onGetYours}
        onMouseEnter={e=>{ e.currentTarget.style.background=accentColor; e.currentTarget.style.borderColor=accentColor; e.currentTarget.style.boxShadow=`0 0 24px ${accentColor}88`; }}
        onMouseLeave={e=>{ e.currentTarget.style.background="transparent"; e.currentTarget.style.borderColor=`${accentColor}66`; e.currentTarget.style.boxShadow="none"; }}>
        Get Yours
      </button>

      {/* Hamburger */}
      <button onClick={()=>setOpen(o=>!o)} className="mob-ham" style={{ background:"none",border:"none",cursor:"pointer",padding:8,display:"none",flexDirection:"column",gap:5 }}>
        {[0,1,2].map(i=><span key={i} style={{ display:"block",width:24,height:2,background:"#fff",borderRadius:2,transition:"all .3s",transform:open&&i===0?"rotate(45deg) translate(5px,5px)":open&&i===1?"scale(0)":open&&i===2?"rotate(-45deg) translate(5px,-5px)":"none" }} />)}
      </button>

      {/* Mobile menu */}
      {open&&(
        <div style={{ position:"fixed",top:72,left:0,right:0,background:"rgba(0,0,0,.95)",backdropFilter:"blur(20px)",padding:"24px",borderTop:"1px solid rgba(255,255,255,.08)",display:"flex",flexDirection:"column",gap:16,zIndex:99 }}>
          {links.map(l=>(
            <a key={l.label} href={l.href} onClick={()=>setOpen(false)}
              style={{ color:"rgba(255,255,255,.6)",fontFamily:"'Space Grotesk',sans-serif",fontSize:16,letterSpacing:3,textDecoration:"none",textTransform:"uppercase",fontWeight:500,padding:"10px 0",borderBottom:"1px solid rgba(255,255,255,.06)" }}>{l.label}</a>
          ))}
          <button onClick={()=>{ setOpen(false); onGetYours?.(); }} style={{ marginTop:8,padding:"14px",background:accentColor,border:"none",color:"#fff",fontFamily:"'Space Grotesk',sans-serif",fontSize:14,letterSpacing:3,textTransform:"uppercase",fontWeight:600,cursor:"pointer",borderRadius:8,textAlign:"center" }}>Get Yours</button>
        </div>
      )}

      <style>{`
        @media(max-width:768px){
          header{height:64px!important;padding:0 16px!important}
          .desk-nav{display:none!important}
          .desk-cta{display:none!important}
          .mob-ham{display:flex!important}
        }
      `}</style>
    </header>
  );
}