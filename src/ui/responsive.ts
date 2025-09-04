// src/ui/responsive.ts
import { useWindowDimensions } from 'react-native';
import { PAGE_MAX_WIDTH } from 'blank/ui/layout';

export function useGridColumns() {
  const { width } = useWindowDimensions();
  const max = Math.min(width, PAGE_MAX_WIDTH);

  // Simple breakpoints: 2 (phones), 3 (tablets), 4 (wide web)
  if (max >= 1200) return 4;
  if (max >= 900) return 3;
  return 2; // default for mobile screens and up
}
