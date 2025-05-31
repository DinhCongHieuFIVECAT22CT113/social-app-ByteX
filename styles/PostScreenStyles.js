import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  containerLight: {
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 16,
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#22c55e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginLeft: 8,
    flex: 1,
  },
  headerTitleDark: {
    color: '#fff',
  },
  headerPostBtn: {
    marginLeft: 'auto',
    backgroundColor: '#22c55e',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
  },
  headerPostBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.3)',
    marginBottom: 16,
  },
  dividerDark: {
    borderColor: 'rgba(255,255,255,0.2)',
  },
  userRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#22c55e',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000',
    marginBottom: 8,
  },
  userOptionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  userOptionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e5e7eb',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 4,
  },
  userOptionText: {
    fontSize: 12,
    color: '#000',
    marginLeft: 4,
  },
  userTimeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e5e7eb',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 4,
  },
  userTimeText: {
    fontSize: 12,
    color: '#000',
    marginLeft: 4,
  },
  postInput: {
    marginTop: 12,
    fontSize: 18,
    color: '#000',
    fontWeight: '400',
  },
  groupBtn: {
    marginBottom: 24,
  },
  groupBtnItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#22c55e',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 12,
  },
  groupBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 8,
  },
  likeCommentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  likeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  likeText: {
    marginLeft: 4,
    color: '#2563eb',
  },
  commentIcon: {
    marginRight: 4,
  },
  commentText: {
    color: '#22c55e',
    marginLeft: 4,
  },
  commentInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  sendBtn: {
    marginLeft: 8,
    backgroundColor: '#22c55e',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
  },
  sendBtnText: {
    color: '#fff',
    fontSize: 14,
  },
  commentItem: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
  },
  commentItemDark: {
    backgroundColor: '#1f1f1f',
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  commentInfo: {
    flex: 1,
  },
  commentUser: {
    fontWeight: '600',
    marginBottom: 4,
    color: '#111827',
  },
  commentUserDark: {
    color: '#f3f4f6',
  },
  commentContent: {
    color: '#374151',
    lineHeight: 20,
  },
  commentContentDark: {
    color: '#d1d5db',
  },
  commentsSection: {
    marginTop: 16,
  },
  commentsSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#111827',
  },
  commentsSectionTitleDark: {
    color: '#f3f4f6',
  },
  noCommentsText: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#6b7280',
    fontStyle: 'italic',
  },
  noCommentsTextDark: {
    color: '#9ca3af',
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    color: '#111827',
  },
  commentInputDark: {
    backgroundColor: '#1f1f1f',
    color: '#f3f4f6',
  },
  sendBtnDisabled: {
    opacity: 0.5,
  },
  
  // Estilos para la vista de detalle de post
  postDetailContainer: {
    marginBottom: 16,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  authorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#22c55e',
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  authorNameDark: {
    color: '#f3f4f6',
  },
  postTime: {
    fontSize: 12,
    color: '#6b7280',
  },
  postContent: {
    fontSize: 16,
    color: '#111827',
    marginBottom: 12,
    lineHeight: 22,
  },
  postContentDark: {
    color: '#f3f4f6',
  },
  postImage: {
    width: '100%',
    height: width * 0.8,
    borderRadius: 12,
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 6,
  },
  statTextDark: {
    color: '#9ca3af',
  },
  interactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  interactionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  interactionBtnActive: {
    backgroundColor: 'rgba(225, 29, 72, 0.1)',
  },
  interactionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginLeft: 8,
  },
  interactionTextDark: {
    color: '#f3f4f6',
  },
  interactionTextActive: {
    color: '#e11d48',
  },
  backButton: {
    backgroundColor: '#22c55e',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  userNameDark: {
    color: '#f3f4f6',
  },
  userOptionBtnDark: {
    backgroundColor: '#1f1f1f',
  },
  userOptionTextDark: {
    color: '#f3f4f6',
  },
  userTimeBtnDark: {
    backgroundColor: '#1f1f1f',
  },
  userTimeTextDark: {
    color: '#f3f4f6',
  },
  postInputDark: {
    color: '#f3f4f6',
    backgroundColor: '#1f1f1f',
  },
  actionTextDark: {
    color: '#fff',
  },
});