import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, useColorScheme } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClock, faHeart as faHeartSolid, faCommentAlt, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

// CommentsScreen.js
// Màn hình hiển thị chi tiết comment, like, share cho một bài viết

export default function Post() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <ScrollView className={`${isDark ? 'bg-[#18181b]' : 'bg-white'} p-4 flex-1`}>
      <View className={`rounded-md p-4 space-y-4 max-w-md mx-auto w-full border ${isDark ? 'border-gray-700' : 'border-black'}`}>
        {/* Header */}
        <View className="flex flex-row items-center space-x-3">
          <View className="w-10 h-10 rounded-full border-2 border-green-500"></View>
          <View>
            <Text className={`text-base font-semibold leading-tight ${isDark ? 'text-white' : 'text-black'}`}>Tên Tài Khoản</Text>
            <View className={`${isDark ? 'bg-gray-700' : 'bg-gray-300'} flex flex-row items-center rounded-full px-3 py-1 mt-1`}>
              <FontAwesomeIcon icon={faClock} size={12} style={{ color: isDark ? 'white' : 'black', marginRight: 4 }} />
              <Text className={`text-xs ${isDark ? 'text-gray-200' : 'text-black'}`}>Thời gian đăng</Text>
            </View>
          </View>
        </View>

        {/* Image */}
        <Image
          source={{ uri: 'https://storage.googleapis.com/a1aa/image/67c7c8ae-8b93-420a-1a52-62d4ef5fc981.jpg' }}
          className="w-full h-80 rounded-2xl"
          accessibilityLabel="Square placeholder image with light gray background and rounded corners"
        />

        {/* Likes, comments, shares */}
        <View className={`flex flex-row justify-between text-green-500 text-sm font-normal`}>
          <View className="flex flex-row items-center space-x-1">
            <Text className={isDark ? 'text-green-400' : 'text-green-600'}>56</Text>
            <FontAwesomeIcon icon={faHeartRegular} size={14} style={{ color: '#22c55e' }} />
          </View>

          <View className="flex flex-row items-center space-x-1 ml-auto mr-10">
            <Text className={isDark ? 'text-gray-200' : 'text-black'}>45 Bình luận</Text>
          </View>

          <View className="flex flex-row items-center space-x-1">
            <Text className={isDark ? 'text-green-400' : 'text-green-600'}>56</Text>
            <FontAwesomeIcon icon={faShareAlt} size={14} style={{ color: '#22c55e' }} />
          </View>
        </View>

        <View className={`border-t ${isDark ? 'border-gray-700' : 'border-black'}`} />

        {/* Buttons */}
        <View className="flex flex-row justify-between space-x-2">
          <TouchableOpacity className="flex flex-row items-center justify-center space-x-2 bg-green-500 rounded-full px-5 py-2 w-28">
            <FontAwesomeIcon icon={faHeartSolid} size={14} color="white" />
            <Text className="text-white font-semibold">Thích</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex flex-row items-center justify-center space-x-2 bg-green-500 rounded-full px-5 py-2 w-36">
            <FontAwesomeIcon icon={faCommentAlt} size={14} color="white" />
            <Text className="text-white font-semibold">Bình luận</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex flex-row items-center justify-center space-x-2 bg-green-500 rounded-full px-5 py-2 w-28">
            <FontAwesomeIcon icon={faShareAlt} size={14} color="white" />
            <Text className="text-white font-semibold">Chia sẻ</Text>
          </TouchableOpacity>
        </View>

        <View className={`border-t ${isDark ? 'border-gray-700' : 'border-black'}`} />

        {/* Comments */}
        <View className="space-y-3">
          <View className="flex flex-row space-x-3">
            <Image
              source={{ uri: 'https://storage.googleapis.com/a1aa/image/22e34a68-d06c-44a0-36e7-7f85ed804684.jpg' }}
              className="w-10 h-10 rounded-full"
              accessibilityLabel="User avatar of a man with short hair and smiling face"
            />
            <View className={`${isDark ? 'bg-[#232326] border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-3 max-w-[280px]`}>
              <Text className={`text-xs leading-tight ${isDark ? 'text-gray-200' : 'text-black'}`}>
                Its great, UK is awesome, especially London. New job is good so far! How about you?
              </Text>
            </View>
          </View>

          <View className="flex flex-row space-x-3">
            <Image
              source={{ uri: 'https://storage.googleapis.com/a1aa/image/22e34a68-d06c-44a0-36e7-7f85ed804684.jpg' }}
              className="w-10 h-10 rounded-full"
              accessibilityLabel="User avatar of a man with short hair and smiling face"
            />
            <View className={`${isDark ? 'bg-[#232326] border-gray-700' : 'bg-white border-gray-200'} border rounded-xl p-3 max-w-[280px]`}>
              <Text className={`text-xs leading-tight ${isDark ? 'text-gray-200' : 'text-black'}`}>
                Its great, UK is awesome, especially London. New job is good so far! How about you?
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

