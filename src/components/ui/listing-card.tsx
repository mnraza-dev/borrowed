import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors, Spacing, BorderRadius, Typography } from '@/constants/theme';
import ReportModal from './report-modal';

export interface ListingCardProps {
  id: string;
  title: string;
  description: string;
  ownerName: string;
  ownerRating: number;
  location: string;
  priceMinor: number;
  currency: string;
  lendingMode: 'free' | 'paid';
  imageUrl?: string;
  onPress?: (id: string) => void;
  onRequestPress?: () => void;
  onFavoritePress?: () => void;
  showOwner?: boolean;
  compact?: boolean;
  onReport?: (id: string) => void;
}

export default function ListingCard({
  id,
  title,
  description,
  ownerName,
  ownerRating,
  location,
  priceMinor,
  currency,
  lendingMode,
  imageUrl,
  onPress,
  onRequestPress,
  onFavoritePress,
  showOwner = true,
  compact = false,
  onReport,
}: ListingCardProps) {
  const [reportVisible, setReportVisible] = React.useState(false);
  const windowWidth = useWindowDimensions().width;

  const formatPrice = (amount: number, currency: string): string => {
    if (lendingMode === 'free') {
      return 'Free';
    }
    return `${currency} ${(amount / 100).toLocaleString()}`;
  };

  const getOwnerInitials = (name: string): string => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <TouchableOpacity
      style={[styles.container, compact && styles.compactContainer]}
      onPress={() => onPress?.(id)}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        ) : (
          <View style={styles.placeholderImage}>
            <Ionicons name="image-outline" size={32} color={Colors.textTertiary} />
          </View>
        )}
        <View style={styles.lendingModeBadge}>
          <Text style={styles.lendingModeText}>
            {lendingMode === 'free' ? 'Free' : 'Paid'}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={onFavoritePress}
        >
          <Ionicons name="heart-outline" size={20} color={Colors.text} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.reportButton}
          onPress={() => setReportVisible(true)}
          activeOpacity={0.7}
        >
          <Ionicons name="flag" size={18} color={Colors.textSecondary} />
        </TouchableOpacity>
        <ReportModal
          visible={reportVisible}
          itemType="listing"
          itemId={id}
          itemName={title}
          onClose={() => setReportVisible(false)}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>

        <View style={styles.row}>
          <View style={styles.ownerInfo}>
            <View style={styles.ownerAvatar}>
              <Text style={styles.ownerAvatarText}>
                {showOwner ? getOwnerInitials(ownerName) : '?'}
              </Text>
            </View>
            <View style={styles.ownerDetails}>
              <Text style={styles.ownerName} numberOfLines={1}>
                {showOwner ? ownerName : 'Owner'}
              </Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={12} color={Colors.warning} />
                <Text style={styles.ratingText}>{ownerRating}</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.requestButton, lendingMode === 'free' && styles.freeRequestButton]}
            onPress={onRequestPress}
          >
            <Text
              style={[styles.requestButtonText, lendingMode === 'free' && styles.freeRequestButtonText]}
            >
              {lendingMode === 'free' ? 'Lend' : 'Rent'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={14} color={Colors.textSecondary} />
            <Text style={styles.locationText} numberOfLines={1}>
              {location}
            </Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText} numberOfLines={1}>
              {formatPrice(priceMinor, currency)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.sm,
    minHeight: 100,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: Spacing.md,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surfaceAlt,
  },
  placeholderImage: {
    width: '100%',
    height: 160,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lendingModeBadge: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    backgroundColor: Colors.success,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
    zIndex: 1,
  },
  lendingModeText: {
    color: Colors.primaryContrast,
    fontSize: 10,
    fontWeight: '600',
  },
  favoriteButton: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.full,
    padding: Spacing.xs,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  reportButton: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.full,
    padding: Spacing.xs,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  content: {
    flex: 1,
  },
  title: {
    ...Typography.body.large,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  description: {
    ...Typography.body.small,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  ownerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  ownerAvatar: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  ownerAvatarText: {
    color: Colors.primaryContrast,
    fontSize: 12,
    fontWeight: '600',
  },
  ownerDetails: {
    flex: 1,
  },
  ownerName: {
    ...Typography.body.small,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    ...Typography.body.small,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  requestButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.md,
  },
  freeRequestButton: {
    backgroundColor: Colors.success,
  },
  requestButtonText: {
    color: Colors.primaryContrast,
    fontSize: 12,
    fontWeight: '600',
  },
  freeRequestButtonText: {
    color: Colors.primaryContrast,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationText: {
    ...Typography.body.small,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceText: {
    ...Typography.label.medium,
    fontWeight: '600',
    color: Colors.primary,
  },
});