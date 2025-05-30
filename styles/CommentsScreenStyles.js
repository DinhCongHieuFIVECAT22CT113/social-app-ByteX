import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 24,
  },
  rootDark: {
    backgroundColor: '#18181b',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    margin: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  cardDark: {
    backgroundColor: '#232326',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e5e7eb',
    marginRight: 12,
  },
  author: {
    fontWeight: '600',
    color: '#000',
    fontSize: 16,
  },
  authorDark: {
    color: '#fff',
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
    height: 240,
    borderRadius: 12,
    marginBottom: 16,
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
  },
  green400: { color: '#4ade80' },
  green600: { color: '#22c55e' },
  gray200: { color: '#e5e7eb' },
  black: { color: '#000' },
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
    paddingVertical: 8,
    alignItems: 'center',
    marginHorizontal: 2,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnWide: {
    flex: 2,
  },
  btnLabel: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 4,
  },
  list: {
    marginTop: 12,
  },
  commentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  commentBubble: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    maxWidth: 320,
  },
  commentBubbleDark: {
    backgroundColor: '#374151',
  },
  commentText: {
    fontSize: 15,
    color: '#000',
  },
  commentTextDark: {
    color: '#fff',
  },
});