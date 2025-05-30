import React from 'react';
import { View, Text, TouchableOpacity, useColorScheme } from 'react-native';
import styles from '../styles/MenuSlideStyles';

const MenuSlide = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

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

      {/* Nút Quay Lại */}
      <TouchableOpacity style={styles.backBtn}>
        <Text style={styles.backBtnText}>←</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MenuSlide;


