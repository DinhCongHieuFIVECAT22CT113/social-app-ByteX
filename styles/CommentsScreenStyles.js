import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f9fafb',
    paddingVertical: 12,
  },
  rootDark: {
    backgroundColor: '#121212',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    margin: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardDark: {
    backgroundColor: '#1f1f1f',
    shadowColor: '#000',
    shadowOpacity: 0.2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    padding: 10,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#e5e7eb',
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#22c55e',
  },
  author: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  authorDark: {
    color: '#f3f4f6',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  timeText: {
    fontSize: 12,
    color: '#6b7280',
  },
  timeTextDark: {
    color: '#d1d5db',
  },
  mainImg: {
    width: '100%',
    height: width * 0.6,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: '#f3f4f6',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  green400: { 
    color: '#4ade80',
    fontWeight: '600',
  },
  green600: { 
    color: '#22c55e',
    fontWeight: '600',
  },
  gray200: { color: '#e5e7eb' },
  black: { color: '#111827' },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 12,
    borderRadius: 1,
  },
  dividerDark: {
    backgroundColor: '#374151',
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    gap: 8,
  },
  btn: {
    flex: 1,
    backgroundColor: '#22c55e',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  btnWide: {
    flex: 2,
  },
  btnLabel: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 4,
  },
  list: {
    marginTop: 16,
    marginBottom: 8,
  },
  commentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  commentBubble: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    maxWidth: '85%',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  commentBubbleDark: {
    backgroundColor: '#2a2a2a',
  },
  commentText: {
    fontSize: 15,
    color: '#111827',
    lineHeight: 20,
  },
  commentTextDark: {
    color: '#f3f4f6',
  },
  commentAuthor: {
    fontSize: 13,
    fontWeight: '600',
    color: '#22c55e',
    marginBottom: 4,
  },
  commentAuthorDark: {
    color: '#4ade80',
  },
  commentTime: {
    fontSize: 11,
    color: '#9ca3af',
    marginTop: 4,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  commentInputDark: {
    borderColor: '#374151',
    backgroundColor: '#2a2a2a',
    color: '#fff',
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: '#22c55e',
    borderRadius: 24,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  errorText: {
    color: '#ef4444',
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
  },
});