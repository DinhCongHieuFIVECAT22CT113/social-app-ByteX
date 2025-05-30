import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, useColorScheme } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faUserFriends,
  faClock,
  faCamera,
  faUserPlus,
  faSmile,
  faMapMarkerAlt,
  faVideo,
  faTh,
} from '@fortawesome/free-solid-svg-icons';

export default function CreatePost() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <ScrollView className={`${isDark ? 'bg-[#18181b]' : 'bg-white'} flex-1 p-4`}>
      {/* Header */}
      <View className="flex-row items-center mb-4 space-x-4">
        <TouchableOpacity className="w-10 h-10 rounded-lg bg-green-500 justify-center items-center">
          <FontAwesomeIcon icon={faArrowLeft} size={16} color="white" />
        </TouchableOpacity>
        <Text className={`text-base font-normal ${isDark ? 'text-white' : 'text-black'}`}>Tạo bài viết</Text>
        <TouchableOpacity className="ml-auto bg-green-500 px-4 py-2 rounded-full">
          <Text className="text-white text-sm font-semibold">Đăng bài</Text>
        </TouchableOpacity>
      </View>

      <View className={`border-b mb-4 ${isDark ? 'border-gray-700' : 'border-black border-opacity-30'}`} />

      {/* User info and post input */}
      <View className="flex-row space-x-4 mb-4">
        <View className="w-12 h-12 rounded-full border-2 border-green-500" />
        <View className="flex-1">
          <Text className={`text-sm font-normal mb-2 ${isDark ? 'text-white' : 'text-black'}`}>Tên Tài Khoản</Text>
          <View className="flex-row flex-wrap mb-2 space-x-2">
            <TouchableOpacity className={`${isDark ? 'bg-gray-700' : 'bg-gray-300'} flex-row items-center rounded-full px-3 py-1`}>
              <FontAwesomeIcon icon={faUserFriends} size={12} color={isDark ? "white" : "black"} />
              <Text className={`text-xs font-normal ml-1 ${isDark ? 'text-white' : 'text-black'}`}>Bạn bè</Text>
            </TouchableOpacity>
            <TouchableOpacity className={`${isDark ? 'bg-gray-700' : 'bg-gray-300'} flex-row items-center rounded-full px-3 py-1`}>
              <Text className={`text-xs font-normal ${isDark ? 'text-white' : 'text-black'}`}>+ Album</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity className={`${isDark ? 'bg-gray-700' : 'bg-gray-300'} flex-row items-center rounded-full px-3 py-1`}>
            <FontAwesomeIcon icon={faClock} size={12} color={isDark ? "white" : "black"} />
            <Text className={`text-xs font-normal ml-1 ${isDark ? 'text-white' : 'text-black'}`}>Thời gian đăng</Text>
          </TouchableOpacity>
          <Text className={`mt-3 text-lg font-normal ${isDark ? 'text-gray-200' : 'text-black'}`}>
            Bạn đang nghĩ gì ....
          </Text>
        </View>
      </View>

      <View className={`border-b mb-4 ${isDark ? 'border-gray-700' : 'border-black border-opacity-30'}`} />

      {/* Buttons group */}
      <View className="space-y-3 max-w-max">
        <TouchableOpacity className="flex-row items-center bg-green-500 rounded-full px-4 py-2">
          <FontAwesomeIcon icon={faCamera} size={14} color="white" />
          <Text className="text-white text-xs font-semibold ml-2">Ảnh/Video</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center bg-green-500 rounded-full px-4 py-2">
          <FontAwesomeIcon icon={faUserPlus} size={14} color="white" />
          <Text className="text-white text-xs font-semibold ml-2">Gắn thẻ người khác</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center bg-green-500 rounded-full px-4 py-2">
          <FontAwesomeIcon icon={faSmile} size={14} color="white" />
          <Text className="text-white text-xs font-semibold ml-2">Cảm xúc/hoạt động</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center bg-green-500 rounded-full px-4 py-2">
          <FontAwesomeIcon icon={faMapMarkerAlt} size={14} color="white" />
          <Text className="text-white text-xs font-semibold ml-2">Checkin</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center bg-green-500 rounded-full px-4 py-2">
          <FontAwesomeIcon icon={faVideo} size={14} color="white" />
          <Text className="text-white text-xs font-semibold ml-2">Video trực tiếp</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center bg-green-500 rounded-full px-4 py-2">
          <FontAwesomeIcon icon={faTh} size={14} color="white" />
          <Text className="text-white text-xs font-semibold ml-2">Màu nền</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row items-center bg-green-500 rounded-full px-4 py-2">
          <FontAwesomeIcon icon={faCamera} size={14} color="white" />
          <Text className="text-white text-xs font-semibold ml-2">Camera</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
