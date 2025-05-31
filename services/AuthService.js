// AuthService.js
// Dịch vụ xác thực người dùng: đăng ký, đăng nhập, đăng xuất, đổi avatar, xử lý like, và màn hình Feed
// Sử dụng Firebase Auth, Firestore, AsyncStorage, ImagePicker, v.v.

// Import các thư viện và hàm cần thiết cho xác thực, lưu trữ, hình ảnh, v.v.
import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, Vibration, View, Text } from 'react-native';
import { getPostsPaginated } from '../services/PostService';
import { auth } from '../config/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import ImageService from '../services/ImageService';
import { updateUserProfile, updateUserFirestore } from '../services/UserService';
import { likePost } from '../services/PostInteractionService';

// =======================
// Đăng ký tài khoản mới
// email, password: thông tin đăng ký
// displayName: tên hiển thị (tùy chọn)
// Trả về: user vừa đăng ký
// =======================
export async function register(email, password, displayName) {
  // Tạo người dùng mới với email và mật khẩu
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  // Nếu có tên hiển thị, cập nhật tên hiển thị cho người dùng
  if (displayName) {
    await updateProfile(userCredential.user, { displayName });
  }
  // Trả về thông tin người dùng vừa đăng ký
  return userCredential.user;
}

// =======================
// Đăng nhập
// email, password: thông tin đăng nhập
// Trả về: user vừa đăng nhập
// =======================
export async function login(email, password) {
  // Đăng nhập người dùng với email và mật khẩu
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  // Trả về thông tin người dùng vừa đăng nhập
  return userCredential.user;
}

// =======================
// Đăng xuất tài khoản hiện tại
// Xóa cache/local user info nếu có
// =======================
export async function logout() {
  try {
    // Đăng xuất tài khoản hiện tại khỏi Firebase Auth
    await signOut(auth);
    // Xóa thông tin người dùng từ AsyncStorage (cache, settings, preferences)
    const keys = ['user_data', 'user_settings', 'user_preferences'];
    await AsyncStorage.multiRemove(keys);
    // Log ra console khi đăng xuất thành công
    console.log("Đăng xuất thành công");
    return true;
  } catch (error) {
    // Log lỗi nếu có vấn đề khi đăng xuất
    console.error("Lỗi khi đăng xuất:", error);
    throw error;
  }
}

// =======================
// Đăng xuất và chuyển hướng về màn hình đăng nhập
// navigation: đối tượng điều hướng (navigation)
// =======================
export const handleLogout = async (navigation) => {
  try {
    // Gọi hàm logout để đăng xuất
    await logout();
    // Chuyển hướng về màn hình Welcome (reset navigation stack)
    if (navigation) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Welcome' }],
      });
    }
    return true;
  } catch (error) {
    // Log lỗi nếu có vấn đề khi xử lý đăng xuất
    console.error("Lỗi khi xử lý đăng xuất:", error);
    return false;
  }
};

// =======================
// Đổi avatar người dùng
// 1. Chọn ảnh từ thư viện
// 2. Upload ảnh lên Storage
// 3. Cập nhật avatar trên Auth và Firestore
// =======================
async function handleChangeAvatar() {
  try {
    // 1. Chọn ảnh từ thư viện (cho phép chỉnh sửa, tỉ lệ 1:1, chất lượng 0.8)
    const result = await ImagePicker.launchImageLibraryAsync({ 
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    // Nếu người dùng hủy bỏ hoặc không chọn ảnh, thoát hàm
    if (result.canceled || !result.assets || result.assets.length === 0) return;
    const uri = result.assets[0].uri; // Lấy đường dẫn ảnh
    // Lấy user hiện tại từ Firebase Auth
    const user = auth.currentUser;
    if (!user) throw new Error('No user logged in');
    // 2. Upload ảnh lên Supabase Storage
    const photoURL = await ImageService.uploadImageAsync(uri, `avatars/${user.uid}.jpg`);
    // 3. Cập nhật avatar trên Auth và Firestore
    await updateUserProfile({ displayName: user.displayName, photoURL });
    await updateUserFirestore(user.uid, { avatar: photoURL });
    return photoURL;
  } catch (error) {
    // Log lỗi nếu có vấn đề khi đổi avatar
    console.error("Error changing avatar:", error);
    throw error;
  }
}

// =======================
// Xử lý khi người dùng like một bài viết
// postId: id bài viết
// userId: id người dùng
// =======================
async function handleLike(postId, userId) {
  // Gọi hàm likePost để xử lý việc người dùng thích bài viết
  await likePost(postId, userId);
  // Kích hoạt rung nhẹ để phản hồi hành động like
  Vibration.vibrate(100); // Rung 100ms khi like
}

// =======================
// Component FeedScreen: Hiển thị danh sách bài viết (news feed)
// =======================
export default function FeedScreen() {
  // State lưu danh sách bài viết
  const [posts, setPosts] = useState([]); 
  // State lưu document cuối cùng để phân trang
  const [lastDoc, setLastDoc] = useState(null); 
  // State loading khi load thêm bài viết
  const [loading, setLoading] = useState(false); 
  // State refreshing khi kéo để làm mới
  const [refreshing, setRefreshing] = useState(false); 
  // Theme sẽ được xử lý ở component level 

  // Hàm lấy danh sách bài viết (có phân trang)
  const fetchPosts = async (reset = false) => {
    setLoading(true);
    // Gọi hàm getPostsPaginated để lấy danh sách bài viết có phân trang
    const { posts: newPosts, lastVisible } = await getPostsPaginated(5, reset ? null : lastDoc);
    // Nếu reset thì thay thế toàn bộ, nếu không thì nối thêm vào danh sách cũ
    setPosts(reset ? newPosts : [...posts, ...newPosts]);
    setLastDoc(lastVisible);
    setLoading(false);
  };

  // Lấy bài viết khi component mount
  useEffect(() => {
    fetchPosts(true);
  }, []);

  // Hàm load thêm bài viết khi scroll tới cuối danh sách
  const handleLoadMore = () => {
    if (!loading && lastDoc) {
      fetchPosts();
    }
  };

  // Hàm làm mới danh sách bài viết (kéo để refresh)
  const handleRefresh = () => {
    setRefreshing(true);
    fetchPosts(true).then(() => setRefreshing(false));
  };

  // Giao diện hiển thị danh sách bài viết
  return (
    <View style={{ flex: 1, backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }}>
      {/* Tiêu đề chào mừng, hiển thị chế độ sáng/tối */}
      <Text style={{ color: colorScheme === 'dark' ? '#fff' : '#000' }}>
        Hello, {colorScheme} mode!
      </Text>
      {/* Danh sách bài viết sử dụng FlatList */}
      <FlatList
        data={posts}
        renderItem={({ item }) => <></>} // TODO: Thay thế bằng component hiển thị bài viết
        keyExtractor={item => item.id}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
      />
    </View>
  );
}