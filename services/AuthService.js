// AuthService.js
// Dịch vụ xác thực người dùng: đăng ký, đăng nhập, đăng xuất, đổi avatar, xử lý like, và màn hình Feed
// Sử dụng Firebase Auth, Firestore, AsyncStorage, ImagePicker, v.v.

// Import các thư viện và hàm cần thiết cho xác thực, lưu trữ, hình ảnh, v.v.
import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, Vibration, useColorScheme, View, Text } from 'react-native';
import { getPostsPaginated } from '../services/PostService';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { app } from '../config/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { uploadImageAsync } from '../services/ImageService';
import { updateUserProfile, updateUserFirestore } from '../services/UserService';
import { likePost } from '../services/PostInteractionService';

// Khởi tạo đối tượng xác thực Firebase
const auth = getAuth(app);

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
  // Đăng xuất tài khoản hiện tại
  await signOut(auth);
  // Xóa cache/local user info nếu có
  await AsyncStorage.clear();
}

// =======================
// Đăng xuất và chuyển hướng về màn hình đăng nhập
// navigation: đối tượng điều hướng (navigation)
// =======================
export const handleLogout = async (navigation) => {
  // Gọi hàm logout để đăng xuất
  await logout();
  // Chuyển hướng về màn hình đăng nhập
  navigation.replace('Login');
};

// =======================
// Đổi avatar người dùng
// 1. Chọn ảnh từ thư viện
// 2. Upload ảnh lên Storage
// 3. Cập nhật avatar trên Auth và Firestore
// =======================
async function handleChangeAvatar() {
  // 1. Chọn ảnh từ thư viện
  const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
  // Nếu người dùng hủy bỏ, thoát hàm
  if (result.cancelled) return;

  const uri = result.assets[0].uri; // Expo SDK 48+
  const user = getAuth().currentUser;

  // 2. Upload ảnh lên Storage
  const photoURL = await uploadImageAsync(uri, `avatars/${user.uid}.jpg`);

  // 3. Cập nhật avatar trên Auth và Firestore
  await updateUserProfile({ displayName: user.displayName, photoURL });
  await updateUserFirestore(user.uid, { avatar: photoURL });
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
  const [posts, setPosts] = useState([]); // Danh sách bài viết
  const [lastDoc, setLastDoc] = useState(null); // Document cuối cùng để phân trang
  const [loading, setLoading] = useState(false); // Trạng thái loading khi load thêm bài viết
  const [refreshing, setRefreshing] = useState(false); // Trạng thái refreshing khi kéo để làm mới
  const colorScheme = useColorScheme(); // 'dark' hoặc 'light'

  // Hàm lấy danh sách bài viết (có phân trang)
  const fetchPosts = async (reset = false) => {
    setLoading(true);
    // Gọi hàm getPostsPaginated để lấy danh sách bài viết có phân trang
    const { posts: newPosts, lastVisible } = await getPostsPaginated(5, reset ? null : lastDoc);
    // Cập nhật danh sách bài viết và document cuối cùng
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
      <Text style={{ color: colorScheme === 'dark' ? '#fff' : '#000' }}>
        Hello, {colorScheme} mode!
      </Text>
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