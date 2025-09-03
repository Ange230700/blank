// test-utils.tsx

import React, { PropsWithChildren } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { render } from '@testing-library/react-native';

export function renderWithNav(ui: React.ReactElement) {
  const Wrapper = ({ children }: PropsWithChildren) => (
    <NavigationContainer>{children}</NavigationContainer>
  );
  return render(ui, { wrapper: Wrapper });
}
