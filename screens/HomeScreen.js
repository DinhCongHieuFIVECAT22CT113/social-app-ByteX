import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { styled } from 'nativewind';
import { getPostsPaginated } from '../services/PostService';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

const PAGE_SIZE = 5;

export default function HomeScreen() {
  const [posts, setPosts] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [noMore, setNoMore] = useState(false);

  useEffect(() => {
    loadMorePosts();
  }, []);

  const loadMorePosts = async () => {
    if (loading || noMore) return;
    setLoading(true);
    setTimeout(async () => {
      const { posts: newPosts, lastVisible } = await getPostsPaginated(PAGE_SIZE, lastDoc);
      if (newPosts.length === 0) setNoMore(true);
      setPosts(prev => [...prev, ...newPosts]);
      setLastDoc(lastVisible);
      setLoading(false);
    }, 1000); // Fake delay 1s
  };

  const renderItem = ({ item }) => (
    <StyledView className="mt-6 bg-white rounded-lg shadow p-4">
      <StyledView className="flex-row items-center space-x-3">
        <StyledView className="relative">
          <StyledImage
            source={{ uri: item.avatar || 'https://storage.googleapis.com/a1aa/image/e816601d-411b-4b99-9acc-6a92ee01e37a.jpg' }}
            className="w-10 h-10 rounded-full"
          />
          <StyledView className="absolute bottom-0 right-0 w-3 h-3 bg-[#2ecc40] border-2 border-white rounded-full" />
        </StyledView>
        <View>
          <StyledText className="text-sm font-semibold text-gray-900">{item.author || 'Tên Tài Khoản'}</StyledText>
          <StyledText className="text-xs text-gray-500">
            {item.createdAt ? new Date(item.createdAt).toLocaleString() : ''}
          </StyledText>
        </View>
        <StyledTouchableOpacity className="ml-auto border border-gray-300 rounded-full px-4 py-1">
          <StyledText className="text-xs text-gray-800">Following</StyledText>
        </StyledTouchableOpacity>
      </StyledView>

      {item.image && (
        <StyledImage
          source={{ uri: item.image }}
          className="mt-4 rounded-lg w-full h-64"
          resizeMode="cover"
        />
      )}

      <StyledText className="mt-4 text-xs text-gray-500 leading-relaxed">
        {item.content || ''}
      </StyledText>

      <StyledView className="flex-row space-x-6 mt-4 text-gray-600 text-sm">
        <StyledTouchableOpacity className="flex-row items-center space-x-1">
          <StyledText>🔁</StyledText>
          <StyledText>{item.shares || 0}</StyledText>
        </StyledTouchableOpacity>
        <StyledTouchableOpacity className="flex-row items-center space-x-1">
          <StyledText>♡</StyledText>
          <StyledText>{item.likes || 0}</StyledText>
        </StyledTouchableOpacity>
        <StyledTouchableOpacity className="flex-row items-center space-x-1">
          <StyledText>💬</StyledText>
          <StyledText>{item.comments || 0}</StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    </StyledView>
  );

  return (
    <FlatList
      data={posts}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 16, backgroundColor: 'white' }}
      onEndReached={loadMorePosts}
      onEndReachedThreshold={0.2}
      ListHeaderComponent={
        <>
          {/* Header */}
          <StyledView className="flex-row justify-between items-center border-b border-gray-400 pb-2">
            <StyledView className="flex-row items-center space-x-4">
              <StyledView className="w-12 h-12 rounded-full border-2 border-[#2ecc40]" />
              <View>
                <StyledText className="text-sm text-gray-900">Tên Tài Khoản</StyledText>
                <StyledText className="text-xs text-gray-500">Email@gmail.com</StyledText>
              </View>
            </StyledView>
            <StyledTouchableOpacity>
              <StyledText className="text-gray-600 text-lg">›</StyledText>
            </StyledTouchableOpacity>
          </StyledView>

          {/* Status Button */}
          <StyledView className="flex justify-center mt-4">
            <StyledTouchableOpacity className="bg-gray-300 rounded-full px-4 py-1">
              <StyledText className="text-xs text-gray-700">Chia Sẻ Trạng Thái của Bạn ....</StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </>
      }
      ListFooterComponent={loading ? <ActivityIndicator size="small" /> : null}
    />
  );
}