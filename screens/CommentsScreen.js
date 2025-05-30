import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, useColorScheme } from 'react-native';
import styles from '../styles/CommentsScreenStyles';
// import Icon from 'react-native-vector-icons/FontAwesome'; // hoặc thư viện icon bạn dùng

export default function CommentsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <ScrollView style={[styles.root, isDark && styles.rootDark]}>
      <View style={[styles.card, isDark && styles.cardDark]}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={styles.avatar} />
          <View>
            <Text style={[styles.author, isDark && styles.authorDark]}>Tên Tài Khoản</Text>
            <View style={styles.timeRow}>
              {/* <Icon name="clock-o" size={12} color={isDark ? 'white' : 'black'} style={{ marginRight: 4 }} /> */}
              <Text style={[styles.timeText, isDark && styles.timeTextDark]}>Thời gian đăng</Text>
            </View>
          </View>
        </View>
        {/* Image */}
        <Image
          source={{ uri: 'https://storage.googleapis.com/a1aa/image/67c7c8ae-8b93-420a-1a52-62d4ef5fc981.jpg' }}
          style={styles.mainImg}
        />
        {/* Likes, comments, shares */}
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={isDark ? styles.green400 : styles.green600}>56</Text>
            {/* <Icon name="heart-o" size={14} color="#22c55e" /> */}
          </View>
          <View style={[styles.stat, styles.statCenter]}>
            <Text style={isDark ? styles.gray200 : styles.black}>45 Bình luận</Text>
          </View>
          <View style={styles.stat}>
            <Text style={isDark ? styles.green400 : styles.green600}>56</Text>
            {/* <Icon name="share-alt" size={14} color="#22c55e" /> */}
          </View>
        </View>
        <View style={[styles.divider, isDark && styles.dividerDark]} />
        {/* Buttons */}
        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.btn}>
            {/* <Icon name="heart" size={14} color="white" /> */}
            <Text style={styles.btnLabel}>Thích</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, styles.btnWide]}>
            {/* <Icon name="comment" size={14} color="white" /> */}
            <Text style={styles.btnLabel}>Bình luận</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            {/* <Icon name="share-alt" size={14} color="white" /> */}
            <Text style={styles.btnLabel}>Chia sẻ</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.divider, isDark && styles.dividerDark]} />
        {/* Comments */}
        <View style={styles.list}>
          <View style={styles.commentRow}>
            <Image
              source={{ uri: 'https://storage.googleapis.com/a1aa/image/22e34a68-d06c-44a0-36e7-7f85ed804684.jpg' }}
              style={styles.commentAvatar}
            />
            <View style={[styles.commentBubble, isDark && styles.commentBubbleDark]}>
              <Text style={[styles.commentText, isDark && styles.commentTextDark]}>
                Its great, UK is awesome, especially London. New job is good so far! How about you?
              </Text>
            </View>
          </View>
          <View style={styles.commentRow}>
            <Image
              source={{ uri: 'https://storage.googleapis.com/a1aa/image/22e34a68-d06c-44a0-36e7-7f85ed804684.jpg' }}
              style={styles.commentAvatar}
            />
            <View style={[styles.commentBubble, isDark && styles.commentBubbleDark]}>
              <Text style={[styles.commentText, isDark && styles.commentTextDark]}>
                Its great, UK is awesome, especially London. New job is good so far! How about you?
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

