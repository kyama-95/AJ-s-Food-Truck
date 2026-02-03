export default function Hero() {
  return (
    <section id="hero" className="w-full pt-24 pb-32">
      <div className="max-w-3xl mx-auto px-6 flex flex-col justify-between gap-10">
        <div className="text-sm tracking-[0.25em] uppercase text-neutral-500">
          AJ’S BEEF SUPPLY
        </div>

        <div className="space-y-2">
          <p className="hero-line text-3xl md:text-4xl font-black">
            Learn, Eat, Be Happy with Beef.
          </p>
          <p className="hero-line text-3xl md:text-4xl font-black">
            Learn, Eat, Be Happy with Beef.
          </p>
          <p className="hero-line text-3xl md:text-4xl font-black">
            Learn, Eat, Be Happy with Beef.
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="max-w-md text-sm md:text-base text-neutral-700 hero-copy">
            Cheesesteaks, Chopped Cheese, and other beef dishes rolling around
            North Alabama. Scroll to see the menu, locations, and how to book
            AJ&apos;s Beef Supply.
          </p>

          <div className="hidden md:flex flex-col items-center gap-1 hero-scroll">
            <span className="text-xs tracking-[0.2em] uppercase text-neutral-500">
              Scroll
            </span>
            <span className="w-px h-10 bg-neutral-400"></span>
          </div>
        </div>
      </div>
    </section>
  );
}
