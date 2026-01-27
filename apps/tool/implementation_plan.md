# Kế hoạch Hỗ trợ Bản đồ Offline (Offline Map Support Plan)

Để giải quyết yêu cầu: "Người dùng không có Wifi/3G vẫn xem được tọa độ", giải pháp tối ưu là không phụ thuộc vào trình duyệt web mà tận dụng các ứng dụng bản đồ Native (Google Maps, Offline Maps) đã có sẵn dữ liệu offline trên thiết bị người dùng.

---

## 1. Phân tích Vấn đề

- **Hiện tại**: QR Code chứa URL `https://google.com/maps...`.
- **Hạn chế**: Bắt buộc phải có kết nối Internet để tải trang web Google Maps.
- **Yêu cầu**: Xem được vị trí khi không có mạng.

---

## 2. Giải pháp Kỹ thuật: GEO URI Scheme

Thay vì dùng URL web, chúng ta chuyển sang dùng **URI Scheme** chuẩn quốc tế (RFC 5870).

**Format cũ (Online Only):**

```
https://www.google.com/maps/search/?api=1&query=10.762,106.660
```

**Format mới (Offline Ready):**

```
geo:10.762622,106.660172
```

### Cơ chế hoạt động:

1.  **Quét mã**: Camera/App quét QR nhận diện tiền tố `geo:`.
2.  **Hệ điều hành (iOS/Android)**: Hiểu đây là một tọa độ địa lý.
3.  **Điều hướng**: Tự động mở ứng dụng bản đồ mặc định (Google Maps, Apple Maps, Maps.me,...).
4.  **Offline**: Nếu ứng dụng bản đồ đó đã tải gói bản đồ khu vực (Offline Area), nó sẽ hiển thị điểm đó ngay lập tức mà không cần kết nối mạng.

---

## 3. Thay đổi Cần thiết (Implementation Steps)

### 3.1. Cập nhật `qrcode-utils.ts`

- Sửa hàm `generateLocationString`.
- Input: `LocationData { lat, lng }`.
- Output: Chuỗi `geo:lat,lng`.

### 3.2. Cập nhật UI (`QRCodeTabs.tsx`)

- Thay đổi label hiển thị cho người dùng biết.
- Từ: `Google Maps: ...`
- Sang: `GEO Coordinate: ...` hoặc `Location: ...` để trung lập (vì IOS sẽ mở Apple Maps chứ không phải Google Maps).

---

## 4. Kiểm thử

- [x] Scan bằng iPhone (mở Apple Maps).
- [x] Scan bằng Android (mở Google Maps).
- [x] Tắt Wifi/4G và Scan -> Kiểm tra xem App bản đồ có mở ra và hiện điểm chấm không (nếu đã cache map).

---

## 5. Lưu ý

Giải pháp này phụ thuộc vào việc **người dùng đã cài App bản đồ** trên điện thoại. Hầu hết 100% smartphone đều có sẵn Apple Maps hoặc Google Maps.
