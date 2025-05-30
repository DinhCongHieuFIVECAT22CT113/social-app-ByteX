import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  useColorScheme, 
  Alert,
  ActivityIndicator
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { 
  faArrowLeft, 
  faChevronRight, 
  faCommentAlt, 
  faSignOutAlt, 
  faUserEdit 
} from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../config/firebaseConfig';
import { logout } from '../services/AuthService';
import styles from '../styles/ProfileScreenStyles';

// ProfileScreen.js
// Màn hình trang cá nhân người dùng, hiển thị thông tin, ảnh, follower, following

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const navigation = useNavigation();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lấy thông tin người dùng hiện tại
    const user = auth.currentUser;
    if (user) {
      setCurrentUser({
        displayName: user.displayName || 'Người dùng ByteX',
        email: user.email || '',
        photoURL: user.photoURL || 'https://storage.googleapis.com/a1aa/image/e714f4c7-cbf2-454f-f364-39d492eaf9c7.jpg'
      });
    }
    setLoading(false);
  }, []);

  // Xử lý đăng xuất
  const handleLogout = async () => {
    Alert.alert(
      "Xác nhận đăng xuất",
      "Bạn có chắc chắn muốn đăng xuất không?",
      [
        {
          text: "Hủy",
          style: "cancel"
        },
        {
          text: "Đăng xuất",
          onPress: async () => {
            try {
              await logout();
              navigation.replace('Login');
            } catch (error) {
              Alert.alert("Lỗi", "Không thể đăng xuất. Vui lòng thử lại.");
            }
          }
        }
      ]
    );
  };

  // Xử lý chỉnh sửa thông tin cá nhân
  const handleEditProfile = () => {
    navigation.navigate('UpdateUser');
  };

  // Xử lý quay lại
  const handleGoBack = () => {
    navigation.goBack();
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, isDark && { backgroundColor: '#121212' }]}>
        <ActivityIndicator size="large" color="#22c55e" />
        <Text style={{ color: isDark ? '#fff' : '#000', marginTop: 10 }}>Đang tải...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.root, isDark ? styles.rootDark : styles.rootLight]}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.headerBtn} onPress={handleGoBack}>
          <FontAwesomeIcon icon={faArrowLeft} size={20} color={isDark ? '#fff' : '#000'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isDark && styles.headerTitleDark]}>Trang cá nhân</Text>
        <TouchableOpacity 
          style={[
            styles.headerIconBtn,
            isDark ? styles.headerIconBtnDark : styles.headerIconBtnLight
          ]}
          onPress={handleEditProfile}
        >
          <FontAwesomeIcon icon={faUserEdit} size={16} color={isDark ? '#d1d5db' : '#4B5563'} />
        </TouchableOpacity>
      </View>

      {/* Profile Image and Info */}
      <View style={styles.profileInfo}>
        <View style={styles.profileAvatarBorder}>
          <Image
            source={{ uri: currentUser?.photoURL || 'https://storage.googleapis.com/a1aa/image/e714f4c7-cbf2-454f-f364-39d492eaf9c7.jpg' }}
            style={styles.profileAvatar}
            accessibilityLabel="Ảnh đại diện người dùng"
          />
        </View>
        <Text style={[styles.profileName, isDark && styles.profileNameDark]}>
          {currentUser?.displayName || 'Người dùng ByteX'}
        </Text>
        <Text style={styles.profileEmail}>{currentUser?.email || 'Email@gmail.com'}</Text>
      </View>

      {/* Buttons */}
      <View style={styles.btnRow}>
        <TouchableOpacity 
          style={[
            styles.chatBtn,
            isDark ? styles.chatBtnDark : styles.chatBtnLight
          ]}
          onPress={handleEditProfile}
        >
          <FontAwesomeIcon icon={faUserEdit} size={16} color={isDark ? '#d1d5db' : '#374151'} />
          <Text style={[styles.chatBtnText, isDark && styles.chatBtnTextDark]}>Chỉnh sửa</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.followBtn} onPress={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} size={16} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.followBtnText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={[
          styles.statBox,
          isDark ? styles.statBoxDark : styles.statBoxLight
        ]}>
          <Text style={[styles.statNumber, isDark && styles.statNumberDark]}>0</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={[
          styles.statBox,
          isDark ? styles.statBoxDark : styles.statBoxLight
        ]}>
          <Text style={[styles.statNumber, isDark && styles.statNumberDark]}>0</Text>
          <Text style={styles.statLabel}>Bài viết</Text>
        </View>
        <View style={[
          styles.statBox,
          isDark ? styles.statBoxDark : styles.statBoxLight
        ]}>
          <Text style={[styles.statNumber, isDark && styles.statNumberDark]}>0</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>

      <View style={[
        styles.divider,
        isDark ? styles.dividerDark : styles.dividerLight
      ]} />

      {/* Image Gallery */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.galleryRow}>
        <Image
          source={{ uri: 'https://storage.googleapis.com/a1aa/image/3b64246d-2368-4bab-5a46-53078d1d10d7.jpg' }}
          style={styles.galleryImage}
          accessibilityLabel="Ảnh bài viết 1"
        />
        <Image
          source={{ uri: 'https://storage.googleapis.com/a1aa/image/aafb1560-d2af-49ff-4e8f-4817b52d9a3c.jpg' }}
          style={styles.galleryImage}
          accessibilityLabel="Ảnh bài viết 2"
        />
        <Image
          source={{ uri: 'https://storage.googleapis.com/a1aa/image/b702c87b-bf9e-4f9b-7d23-67d57b4a5bd9.jpg' }}
          style={styles.galleryImage}
          accessibilityLabel="Ảnh bài viết 3"
        />
      </ScrollView>
      
      {/* Logout Button */}
      <TouchableOpacity 
        style={[
          styles.logoutBtn,
          isDark && styles.logoutBtnDark
        ]}
        onPress={handleLogout}
      >
        <FontAwesomeIcon icon={faSignOutAlt} size={18} color={isDark ? '#fff' : '#000'} style={{ marginRight: 8 }} />
        <Text style={[styles.logoutBtnText, isDark && styles.logoutBtnTextDark]}>Đăng xuất tài khoản</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
