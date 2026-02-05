import { forwardRef, useRef } from "react";
import useScrollFade from "../hooks/useScrollFade";
import SectionTitle from "./SectionTitle";

const Locations = forwardRef<HTMLElement>(function Locations(_, ref) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useScrollFade(titleRef, { direction: "left" });
  useScrollFade(copyRef, { direction: "right" });
  useScrollFade(frameRef, { direction: "left" });

  return (
    <section ref={ref} id="locations" className="w-full pt-28 pb-32">
      <div className="max-w-3xl mx-auto px-6">
        <SectionTitle ref={titleRef} className="mb-4">
          LOCATIONS
        </SectionTitle>
        <p ref={copyRef} className="mb-4 text-gray-700">
          Find us at a North Alabama location near you. Our schedule updates
          automatically.
        </p>

        <div
          ref={frameRef}
          className="rounded-xl overflow-hidden shadow border w-full"
        >
          <iframe
            src="https://calendar.google.com/calendar/embed?src=ajsbeefsupply%40gmail.com&ctz=America%2FChicago"
            className="w-full h-[600px]"
            frameBorder={0}
            title="AJBS Calendar"
          ></iframe>
        </div>
      </div>
    </section>
  );
});

export default Locations;
