import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#fff',
  },
  avatarWrapper: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
    backgroundColor: '#e5e7eb',
  },
  changeAvatarText: {
    color: '#22c55e',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 8,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#d1d5db',
    marginVertical: 8,
    fontSize: 16,
    paddingVertical: 6,
    paddingHorizontal: 0,
    color: '#111827',
  },
  saveBtn: {
    marginTop: 24,
    backgroundColor: '#22c55e',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});