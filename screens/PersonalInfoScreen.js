import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Image, Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faEdit, faUser, faEnvelope, faCalendar, faPhone } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../config/firebaseConfig';
import { getUserFirestore } from '../services/UserService';

export default function PersonalInfoScreen() {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  const isDark = isDarkMode;
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          // Lấy thông tin từ Firebase Auth
          const authInfo = {
            uid: user.uid,
            displayName: user.displayName || 'Chưa cập nhật',
            email: user.email || 'Chưa cập nhật',
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,
            creationTime: user.metadata.creationTime,
            lastSignInTime: user.metadata.lastSignInTime
          };

          // Lấy thông tin bổ sung từ Firestore
          try {
            const firestoreInfo = await getUserFirestore(user.uid);
            setUserInfo({ ...authInfo, ...firestoreInfo });
          } catch (error) {
            console.log('No additional info in Firestore:', error);
            setUserInfo(authInfo);
          }
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        Alert.alert('Lỗi', 'Không thể tải thông tin người dùng');
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const InfoRow = ({ icon, label, value, onPress }) => (
    <TouchableOpacity 
      style={[
        styles.infoRow,
        isDark && styles.infoRowDark
      ]}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.infoLeft}>
        <FontAwesomeIcon 
          icon={icon} 
          size={20} 
          color={isDark ? '#60a5fa' : '#3b82f6'} 
        />
        <Text style={[styles.infoLabel, isDark && styles.infoLabelDark]}>
          {label}
        </Text>
      </View>
      <Text style={[styles.infoValue, isDark && styles.infoValueDark]}>
        {value}
      </Text>
      {onPress && (
        <FontAwesomeIcon 
          icon={faEdit} 
          size={16} 
          color={isDark ? '#9ca3af' : '#6b7280'} 
        />
      )}
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, isDark && styles.containerDark, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={[styles.loadingText, isDark && styles.loadingTextDark]}>
          Đang tải thông tin...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, isDark && styles.containerDark]}>
      {/* Header */}
      <View style={[styles.header, isDark && styles.headerDark]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesomeIcon icon={faArrowLeft} size={20} color={isDark ? '#fff' : '#000'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isDark && styles.headerTitleDark]}>
          Thông tin cá nhân
        </Text>
        <TouchableOpacity 
          onPress={() => navigation.navigate('UpdateUser')}
          style={styles.editButton}
        >
          <FontAwesomeIcon icon={faEdit} size={20} color={isDark ? '#60a5fa' : '#3b82f6'} />
        </TouchableOpacity>
      </View>

      {/* Avatar Section */}
      <View style={[styles.avatarSection, isDark && styles.avatarSectionDark]}>
        <Image
          source={{ 
            uri: userInfo?.photoURL || 'https://storage.googleapis.com/a1aa/image/e816601d-411b-4b99-9acc-6a92ee01e37a.jpg' 
          }}
          style={styles.avatar}
        />
        <Text style={[styles.displayName, isDark && styles.displayNameDark]}>
          {userInfo?.displayName || 'Người dùng ByteX'}
        </Text>
        <Text style={[styles.email, isDark && styles.emailDark]}>
          {userInfo?.email || 'Chưa cập nhật email'}
        </Text>
      </View>

      {/* Info Section */}
      <View style={[styles.infoSection, isDark && styles.infoSectionDark]}>
        <InfoRow
          icon={faUser}
          label="Tên hiển thị"
          value={userInfo?.displayName || 'Chưa cập nhật'}
          onPress={() => navigation.navigate('UpdateUser')}
        />
        
        <InfoRow
          icon={faEnvelope}
          label="Email"
          value={userInfo?.email || 'Chưa cập nhật'}
        />
        
        <InfoRow
          icon={faCalendar}
          label="Ngày tạo tài khoản"
          value={userInfo?.creationTime ? new Date(userInfo.creationTime).toLocaleDateString('vi-VN') : 'Không xác định'}
        />
        
        <InfoRow
          icon={faCalendar}
          label="Đăng nhập lần cuối"
          value={userInfo?.lastSignInTime ? new Date(userInfo.lastSignInTime).toLocaleDateString('vi-VN') : 'Không xác định'}
        />

        {userInfo?.bio && (
          <InfoRow
            icon={faUser}
            label="Tiểu sử"
            value={userInfo.bio}
            onPress={() => navigation.navigate('UpdateUser')}
          />
        )}
      </View>

      {/* Stats Section */}
      <View style={[styles.statsSection, isDark && styles.statsSectionDark]}>
        <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
          Thống kê
        </Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, isDark && styles.statNumberDark]}>
              {userInfo?.postsCount || 0}
            </Text>
            <Text style={[styles.statLabel, isDark && styles.statLabelDark]}>
              Bài viết
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, isDark && styles.statNumberDark]}>
              {userInfo?.likesCount || 0}
            </Text>
            <Text style={[styles.statLabel, isDark && styles.statLabelDark]}>
              Lượt thích
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, isDark && styles.statNumberDark]}>
              {userInfo?.commentsCount || 0}
            </Text>
            <Text style={[styles.statLabel, isDark && styles.statLabelDark]}>
              Bình luận
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerDark: {
    backgroundColor: '#18181b',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerDark: {
    borderBottomColor: '#374151',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  headerTitleDark: {
    color: '#fff',
  },
  editButton: {
    padding: 8,
  },
  avatarSection: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f9fafb',
  },
  avatarSectionDark: {
    backgroundColor: '#1f2937',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  displayName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  displayNameDark: {
    color: '#fff',
  },
  email: {
    fontSize: 16,
    color: '#6b7280',
  },
  emailDark: {
    color: '#9ca3af',
  },
  infoSection: {
    padding: 16,
  },
  infoSectionDark: {
    backgroundColor: '#18181b',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 8,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
  },
  infoRowDark: {
    backgroundColor: '#1f2937',
  },
  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoLabel: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 12,
    fontWeight: '500',
  },
  infoLabelDark: {
    color: '#d1d5db',
  },
  infoValue: {
    fontSize: 16,
    color: '#6b7280',
    flex: 2,
    textAlign: 'right',
    marginRight: 8,
  },
  infoValueDark: {
    color: '#9ca3af',
  },
  statsSection: {
    padding: 16,
    backgroundColor: '#f9fafb',
    margin: 16,
    borderRadius: 12,
  },
  statsSectionDark: {
    backgroundColor: '#1f2937',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  sectionTitleDark: {
    color: '#fff',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  statNumberDark: {
    color: '#60a5fa',
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  statLabelDark: {
    color: '#9ca3af',
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280',
  },
  loadingTextDark: {
    color: '#9ca3af',
  },
};
