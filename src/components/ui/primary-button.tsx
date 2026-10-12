import React from 'react';
import { Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';

import { Colors, Spacing, BorderRadius } from '@/constants/theme';

export interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  loading?: boolean;
}

export default function PrimaryButton({
  title,
  onPress,
  disabled = false,
  variant = 'primary',
  loading = false,
}: PrimaryButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[styles.button, variantStyles[variant], isDisabled && styles.disabled]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? Colors.primaryContrast : Colors.primary} />
      ) : (
        <Text style={[styles.text, variantTextStyles[variant]]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const variantStyles = {
  primary: {
    backgroundColor: Colors.primary,
  },
  secondary: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
};

const variantTextStyles = {
  primary: {
    color: Colors.primaryContrast,
  },
  secondary: {
    color: Colors.primary,
  },
  ghost: {
    color: Colors.primary,
  },
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});