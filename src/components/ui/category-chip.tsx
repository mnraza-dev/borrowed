import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import { Colors, Spacing, BorderRadius } from '@/constants/theme';

export interface CategoryChipProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
  variant?: 'default' | 'premium';
}

export default function CategoryChip({
  label,
  isSelected,
  onPress,
  variant = 'default',
}: CategoryChipProps) {
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        isSelected && styles.chipSelected,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.chipText, { color: isSelected ? Colors.primaryContrast : Colors.text }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.textTertiary,
  },
  chipSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipHover: {
    backgroundColor: Colors.surfaceAlt,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600' as const,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});