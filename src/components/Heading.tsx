import clsx from "clsx";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  asHeading?: boolean;
}

export default function Heading({ children, className }: Props) {
  return (
    <h1 className={clsx("mt-6 mb-12 text-2xl sm:text-4xl font-bold", className)}>{children}</h1>
  );
}
