import { EventEmitter } from 'events';

// Tạo EventEmitter instance để đồng bộ dữ liệu trên toàn app
class AppEventEmitter extends EventEmitter {
  constructor() {
    super();
    this.setMaxListeners(50); // Tăng số lượng listeners tối đa
  }

  // Emit avatar update event
  emitAvatarUpdate(photoURL) {
    console.log('EventEmitter: Broadcasting avatar update:', photoURL);
    this.emit('avatarUpdated', { photoURL });
  }

  // Listen for avatar updates
  onAvatarUpdate(callback) {
    this.on('avatarUpdated', callback);
    return () => this.off('avatarUpdated', callback); // Return cleanup function
  }

  // Emit user info update event
  emitUserUpdate(userInfo) {
    console.log('EventEmitter: Broadcasting user update:', userInfo);
    this.emit('userUpdated', userInfo);
  }

  // Listen for user updates
  onUserUpdate(callback) {
    this.on('userUpdated', callback);
    return () => this.off('userUpdated', callback);
  }
}

// Export singleton instance
export default new AppEventEmitter();
