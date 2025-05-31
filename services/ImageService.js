import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../config/firebaseConfig';

// Dịch vụ upload ảnh lên Firebase Storage và lấy URL download
export default class ImageService {
  // Upload ảnh lên Firebase Storage và trả về URL
  static async uploadImageAsync(uri, path) {
    // Lấy instance của Firebase Storage từ app đã khởi tạo
    const storage = getStorage(app);

    // Fetch file từ uri (trong React Native, uri là đường dẫn file cục bộ)
    // response sẽ là đối tượng chứa dữ liệu file ảnh
    const response = await fetch(uri);
    // Chuyển response thành blob để upload lên Firebase Storage
    const blob = await response.blob();

    // Tạo tham chiếu đến file trên Storage với đường dẫn (path) mong muốn
    const storageRef = ref(storage, path);

    // Upload file blob lên Firebase Storage tại vị trí storageRef
    await uploadBytes(storageRef, blob);

    // Lấy URL download công khai của file vừa upload
    const url = await getDownloadURL(storageRef);
    // Trả về URL để sử dụng (ví dụ: lưu vào Firestore, hiển thị ảnh...)
    return url;
  }
}