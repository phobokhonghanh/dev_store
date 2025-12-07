'use client';

import { useRef, useState } from 'react';
import {
  Box,
  Text,
  Title,
  Card,
  Grid,
  Stack,
  Slider,
  Select,
  Group,
  Button,
  ColorInput,
  Divider,
} from '@mantine/core';

import { IconDownload, IconCopy, IconCheck } from '@tabler/icons-react';
import Fullscreen from '@/components/common/FullscreenWrapper';
import { AutoBreadcrumbs } from '@/components/layout/breadcrumb/AutoBreadcrumbs';
import QRCode from '@/components/tools/qrcode/QRCode';
import QRCodeTabs, { QRType } from '@/components/tools/qrcode/QRCodeTabs';
import { useClipboard } from '@mantine/hooks';
import { useDownload } from '@/hooks/tools/io/useDownload';
import FileUploader from '@/components/common/FileUpload';
import { useFileUpload } from '@/hooks/tools/io/useFileUpload';

export default function QRCodeToolPage() {
  // State: QR Content
  const { 
    file: logoFile, 
    fileContent: logoSrc, // Đây là base64 string
    handleFileSelect: onSelectLogo, 
    clearFile: onClearLogo,
    error: logoError 
  } = useFileUpload({ 
    accept: "image/*", 
    readAs: "DataURL" // Quan trọng: Đọc để hiển thị lên QR
  });
  
  const [qrValue, setQrValue] = useState('');
  const [qrType, setQrType] = useState<QRType>('url');

  // State: Appearance Config
  const [size, setSize] = useState<number>(256);
  const [fgColor, setFgColor] = useState<string>('#000000');
  const [bgColor, setBgColor] = useState<string>('#ffffff');
  const [level, setLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');

  const clipboard = useClipboard({ timeout: 2000 });
  const { downloadCanvas } = useDownload();
  const qrRef = useRef<HTMLDivElement>(null);
  const handleDownload = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (canvas) {
      downloadCanvas(canvas, `qrcode-${qrType}}-${Date.now()}`, 'png');
    }
  };
  return (
    <Box p="md">
      {/* Header & Nav */}
      <Box mb="sm">
        <AutoBreadcrumbs />
      </Box>
      <Box mb="md">
        <Title order={2} c="green">
          QR Code Generator
        </Title>
        <Text c="dimmed" mt={4}>
          Generate customized QR codes for URLs, WiFi networks, VCards, and more.
        </Text>
      </Box>

      {/* Main Tool Container */}
      <Box>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Grid gutter="xl">
            {/* LEFT COLUMN: Inputs & Config */}
            <Grid.Col span={{ base: 12, md: 7 }}>
              <Stack gap="md">
                {/* 1. Input Tabs */}
                <QRCodeTabs
                  onCodeChange={(code, type) => {
                    setQrValue(code);
                    setQrType(type);
                  }}
                />

                <Divider my="sm" label="Cấu hình hiển thị" labelPosition="center" />

                {/* 2. Configuration */}
                <Group grow align="flex-start">
                  <Stack gap="xs">
                    <Text size="sm" fw={500}>
                      Kích thước: {size}px
                    </Text>
                    <Slider
                      value={size}
                      onChange={setSize}
                      min={128}
                      max={1024}
                      step={32}
                    />
                  </Stack>
                  <Select
                    label="Độ khó (Error Correction)"
                    value={level}
                    onChange={(v) => setLevel(v as any)}
                    data={[
                      { value: 'L', label: 'Low (7%)' },
                      { value: 'M', label: 'Medium (15%)' },
                      { value: 'Q', label: 'Quartile (25%)' },
                      { value: 'H', label: 'High (30%)' },
                    ]}
                  />
                </Group>

                <Group grow>
                  <ColorInput
                    label="Màu mã (Foreground)"
                    value={fgColor}
                    onChange={setFgColor}
                  />
                  <ColorInput
                    label="Màu nền (Background)"
                    value={bgColor}
                    onChange={setBgColor}
                  />
                </Group>
                <FileUploader 
                  label="Logo / Icon trung tâm"
                  description="Logo sẽ hiển thị giữa mã QR"
                  file={logoFile}
                  previewSrc={logoSrc as string}
                  accept="image/*"
                  onFileSelect={onSelectLogo}
                  onClear={onClearLogo}
                  error={logoError}
                />
              </Stack>
            </Grid.Col>

            {/* RIGHT COLUMN: Display */}
            <Grid.Col ref={qrRef} span={{ base: 12, md: 5 }}  id="qrcode-tool-root" style={{ position: 'relative' }}>
              <Fullscreen targetId="qrcode-tool-root" />
              <QRCode 
                value={qrValue}
                size={size}
                fgColor={fgColor}
                bgColor={bgColor}
                level={level}
                includeMargin={true}
                imageSrc={logoSrc as string | undefined}
              />
            </Grid.Col>
          </Grid>
          <Grid gutter="xl">
            <Group w="100%">
              <Button
                fullWidth
                leftSection={<IconDownload size={18} />}
                onClick={handleDownload}
                disabled={!qrValue}
              >
                Tải ảnh QR
              </Button>

              <Button
                variant="default"
                fullWidth
                leftSection={clipboard.copied ? <IconCheck size={18} /> : <IconCopy size={18} />}
                onClick={() => clipboard.copy(qrValue)}
                disabled={!qrValue}
              >
                {clipboard.copied ? 'Đã copy' : 'Copy nội dung'}
              </Button>
            </Group>
          </Grid>
        </Card>
      </Box>
    </Box>
  );
}
