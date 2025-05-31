import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert, Image, Vibration, FlatList, ActivityIndicator } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  faArrowLeft,
  faUserFriends,
  faClock,
  faCamera,
  faUserPlus,
  faSmile,
  faMapMarkerAlt,
  faVideo,
  faTh,
  faThumbsUp,
  faCommentDots,
} from '@fortawesome/free-solid-svg-icons';
import { addComment, getComments } from '../services/CommentService';
import * as ImagePicker from 'expo-image-picker';
import ImageService from '../services/ImageService';
import { addPost, getPostById } from '../services/PostService';
import { auth } from '../config/firebaseConfig';
import styles from '../styles/PostScreenStyles';
// import LikeButton from '../components/LikeButton';
import { likePost, unlikePost, hasUserLiked, getLikes, listenLikes } from '../services/PostInteractionService';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

// PostScreen.js
// Màn hình chi tiết bài viết, cho phép like, comment, hiển thị thông tin bài viết

export default function PostScreen({ route }) {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // Lấy postId từ route.params
  const postId = route?.params?.postId || 'testPostId';
  // Lấy userId từ Firebase Auth
  const [userId, setUserId] = useState('');
  
  // Lấy thông tin người dùng hiện tại khi component mount
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserId(user.uid);
    }
  }, []);

  const [commentText, setCommentText] = useState('');
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  // Thêm khai báo useState cho caption và image
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  
  // Lấy thông tin bài viết
  useEffect(() => {
    const fetchPostData = async () => {
      if (postId === 'testPostId') {
        setLoading(false);
        return;
      }
      
      try {
        const postData = await getPostById(postId);
        setPost(postData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post:", error);
        setLoading(false);
      }
    };
    
    fetchPostData();
  }, [postId]);

  // Lấy danh sách like/comment khi cần
  const fetchLikes = async () => {
    const data = await getLikes(postId);
    setLikes(data);
  };

  const fetchComments = async () => {
    const data = await getComments(postId);
    setComments(data);
  };

  // Kiểm tra đã like chưa khi load post và lắng nghe thay đổi likes
  useEffect(() => {
    if (!postId || !userId || postId === 'testPostId') return;
    
    // Kiểm tra trạng thái like ban đầu
    const checkInitialLikeStatus = async () => {
      try {
        const hasLiked = await hasUserLiked(postId, userId);
        setLiked(hasLiked);
      } catch (error) {
        console.error("Error checking initial like status:", error);
      }
    };
    
    checkInitialLikeStatus();
    
    // Lắng nghe thay đổi likes realtime
    const unsubscribe = listenLikes(postId, (newLikes) => {
      setLikes(newLikes);
      // Kiểm tra lại trạng thái like của user hiện tại
      const userLiked = newLikes.some(like => like.userId === userId);
      setLiked(userLiked);
    });
    
    // Lấy lại danh sách bình luận
    fetchComments();
    
    return () => unsubscribe();
  }, [postId, userId]);

  // Gọi khi bấm Like
  const handleToggleLike = async () => {
    if (!userId) {
      Alert.alert('Lỗi', 'Bạn cần đăng nhập để thích bài viết!');
      return;
    }
    
    try {
      Vibration.vibrate(100); // Rung khi nhấn like
      
      if (liked) {
        await unlikePost(postId, userId);
      } else {
        await likePost(postId, userId);
      }
      
      // Không cần gọi getLikes và setLiked ở đây nữa
      // vì đã có listener realtime ở trên sẽ tự cập nhật
    } catch (error) {
      console.error("Error toggling like:", error);
      Alert.alert('Lỗi', 'Không thể cập nhật like.');
    }
  };

  // Gọi khi gửi comment
  const handleAddComment = async () => {
    try {
      if (!commentText.trim()) {
        Alert.alert('Lỗi', 'Vui lòng nhập nội dung bình luận!');
        return;
      }
      
      if (!userId) {
        Alert.alert('Lỗi', 'Bạn cần đăng nhập để bình luận!');
        return;
      }
      
      // Lấy thông tin người dùng hiện tại
      const user = auth.currentUser;
      
      // Hiệu ứng rung nhẹ khi gửi comment
      Vibration.vibrate(50);
      
      await addComment(postId, { 
        userId, 
        text: commentText,
        displayName: user?.displayName || 'Người dùng ByteX',
        avatar: user?.photoURL || null,
        createdAt: Date.now()
      });
      
      setCommentText('');
      fetchComments();
    } catch (error) {
      console.error("Error adding comment:", error);
      Alert.alert('Lỗi', 'Không thể thêm bình luận. Vui lòng thử lại sau.');
    }
  };

  // Chọn ảnh từ thư viện
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Lỗi", "Không thể chọn ảnh. Vui lòng thử lại sau.");
    }
  };

  // Đăng bài
  const handlePost = async () => {
    if (!caption.trim() && !image) {
      Alert.alert('Lỗi', 'Vui lòng nhập nội dung hoặc chọn ảnh!');
      return;
    }
    
    let imageUrl = '';
    try {
      // Lấy thông tin người dùng hiện tại từ Firebase Auth
      const user = auth.currentUser;
      if (!user) {
        Alert.alert('Lỗi', 'Bạn cần đăng nhập để đăng bài!');
        navigation.navigate('Login');
        return;
      }
      
      // Upload ảnh nếu có
      if (image) {
        imageUrl = await ImageService.uploadImageAsync(image, `posts/${Date.now()}.jpg`);
      }
      
      // Tạo bài viết mới với đầy đủ thông tin
      await addPost({
        author: user.displayName || 'Người dùng ByteX',
        userId: user.uid,
        caption,
        content: caption, // Thêm trường content để tương thích với HomeScreen
        image: imageUrl,
        createdAt: Date.now(),
        avatar: user.photoURL || null, // Thêm avatar người đăng
        displayName: user.displayName || 'Người dùng ByteX', // Thêm tên hiển thị
        email: user.email || '', // Thêm email người đăng
      });
      
      // Reset form và thông báo thành công
      setCaption('');
      setImage(null);
      Alert.alert('Thành công', 'Đăng bài thành công!');
      
      // Quay lại màn hình trước đó
      if (navigation) navigation.goBack();
    } catch (e) {
      console.error('Error posting:', e);
      Alert.alert('Lỗi', 'Đăng bài thất bại! ' + e.message);
    }
  };

  // Hiển thị loading khi đang tải dữ liệu
  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#22c55e" />
        <Text style={{ marginTop: 10, color: isDark ? '#fff' : '#000' }}>Đang tải bài viết...</Text>
      </View>
    );
  }
  
  // Hiển thị thông báo nếu không tìm thấy bài viết
  if (!post && postId !== 'testPostId') {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', padding: 20 }]}>
        <Text style={{ fontSize: 18, color: isDark ? '#fff' : '#000', textAlign: 'center' }}>
          Không tìm thấy bài viết hoặc bài viết đã bị xóa
        </Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Quay lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Định dạng thời gian đăng bài
  const formatPostTime = (timestamp) => {
    if (!timestamp) return '';
    try {
      return formatDistanceToNow(new Date(timestamp), { 
        addSuffix: true,
        locale: vi
      });
    } catch (error) {
      return '';
    }
  };

  return (
    <ScrollView style={[styles.container, isDark ? styles.containerDark : styles.containerLight]}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faArrowLeft} size={16} color={isDark ? '#fff' : '#000'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isDark && styles.headerTitleDark]}>
          {postId === 'testPostId' ? 'Tạo bài viết' : 'Chi tiết bài viết'}
        </Text>
        {postId === 'testPostId' && (
          <TouchableOpacity style={styles.headerPostBtn} onPress={handlePost}>
            <Text style={styles.headerPostBtnText}>Đăng bài</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.divider} />

      {/* User info and post input */}
      <View style={styles.userRow}>
        <View style={styles.userAvatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Tên Tài Khoản</Text>
          <View style={styles.userOptionsRow}>
            <TouchableOpacity style={styles.userOptionBtn}>
              <FontAwesomeIcon icon={faUserFriends} size={12} color="black" />
              <Text style={styles.userOptionText}>Bạn bè</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.userOptionBtn}>
              <Text style={styles.userOptionText}>+ Album</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.userTimeBtn}>
            <FontAwesomeIcon icon={faClock} size={12} color="black" />
            <Text style={styles.userTimeText}>Thời gian đăng</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.postInput}
            placeholder="Bạn đang nghĩ gì ..." // Gợi ý nhập caption bài viết
            value={caption} // Giá trị caption hiện tại
            onChangeText={setCaption} // Cập nhật caption khi người dùng nhập
            multiline // Cho phép nhập nhiều dòng
          />
          {/* Hiển thị ảnh đã chọn nếu có */}
          {image && (
            <Image 
              source={{ uri: image }} // Nguồn ảnh từ uri đã chọn
              style={{ width: '100%', height: 200, borderRadius: 12, marginTop: 12 }} // Style ảnh xem trước
            />
          )}
        </View>
      </View>

      <View style={styles.divider} />

      {/* Buttons group */}
      <View style={styles.groupBtn}>
        <TouchableOpacity style={styles.groupBtnItem} onPress={pickImage}>
          <FontAwesomeIcon icon={faCamera} size={14} color="white" />
          <Text style={styles.groupBtnText}>Ảnh/Video</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.groupBtnItem}>
          <FontAwesomeIcon icon={faUserPlus} size={14} color="white" />
          <Text style={styles.groupBtnText}>Gắn thẻ người khác</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.groupBtnItem}>
          <FontAwesomeIcon icon={faSmile} size={14} color="white" />
          <Text style={styles.groupBtnText}>Cảm xúc/hoạt động</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.groupBtnItem}>
          <FontAwesomeIcon icon={faMapMarkerAlt} size={14} color="white" />
          <Text style={styles.groupBtnText}>Checkin</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.groupBtnItem}>
          <FontAwesomeIcon icon={faVideo} size={14} color="white" />
          <Text style={styles.groupBtnText}>Video trực tiếp</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.groupBtnItem}>
          <FontAwesomeIcon icon={faTh} size={14} color="white" />
          <Text style={styles.groupBtnText}>Màu nền</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.groupBtnItem}>
          <FontAwesomeIcon icon={faCamera} size={14} color="white" />
          <Text style={styles.groupBtnText}>Camera</Text>
        </TouchableOpacity>
      </View>

      {/* Khu vực bình luận */}
      {postId !== 'testPostId' && (
        <View style={styles.commentsSection}>
          <Text style={[styles.commentsSectionTitle, isDark && styles.commentsSectionTitleDark]}>
            Bình luận ({comments.length})
          </Text>
          
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <View key={comment.id || index} style={[styles.commentItem, isDark && styles.commentItemDark]}>
                <View style={styles.commentHeader}>
                  <Image 
                    source={{ 
                      uri: comment.avatar || 'https://storage.googleapis.com/a1aa/image/e816601d-411b-4b99-9acc-6a92ee01e37a.jpg' 
                    }} 
                    style={styles.commentAvatar} 
                  />
                  <View style={styles.commentInfo}>
                    <Text style={[styles.commentUser, isDark && styles.commentUserDark]}>
                      {comment.displayName || 'Người dùng ByteX'}
                    </Text>
                    <Text style={[styles.commentContent, isDark && styles.commentContentDark]}>
                      {comment.text}
                    </Text>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <Text style={[styles.noCommentsText, isDark && styles.noCommentsTextDark]}>
              Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
            </Text>
          )}
          
          {/* Form nhập bình luận */}
          <View style={styles.commentInputContainer}>
            <TextInput
              style={[styles.commentInput, isDark && styles.commentInputDark]}
              placeholder="Viết bình luận..."
              placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
              value={commentText}
              onChangeText={setCommentText}
              multiline
            />
            <TouchableOpacity 
              style={[styles.sendBtn, !commentText.trim() && styles.sendBtnDisabled]}
              onPress={handleAddComment}
              disabled={!commentText.trim()}
            >
              <Text style={styles.sendBtnText}>Gửi</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}


    </ScrollView>
  );
}