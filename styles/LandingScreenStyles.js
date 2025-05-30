import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rootDark: {
    backgroundColor: '#000',
  },
  rootLight: {
    backgroundColor: '#fff',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  logoTextDark: {
    color: '#fff',
  },
  logoTextLight: {
    color: '#000',
  },
  logoX: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#22c55e',
  },
  image: {
    width: 96,
    height: 96,
    marginVertical: 16,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 16,
  },
  titleDark: {
    color: '#fff',
  },
  titleLight: {
    color: '#000',
  },
  btn: {
    backgroundColor: '#22c55e',
    borderRadius: 12,
    paddingHorizontal: 32,
    paddingVertical: 8,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});