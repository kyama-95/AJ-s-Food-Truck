import { forwardRef } from "react";
import heroDesktop from "../assets/AJBS_DesktopHero_1500x900.png";
import heroMobile from "../assets/AJBS_MobileHero_800x500.png";

const Hero = forwardRef<HTMLElement>(function Hero(_, ref) {
  return (
    <section ref={ref} id="hero" className="w-full pt-20 pb-20">
      <div className="max-w-5xl mx-auto px-6 flex flex-col gap-6">
        <div className="w-full aspect-[5/3]">
          <picture>
            <source media="(min-width: 768px)" srcSet={heroDesktop} />
            <img
              src={heroMobile}
              alt="AJ’s Beef Supply food truck hero"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </picture>
        </div>

      </div>
    </section>
  );
});

export default Hero;
