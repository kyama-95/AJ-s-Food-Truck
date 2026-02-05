export type MenuItem = {
  title: string;
  description: string;
  animation: "left" | "right";
};

const menuItems: MenuItem[] = [
  {
    title: "CHEESESTEAK",
    description:
      "Thinly sliced ribeye, provolone cheese, hot & sweet peppers and onions served on an Italian roll. Add BS Cheesesteak Sauce.",
    animation: "left",
  },
  {
    title: "CHOPPED CHEESE",
    description:
      "Burger patty chopped and seasoned, served on an Italian roll with lettuce, tomato, onions, pickles and BS Chopped Cheese Sauce.",
    animation: "right",
  },
];

export default menuItems;
