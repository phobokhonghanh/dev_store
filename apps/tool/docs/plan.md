# Kế hoạch Refactor UI/UX & Documentation - Giai đoạn 2

Tài liệu này chi tiết hóa các bước thực hiện chỉnh sửa giao diện và cấu trúc lại tài liệu hướng dẫn cho công cụ QR Code, dựa trên báo cáo Audit `feedback_uiux.md`.

## 1. Tinh chỉnh Module Logo (Logo Module Refactor)

### Mục tiêu
Làm gọn giao diện chính, đưa các tính năng ít dùng (upload logo) vào khu vực nâng cao và cải thiện tính nhất quán của UI.

### Kế hoạch thực hiện
1.  **Di chuyển vị trí Module:**
    *   Chuyển component quản lý logo (`LogoManager`) từ vị trí hiện tại (đầu form) vào bên trong phần "Tùy chỉnh nâng cao" (`Advanced Customization`).
    *   **Lý do:** Giảm bớt sự phân tán chú ý của người dùng khi mới vào trang. Logo là tính năng phụ, không nên chiếm vị trí "đất vàng".

2.  **Logic Hiển thị thông minh:**
    *   Thiết lập logic hiển thị: Nếu hệ thống **không** tự nhận diện được logo từ URL **VÀ** người dùng **chưa** upload logo thủ công -> **Ẩn hoàn toàn** phần hiển thị logo (cả placeholder).
    *   **Lý do:** Giữ giao diện sạch sẽ (Clean UI). Không hiển thị những khung trống vô nghĩa.

3.  **Đồng bộ hóa UI Nút bấm:**
    *   Thay đổi style của nút "Remove Logo" (Xóa logo) để giống hoàn toàn với nút "Clear Frame" (Xóa khung text).
    *   Giữ lại icon thùng rác (Trash Icon) nhưng sử dụng background màu đỏ nhạt và bo góc mềm mại (`rounded-lg`, `bg-destructive/10`).
    *   **Lý do:** Đảm bảo Design System nhất quán (Consistency), giúp người dùng dễ nhận diện các hành động có tính chất phá hủy (destructive actions).

## 2. Tái cấu trúc Layout QR Preview (Preview Layout Upgrade)

### Mục tiêu
Khắc phục lỗi hiển thị chồng chéo văn bản và nút bấm, đồng thời hiện đại hóa giao diện theo phong cách phẳng (Flat Design).

### Kế hoạch thực hiện
1.  **Phân tách khối (Block Separation):**
    *   Chia khu vực Preview thành 3 khối dọc riêng biệt, không lồng nhau:
        *   **Khối 1:** Mã QR Code (Container riêng).
        *   **Khối 2:** Văn bản hiển thị (Text Display).
        *   **Khối 3:** Nhóm nút hành động (Download/Copy).
    *   **Lý do:** Ngăn chặn tuyệt đối việc nút bấm che mất chữ khi văn bản dài. Đảm bảo hiển thị tốt trên mọi kích thước màn hình.

2.  **Loại bỏ khung viền bao quanh (Remove Wrapper):**
    *   Xóa bỏ đường viền (border) và hiệu ứng đổ bóng (shadow) bao quanh toàn bộ khu vực Preview.
    *   **Lý do:** Chuyển sang phong cách tối giản, tập trung vào nội dung chính là mã QR. Tạo cảm giác thoáng đãng hơn.

3.  **Tối ưu hóa Responsive (Mobile First):**
    *   Sửa lỗi vỡ giao diện trên Mobile (375px).
    *   Chuyển đổi layout từ Grid (Cố định cột) sang Flex Column (Xếp chồng) khi ở màn hình nhỏ.
    *   Đảm bảo Sidebar và Preview hiển thị mượt mà, không bị bóp méo.

## 3. Chuyên biệt hóa Tài liệu Hướng dẫn (Documentation & Tests)

### Mục tiêu
Tách biệt công cụ và hướng dẫn, xây dựng tài liệu chuẩn mực (OpenAPI style) và đảm bảo độ chính xác kỹ thuật.

### Kế hoạch thực hiện
1.  **Di chuyển Integration Guide:**
    *   Loại bỏ hoàn toàn phần "Integration Guide" inline ở trang công cụ chính.
    *   Chuyển nội dung sang trang `/guide` (Hướng dẫn chi tiết).
    *   **Lý do:** Giảm tải thông tin cho trang công cụ, giúp người dùng tập trung vào việc tạo QR.

2.  **Cấu trúc lại trang Guide:**
    *   Tạo phần **"Thiết lập chung" (Common Setup)**: Hướng dẫn các tham số cơ bản (size, color, level).
    *   Tách biệt hướng dẫn **Template GET**: Dành cho URL ngắn, tích hợp Google Sheets (`=IMAGE()`).
    *   Tách biệt hướng dẫn **Template POST**: Dành cho dữ liệu phức tạp, hướng dẫn dùng `fetch` hoặc `cURL`.
    *   **Lý do:** Phục vụ đúng nhu cầu của từng đối tượng người dùng (Basic User vs Developer).

3.  **Kiểm thử tự động (Quality Assurance):**
    *   Viết **Unit Test** và **Test Cases** cho module sinh URL API (`QREmbedGenerator`).
    *   Tạo test case kiểm tra:
        *   URL sinh ra có đúng format GET không?
        *   Payload POST có chứa đủ dữ liệu không?
        *   Các tham số (color, size) có được map đúng không?
    *   **Lý do:** Tự động hóa việc kiểm tra độ chính xác của tài liệu API. Đảm bảo khi mở rộng tính năng Premium (API Key), hệ thống vẫn hoạt động ổn định mà không cần sửa đổi cốt lõi ("Future-proof").

## 4. Các bước thực hiện dự kiến

1.  **Bước 1 (Layout):** Sửa lỗi Responsive và tách khối QR Preview.
2.  **Bước 2 (Logo):** Di chuyển Logo Manager vào Advanced và update style nút bấm.
3.  **Bước 3 (Docs):** Refactor trang Guide và xóa Embed Section ở trang tool.
4.  **Bước 4 (Tests):** Viết Unit Test cho API Generator.
