import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import styles from '../styles/MenuFunctionStyles';

const MenuFunction = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <View style={[styles.menuRoot, isDarkMode && styles.menuRootDark]}>
      {/* Danh Sách Bài Đăng */}
      <View style={[styles.menuRow, isDarkMode && styles.menuRowDark]}>
        <Text style={[styles.menuLabel, isDarkMode && styles.menuLabelDark]}>Danh Sách Bài Đăng</Text>
        <TouchableOpacity style={styles.menuBtn} />
      </View>
      {/* Thay Ảnh Avatar */}
      <View style={[styles.menuRow, isDarkMode && styles.menuRowDark]}>
        <Text style={[styles.menuLabel, isDarkMode && styles.menuLabelDark]}>Thay Ảnh Avatar</Text>
        <TouchableOpacity style={styles.menuBtn} />
      </View>
      {/* Chế Độ Sáng/Tối */}
      <View style={[styles.menuRow, isDarkMode && styles.menuRowDark]}>
        <Text style={[styles.menuLabel, isDarkMode && styles.menuLabelDark]}>Chế Độ Sáng/Tối</Text>
        <Switch
          value={isDarkMode}
          onValueChange={() => setIsDarkMode(v => !v)}
          style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
        />
      </View>
      {/* Nút Đăng Xuất */}
      <TouchableOpacity style={styles.menuLogout}>
        <Text style={styles.menuLogoutText}>Đăng Xuất</Text>
      </TouchableOpacity>
      {/* Nút Quay Lại */}
      <TouchableOpacity style={[styles.menuBack, isDarkMode && styles.menuBackDark]}>
        <Text style={[styles.menuBackText, isDarkMode && styles.menuBackTextDark]}>←</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MenuFunction;


