/**
 * Design tokens for the Borrowed marketplace.
 *
 * Warm off-white backgrounds, deep forest-green primary, dark charcoal text,
 * and soft green/neutral surfaces.
 */
export const Colors = {
  // Primary brand
  primary: '#2D5A27',
  primaryLight: '#4A8C51',
  primaryContrast: '#FFFFFF',

  // Background
  background: '#FAFAF9',
  surface: '#FFFFFF',
  surfaceAlt: '#F5F5F4',
  surfaceBorder: '#E6E6E6',

  // Text
  text: '#2D2D2D',
  textSecondary: '#6B6B6B',
  textTertiary: '#9A9A9A',

  // Status
  success: '#22C58E',
  successLight: '#DCFCE7',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  error: '#EF4444',
  errorLight: '#FEE2E2',

  // Lending mode
  free: '#22C58E',
  paid: '#2D5A27',

  // Request statuses
  pending: '#F59E0B',
  approved: '#22C58E',
  declined: '#EF4444',
  completed: '#3B82F6',

  // Overlay / neutral
  overlay: 'rgba(45, 90, 39, 0.6)',
  overlayLight: 'rgba(250, 250, 249, 0.95)',

  // Tab bar (matching dark charcoal text on warm bg)
  tabBarActive: '#2D5A27',
  tabBarInactive: '#9A9A9A',
  tabBarBackground: '#FFFFFF',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
};

export const Typography = {
  heading: {
    large: { fontSize: 32, lineHeight: 40, fontWeight: '700' as const },
    medium: { fontSize: 24, lineHeight: 32, fontWeight: '600' as const },
    small: { fontSize: 18, lineHeight: 24, fontWeight: '600' as const },
  },
  body: {
    large: { fontSize: 16, lineHeight: 24, fontWeight: '400' as const },
    medium: { fontSize: 14, lineHeight: 20, fontWeight: '400' as const },
    small: { fontSize: 12, lineHeight: 16, fontWeight: '400' as const },
  },
  label: {
    large: { fontSize: 16, lineHeight: 24, fontWeight: '600' as const },
    medium: { fontSize: 14, lineHeight: 20, fontWeight: '600' as const },
    small: { fontSize: 12, lineHeight: 16, fontWeight: '600' as const },
  },
} as const;

export const Layout = {
  maxContentWidth: 800,
  tabBarHeight: 80,
  tabBarIconSize: 24,
  cardGap: Spacing.md,
  listItemHeight: 80,
};

export const LendingMode = {
  FREE: 'free',
  PAID: 'paid',
} as const;

export type LendingMode = (typeof LendingMode)[keyof typeof LendingMode];

export default {
  Colors,
  Spacing,
  BorderRadius,
  Typography,
  Layout,
  LendingMode,
};
