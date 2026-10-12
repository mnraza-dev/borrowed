import type { RouteProp } from '@expo/router';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, Typography } from '@/constants/theme';
import PriceLabel from '@/components/ui/price-label';
import { mockListings } from '@/data/mockListings';

type ItemDetailScreenRouteProp = RouteProp<'@/item/[id]', 'params'>;

export default function ItemDetailScreen({ route }: { route: ItemDetailScreenRouteProp }) {
  const { id } = route.params;

  const listing = mockListings.find((l) => l.id === id);

  if (!listing) {
    return <Text style={styles.notFound}>Listing not found</Text>;
  }

  const formatPrice = (amount: number, currency: string): string => {
    if (listing.lendingMode === 'free') {
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
    <View style={styles.container}>
      {/* Image gallery */}
      <FlatList
        data={listing.images}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.image} onPress={() => {}}>
            <Image source={{ uri: item }} style={{ width: '100%', height: 200, borderRadius: BorderRadius.md }} />
          </TouchableOpacity>
        )}
      />

      {/* Details section */}
      <View style={styles.details}>
        <View style={styles.owner}>
          <Ionicons name="star" size={16} color={Colors.warning} />
          <Text style={styles.ownerRating}>{listing.ownerRating}</Text>
          <Text style={styles.ownerName}>{listing.ownerName}</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.title}>{listing.title}</Text>
          <Text style={styles.description}>{listing.description}</Text>

          {/* Lending mode and price */}
          <View style={styles.lendingMode}>
            <Text style={styles.lendingModeText}>
              {listing.lendingMode === 'free' ? 'Free lending' : 'Paid rental'}
            </Text>
          </View>

          <PriceLabel
            amountMinor={listing.dailyPriceMinor}
            currency={listing.currency}
            lendingMode={listing.lendingMode}
            showStrikethrough={listing.lendingMode === 'paid'}
          />

          {/* Condition */}
          <View style={styles.condition}>
            <Text style={styles.conditionLabel}>Condition: {listing.condition}</Text>
          </View>

          {/* Location */}
          <View style={styles.location}>
            <Ionicons name="location-outline" size={16} color={Colors.textSecondary} />
            <Text style={styles.locationText}>{listing.city} - {listing.area}</Text>
          </View>

          {/* Buttons */}
          <View style={styles.actions}>
            <TouchableOpacity style={[styles.requestButton, listing.lendingMode === 'free' && styles.freeButton]}>
              <Text style={[styles.requestButtonText, listing.lendingMode === 'free' && styles.freeButtonText]}>
                {listing.lendingMode === 'free' ? 'Lend' : 'Rent'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Specifications */}
          <View style={styles.specs}>
            <Text style={styles.specsLabel}>Details</Text>
            <Text style={styles.specsValue}>{listing.area}, {listing.city}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  details: {
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
  },
  owner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  ownerRating: {
    ...Typography.body.small,
    color: Colors.warning,
    marginRight: Spacing.xs,
  },
  ownerName: {
    ...Typography.body.small,
    fontWeight: '600',
    color: Colors.text,
  },
  info: {
    flex: 1,
  },
  title: {
    ...Typography.heading.medium,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  description: {
    ...Typography.body.small,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  lendingMode: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  lendingModeText: {
    ...Typography.body.small,
    fontWeight: '600',
    color: Colors.primary,
  },
  condition: {
    marginBottom: Spacing.xs,
  },
  conditionLabel: {
    ...Typography.body.small,
    color: Colors.textSecondary,
    marginRight: 4,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  locationText: {
    ...Typography.body.small,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  actions: {
    marginTop: Spacing.md,
  },
  requestButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.xs,
  },
  freeButton: {
    backgroundColor: Colors.success,
  },
  requestButtonText: {
    color: Colors.primaryContrast,
    fontSize: 14,
    fontWeight: '600',
  },
  freeButtonText: {
    color: Colors.primaryContrast,
  },
  specs: {
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.surfaceBorder,
  },
  specsLabel: {
    ...Typography.body.small,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  specsValue: {
    ...Typography.body.small,
    color: Colors.text,
  },
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xxl,
  },
});