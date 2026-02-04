import { useRef } from "react";
import useScrollFades from "../hooks/useScrollFades";

export default function Locations() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollFades(sectionRef);

  return (
    <section ref={sectionRef} id="locations" className="w-full pt-28 pb-32">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-4xl font-black mb-4 scroll-fade-left">LOCATIONS</h2>
        <p className="mb-4 text-gray-700 scroll-fade-right">
          Find us at a North Alabama location near you. Our schedule updates
          automatically.
        </p>

        <div className="scroll-fade-left rounded-xl overflow-hidden shadow border w-full">
          <iframe
            src="https://calendar.google.com/calendar/embed?src=ajsbeefsupply%40gmail.com&ctz=America%2FChicago&mode=WEEK"
            className="w-full h-[600px]"
            frameBorder={0}
            title="AJBS Calendar"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
