import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
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
  return (
    <ScrollView className="bg-white flex-1 p-4">
      {/* Header */}
      <View className="flex-row items-center mb-4 space-x-4">
        <TouchableOpacity className="w-10 h-10 rounded-lg bg-green-500 justify-center items-center">
          <FontAwesomeIcon icon={faArrowLeft} size={16} color="white" />
        </TouchableOpacity>
        <Text className="text-base font-normal text-black">Tạo bài viết</Text>
        <TouchableOpacity className="ml-auto bg-green-500 px-4 py-2 rounded-full">
          <Text className="text-white text-sm font-semibold">Đăng bài</Text>
        </TouchableOpacity>
      </View>

      <View className="border-b border-black border-opacity-30 mb-4" />

      {/* User info and post input */}
      <View className="flex-row space-x-4 mb-4">
        <View className="w-12 h-12 rounded-full border-2 border-green-500" />
        <View className="flex-1">
          <Text className="text-sm font-normal text-black mb-2">Tên Tài Khoản</Text>
          <View className="flex-row flex-wrap mb-2 space-x-2">
            <TouchableOpacity className="flex-row items-center bg-gray-300 rounded-full px-3 py-1">
              <FontAwesomeIcon icon={faUserFriends} size={12} color="black" />
              <Text className="text-xs font-normal text-black ml-1">Bạn bè</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center bg-gray-300 rounded-full px-3 py-1">
              <Text className="text-xs font-normal text-black">+ Album</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity className="flex-row items-center bg-gray-300 rounded-full px-3 py-1">
            <FontAwesomeIcon icon={faClock} size={12} color="black" />
            <Text className="text-xs font-normal text-black ml-1">Thời gian đăng</Text>
          </TouchableOpacity>
          <Text className="mt-3 text-lg font-normal text-black">
            Bạn đang nghĩ gì ....
          </Text>
        </View>
      </View>

      <View className="border-b border-black border-opacity-30 mb-4" />

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
