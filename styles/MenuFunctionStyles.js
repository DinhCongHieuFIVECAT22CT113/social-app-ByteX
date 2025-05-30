import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  menuRoot: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  menuRootDark: {
    backgroundColor: '#18181b',
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 16,
    width: '100%',
  },
  menuRowDark: {
    borderBottomColor: '#374151',
  },
  menuLabel: {
    fontSize: 18,
    color: '#000',
  },
  menuLabelDark: {
    color: '#fff',
  },
  menuBtn: {
    width: 32,
    height: 32,
  },
  menuLogout: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#22c55e',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  menuLogoutText: {
    color: '#fff',
    fontSize: 18,
  },
  menuBack: {
    marginTop: 20,
    width: '100%',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
  },
  menuBackDark: {
    backgroundColor: '#374151',
  },
  menuBackText: {
    color: '#000',
    fontSize: 18,
  },
  menuBackTextDark: {
    color: '#fff',
  },
});