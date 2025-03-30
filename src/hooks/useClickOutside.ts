import { useRef, useEffect } from "react";

export default function useClickOutside<T extends HTMLElement>(
  handler: () => void
) {
  const containerRef = useRef<T | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [handler]);

  return containerRef;
}
