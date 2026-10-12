import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

import { Colors, BorderRadius } from '@/constants/theme';

export interface AvatarProps {
  source?: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBorder?: boolean;
  fallback?: 'initials';
}

export default function Avatar({
  source,
  initials,
  size = 'md',
  showBorder = false,
  fallback = 'initials',
}: AvatarProps) {
  const sizeMap = {
    sm: 24,
    md: 32,
    lg: 48,
    xl: 64,
  };

  const borderWidthMap = {
    sm: 1,
    md: 2,
    lg: 3,
    xl: 3,
  };

  const imageSizeMap = {
    sm: 20,
    md: 28,
    lg: 42,
    xl: 58,
  };

  const textSizeMap = {
    sm: 10,
    md: 12,
    lg: 18,
    xl: 22,
  };

  const renderContent = () => {
    if (source && source.trim()) {
      return <Image source={{ uri: source }} style={[styles.image, { width: imageSizeMap[size], height: imageSizeMap[size] }]} />;
    }

    return (
      <Text style={[styles.initials, { fontSize: textSizeMap[size] }]}>{initials}</Text>
    );
  };

  return (
    <View
      style={[
        styles.container,
        { width: sizeMap[size], height: sizeMap[size] },
        showBorder && { borderWidth: borderWidthMap[size], borderColor: Colors.primary },
        !source && { backgroundColor: Colors.primary },
      ]}
    >
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  image: {
    borderRadius: BorderRadius.full,
    width: '100%',
    height: '100%',
  },
  initials: {
    color: Colors.primaryContrast,
    fontWeight: '600',
  },
});