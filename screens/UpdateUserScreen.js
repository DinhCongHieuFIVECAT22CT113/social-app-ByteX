import React, { useState } from 'react';
import { View, TextInput, Image, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from '../styles/UpdateUserScreenStyles';
import ImageService from '../services/ImageService';
import { updateUserProfile, updateUserFirestore } from '../services/UserService';

// UpdateUserScreen.js
// Màn hình cập nhật thông tin cá nhân (displayName, bio, avatar)

export default function UpdateUserScreen({ navigation, route }) {
  const { user, onUpdate } = route.params;
  const [displayName, setDisplayName] = useState(user.displayName);
  const [bio, setBio] = useState(user.bio);
  const [avatar, setAvatar] = useState(user.avatar);
  const [saving, setSaving] = useState(false);

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

  const handleSave = async () => {
    setSaving(true);
    let photoURL = avatar;
    try {
      // Nếu avatar là local file (có dạng file://), upload lên Firebase Storage
      if (avatar && avatar.startsWith('file')) {
        photoURL = await ImageService.uploadImageAsync(avatar, `avatars/${user.uid}.jpg`);
      }
      await updateUserProfile({ displayName, photoURL });
      await updateUserFirestore(user.uid, { bio });
      onUpdate({ displayName, bio, avatar: photoURL });
      navigation.goBack();
    } catch (e) {
      alert('Cập nhật thất bại!');
    }
    setSaving(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.avatarWrapper} onPress={pickImage}>
        <Image source={{ uri: avatar }} style={styles.avatarImg} />
        <Text style={styles.changeAvatarText}>Đổi Avatar</Text>
      </TouchableOpacity>
      <TextInput
        placeholder="Display Name"
        value={displayName}
        onChangeText={setDisplayName}
        style={styles.input}
        placeholderTextColor="#9ca3af"
      />
      <TextInput
        placeholder="Bio"
        value={bio}
        onChangeText={setBio}
        style={styles.input}
        placeholderTextColor="#9ca3af"
      />
      <TouchableOpacity style={styles.saveBtn} onPress={handleSave} disabled={saving}>
        <Text style={styles.saveBtnText}>{saving ? 'Đang lưu...' : 'Lưu'}</Text>
      </TouchableOpacity>
    </View>
  );
}