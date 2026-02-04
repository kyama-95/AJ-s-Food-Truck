import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function useScrollFades(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".scroll-fade-left").forEach((item) => {
        gsap.from(item, {
          x: -80,
          opacity: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".scroll-fade-right").forEach((item) => {
        gsap.from(item, {
          x: 80,
          opacity: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          },
        });
      });
    }, element);

    return () => {
      ctx.revert();
    };
  }, [ref]);
}
