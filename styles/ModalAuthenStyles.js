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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  backBtn: {
    backgroundColor: '#22c55e',
    borderRadius: 8,
    padding: 8,
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 20,
    color: '#000',
  },
  headerTextDark: {
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    color: '#000',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    width: '100%',
    marginBottom: 16,
  },
  inputDark: {
    borderColor: '#374151',
    color: '#fff',
    backgroundColor: '#232326',
  },
  sendBtn: {
    backgroundColor: '#22c55e',
    width: '100%',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  sendBtnText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  backIcon: {
    color: '#fff',
    fontSize: 18,
  },
});