import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

type FooterSection = {
  id: string;
  label: string;
  ref: RefObject<HTMLElement>;
};

type FooterProps = {
  sections: FooterSection[];
};

export default function Footer({ sections }: FooterProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const pill = pillRef.current;

    if (!wrapper || !pill) return;

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const headerElement = document.querySelector("header");
    const headerOffset = headerElement?.offsetHeight ?? 0;
    const footerOffset = footerRef.current?.offsetHeight ?? 0;

    const links = linkRefs.current.filter(
      (link): link is HTMLAnchorElement => Boolean(link)
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

    links.forEach((link, index) => {
      const section = sections[index]?.ref.current;
      if (!section) return;

      const handler = (event: Event) => {
        event.preventDefault();
        const y =
          section.getBoundingClientRect().top + window.scrollY - headerOffset;
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

    const makeTrigger = (section: HTMLElement, link: HTMLAnchorElement) => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: `top+=${headerOffset} 70%`,
        end: `bottom-=${footerOffset} 70%`,
        onEnter: () => movePillTo(link),
        onEnterBack: () => movePillTo(link),
      });
      triggers.push(trigger);
    };

    links.forEach((link, index) => {
      const section = sections[index]?.ref.current;
      if (!section) return;
      makeTrigger(section, link);
    });

    if (links.length > 0) {
      movePillTo(links[0], true);
    }

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      linkHandlers.forEach((handler, link) => {
        link.removeEventListener("click", handler);
      });
    };
  }, [sections]);

  return (
    <footer
      ref={footerRef}
      className="fixed bottom-0 left-0 w-full h-16 bg-black z-50 flex items-center"
    >
      <div ref={wrapperRef} id="footerWrapper" className="relative mx-auto">
        <nav className="relative inline-flex items-center justify-center space-x-4 text-white text-sm font-semibold">
          <div
            ref={pillRef}
            id="pill"
            className="absolute top-1/2 -translate-y-1/2 left-0 h-7 bg-white rounded-full -z-10"
          ></div>

          {sections.map((section, index) => (
            <a
              key={section.id}
              ref={(node) => {
                linkRefs.current[index] = node;
              }}
              href={`#${section.id}`}
              data-target={section.id}
              className="footer-link"
            >
              {section.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
