// src/features/todos/ui/styles.ts
import { StyleSheet } from 'react-native';

export const listStyles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingBottom: 24 },
});

export const layoutStyles = StyleSheet.create({
  inner: { width: '100%', maxWidth: 720, alignSelf: 'center' }, // centers on web/tablets
});
