type HeaderProps = {
  mobileOpen: boolean;
  onToggleMobile: () => void;
  onCloseMobile: () => void;
};

export default function Header({
  mobileOpen,
  onToggleMobile,
  onCloseMobile,
}: HeaderProps) {
  return (
    <header className="w-full border-b bg-white fixed top-0 z-50">
      <div className="w-full px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-black">AJBS</div>

        <nav className="hidden sm:flex space-x-6 text-sm font-semibold">
          <a href="#hero">AJBS</a>
          <a href="#menu">MENU</a>
          <a href="#locations">LOCATIONS</a>
          <a href="#about">ABOUT</a>
          <a href="#booking">BOOKING</a>
        </nav>

        <button
          className="sm:hidden text-3xl font-bold"
          onClick={onToggleMobile}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          ☰
        </button>
      </div>

      <div
        className={`${
          mobileOpen ? "flex" : "hidden"
        } sm:hidden flex-col bg-white border-t px-4 py-3 space-y-3 text-base font-semibold`}
      >
        <a href="#hero" onClick={onCloseMobile}>
          AJBS
        </a>
        <a href="#menu" onClick={onCloseMobile}>
          MENU
        </a>
        <a href="#locations" onClick={onCloseMobile}>
          LOCATIONS
        </a>
        <a href="#about" onClick={onCloseMobile}>
          ABOUT
        </a>
        <a href="#booking" onClick={onCloseMobile}>
          BOOKING
        </a>
      </div>
    </header>
  );
}
