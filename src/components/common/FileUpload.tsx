import React from 'react';
import { 
  Group, 
  Button, 
  Text, 
  Avatar, 
  Stack, 
  FileButton, 
  CloseButton, 
  Alert, 
  ThemeIcon,
  rem 
} from '@mantine/core';
import { 
  IconUpload, 
  IconPhoto, 
  IconFileZip, 
  IconFileText, 
  IconFileCode, 
  IconFile 
} from '@tabler/icons-react';

interface FileUploaderProps {
  label?: string;
  description?: string;
  file: File | null;           // File object gốc
  previewSrc?: string | null;  // Base64 string nếu là ảnh (để preview)
  accept?: string;             // Ví dụ: "image/*, .zip"
  maxSizeMB?: number;
  onFileSelect: (file: File | null) => void;
  onClear: () => void;
  error?: string | null;
}

// Helper: Format dung lượng file
const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

// Helper: Chọn Icon dựa trên loại file
const getFileIcon = (file: File) => {
  if (file.type.startsWith('image/')) return <IconPhoto size="60%" />;
  if (file.name.endsWith('.zip') || file.name.endsWith('.rar')) return <IconFileZip size="60%" />;
  if (file.type.startsWith('text/') || file.name.endsWith('.txt')) return <IconFileText size="60%" />;
  if (file.name.endsWith('.json') || file.name.endsWith('.xml')) return <IconFileCode size="60%" />;
  return <IconFile size="60%" />;
};

export default function FileUploader({ 
  label = "Upload File",
  description,
  file,
  previewSrc,
  accept = "*",
  maxSizeMB = 5,
  onFileSelect, 
  onClear, 
  error 
}: FileUploaderProps) {
  
  const isImage = file?.type.startsWith('image/');

  return (
    <Stack gap="xs">
      <Text size="sm" fw={500}>{label}</Text>
      
      {error && (
        <Alert variant="light" color="red" title="Lỗi" p="xs">
          {error}
        </Alert>
      )}

      {!file ? (
        <FileButton onChange={onFileSelect} accept={accept}>
          {(props) => (
            <Button 
              {...props} 
              variant="default" 
              leftSection={<IconUpload size={16} />}
              fullWidth
              h="auto"
              py="xs"
            >
              <Stack gap={0} align="center">
                <Text size="sm" fw={500}>Chọn file</Text>
                <Text size="xs" c="dimmed" fw={400}>(Max {maxSizeMB}MB)</Text>
              </Stack>
            </Button>
          )}
        </FileButton>
      ) : (
        <Group 
          justify="space-between" 
          bg="gray.0" 
          p="xs" 
          wrap="nowrap"
          style={{ 
            borderRadius: 'var(--mantine-radius-md)', 
            border: '1px solid var(--mantine-color-gray-3)' 
          }}
        >
          <Group gap="sm" wrap="nowrap" style={{ overflow: 'hidden' }}>
            {/* Logic hiển thị Preview: Nếu là ảnh -> Avatar, nếu là file -> Icon */}
            {isImage && typeof previewSrc === 'string' ? (
              <Avatar src={previewSrc} radius="sm" size="md" color="blue" />
            ) : (
              <ThemeIcon variant="light" size="md" color="blue" radius="sm">
                {file && getFileIcon(file)}
              </ThemeIcon>
            )}
            
            <Stack gap={0} style={{ overflow: 'hidden' }}>
              <Text size="sm" truncate>{file.name}</Text>
              <Text size="xs" c="dimmed">{formatBytes(file.size)}</Text>
            </Stack>
          </Group>
          
          <CloseButton onClick={onClear} aria-label="Xóa file" />
        </Group>
      )}
      
      {description && (
        <Text size="xs" c="dimmed">
          {description}
        </Text>
      )}
    </Stack>
  );
}