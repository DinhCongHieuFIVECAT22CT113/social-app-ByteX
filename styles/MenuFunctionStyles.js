import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  menuRoot: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 28,
    backgroundColor: '#f9fafb',
  },
  menuRootDark: {
    backgroundColor: '#18181b',
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 18,
    width: '100%',
    paddingHorizontal: 4,
  },
  menuRowDark: {
    borderBottomColor: '#374151',
  },
  menuLabel: {
    fontSize: 19,
    color: '#111827',
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  menuLabelDark: {
    color: '#f3f4f6',
  },
  menuBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLogout: {
    marginTop: 28,
    width: '100%',
    backgroundColor: '#22c55e',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    shadowColor: '#22c55e',
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
  },
  menuLogoutText: {
    color: '#fff',
    fontSize: 19,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  menuBack: {
    marginTop: 18,
    width: '100%',
    borderRadius: 12,
    padding: 14,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
  },
  menuBackDark: {
    backgroundColor: '#374151',
  },
  menuBackText: {
    color: '#111827',
    fontSize: 19,
    fontWeight: '700',
  },
  menuBackTextDark: {
    color: '#fff',
  },
});