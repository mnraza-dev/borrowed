import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';

import { Colors, Spacing, BorderRadius, Typography } from '@/constants/theme';

export interface EmptyStateProps {
  icon?: string | React.ReactNode;
  title: string;
  subtitle?: string;
  actionButton?: {
    title: string;
    onPress: () => void;
  };
  image?: string;
}

export default function EmptyState({
  icon,
  title,
  subtitle,
  actionButton,
  image,
}: EmptyStateProps) {
  const IconComp = icon && typeof icon === 'string' ? (
    <View style={styles.iconContainer}>
      <Text style={{ fontSize: 32, color: Colors.textSecondary }}>{icon}</Text>
    </View>
  ) : icon;

  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {IconComp}
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      {actionButton && (
        <TouchableOpacity style={styles.actionButton} onPress={actionButton.onPress}>
          <Text style={styles.actionButtonText}>{actionButton.title}</Text>
        </TouchableOpacity>
      )}
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
  image: {
    width: 120,
    height: 120,
    marginBottom: Spacing.md,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    ...Typography.heading.medium,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.body.small,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  actionButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
  },
  actionButtonText: {
    color: Colors.primaryContrast,
    fontSize: 14,
    fontWeight: '600' as const,
  },
});