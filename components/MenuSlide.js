import React from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import styles from '../styles/MenuSlideStyles';

const MenuSlide = () => {
  // Sử dụng context theme thay vì useColorScheme
  const { isDarkMode, toggleDarkMode } = useTheme();
  const isDark = isDarkMode;

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      {/* Tài Khoản */}
      <View style={[styles.row, isDark && styles.rowDark]}>
        <Text style={[styles.label, isDark && styles.labelDark]}>Tài Khoản</Text>
        <TouchableOpacity style={[styles.btn, isDark && styles.btnDark]}>
          <Text style={[styles.btnText, isDark && styles.btnTextDark]}></Text>
        </TouchableOpacity>
      </View>

      {/* Thông Báo */}
      <View style={[styles.row, isDark && styles.rowDark]}>
        <Text style={[styles.label, isDark && styles.labelDark]}>Thông Báo</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.badge}>0</Text>
          <TouchableOpacity style={[styles.btn, isDark && styles.btnDark]}>
            <Text style={[styles.btnText, isDark && styles.btnTextDark]}></Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Yêu Thích */}
      <View style={[styles.row, isDark && styles.rowDark]}>
        <Text style={[styles.label, isDark && styles.labelDark]}>Yêu Thích</Text>
        <TouchableOpacity style={[styles.btn, isDark && styles.btnDark]}>
          <Text style={[styles.btnText, isDark && styles.btnTextDark]}></Text>
        </TouchableOpacity>
      </View>
      
      {/* Chế độ tối */}
      <View style={[styles.row, isDark && styles.rowDark]}>
        <Text style={[styles.label, isDark && styles.labelDark]}>Chế độ tối</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isDark ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleDarkMode}
          value={isDark}
        />
      </View>

      {/* Nút Quay Lại */}
      <TouchableOpacity style={styles.backBtn}>
        <Text style={styles.backBtnText}>←</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MenuSlide;


