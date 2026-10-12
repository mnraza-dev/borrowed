import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, Typography } from '@/constants/theme';

export enum ReportReason {
  SPAM = 'spam',
  FRAUD = 'fraud',
  INAPPROPRIATE_CONTENT = 'inappropriate_content',
  HARASSMENT = 'harassment',
  ILLEGAL_ITEMS = 'illegal_items',
  MISLEADING = 'misleading',
  OTHER = 'other',
}

const REPORT_REASON_OPTIONS: { value: ReportReason; label: string }[] = [
  { value: ReportReason.SPAM, label: 'Spam or irrelevant' },
  { value: ReportReason.FRAUD, label: 'Scam or fraud' },
  { value: ReportReason.INAPPROPRIATE_CONTENT, label: 'Inappropriate content' },
  { value: ReportReason.HARASSMENT, label: 'Harassment or hate' },
  { value: ReportReason.ILLEGAL_ITEMS, label: 'Illegal or dangerous items' },
  { value: ReportReason.MISLEADING, label: 'Misleading listing' },
  { value: ReportReason.OTHER, label: 'Other' },
];

const REPORT_ICON_MAP: Record<ReportReason, string> = {
  [ReportReason.SPAM]: 'alert-circle-outline',
  [ReportReason.FRAUD]: 'shield-outline',
  [ReportReason.INAPPROPRIATE_CONTENT]: 'eye-off-outline',
  [ReportReason.HARASSMENT]: 'people-off-outline',
  [ReportReason.ILLEGAL_ITEMS]: 'warning-outline',
  [ReportReason.MISLEADING]: 'document-text-outline',
  [ReportReason.OTHER]: 'help-circle-outline',
};

export interface ReportModalProps {
  visible: boolean;
  itemType: 'listing' | 'user' | 'comment';
  itemId: string;
  itemName?: string;
  onReport?: (reason: string, details: string) => Promise<void>;
  onClose: () => void;
}

export default function ReportModal({
  visible,
  itemType,
  itemId,
  itemName,
  onReport,
  onClose,
}: ReportModalProps) {
  const [selectedReason, setSelectedReason] = useState<ReportReason | null>(null);
  const [details, setDetails] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const itemNameLabel = itemName || itemType === 'user' ? 'this user' : `this ${itemType}`;

  const handleReport = async () => {
    if (!selectedReason || !onReport) return;

    try {
      setSubmitting(true);
      await onReport(selectedReason, details);
      setSubmitted(true);
    } catch (error) {
      console.error('Report failed:', error);
      setSubmitting(false);
    }
  };

  const reset = () => {
    setSelectedReason(null);
    setDetails('');
    setSubmitting(false);
    setSubmitted(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const renderReasonSelection = () => (
    <>
      <Text style={styles.headerTitle}>Report {itemType}</Text>
      <Text style={styles.headerSubtitle}>
        {itemName ? `About: ${itemName}` : `Report ${itemType} ${itemId}`}
      </Text>
      <Text style={styles.instruction}>Please select a reason for this report:</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {REPORT_REASON_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.reasonButton,
              selectedReason === option.value && styles.reasonButtonSelected,
            ]}
            onPress={() => setSelectedReason(option.value)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={REPORT_ICON_MAP[option.value] as any}
              size={22}
              color={
                selectedReason === option.value ? Colors.primaryContrast : Colors.textSecondary
              }
            />
            <Text
              style={[
                styles.reasonText,
                selectedReason === option.value && styles.reasonTextSelected,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={[styles.nextButton, !selectedReason && styles.nextButtonDisabled]}
        onPress={handleReport}
        disabled={!selectedReason || submitting}
      >
        {submitting ? (
          <ActivityIndicator color={Colors.primaryContrast} />
        ) : (
          <Text style={styles.nextButtonText}>Next</Text>
        )}
      </TouchableOpacity>
    </>
  );

  const renderDetailsScreen = () => (
    <>
      <Text style={styles.headerTitle}>Tell us more</Text>
      <Text style={styles.headerSubtitle}>{REPORT_REASON_OPTIONS.find((o) => o.value === selectedReason)?.label}</Text>
      <Text style={styles.instruction}>
        Share any additional details that will help us review this report.
      </Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Details (optional)</Text>
        <View style={styles.textAreaWrapper}>
          <ScrollView
            style={styles.textArea}
            contentContainerStyle={styles.textAreaContent}
            showsVerticalScrollIndicator={false}
          >
            <Text
              style={styles.textAreaText}
            >
              {details || ''}
            </Text>
          </ScrollView>
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setDetails('')}
            disabled={!details}
          >
            <Ionicons name="close-circle-outline" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleReport}
        disabled={!onReport || submitting}
      >
        {submitting ? (
          <ActivityIndicator color={Colors.primaryContrast} />
        ) : (
          <Text style={styles.submitButtonText}>Submit Report</Text>
        )}
      </TouchableOpacity>
    </>
  );

  const renderSuccessScreen = () => (
    <>
      <View style={styles.successIconContainer}>
        <Ionicons name="checkmark-done-circle" size={64} color={Colors.success} />
      </View>
      <Text style={styles.successTitle}>Thanks for your feedback!</Text>
      <Text style={styles.successText}>
        Your report has been submitted. We will review it and take appropriate action.
      </Text>
      <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </>
  );

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
      presentationStyle="fullScreen"
    >
      <Pressable style={styles.backdrop} onPress={handleClose} />
      <View style={styles.modalContent}>
        {submitted ? renderSuccessScreen() : selectedReason ? renderDetailsScreen() : renderReasonSelection()}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    maxWidth: 440,
    maxHeight: '90%',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  headerTitle: {
    ...Typography.heading.medium,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    ...Typography.body.medium,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  instruction: {
    ...Typography.body.medium,
    color: Colors.text,
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.xs,
  },
  reasonButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    backgroundColor: Colors.surfaceAlt,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
  },
  reasonButtonSelected: {
    backgroundColor: Colors.primary,
  },
  reasonText: {
    ...Typography.body.medium,
    color: Colors.text,
    marginLeft: Spacing.md,
    fontWeight: '500',
  },
  reasonTextSelected: {
    color: Colors.primaryContrast,
  },
  nextButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
  },
  nextButtonDisabled: {
    backgroundColor: Colors.textTertiary,
  },
  nextButtonText: {
    color: Colors.primaryContrast,
    ...Typography.body.medium,
    fontWeight: '600',
  },
  detailsContainer: {
    flex: 1,
  },
  label: {
    ...Typography.body.medium,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  textAreaWrapper: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    position: 'relative',
    minHeight: 120,
    maxHeight: 200,
  },
  textArea: {
    flex: 1,
  },
  textAreaContent: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  textAreaText: {
    ...Typography.body.medium,
    color: Colors.text,
  },
  clearButton: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    padding: Spacing.xs,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
  },
  submitButtonText: {
    color: Colors.primaryContrast,
    ...Typography.body.medium,
    fontWeight: '600',
  },
  successIconContainer: {
    alignItems: 'center',
    marginVertical: Spacing.lg,
  },
  successTitle: {
    ...Typography.heading.medium,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  successText: {
    ...Typography.body.medium,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.xxl,
  },
  closeButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    alignSelf: 'center',
  },
  closeButtonText: {
    color: Colors.primaryContrast,
    ...Typography.body.medium,
    fontWeight: '600',
  },
});
