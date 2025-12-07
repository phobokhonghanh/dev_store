import { useCallback } from 'react';

type DownloadFormat = 'png' | 'jpeg' | 'webp';

export function useDownload() {
  /**
   * Tải xuống nội dung từ một thẻ Canvas
   * @param canvasElement - Ref hoặc Element canvas thực tế
   * @param fileName - Tên file muốn lưu
   * @param format - Định dạng ảnh (mặc định png)
   */
  const downloadCanvas = useCallback((
    canvasElement: HTMLCanvasElement | null,
    fileName: string,
    format: DownloadFormat = 'png'
  ) => {
    if (!canvasElement) {
      console.warn('useDownload: Canvas element not found');
      return;
    }

    try {
      const url = canvasElement.toDataURL(`image/${format}`);
      const link = document.createElement('a');
      link.download = `${fileName}.${format}`;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('useDownload: Download failed:', error);
    }
  }, []);

  return { downloadCanvas };
}