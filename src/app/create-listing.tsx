import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, Typography } from '@/constants/theme';
import CategoryChip from '@/components/ui/category-chip';
import PrimaryButton from '@/components/ui/primary-button';
import { CATEGORIES } from '@/data/mockListings';

export default function CreateListingScreen() {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(CATEGORIES[0].id);
  const [selectedCondition, setSelectedCondition] = React.useState('Good');
  const [lendingMode, setLendingMode] = React.useState<'free' | 'paid'>('free');
  const [price, setPrice] = React.useState('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={0}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Create Listing</Text>
        <Text style={styles.subtitle}>Share what you have with the community</Text>

        {/* Title */}
        <View style={styles.field}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Professional Power Drill Set"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor={Colors.textTertiary}
          />
        </View>

        {/* Description */}
        <View style={styles.field}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe the item, condition, and any important details"
            value={description}
            onChangeText={setDescription}
            placeholderTextColor={Colors.textTertiary}
            multiline
          />
        </View>

        {/* Category */}
        <View style={styles.field}>
          <Text style={styles.label}>Category</Text>
          <View style={styles.categoryContainer}>
            {CATEGORIES.map((cat) => (
              <CategoryChip
                key={cat.id}
                label={cat.name}
                isSelected={selectedCategory === cat.id}
                onPress={() => setSelectedCategory(cat.id)}
              />
            ))}
          </View>
        </View>

        {/* Condition */}
        <View style={styles.field}>
          <Text style={styles.label}>Condition</Text>
          <View style={styles.conditionContainer}>
            {['New', 'Good', 'Fair', 'Poor'].map((condition) => (
              <TouchableOpacity
                key={condition}
                style={[styles.conditionChip, selectedCondition === condition && styles.conditionChipSelected]}
                onPress={() => setSelectedCondition(condition)}
              >
                <Text style={[styles.conditionChipText, selectedCondition === condition && styles.conditionChipTextSelected]}>
                  {condition}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Lending Mode */}
        <View style={styles.field}>
          <Text style={styles.label}>Lending Mode</Text>
          <View style={styles.modeContainer}>
            <TouchableOpacity
              style={[styles.modeChip, lendingMode === 'free' && styles.modeChipSelected]}
              onPress={() => { setLendingMode('free'); setPrice(''); }}
            >
              <View style={styles.modeChipContent}>
                <Ionicons name="gift" size={20} color={lendingMode === 'free' ? Colors.primaryContrast : Colors.primary} />
                <Text style={[styles.modeChipText, lendingMode === 'free' && styles.modeChipTextSelected]}>
                  Free Lending
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modeChip, lendingMode === 'paid' && styles.modeChipSelected]}
              onPress={() => setLendingMode('paid')}
            >
              <View style={styles.modeChipContent}>
                <Ionicons name="cash" size={20} color={lendingMode === 'paid' ? Colors.primaryContrast : Colors.primary} />
                <Text style={[styles.modeChipText, lendingMode === 'paid' && styles.modeChipTextSelected]}>
                  Paid Rental
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Price (only for paid) */}
        {lendingMode === 'paid' && (
          <View style={styles.field}>
            <Text style={styles.label}>Daily Price (INR)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 1500"
              value={price}
              onChangeText={setPrice}
              placeholderTextColor={Colors.textTertiary}
              keyboardType="numeric"
            />
          </View>
        )}

        {/* Location */}
        <View style={styles.field}>
          <Text style={styles.label}>Location</Text>
          <View style={styles.locationSelector}>
            <Text style={styles.locationText}>Bengaluru - Indiranagar</Text>
            <Ionicons name="chevron-down" size={16} color={Colors.textSecondary} />
          </View>
        </View>

        {/* Photos */}
        <View style={styles.field}>
          <Text style={styles.label}>Photos</Text>
          <View style={styles.photoPicker}>
            <TouchableOpacity style={styles.addPhotoButton}>
              <Ionicons name="add" size={28} color={Colors.primary} />
            </TouchableOpacity>
            <Text style={styles.photoHint}>Add up to 6 photos</Text>
          </View>
        </View>

        {/* Availability */}
        <View style={styles.field}>
          <Text style={styles.label}>Availability</Text>
          <View style={styles.availabilityPicker}>
            <Text style={styles.availabilityText}>Configure your availability dates</Text>
            <Ionicons name="calendar-outline" size={20} color={Colors.textSecondary} />
          </View>
        </View>

        {/* Publish button */}
        <PrimaryButton
          title="Publish Listing"
          onPress={() => {}}
          disabled={!title || !description}
          variant="primary"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  title: {
    ...Typography.heading.medium,
    color: Colors.text,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.body.small,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  field: {
    marginBottom: Spacing.lg,
  },
  label: {
    ...Typography.label.medium,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    fontSize: 16,
    color: Colors.text,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  categoryContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  conditionContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  conditionChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  conditionChipSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  conditionChipText: {
    ...Typography.body.small,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  conditionChipTextSelected: {
    color: Colors.primaryContrast,
  },
  modeContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  modeChip: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  modeChipSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  modeChipContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  modeChipText: {
    ...Typography.body.small,
    color: Colors.primary,
    fontWeight: '600',
  },
  modeChipTextSelected: {
    color: Colors.primaryContrast,
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  locationText: {
    ...Typography.body.medium,
    color: Colors.text,
  },
  photoPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  addPhotoButton: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoHint: {
    ...Typography.body.small,
    color: Colors.textSecondary,
  },
  availabilityPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surfaceAlt,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  availabilityText: {
    ...Typography.body.medium,
    color: Colors.textSecondary,
  },
});