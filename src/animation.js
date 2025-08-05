// gsapAnimations.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


export const stickyHeaderAnimation = (nav, logo) => {
  ScrollTrigger.matchMedia({
    "(min-width: 768px)": function () {
      // Stage 1: Make navbar sticky immediately (no animation)
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        onEnter: () => {
          // Only make it sticky — no animation
          nav.style.position = "fixed";
          nav.style.top = "0";
          nav.style.left = "0";
          nav.style.zIndex = "50"; // ensure it's on top
        },
        onLeaveBack: () => {
          // Reset position to default (optional)
          nav.style.position = "absolute";
          nav.style.top = "";
          nav.style.left = "";

        },
      });

      // Stage 2: Animate when scrolled 200px or more
      ScrollTrigger.create({
        trigger: document.body,
        start: "top -400px", // when body has scrolled up 200px
        toggleActions: "play none none reverse",
        onEnter: () => {
          gsap.to(nav, {
            backgroundColor: "#1f2937",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
            duration: 0.4,
            ease: "power2.out",
          });

          gsap.to(logo, {
            scale: 0.8,
            duration: 0.4,
            ease: "power2.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(nav, {
            backgroundColor: "transparent",
            paddingTop: "1.5rem",
            paddingBottom: "1.5rem",
            duration: 0.3,
            ease: "power2.inOut",
          });

          gsap.to(logo, {
            scale: 1,
            duration: 0.3,
            ease: "power2.inOut",
          });
        },
      });
    },
  });
};




export const headerAnimation = (element, isOpening) => {
  if (isOpening) {
    gsap.to(element, {
      x: "0%",
      opacity: 1,

      ease: "power2.out",
    });
  } else {
    gsap.to(element, {
      x: "-100%",

      duration: 0.6,
      ease: "power2.out",
    });
  }
};



export const bannerTimeline = (subtitle, title, btn)=>{
  const tl = gsap.timeline();
 
  tl.from(subtitle,{
    y:30,
    opacity:0,
    duration:0.8,
    ease:"power2.out"
  })
  .from(title,{
    y:30,
    opacity:0,
    duration:0.8,
    ease:"power2.out",
    delay:0.2
  })
  .from(btn,{
      y:30,
      opacity:0,
      duration:0.8,
      ease:"power2.out",
      delay:0.4
  })
} 