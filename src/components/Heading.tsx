import clsx from "clsx";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}
export default function Heading({ children, className }: Props) {
  return (
    <>
      <h1 className={clsx("my-6 text-4xl font-extrabold", className)}>
        {children}
      </h1>
      <hr />
    </>
  );
}
