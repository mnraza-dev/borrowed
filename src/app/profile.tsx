import { View, Text, StyleSheet, FlatList, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, Typography } from '@/constants/theme';
import { mockListings } from '@/data/mockListings';
import ListingCard from '@/components/ui/listing-card';

export default function ProfileScreen() {
  const userListings = mockListings;

  return (
    <ScrollView style={styles.container}>
      {/* Profile header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.avatarContainer}>
          <Ionicons name="person-outline" size={64} color={Colors.primary} style={styles.avatar} />
        </TouchableOpacity>
        <View style={styles.avatarDetails}>
          <Text style={[styles.name, { textAlign: 'center' }]}>Jordan Smith</Text>
          <Text style={[styles.email, { textAlign: 'center' }]}>jordan@example.com</Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Listings</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Items Borrowed</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>47</Text>
          <Text style={styles.statLabel}>Completed Transactions</Text>
        </View>
      </View>

      {/* My Listings section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Listings</Text>
          <TouchableOpacity style={styles.viewAll}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={userListings}
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
              compact={true}
            />
          )}
          numColumns={2}
          contentContainerStyle={styles.list}
        />
      </View>

      {/* History & Reviews */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Borrowing & Lending History</Text>
        </View>
        <View style={styles.list}>
          <TouchableOpacity style={styles.listItem}>
            <View style={styles.listItemLeft}>
              <Ionicons name="gift-outline" size={20} color={Colors.primary} />
              <Text style={styles.listItemText}>Professional Power Drill Set</Text>
            </View>
            <View style={styles.listItemRight}>
              <Text style={styles.listItemDate}>Nov 15</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem}>
            <View style={styles.listItemLeft}>
              <Ionicons name="cash-outline" size={20} color={Colors.primary} />
              <Text style={styles.listItemText}>Canon EOS R5</Text>
            </View>
            <View style={styles.listItemRight}>
              <Text style={styles.listItemDate}>Dec 1</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Settings & Support */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Safety & Settings</Text>
        </View>
        <View style={styles.list}>
          {['Safety Center', 'Settings', 'Blocked Users', 'Help & Reports'].map((item, index) => (
            <TouchableOpacity key={index} style={styles.listItem}>
              <View style={styles.listItemLeft}>
                <Ionicons name="settings-outline" size={20} color={Colors.textSecondary} />
              </View>
              <Text style={styles.listItemText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Sign out */}
      <TouchableOpacity style={styles.signOutButton} onPress={() => {}}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: Spacing.xxl,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    color: Colors.primary,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  avatarDetails: {
  },
  name: {
    ...Typography.heading.medium,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  email: {
    ...Typography.body.small,
    color: Colors.textSecondary,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Spacing.xxl,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    ...Typography.heading.medium,
    fontWeight: '600',
    color: Colors.primary,
  },
  statLabel: {
    ...Typography.body.small,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  section: {
    marginBottom: Spacing.xxl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    ...Typography.label.medium,
    color: Colors.text,
    fontWeight: '600',
  },
  viewAll: {
    paddingHorizontal: Spacing.sm,
  },
  viewAllText: {
    color: Colors.primary,
    fontWeight: '600',
  },
  list: {
    paddingHorizontal: Spacing.md,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: Colors.surfaceBorder,
    marginBottom: Spacing.xs,
  },
  listItemLeft: {
    flex: 1,
    marginRight: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemText: {
    ...Typography.body.medium,
    color: Colors.text,
    marginLeft: Spacing.sm,
  },
  listItemRight: {
    alignItems: 'flex-end',
  },
  listItemDate: {
    ...Typography.body.small,
    color: Colors.textSecondary,
  },
  signOutButton: {
    backgroundColor: Colors.error,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  signOutText: {
    color: Colors.primaryContrast,
    fontSize: 14,
    fontWeight: '600',
  },
});