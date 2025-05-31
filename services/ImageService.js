import { uploadToSupabase } from '../config/supabaseConfig';
import { Alert } from 'react-native';

// Dịch vụ upload ảnh lên Supabase Storage và lấy URL download
export default class ImageService {
  // Upload ảnh lên Supabase Storage và trả về URL
  static async uploadImageAsync(uri, path) {
    try {
      // Kiểm tra URI hợp lệ
      if (!uri || typeof uri !== 'string') {
        throw new Error('URI không hợp lệ');
      }
      
      // Xác định bucket và đường dẫn từ path
      // Ví dụ: "avatars/user123.jpg" -> bucket = "avatars", filePath = "user123.jpg"
      const pathParts = path.split('/');
      const bucket = pathParts[0] || 'default';
      const filePath = pathParts.slice(1).join('/') || `${Date.now()}.jpg`;
      
      console.log("Uploading to Supabase bucket:", bucket, "path:", filePath);
      
      // Sử dụng hàm uploadToSupabase để tải lên file
      const url = await uploadToSupabase(uri, bucket, filePath);
      console.log("Download URL:", url);
      
      // Trả về URL để sử dụng (ví dụ: lưu vào Firestore, hiển thị ảnh...)
      return url;
    } catch (error) {
      console.error("Error uploading image to Supabase:", error);
      
      // Xử lý các loại lỗi Supabase
      if (error.statusCode === 403 || error.message?.includes('row-level security policy')) {
        console.error('RLS Policy Error - Avatar upload failed');
        console.log('Please run the SQL commands in supabase_setup.sql to fix RLS policies');

        // Trong development mode, trả về placeholder thay vì crash app
        if (typeof __DEV__ !== 'undefined' && __DEV__) {
          console.log('Using placeholder avatar due to RLS error');
          return 'https://placehold.co/400x400?text=RLS+Error+Fix+Needed';
        }

        Alert.alert(
          'Lỗi cấu hình Supabase',
          'Cần cấu hình RLS policies cho Supabase Storage. Vui lòng liên hệ admin.',
          [{ text: 'OK' }]
        );
        throw new Error('Supabase RLS policies need to be configured for avatars bucket');
      }
      
      // Ghi log lỗi nhưng không hiển thị Alert để tránh spam người dùng
      console.error('Upload error:', error.message);
      
      // Kiểm tra xem lỗi có chứa URL placeholder không
      if (error.message && error.message.includes('https://placehold.co')) {
        return error.message;
      }
      
      // Trong môi trường development, trả về URL placeholder để app không bị crash
      if (typeof __DEV__ !== 'undefined' && __DEV__) {
        return 'https://placehold.co/400x400?text=Upload+Failed';
      }
      
      // Nếu lỗi không xác định
      throw new Error('Lỗi khi upload ảnh: ' + error.message);
    }
  }
}