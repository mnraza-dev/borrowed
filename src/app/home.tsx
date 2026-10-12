import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, Typography, LendingMode } from '@/constants/theme';
import { mockListings, CATEGORIES } from '@/data/mockListings';
import SearchBar from '@/components/ui/search-bar';
import CategoryChip from '@/components/ui/category-chip';
import ListingCard from '@/components/ui/listing-card';
import PrimaryButton from '@/components/ui/primary-button';

export default function HomeScreen() {
  const [selectedCity, setSelectedCity] = React.useState('Bengaluru');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [showFreeOnly, setShowFreeOnly] = React.useState(false);
  const [showPaidOnly, setShowPaidOnly] = React.useState(false);

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getFilteredListings = () => {
    return mockListings.filter(item => {
      if (selectedCategory && item.categoryId !== selectedCategory) return false;
      if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (showFreeOnly && item.lendingMode !== LendingMode.FREE) return false;
      if (showPaidOnly && item.lendingMode !== LendingMode.PAID) return false;
      return true;
    });
  };

  const getFeaturedListings = () => {
    return getFilteredListings().slice(0, 4);
  };

  const getNearbyListings = () => {
    return getFilteredListings().slice(4, 7);
  };

  const getRecentlyAdded = () => {
    const sorted = [...getFilteredListings()].sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return sorted.slice(0, 3);
  };

  type MockListingType = typeof mockListings[0];

  const handleRequest = (item: MockListingType) => {
    console.log('Request:', item.id);
  };

  const handleFavorite = (id: string) => {
    console.log('Favorite:', id);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Greeting */}
      <View style={styles.greetingContainer}>
        <Text style={styles.greeting}>{getTimeGreeting()}, find your perfect item today!</Text>
      </View>

      {/* Location selector */}
      <View style={styles.locationSection}>
        <Text style={styles.sectionLabel}>Location</Text>
        <View style={styles.locationSelector}>
          <Text style={styles.locationText}>{selectedCity}</Text>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="chevron-down" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search bar */}
      <View style={styles.searchSection}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search listings, owners, or categories..."
          showCancel={searchQuery.length > 0}
          onCancel={() => setSearchQuery('')}
        />
      </View>

      {/* Free/Paid toggle */}
      <View style={styles.filterSection}>
        <View style={styles.filterRow}>
          <CategoryChip
            label="Free"
            isSelected={showFreeOnly}
            onPress={() => {
              setShowFreeOnly(!showFreeOnly);
              setShowPaidOnly(false);
            }}
          />
          <CategoryChip
            label="Paid"
            isSelected={showPaidOnly}
            onPress={() => {
              setShowPaidOnly(!showPaidOnly);
              setShowFreeOnly(false);
            }}
          />
        </View>
      </View>

      {/* Category chips */}
      <View style={styles.categoriesSection}>
        <Text style={styles.sectionLabel}>Categories</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chipsScroll}
          contentContainerStyle={styles.chipsContent}
        >
          {CATEGORIES.map((cat) => (
            <CategoryChip
              key={cat.id}
              label={cat.name}
              isSelected={selectedCategory === cat.id}
              onPress={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Featured Listings */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Listings</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={getFeaturedListings()}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ListingCard
              id={item.id}
              title={item.title}
              description={item.description}
              ownerName={item.ownerName}
              ownerRating={item.ownerRating}
              location={`${item.area}, ${item.city}`}
              priceMinor={item.dailyPriceMinor}
              currency={item.currency}
              lendingMode={item.lendingMode}
              imageUrl={item.images[0]}
              onPress={() => {}}
              onRequestPress={() => handleRequest(item)}
              onFavoritePress={() => handleFavorite(item.id)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={{ width: Spacing.md }} />}
        />
      </View>

      {/* Nearby Items */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby Items</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        {getNearbyListings().length > 0 ? (
          <FlatList
            data={getNearbyListings()}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ListingCard
                id={item.id}
                title={item.title}
                description={item.description}
                ownerName={item.ownerName}
                ownerRating={item.ownerRating}
                location={`${item.area}, ${item.city}`}
                priceMinor={item.dailyPriceMinor}
                currency={item.currency}
                lendingMode={item.lendingMode}
                imageUrl={item.images[0]}
                onPress={() => {}}
                onRequestPress={() => handleRequest(item)}
                onFavoritePress={() => handleFavorite(item.id)}
                compact
              />
            )}
            scrollEnabled={false}
            contentContainerStyle={styles.nearbyList}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="location-outline" size={48} color={Colors.textTertiary} />
            <Text style={styles.emptyText}>No nearby items found</Text>
          </View>
        )}
      </View>

      {/* Recently Added */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recently Added</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        {getRecentlyAdded().length > 0 ? (
          <FlatList
            data={getRecentlyAdded()}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ListingCard
                id={item.id}
                title={item.title}
                description={item.description}
                ownerName={item.ownerName}
                ownerRating={item.ownerRating}
                location={`${item.area}, ${item.city}`}
                priceMinor={item.dailyPriceMinor}
                currency={item.currency}
                lendingMode={item.lendingMode}
                imageUrl={item.images[0]}
                onPress={() => {}}
                onRequestPress={() => handleRequest(item)}
                onFavoritePress={() => handleFavorite(item.id)}
                compact
              />
            )}
            scrollEnabled={false}
            contentContainerStyle={styles.recentlyList}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="time-outline" size={48} color={Colors.textTertiary} />
            <Text style={styles.emptyText}>No recent listings</Text>
          </View>
        )}
      </View>

      {/* Free floating action button */}
      <View style={styles.fabContainer}>
        <PrimaryButton
          title="Create Listing"
          onPress={() => {}}
          variant="primary"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  greetingContainer: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
  },
  greeting: {
    ...Typography.heading.medium,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
  },
  locationSection: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  sectionLabel: {
    ...Typography.label.small,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
    paddingHorizontal: Spacing.xs,
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  locationText: {
    ...Typography.body.medium,
    color: Colors.text,
    flex: 1,
    textAlign: 'center',
  },
  searchSection: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  filterSection: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
  },
  filterRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  categoriesSection: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
  },
  chipsScroll: {
    gap: Spacing.sm,
  },
  chipsContent: {
    gap: Spacing.sm,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    ...Typography.label.medium,
    color: Colors.text,
    fontWeight: '600',
  },
  viewAll: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: Spacing.md,
  },
  nearbyList: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.md,
  },
  recentlyList: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.md,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.md,
  },
  emptyText: {
    ...Typography.body.medium,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
  fabContainer: {
    padding: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
});