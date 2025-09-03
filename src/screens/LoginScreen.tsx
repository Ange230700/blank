// src\screens\LoginScreen.tsx

import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useAuth } from 'blank/stores/authStore';

export default function LoginScreen() {
  const { login, loading, error } = useAuth();
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');

  return (
    <View className="flex-1 justify-center p-6 gap-3">
      <TextInput
        className="border rounded p-3"
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        className="border rounded p-3"
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button
        title={loading ? '...' : 'Login'}
        onPress={() => login(username, password)}
      />
      {!!error && <Text className="text-red-500">{error}</Text>}
      <Text className="opacity-60 text-sm mt-2">Hint: emilys / emilyspass</Text>
    </View>
  );
}
