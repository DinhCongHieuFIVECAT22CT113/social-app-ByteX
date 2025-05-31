import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#f3f4f6',
  },
  containerDark: {
    backgroundColor: '#18181b',
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    backgroundColor: '#e5e7eb',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#22c55e',
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 2,
  },
  backIcon: {
    color: '#22c55e',
    fontSize: 22,
    fontWeight: '700',
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 22,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#22c55e',
    color: '#111827',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    width: '100%',
    fontSize: 17,
  },
  inputDark: {
    borderColor: '#374151',
    color: '#fff',
    backgroundColor: '#232326',
  },
  confirmBtn: {
    backgroundColor: '#22c55e',
    width: '100%',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#22c55e',
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 2,
  },
  confirmBtnText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});