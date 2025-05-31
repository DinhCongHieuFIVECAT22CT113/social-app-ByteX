import React, { useState, useEffect } from 'react';
import { 
  View, 
  TextInput, 
  Image, 
  TouchableOpacity, 
  Text, 
  ActivityIndicator, 
  Alert,
  ScrollView,
  StatusBar
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import * as ImagePicker from 'expo-image-picker';
import styles from '../styles/UpdateUserScreenStyles';
import ImageService from '../services/ImageService';
import { updateUserProfile, updateUserFirestore, getUserFirestore } from '../services/UserService';
import { auth } from '../config/firebaseConfig';
import EventEmitter from '../utils/EventEmitter';

// UpdateUserScreen.js
// Màn hình cập nhật thông tin cá nhân (displayName, bio, avatar)

export default function UpdateUserScreen({ navigation, route }) {
  const { user, onUpdate } = route?.params || {};
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useTheme();
  const isDark = isDarkMode;

  useEffect(() => {
    // If user is passed via route params, use that
    if (user) {
      setDisplayName(user.displayName || '');
      setBio(user.bio || '');
      setAvatar(user.avatar || '');
      setLoading(false);
    } else {
      // Otherwise get current user from Firebase Auth
      const currentUser = auth.currentUser;
      if (currentUser) {
        setDisplayName(currentUser.displayName || '');
        setAvatar(currentUser.photoURL || '');
        
        // Try to get bio from Firestore if available
        const loadBio = async () => {
          try {
            const firestoreData = await getUserFirestore(currentUser.uid);
            if (firestoreData && firestoreData.bio) {
              setBio(firestoreData.bio);
              console.log('Bio loaded from Firestore:', firestoreData.bio);
            }
          } catch (error) {
            console.log('Error loading bio from Firestore:', error);
          }
        };

        loadBio();
        setLoading(false);
      } else {
        // No user logged in
        Alert.alert(
          "Lỗi đăng nhập",
          "Bạn cần đăng nhập để cập nhật thông tin cá nhân.",
          [{ text: "OK", onPress: () => navigation.replace('Login') }]
        );
      }
    }
  }, [user]);

  const pickImage = async () => {
    try {
      // Request permission first
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Cần quyền truy cập', 'Ứng dụng cần quyền truy cập thư viện ảnh để chọn avatar.');
        return;
      }

      // Thử nhiều cách khác nhau để tránh lỗi deprecated
      let mediaTypes;
      try {
        // Thử cách mới trước
        mediaTypes = [ImagePicker.MediaType.Images];
      } catch (e) {
        try {
          // Fallback về cách cũ
          mediaTypes = ImagePicker.MediaTypeOptions.Images;
        } catch (e2) {
          // Fallback cuối cùng
          mediaTypes = 'Images';
        }
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: mediaTypes,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5, // Giảm quality để base64 nhỏ hơn
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setAvatar(result.assets[0].uri);
        setError(''); // Clear any previous errors
      }
    } catch (err) {
      setError('Không thể chọn ảnh. Vui lòng thử lại.');
      console.error('Error picking image:', err);
    }
  };

  const validateForm = () => {
    if (!displayName.trim()) {
      setError('Tên hiển thị không được để trống');
      return false;
    }
    
    if (displayName.length > 30) {
      setError('Tên hiển thị không được quá 30 ký tự');
      return false;
    }
    
    if (bio && bio.length > 150) {
      setError('Bio không được quá 150 ký tự');
      return false;
    }
    
    setError('');
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setSaving(true);
    setError('');
    let photoURL = avatar;
    
    try {
      const currentUser = user || auth.currentUser;
      if (!currentUser) {
        throw new Error('Không tìm thấy thông tin người dùng');
      }
      
      console.log('Starting user profile update...');

      // Nếu avatar là local file (có dạng file://), upload lên Supabase Storage
      if (avatar && avatar.startsWith('file')) {
        console.log('Uploading new avatar...');
        photoURL = await ImageService.uploadImageAsync(avatar, `avatars/${currentUser.uid}_${Date.now()}.jpg`);
        console.log('Avatar uploaded:', photoURL);
      }

      // Cập nhật đồng thời Auth và Firestore
      await Promise.all([
        updateUserProfile({ displayName, photoURL }),
        updateUserFirestore(currentUser.uid, {
          bio,
          avatar: photoURL,
          photoURL: photoURL, // Đồng bộ cả 2 field
          displayName: displayName,
          updatedAt: Date.now()
        })
      ]);

      // Reload user để đồng bộ dữ liệu
      await currentUser.reload();

      // Cập nhật state ngay lập tức để UI phản hồi
      setAvatar(photoURL);

      // Force re-render bằng cách clear và set lại avatar
      setTimeout(() => {
        setAvatar(photoURL);
      }, 100);

      // Broadcast avatar update để đồng bộ tất cả components
      EventEmitter.emitAvatarUpdate(photoURL);

      console.log('User profile updated successfully. New avatar URL:', photoURL);
      
      Alert.alert(
        "Thành công", 
        "Thông tin cá nhân đã được cập nhật",
        [{ text: "OK", onPress: () => {
          if (onUpdate) {
            onUpdate({ displayName, bio, avatar: photoURL, photoURL });
          }
          navigation.goBack();
        }}]
      );
    } catch (e) {
      console.error('Update error:', e);
      setError('Cập nhật thất bại! ' + (e.message || ''));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}> 
        <ActivityIndicator size="large" color="#22c55e" />
        <Text style={{ marginTop: 10, color: isDark ? '#fff' : '#000' }}>Đang tải thông tin...</Text>
      </View>
    );
  }

  // Fallback ảnh mặc định nếu avatar lỗi
  const handleAvatarError = (error) => {
    console.log('Avatar error in UpdateUserScreen:', error.nativeEvent?.error);
    console.log('Failed avatar URL:', avatar);

    // Chỉ fallback nếu không phải là URL Supabase
    if (!avatar?.includes('supabase.co')) {
      setAvatar('https://storage.googleapis.com/a1aa/image/e816601d-411b-4b99-9acc-6a92ee01e37a.jpg');
      setError('Không thể tải ảnh avatar. Đã dùng ảnh mặc định.');
    }
  };

  return (
    <ScrollView 
      style={{ 
        flex: 1, 
        backgroundColor: isDark ? '#121212' : '#f5f5f5' 
      }}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      <View style={[styles.container, isDark && { backgroundColor: '#121212' }]}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Text style={{ color: isDark ? '#fff' : '#000', fontSize: 18 }}>←</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: isDark ? '#fff' : '#000' }]}>
            Cập nhật thông tin
          </Text>
          <View style={{ width: 40 }} />
        </View>
        
        <TouchableOpacity 
          style={[styles.avatarWrapper, { borderColor: isDark ? '#333' : '#e5e7eb' }]} 
          onPress={pickImage}
        >
          {avatar ? (
            <Image
              source={{ uri: avatar }}
              style={styles.avatarImg}
              onError={handleAvatarError}
              key={avatar} // Force re-render khi avatar URL thay đổi
              onLoad={() => {
                console.log('Avatar loaded successfully in UpdateUserScreen:', avatar);
                console.log('Avatar state updated at:', new Date().toISOString());
              }}
            />
          ) : null}
          {!avatar && (
            <View style={[styles.avatarImg, { backgroundColor: '#d1d5db', justifyContent: 'center', alignItems: 'center' }]}> 
              <Text style={{ fontSize: 40, color: '#6b7280' }}>?</Text>
            </View>
          )}
          <View style={[
            styles.changeAvatarButton, 
            { backgroundColor: isDark ? '#333' : '#fff' }
          ]}>
            <Text style={[
              styles.changeAvatarText, 
              { color: isDark ? '#fff' : '#000' }
            ]}>
              Đổi Avatar
            </Text>
          </View>
        </TouchableOpacity>
        
        <Text style={[styles.label, { color: isDark ? '#d1d5db' : '#4b5563' }]}>Tên hiển thị</Text>
        <TextInput
          placeholder="Nhập tên hiển thị của bạn"
          value={displayName}
          onChangeText={setDisplayName}
          style={[
            styles.input, 
            isDark && { 
              backgroundColor: '#1f1f1f', 
              color: '#fff',
              borderColor: '#333' 
            }
          ]}
          placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
        />
        
        <Text style={[styles.label, { color: isDark ? '#d1d5db' : '#4b5563' }]}>Bio</Text>
        <TextInput
          placeholder="Giới thiệu ngắn về bạn"
          value={bio}
          onChangeText={setBio}
          style={[
            styles.input, 
            styles.bioInput,
            isDark && { 
              backgroundColor: '#1f1f1f', 
              color: '#fff',
              borderColor: '#333' 
            }
          ]}
          multiline
          numberOfLines={3}
          placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
        />
        
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : null}
        
        <TouchableOpacity 
          style={[styles.saveBtn, (saving || loading) && styles.saveBtnDisabled]} 
          onPress={handleSave} 
          disabled={saving || loading}
        >
          {saving ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.saveBtnText}>Lưu thông tin</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}