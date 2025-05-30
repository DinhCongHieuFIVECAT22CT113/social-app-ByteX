import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
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
import { addLike, getLikes, addComment, getComments } from '../services/CommentService';
import styles from '../styles/PostScreenStyles';

// PostScreen.js
// Màn hình chi tiết bài viết, cho phép like, comment, hiển thị thông tin bài viết

export default function PostScreen({ route }) {
  // Giả lập postId và userId, bạn nên lấy từ route.params hoặc context thực tế
  const postId = route?.params?.postId || 'testPostId';
  const userId = 'testUserId';

  const [commentText, setCommentText] = useState('');
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);

  // Lấy danh sách like/comment khi cần
  const fetchLikes = async () => {
    const data = await getLikes(postId);
    setLikes(data);
  };

  const fetchComments = async () => {
    const data = await getComments(postId);
    setComments(data);
  };

  // Gọi khi bấm Like
  const handleLike = async () => {
    await addLike(postId, userId);
    fetchLikes();
  };

  // Gọi khi gửi comment
  const handleComment = async () => {
    if (!commentText.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập nội dung bình luận!');
      return;
    }
    await addComment(postId, { userId, text: commentText });
    setCommentText('');
    fetchComments();
  };

  // Có thể fetch dữ liệu khi mount component (tùy ý)
  React.useEffect(() => {
    fetchLikes();
    fetchComments();
  }, []);

  return (
    <ScrollView style={styles.root}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.headerBtn}>
          <FontAwesomeIcon icon={faArrowLeft} size={16} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tạo bài viết</Text>
        <TouchableOpacity style={styles.headerPostBtn}>
          <Text style={styles.headerPostBtnText}>Đăng bài</Text>
        </TouchableOpacity>
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
          <Text style={styles.postInput}>
            Bạn đang nghĩ gì ....
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Buttons group */}
      <View style={styles.groupBtn}>
        <TouchableOpacity style={styles.groupBtnItem}>
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

      {/* Like & Comment section */}
      <View style={styles.likeCommentRow}>
        <TouchableOpacity onPress={handleLike} style={styles.likeBtn}>
          <FontAwesomeIcon icon={faThumbsUp} size={18} color="#2563eb" />
          <Text style={styles.likeText}>{likes.length} Like</Text>
        </TouchableOpacity>
        <FontAwesomeIcon icon={faCommentDots} size={18} color="#22c55e" style={styles.commentIcon} />
        <Text style={styles.commentText}>{comments.length} Comment</Text>
      </View>

      {/* Comment input */}
      <View style={styles.commentInputRow}>
        <TextInput
          value={commentText}
          onChangeText={setCommentText}
          placeholder="Nhập bình luận..."
          style={styles.commentInput}
        />
        <TouchableOpacity onPress={handleComment} style={styles.sendBtn}>
          <Text style={styles.sendBtnText}>Gửi</Text>
        </TouchableOpacity>
      </View>

      {/* Danh sách comment */}
      <View>
        {comments.map((cmt, idx) => (
          <View key={idx} style={styles.commentItem}>
            <Text style={styles.commentUser}>{cmt.userId}</Text>
            <Text style={styles.commentContent}>{cmt.text}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}