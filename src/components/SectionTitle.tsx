import { forwardRef } from "react";

type SectionTitleProps = {
  children: string;
  className?: string;
};

const SectionTitle = forwardRef<HTMLHeadingElement, SectionTitleProps>(
  function SectionTitle({ children, className }, ref) {
    return (
      <h2
        ref={ref}
        className={`text-4xl font-black mb-6 ${className ?? ""}`.trim()}
      >
        {children}
      </h2>
    );
  }
);

export default SectionTitle;
