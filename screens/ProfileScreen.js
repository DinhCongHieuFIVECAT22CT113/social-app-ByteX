import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, useColorScheme } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faChevronRight, faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/ProfileScreenStyles';

// ProfileScreen.js
// Màn hình trang cá nhân người dùng, hiển thị thông tin, ảnh, follower, following

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <ScrollView style={[styles.root, isDark ? styles.rootDark : styles.rootLight]}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.headerBtn}>
          <FontAwesomeIcon icon={faArrowLeft} size={20} color="white" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isDark && styles.headerTitleDark]}>Trang cá nhân</Text>
        <TouchableOpacity style={[
          styles.headerIconBtn,
          isDark ? styles.headerIconBtnDark : styles.headerIconBtnLight
        ]}>
          <FontAwesomeIcon icon={faChevronRight} size={16} color={isDark ? '#d1d5db' : '#4B5563'} />
        </TouchableOpacity>
      </View>

      {/* Profile Image and Info */}
      <View style={styles.profileInfo}>
        <View style={styles.profileAvatarBorder}>
          <Image
            source={{ uri: 'https://storage.googleapis.com/a1aa/image/e714f4c7-cbf2-454f-f364-39d492eaf9c7.jpg' }}
            style={styles.profileAvatar}
            accessibilityLabel="Headshot of a smiling man with short dark hair wearing a black shirt, circular crop"
          />
        </View>
        <Text style={[styles.profileName, isDark && styles.profileNameDark]}>Tên Tài Khoản</Text>
        <Text style={styles.profileEmail}>Email@gmail.com</Text>
      </View>

      {/* Buttons */}
      <View style={styles.btnRow}>
        <TouchableOpacity style={[
          styles.chatBtn,
          isDark ? styles.chatBtnDark : styles.chatBtnLight
        ]}>
          <FontAwesomeIcon icon={faCommentAlt} size={16} color={isDark ? '#d1d5db' : '#374151'} />
          <Text style={[styles.chatBtnText, isDark && styles.chatBtnTextDark]}>Trò chuyện</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.followBtn}>
          <Text style={styles.followBtnText}>Theo Dõi</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={[
          styles.statBox,
          isDark ? styles.statBoxDark : styles.statBoxLight
        ]}>
          <Text style={[styles.statNumber, isDark && styles.statNumberDark]}>6.3k</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={[
          styles.statBox,
          isDark ? styles.statBoxDark : styles.statBoxLight
        ]}>
          <Text style={[styles.statNumber, isDark && styles.statNumberDark]}>572</Text>
          <Text style={styles.statLabel}>Post</Text>
        </View>
        <View style={[
          styles.statBox,
          isDark ? styles.statBoxDark : styles.statBoxLight
        ]}>
          <Text style={[styles.statNumber, isDark && styles.statNumberDark]}>2.5k</Text>
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
          accessibilityLabel="Portrait of a smiling man with short dark hair wearing a dark shirt, rectangular crop"
        />
        <Image
          source={{ uri: 'https://storage.googleapis.com/a1aa/image/aafb1560-d2af-49ff-4e8f-4817b52d9a3c.jpg' }}
          style={styles.galleryImage}
          accessibilityLabel="Side profile of a man with short dark hair wearing sunglasses and a green jacket, rectangular crop"
        />
        <Image
          source={{ uri: 'https://storage.googleapis.com/a1aa/image/b702c87b-bf9e-4f9b-7d23-67d57b4a5bd9.jpg' }}
          style={styles.galleryImage}
          accessibilityLabel="Man with short dark hair wearing sunglasses and a blue jacket, rectangular crop"
        />
      </ScrollView>
    </ScrollView>
  );
}
