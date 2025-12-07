// src/components/filter/data.ts

// DỮ LIỆU BỘ LỌC CHO SIDEBAR
export const filtersData = {
    categories: [
        { label: "Điện tử", value: "dien-tu" },
        { label: "Thời trang Nam", value: "thoi-trang-nam" },
        { label: "Thời trang Nữ", value: "thoi-trang-nu" },
        { label: "Gia dụng", value: "gia-dung" },
    ],
    priceRanges: [
        { label: "Dưới 100.000đ", value: "0-100000" },
        { label: "100.000đ - 500.000đ", value: "100000-500000" },
        { label: "500.000đ - 1.000.000đ", value: "500000-1000000" },
        { label: "Trên 1.000.000đ", value: "1000000-" },
    ],
    ratings: [
        { label: "Từ 5 sao", value: "5" },
        { label: "Từ 4 sao", value: "4" },
        { label: "Từ 3 sao", value: "3" },
    ]
}