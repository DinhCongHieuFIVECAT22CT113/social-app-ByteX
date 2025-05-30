import React, { useState } from 'react';
import { View, TextInput, Button, Image, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// UpdateUserScreen.js
// Màn hình cập nhật thông tin cá nhân (displayName, bio, avatar)

export default function UpdateUserScreen({ navigation, route }) {
  const { user, onUpdate } = route.params;
  const [displayName, setDisplayName] = useState(user.displayName);
  const [bio, setBio] = useState(user.bio);
  const [avatar, setAvatar] = useState(user.avatar);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    onUpdate({ displayName, bio, avatar });
    navigation.goBack();
  };

  return (
    <View style={{ padding: 16 }}>
      <TouchableOpacity onPress={pickImage}>
        <Image source={{ uri: avatar }} style={{ width: 100, height: 100, borderRadius: 50 }} />
        <Text>Đổi Avatar</Text>
      </TouchableOpacity>
      <TextInput
        placeholder="Display Name"
        value={displayName}
        onChangeText={setDisplayName}
        style={{ borderBottomWidth: 1, marginVertical: 8 }}
      />
      <TextInput
        placeholder="Bio"
        value={bio}
        onChangeText={setBio}
        style={{ borderBottomWidth: 1, marginVertical: 8 }}
      />
      <Button title="Lưu" onPress={handleSave} />
    </View>
  );
}