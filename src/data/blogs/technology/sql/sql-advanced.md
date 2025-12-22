---
title: "SQL Nâng Cao: Hiểu Sâu Về Execution Order và Window Functions"
description: "Phân tích cách Database Engine thực thi câu lệnh để tối ưu hiệu năng. Sử dụng Window Functions và CTEs để giải quyết các bài toán phân tích phức tạp."
category: "tech/core"
tags: ["sql", "advanced", "performance", "architecture"]
level: "senior"
estimated_read_time: "12 mins"
date: "2025-12-14"
---

# SQL Nâng Cao: Hiểu Sâu Về Execution Order và Window Functions

Khi đã thành thạo việc lấy dữ liệu (CRUD), ranh giới giữa một người làm SQL bình thường và một chuyên gia (Advanced) nằm ở hai điểm: khả năng giải quyết các bài toán phân tích phức tạp (Analytical Query) và khả năng tối ưu hóa hiệu năng (Performance Tuning).

Bài viết này sẽ không liệt kê cú pháp, mà tập trung vào tư duy hệ thống.

## 1. Bí mật về thứ tự thực thi (Order of Execution)

Chúng ta viết SQL theo thứ tự từ trên xuống dưới: `SELECT` -> `FROM` -> `WHERE`.
Nhưng Database Engine **không** đọc như vậy. Nó đọc theo thứ tự logic của dữ liệu. Hiểu điều này là chìa khóa để debug và tối ưu.

Thứ tự thực tế:

1.  **FROM / JOIN**: Đầu tiên, DB cần biết dữ liệu nằm ở đâu, ghép bảng nào với bảng nào. Đây là bước tốn tài nguyên nhất (Cartesian product có thể xảy ra ở đây).
2.  **WHERE**: Sau khi có tập dữ liệu thô, nó lọc ngay lập tức. Đây là lý do tại sao Indexing cột trong WHERE lại quan trọng đến thế.
3.  **GROUP BY**: Gom nhóm dữ liệu còn lại.
4.  **HAVING**: Lọc dữ liệu sau khi đã gom nhóm.
5.  **SELECT**: Đến tận lúc này, DB mới tính toán xem cần lấy cột nào, hay chạy các hàm biến đổi dữ liệu.
6.  **ORDER BY / LIMIT**: Sắp xếp và cắt bớt kết quả cuối cùng.

**Tại sao điều này quan trọng?**
Bạn đã bao giờ thử dùng một Alias (tên giả) định nghĩa trong `SELECT` để đưa vào `WHERE` và bị lỗi chưa?
Ví dụ: `SELECT total_price as t ... WHERE t > 100`.
Lỗi xảy ra vì `WHERE` chạy _trước_ `SELECT`. Tại thời điểm lọc, DB chưa hề biết `t` là cái gì.

## 2. Window Functions: Tư duy "Cửa sổ" thay vì "Gom nhóm"

`GROUP BY` có một nhược điểm chí mạng: nó làm mất đi chi tiết. Nếu bạn Group theo tháng để tính tổng doanh thu, bạn sẽ mất thông tin của từng đơn hàng.

Window Functions ra đời để giải quyết bài toán: "Tôi muốn tính toán tổng hợp (aggregate), nhưng vẫn muốn giữ nguyên các dòng dữ liệu chi tiết".

Thay vì cắt dữ liệu thành các nhóm rời rạc, Window Function mở một "cửa sổ" trượt qua từng dòng dữ liệu.

### Ứng dụng thực tế:

- **Ranking**: Tìm top 3 nhân viên lương cao nhất của _mỗi_ phòng ban. (Dùng `ROW_NUMBER()` hoặc `DENSE_RANK()`).
- **Running Total**: Tính doanh thu tích lũy từ đầu năm đến ngày hiện tại.
- **Lag/Lead**: So sánh doanh thu hôm nay với doanh thu hôm qua (để tính % tăng trưởng - MoM, YoY).

Đây là những bài toán mà nếu dùng SQL cổ điển (Subquery) sẽ cực kỳ phức tạp và chậm chạp.

## 3. CTE (Common Table Expressions) vs Subquery

Ngày xưa, chúng ta hay viết Subquery lồng nhau:
`SELECT * FROM (SELECT * FROM (SELECT ...))`
Code này được gọi là "Spaghetti Code" trong SQL. Khó đọc, khó debug.

CTE (với từ khóa `WITH`) giúp chúng ta tách logic thành các khối riêng biệt, đặt tên rõ ràng, đọc từ trên xuống dưới như văn văn xuôi.

**Lưu ý về hiệu năng:**
Ở một số database cũ (như PostgreSQL phiên bản cũ), CTE là một "optimization fence" - tức là database không thể tối ưu hóa xuyên qua ranh giới của CTE. Tuy nhiên, ở các phiên bản hiện đại, CTE và Subquery có hiệu năng tương đương nhau. Giá trị chính của CTE nằm ở sự **rõ ràng của tư duy**.

## 4. Indexing: Không phải cứ nhiều là tốt

Advanced SQL không chỉ là viết query, mà là hiểu về Storage.
Index giống như Mục lục của một cuốn sách. Nếu không có mục lục, bạn phải lật từng trang (Full Table Scan).

**Nghịch lý của Index:**

- Index giúp `SELECT` nhanh thần tốc.
- Nhưng Index làm `INSERT / UPDATE` chậm đi đáng kể. Vì mỗi khi thêm dữ liệu mới, DB phải đi cập nhật lại cái "mục lục" đó.

**Kỹ thuật Sargable (Search ARGument ABLE):**
Một lỗi Senior hay mắc phải là viết query khiến Index bị vô hiệu hóa.

- _Tệ:_ `WHERE YEAR(created_at) = 2024`. (Phải tính toán hàm YEAR cho 1 triệu dòng rồi mới so sánh -> Index vô dụng).
- _Tốt:_ `WHERE created_at >= '2024-01-01' AND created_at < '2025-01-01'`. (So sánh trực tiếp -> Index hoạt động).

## Tổng kết

Để đạt trình độ Advanced, hãy ngừng việc cố gắng học thuộc lòng mọi cú pháp. Hãy bắt đầu đặt câu hỏi:

- Câu lệnh này DB sẽ xử lý các bước như thế nào?
- Tại sao query này chậm? Có phải do full table scan không?
- Dữ liệu này có cần thiết phải lưu trữ trung gian không hay có thể dùng Window Function?

Khi bạn hiểu được "cách suy nghĩ" của Database Engine, bạn sẽ viết được những câu SQL không chỉ đúng, mà còn đẹp và hiệu quả.
