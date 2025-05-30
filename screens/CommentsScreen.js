import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, useColorScheme, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/CommentsScreenStyles';
import { getComments, addComment, listenComments } from '../services/CommentService';
import { auth } from '../config/firebaseConfig';

export default function CommentsScreen({ route }) {
  const navigation = useNavigation();
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
      const user = auth.currentUser;
      if (!user) {
        setError('Bạn cần đăng nhập để bình luận');
        return;
      }
      
      await addComment(postId, { 
        userId: user.uid, 
        text: commentText,
        displayName: user.displayName || 'Người dùng ByteX',
        avatar: user.photoURL
      });
      setCommentText('');
    } catch (e) {
      setError('Không thể gửi bình luận.');
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  // TODO: Lấy thông tin post thực từ backend (ảnh, author, thời gian, số like/comment)
  // Hiện tại vẫn còn hardcode, cần truyền dữ liệu thực vào các props bên dưới

  return (
    <ScrollView style={[styles.root, isDark && styles.rootDark]}>
      <View style={[styles.card, isDark && styles.cardDark]}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <FontAwesomeIcon icon={faArrowLeft} size={16} color={isDark ? '#fff' : '#000'} />
          </TouchableOpacity>
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
              <Image
                source={{ uri: cmt.avatar || 'https://storage.googleapis.com/a1aa/image/22e34a68-d06c-44a0-36e7-7f85ed804684.jpg' }}
                style={styles.commentAvatar}
                onError={(e) => {
                  console.log("Error loading comment avatar:", e.nativeEvent.error);
                }}
              />
              <View style={[styles.commentBubble, isDark && styles.commentBubbleDark]}>
                {cmt.displayName && (
                  <Text style={[styles.commentAuthor, isDark && styles.commentAuthorDark]}>
                    {cmt.displayName}
                  </Text>
                )}
                <Text style={[styles.commentText, isDark && styles.commentTextDark]}>
                  {cmt.text}
                </Text>
                {cmt.createdAt && (
                  <Text style={styles.commentTime}>
                    {new Date(cmt.createdAt).toLocaleString()}
                  </Text>
                )}
              </View>
            </View>
          ))}
          
          {comments.length === 0 && (
            <View style={{ alignItems: 'center', marginVertical: 20 }}>
              <Text style={{ color: isDark ? '#9ca3af' : '#6b7280', fontSize: 14 }}>
                Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
              </Text>
            </View>
          )}
        </View>
        
        {/* Add comment input */}
        <View style={styles.commentInputContainer}>
          <TextInput
            style={[
              styles.commentInput,
              isDark && styles.commentInputDark
            ]}
            value={commentText}
            onChangeText={setCommentText}
            placeholder="Nhập bình luận..."
            placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
            multiline
          />
          <TouchableOpacity 
            onPress={handleAddComment} 
            style={styles.sendButton}
            disabled={!commentText.trim()}
          >
            <Text style={styles.sendButtonText}>Gửi</Text>
          </TouchableOpacity>
        </View>
        
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
    </ScrollView>
  );
}

