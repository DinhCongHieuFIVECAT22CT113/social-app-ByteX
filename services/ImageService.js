import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../config/firebaseConfig';

// Dịch vụ upload ảnh lên Firebase Storage và lấy URL download
export default class ImageService {
  // Upload ảnh lên Firebase Storage và trả về URL
  static async uploadImageAsync(uri, path) {
    const storage = getStorage(app);

    // Fetch file từ uri (React Native: uri là local file path)
    const response = await fetch(uri);
    const blob = await response.blob();

    // Tạo tham chiếu đến file trên Storage
    const storageRef = ref(storage, path);

    // Upload file
    await uploadBytes(storageRef, blob);

    // Lấy URL download
    const url = await getDownloadURL(storageRef);
    return url;
  }
}