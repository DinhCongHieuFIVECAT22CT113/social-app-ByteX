import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, Image, TouchableOpacity,
  ActivityIndicator, FlatList, Vibration,
  StatusBar, Alert
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import CustomRefreshControl from '../components/CustomRefreshControl';
import * as PostService from '../services/PostService';
import { getLikes, getComments } from '../services/CommentService';
import { likePost, unlikePost, hasUserLiked, toggleLike } from '../services/PostInteractionService';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { auth } from '../config/firebaseConfig';
import styles from '../styles/HomeScreenStyles';
import LikeButton from '../components/LikeButton';

const PAGE_SIZE = 10;

export default function HomeScreen() {
  const [posts, setPosts] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [noMore, setNoMore] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [realtimeEnabled, setRealtimeEnabled] = useState(true);
  const [likedPosts, setLikedPosts] = useState({}); // Thêm state lưu trạng thái đã like cho từng post
  const { isDarkMode } = useTheme();
  const isDark = isDarkMode;
  const navigation = useNavigation();

  // Lấy số like/comment thực tế cho từng post
  const fetchLikeCommentCounts = async (post) => {
    try {
      const likes = await getLikes(post.id);
      const comments = await getComments(post.id);
      return { 
        ...post, 
        likes: likes.length, 
        comments: comments.length,
        // Đảm bảo các trường cần thiết luôn tồn tại
        author: post.author || 'Người dùng ByteX',
        avatar: post.avatar || 'https://storage.googleapis.com/a1aa/image/e816601d-411b-4b99-9acc-6a92ee01e37a.jpg',
        content: post.content || post.caption || '',
      };
    } catch (error) {
      console.error(`Error fetching counts for post ${post.id}:`, error);
      return post;
    }
  };

  // Load posts và cập nhật số like/comment (chế độ không realtime)
  const loadMorePosts = async (refresh = false) => {
    if ((loading && !refresh) || (noMore && !refresh)) return;
    
    setLoading(true);
    if (refresh) {
      setLastDoc(null);
      setNoMore(false);
    }
    
    try {
      const { posts: newPosts, lastVisible } = await PostService.getPostsPaginated(PAGE_SIZE, refresh ? null : lastDoc);
      if (newPosts.length === 0) {
        setNoMore(true);
      } else {
        // Lấy số like/comment cho từng post
        const postsWithCounts = await Promise.all(newPosts.map(fetchLikeCommentCounts));
        setPosts(prev => refresh ? postsWithCounts : [...prev, ...postsWithCounts]);
        setLastDoc(lastVisible);
      }
    } catch (error) {
      console.error("Error loading posts:", error);
      Alert.alert("Lỗi", "Không thể tải bài viết. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Lấy thông tin người dùng hiện tại
  useEffect(() => {
    const updateCurrentUser = () => {
      const user = auth.currentUser;
      if (user) {
        setCurrentUser({
          uid: user.uid,
          displayName: user.displayName || 'Người dùng ByteX',
          email: user.email || '',
          photoURL: user.photoURL || 'https://storage.googleapis.com/a1aa/image/e816601d-411b-4b99-9acc-6a92ee01e37a.jpg'
        });
      } else {
        setCurrentUser(null);
      }
    };

    // Lắng nghe sự thay đổi trạng thái đăng nhập
    const unsubscribe = auth.onAuthStateChanged(updateCurrentUser);
    
    return () => unsubscribe();
  }, []);

  // Lắng nghe bài viết realtime khi màn hình được focus
  useEffect(() => {
    if (realtimeEnabled) {
      const unsubscribe = PostService.listenToPosts((newPosts) => {
        if (newPosts && newPosts.length > 0) {
          setPosts(newPosts);
        }
      }, PAGE_SIZE);
      
      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    } else {
      loadMorePosts(true);
    }
  }, [realtimeEnabled]);

  const onRefresh = () => {
    setRefreshing(true);
    if (realtimeEnabled) {
      // Trong chế độ realtime, chỉ cần đợi một chút để giả lập refresh
      setTimeout(() => {
        setRefreshing(false);
      }, 1000);
    } else {
      loadMorePosts(true);
    }
  };

  // Kiểm tra user đã like các post nào khi load danh sách
  useEffect(() => {
    if (!currentUser || !posts.length) return;
    const fetchLiked = async () => {
      const result = {};
      for (const post of posts) {
        result[post.id] = await hasUserLiked(post.id, currentUser.uid);
      }
      setLikedPosts(result);
    };
    fetchLiked();
  }, [posts, currentUser]);

  // Hàm toggle like/unlike
  const handleToggleLike = async (postId) => {
    if (!auth.currentUser) {
      Alert.alert(
        "Yêu cầu đăng nhập", 
        "Bạn cần đăng nhập để thích bài viết",
        [
          { text: "Hủy", style: "cancel" },
          { text: "Đăng nhập", onPress: () => navigation.navigate('Login') }
        ]
      );
      return;
    }
    
    try {
      Vibration.vibrate(100); // Rung khi nhấn like
      
      // Cập nhật tạm thời UI trước khi server phản hồi
      const alreadyLiked = likedPosts[postId];
      setLikedPosts(liked => ({ ...liked, [postId]: !alreadyLiked }));
      
      // Cập nhật tạm thời số lượng like
      setPosts(posts => posts.map(post =>
        post.id === postId ? { 
          ...post, 
          likes: alreadyLiked ? (post.likes || 1) - 1 : (post.likes || 0) + 1 
        } : post
      ));
      
      // Gọi API toggle like
      const result = await toggleLike(postId, auth.currentUser.uid);
      console.log(`Like ${result.action} successfully`);
      
    } catch (error) {
      console.error("Error toggling like:", error);
      
      // Rollback UI nếu có lỗi
      const alreadyLiked = likedPosts[postId];
      setLikedPosts(liked => ({ ...liked, [postId]: alreadyLiked }));
      setPosts(posts => posts.map(post =>
        post.id === postId ? { 
          ...post, 
          likes: alreadyLiked ? (post.likes || 0) + 1 : (post.likes || 1) - 1 
        } : post
      ));
      
      Alert.alert("Lỗi", "Không thể thực hiện hành động này. Vui lòng thử lại.");
      Alert.alert('Lỗi', 'Không thể cập nhật like.');
    }
  };

  const handleCreatePost = () => {
    if (!auth.currentUser) {
      Alert.alert(
        "Yêu cầu đăng nhập", 
        "Bạn cần đăng nhập để tạo bài viết",
        [
          { text: "Hủy", style: "cancel" },
          { text: "Đăng nhập", onPress: () => navigation.navigate('Login') }
        ]
      );
      return;
    }
    navigation.navigate('Post');
  };

  const handleProfilePress = () => {
    if (auth.currentUser) {
      navigation.navigate('Profile');
    } else {
      navigation.navigate('Login');
    }
  };

  // Hàm format thời gian đẹp hơn
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    
    const now = Date.now();
    const postTime = new Date(timestamp);
    const diffInSeconds = Math.floor((now - timestamp) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Vừa xong';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} phút trước`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} giờ trước`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} ngày trước`;
    } else {
      return postTime.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    }
  };

  const renderItem = ({ item }) => {
    // Xử lý trường hợp item không có dữ liệu đầy đủ
    const postAuthor = item.displayName || item.author || 'Người dùng ByteX';
    const postAvatar = item.avatar || item.photoURL;
    const postContent = item.content || item.caption || '';
    const postImage = item.image || '';
    const postTime = formatTime(item.createdAt);
    
    // Default avatar nếu không có avatar
    const defaultAvatar = 'https://storage.googleapis.com/a1aa/image/e816601d-411b-4b99-9acc-6a92ee01e37a.jpg';
    const avatarUri = postAvatar || defaultAvatar;
    const imageUri = postImage;
    
    // Log để debug - chỉ log khi cần thiết
    if (!postAuthor || !postAvatar) {
      console.log("Rendering post with missing data:", { 
        id: item.id,
        author: item.author,
        displayName: item.displayName,
        userId: item.userId,
        avatar: item.avatar,
        photoURL: item.photoURL
      });
    }
    
    return (
      <TouchableOpacity 
        onPress={() => navigation.navigate('Comments', { postId: item.id })}
        activeOpacity={0.9}
      >
        <View style={[
          styles.card,
          isDark && styles.cardDark
        ]}>
          <View style={styles.row}>
            <TouchableOpacity 
              style={styles.avatarWrapper}
              onPress={() => {
                // Có thể thêm chức năng xem profile người đăng bài
              }}
            >
              <Image
                source={{ uri: avatarUri }}
                style={styles.avatar}
                defaultSource={{ uri: defaultAvatar }}
                onError={(error) => {
                  console.log('Avatar load error for user:', postAuthor, error.nativeEvent.error);
                }}
              />
              <View style={styles.avatarStatus} />
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <Text style={[styles.author, isDark && styles.authorDark]}>
                {postAuthor}
              </Text>
              <Text 
                style={[styles.time, isDark && styles.timeDark]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {postTime}
              </Text>
            </View>
            <TouchableOpacity style={[
              styles.followBtn,
              isDark && styles.followBtnDark
            ]}>
              <Text style={[styles.followBtnText, isDark && styles.followBtnTextDark]}>
                Theo dõi
              </Text>
            </TouchableOpacity>
          </View>

          {postContent ? (
            <Text style={[styles.content, isDark && styles.contentDark]}>
              {postContent}
            </Text>
          ) : null}

          {postImage ? (
            <Image
              source={{ uri: imageUri || 'https://storage.googleapis.com/a1aa/image/67c7c8ae-8b93-420a-1a52-62d4ef5fc981.jpg' }}
              style={styles.postImage}
              resizeMode="cover"
            />
          ) : null}

          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.actionBtn}>
              <Text style={{ fontSize: 16 }}>🔁</Text>
              <Text style={styles.actionText}>{item.shares || 0}</Text>
            </TouchableOpacity>
            <LikeButton
              postId={item.id}
              userId={currentUser?.uid}
              liked={!!likedPosts[item.id]}
              likeCount={item.likes || 0}
              onToggleLike={() => handleToggleLike(item.id)}
              isDark={isDark}
            />
            <TouchableOpacity 
              style={styles.actionBtn} 
              onPress={() => navigation.navigate('Comments', { postId: item.id })}
            >
              <Text style={{ fontSize: 16 }}>💬</Text>
              <Text style={styles.actionText}>{item.comments || 0}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Chuyển đổi giữa chế độ realtime và không realtime
  const toggleRealtimeMode = () => {
    setRealtimeEnabled(!realtimeEnabled);
    if (!realtimeEnabled) {
      // Nếu bật chế độ realtime, hiển thị thông báo
      Alert.alert(
        "Chế độ realtime đã bật",
        "Bài viết mới sẽ tự động hiển thị ngay khi được đăng."
      );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: isDark ? '#121212' : '#f5f5f5' }}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id ? String(item.id) : (item.createdAt ? String(item.createdAt) : Math.random().toString())}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
        onEndReached={() => !realtimeEnabled && loadMorePosts()}
        onEndReachedThreshold={0.2}
        ListHeaderComponent={
          <>
            <View style={[styles.header, isDark && styles.headerDark]}>
              <TouchableOpacity style={styles.headerLeft} onPress={handleProfilePress}>
                <Image 
                  source={{ uri: currentUser?.photoURL || 'https://storage.googleapis.com/a1aa/image/e816601d-411b-4b99-9acc-6a92ee01e37a.jpg' }} 
                  style={styles.headerAvatar} 
                />
                <View>
                  <Text style={[styles.headerName, isDark && styles.headerNameDark]}>
                    {currentUser?.displayName || 'Người dùng ByteX'}
                  </Text>
                  <Text style={[styles.headerEmail, isDark && styles.headerEmailDark]}>
                    {currentUser?.email || 'Chưa đăng nhập'}
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity 
                  style={{ 
                    marginRight: 10, 
                    backgroundColor: realtimeEnabled ? '#22c55e' : '#d1d5db',
                    padding: 5,
                    borderRadius: 5
                  }}
                  onPress={toggleRealtimeMode}
                >
                  <Text style={{ color: '#fff', fontSize: 12 }}>
                    {realtimeEnabled ? 'Realtime' : 'Manual'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={{ marginRight: 10 }}
                  onPress={() => navigation.navigate('Settings')}
                >
                  <Text style={[styles.headerIcon, isDark && styles.headerIconDark]}>⚙️</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleProfilePress}>
                  <Text style={[styles.headerIcon, isDark && styles.headerIconDark]}>›</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.shareRow}>
              <TouchableOpacity 
                style={[styles.shareBtn, isDark && styles.shareBtnDark]}
                onPress={handleCreatePost}
              >
                <Text style={[styles.shareBtnText, isDark && styles.shareBtnTextDark]}>
                  Chia Sẻ Trạng Thái của Bạn ....
                </Text>
              </TouchableOpacity>
            </View>
          </>
        }
        ListEmptyComponent={
          !loading ? (
            <View style={{ padding: 20, alignItems: 'center' }}>
              <Text style={{ color: isDark ? '#fff' : '#000', fontSize: 16 }}>
                Chưa có bài viết nào. Hãy là người đầu tiên đăng bài!
              </Text>
              <TouchableOpacity 
                style={{ 
                  marginTop: 15, 
                  backgroundColor: '#22c55e', 
                  paddingVertical: 10, 
                  paddingHorizontal: 20, 
                  borderRadius: 8 
                }}
                onPress={handleCreatePost}
              >
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Tạo bài viết</Text>
              </TouchableOpacity>
            </View>
          ) : null
        }
        ListFooterComponent={
          loading && !refreshing ? (
            <View style={{ padding: 20 }}>
              <ActivityIndicator size="small" color={isDark ? '#fff' : '#000'} />
            </View>
          ) : noMore && posts.length > 0 && !realtimeEnabled ? (
            <Text style={{ 
              textAlign: 'center', 
              padding: 20, 
              color: isDark ? '#6b7280' : '#9ca3af' 
            }}>
              Đã hiển thị tất cả bài viết
            </Text>
          ) : null
        }
      />
    </View>
  );
}
