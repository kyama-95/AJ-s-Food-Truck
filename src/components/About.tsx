import { forwardRef, useRef } from "react";
import useScrollFade from "../hooks/useScrollFade";
import SectionTitle from "./SectionTitle";

const About = forwardRef<HTMLElement>(function About(_, ref) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);

  useScrollFade(titleRef, { direction: "left" });
  useScrollFade(copyRef, { direction: "right" });

  return (
    <section ref={ref} id="about" className="w-full pt-28 pb-32">
      <div className="max-w-3xl mx-auto px-6">
        <SectionTitle ref={titleRef} className="mb-4">
          ABOUT
        </SectionTitle>
        <p ref={copyRef} className="text-gray-700 leading-relaxed">
          Established in Huntsville, Alabama in 2025, AJ’S Beef Supply is a food
          truck serving a beef-driven menu—a rolling tribute to the beef dishes
          discovered during travels in Hawaii, Seattle, Portland, and Los
          Angeles.
        </p>
      </div>
    </section>
  );
});

export default About;
