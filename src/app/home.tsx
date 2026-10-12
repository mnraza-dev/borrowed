import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography } from '@/constants/theme';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Greeting */}
      <Text style={styles.greeting}>Good morning, find your perfect item today!</Text>

      {/* Location selector */}
      <View style={styles.locationSelector}>
        <Text style={styles.locationLabel}>Location</Text>
        <View style={styles.locationBox}>
          <Text style={styles.locationText}>Bengaluru</Text>
          <Ionicons name="chevron-down" size={16} color={Colors.textSecondary} />
        </View>
      </View>

      {/* Search bar placeholder */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color={Colors.textSecondary} />
        <Text style={styles.searchPlaceholder}>Search listings...</Text>
      </View>

      {/* Category chips */}
      <View style={styles.categoriesSection}>
        <Text style={styles.categoriesTitle}>Categories</Text>
        <View style={styles.chipsRow}>
          <TouchableOpacity style={styles.chip}>
            <Ionicons name="construct-outline" size={16} color={Colors.textSecondary} />
            <Text style={styles.chipLabel}>Tools</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chip}>
            <Ionicons name="camera-outline" size={16} color={Colors.textSecondary} />
            <Text style={styles.chipLabel}>Electronics</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chip}>
            <Ionicons name="cloud-outline" size={16} color={Colors.textSecondary} />
            <Text style={styles.chipLabel}>Outdoors</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Featured Listings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Listings</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Professional Power Drill Set</Text>
          <Text style={styles.cardSubtitle}>₹15,000/day • Free shipping</Text>
          <Text style={styles.cardDescription}>Dewalt 20V cordless drill with 2 batteries</Text>
        </View>
      </View>

      {/* Nearby Items */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nearby Items</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>MacBook Pro 16-inch M3</Text>
          <Text style={styles.cardSubtitle}>₹25,000/day • New</Text>
        </View>
      </View>

      {/* Recently Added */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recently Added</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Camping Tent for 6 People</Text>
          <Text style={styles.cardSubtitle}>Free • Good condition</Text>
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
  greeting: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
    marginVertical: Spacing.lg,
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
  },
  locationLabel: {
    ...Typography.label.small,
    color: Colors.textSecondary,
  },
  locationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 100,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    marginLeft: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceAlt,
    borderRadius: 100,
    marginHorizontal: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    marginBottom: Spacing.lg,
  },
  searchPlaceholder: {
    marginLeft: Spacing.sm,
    color: Colors.textTertiary,
    fontSize: 14,
  },
  categoriesSection: {
    marginBottom: Spacing.xl,
    marginHorizontal: Spacing.md,
  },
  categoriesTitle: {
    ...Typography.label.medium,
    color: Colors.text,
    fontWeight: '600',
    marginBottom: Spacing.md,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 100,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  chipLabel: {
    ...Typography.body.small,
    color: Colors.text,
    marginLeft: Spacing.xs,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.label,
    color: Colors.text,
    fontWeight: '600',
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  card: {
    marginHorizontal: Spacing.md,
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    marginBottom: Spacing.md,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  cardSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  cardDescription: {
    fontSize: 12,
    color: Colors.textTertiary,
  },
});