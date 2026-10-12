import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

import { Colors, Spacing, BorderRadius } from '@/constants/theme';

export interface LoadingStateProps {
  visible: boolean;
  size?: 'small' | 'large';
  message?: string;
}

export default function LoadingState({ visible, size = 'large', message }: LoadingStateProps) {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={Colors.primary} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
    backgroundColor: Colors.surface,
  },
  message: {
    marginTop: Spacing.md,
    color: Colors.textSecondary,
    fontSize: 14,
  },
});