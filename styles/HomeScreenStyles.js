import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#f9fafb',
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  card: {
    marginTop: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    padding: 16,
    marginHorizontal: 4,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  cardDark: {
    backgroundColor: '#1f1f1f',
    shadowColor: '#000',
    shadowOpacity: 0.2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#22c55e',
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
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
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
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderColor: '#22c55e',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
  },
  followBtnDark: {
    borderColor: '#22c55e',
    backgroundColor: 'rgba(34, 197, 94, 0.15)',
  },
  followBtnText: {
    fontSize: 12,
    color: '#22c55e',
    fontWeight: '500',
  },
  followBtnTextDark: {
    color: '#22c55e',
  },
  postImage: {
    marginTop: 12,
    borderRadius: 12,
    width: '100%',
    height: width * 0.6,
    backgroundColor: '#f3f4f6',
  },
  content: {
    marginTop: 12,
    marginBottom: 4,
    fontSize: 14,
    lineHeight: 20,
    color: '#374151',
  },
  contentDark: {
    color: '#d1d5db',
  },
  actionsRow: {
    flexDirection: 'row',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  actionText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#4b5563',
    fontWeight: '500',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: 12,
    marginBottom: 16,
    borderColor: '#e5e7eb',
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
    marginRight: 12,
  },
  headerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  headerNameDark: {
    color: '#f3f4f6',
  },
  headerEmail: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  headerEmailDark: {
    color: '#9ca3af',
  },
  headerIcon: {
    fontSize: 22,
    color: '#374151',
    fontWeight: 'bold',
  },
  headerIconDark: {
    color: '#d1d5db',
  },
  shareRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  shareBtn: {
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f3f4f6',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  shareBtnDark: {
    backgroundColor: '#1f1f1f',
    borderColor: '#374151',
  },
  shareBtnText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  shareBtnTextDark: {
    color: '#9ca3af',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  emptyButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
  },
  emptyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});