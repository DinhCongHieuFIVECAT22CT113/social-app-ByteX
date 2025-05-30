import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  containerDark: {
    backgroundColor: '#18181b',
  },
  card: {
    marginTop: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    padding: 16,
    marginHorizontal: 8,
    backgroundColor: '#fff',
  },
  cardDark: {
    backgroundColor: '#1f2937',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarStatus: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    backgroundColor: '#22c55e',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 6,
  },
  author: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  authorDark: {
    color: '#f3f4f6',
  },
  time: {
    fontSize: 12,
    color: '#6b7280',
  },
  timeDark: {
    color: '#9ca3af',
  },
  followBtn: {
    marginLeft: 'auto',
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderColor: '#d1d5db',
  },
  followBtnDark: {
    borderColor: '#374151',
  },
  followBtnText: {
    fontSize: 12,
    color: '#111827',
  },
  followBtnTextDark: {
    color: '#f3f4f6',
  },
  postImage: {
    marginTop: 16,
    borderRadius: 12,
    width: '100%',
    height: 256,
  },
  content: {
    marginTop: 16,
    fontSize: 12,
    lineHeight: 16,
    color: '#6b7280',
  },
  contentDark: {
    color: '#9ca3af',
  },
  actionsRow: {
    flexDirection: 'row',
    marginTop: 16,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  actionText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#111827',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 16,
    borderColor: '#d1d5db',
  },
  headerDark: {
    borderColor: '#374151',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#22c55e',
    marginRight: 8,
  },
  headerName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  headerNameDark: {
    color: '#f3f4f6',
  },
  headerEmail: {
    fontSize: 12,
    color: '#6b7280',
  },
  headerEmailDark: {
    color: '#9ca3af',
  },
  headerIcon: {
    fontSize: 20,
    color: '#374151',
  },
  headerIconDark: {
    color: '#d1d5db',
  },
  shareRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  shareBtn: {
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#e5e7eb',
  },
  shareBtnDark: {
    backgroundColor: '#374151',
  },
  shareBtnText: {
    fontSize: 12,
    color: '#111827',
  },
  shareBtnTextDark: {
    color: '#f3f4f6',
  },
});