import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Loader() {
  return (
    <div className="h-[calc(100vh-96px)] w-full bg-background flex justify-center items-center">
      <DotLottieReact
        src="https://lottie.host/27a885ab-b49e-416d-9acf-3c0f07c4c77b/Z4zsRQ8UPv.lottie"
        loop
        speed={0.8}
        autoplay
        className="size-48"
      />
    </div>
  );
}
