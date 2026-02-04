import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

export default function Footer() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const nav = navRef.current;
    const pill = pillRef.current;

    if (!wrapper || !nav || !pill) return;

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const links = Array.from(
      nav.querySelectorAll<HTMLAnchorElement>(".footer-link")
    );
    const linkHandlers = new Map<HTMLAnchorElement, (event: Event) => void>();
    const triggers: ScrollTrigger[] = [];

    const movePillTo = (link: HTMLAnchorElement, immediate = false) => {
      const linkRect = link.getBoundingClientRect();
      const wrapperRect = wrapper.getBoundingClientRect();

      const left = linkRect.left - wrapperRect.left;
      const width = linkRect.width + 24;

      gsap.to(pill, {
        duration: immediate ? 0 : 0.35,
        x: left - 12,
        width,
        ease: "power2.out",
      });

      links.forEach((item) => {
        item.style.color = item === link ? "black" : "white";
      });
    };

    links.forEach((link) => {
      const id = link.getAttribute("data-target");
      const section = id ? document.querySelector<HTMLElement>(`#${id}`) : null;

      if (!section) return;

      const handler = (event: Event) => {
        event.preventDefault();
        const y = section.getBoundingClientRect().top + window.scrollY - 80;
        gsap.to(window, {
          duration: 0.6,
          scrollTo: y,
          ease: "power2.out",
          onUpdate: () => ScrollTrigger.refresh(),
        });
        movePillTo(link);
      };

      link.addEventListener("click", handler);
      linkHandlers.set(link, handler);
    });

    const makeTrigger = (sectionId: string, link: HTMLAnchorElement) => {
      const section = document.querySelector<HTMLElement>(sectionId);
      if (!section) return;

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top 70%",
        end: "bottom 70%",
        onEnter: () => movePillTo(link),
        onEnterBack: () => movePillTo(link),
      });
      triggers.push(trigger);
    };

    if (links.length === 5) {
      const [ajbs, menu, loc, about, booking] = links;
      makeTrigger("#hero", ajbs);
      makeTrigger("#menu", menu);
      makeTrigger("#locations", loc);
      makeTrigger("#about", about);
      makeTrigger("#booking", booking);
      movePillTo(ajbs, true);
    }

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      linkHandlers.forEach((handler, link) => {
        link.removeEventListener("click", handler);
      });
    };
  }, []);

  return (
    <footer className="fixed bottom-0 left-0 w-full h-16 bg-black z-50 flex items-center">
      <div ref={wrapperRef} id="footerWrapper" className="relative mx-auto">
        <nav
          ref={navRef}
          id="footerNav"
          className="relative inline-flex items-center justify-center space-x-4 text-white text-sm font-semibold"
        >
          <div
            ref={pillRef}
            id="pill"
            className="absolute top-1/2 -translate-y-1/2 left-0 h-7 bg-white rounded-full -z-10"
          ></div>

          <a href="#hero" data-target="hero" className="footer-link">
            AJBS
          </a>
          <a href="#menu" data-target="menu" className="footer-link">
            MENU
          </a>
          <a href="#locations" data-target="locations" className="footer-link">
            LOCATIONS
          </a>
          <a href="#about" data-target="about" className="footer-link">
            ABOUT
          </a>
          <a href="#booking" data-target="booking" className="footer-link">
            BOOKING
          </a>
        </nav>
      </div>
    </footer>
  );
}
