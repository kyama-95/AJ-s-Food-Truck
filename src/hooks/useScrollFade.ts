import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Direction = "left" | "right";

type ScrollFadeOptions = {
  direction?: Direction;
  start?: string;
};

export default function useScrollFade(
  ref: RefObject<HTMLElement>,
  { direction = "left", start = "top 85%" }: ScrollFadeOptions = {}
) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(element, {
        x: direction === "left" ? -80 : 80,
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start,
        },
      });
    }, element);

    return () => {
      ctx.revert();
    };
  }, [ref, direction, start]);
}
