gsap.registerPlugin(ScrollTrigger);

/* ---------------- HERO ANIMATIONS ---------------- */

gsap.from(".hero-line", {
  y: 40,
  opacity: 0,
  stagger: 0.15,
  duration: 0.8,
  ease: "power3.out"
});

gsap.from(".hero-copy", {
  y: 30,
  opacity: 0,
  delay: 0.3,
  duration: 0.8,
  ease: "power3.out"
});

gsap.from(".hero-scroll", {
  y: 20,
  opacity: 0,
  delay: 0.5,
  duration: 0.6,
  ease: "power3.out"
});

// Desktop/tablet drifting only
let mm = gsap.matchMedia();

mm.add("(min-width: 640px)", () => {
  const heroTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  heroTimeline
    .to(".hero-line:nth-child(1)", { x: -40 }, 0)
    .to(".hero-line:nth-child(2)", { x: 40 }, 0)
    .to(".hero-line:nth-child(3)", { x: -20 }, 0)
    .to(".hero-copy", { y: -20 }, 0.1)
    .to(".hero-scroll", { y: 20, opacity: 0.3 }, 0.1);
});

// No horizontal motion on mobile
mm.add("(max-width: 639px)", () => {
    gsap.set(".hero-line", { x: 0 });
    gsap.set(".hero-copy", { x: 0 });
    gsap.set(".hero-scroll", { x: 0 });
});



/* ---------------- SECTION SLIDE-INS (Reversible) ---------------- */

gsap.utils.toArray(".scroll-fade-left").forEach(elem => {
  gsap.from(elem, {
    x: -80,
    opacity: 0,
    ease: "power2.out",
    scrollTrigger: {
      trigger: elem,
      start: "top 95%"
    }
  });
});

gsap.utils.toArray(".scroll-fade-right").forEach(elem => {
  gsap.from(elem, {
    x: 80,
    opacity: 0,
    ease: "power2.out",
    scrollTrigger: {
      trigger: elem,
      start: "top 95%"
    }
  });
});