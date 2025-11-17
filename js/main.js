gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* ---------------- HERO ANIMATIONS ---------------- */

gsap.from(".hero-line", {
  y: 40,
  opacity: 0,
  stagger: 0.15,
  duration: 0.8,
  ease: "power3.out",
});

gsap.from(".hero-copy", {
  y: 30,
  opacity: 0,
  delay: 0.3,
  duration: 0.8,
  ease: "power3.out",
});

/* ---------------- SCROLL FADE ---------------- */

gsap.utils.toArray(".scroll-fade-left").forEach((elem) => {
  gsap.from(elem, {
    x: -80,
    opacity: 0,
    ease: "power2.out",
    scrollTrigger: {
      trigger: elem,
      start: "top 85%",
      scrub: true,
    },
  });
});

gsap.utils.toArray(".scroll-fade-right").forEach((elem) => {
  gsap.from(elem, {
    x: 80,
    opacity: 0,
    ease: "power2.out",
    scrollTrigger: {
      trigger: elem,
      start: "top 85%",
      scrub: true,
    },
  });
});

/* ---------------- MOBILE MENU ---------------- */

const mobileBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (mobileBtn && mobileMenu) {
  mobileBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });
}

/* ---------------- FOOTER PILL LOGIC ---------------- */

const footerNav = document.getElementById("footerNav");
const footerWrapper = document.getElementById("footerWrapper");
const pill = document.getElementById("pill");

if (!footerNav || !footerWrapper || !pill) {
  console.error("Footer elements missing. Cannot initialize pill nav.");
}

const links = footerNav.querySelectorAll(".footer-link");

function movePillTo(link, immediate = false) {
  if (!link || !footerWrapper || !pill) return;

  const linkRect = link.getBoundingClientRect();
  const wrapperRect = footerWrapper.getBoundingClientRect();

  const left = linkRect.left - wrapperRect.left;
  const width = linkRect.width + 24;

  gsap.to(pill, {
    duration: immediate ? 0 : 0.35,
    x: left - 12,
    width: width,
    ease: "power2.out",
  });

  links.forEach((l) => {
    l.style.color = l === link ? "black" : "white";
  });
}

links.forEach((link) => {
  const id = link.getAttribute("data-target");
  const section = document.getElementById(id);

  if (section) {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const y =
        section.getBoundingClientRect().top +
        window.scrollY -
        80;
      gsap.to(window, {
        duration: 0.6,
        scrollTo: y,
        ease: "power2.out",
        onUpdate: () => ScrollTrigger.refresh(),
      });
      movePillTo(link);
    });
  }
});

function makeTrigger(sectionId, link) {
  const section = document.querySelector(sectionId);
  if (!section || !link) return;

  ScrollTrigger.create({
    trigger: section,
    start: "top 70%",
    end: "bottom 70%",
    onEnter: () => movePillTo(link),
    onEnterBack: () => movePillTo(link),
  });
}

if (links.length === 5) {
  const [ajbs, menu, loc, about, booking] = links;

  makeTrigger("#hero", ajbs);
  makeTrigger("#menu", menu);
  makeTrigger("#locations", loc);
  makeTrigger("#about", about);
  makeTrigger("#booking", booking);

  movePillTo(ajbs, true);
}

/* ---------------- END ---------------- */