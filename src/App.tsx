import { useEffect, useRef, useState } from "react";
import { initLegacyInteractions } from "./legacy";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import Locations from "./components/Locations";
import About from "./components/About";
import Booking from "./components/Booking";
import Footer from "./components/Footer";

export default function App() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!rootRef.current) return;
    return initLegacyInteractions(rootRef.current);
  }, []);

  return (
    <div ref={rootRef} className="bg-white text-black overflow-x-hidden">
      <Header
        mobileOpen={mobileOpen}
        onToggleMobile={() => setMobileOpen((prev) => !prev)}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="h-16"></div>

      <Hero />
      <Menu />
      <Locations />
      <About />
      <Booking />

      <Footer />
    </div>
  );
}
