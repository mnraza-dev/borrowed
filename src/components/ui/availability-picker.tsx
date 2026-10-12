import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors, Spacing, BorderRadius } from '@/constants/theme';

export interface AvailabilityPickerProps {
  onChange: (startDate: string, endDate: string) => void;
  lendingMode: 'free' | 'paid';
  minDate?: string;
  maxDate?: string;
}

export default function AvailabilityPicker({
  onChange,
  lendingMode,
  minDate = new Date().toISOString().split('T')[0],
}: AvailabilityPickerProps) {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [isStartPickerVisible, setIsStartPickerVisible] = useState(false);
  const [isEndPickerVisible, setIsEndPickerVisible] = useState(false);

  const handleStartDateSelect = (date: string) => {
    setStartDate(date);
    if (!endDate || date >= endDate) {
      setEndDate(null);
    }
    setIsStartPickerVisible(false);
  };

  const handleEndDateSelect = (date: string) => {
    setEndDate(date);
    setIsEndPickerVisible(false);
  };

  const calculateDays = (): number => {
    if (!startDate || !endDate) return 0;
    return Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24));
  };

  const calculatePrice = (): number => {
    const days = calculateDays();
    return days > 0 ? 100 * days : 0; // ₹1 per day as default price
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateSection}>
        <Text style={styles.sectionTitle}>Start Date</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setIsStartPickerVisible(true)}
        >
          <Text style={styles.dateText}>
            {startDate || 'Select start date'}
          </Text>
          <Ionicons name="calendar-outline" size={20} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.dateSection}>
        <Text style={styles.sectionTitle}>End Date</Text>
        <TouchableOpacity
          style={[styles.dateButton, !startDate && styles.dateButtonDisabled, lendingMode === 'paid' && calculateDays() < 1 && styles.dateButtonInvalid]}
          onPress={() => startDate && setIsEndPickerVisible(true)}
          disabled={!startDate}
        >
          <Text style={[styles.dateText, !startDate && styles.dateTextDisabled]}>
            {endDate || 'Select end date'}
          </Text>
          <Ionicons name="calendar-outline" size={20} color={!startDate ? Colors.textTertiary : Colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {startDate && endDate && (
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>
            Duration: {calculateDays()} day{calculateDays() !== 1 ? 's' : ''}
          </Text>
          {lendingMode === 'paid' && (
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>Price: ₹{calculatePrice()}</Text>
            </View>
          )}
        </View>
      )}

      {/* Simple date picker overlay - in production you'd use a proper calendar picker */}
      {isStartPickerVisible && (
        <View style={styles.pickerOverlay}>
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerTitle}>Start Date</Text>
            <View style={styles.pickerButtons}>
              {['Today', 'Tomorrow', 'In 3 days', 'In 1 week'].map((option, index) => (
                <TouchableOpacity
                  key={option}
                  style={styles.pickerButton}
                  onPress={() => {
                    const date = new Date();
                    date.setDate(date.getDate() + index);
                    handleStartDateSelect(date.toISOString().split('T')[0]);
                  }}
                >
                  <Text style={styles.pickerButtonText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={styles.closePickerButton}
              onPress={() => setIsStartPickerVisible(false)}
            >
              <Text style={styles.closePickerText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {isEndPickerVisible && startDate && (
        <View style={styles.pickerOverlay}>
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerTitle}>End Date</Text>
            <View style={styles.pickerButtons}>
              {['Same day', '1 day', '3 days', '1 week'].map((option, index) => (
                <TouchableOpacity
                  key={option}
                  style={styles.pickerButton}
                  onPress={() => {
                    const date = new Date(startDate);
                    if (option !== 'Same day') {
                      date.setDate(date.getDate() + (index === 0 ? 1 : index === 1 ? 3 : 7));
                    }
                    if (date >= new Date(startDate)) {
                      handleEndDateSelect(date.toISOString().split('T')[0]);
                    }
                  }}
                >
                  <Text style={styles.pickerButtonText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={styles.closePickerButton}
              onPress={() => setIsEndPickerVisible(false)}
            >
              <Text style={styles.closePickerText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
  },
  dateSection: {
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  dateButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.surfaceAlt,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
  },
  dateButtonDisabled: {
    opacity: 0.5,
  },
  dateButtonInvalid: {
    borderColor: Colors.error,
  },
  dateText: {
    fontSize: 16,
    color: Colors.text,
  },
  dateTextDisabled: {
    color: Colors.textTertiary,
  },
  summaryContainer: {
    backgroundColor: Colors.surfaceAlt,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginTop: Spacing.md,
  },
  summaryText: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 4,
  },
  priceContainer: {
    marginTop: 4,
  },
  priceText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  pickerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  pickerContainer: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    margin: Spacing.md,
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  pickerButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: Spacing.md,
  },
  pickerButton: {
    backgroundColor: Colors.surfaceAlt,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.md,
    margin: Spacing.xs,
  },
  pickerButtonText: {
    fontSize: 14,
    color: Colors.text,
  },
  closePickerButton: {
    backgroundColor: Colors.primary,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  closePickerText: {
    color: Colors.primaryContrast,
    fontSize: 14,
    fontWeight: '600',
  },
});