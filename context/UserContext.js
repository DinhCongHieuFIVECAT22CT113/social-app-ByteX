import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../config/firebaseConfig';

// Tạo UserContext để đồng bộ user data trên toàn app
const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Lắng nghe thay đổi user từ Firebase Auth
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser({
          uid: user.uid,
          displayName: user.displayName || 'Người dùng ByteX',
          email: user.email || '',
          photoURL: user.photoURL || 'https://storage.googleapis.com/a1aa/image/e816601d-411b-4b99-9acc-6a92ee01e37a.jpg'
        });
        console.log('UserContext: User data updated:', user.photoURL);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Hàm cập nhật avatar cho tất cả components
  const updateAvatar = (newPhotoURL) => {
    console.log('UserContext: Updating avatar to:', newPhotoURL);
    setCurrentUser(prev => ({
      ...prev,
      photoURL: newPhotoURL
    }));
  };

  // Hàm cập nhật user info
  const updateUserInfo = (updates) => {
    console.log('UserContext: Updating user info:', updates);
    setCurrentUser(prev => ({
      ...prev,
      ...updates
    }));
  };

  // Hàm force reload user từ Firebase
  const reloadUser = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await user.reload();
        setCurrentUser({
          uid: user.uid,
          displayName: user.displayName || 'Người dùng ByteX',
          email: user.email || '',
          photoURL: user.photoURL || 'https://storage.googleapis.com/a1aa/image/e816601d-411b-4b99-9acc-6a92ee01e37a.jpg'
        });
        console.log('UserContext: User reloaded from Firebase');
      }
    } catch (error) {
      console.error('UserContext: Error reloading user:', error);
    }
  };

  const value = {
    currentUser,
    loading,
    updateAvatar,
    updateUserInfo,
    reloadUser
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
