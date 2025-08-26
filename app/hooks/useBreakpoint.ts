import { useState, useEffect } from "react";
import { Dimensions } from "react-native";

// Breakpoint definitions
const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1200,
} as const;

export type BreakpointName = "mobile" | "tablet" | "desktop";

interface BreakpointState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
  height: number;
  currentBreakpoint: BreakpointName;
}

/**
 * Hook to detect current screen breakpoint and responsive state
 * Provides information about device screen size categories
 */
export function useBreakpoint(): BreakpointState {
  const [dimensions, setDimensions] = useState(() => {
    const { width, height } = Dimensions.get("window");
    return { width, height };
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setDimensions({ width: window.width, height: window.height });
    });

    return () => subscription?.remove();
  }, []);

  const { width, height } = dimensions;

  // Determine current breakpoint
  const currentBreakpoint: BreakpointName =
    width < BREAKPOINTS.mobile
      ? "mobile"
      : width < BREAKPOINTS.tablet
      ? "tablet"
      : "desktop";

  return {
    isMobile: width < BREAKPOINTS.mobile,
    isTablet: width >= BREAKPOINTS.mobile && width < BREAKPOINTS.desktop,
    isDesktop: width >= BREAKPOINTS.desktop,
    width,
    height,
    currentBreakpoint,
  };
}
