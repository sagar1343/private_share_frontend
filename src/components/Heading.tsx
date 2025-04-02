import clsx from "clsx";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  asHeading?: boolean;
}

export default function Heading({
  children,
  className,
  asHeading = false,
}: Props) {
  return (
    <>
      <h1
        className={clsx("my-6 text-2xl sm:text-3xl font-extrabold", className)}
      >
        {children}
      </h1>
      {asHeading && <hr />}
    </>
  );
}
