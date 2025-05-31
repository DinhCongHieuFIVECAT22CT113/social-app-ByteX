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
import { getPosts, getPostById } from '../services/PostService';
import { getUserSharedPosts } from '../services/ShareService';
import styles from '../styles/ProfileScreenStyles';
import { useTheme } from '../context/ThemeContext';
import EventEmitter from '../utils/EventEmitter';

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
  const [sharedPosts, setSharedPosts] = useState([]);
  const [stats, setStats] = useState({
    followers: 0,
    following: 0,
    posts: 0
  });
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('posts'); // 'posts' hoặc 'shared'

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
      
      // Lấy bài viết của người dùng và bài viết đã share
      const fetchUserData = async () => {
        try {
          // Lấy bài viết gốc của user
          const allPosts = await getPosts();
          const userOriginalPosts = allPosts.filter(post => post.userId === user.uid);
          setUserPosts(userOriginalPosts);

          // Lấy bài viết đã share
          const userShares = await getUserSharedPosts(user.uid);
          console.log('User shared posts:', userShares);

          // Lấy thông tin chi tiết của các bài viết đã share
          const sharedPostsDetails = [];
          for (const share of userShares) {
            const originalPost = allPosts.find(post => post.id === share.postId);
            if (originalPost) {
              sharedPostsDetails.push({
                ...originalPost,
                isShared: true,
                sharedAt: share.createdAt,
                shareId: share.id
              });
            }
          }
          setSharedPosts(sharedPostsDetails);

          // Cập nhật thống kê
          setStats({
            followers: Math.floor(Math.random() * 100), // Giả lập số liệu
            following: Math.floor(Math.random() * 50),  // Giả lập số liệu
            posts: userOriginalPosts.length
          });

          setLoading(false);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setLoading(false);
        }
      };
      
      fetchUserData();
    } else {
      setLoading(false);
      navigation.replace('Login');
    }
  }, []);

  // Lắng nghe avatar updates
  useEffect(() => {
    const handleAvatarUpdate = ({ photoURL }) => {
      console.log('ProfileScreen: Avatar updated via EventEmitter:', photoURL);
      setCurrentUser(prev => prev ? { ...prev, photoURL } : null);
    };

    const unsubscribeAvatar = EventEmitter.onAvatarUpdate(handleAvatarUpdate);

    return () => {
      unsubscribeAvatar();
    };
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
  const handleChangeAvatar = async () => {
    try {
      const { handleChangeAvatar: changeAvatar } = await import('../services/AuthService');
      const newPhotoURL = await changeAvatar();
      if (newPhotoURL) {
        // Cập nhật state ngay lập tức để UI phản hồi
        setCurrentUser(prev => ({ ...prev, photoURL: newPhotoURL }));
        console.log('Avatar updated in ProfileScreen:', newPhotoURL);
      }
      return newPhotoURL;
    } catch (error) {
      console.error('Error updating avatar in ProfileScreen:', error);
      throw error;
    }
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
              key={currentUser?.photoURL} // Force re-render khi photoURL thay đổi
              onError={e => {
                console.log('Profile avatar load error:', e.nativeEvent?.error || 'unknown image format');
                setCurrentUser(c => ({ ...c, photoURL: 'https://storage.googleapis.com/a1aa/image/e714f4c7-cbf2-454f-f364-39d492eaf9c7.jpg' }));
              }}
              onLoad={() => {
                console.log('Profile avatar loaded successfully:', currentUser?.photoURL);
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

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'posts' && styles.activeTab,
              isDark && styles.tabDark,
              activeTab === 'posts' && isDark && styles.activeTabDark
            ]}
            onPress={() => setActiveTab('posts')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'posts' && styles.activeTabText,
              isDark && styles.tabTextDark,
              activeTab === 'posts' && isDark && styles.activeTabTextDark
            ]}>
              Bài viết ({userPosts.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'shared' && styles.activeTab,
              isDark && styles.tabDark,
              activeTab === 'shared' && isDark && styles.activeTabDark
            ]}
            onPress={() => setActiveTab('shared')}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'shared' && styles.activeTabText,
              isDark && styles.tabTextDark,
              activeTab === 'shared' && isDark && styles.activeTabTextDark
            ]}>
              Đã chia sẻ ({sharedPosts.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content based on active tab */}
        {activeTab === 'posts' ? (
          // Hiển thị bài viết gốc
          userPosts.length > 0 ? (
            <FlatList
              data={userPosts}
              numColumns={3}
              scrollEnabled={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.galleryItem}
                  onPress={() => navigation.navigate('Comments', { postId: item.id })}
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
            <Text style={[styles.emptyText, isDark && styles.emptyTextDark]}>
              Bạn chưa có bài viết nào
            </Text>
          )
        ) : (
          // Hiển thị bài viết đã share
          sharedPosts.length > 0 ? (
            <FlatList
              data={sharedPosts}
              numColumns={3}
              scrollEnabled={false}
              keyExtractor={(item) => item.shareId || item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.galleryItem}
                  onPress={() => navigation.navigate('Comments', { postId: item.id })}
                >
                  <Image
                    source={{ uri: item.image || 'https://storage.googleapis.com/a1aa/image/67c7c8ae-8b93-420a-1a52-62d4ef5fc981.jpg' }}
                    style={styles.galleryImage}
                    accessibilityLabel="Ảnh bài viết đã chia sẻ"
                  />
                  {/* Indicator cho bài viết đã share */}
                  <View style={styles.shareIndicator}>
                    <Text style={styles.shareIcon}>🔁</Text>
                  </View>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <Text style={[styles.emptyText, isDark && styles.emptyTextDark]}>
                  Bạn chưa chia sẻ bài viết nào
                </Text>
              }
            />
          ) : (
            <Text style={[styles.emptyText, isDark && styles.emptyTextDark]}>
              Bạn chưa chia sẻ bài viết nào
            </Text>
          )
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
            onPress={async () => {
              toggleSideMenu();
              try {
                const newPhotoURL = await handleChangeAvatar();
                if (newPhotoURL) {
                  // Cập nhật state ngay lập tức để UI phản hồi
                  setCurrentUser(prev => ({ ...prev, photoURL: newPhotoURL }));
                  console.log('Avatar updated in ProfileScreen:', newPhotoURL);
                }
              } catch (error) {
                console.error('Error updating avatar in ProfileScreen:', error);
              }
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
