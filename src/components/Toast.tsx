import { useMediaQuery } from "react-responsive";
import { Toaster } from "sonner";

export default function Toast() {
  const isMobile = useMediaQuery({ query: "(max-width: 560px)" });
  return (
    <Toaster
      richColors
      position={isMobile ? "top-center" : "bottom-right"}
      swipeDirections={["right"]}
      mobileOffset={{ top: 30 }}
    />
  );
}
