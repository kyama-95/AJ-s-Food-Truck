export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full h-16 bg-black z-50 flex items-center">
      <div id="footerWrapper" className="relative mx-auto">
        <nav
          id="footerNav"
          className="relative inline-flex items-center justify-center space-x-4 text-white text-sm font-semibold"
        >
          <div
            id="pill"
            className="absolute top-1/2 -translate-y-1/2 left-0 h-7 bg-white rounded-full -z-10"
          ></div>

          <a href="#hero" data-target="hero" className="footer-link">
            AJBS
          </a>
          <a href="#menu" data-target="menu" className="footer-link">
            MENU
          </a>
          <a href="#locations" data-target="locations" className="footer-link">
            LOCATIONS
          </a>
          <a href="#about" data-target="about" className="footer-link">
            ABOUT
          </a>
          <a href="#booking" data-target="booking" className="footer-link">
            BOOKING
          </a>
        </nav>
      </div>
    </footer>
  );
}
