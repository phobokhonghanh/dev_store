import { Product } from "@/core/models/product";

// DỮ LIỆU SẢN PHẨM MẪU
export const allProducts: Product[] = [
    {
        id: "1",
        name: "Áo Sơ Mi Nam Trắng Vải Lụa Cao Cấp Không Nhăn Siêu Mát",
        image: "https://placehold.co/300x300/f0f0f0/000?text=Áo+Sơ+Mi",
        price: 250000,
        priceOld: 350000,
        rating: 4.5,
        sold: 1200,
        category: "thoi-trang-nam",
    },
    // ... (Thêm các sản phẩm khác như code trước) ...
    {
        id: "2",
        name: "Tai Nghe Bluetooth Không Dây Pin Trâu, Chống Ồn Chủ Động",
        image: "https://placehold.co/300x300/e0e0e0/000?text=Tai+Nghe",
        price: 790000,
        priceOld: 1100000,
        rating: 5,
        sold: 3500,
        category: "dien-tu",
    },
    {
        id: "3",
        name: "Nồi Chiên Không Dầu Dung Tích Lớn 8L, Đa Chức Năng",
        image: "https://placehold.co/300x300/d0d0d0/000?text=Nồi+Chiên",
        price: 1500000,
        priceOld: 2500000,
        rating: 4,
        sold: 800,
        category: "gia-dung",
    },
    {
        id: "4",
        name: "Váy Đầm Nữ Thiết Kế Dự Tiệc Sang Trọng, Vải Voan",
        image: "https://placehold.co/300x300/c0c0c0/000?text=Váy+Đầm",
        price: 550000,
        priceOld: 700000,
        rating: 4.5,
        sold: 500,
        category: "thoi-trang-nu",
    },
];

// Thêm sản phẩm giả để danh sách dài hơn
for (let i = 5; i <= 24; i++) {
    allProducts.push({
        ...allProducts[i % 4],
        id: i.toString(),
        name: `${allProducts[i % 4].name} (Mẫu #${i})`,
    });
}
