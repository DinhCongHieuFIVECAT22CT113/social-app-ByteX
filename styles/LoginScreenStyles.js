import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 40,
    maxWidth: 350,
    alignSelf: 'center',
  },
  backBtn: {
    marginBottom: 40,
    backgroundColor: '#2ecc71',
    borderRadius: 8,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  logoRow: {
    justifyContent: 'center',
    marginBottom: 24,
  },
  logoText: {
    fontWeight: 'bold',
    fontSize: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 32,
    fontSize: 14,
  },
  formGroup: {
    width: '100%',
    marginBottom: 24,
  },
  label: {
    color: '#22c55e',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  input: {
    width: '100%',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 14,
    marginBottom: 12,
    borderWidth: 1,
  },
  inputDark: {
    borderColor: '#22c55e',
    color: '#fff',
  },
  inputLight: {
    borderColor: '#22c55e',
    color: '#000',
  },
  forgotText: {
    color: '#22c55e',
    fontSize: 12,
    marginBottom: 16,
    textDecorationLine: 'underline',
  },
  loginBtn: {
    width: '100%',
    backgroundColor: '#22c55e',
    borderRadius: 8,
    paddingVertical: 12,
  },
  loginText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  orLine: {
    flex: 1,
    borderBottomWidth: 1,
  },
  orText: {
    marginHorizontal: 12,
    fontSize: 12,
  },
  googleBtn: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  googleLogo: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  googleText: {
    fontSize: 14,
  },
  registerRow: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 24,
  },
  registerLink: {
    color: '#22c55e',
    textDecorationLine: 'underline',
    marginLeft: 4,
  },
});