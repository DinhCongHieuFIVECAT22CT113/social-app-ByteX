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
    <ScrollView className="bg-white flex-1 p-4">
      {/* Header */}
      <View className="flex-row items-center mb-4 space-x-4">
        <TouchableOpacity className="w-10 h-10 rounded-lg bg-green-500 justify-center items-center">
          <FontAwesomeIcon icon={faArrowLeft} size={16} color="white" />
        </TouchableOpacity>
        <Text className="text-base font-normal text-black">Tạo bài viết</Text>
        <TouchableOpacity className="ml-auto bg-green-500 px-4 py-2 rounded-full">
          <Text className="text-white text-sm font-semibold">Đăng bài</Text>
        </TouchableOpacity>
      </View>

      <View className="border-b border-black border-opacity-30 mb-4" />

      {/* User info and post input */}
      <View className="flex-row space-x-4 mb-4">
        <View className="w-12 h-12 rounded-full border-2 border-green-500" />
        <View className="flex-1">
          <Text className="text-sm font-normal text-black mb-2">Tên Tài Khoản</Text>
          <View className="flex-row flex-wrap mb-2 space-x-2">
            <TouchableOpacity className="flex-row items-center bg-gray-300 rounded-full px-3 py-1">
              <FontAwesomeIcon icon={faUserFriends} size={12} color="black" />
              <Text className="text-xs font-normal text-black ml-1">Bạn bè</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center bg-gray-300 rounded-full px-3 py-1">
              <Text className="text-xs font-normal text-black">+ Album</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity className="flex-row items-center bg-gray-300 rounded-full px-3 py-1">
            <FontAwesomeIcon icon={faClock} size={12} color="black" />
            <Text className="text-xs font-normal text-black ml-1">Thời gian đăng</Text>
          </TouchableOpacity>
          <Text className="mt-3 text-lg font-normal text-black">
            Bạn đang nghĩ gì ....
          </Text>
        </View>
      </View>

      <View className="border-b border-black border-opacity-30 mb-4" />

      {/* Buttons group */}
      <View className="space-y-3 max-w-max mb-6">
        <TouchableOpacity className="flex-row items-center bg-green-500 rounded-full px-4 py-2">
          <FontAwesomeIcon icon={faCamera} size={14} color="white" />
          <Text className="text-white text-xs font-semibold ml-2">Ảnh/Video</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center bg-green-500 rounded-full px-4 py-2">
          <FontAwesomeIcon icon={faUserPlus} size={14} color="white" />
          <Text className="text-white text-xs font-semibold ml-2">Gắn thẻ người khác</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center bg-green-500 rounded-full px-4 py-2">
          <FontAwesomeIcon icon={faSmile} size={14} color="white" />
          <Text className="text-white text-xs font-semibold ml-2">Cảm xúc/hoạt động</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center bg-green-500 rounded-full px-4 py-2">
          <FontAwesomeIcon icon={faMapMarkerAlt} size={14} color="white" />
          <Text className="text-white text-xs font-semibold ml-2">Checkin</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center bg-green-500 rounded-full px-4 py-2">
          <FontAwesomeIcon icon={faVideo} size={14} color="white" />
          <Text className="text-white text-xs font-semibold ml-2">Video trực tiếp</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center bg-green-500 rounded-full px-4 py-2">
          <FontAwesomeIcon icon={faTh} size={14} color="white" />
          <Text className="text-white text-xs font-semibold ml-2">Màu nền</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center bg-green-500 rounded-full px-4 py-2">
          <FontAwesomeIcon icon={faCamera} size={14} color="white" />
          <Text className="text-white text-xs font-semibold ml-2">Camera</Text>
        </TouchableOpacity>
      </View>

      {/* Like & Comment section */}
      <View className="flex-row items-center mb-2">
        <TouchableOpacity onPress={handleLike} className="flex-row items-center mr-4">
          <FontAwesomeIcon icon={faThumbsUp} size={18} color="#2563eb" />
          <Text className="ml-1 text-blue-600">{likes.length} Like</Text>
        </TouchableOpacity>
        <FontAwesomeIcon icon={faCommentDots} size={18} color="#22c55e" />
        <Text className="ml-1 text-green-600">{comments.length} Comment</Text>
      </View>

      {/* Comment input */}
      <View className="flex-row items-center mb-4">
        <TextInput
          value={commentText}
          onChangeText={setCommentText}
          placeholder="Nhập bình luận..."
          className="flex-1 border px-2 py-1 rounded"
        />
        <TouchableOpacity onPress={handleComment} className="ml-2 bg-green-500 px-4 py-2 rounded-full">
          <Text className="text-white">Gửi</Text>
        </TouchableOpacity>
      </View>

      {/* Danh sách comment */}
      <View>
        {comments.map((cmt, idx) => (
          <View key={idx} className="mb-2 p-2 bg-gray-100 rounded">
            <Text className="font-semibold">{cmt.userId}</Text>
            <Text>{cmt.text}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}