import logoIcon from "../assets/AJBS_LogoIcon_250x250.png";
import navItems from "../data/navItems";

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
        <div className="flex items-center gap-3">
          <img
            src={logoIcon}
            alt="AJBS logo"
            className="h-9 w-9 object-contain"
          />
        </div>

        <nav className="hidden sm:flex space-x-6 text-sm font-semibold">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              {item.label}
            </a>
          ))}
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
        {navItems.map((item) => (
          <a key={item.id} href={`#${item.id}`} onClick={onCloseMobile}>
            {item.label}
          </a>
        ))}
      </div>
    </header>
  );
}
