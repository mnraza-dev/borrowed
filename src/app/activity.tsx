import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, Typography } from '@/constants/theme';
import RequestStatusBadge from '@/components/ui/request-status-badge';
import PrimaryButton from '@/components/ui/primary-button';
import EmptyState from '@/components/ui/empty-state';

export default function ActivityScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Requests received */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Requests Received</Text>
        </View>
        <EmptyState
          icon="mail-unread-outline"
          title="No incoming requests"
          subtitle="When someone wants to borrow your items, you'll see them here"
        />
      </View>

      {/* Requests sent */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Requests Sent</Text>
        </View>
        <View style={styles.requestCard}>
          <View style={styles.requestInfo}>
            <Text style={styles.requestTitle}>Professional Power Drill Set</Text>
            <Text style={styles.requestDetails}>Dec 25 - Dec 27 • ₹15,000/day</Text>
          </View>
          <RequestStatusBadge status="pending" size="large" />
        </View>
      </View>

      {/* Upcoming pickups */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Pickups</Text>
        </View>
        <EmptyState
          icon="calendar-outline"
          title="No upcoming pickups"
          subtitle="Approved requests will appear here"
        />
      </View>

      {/* Active loans */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Active Loans & Rentals</Text>
        </View>
        <EmptyState
          icon="time-outline"
          title="No active items"
          subtitle="Items currently borrowed will show here"
        />
      </View>

      {/* Pending returns */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Pending Returns</Text>
        </View>
        <EmptyState
          icon="return-up-back-outline"
          title="No returns pending"
          subtitle="Items due for return will appear here"
        />
      </View>

      {/* Completed transactions */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Completed</Text>
        </View>
        <EmptyState
          icon="checkmark-done-circle-outline"
          title="No completed transactions yet"
          subtitle="Your transaction history will appear here"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.md,
  },
  section: {
    marginBottom: Spacing.lg,
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
  requestCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  requestInfo: {
    flex: 1,
  },
  requestTitle: {
    ...Typography.body.medium,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  requestDetails: {
    ...Typography.body.small,
    color: Colors.textSecondary,
  },
});