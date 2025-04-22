import clsx from "clsx";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  asHeading?: boolean;
}

export default function Heading({ children, className, asHeading = false }: Props) {
  return (
    <>
      <h1 className={clsx("mt-6 mb-12 text-3xl sm:text-5xl font-bold", className)}>{children}</h1>
    </>
  );
}
