import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  root: {
    flex: 1,
    padding: 16,
  },
  rootDark: {
    backgroundColor: '#18181b',
  },
  rootLight: {
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  headerBtn: {
    backgroundColor: '#22c55e',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#18181b',
  },
  headerTitleDark: {
    color: '#fff',
  },
  headerIconBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIconBtnDark: {
    borderColor: '#374151',
  },
  headerIconBtnLight: {
    borderColor: '#d1d5db',
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileAvatarBorder: {
    borderRadius: 999,
    borderWidth: 2,
    borderColor: '#22c55e',
    padding: 2,
    marginBottom: 12,
  },
  profileAvatar: {
    width: 112,
    height: 112,
    borderRadius: 56,
  },
  profileName: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 4,
    color: '#18181b',
  },
  profileNameDark: {
    color: '#fff',
  },
  profileEmail: {
    fontSize: 14,
    color: '#9ca3af',
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  chatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
  },
  chatBtnDark: {
    borderColor: '#374151',
  },
  chatBtnLight: {
    borderColor: '#d1d5db',
  },
  chatBtnText: {
    fontSize: 14,
    marginLeft: 8,
    color: '#374151',
  },
  chatBtnTextDark: {
    color: '#e5e7eb',
  },
  followBtn: {
    backgroundColor: '#22c55e',
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  followBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 16,
    marginHorizontal: 4,
  },
  statBoxDark: {
    borderColor: '#374151',
  },
  statBoxLight: {
    borderColor: '#e5e7eb',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: '#18181b',
  },
  statNumberDark: {
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: '#9ca3af',
  },
  divider: {
    borderBottomWidth: 1,
    marginBottom: 24,
  },
  dividerDark: {
    borderColor: '#374151',
  },
  dividerLight: {
    borderColor: '#e5e7eb',
  },
  galleryRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  galleryImage: {
    width: 96,
    height: 112,
    borderRadius: 12,
    marginRight: 12,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  logoutBtnDark: {
    backgroundColor: '#27272a',
    borderColor: '#374151',
  },
  logoutBtnText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ef4444',
  },
  logoutBtnTextDark: {
    color: '#f87171',
  },
});