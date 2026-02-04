import { useRef } from "react";
import useScrollFades from "../hooks/useScrollFades";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollFades(sectionRef);

  return (
    <section ref={sectionRef} id="about" className="w-full pt-28 pb-32">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-4xl font-black mb-4 scroll-fade-left">ABOUT</h2>
        <p className="text-gray-700 scroll-fade-right leading-relaxed">
          Established in Huntsville, Alabama in 2025, AJ’S Beef Supply is a food
          truck serving a beef-driven menu—a rolling tribute to the beef dishes
          discovered during travels in Hawaii, Seattle, Portland, and Los
          Angeles.
        </p>
      </div>
    </section>
  );
}
