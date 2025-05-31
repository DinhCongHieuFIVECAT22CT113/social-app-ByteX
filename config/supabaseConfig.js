// supabaseConfig.js
// Cấu hình kết nối Supabase

import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export { supabase };

// Hàm tiện ích để tải lên file vào Supabase Storage
export const uploadToSupabase = async (file, bucket, path) => {
  try {
    console.log(`Attempting to upload to Supabase bucket: ${bucket}, path: ${path}`);
    
    // Kiểm tra xem Supabase đã được khởi tạo đúng chưa
    if (!supabase || !supabase.storage) {
      throw new Error('Supabase client not properly initialized');
    }
    
    // Chuyển đổi URI thành Blob
    let blob;
    try {
      // Thêm timeout để tránh treo quá lâu
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const response = await fetch(file, { 
        signal: controller.signal,
        method: 'GET',
        headers: {
          'Accept': 'image/*',
        },
        cache: 'no-store'
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.status} ${response.statusText}`);
      }
      
      blob = await response.blob();
      
      if (!blob || blob.size === 0) {
        throw new Error('Empty blob received from fetch');
      }
      
      console.log(`Blob created successfully: ${blob.size} bytes, type: ${blob.type}`);
    } catch (fetchError) {
      console.error('Fetch error details:', fetchError);
      
      // Xử lý lỗi mạng
      if (fetchError.name === 'AbortError') {
        throw new Error('Fetch operation timed out');
      } else if (fetchError.message && fetchError.message.includes('Network request failed')) {
        throw new Error('Network request failed');
      }
      throw fetchError;
    }
    
    // Tạo tên file duy nhất nếu không có path
    const filePath = path || `${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    
    // Tải lên file vào bucket được chỉ định
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, blob, {
        cacheControl: '3600',
        upsert: true
      });
      
    if (error) {
      console.error('Supabase upload error:', error);
      throw error;
    }
    
    console.log('File uploaded successfully to Supabase');
    
    // Tạo URL công khai cho file
    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);
    
    if (!publicUrlData || !publicUrlData.publicUrl) {
      throw new Error('Failed to get public URL from Supabase');
    }
    
    console.log('Public URL generated:', publicUrlData.publicUrl);
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('Error uploading to Supabase:', error);
    
    // Trong môi trường development, trả về URL placeholder
    if (typeof __DEV__ !== 'undefined' && __DEV__) {
      if (error.message && error.message.includes('Network request failed')) {
        return 'https://placehold.co/400x400?text=Image+Upload+Failed';
      } else if (error.message && error.message.includes('bucket')) {
        return 'https://placehold.co/400x400?text=Image+Upload+Failed';
      } else if (error.message && error.message.includes('timeout')) {
        return 'https://placehold.co/400x400?text=Image+Upload+Failed';
      } else {
        return 'https://placehold.co/400x400?text=Image+Upload+Failed';
      }
    }
    
    // Trong môi trường production, ném lỗi để xử lý ở lớp trên
    throw error;
  }
};