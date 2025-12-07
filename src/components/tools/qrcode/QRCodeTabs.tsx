import React, { useState, useEffect, useMemo } from 'react';
import {
  Stack,
  TextInput,
  Select,
  Button,
  Text,
  ActionIcon,
  Group,
  Switch,
} from '@mantine/core';
import {
  IconLink,
  IconWifi,
  IconTypography,
  IconUser,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react';
import DynamicTabs, { TabItem } from '../../layout/tab/DynamicTabs';

// Import component tái sử dụng vừa tạo

// --- Types ---
export type QRType = 'text' | 'url' | 'wifi' | 'custom';

interface QRCodeTabsProps {
  onCodeChange: (code: string, type: QRType) => void;
}

interface WiFiData {
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}

interface CustomField {
  id: string;
  key: string;
  value: string;
  label: string;
}

// --- Helpers ---
const PREDEFINED_KEYS = [
  { value: 'FN', label: 'Họ và tên' },
  { value: 'TEL', label: 'Số điện thoại' },
  { value: 'EMAIL', label: 'Email' },
  { value: 'URL', label: 'Website' },
  { value: 'ADR', label: 'Địa chỉ' },
  { value: 'ORG', label: 'Công ty' },
  { value: 'TITLE', label: 'Chức danh' },
  { value: 'NOTE', label: 'Ghi chú' },
];

const generateWifiString = (data: WiFiData): string => {
  if (!data.ssid) return '';
  return `WIFI:T:${data.encryption};S:${data.ssid};P:${data.password};H:${data.hidden};;`;
};

const generateVCardString = (fields: CustomField[]): string => {
  if (fields.length === 0) return '';
  let vcard = 'BEGIN:VCARD\nVERSION:4.0\n';
  fields.forEach((field) => {
    if (field.value.trim()) {
      vcard += `${field.key}:${field.value}\n`;
    }
  });
  vcard += 'END:VCARD';
  return vcard;
};

export default function QRCodeTabs({ onCodeChange }: QRCodeTabsProps) {
  // State quản lý Tab hiện tại để tính toán output chính xác
  const [activeTab, setActiveTab] = useState<QRType>('url');

  // Input States
  const [textValue, setTextValue] = useState('');
  const [urlValue, setUrlValue] = useState('');
  const [wifiData, setWifiData] = useState<WiFiData>({
    ssid: '',
    password: '',
    encryption: 'WPA',
    hidden: false,
  });
  const [customFields, setCustomFields] = useState<CustomField[]>([
    { id: '1', key: 'FN', value: '', label: 'Họ và tên' },
    { id: '2', key: 'TEL', value: '', label: 'Số điện thoại' },
  ]);

  // Effect: Tính toán chuỗi QR khi data thay đổi
  useEffect(() => {
    let result = '';
    switch (activeTab) {
      case 'url':
        result = urlValue;
        break;
      case 'wifi':
        result = generateWifiString(wifiData);
        break;
      case 'custom':
        result = generateVCardString(customFields);
        break;
      case 'text':
      default:
        result = textValue;
        break;
    }
    onCodeChange(result, activeTab);
  }, [activeTab, urlValue, wifiData, customFields, textValue, onCodeChange]);

  // Handlers cho VCard
  const addCustomField = () => {
    setCustomFields([
      ...customFields,
      { id: Date.now().toString(), key: 'NOTE', value: '', label: 'Ghi chú' },
    ]);
  };

  const removeCustomField = (id: string) => {
    setCustomFields(customFields.filter((f) => f.id !== id));
  };

  const updateCustomField = (id: string, field: keyof CustomField, newValue: string) => {
    setCustomFields((fields) =>
      fields.map((f) => {
        if (f.id !== id) return f;
        if (field === 'key') {
          const predefined = PREDEFINED_KEYS.find((k) => k.value === newValue);
          return { ...f, key: newValue, label: predefined ? predefined.label : newValue };
        }
        return { ...f, [field]: newValue };
      })
    );
  };

  // --- Cấu hình các Tabs ---
  // Tại đây ta định nghĩa nội dung (UI Inputs) cho từng tab
  const tabItems: TabItem[] = useMemo(() => [
    {
      value: 'url',
      label: 'URL',
      icon: <IconLink size={16} />,
      content: (
        <TextInput
          label="Đường dẫn Website (URL)"
          placeholder="https://example.com"
          value={urlValue}
          onChange={(e) => setUrlValue(e.currentTarget.value)}
        />
      ),
    },
    {
      value: 'wifi',
      label: 'WiFi',
      icon: <IconWifi size={16} />,
      content: (
        <Stack gap="sm">
          <TextInput
            label="Tên mạng (SSID)"
            placeholder="Tên Wifi nhà bạn"
            value={wifiData.ssid}
            onChange={(e) => setWifiData({ ...wifiData, ssid: e.currentTarget.value })}
          />
          <TextInput
            label="Mật khẩu"
            placeholder="Password wifi"
            type="password"
            value={wifiData.password}
            onChange={(e) => setWifiData({ ...wifiData, password: e.currentTarget.value })}
          />
          <Group grow>
            <Select
              label="Loại bảo mật"
              data={[
                { value: 'WPA', label: 'WPA/WPA2' },
                { value: 'WEP', label: 'WEP' },
                { value: 'nopass', label: 'Không mật khẩu' },
              ]}
              value={wifiData.encryption}
              onChange={(v) => setWifiData({ ...wifiData, encryption: v as any })}
            />
            <Switch
              label="Mạng ẩn (Hidden)"
              mt={30}
              checked={wifiData.hidden}
              onChange={(e) => setWifiData({ ...wifiData, hidden: e.currentTarget.checked })}
            />
          </Group>
        </Stack>
      ),
    },
    {
      value: 'custom',
      label: 'Danh thiếp',
      icon: <IconUser size={16} />,
      content: (
        <Stack gap="xs">
          <Text size="sm" c="dimmed" mb="xs">
            Tạo mã QR danh thiếp (VCard).
          </Text>
          {customFields.map((field, index) => (
            <Group key={field.id} gap="xs" align="flex-end">
              <Select
                style={{ width: 140 }}
                label={index === 0 ? 'Loại' : undefined}
                data={[...PREDEFINED_KEYS, { value: 'CUSTOM', label: 'Tùy chỉnh' }]}
                value={PREDEFINED_KEYS.find((k) => k.value === field.key) ? field.key : 'CUSTOM'}
                onChange={(val) => {
                  if (val === 'CUSTOM') updateCustomField(field.id, 'key', 'X-CUSTOM');
                  else if (val) updateCustomField(field.id, 'key', val);
                }}
              />
              {field.key === 'X-CUSTOM' && (
                <TextInput
                  style={{ width: 100 }}
                  placeholder="KEY"
                  onChange={(e) => updateCustomField(field.id, 'key', e.currentTarget.value)}
                />
              )}
              <TextInput
                style={{ flex: 1 }}
                label={index === 0 ? 'Nội dung' : undefined}
                placeholder={`Nhập ${field.label}`}
                value={field.value}
                onChange={(e) => updateCustomField(field.id, 'value', e.currentTarget.value)}
              />
              <ActionIcon
                color="red"
                variant="subtle"
                mb={2}
                onClick={() => removeCustomField(field.id)}
                disabled={customFields.length <= 1}
              >
                <IconTrash size={18} />
              </ActionIcon>
            </Group>
          ))}
          <Button
            variant="light"
            leftSection={<IconPlus size={16} />}
            onClick={addCustomField}
            mt="sm"
            fullWidth
          >
            Thêm trường thông tin
          </Button>
        </Stack>
      ),
    },
    {
      value: 'text',
      label: 'Văn bản',
      icon: <IconTypography size={16} />,
      content: (
        <TextInput
          label="Nội dung văn bản"
          placeholder="Nhập bất kỳ nội dung gì..."
          value={textValue}
          onChange={(e) => setTextValue(e.currentTarget.value)}
        />
      ),
    },
  ], [urlValue, wifiData, customFields, textValue]);

  return (
    <DynamicTabs 
      items={tabItems} 
      defaultValue="url"
      onChange={(value: string) => setActiveTab(value as QRType)}
    />
  );
}