import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: '#f3f4f6',
  },
  containerDark: {
    backgroundColor: '#18181b',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 20,
    width: '100%',
    paddingHorizontal: 8,
  },
  rowDark: {
    borderBottomColor: '#374151',
  },
  label: {
    fontSize: 20,
    color: '#111827',
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  labelDark: {
    color: '#f3f4f6',
  },
  btn: {
    backgroundColor: '#e5e7eb',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#22c55e',
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 2,
  },
  btnDark: {
    backgroundColor: '#374151',
  },
  btnText: {
    fontSize: 24,
    color: '#22c55e',
    fontWeight: '700',
  },
  btnTextDark: {
    color: '#4ade80',
  },
  badge: {
    color: '#22c55e',
    fontWeight: 'bold',
    marginRight: 12,
    fontSize: 16,
  },
  backBtn: {
    marginTop: 32,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#22c55e',
    padding: 18,
    borderRadius: 32,
    justifyContent: 'center',
    shadowColor: '#22c55e',
    shadowOpacity: 0.14,
    shadowRadius: 8,
    elevation: 3,
  },
  backBtnText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});