// src/utils/responsive.ts
/**
 * 📱 Responsive Utility — Web version
 * For scaling sizes across devices using window width.
 */

const BASE_WIDTH = 1440; // design width reference

export function scale(size: number) {
  if (typeof window === "undefined") return size;
  const width = window.innerWidth;
  return (width / BASE_WIDTH) * size;
}

export function moderateScale(size: number, factor = 0.5) {
  return size + (scale(size) - size) * factor;
}

export function isMobile() {
  return window.innerWidth <= 768;
}

export function useResponsiveValue<T>(mobileValue: T, desktopValue: T): T {
  return isMobile() ? mobileValue : desktopValue;
}
