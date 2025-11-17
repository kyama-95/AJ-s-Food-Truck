gsap.registerPlugin(ScrollTrigger);

/* ---------------- HERO INTRO ANIMATIONS ---------------- */

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

/* ---------------- HERO DRIFT (DESKTOP ONLY) ---------------- */

let mm = gsap.matchMedia();

mm.add("(min-width: 640px)", () => {
  const lines = gsap.utils.toArray(".hero-line");

  const heroTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  heroTimeline
    .to(lines[0], { x: -40 }, 0)
    .to(lines[1], { x: 40 }, 0)
    .to(lines[2], { x: -20 }, 0)
    .to(".hero-copy", { y: -20 }, 0.1)
    .to(".hero-scroll", { y: 20, opacity: 0.3 }, 0.1);
});

/* ---------------- MOBILE RESET ---------------- */

mm.add("(max-width: 639px)", () => {
  gsap.set(".hero-line", { x: 0 });
  gsap.set(".hero-copy", { x: 0 });
  gsap.set(".hero-scroll", { x: 0 });
});

/* ---------------- SECTION SLIDE-INS (REVERSIBLE) ---------------- */

gsap.utils.toArray(".scroll-fade-left").forEach(elem => {
  gsap.from(elem, {
    x: -80,
    opacity: 0,
    ease: "power2.out",
    scrollTrigger: {
      trigger: elem,
      start: "top 85%"
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
      start: "top 85%"
    }
  });
});

/* ---------------- HAMBURGER MENU MOBILE  ---------------- */
const mobileBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");

mobileBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});