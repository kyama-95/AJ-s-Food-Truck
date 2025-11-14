// Register plugin
gsap.registerPlugin(ScrollTrigger);

// Master scroll timeline for assembling the cheesesteak
const tl = gsap.timeline({
    scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom center",
        scrub: true,
    }
});

tl.from("#bread-bottom", { y: 150, opacity: 0 })
  .from("#steak", { y: 160, opacity: 0 })
  .from("#onions", { y: 170, opacity: 0 })
  .from("#cheese", { y: 180, opacity: 0 })
  .from("#peppers", { y: 190, opacity: 0 })
  .from("#sauce", { y: 200, opacity: 0 })
  .from("#bread-top", { y: -150, opacity: 0 });