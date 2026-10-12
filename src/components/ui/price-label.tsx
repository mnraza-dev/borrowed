import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { Colors, Typography } from '@/constants/theme';

export interface PriceLabelProps {
  amountMinor: number;
  currency: string;
  lendingMode: 'free' | 'paid';
  showStrikethrough?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export default function PriceLabel({
  amountMinor,
  currency,
  lendingMode,
  showStrikethrough = false,
  size = 'medium',
}: PriceLabelProps) {
  if (lendingMode === 'free') {
    return (
      <View style={styles.container}>
        <Text style={styles.freeText}>Free</Text>
      </View>
    );
  }

  const amount = (amountMinor / 100).toFixed(0);

  return (
    <View style={styles.container}>
      <Text style={[styles.currency, getSizeStyle(size)]}>{currency}</Text>
      <Text style={[styles.amount, getSizeStyle(size)]}>{amount}</Text>
      {showStrikethrough && (
        <Text style={[styles.strikethrough, getSizeStyle(size)]}>
          {currency} {(Number(amount) * 2).toFixed(0)}
        </Text>
      )}
    </View>
  );
}

function getSizeStyle(size: 'small' | 'medium' | 'large') {
  switch (size) {
    case 'small':
      return Typography.body.small;
    case 'large':
      return Typography.heading.small;
    default:
      return Typography.body.medium;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  currency: {
    color: Colors.textSecondary,
    marginRight: 4,
  },
  amount: {
    fontWeight: '700',
    color: Colors.primary,
  },
  strikethrough: {
    color: Colors.textTertiary,
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  freeText: {
    color: Colors.success,
    fontWeight: '600',
  },
});