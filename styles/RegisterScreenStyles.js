import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6',
  },
  rootDark: {
    backgroundColor: '#18181b',
  },
  rootLight: {
    backgroundColor: '#fff',
  },
  backBtn: {
    marginBottom: 32,
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#22c55e',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#22c55e',
    shadowOpacity: 0.14,
    shadowRadius: 6,
    elevation: 3,
  },
  logo: {
    width: 180,
    height: 72,
    marginBottom: 12,
    resizeMode: 'contain',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 36,
    textAlign: 'center',
    fontWeight: '600',
    color: '#22c55e',
    letterSpacing: 0.2,
  },
  subtitleDark: {
    color: '#4ade80',
  },
  subtitleLight: {
    color: '#22c55e',
  },
  formGroup: {
    width: '100%',
    maxWidth: 420,
    marginBottom: 22,
  },
  input: {
    width: '100%',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 14,
    borderWidth: 1.5,
  },
  inputGreenDark: {
    borderColor: '#4ade80',
    color: '#4ade80',
    backgroundColor: '#232326',
  },
  inputGreenLight: {
    borderColor: '#4ade80',
    color: '#22c55e',
    backgroundColor: '#fff',
  },
  inputGrayDark: {
    borderColor: '#374151',
    color: '#e5e7eb',
    backgroundColor: '#232326',
  },
  inputGrayLight: {
    borderColor: '#d1d5db',
    color: '#111827',
    backgroundColor: '#fff',
  },
  registerBtn: {
    width: '100%',
    backgroundColor: '#22c55e',
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#22c55e',
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 2,
  },
  registerBtnText: {
    color: '#fff',
    fontSize: 19,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: 420,
    marginVertical: 28,
  },
  orLine: {
    flex: 1,
    borderBottomWidth: 1.5,
  },
  orLineDark: {
    borderColor: '#374151',
  },
  orLineLight: {
    borderColor: '#d1d5db',
  },
  orText: {
    marginHorizontal: 14,
    fontSize: 15,
    fontWeight: '600',
    color: '#6b7280',
  },
  orTextDark: {
    color: '#4ade80',
  },
  orTextLight: {
    color: '#22c55e',
  },
  googleBtn: {
    width: '100%',
    maxWidth: 420,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderRadius: 999,
    paddingVertical: 14,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderColor: '#22c55e',
    shadowColor: '#22c55e',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 1,
  },
  googleBtnDark: {
    borderColor: '#374151',
    backgroundColor: '#232326',
  },
  googleBtnLight: {
    borderColor: '#d1d5db',
    backgroundColor: '#fff',
  },
  googleLogo: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  googleText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22c55e',
  },
  googleTextDark: {
    color: '#fff',
  },
  googleTextLight: {
    color: '#22c55e',
  },
  registerRow: {
    fontSize: 15,
    marginTop: 36,
    textAlign: 'center',
    color: '#6b7280',
    fontWeight: '500',
  },
  registerRowDark: {
    color: '#9ca3af',
  },
  registerRowLight: {
    color: '#22c55e',
  },
  registerLink: {
    color: '#22c55e',
    marginLeft: 6,
    textDecorationLine: 'underline',
    fontWeight: '700',
  },
});