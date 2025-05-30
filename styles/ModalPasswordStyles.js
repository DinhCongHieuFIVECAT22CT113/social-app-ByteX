import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  containerDark: {
    backgroundColor: '#18181b',
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backIcon: {
    color: '#22c55e',
    fontSize: 18,
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    color: '#000',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    width: '100%',
  },
  inputDark: {
    borderColor: '#374151',
    color: '#fff',
    backgroundColor: '#232326',
  },
  confirmBtn: {
    backgroundColor: '#22c55e',
    width: '100%',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  confirmBtnText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
});