# Guide to Running DEV the Project

Dưới đây là danh sách các câu lệnh điều khiển dự án được định nghĩa trong `package.json`.

### Setup

| Lệnh                                                                                          | Chức năng                                                                        |
| --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `yarn prepare`                                                                                | Khởi tạo **Husky** để tự động thiết lập Git Hooks ngay sau khi cài đặt thư viện. |
| `echo "yarn lint && yarn prettier-check" > .husky/pre-commit && chmod +x .husky/pre-commit`   | Cấu hình Git Hook để kiểm tra mã nguồn trước khi commit.                         |
| `echo 'npx --no -- commitlint --edit "$1"' > .husky/commit-msg && chmod +x .husky/commit-msg` | Cấu hình Git Hook để kiểm tra định dạng commit message.                          |

### Development

| Lệnh          | Chức năng                                                                       |
| ------------- | ------------------------------------------------------------------------------- |
| `yarn dev`    | Khởi động tất cả các ứng dụng con song song (parallel) kèm nạp biến môi trường. |
| `yarn format` | Dọn dẹp và định dạng lại mã nguồn bằng **Prettier** cho toàn bộ dự án.          |
| `yarn fmt`    | Định dạng mã nguồn thông qua **Turborepo** (tối ưu tốc độ nhờ bộ nhớ đệm).      |

### Format Commit Message

| Lệnh      | Chức năng                                                                                   |
| --------- | ------------------------------------------------------------------------------------------- |
| `yarn cz` | Mở giao diện trắc nghiệm (**Commitizen**) để viết lời nhắn commit đúng chuẩn chuyên nghiệp. |

### Quality Assurance

| Lệnh                  | Chức năng                                                                                   |
| --------------------- | ------------------------------------------------------------------------------------------- |
| `yarn lint`           | Quét lỗi logic, biến thừa và các vi phạm quy chuẩn code (**ESLint**).                       |
| `yarn prettier-check` | Kiểm tra định dạng code (không tự sửa), thường dùng cho hệ thống kiểm tra tự động (**CI**). |
| `yarn test`           | Chạy toàn bộ các bài kiểm tra tự động (unit test) trong Monorepo.                           |

### Deployment

| Lệnh         | Chức năng                                                                        |
| ------------ | -------------------------------------------------------------------------------- |
| `yarn build` | Biên dịch và đóng gói toàn bộ ứng dụng thành phiên bản tối ưu nhất (Production). |
| `yarn start` | Chạy ứng dụng đã đóng gói ở chế độ thực tế với hiệu suất cao nhất.               |

---

## Standard Workflow

0. **Install:** `yarn install`
1. **Start:** `yarn dev`
2. **Format:** `yarn fmt`
3. **Check:** `yarn lint` & `yarn test`
4. **Commit:** `git add .` & `yarn cz`
5. **Deploy:** `yarn build` & `yarn start`

---

> **NOTE:** Luôn tuân thủ quy trình trên để duy trì chất lượng mã nguồn và hiệu suất dự án.

# Guide to Running PROD the Project

1. **check yarn**
   ```bash
   yarn -v
   ```
   ###
2. **build**
   ```
   yarn build --filter=home
   yarn build --filter=blog
   yarn build --filter=tool
   ```
3. **start**
   ```
   yarn turbo run start --filter=home
   yarn turbo run start --filter=blog
   yarn turbo run start --filter=tool
   ```
