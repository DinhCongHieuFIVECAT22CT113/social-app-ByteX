import React, { useState, useEffect } from 'react';
import {
  View, Text, Image, TouchableOpacity,
  ActivityIndicator, FlatList, useColorScheme, Vibration,
  RefreshControl, StatusBar
} from 'react-native';
import { getPostsPaginated } from '../services/PostService';
import { getLikes, getComments } from '../services/CommentService';
import { likePost } from '../services/PostInteractionService';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../config/firebaseConfig';
import styles from '../styles/HomeScreenStyles';

const PAGE_SIZE = 5;

export default function HomeScreen() {
  const [posts, setPosts] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [noMore, setNoMore] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const navigation = useNavigation();

  useEffect(() => {
    // Get current user
    const user = auth.currentUser;
    if (user) {
      setCurrentUser({
        displayName: user.displayName || 'Người dùng ByteX',
        email: user.email || '',
        photoURL: user.photoURL || 'https://storage.googleapis.com/a1aa/image/e816601d-411b-4b99-9acc-6a92ee01e37a.jpg'
      });
    }
    
    loadMorePosts(true);
  }, []);

  // Lấy số like/comment thực tế cho từng post
  const fetchLikeCommentCounts = async (post) => {
    const likes = await getLikes(post.id);
    const comments = await getComments(post.id);
    return { ...post, likes: likes.length, comments: comments.length };
  };

  // Load posts và cập nhật số like/comment
  const loadMorePosts = async (refresh = false) => {
    if ((loading && !refresh) || (noMore && !refresh)) return;
    
    setLoading(true);
    if (refresh) {
      setLastDoc(null);
      setNoMore(false);
    }
    
    try {
      const { posts: newPosts, lastVisible } = await getPostsPaginated(PAGE_SIZE, refresh ? null : lastDoc);
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
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadMorePosts(true);
  };

  // Like bài viết và rung khi like
  const handleLike = async (postId) => {
    if (!auth.currentUser) {
      navigation.navigate('Login');
      return;
    }
    
    await likePost(postId, auth.currentUser.uid);
    Vibration.vibrate(100); // Rung 100ms
    // Sau khi like, reload lại số like cho post đó
    setPosts(posts => posts.map(post =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleCreatePost = () => {
    navigation.navigate('Post');
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Post', { postId: item.id })}>
      <View style={[
        styles.card,
        isDark && styles.cardDark
      ]}>
        <View style={styles.row}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: item.avatar || 'https://storage.googleapis.com/a1aa/image/e816601d-411b-4b99-9acc-6a92ee01e37a.jpg' }}
              style={styles.avatar}
            />
            <View style={styles.avatarStatus} />
          </View>
          <View>
            <Text style={[styles.author, isDark && styles.authorDark]}>{item.author || 'Tên Tài Khoản'}</Text>
            <Text style={[styles.time, isDark && styles.timeDark]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.createdAt ? new Date(item.createdAt).toLocaleString() : ''}
            </Text>
          </View>
          <TouchableOpacity style={[
            styles.followBtn,
            isDark && styles.followBtnDark
          ]}>
            <Text style={[styles.followBtnText, isDark && styles.followBtnTextDark]}>Following</Text>
          </TouchableOpacity>
        </View>

        {item.image && (
          <Image
            source={{ uri: item.image }}
            style={styles.postImage}
            resizeMode="cover"
          />
        )}

        <Text style={[styles.content, isDark && styles.contentDark]}>{item.content || ''}</Text>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionBtn}>
            <Text>🔁</Text>
            <Text style={styles.actionText}>{item.shares || 0}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} onPress={() => handleLike(item.id)}>
            <Text style={{ fontSize: 18 }}>❤️</Text>
            <Text style={styles.actionText}>{item.likes || 0}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('Comments', { postId: item.id })}>
            <Text>💬</Text>
            <Text style={styles.actionText}>{item.comments || 0}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: isDark ? '#121212' : '#f5f5f5' }}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={[
          styles.container,
          isDark && styles.containerDark
        ]}
        onEndReached={() => loadMorePosts()}
        onEndReachedThreshold={0.2}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#22c55e']}
            tintColor={isDark ? '#fff' : '#000'}
          />
        }
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
              <TouchableOpacity onPress={handleProfilePress}>
                <Text style={[styles.headerIcon, isDark && styles.headerIconDark]}>›</Text>
              </TouchableOpacity>
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
          ) : noMore && posts.length > 0 ? (
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
