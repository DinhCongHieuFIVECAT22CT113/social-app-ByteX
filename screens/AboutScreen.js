import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Image, Linking
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { 
  faArrowLeft, faGlobe, faEnvelope, faPhone, 
  faMapMarkerAlt, faHeart, faCode, faUsers 
} from '@fortawesome/free-solid-svg-icons';

export default function AboutScreen() {
  const navigation = useNavigation();
  const { isDarkMode } = useTheme();
  const isDark = isDarkMode;

  const handleLinkPress = (url) => {
    Linking.openURL(url).catch(err => console.error('Error opening link:', err));
  };

  const FeatureCard = ({ icon, title, description }) => (
    <View style={[styles.featureCard, isDark && styles.featureCardDark]}>
      <FontAwesomeIcon 
        icon={icon} 
        size={24} 
        color={isDark ? '#60a5fa' : '#3b82f6'} 
        style={styles.featureIcon}
      />
      <Text style={[styles.featureTitle, isDark && styles.featureTitleDark]}>
        {title}
      </Text>
      <Text style={[styles.featureDescription, isDark && styles.featureDescriptionDark]}>
        {description}
      </Text>
    </View>
  );

  const ContactRow = ({ icon, label, value, onPress }) => (
    <TouchableOpacity 
      style={[styles.contactRow, isDark && styles.contactRowDark]}
      onPress={onPress}
    >
      <FontAwesomeIcon 
        icon={icon} 
        size={20} 
        color={isDark ? '#60a5fa' : '#3b82f6'} 
      />
      <View style={styles.contactInfo}>
        <Text style={[styles.contactLabel, isDark && styles.contactLabelDark]}>
          {label}
        </Text>
        <Text style={[styles.contactValue, isDark && styles.contactValueDark]}>
          {value}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={[styles.container, isDark && styles.containerDark]}>
      {/* Header */}
      <View style={[styles.header, isDark && styles.headerDark]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesomeIcon icon={faArrowLeft} size={20} color={isDark ? '#fff' : '#000'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isDark && styles.headerTitleDark]}>
          Về ByteX
        </Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Logo Section */}
      <View style={[styles.logoSection, isDark && styles.logoSectionDark]}>
        <Image
          source={require('../assets/logobytex-2.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={[styles.appName, isDark && styles.appNameDark]}>
          ByteX Social
        </Text>
        <Text style={[styles.version, isDark && styles.versionDark]}>
          Phiên bản 1.0.0
        </Text>
      </View>

      {/* Description */}
      <View style={[styles.descriptionSection, isDark && styles.descriptionSectionDark]}>
        <Text style={[styles.description, isDark && styles.descriptionDark]}>
          ByteX là một nền tảng mạng xã hội hiện đại, được thiết kế để kết nối mọi người 
          thông qua việc chia sẻ khoảnh khắc, suy nghĩ và trải nghiệm. Với giao diện 
          thân thiện và tính năng phong phú, ByteX mang đến trải nghiệm tuyệt vời cho 
          người dùng.
        </Text>
      </View>

      {/* Features */}
      <View style={styles.featuresSection}>
        <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
          Tính năng nổi bật
        </Text>
        
        <View style={styles.featuresGrid}>
          <FeatureCard
            icon={faUsers}
            title="Kết nối bạn bè"
            description="Tìm kiếm và kết nối với bạn bè, gia đình và những người có cùng sở thích"
          />
          
          <FeatureCard
            icon={faHeart}
            title="Chia sẻ khoảnh khắc"
            description="Đăng tải hình ảnh, video và chia sẻ những khoảnh khắc đáng nhớ"
          />
          
          <FeatureCard
            icon={faCode}
            title="Giao diện hiện đại"
            description="Thiết kế đẹp mắt với hỗ trợ chế độ tối và sáng"
          />
        </View>
      </View>

      {/* Contact Info */}
      <View style={styles.contactSection}>
        <Text style={[styles.sectionTitle, isDark && styles.sectionTitleDark]}>
          Liên hệ
        </Text>
        
        <ContactRow
          icon={faEnvelope}
          label="Email"
          value="support@bytex.com"
          onPress={() => handleLinkPress('mailto:support@bytex.com')}
        />
        
        <ContactRow
          icon={faGlobe}
          label="Website"
          value="www.bytex.com"
          onPress={() => handleLinkPress('https://www.bytex.com')}
        />
        
        <ContactRow
          icon={faPhone}
          label="Hotline"
          value="1900 1234"
          onPress={() => handleLinkPress('tel:19001234')}
        />
        
        <ContactRow
          icon={faMapMarkerAlt}
          label="Địa chỉ"
          value="123 Đường ABC, Quận 1, TP.HCM"
        />
      </View>

      {/* Footer */}
      <View style={[styles.footer, isDark && styles.footerDark]}>
        <Text style={[styles.footerText, isDark && styles.footerTextDark]}>
          © 2024 ByteX. Tất cả quyền được bảo lưu.
        </Text>
        <Text style={[styles.footerSubtext, isDark && styles.footerSubtextDark]}>
          Được phát triển với ❤️ tại Việt Nam
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerDark: {
    backgroundColor: '#18181b',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerDark: {
    borderBottomColor: '#374151',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  headerTitleDark: {
    color: '#fff',
  },
  logoSection: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#f9fafb',
  },
  logoSectionDark: {
    backgroundColor: '#1f2937',
  },
  logo: {
    width: 120,
    height: 60,
    marginBottom: 16,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  appNameDark: {
    color: '#fff',
  },
  version: {
    fontSize: 16,
    color: '#6b7280',
  },
  versionDark: {
    color: '#9ca3af',
  },
  descriptionSection: {
    padding: 20,
  },
  descriptionSectionDark: {
    backgroundColor: '#18181b',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
    textAlign: 'center',
  },
  descriptionDark: {
    color: '#d1d5db',
  },
  featuresSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
    textAlign: 'center',
  },
  sectionTitleDark: {
    color: '#fff',
  },
  featuresGrid: {
    gap: 16,
  },
  featureCard: {
    backgroundColor: '#f9fafb',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  featureCardDark: {
    backgroundColor: '#1f2937',
  },
  featureIcon: {
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureTitleDark: {
    color: '#fff',
  },
  featureDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  featureDescriptionDark: {
    color: '#9ca3af',
  },
  contactSection: {
    padding: 20,
    backgroundColor: '#f9fafb',
  },
  contactSectionDark: {
    backgroundColor: '#1f2937',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  contactRowDark: {
    backgroundColor: '#374151',
  },
  contactInfo: {
    marginLeft: 16,
    flex: 1,
  },
  contactLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  contactLabelDark: {
    color: '#9ca3af',
  },
  contactValue: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  contactValueDark: {
    color: '#fff',
  },
  footer: {
    padding: 24,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  footerDark: {
    borderTopColor: '#374151',
  },
  footerText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  footerTextDark: {
    color: '#9ca3af',
  },
  footerSubtext: {
    fontSize: 12,
    color: '#9ca3af',
  },
  footerSubtextDark: {
    color: '#6b7280',
  },
};
