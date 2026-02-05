import { useRef, useState } from "react";
import type { RefObject } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import Locations from "./components/Locations";
import About from "./components/About";
import Booking from "./components/Booking";
import Footer from "./components/Footer";
import { type NavItem } from "./data/navItems";

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const locationsRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const bookingRef = useRef<HTMLElement>(null);

  const sections: Array<NavItem & { ref: RefObject<HTMLElement> }> = [
    { id: "hero", label: "AJBS", ref: heroRef },
    { id: "menu", label: "MENU", ref: menuRef },
    { id: "locations", label: "LOCATIONS", ref: locationsRef },
    { id: "about", label: "ABOUT", ref: aboutRef },
    { id: "booking", label: "BOOKING", ref: bookingRef },
  ];

  return (
    <div className="bg-white text-black overflow-x-hidden">
      <Header
        mobileOpen={mobileOpen}
        onToggleMobile={() => setMobileOpen((prev) => !prev)}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="h-16"></div>

      <Hero ref={heroRef} />
      <Menu ref={menuRef} />
      <Locations ref={locationsRef} />
      <About ref={aboutRef} />
      <Booking ref={bookingRef} />

      <Footer sections={sections} />
    </div>
  );
}
