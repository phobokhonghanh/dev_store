import { IconPhone, IconRulerMeasure, IconPaint, IconTools, IconShieldCheck, IconSparkles, IconCircleCheck, IconBuildingSkyscraper, IconHomeShield, IconWall } from '@tabler/icons-react';

// ===================================================================
// NỘI DUNG CHÍNH CỦA TRANG - BẠN SẼ CHỈNH SỬA Ở ĐÂY
// ===================================================================

export const pageSEO = {
    title: "Thi Công Trần Vách Thạch Cao Chuyên Nghiệp | Báo Giá 24/7",
    description: "Dịch vụ thi công trần vách thạch cao trọn gói, chuyên nghiệp. Báo giá nhanh chóng, chính xác qua điện thoại. Cam kết chất lượng, bền đẹp, đúng tiến độ."
}

// 1. SLIDESHOW HÌNH ẢNH
// Thay đổi link ảnh trong thuộc tính 'src'
export const carouselImages = [
  {
    src: '/images/img1.jpg',
    alt: 'Mẫu trần thạch cao phòng khách hiện đại',
  },
  {
    src: '/images/img2.jpg',
    alt: 'Thi công vách ngăn thạch cao cho văn phòng',
  },
  {
    src: '/images/img3.png',
    alt: 'Đội ngũ thi công thạch cao chuyên nghiệp',
  },
];

// 2. BẢNG BÁO GIÁ (MẪU)
export const pricingData = {
    title: "Bảng Báo Giá Thi Công Tham Khảo",
    description: "Dưới đây là bảng giá tham khảo cho các hạng mục phổ biến. Để nhận báo giá CHÍNH XÁC và TỐT NHẤT cho công trình của bạn, vui lòng liên hệ trực tiếp.",
    headers: ["Hạng Mục Thi Công", "Đơn Vị", "Vật Tư & Thi Công (VNĐ)"],
    rows: [
        ["Trần thạch cao phẳng (khung Vĩnh Tường)", "m²", "Từ 145.000"],
        ["Trần thạch cao giật cấp (khung Vĩnh Tường)", "m²", "Từ 155.000"],
        ["Vách thạch cao 1 mặt (khung Vĩnh Tường)", "m²", "Từ 180.000"],
        ["Vách thạch cao 2 mặt (khung Vĩnh Tường)", "m²", "Từ 265.000"],
        ["Sơn bả hoàn thiện", "m²", "Liên hệ"],
    ],
    cta: "Giá thực tế có thể thay đổi tùy thuộc vào độ phức tạp và khối lượng công trình. Gọi ngay để được khảo sát và báo giá miễn phí!",
};

// 3. QUY TRÌNH LÀM VIỆC
export const processSteps = {
    title: "Quy Trình Làm Việc Chuyên Nghiệp",
    steps: [
      { icon: IconRulerMeasure, title: "Bước 1: Khảo sát và tư vấn", description: "Tiếp nhận yêu cầu, khảo sát thực tế công trình và tư vấn giải pháp tối ưu, hoàn toàn miễn phí." },
      { icon: IconTools, title: "Bước 2: Chuẩn bị vật tư", description: "Tập kết vật tư chính hãng, đúng chủng loại đã thống nhất, đảm bảo chất lượng cao nhất." },
      { icon: IconBuildingSkyscraper, title: "Bước 3: Lắp đặt khung và tấm", description: "Đội ngũ kỹ thuật tiến hành lắp đặt hệ khung xương và bắn tấm thạch cao theo đúng bản vẽ kỹ thuật." },
      { icon: IconPaint, title: "Bước 4: Xử lý bề mặt", description: "Xử lý mối nối, sơn bả, đảm bảo bề mặt phẳng, mịn, đạt tiêu chuẩn thẩm mỹ cao nhất." },
      { icon: IconShieldCheck, title: "Bước 5: Vệ sinh và bàn giao", description: "Vệ sinh sạch sẽ khu vực thi công và bàn giao công trình hoàn thiện cho khách hàng nghiệm thu." },
    ]
};

// 4. LỢI ÍCH KHI CHỌN CHÚNG TÔI
export const benefits = {
    title: "Lợi Ích Vượt Trội Của Chúng Tôi",
    items: [
        { icon: IconCircleCheck, title: "Chất Lượng Đảm Bảo", description: "Sử dụng vật tư chính hãng, thi công đúng kỹ thuật, mang lại công trình bền đẹp theo thời gian." },
        { icon: IconSparkles, title: "Thẩm Mỹ Tối Ưu", description: "Tư vấn các mẫu trần, vách đẹp, hiện đại, phù hợp với mọi không gian và phong cách kiến trúc." },
        { icon: IconPhone, title: "Tư Vấn 24/7", description: "Đội ngũ luôn sẵn sàng hỗ trợ, tư vấn và báo giá nhanh chóng qua điện thoại bất cứ lúc nào." },
    ]
};

// 5. CÁC DỊCH VỤ LIÊN QUAN
export const otherServices = {
    title: "Các Dịch Vụ Khác",
    items: [
        { icon: IconHomeShield, title: "Chống Nóng, Chống Ồn", description: "Tư vấn giải pháp thạch cao kết hợp vật liệu cách nhiệt, cách âm để nâng cao chất lượng không gian sống." },
        { icon: IconWall, title: "Sơn Bả Hoàn Thiện", description: "Cung cấp dịch vụ sơn bả trọn gói, đảm bảo vẻ đẹp đồng bộ và hoàn hảo cho công trình." },
        { icon: IconTools, title: "Sửa Chữa, Cải Tạo", description: "Nhận sửa chữa, cải tạo hệ trần, vách thạch cao hiện hữu theo yêu cầu của khách hàng." },
    ]
};

// THÔNG TIN LIÊN HỆ CHÍNH
export const contact = {
    phone: "0987654321",
    phoneDisplay: "098.765.4321",
    heroButton: "Nhận Báo Giá Qua Điện Thoại",
    ctaTitle: "Đừng Ngần Ngại, Hãy Gọi Cho Chúng Tôi Ngay!",
    ctaButton: "Gọi Tư Vấn Miễn Phí",
};