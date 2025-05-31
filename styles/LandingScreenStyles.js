import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  rootDark: {
    backgroundColor: '#18181b',
  },
  rootLight: {
    backgroundColor: '#f9fafb',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
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
  logoImage: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
    marginBottom: 18,
  },
  image: {
    width: 110,
    height: 110,
    marginVertical: 18,
    borderRadius: 24,
    backgroundColor: '#e5e7eb',
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: 22,
    letterSpacing: 0.5,
  },
  titleDark: {
    color: '#f3f4f6',
  },
  titleLight: {
    color: '#111827',
  },
  btn: {
    backgroundColor: '#22c55e',
    borderRadius: 16,
    paddingHorizontal: 40,
    paddingVertical: 12,
    marginTop: 18,
    shadowColor: '#22c55e',
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 3,
  },
  btnText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});