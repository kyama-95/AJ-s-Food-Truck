import { forwardRef, useRef } from "react";
import menuItems from "../data/menuItems";
import useScrollFade from "../hooks/useScrollFade";
import SectionTitle from "./SectionTitle";

type MenuItemProps = {
  title: string;
  description: string;
  animation: "left" | "right";
};

function MenuItem({ title, description, animation }: MenuItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  useScrollFade(itemRef, { direction: animation });

  return (
    <div ref={itemRef} className="mb-10">
      <h3 className="text-3xl font-bold">{title}</h3>
      <p className="text-gray-700 mt-2">{description}</p>
    </div>
  );
}

const Menu = forwardRef<HTMLElement>(function Menu(_, ref) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const footerRef = useRef<HTMLParagraphElement>(null);
  useScrollFade(titleRef, { direction: "left" });
  useScrollFade(footerRef, { direction: "left" });

  return (
    <section ref={ref} id="menu" className="w-full pt-28 pb-32">
      <div className="max-w-3xl mx-auto px-6">
        <SectionTitle ref={titleRef}>MENU</SectionTitle>

        {menuItems.map((item) => (
          <MenuItem
            key={item.title}
            title={item.title}
            description={item.description}
            animation={item.animation}
          />
        ))}

        <p ref={footerRef} className="text-center font-semibold">
          FRIES | CANNED SODAS | BOTTLED WATER
        </p>
      </div>
    </section>
  );
});

export default Menu;
