// SupabaseImageUploadTest.js
// Component để kiểm tra chức năng upload ảnh lên Supabase

import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { testSupabaseConnection } from '../config/supabaseConfig';
import ImageService from '../services/ImageService';

const SupabaseImageUploadTest = () => {
  const [loading, setLoading] = useState(false);
  const [testResults, setTestResults] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  
  // Thêm log vào kết quả test
  const addLog = (message, isError = false) => {
    console.log(message);
    setTestResults(prev => [...prev, { message, isError, timestamp: new Date().toISOString() }]);
  };
  
  // Kiểm tra kết nối Supabase
  const testConnection = async () => {
    setLoading(true);
    addLog('Testing Supabase connection...');
    
    try {
      const result = await testSupabaseConnection();
      addLog(`Connection test: ${result ? 'SUCCESS' : 'FAILED'}`, !result);
    } catch (error) {
      addLog(`Connection error: ${error.message}`, true);
    } finally {
      setLoading(false);
    }
  };
  
  // Chọn ảnh từ thư viện
  const pickImage = async () => {
    setLoading(true);
    addLog('Opening image picker...');
    
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setSelectedImage(uri);
        addLog(`Image selected: ${uri}`);
      } else {
        addLog('Image selection cancelled');
      }
    } catch (error) {
      addLog(`Error picking image: ${error.message}`, true);
    } finally {
      setLoading(false);
    }
  };
  
  // Upload ảnh lên Supabase
  const uploadImage = async () => {
    if (!selectedImage) {
      addLog('No image selected', true);
      return;
    }
    
    setLoading(true);
    addLog(`Uploading image to Supabase...`);
    
    try {
      // Sử dụng ImageService để upload ảnh
      const url = await ImageService.uploadImageAsync(selectedImage, `test/test-${Date.now()}.jpg`);
      
      setUploadedImageUrl(url);
      addLog(`Upload successful! URL: ${url}`);
    } catch (error) {
      addLog(`Upload error: ${error.message}`, true);
    } finally {
      setLoading(false);
    }
  };
  
  // Xóa kết quả test
  const clearLogs = () => {
    setTestResults([]);
    setSelectedImage(null);
    setUploadedImageUrl(null);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Supabase Image Upload Test</Text>
      
      <View style={styles.buttonContainer}>
        <Button title="Test Connection" onPress={testConnection} disabled={loading} />
        <Button title="Pick Image" onPress={pickImage} disabled={loading} />
        <Button title="Upload Image" onPress={uploadImage} disabled={loading || !selectedImage} />
        <Button title="Clear Logs" onPress={clearLogs} disabled={loading} />
      </View>
      
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#22c55e" />
          <Text style={styles.loadingText}>Processing...</Text>
        </View>
      )}
      
      <View style={styles.imagesContainer}>
        {selectedImage && (
          <View style={styles.imageBox}>
            <Text style={styles.imageLabel}>Selected Image:</Text>
            <Image source={{ uri: selectedImage }} style={styles.image} />
          </View>
        )}
        
        {uploadedImageUrl && (
          <View style={styles.imageBox}>
            <Text style={styles.imageLabel}>Uploaded Image:</Text>
            <Image 
              source={{ uri: uploadedImageUrl }} 
              style={styles.image}
              onError={() => addLog('Error loading uploaded image', true)}
            />
          </View>
        )}
      </View>
      
      <Text style={styles.logsTitle}>Test Logs:</Text>
      <ScrollView style={styles.logsContainer}>
        {testResults.map((log, index) => (
          <Text 
            key={index} 
            style={[styles.logText, log.isError && styles.errorText]}
          >
            {log.message}
          </Text>
        ))}
        {testResults.length === 0 && (
          <Text style={styles.emptyText}>No logs yet. Run a test to see results.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  loadingContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
  },
  imagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  imageBox: {
    alignItems: 'center',
    margin: 8,
  },
  imageLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  logsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  logsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  logText: {
    fontSize: 14,
    marginBottom: 4,
    fontFamily: 'monospace',
  },
  errorText: {
    color: 'red',
  },
  emptyText: {
    fontStyle: 'italic',
    color: '#999',
    textAlign: 'center',
    marginTop: 16,
  },
});

export default SupabaseImageUploadTest;