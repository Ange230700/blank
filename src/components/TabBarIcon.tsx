// src\components\TabBarIcon.tsx

import React from 'react';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  name: keyof typeof Ionicons.glyphMap;
  color: string;
  size: number;
};

const TabBarIcon = React.memo(function TabBarIcon({
  name,
  color,
  size,
}: Props) {
  return <Ionicons name={name} color={color} size={size} />;
});

export default TabBarIcon;
