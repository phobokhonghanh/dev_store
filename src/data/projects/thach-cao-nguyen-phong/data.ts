import { IconGauge, IconMessageDots, IconPhone, IconBrandFacebook } from '@tabler/icons-react';

export const carouselImages = [
    { src: 'https://picsum.photos/1200/800?random=1', alt: 'Slide 1' },
    { src: 'https://picsum.photos/1200/800?random=2', alt: 'Slide 2' },
    { src: 'https://picsum.photos/1200/800?random=3', alt: 'Slide 3' },
];

export const pricingData = {
    title: 'Bảng Giá Dịch Vụ Thi Công Thạch Cao',
    description: 'Chúng tôi cung cấp các gói dịch vụ thi công thạch cao đa dạng, phù hợp với mọi nhu cầu và ngân sách của bạn.',
    headers: ['Hạng Mục', 'Đơn Vị', 'Giá (VNĐ)'],
    rows: [
        ['Trần thạch cao phẳng', 'm2', '150.000 - 200.000'],
        ['Trần thạch cao giật cấp', 'm2', '180.000 - 250.000'],
        ['Vách thạch cao 1 mặt', 'm2', '120.000 - 170.000'],
        ['Vách thạch cao 2 mặt', 'm2', '160.000 - 220.000'],
    ],
    cta: 'Liên hệ ngay để nhận báo giá chi tiết: ',
    phoneDisplay: '0987 654 321',
};

export const processSteps = {
    title: 'Quy Trình Thi Công Chuyên Nghiệp',
    steps: [
        { icon: IconGauge, title: 'Tiếp nhận yêu cầu', description: 'Lắng nghe và ghi nhận mọi yêu cầu từ khách hàng.' },
        { icon: IconMessageDots, title: 'Tư vấn & Báo giá', description: 'Đưa ra giải pháp tối ưu và báo giá cạnh tranh.' },
        { icon: IconGauge, title: 'Ký kết hợp đồng', description: 'Thống nhất các điều khoản và tiến hành ký kết.' },
        { icon: IconGauge, title: 'Thi công & Giám sát', description: 'Thực hiện công việc với đội ngũ chuyên nghiệp, giám sát chặt chẽ.' },
        { icon: IconGauge, title: 'Nghiệm thu & Bàn giao', description: 'Kiểm tra chất lượng và bàn giao công trình đúng hạn.' },
    ],
};

export const benefits = {
    title: 'Lợi Ích Khi Chọn Chúng Tôi',
    items: [
        { icon: IconGauge, title: 'Chất lượng đảm bảo', description: 'Vật liệu cao cấp, đội ngũ tay nghề cao.' },
        { icon: IconMessageDots, title: 'Giá cả cạnh tranh', description: 'Tối ưu chi phí, mang lại giá trị tốt nhất.' },
        { icon: IconGauge, title: 'Tiến độ nhanh chóng', description: 'Hoàn thành đúng hẹn, không chậm trễ.' },
    ],
};

export const otherServices = {
    title: 'Các Dịch Vụ Khác',
    items: [
        { icon: IconGauge, title: 'Sơn nước', description: 'Dịch vụ sơn nước chuyên nghiệp, bền đẹp.' },
        { icon: IconMessageDots, title: 'Sửa chữa nhà', description: 'Sửa chữa, cải tạo nhà ở theo yêu cầu.' },
        { icon: IconGauge, title: 'Thiết kế nội thất', description: 'Tư vấn, thiết kế không gian sống hiện đại.' },
    ],
};

export const contact = {
    phone: '0987654321',
    phoneDisplay: '0987 654 321',
    heroButton: 'GỌI TƯ VẤN NGAY',
    finalCtaTitle: 'Liên Hệ Ngay Để Được Tư Vấn Miễn Phí',
    finalCtaDescription: 'Đừng ngần ngại liên hệ với chúng tôi để nhận được sự tư vấn tận tình và báo giá chi tiết cho dự án của bạn.',
    zaloLink: 'https://zalo.me/yourzalo',
    facebookLink: 'https://www.facebook.com/yourpage',
};