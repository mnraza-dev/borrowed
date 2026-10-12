import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { Colors, Spacing, BorderRadius, Typography } from '@/constants/theme';

export interface RequestStatusBadgeProps {
  status: 'pending' | 'approved' | 'declined' | 'completed';
  size?: 'small' | 'large';
}

export default function RequestStatusBadge({ status, size = 'small' }: RequestStatusBadgeProps) {
  const getBadgeConfig = () => {
    switch (status) {
      case 'pending':
        return {
          bg: Colors.warningLight,
          text: Colors.warning,
          border: Colors.warning,
        };
      case 'approved':
        return {
          bg: Colors.successLight,
          text: Colors.success,
          border: Colors.success,
        };
      case 'declined':
        return {
          bg: Colors.errorLight,
          text: Colors.error,
          border: Colors.error,
        };
      case 'completed':
        return {
          bg: '#EFF6FF', // blue-50
          text: Colors.primary,
          border: '#BFDBFE', // blue-200
        };
      default:
        return {
          bg: Colors.surfaceAlt,
          text: Colors.textSecondary,
          border: Colors.surfaceBorder,
        };
    }
  };

  const { bg, text, border } = getBadgeConfig();
  const fontSize = size === 'large' ? 14 : 12;
  const paddingVertical = size === 'large' ? 8 : 4;
  const paddingHorizontal = size === 'large' ? 12 : 8;
  const borderRadius = size === 'large' ? BorderRadius.md : BorderRadius.sm;

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: bg },
        { borderWidth: 1, borderColor: border },
        { paddingVertical, paddingHorizontal, borderRadius },
      ]}
    >
      <Text style={[styles.text, { fontSize, color: text }]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});