import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import {
  Stack,
  Paper,
  Text,
  Center,
} from '@mantine/core';

interface QRCodeDisplayProps {
  value: string;
  size: number;
  fgColor: string;
  bgColor: string;
  level: 'L' | 'M' | 'Q' | 'H';
  includeMargin: boolean;
  // --- Props mới cho hình ảnh ---
  imageSrc?: string;      // Đường dẫn ảnh/icon (URL hoặc base64)
  imageSize?: number;     // Kích thước ảnh (pixel)
  imageExcavate?: boolean; // Có xóa các điểm QR phía sau ảnh không (mặc định true để dễ quét)
}

export default function QRCode({
  value,
  size,
  fgColor,
  bgColor,
  level,
  includeMargin,
  imageSrc,
  imageSize,
  imageExcavate = true,
}: QRCodeDisplayProps) {

  // Chuẩn bị object settings cho ảnh nếu có imageSrc
  const imageSettings = imageSrc
    ? {
        src: imageSrc,
        // Nếu không truyền size cụ thể, mặc định lấy 20% kích thước QR
        height: imageSize || size * 0.2,
        width: imageSize || size * 0.2,
        excavate: imageExcavate,
      }
    : undefined;

  return (
    <Stack style={{ minWidth: 300, height: '100%' }} align="center" justify="center">
      <Paper p="xl" withBorder radius="lg" bg="gray.1">
        <Center>
          <QRCodeCanvas
            value={value}
            size={size}
            bgColor={bgColor}
            fgColor={fgColor}
            level={level}
            includeMargin={includeMargin}
            // Truyền settings ảnh vào đây
            imageSettings={imageSettings}
            style={{ width: '100%', height: 'auto', maxWidth: '250px', maxHeight: '250px' }}
          />
        </Center>
      </Paper>

      <Text
        size="xs"
        c="dimmed"
        ta="center"
        style={{ wordBreak: 'break-all', maxWidth: 300, minHeight: 20 }}
      >
        {value.length > 50 ? value.substring(0, 50) + '...' : value || 'Chưa có dữ liệu'}
      </Text>
    </Stack>
  );
}