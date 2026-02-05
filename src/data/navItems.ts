export type NavItem = {
  id: "hero" | "menu" | "locations" | "about" | "booking";
  label: string;
};

const navItems: NavItem[] = [
  { id: "hero", label: "AJBS" },
  { id: "menu", label: "MENU" },
  { id: "locations", label: "LOCATIONS" },
  { id: "about", label: "ABOUT" },
  { id: "booking", label: "BOOKING" },
];

export default navItems;
