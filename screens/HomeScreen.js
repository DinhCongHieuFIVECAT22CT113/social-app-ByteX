import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function HomeScreen({ navigation }) {
  const [user, setUser] = useState({
    avatar: 'https://storage.googleapis.com/a1aa/image/e816601d-411b-4b99-9acc-6a92ee01e37a.jpg',
    displayName: 'Elezabeth',
    bio: 'UI/UX Designer & Cat lover',
    email: 'elezabeth@gmail.com',
  });

  return (
    <ScrollView contentContainerStyle={{ padding: 16, backgroundColor: 'white' }}>

      {/* Header */}
      <StyledView className="flex-row justify-between items-center border-b border-gray-400 pb-2">
        <StyledView className="flex-row items-center space-x-4">
          <StyledImage
            source={{ uri: user.avatar }}
            className="w-12 h-12 rounded-full border-2 border-[#2ecc40]"
            alt="User avatar"
          />
          <View>
            <StyledText className="text-sm font-semibold text-gray-900">{user.displayName}</StyledText>
            <StyledText className="text-xs text-gray-500">{user.bio}</StyledText>
            <StyledText className="text-xs text-gray-400">{user.email}</StyledText>
          </View>
        </StyledView>
        <StyledTouchableOpacity
          onPress={() =>
            navigation.navigate('UpdateUser', {
              user,
              onUpdate: (newUser) => setUser({ ...user, ...newUser }),
            })
          }
        >
          <StyledText className="text-gray-600 text-lg">✎</StyledText>
        </StyledTouchableOpacity>
      </StyledView>

      {/* Status Button */}
      <StyledView className="flex justify-center mt-4">
        <StyledTouchableOpacity className="bg-gray-300 rounded-full px-4 py-1">
          <StyledText className="text-xs text-gray-700">Chia Sẻ Trạng Thái của Bạn ....</StyledText>
        </StyledTouchableOpacity>
      </StyledView>

      {/* First Post */}
      <StyledView className="mt-6">
        <StyledView className="flex-row items-center space-x-3">
          <StyledView className="relative">
            <StyledImage
              source={{ uri: 'https://storage.googleapis.com/a1aa/image/e816601d-411b-4b99-9acc-6a92ee01e37a.jpg' }}
              className="w-10 h-10 rounded-full"
              alt="Portrait of a young woman with long blonde hair wearing a dark top"
            />
            <StyledView className="absolute bottom-0 right-0 w-3 h-3 bg-[#2ecc40] border-2 border-white rounded-full" />
          </StyledView>
          <View>
            <StyledText className="text-sm font-semibold text-gray-900">Elezabeth</StyledText>
            <StyledText className="text-xs text-gray-500">52 minute ago</StyledText>
          </View>
          <StyledTouchableOpacity className="ml-auto border border-gray-300 rounded-full px-4 py-1">
            <StyledText className="text-xs text-gray-800">Following</StyledText>
          </StyledTouchableOpacity>
        </StyledView>

        <StyledImage
          source={{ uri: 'https://storage.googleapis.com/a1aa/image/7b309b91-90ea-43b5-a9df-e825dc2e487a.jpg' }}
          className="mt-4 rounded-lg w-full h-64"
          alt="Portrait of a young woman with long blonde hair wearing a red and white striped top, looking at the camera"
          resizeMode="cover"
        />

        <StyledText className="mt-4 text-xs text-gray-500 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.
        </StyledText>

        <StyledView className="flex-row space-x-6 mt-4 text-gray-600 text-sm">
          <StyledTouchableOpacity className="flex-row items-center space-x-1">
            <StyledText>🔁</StyledText>
            <StyledText>36</StyledText>
          </StyledTouchableOpacity>
          <StyledTouchableOpacity className="flex-row items-center space-x-1">
            <StyledText>♡</StyledText>
            <StyledText>85</StyledText>
          </StyledTouchableOpacity>
          <StyledTouchableOpacity className="flex-row items-center space-x-1">
            <StyledText>💬</StyledText>
            <StyledText>12</StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </StyledView>

      {/* Second Post */}
      <StyledView className="mt-8">
        <StyledView className="flex-row items-center space-x-3">
          <StyledView className="relative">
            <StyledImage
              source={{ uri: 'https://storage.googleapis.com/a1aa/image/9dd21e1e-78f6-4d34-edcc-b8a6ebafce05.jpg' }}
              className="w-10 h-10 rounded-full"
              alt="Portrait of a man with short hair wearing a suit and tie"
            />
            <StyledView className="absolute bottom-0 right-0 w-3 h-3 bg-[#2ecc40] border-2 border-white rounded-full" />
          </StyledView>
          <View>
            <StyledText className="text-sm font-semibold text-gray-900">Tom</StyledText>
            <StyledText className="text-xs text-gray-500">1 h ago</StyledText>
          </View>
          <StyledTouchableOpacity className="ml-auto bg-[#2ecc40] rounded-full px-5 py-1">
            <StyledText className="text-xs text-white">Follow</StyledText>
          </StyledTouchableOpacity>
        </StyledView>

        <StyledText className="mt-4 text-xs text-gray-500 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.
        </StyledText>
      </StyledView>

    </ScrollView>
  );
}