import { useRef } from "react";
import useScrollFades from "../hooks/useScrollFades";

export default function Menu() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollFades(sectionRef);

  return (
    <section ref={sectionRef} id="menu" className="w-full pt-28 pb-32">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-4xl font-black mb-6 scroll-fade-left">MENU</h2>

        <div className="scroll-fade-left mb-10">
          <h3 className="text-3xl font-bold">CHEESESTEAK</h3>
          <p className="text-gray-700 mt-2">
            Thinly sliced ribeye, provolone cheese, hot & sweet peppers and
            onions served on an Italian roll. Add BS Cheesesteak Sauce.
          </p>
        </div>

        <div className="scroll-fade-right mb-10">
          <h3 className="text-3xl font-bold">CHOPPED CHEESE</h3>
          <p className="text-gray-700 mt-2">
            Burger patty chopped and seasoned, served on an Italian roll with
            lettuce, tomato, onions, pickles and BS Chopped Cheese Sauce.
          </p>
        </div>

        <p className="text-center font-semibold scroll-fade-left">
          FRIES | CANNED SODAS | BOTTLED WATER
        </p>
      </div>
    </section>
  );
}
