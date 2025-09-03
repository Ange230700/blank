// tests\screens.HomeScreen.msw.test.tsx

import React from 'react';
import { screen, waitFor } from '@testing-library/react-native';
import HomeScreen from 'blank/screens/HomeScreen';
import { renderWithStore } from 'blank/utils/renderWithStore';

test('renders todos from fake API', async () => {
  renderWithStore(<HomeScreen />);

  await waitFor(() =>
    expect(screen.getAllByRole('switch').length).toBeGreaterThan(0),
  );
});
