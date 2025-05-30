import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  containerDark: {
    backgroundColor: '#18181b',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 16,
    width: '100%',
  },
  rowDark: {
    borderBottomColor: '#374151',
  },
  label: {
    fontSize: 18,
    color: '#000',
  },
  labelDark: {
    color: '#fff',
  },
  btn: {
    backgroundColor: '#e5e7eb',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnDark: {
    backgroundColor: '#374151',
  },
  btnText: {
    fontSize: 20,
    color: '#000',
  },
  btnTextDark: {
    color: '#fff',
  },
  badge: {
    color: '#22c55e',
    fontWeight: 'bold',
    marginRight: 8,
  },
  backBtn: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#22c55e',
    padding: 12,
    borderRadius: 24,
    justifyContent: 'center',
  },
  backBtnText: {
    color: '#fff',
    fontSize: 18,
  },
});