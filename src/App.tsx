import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import Locations from "./components/Locations";
import About from "./components/About";
import Booking from "./components/Booking";
import Footer from "./components/Footer";

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="bg-white text-black overflow-x-hidden">
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
