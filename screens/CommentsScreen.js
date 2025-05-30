import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, useColorScheme, TextInput } from 'react-native';
import styles from '../styles/CommentsScreenStyles';
import { getComments, addComment, listenComments } from '../services/CommentService';

export default function CommentsScreen({ route }) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const postId = route?.params?.postId;
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!postId) return;
    setError('');
    // Lắng nghe comment realtime
    const unsubscribe = listenComments(
      postId,
      (data) => setComments(data),
      (err) => {
        if (err.code === 'unavailable') setError('Không có kết nối mạng!');
        else setError('Lỗi khi tải bình luận!');
      }
    );
    return () => unsubscribe && unsubscribe();
  }, [postId]);

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    try {
      // TODO: Lấy userId, avatar, displayName thực từ context/auth
      await addComment(postId, { userId: 'testUser', text: commentText });
      setCommentText('');
    } catch (e) {
      setError('Không thể gửi bình luận.');
    }
  };

  // TODO: Lấy thông tin post thực từ backend (ảnh, author, thời gian, số like/comment)
  // Hiện tại vẫn còn hardcode, cần truyền dữ liệu thực vào các props bên dưới

  return (
    <ScrollView style={[styles.root, isDark && styles.rootDark]}>
      <View style={[styles.card, isDark && styles.cardDark]}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={styles.avatar} />
          <View>
            <Text style={[styles.author, isDark && styles.authorDark]}>Tên Tài Khoản</Text>
            <View style={styles.timeRow}>
              <Text style={[styles.timeText, isDark && styles.timeTextDark]}>Thời gian đăng</Text>
            </View>
          </View>
        </View>
        {/* Image */}
        <Image
          source={{ uri: 'https://storage.googleapis.com/a1aa/image/67c7c8ae-8b93-420a-1a52-62d4ef5fc981.jpg' }}
          style={styles.mainImg}
        />
        {/* Likes, comments, shares */}
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={isDark ? styles.green400 : styles.green600}>56</Text>
          </View>
          <View style={[styles.stat, styles.statCenter]}>
            <Text style={isDark ? styles.gray200 : styles.black}>{comments.length} Bình luận</Text>
          </View>
          <View style={styles.stat}>
            <Text style={isDark ? styles.green400 : styles.green600}>56</Text>
          </View>
        </View>
        <View style={[styles.divider, isDark && styles.dividerDark]} />
        {/* Buttons */}
        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnLabel}>Thích</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.btnWide]}>
            <Text style={styles.btnLabel}>Bình luận</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnLabel}>Chia sẻ</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.divider, isDark && styles.dividerDark]} />
        {/* Comments */}
        <View style={styles.list}>
          {comments.map((cmt, idx) => (
            <View key={idx} style={styles.commentRow}>
              {/* TODO: Lấy avatar thực từ cmt.avatar nếu có */}
              <Image
                source={{ uri: cmt.avatar || 'https://storage.googleapis.com/a1aa/image/22e34a68-d06c-44a0-36e7-7f85ed804684.jpg' }}
                style={styles.commentAvatar}
              />
              <View style={[styles.commentBubble, isDark && styles.commentBubbleDark]}>
                {/* TODO: Lấy tên thực từ cmt.displayName nếu có */}
                <Text style={[styles.commentText, isDark && styles.commentTextDark]}>
                  {cmt.text}
                </Text>
              </View>
            </View>
          ))}
        </View>
        {/* Add comment input */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
          <TextInput
            style={{ flex: 1, borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, padding: 8, color: isDark ? '#fff' : '#000', backgroundColor: isDark ? '#232326' : '#fff' }}
            value={commentText}
            onChangeText={setCommentText}
            placeholder="Nhập bình luận..."
            placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
          />
          <TouchableOpacity onPress={handleAddComment} style={{ marginLeft: 8, backgroundColor: '#22c55e', borderRadius: 8, padding: 10 }}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Gửi</Text>
          </TouchableOpacity>
        </View>
        {error ? <Text style={{ color: 'red', marginTop: 8 }}>{error}</Text> : null}
      </View>
    </ScrollView>
  );
}

