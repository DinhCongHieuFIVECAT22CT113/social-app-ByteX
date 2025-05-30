import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rootDark: {
    backgroundColor: '#18181b',
  },
  rootLight: {
    backgroundColor: '#fff',
  },
  backBtn: {
    marginBottom: 24,
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#3ED14F',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  logo: {
    width: 160,
    height: 64,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 32,
    textAlign: 'center',
  },
  subtitleDark: {
    color: '#d1d5db',
  },
  subtitleLight: {
    color: '#6b7280',
  },
  formGroup: {
    width: '100%',
    maxWidth: 400,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    marginBottom: 12,
    borderWidth: 1,
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
    backgroundColor: '#2DBE3B',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  registerBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    marginVertical: 24,
  },
  orLine: {
    flex: 1,
    borderBottomWidth: 1,
  },
  orLineDark: {
    borderColor: '#374151',
  },
  orLineLight: {
    borderColor: '#d1d5db',
  },
  orText: {
    marginHorizontal: 12,
    fontSize: 14,
  },
  orTextDark: {
    color: '#6b7280',
  },
  orTextLight: {
    color: '#9ca3af',
  },
  googleBtn: {
    width: '100%',
    maxWidth: 400,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 12,
    marginBottom: 8,
  },
  googleBtnDark: {
    borderColor: '#374151',
  },
  googleBtnLight: {
    borderColor: '#d1d5db',
  },
  googleLogo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleText: {
    fontSize: 16,
  },
  googleTextDark: {
    color: '#fff',
  },
  googleTextLight: {
    color: '#000',
  },
  registerRow: {
    fontSize: 14,
    marginTop: 32,
    textAlign: 'center',
  },
  registerRowDark: {
    color: '#9ca3af',
  },
  registerRowLight: {
    color: '#6b7280',
  },
  registerLink: {
    color: '#22c55e',
    marginLeft: 4,
    textDecorationLine: 'underline',
  },
});