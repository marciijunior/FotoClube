import { useState, useEffect } from "react";

/**
 * Hook para detectar se a viewport é mobile.
 * @param {number} breakpoint - Largura máxima em px para considerar mobile (default: 1000)
 * @returns {boolean}
 */
export function useIsMobile(breakpoint = 1000) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);
  return isMobile;
}
