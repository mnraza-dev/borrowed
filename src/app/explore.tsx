import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, Typography, Layout } from '@/constants/theme';
import ListingCard from '@/components/ui/listing-card';
import { mockListings } from '@/data/mockListings';

export default function ExploreScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Search bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color={Colors.textSecondary} style={styles.searchIcon} />
        <Text style={styles.placeholder}>Search listings...</Text>
      </View>

      {/* Filter chips */}
      <View style={styles.filterChips}>
        <View style={styles.filterChip}>
          <Ionicons name="filter-outline" size={16} color={Colors.textSecondary} />
          <Text style={styles.filterText}>Filters</Text>
        </View>
        <View style={styles.filterChip}>
          <Text style={styles.filterText}>Free</Text>
        </View>
        <View style={styles.filterChip}>
          <Text style={styles.filterText}>Paid</Text>
        </View>
        <View style={styles.filterChip}>
          <Text style={styles.filterText}>Sort: Newest</Text>
        </View>
      </View>

      {/* Listings */}
      <FlatList
        data={mockListings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListingCard
            id={item.id}
            title={item.title}
            description={item.description}
            ownerName={item.ownerName}
            ownerRating={item.ownerRating}
            location={item.area}
            priceMinor={item.dailyPriceMinor}
            currency={item.currency}
            lendingMode={item.lendingMode}
            imageUrl={item.images[0]}
            onPress={() => {}}
            onRequestPress={() => {}}
            onFavoritePress={() => {}}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={48} color={Colors.textTertiary} />
            <Text style={styles.emptyTitle}>No listings found</Text>
            <Text style={styles.emptySubtitle}>Try adjusting your filters</Text>
          </View>
        }
        contentContainerStyle={styles.list}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceAlt,
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    margin: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  searchIcon: {
    marginRight: Spacing.sm,
    color: Colors.textSecondary,
  },
  placeholder: {
    color: Colors.textTertiary,
    marginLeft: Spacing.sm,
  },
  filterChips: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  filterText: {
    ...Typography.body.small,
    color: Colors.textSecondary,
    marginLeft: Spacing.xs,
  },
  list: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xxl,
  },
  emptyTitle: {
    ...Typography.heading.small,
    color: Colors.text,
    marginTop: Spacing.md,
  },
  emptySubtitle: {
    ...Typography.body.small,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
});