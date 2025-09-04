// src/ui/layout.ts
import { StyleSheet } from 'react-native';

export const PAGE_MAX_WIDTH = 720; // tweak to taste

export const containerStyles = StyleSheet.create({
  center: {
    // center the content and clamp width on wide screens (web/tablets)
    alignSelf: 'center',
    width: '100%',
    maxWidth: PAGE_MAX_WIDTH,
  },
});
