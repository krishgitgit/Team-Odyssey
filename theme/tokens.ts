export const colors = {
  bg: '#F7F8FA',
  surface: '#FFFFFF',
  text: '#111111',
  textMuted: '#6B7280',
  border: '#E5E7EB',
  primary: '#111111',
  primaryText: '#FFFFFF',
  link: '#2563EB',
  inputBg: '#FFFFFF',
  divider: '#D1D5DB',
} as const;

export const space = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
} as const;

export const radius = {
  card: 16,
  input: 12,
  button: 12,
} as const;

export const type = {
  greeting: 28,
  title: 22,
  section: 17,
  body: 15,
  label: 13,
  button: 16,
} as const;

export const shadow = {
  header: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  nav: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 8,
  },
} as const;
