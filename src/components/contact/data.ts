import { IconBrandOffice, IconPhone, IconMail, IconClock } from '@tabler/icons-react';

// Dữ liệu cho các mục thông tin liên hệ
export const contactInfo = [
  { 
    title: 'Email', 
    description: 'hello@yourbrand.com', 
    icon: IconMail 
  },
  { 
    title: 'Điện thoại', 
    description: '+84 123 456 789', 
    icon: IconPhone 
  },
  { 
    title: 'Địa chỉ', 
    description: '123 Đường ABC, Phường X, Quận Y, TP. Z', 
    icon: IconBrandOffice 
  },
  { 
    title: 'Giờ làm việc', 
    description: 'Thứ 2 – Thứ 6: 8h – 17h', 
    icon: IconClock 
  },
];

// Dữ liệu cho các trường trong form
export const formFields = [
    { name: 'name', label: 'Tên của bạn', placeholder: 'Nhập tên của bạn', component: 'TextInput', required: true },
    { name: 'email', label: 'Email', placeholder: 'your@email.com', component: 'TextInput', required: true },
    { name: 'subject', label: 'Chủ đề', placeholder: 'Chủ đề tin nhắn', component: 'TextInput', required: true },
    { name: 'message', label: 'Nội dung', placeholder: 'Nội dung tin nhắn của bạn', component: 'Textarea', required: true },
];

// Toàn bộ nội dung văn bản trên trang
export const pageContent = {
    title: 'Liên hệ chúng tôi',
    description: 'Để lại tin nhắn cho chúng tôi, đội ngũ hỗ trợ sẽ phản hồi bạn trong thời gian sớm nhất.',
    formTitle: 'Gửi tin nhắn',
    submitButton: 'Gửi tin nhắn'
};