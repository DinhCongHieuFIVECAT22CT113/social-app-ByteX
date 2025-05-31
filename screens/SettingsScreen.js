import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Switch, 
  ScrollView,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { 
  faArrowLeft, 
  faMoon, 
  faSun, 
  faMobile, 
  faUser, 
  faShield, 
  faInfoCircle 
} from '@fortawesome/free-solid-svg-icons';
import { auth } from '../config/firebaseConfig';
import { useTheme } from '../context/ThemeContext';

export default function SettingsScreen() {
  const navigation = useNavigation();
  // Sử dụng context theme thay vì useColorScheme
  const { isDarkMode, isSystemTheme, toggleDarkMode, setSystemTheme } = useTheme();
  
  // Lấy thông tin người dùng hiện tại
  const user = auth.currentUser;
  
  const handleGoBack = () => {
    navigation.goBack();
  };
  
  return (
    <View style={[styles.container, isDarkMode && styles.containerDark]}>
      {/* Header */}
      <View style={[styles.header, isDarkMode && styles.headerDark]}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <FontAwesomeIcon 
            icon={faArrowLeft} 
            size={20} 
            color={isDarkMode ? '#fff' : '#000'} 
          />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isDarkMode && styles.headerTitleDark]}>
          Cài đặt
        </Text>
      </View>
      
      <ScrollView style={styles.scrollView}>
        {/* User Info */}
        <View style={[styles.userSection, isDarkMode && styles.sectionDark]}>
          <Image 
            source={{ 
              uri: user?.photoURL || 'https://storage.googleapis.com/a1aa/image/e816601d-411b-4b99-9acc-6a92ee01e37a.jpg' 
            }} 
            style={styles.avatar} 
          />
          <View style={styles.userInfo}>
            <Text style={[styles.userName, isDarkMode && styles.textDark]}>
              {user?.displayName || 'Người dùng ByteX'}
            </Text>
            <Text style={[styles.userEmail, isDarkMode && styles.userEmailDark]}>
              {user?.email || 'Chưa đăng nhập'}
            </Text>
          </View>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => navigation.navigate('UpdateUser')}
          >
            <Text style={styles.editButtonText}>Chỉnh sửa</Text>
          </TouchableOpacity>
        </View>
        
        {/* Theme Settings */}
        <View style={[styles.section, isDarkMode && styles.sectionDark]}>
          <Text style={[styles.sectionTitle, isDarkMode && styles.textDark]}>
            Giao diện
          </Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <FontAwesomeIcon 
                icon={isDarkMode ? faMoon : faSun} 
                size={20} 
                color={isDarkMode ? '#4ade80' : '#22c55e'} 
                style={styles.settingIcon} 
              />
              <Text style={[styles.settingText, isDarkMode && styles.textDark]}>
                Chế độ tối
              </Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#4ade80" }}
              thumbColor={isDarkMode ? "#fff" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleDarkMode}
              value={isDarkMode}
            />
          </View>
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <FontAwesomeIcon 
                icon={faMobile} 
                size={20} 
                color={isDarkMode ? '#4ade80' : '#22c55e'} 
                style={styles.settingIcon} 
              />
              <Text style={[styles.settingText, isDarkMode && styles.textDark]}>
                Theo hệ thống
              </Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#4ade80" }}
              thumbColor={isSystemTheme ? "#fff" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setSystemTheme}
              value={isSystemTheme}
            />
          </View>
        </View>
        
        {/* Account Settings */}
        <View style={[styles.section, isDarkMode && styles.sectionDark]}>
          <Text style={[styles.sectionTitle, isDarkMode && styles.textDark]}>
            Tài khoản
          </Text>
          
          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <FontAwesomeIcon 
                icon={faUser} 
                size={20} 
                color={isDarkMode ? '#4ade80' : '#22c55e'} 
                style={styles.settingIcon} 
              />
              <Text style={[styles.settingText, isDarkMode && styles.textDark]}>
                Thông tin cá nhân
              </Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <FontAwesomeIcon 
                icon={faShield} 
                size={20} 
                color={isDarkMode ? '#4ade80' : '#22c55e'} 
                style={styles.settingIcon} 
              />
              <Text style={[styles.settingText, isDarkMode && styles.textDark]}>
                Bảo mật & Quyền riêng tư
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        
        {/* About */}
        <View style={[styles.section, isDarkMode && styles.sectionDark]}>
          <Text style={[styles.sectionTitle, isDarkMode && styles.textDark]}>
            Thông tin
          </Text>
          
          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <FontAwesomeIcon 
                icon={faInfoCircle} 
                size={20} 
                color={isDarkMode ? '#4ade80' : '#22c55e'} 
                style={styles.settingIcon} 
              />
              <Text style={[styles.settingText, isDarkMode && styles.textDark]}>
                Về ByteX
              </Text>
            </View>
          </TouchableOpacity>
          
          <View style={styles.versionInfo}>
            <Text style={[styles.versionText, isDarkMode && styles.versionTextDark]}>
              Phiên bản 1.0.0
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

// Các style cho màn hình SettingsScreen (Cài đặt)
const styles = StyleSheet.create({
  // Container tổng cho màn hình
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  // Nền tối
  containerDark: {
    backgroundColor: '#18181b',
  },
  // Header phía trên cùng
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 18,
    backgroundColor: '#fff',
    borderBottomWidth: 1.5,
    borderBottomColor: '#e5e7eb',
    shadowColor: '#22c55e',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  // Header dark mode
  headerDark: {
    backgroundColor: '#1f1f1f',
    borderBottomColor: '#374151',
  },
  // Nút quay lại
  backButton: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#e5e7eb',
    shadowColor: '#22c55e',
    shadowOpacity: 0.10,
    shadowRadius: 4,
    elevation: 2,
  },
  // Tiêu đề header
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginLeft: 18,
    color: '#18181b',
    letterSpacing: 0.2,
  },
  // Tiêu đề header dark mode
  headerTitleDark: {
    color: '#f3f4f6',
  },
  // ScrollView chứa nội dung
  scrollView: {
    flex: 1,
  },
  // Khu vực thông tin user
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    backgroundColor: '#fff',
    marginTop: 18,
    marginHorizontal: 18,
    borderRadius: 14,
    shadowColor: '#22c55e',
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 2,
  },
  // Khu vực section dark mode
  sectionDark: {
    backgroundColor: '#1f1f1f',
  },
  // Ảnh đại diện user
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2.5,
    borderColor: '#22c55e',
  },
  // Thông tin user (tên, email)
  userInfo: {
    flex: 1,
    marginLeft: 18,
  },
  userName: {
    fontSize: 19,
    fontWeight: '700',
    color: '#18181b',
  },
  userEmail: {
    fontSize: 15,
    color: '#6b7280',
    marginTop: 4,
  },
  userEmailDark: {
    color: '#9ca3af',
  },
  // Nút chỉnh sửa thông tin
  editButton: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 22,
    shadowColor: '#22c55e',
    shadowOpacity: 0.10,
    shadowRadius: 4,
    elevation: 2,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 0.2,
  },
  // Section cài đặt chung
  section: {
    backgroundColor: '#fff',
    marginTop: 18,
    marginHorizontal: 18,
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#22c55e',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  // Tiêu đề section
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#18181b',
    padding: 18,
    borderBottomWidth: 1.5,
    borderBottomColor: '#e5e7eb',
  },
  // Dòng cài đặt
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  // Nhóm icon + text trong dòng cài đặt
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Icon trong dòng cài đặt
  settingIcon: {
    marginRight: 14,
  },
  // Text trong dòng cài đặt
  settingText: {
    fontSize: 16,
    color: '#18181b',
    fontWeight: '600',
  },
  // Text màu sáng cho dark mode
  textDark: {
    color: '#f3f4f6',
  },
  // Khu vực thông tin phiên bản
  versionInfo: {
    padding: 18,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 15,
    color: '#6b7280',
    fontWeight: '500',
  },
  versionTextDark: {
    color: '#9ca3af',
  },
});