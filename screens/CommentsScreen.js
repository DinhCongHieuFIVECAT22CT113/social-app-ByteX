import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, Alert, Vibration } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faThumbsUp, faComment, faShare } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/CommentsScreenStyles';
import { getComments, addComment, listenComments } from '../services/CommentService';
import { likePost, unlikePost, hasUserLiked, getLikes, listenLikes } from '../services/PostInteractionService';
import { toggleShare, hasUserShared } from '../services/ShareService';
import { getPostById } from '../services/PostService';
import { auth } from '../config/firebaseConfig';
// import LikeButton from '../components/LikeButton';

export default function CommentsScreen({ route }) {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  const isDark = isDarkMode;
  const postId = route?.params?.postId;
  const [post, setPost] = useState(null); // Thông tin bài viết
  const [comments, setComments] = useState([]); // Danh sách bình luận của bài viết
  const [commentText, setCommentText] = useState(''); // Nội dung bình luận người dùng nhập
  const [error, setError] = useState(''); // Thông báo lỗi (nếu có)
  const [likes, setLikes] = useState([]); // Danh sách like của bài viết
  const [liked, setLiked] = useState(false); // Trạng thái đã like hay chưa
  const [shared, setShared] = useState(false); // Trạng thái đã share hay chưa
  const [currentUser, setCurrentUser] = useState(null); // Thông tin người dùng hiện tại

  // Lấy thông tin người dùng hiện tại
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setCurrentUser({
        uid: user.uid,
        displayName: user.displayName || 'Người dùng ByteX',
        email: user.email || '',
        photoURL: user.photoURL
      });
    }
  }, []);

  // Lấy thông tin bài viết
  useEffect(() => {
    if (!postId) return;
    
    const fetchPostData = async () => {
      try {
        const postData = await getPostById(postId);
        setPost(postData);
      } catch (error) {
        console.error("Error fetching post:", error);
        setError('Không thể tải thông tin bài viết');
      }
    };
    
    fetchPostData();
  }, [postId]);

  // Lắng nghe comment realtime
  useEffect(() => {
    if (!postId) return;
    setError('');
    
    const unsubscribe = listenComments(
      postId,
      (data) => setComments(data),
      (err) => {
        if (err && err.code === 'unavailable') setError('Không có kết nối mạng!');
        else if (err) setError('Lỗi khi tải bình luận!');
      }
    );
    
    return () => unsubscribe && unsubscribe();
  }, [postId]);
  
  // Lắng nghe likes realtime
  useEffect(() => {
    if (!postId) return;
    
    const unsubscribe = listenLikes(
      postId,
      (data) => {
        setLikes(data);
        // Kiểm tra xem người dùng hiện tại đã like chưa
        if (currentUser) {
          const userLiked = data.some(like => like.userId === currentUser.uid);
          setLiked(userLiked);
        }
      }
    );
    
    return () => unsubscribe && unsubscribe();
  }, [postId, currentUser]);

  // Kiểm tra trạng thái share
  useEffect(() => {
    if (!postId || !currentUser) return;

    const checkShared = async () => {
      try {
        const isShared = await hasUserShared(postId, currentUser.uid);
        setShared(isShared);
      } catch (error) {
        console.error("Error checking share status:", error);
      }
    };

    checkShared();
  }, [postId, currentUser]);

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
        avatar: user.photoURL || null,
        createdAt: Date.now()
      });
      setCommentText('');
    } catch (e) {
      console.error("Error adding comment:", e);
      setError('Không thể gửi bình luận.');
    }
  };
  
  // Xử lý like/unlike
  const handleToggleLike = async () => {
    if (!currentUser) {
      Alert.alert('Lỗi', 'Bạn cần đăng nhập để thích bài viết!');
      return;
    }
    
    try {
      Vibration.vibrate(100); // Rung khi nhấn like
      
      if (liked) {
        await unlikePost(postId, currentUser.uid);
      } else {
        await likePost(postId, currentUser.uid);
      }
      
      // Không cần cập nhật state vì đã có listener realtime
    } catch (error) {
      console.error("Error toggling like:", error);
      Alert.alert('Lỗi', 'Không thể cập nhật like.');
    }
  };

  // Xử lý share/unshare
  const handleToggleShare = async () => {
    if (!currentUser) {
      Alert.alert('Lỗi', 'Bạn cần đăng nhập để chia sẻ bài viết!');
      return;
    }

    try {
      Vibration.vibrate(50); // Rung khi nhấn share

      // Cập nhật tạm thời UI
      setShared(!shared);

      // Gọi API toggle share
      const result = await toggleShare(postId, currentUser.uid, post?.userId);
      console.log(`Share ${result.action} successfully`);

      // Hiển thị thông báo
      Alert.alert(
        "Thành công",
        result.action === 'shared' ? "Đã chia sẻ bài viết về trang cá nhân" : "Đã hủy chia sẻ bài viết",
        [{ text: "OK" }]
      );

    } catch (error) {
      console.error("Error toggling share:", error);

      // Rollback UI nếu có lỗi
      setShared(shared);

      Alert.alert("Lỗi", error.message || "Không thể thực hiện hành động này. Vui lòng thử lại.");
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
          <Image
            source={{
              uri: post?.avatar || post?.photoURL || 'https://storage.googleapis.com/a1aa/image/e816601d-411b-4b99-9acc-6a92ee01e37a.jpg'
            }}
            style={styles.avatar}
          />
          <View>
            <Text style={[styles.author, isDark && styles.authorDark]}>
              {post?.displayName || post?.author || 'Người dùng ByteX'}
            </Text>
            <View style={styles.timeRow}>
              <Text style={[styles.timeText, isDark && styles.timeTextDark]}>
                {post?.createdAt ? new Date(post.createdAt).toLocaleString('vi-VN') : 'Đang tải...'}
              </Text>
            </View>
          </View>
        </View>
        {/* Image */}
        {post?.image && (
          <Image
            source={{ uri: post.image }}
            style={styles.mainImg}
          />
        )}

        {/* Post Content */}
        {post?.content && (
          <View style={{ padding: 16 }}>
            <Text style={[{ fontSize: 16 }, isDark && { color: '#fff' }]}>
              {post.content}
            </Text>
          </View>
        )}
        {/* Likes, comments, shares */}
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={isDark ? styles.green400 : styles.green600}>{likes.length} Lượt thích</Text>
          </View>
          <View style={[styles.stat, styles.statCenter]}>
            <Text style={isDark ? styles.gray200 : styles.black}>{comments.length} Bình luận</Text>
          </View>
          <View style={styles.stat}>
            <Text style={isDark ? styles.green400 : styles.green600}>{post?.shares || 0} Chia sẻ</Text>
          </View>
        </View>
        <View style={[styles.divider, isDark && styles.dividerDark]} />
        {/* Buttons */}
        <View style={styles.btnRow}>
          <TouchableOpacity 
            style={[styles.btn, liked && styles.btnActive]} 
            onPress={handleToggleLike}
          >
            <FontAwesomeIcon 
              icon={faThumbsUp} 
              size={16} 
              color={liked ? '#e11d48' : isDark ? '#fff' : '#000'} 
            />
            <Text style={[styles.btnLabel, liked && styles.btnLabelActive]}>
              {liked ? 'Đã thích' : 'Thích'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.btnWide]}>
            <FontAwesomeIcon 
              icon={faComment} 
              size={16} 
              color={isDark ? '#fff' : '#000'} 
            />
            <Text style={styles.btnLabel}>Bình luận</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, shared && styles.btnActive]}
            onPress={handleToggleShare}
          >
            <FontAwesomeIcon
              icon={faShare}
              size={16}
              color={shared ? '#22c55e' : isDark ? '#fff' : '#000'}
            />
            <Text style={[styles.btnLabel, shared && { color: '#22c55e' }]}>
              {shared ? 'Đã chia sẻ' : 'Chia sẻ'}
            </Text>
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

