import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  Alert,
  ActivityIndicator,
  FlatList
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { 
  faArrowLeft, 
  faChevronRight, 
  faCommentAlt, 
  faSignOutAlt, 
  faUserEdit,
  faUserPlus,
  faImages,
  faMoon,
  faSun
} from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../config/firebaseConfig';
import { logout } from '../services/AuthService';
import { getPosts } from '../services/PostService';
import styles from '../styles/ProfileScreenStyles';
import { useTheme } from '../context/ThemeContext';

// ProfileScreen.js
// Màn hình trang cá nhân người dùng, hiển thị thông tin, ảnh, follower, following

export default function ProfileScreen() {
  // Sử dụng context theme thay vì useColorScheme
  const { isDarkMode, toggleDarkMode } = useTheme();
  const isDark = isDarkMode;
  const navigation = useNavigation();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userPosts, setUserPosts] = useState([]);
  const [stats, setStats] = useState({
    followers: 0,
    following: 0,
    posts: 0
  });
  const [showSideMenu, setShowSideMenu] = useState(false);

  useEffect(() => {
    // Lấy thông tin người dùng hiện tại
    const user = auth.currentUser;
    if (user) {
      setCurrentUser({
        uid: user.uid,
        displayName: user.displayName || 'Người dùng ByteX',
        email: user.email || '',
        photoURL: user.photoURL || 'https://storage.googleapis.com/a1aa/image/e714f4c7-cbf2-454f-f364-39d492eaf9c7.jpg'
      });
      
      // Lấy bài viết của người dùng
      const fetchUserPosts = async () => {
        try {
          const allPosts = await getPosts();
          const userPosts = allPosts.filter(post => post.userId === user.uid);
          setUserPosts(userPosts);
          
          // Cập nhật thống kê
          setStats({
            followers: Math.floor(Math.random() * 100), // Giả lập số liệu
            following: Math.floor(Math.random() * 50),  // Giả lập số liệu
            posts: userPosts.length
          });
          
          setLoading(false);
        } catch (error) {
          console.error("Error fetching user posts:", error);
          setLoading(false);
        }
      };
      
      fetchUserPosts();
    } else {
      setLoading(false);
      navigation.replace('Login');
    }
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
  
  // Xử lý hiển thị menu slide
  const toggleSideMenu = () => {
    setShowSideMenu(!showSideMenu);
  };
  
  // Xử lý thay đổi ảnh đại diện
  const handleChangeAvatar = () => {
    navigation.navigate('UpdateUser');
  };
  
  // Xử lý theo dõi người dùng
  const handleFollow = () => {
    Alert.alert("Thông báo", "Tính năng đang được phát triển");
  };
  
  // Xử lý trò chuyện
  const handleChat = () => {
    Alert.alert("Thông báo", "Tính năng đang được phát triển");
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
    <View style={[styles.container, isDark ? styles.containerDark : styles.containerLight]}>
      {/* Main Content */}
      <ScrollView style={styles.scrollView}>
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
            onPress={toggleSideMenu}
          >
            <Text style={{ fontSize: 20, color: isDark ? '#fff' : '#000' }}>☰</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Image and Info */}
        <View style={styles.profileInfo}>
          <View style={styles.profileAvatarBorder}>
            <Image
              source={{ uri: currentUser?.photoURL || 'https://storage.googleapis.com/a1aa/image/e714f4c7-cbf2-454f-f364-39d492eaf9c7.jpg' }}
              style={styles.profileAvatar}
              accessibilityLabel="Ảnh đại diện người dùng"
              onError={e => {
                setCurrentUser(c => ({ ...c, photoURL: 'https://storage.googleapis.com/a1aa/image/e714f4c7-cbf2-454f-f364-39d492eaf9c7.jpg' }));
              }}
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
            onPress={handleChat}
          >
            <FontAwesomeIcon icon={faCommentAlt} size={16} color={isDark ? '#d1d5db' : '#374151'} />
            <Text style={[styles.chatBtnText, isDark && styles.chatBtnTextDark]}>Trò chuyện</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.followBtn} onPress={handleFollow}>
            <FontAwesomeIcon icon={faUserPlus} size={16} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.followBtnText}>Theo dõi</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={[
            styles.statBox,
            isDark ? styles.statBoxDark : styles.statBoxLight
          ]}>
            <Text style={[styles.statNumber, isDark && styles.statNumberDark]}>{stats.followers}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={[
            styles.statBox,
            isDark ? styles.statBoxDark : styles.statBoxLight
          ]}>
            <Text style={[styles.statNumber, isDark && styles.statNumberDark]}>{stats.posts}</Text>
            <Text style={styles.statLabel}>Bài viết</Text>
          </View>
          <View style={[
            styles.statBox,
            isDark ? styles.statBoxDark : styles.statBoxLight
          ]}>
            <Text style={[styles.statNumber, isDark && styles.statNumberDark]}>{stats.following}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>

        <View style={[
          styles.divider,
          isDark ? styles.dividerDark : styles.dividerLight
        ]} />

        {/* Image Gallery */}
        <Text style={[styles.galleryTitle, isDark && styles.galleryTitleDark]}>Ảnh của bạn</Text>
        
        {userPosts.length > 0 ? (
          <FlatList
            data={userPosts}
            numColumns={3}
            scrollEnabled={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.galleryItem}
                onPress={() => navigation.navigate('Post', { postId: item.id })}
              >
                <Image
                  source={{ uri: item.image || 'https://storage.googleapis.com/a1aa/image/67c7c8ae-8b93-420a-1a52-62d4ef5fc981.jpg' }}
                  style={styles.galleryImage}
                  accessibilityLabel="Ảnh bài viết"
                />
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <Text style={[styles.emptyText, isDark && styles.emptyTextDark]}>
                Bạn chưa có bài viết nào
              </Text>
            }
          />
        ) : (
          <View style={styles.galleryGrid}>
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
          </View>
        )}
      </ScrollView>
      
      {/* Side Menu */}
      {showSideMenu && (
        <View style={[styles.sideMenuOverlay, { opacity: 0.5 }]}>
          <TouchableOpacity 
            style={{ flex: 1 }}
            onPress={toggleSideMenu}
          />
        </View>
      )}
      
      {showSideMenu && (
        <View style={[styles.sideMenu, isDark && styles.sideMenuDark]}>
          <View style={styles.sideMenuHeader}>
            <Text style={[styles.sideMenuTitle, isDark && styles.sideMenuTitleDark]}>Menu</Text>
            <TouchableOpacity onPress={toggleSideMenu}>
              <Text style={{ fontSize: 20, color: isDark ? '#fff' : '#000' }}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => {
              toggleSideMenu();
              navigation.navigate('Home');
            }}
          >
            <FontAwesomeIcon icon={faImages} size={20} color={isDark ? '#4ade80' : '#22c55e'} />
            <Text style={[styles.menuItemText, isDark && styles.menuItemTextDark]}>Danh sách bài đăng</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => {
              toggleSideMenu();
              handleChangeAvatar();
            }}
          >
            <FontAwesomeIcon icon={faUserEdit} size={20} color={isDark ? '#4ade80' : '#22c55e'} />
            <Text style={[styles.menuItemText, isDark && styles.menuItemTextDark]}>Thay ảnh avatar</Text>
          </TouchableOpacity>
          
          <View style={styles.menuItem}>
            <FontAwesomeIcon icon={isDark ? faMoon : faSun} size={20} color={isDark ? '#4ade80' : '#22c55e'} />
            <Text style={[styles.menuItemText, isDark && styles.menuItemTextDark]}>Chế độ tối</Text>
            <TouchableOpacity 
              style={[styles.toggleSwitch, isDark && styles.toggleSwitchActive]}
              onPress={toggleDarkMode}
            >
              <View style={[styles.toggleBall, isDark && styles.toggleBallActive]} />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={[styles.logoutBtn, isDark && styles.logoutBtnDark]}
            onPress={() => {
              toggleSideMenu();
              handleLogout();
            }}
          >
            <FontAwesomeIcon icon={faSignOutAlt} size={18} color={isDark ? '#fff' : '#000'} style={{ marginRight: 8 }} />
            <Text style={[styles.logoutBtnText, isDark && styles.logoutBtnTextDark]}>Đăng xuất tài khoản</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
