import React, { useState, useEffect } from 'react';
import {
  View, Text, Image, TouchableOpacity,
  ActivityIndicator, FlatList, useColorScheme, Vibration
} from 'react-native';
import { getPostsPaginated } from '../services/PostService';
import { getLikes, getComments } from '../services/CommentService';
import { likePost } from '../services/PostInteractionService';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/HomeScreenStyles';

const PAGE_SIZE = 5;

export default function HomeScreen() {
  const [posts, setPosts] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [noMore, setNoMore] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const navigation = useNavigation();

  useEffect(() => {
    loadMorePosts();
  }, []);

  // Lấy số like/comment thực tế cho từng post
  const fetchLikeCommentCounts = async (post) => {
    const likes = await getLikes(post.id);
    const comments = await getComments(post.id);
    return { ...post, likes: likes.length, comments: comments.length };
  };

  // Load posts và cập nhật số like/comment
  const loadMorePosts = async () => {
    if (loading || noMore) return;
    setLoading(true);
    setTimeout(async () => {
      const { posts: newPosts, lastVisible } = await getPostsPaginated(PAGE_SIZE, lastDoc);
      if (newPosts.length === 0) setNoMore(true);
      // Lấy số like/comment cho từng post
      const postsWithCounts = await Promise.all(newPosts.map(fetchLikeCommentCounts));
      setPosts(prev => [...prev, ...postsWithCounts]);
      setLastDoc(lastVisible);
      setLoading(false);
    }, 1000);
  };

  // Like bài viết và rung khi like
  const handleLike = async (postId) => {
    await likePost(postId, 'testUser');
    Vibration.vibrate(100); // Rung 100ms
    // Sau khi like, reload lại số like cho post đó
    setPosts(posts => posts.map(post =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
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
            <Text>♡</Text>
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
    <FlatList
      data={posts}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      contentContainerStyle={[
        styles.container,
        isDark && styles.containerDark
      ]}
      onEndReached={loadMorePosts}
      onEndReachedThreshold={0.2}
      ListHeaderComponent={
        <>
          <View style={[styles.header, isDark && styles.headerDark]}>
            <View style={styles.headerLeft}>
              <View style={styles.headerAvatar} />
              <View>
                <Text style={[styles.headerName, isDark && styles.headerNameDark]}>Tên Tài Khoản</Text>
                <Text style={[styles.headerEmail, isDark && styles.headerEmailDark]}>Email@gmail.com</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Text style={[styles.headerIcon, isDark && styles.headerIconDark]}>›</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.shareRow}>
            <TouchableOpacity style={[styles.shareBtn, isDark && styles.shareBtnDark]}>
              <Text style={[styles.shareBtnText, isDark && styles.shareBtnTextDark]}>Chia Sẻ Trạng Thái của Bạn ....</Text>
            </TouchableOpacity>
          </View>
        </>
      }
      ListFooterComponent={loading ? <ActivityIndicator size="small" color={isDark ? '#fff' : '#000'} /> : null}
    />
  );
}
