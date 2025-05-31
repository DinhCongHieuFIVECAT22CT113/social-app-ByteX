// supabaseConfig.js
// Cấu hình kết nối Supabase

import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';

// Thay thế các giá trị này bằng thông tin từ dự án Supabase của bạn
const supabaseUrl = 'https://vldwncyffhamfqtqjoxc.supabase.co'; // Thay thế bằng URL thực của bạn
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsZHduY3lmZmhhbWZxdHFqb3hjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2NjA4MzksImV4cCI6MjA2NDIzNjgzOX0.f65xhDirc3EQCRwthG7PTexPguBe44vnjYyHEbRBzTE';  // Thay thế bằng key thực của bạn

// Tạo Supabase client với AsyncStorage để lưu trữ session
let supabase;
try {
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  });
  console.log('Supabase client initialized successfully');
} catch (error) {
  console.error('Error initializing Supabase client:', error);
  // Fallback để tránh crash app
  supabase = {
    storage: {
      from: (bucket) => ({
        upload: async () => { 
          console.error('Supabase not properly initialized'); 
          return { error: new Error('Supabase not properly initialized') };
        },
        getPublicUrl: () => ({ data: { publicUrl: null } }),
      }),
    },
  };
}

// Hàm chuyển đổi file URI thành base64
const fileToBase64 = async (uri) => {
  try {
    // Đảm bảo URI là hợp lệ với Expo FileSystem
    const fileUri = uri;
    
    // Kiểm tra xem URI có hợp lệ với Expo FileSystem không
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (!fileInfo.exists) {
      console.log('File does not exist at path:', fileUri);
      throw new Error('File does not exist');
    }
    
    // Đọc file dưới dạng base64
    const base64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    
    // Xác định loại file dựa trên phần mở rộng
    let contentType = 'image/jpeg'; // Mặc định
    if (uri.endsWith('.png')) {
      contentType = 'image/png';
    } else if (uri.endsWith('.gif')) {
      contentType = 'image/gif';
    } else if (uri.endsWith('.webp')) {
      contentType = 'image/webp';
    }
    
    return `data:${contentType};base64,${base64}`;
  } catch (error) {
    console.error('Error converting file to base64:', error);
    return null;
  }
};

export { supabase };

// Danh sách các bucket mặc định để thử
const DEFAULT_BUCKETS = ['avatars', 'images', 'public', 'media'];

// Hàm tiện ích để tải lên file vào Supabase Storage
export const uploadToSupabase = async (file, bucket = 'public', path) => {
  try {
    // Bỏ qua placeholder trong development mode để test thật
    // if (typeof __DEV__ !== 'undefined' && __DEV__) {
    //   console.log('Development mode: returning placeholder image to avoid RLS issues');
    //   return 'https://placehold.co/400x400?text=Dev+Mode+Avatar';
    // }
    
    // Thử nhiều bucket khác nhau nếu avatars bị lỗi RLS
    const bucketsToTry = [bucket || 'avatars', 'public', 'images'];
    console.log(`Will try uploading to buckets: ${bucketsToTry.join(', ')}, path: ${path}`);
    
    // Kiểm tra xem Supabase đã được khởi tạo đúng chưa
    if (!supabase || !supabase.storage) {
      throw new Error('Supabase client not properly initialized');
    }
    
    // Tạo tên file duy nhất nếu không có path, thêm timestamp để tránh cache
    const timestamp = Date.now();
    const filePath = path || `${timestamp}_${Math.random().toString(36).substring(2, 15)}.jpg`;

    // Kiểm tra xem file có phải là URI local không (bắt đầu bằng file:// hoặc content://)
    const isLocalUri = file.startsWith('file://') || file.startsWith('content://');
    
    // Đọc nội dung file
    let fileContent;
    let contentType = 'image/jpeg'; // Mặc định
    
    if (isLocalUri) {
      console.log('Uploading local file');
      try {
        // Đọc file dưới dạng base64
        fileContent = await FileSystem.readAsStringAsync(file, {
          encoding: FileSystem.EncodingType.Base64,
        });
        
        if (!fileContent) {
          throw new Error('Failed to read file content');
        }
        
        // Xác định loại file dựa trên phần mở rộng hoặc MIME type
        if (file.toLowerCase().includes('.png') || file.toLowerCase().includes('png')) {
          contentType = 'image/png';
        } else if (file.toLowerCase().includes('.gif') || file.toLowerCase().includes('gif')) {
          contentType = 'image/gif';
        } else if (file.toLowerCase().includes('.webp') || file.toLowerCase().includes('webp')) {
          contentType = 'image/webp';
        } else if (file.toLowerCase().includes('.jpg') || file.toLowerCase().includes('.jpeg') || file.toLowerCase().includes('jpeg')) {
          contentType = 'image/jpeg';
        }
        
        console.log('Successfully read file content');
      } catch (error) {
        console.error('Error reading local file:', error);
        throw new Error('Failed to read local file: ' + error.message);
      }
    } else {
      // Xử lý URI từ internet
      try {
        console.log('Fetching remote file');
        const response = await fetch(file);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch file: ${response.status} ${response.statusText}`);
        }
        
        const blob = await response.blob();
        contentType = blob.type || 'image/jpg';
        
        // Chuyển blob thành base64
        const reader = new FileReader();
        fileContent = await new Promise((resolve, reject) => {
          reader.onload = () => {
            // Lấy phần base64 từ data URL
            const base64 = reader.result.split(',')[1];
            resolve(base64);
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
        
        console.log('Successfully fetched and converted remote file');
      } catch (error) {
        console.error('Error fetching remote file:', error);
        throw error;
      }
    }
    
    // Thử tải lên với bucket được chỉ định
    let uploadResult;
    let uploadError;
    let bucketName = bucketsToTry[0]; // Sử dụng bucket đầu tiên trong danh sách

    try {
      console.log('Uploading file with details:');
      console.log('- Bucket:', bucketName);
      console.log('- File path:', filePath);
      console.log('- Content type:', contentType);
      console.log('- File content length:', fileContent?.length || 'undefined');

      // Chuyển base64 thành binary để upload
      const binaryData = Uint8Array.from(atob(fileContent), c => c.charCodeAt(0));
      console.log('Binary data length:', binaryData.length);

      uploadResult = await supabase.storage
        .from(bucketName)
        .upload(filePath, binaryData, {
          contentType: contentType,
          cacheControl: '3600',
          upsert: true
        });
      
      if (uploadResult.error) {
        uploadError = uploadResult.error;
        console.log(`Error uploading to bucket "${bucketName}": ${uploadError.message}`);
      } else {
        console.log(`Successfully uploaded to bucket "${bucketName}"`);
        console.log('Upload result:', uploadResult.data);

        // Verify file was actually uploaded
        if (uploadResult.data && uploadResult.data.path) {
          console.log('File uploaded to path:', uploadResult.data.path);
        }
      }
    } catch (error) {
      uploadError = error;
      console.log(`Exception when uploading to bucket "${bucketName}": ${error.message}`);
    }
    
    // Nếu bucket đầu tiên thất bại, thử các bucket khác
    if (uploadError) {
      console.log('First bucket failed, trying remaining buckets...');

      let successBucket = null;

      // Thử từng bucket còn lại trong danh sách
      for (let i = 1; i < bucketsToTry.length; i++) {
        const bucketToTry = bucketsToTry[i];
        
        try {
          console.log(`Trying bucket: ${bucketToTry}`);

          // Chuyển base64 thành binary để upload
          const binaryData = Uint8Array.from(atob(fileContent), c => c.charCodeAt(0));

          uploadResult = await supabase.storage
            .from(bucketToTry)
            .upload(filePath, binaryData, {
              contentType: contentType,
              cacheControl: '3600',
              upsert: true
            });

          if (!uploadResult.error) {
            console.log(`Successfully uploaded to bucket "${bucketToTry}"`);
            // Lưu bucket thành công để sử dụng sau
            successBucket = bucketToTry;
            uploadError = null;
            break;
          } else {
            console.log(`Error with bucket "${bucketToTry}": ${uploadResult.error.message}`);
          }
        } catch (error) {
          console.log(`Exception with bucket "${bucketToTry}": ${error.message}`);
        }
      }
      
      // Cập nhật bucket name nếu tìm thấy bucket thành công
      if (successBucket) {
        console.log(`Using successful bucket: ${successBucket}`);
        bucketName = successBucket;
      }
    }
    
    // Nếu vẫn có lỗi sau khi thử tất cả các bucket
    if (uploadError) {
      console.error('All bucket upload attempts failed:', uploadError);
      throw uploadError;
    }

    console.log('File uploaded successfully to Supabase');

    // Đảm bảo bucketName được set đúng
    const finalBucketName = bucketName || bucketsToTry[0];
    console.log('Using final bucket name:', finalBucketName);

    // Tạo URL công khai cho file
    const { data: publicUrlData } = supabase.storage
      .from(finalBucketName)
      .getPublicUrl(filePath);
    
    if (!publicUrlData || !publicUrlData.publicUrl) {
      throw new Error('Failed to get public URL from Supabase');
    }
    
    console.log('Public URL generated:', publicUrlData.publicUrl);

    // Thêm timestamp vào URL để tránh cache
    const urlWithTimestamp = `${publicUrlData.publicUrl}?t=${timestamp}`;
    console.log('URL with cache busting:', urlWithTimestamp);

    return urlWithTimestamp;
  } catch (error) {
    console.error('Error uploading to Supabase:', error);

    // Xử lý lỗi RLS cụ thể
    if (error.statusCode === 403 || error.message?.includes('row-level security policy')) {
      console.error('RLS Policy Error: Please check Supabase Storage policies for avatars bucket');
      console.log('Run the SQL commands in supabase_setup.sql to fix this issue');

      // Trong development, trả về placeholder để app không crash
      if (typeof __DEV__ !== 'undefined' && __DEV__) {
        console.log('Returning placeholder image due to RLS error in development mode');
        return 'https://placehold.co/400x400?text=RLS+Policy+Error';
      }
    }

    // Trong môi trường development, trả về URL placeholder cho các lỗi khác
    if (typeof __DEV__ !== 'undefined' && __DEV__) {
      console.log('Returning placeholder image due to error in development mode');
      return 'https://placehold.co/400x400?text=Image+Upload+Failed';
    }

    // Trong môi trường production, ném lỗi để xử lý ở lớp trên
    throw error;
  }
};