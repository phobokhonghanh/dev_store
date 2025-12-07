import { useState, useCallback } from 'react';

export type ReadMode = 'DataURL' | 'Text' | 'Binary' | 'None';

interface UseFileUploadOptions {
  maxSizeMB?: number;
  accept?: string; // Ví dụ: "image/*, .zip, .pdf"
  readAs?: ReadMode; // Chế độ đọc file sau khi chọn
}

export function useFileUpload({ 
  maxSizeMB = 5, 
  accept, 
  readAs = 'DataURL' 
}: UseFileUploadOptions = {}) {
  const [file, setFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string | ArrayBuffer | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = useCallback((selectedFile: File | null) => {
    if (!selectedFile) return;

    // 1. Validate File Size
    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      setError(`Kích thước file không được vượt quá ${maxSizeMB}MB`);
      return;
    }

    // 2. Validate File Type (Basic check based on extension/mime if accept prop is provided)
    // Lưu ý: input type="file" đã filter ở UI, đây là check logic thêm
    if (accept && accept !== '*') {
       // Logic check mime type đơn giản ở đây nếu cần thiết
       // Hiện tại ta tin tưởng vào browser filter và user
    }

    setError(null);
    setFile(selectedFile);

    // 3. Read File Content (nếu cần hiển thị hoặc xử lý nội dung)
    if (readAs === 'None') {
      setFileContent(null);
      return;
    }

    const reader = new FileReader();
    
    reader.onload = (e) => {
      setFileContent(e.target?.result ?? null);
    };

    reader.onerror = () => {
      setError('Lỗi khi đọc nội dung file');
    };

    if (readAs === 'DataURL') {
      reader.readAsDataURL(selectedFile); // Dùng cho Ảnh preview
    } else if (readAs === 'Text') {
      reader.readAsText(selectedFile); // Dùng cho .txt, .csv, .json
    } else if (readAs === 'Binary') {
      reader.readAsArrayBuffer(selectedFile); // Dùng cho .zip, binary
    }

  }, [maxSizeMB, accept, readAs]);

  const clearFile = useCallback(() => {
    setFile(null);
    setFileContent(null);
    setError(null);
  }, []);

  return {
    file,           // Object File gốc (để gửi lên server hoặc check info)
    fileContent,    // Nội dung file (Base64 string nếu là ảnh, Text nếu là văn bản)
    error,
    handleFileSelect,
    clearFile,
  };
}