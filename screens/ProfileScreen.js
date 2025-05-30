import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, useColorScheme } from 'react-native';
import { styled } from 'nativewind';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faChevronRight, faCommentAlt } from '@fortawesome/free-solid-svg-icons';

// ProfileScreen.js
// Màn hình trang cá nhân người dùng, hiển thị thông tin, ảnh, follower, following

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <ScrollView className={`${isDark ? 'bg-[#18181b]' : 'bg-white'} flex-1 p-4`}>
      {/* Header */}
      <StyledView className="flex-row items-center justify-between mb-6">
        <StyledTouchableOpacity className="bg-gradient-to-b from-[#3EDB5B] to-[#1DBA3B] p-3 rounded-lg shadow-md">
          <FontAwesomeIcon icon={faArrowLeft} style={{ color: 'white', fontSize: 20 }} />
        </StyledTouchableOpacity>
        <StyledText className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Trang cá nhân</StyledText>
        <StyledTouchableOpacity className={`w-8 h-8 rounded-full border ${isDark ? 'border-gray-700' : 'border-gray-300'} flex items-center justify-center`}>
          <FontAwesomeIcon icon={faChevronRight} style={{ color: isDark ? '#d1d5db' : '#4B5563', fontSize: 16 }} />
        </StyledTouchableOpacity>
      </StyledView>

      {/* Profile Image and Info */}
      <StyledView className="flex-col items-center mb-6">
        <StyledView className="rounded-full border-2 border-[#3EDB5B] p-[2px] mb-3">
          <StyledImage
            source={{ uri: 'https://storage.googleapis.com/a1aa/image/e714f4c7-cbf2-454f-f364-39d492eaf9c7.jpg' }}
            className="w-28 h-28 rounded-full"
            accessibilityLabel="Headshot of a smiling man with short dark hair wearing a black shirt, circular crop"
          />
        </StyledView>
        <StyledText className={`font-semibold text-base mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>Tên Tài Khoản</StyledText>
        <StyledText className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>Email@gmail.com</StyledText>
      </StyledView>

      {/* Buttons */}
      <StyledView className="flex-row justify-center space-x-3 mb-6">
        <StyledTouchableOpacity className={`flex-row items-center space-x-2 border rounded-full px-4 py-2 ${isDark ? 'border-gray-700' : 'border-gray-300'}`}>
          <FontAwesomeIcon icon={faCommentAlt} style={{ color: isDark ? '#d1d5db' : '#374151', fontSize: 16 }} />
          <StyledText className={`text-sm ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>Trò chuyện</StyledText>
        </StyledTouchableOpacity>
        <StyledTouchableOpacity className="bg-gradient-to-b from-[#3EDB5B] to-[#1DBA3B] rounded-full px-5 py-2">
          <StyledText className="text-white text-sm font-semibold">Theo Dõi</StyledText>
        </StyledTouchableOpacity>
      </StyledView>

      {/* Stats */}
      <StyledView className="flex-row justify-between mb-6">
        <StyledView className={`flex-col items-center border rounded-lg w-1/3 py-4 mx-1 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <StyledText className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>6.3k</StyledText>
          <StyledText className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>Followers</StyledText>
        </StyledView>
        <StyledView className={`flex-col items-center border rounded-lg w-1/3 py-4 mx-1 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <StyledText className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>572</StyledText>
          <StyledText className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>Post</StyledText>
        </StyledView>
        <StyledView className={`flex-col items-center border rounded-lg w-1/3 py-4 mx-1 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <StyledText className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>2.5k</StyledText>
          <StyledText className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>Following</StyledText>
        </StyledView>
      </StyledView>

      <StyledView className={`border-b mb-6 ${isDark ? 'border-gray-700' : 'border-gray-200'}`} />

      {/* Image Gallery */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row space-x-4 pb-2">
        <StyledImage
          source={{ uri: 'https://storage.googleapis.com/a1aa/image/3b64246d-2368-4bab-5a46-53078d1d10d7.jpg' }}
          className="w-24 h-28 rounded-lg"
          accessibilityLabel="Portrait of a smiling man with short dark hair wearing a dark shirt, rectangular crop"
        />
        <StyledImage
          source={{ uri: 'https://storage.googleapis.com/a1aa/image/aafb1560-d2af-49ff-4e8f-4817b52d9a3c.jpg' }}
          className="w-24 h-28 rounded-lg"
          accessibilityLabel="Side profile of a man with short dark hair wearing sunglasses and a green jacket, rectangular crop"
        />
        <StyledImage
          source={{ uri: 'https://storage.googleapis.com/a1aa/image/b702c87b-bf9e-4f9b-7d23-67d57b4a5bd9.jpg' }}
          className="w-24 h-28 rounded-lg"
          accessibilityLabel="Man with short dark hair wearing sunglasses and a blue jacket, rectangular crop"
        />
      </ScrollView>
    </ScrollView>
  );
}
