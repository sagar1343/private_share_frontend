import { PropsWithChildren } from "react";

export default function Heading({ children }: PropsWithChildren) {
  return (
    <>
      <h1 className="my-6 text-4xl font-extrabold">{children}</h1>
      <hr />
    </>
  );
}
