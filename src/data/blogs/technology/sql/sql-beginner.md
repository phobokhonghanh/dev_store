---
title: "SQL Cơ Bản: Tư Duy Về Dữ Liệu Thay Vì Cú Pháp"
excerpt: "Tại sao tư duy theo tập hợp (Set-based) quan trọng hơn việc thuộc lòng cú pháp. Những cạm bẫy thực tế mà người mới thường gặp khi làm việc với database production."
tags: ["sql", "database", "data"]
estimated_read_time: "8 mins"
date: "2025-12-14"
---

# SQL Cơ Bản: Tư Duy Về Dữ Liệu Thay Vì Cú Pháp

Khi bắt đầu học SQL đa số chúng ta thường lao vào học thuộc các từ khóa: `SELECT`, `FROM`, `WHERE`... như học từ vựng tiếng Anh. Nhưng SQL không hoạt động giống như các ngôn ngữ lập trình thông thường. Nó là một **ngôn ngữ khai báo (declarative)**. Chúng ta không ra lệnh cho máy tính "làm thế nào", chúng ta chỉ mô tả "cái gì" chúng ta muốn.

Bài viết này sẽ tổng hợp lại những kiến thức nền tảng nhất về SQL, dưới góc nhìn thực tế trong môi trường production.

## Bản chất của việc truy vấn

Bản chất của việc truy vấn không phải là **lấy dữ liệu** mà là **đặt ra ranh giới** để hệ thống đưa dữ liệu theo đúng ranh giới đó.  
Chúng ta cần nói với hệ thống: "_Tôi chỉ quan tâm đến đúng phần này, còn lại bỏ qua._"

### 1. SELECT và cái giá của sự lười biếng

Câu lệnh `SELECT *` là thứ đầu tiên chúng ta học, nhưng là thứ đầu tiên chúng ta cần bỏ khi đi làm.
Trong một dự án thực tế, bảng `logs` hoặc `orders` có thể có hàng chục cột với hàng triệu bản ghi.

- **Vấn đề:** `SELECT *` ép database phải đọc dữ liệu từ ổ cứng lên RAM, rồi truyền qua mạng về máy bạn. Nó giết chết hiệu năng hệ thống (I/O bound).
- **Tư duy đúng:** Luôn chỉ đích danh cột mình cần. `SELECT id, created_at` luôn nhanh và an toàn hơn `SELECT *`.

### 2. WHERE không chỉ là bộ lọc

Hãy nghĩ về `WHERE` như cái phễu đầu vào. Chúng ta loại bỏ dữ liệu rác càng sớm, các bước xử lý sau (như sort, join) càng nhẹ nhàng.
Một truy vấn tốt là truy vấn lọc bỏ dữ liệu ngay từ bước đầu tiên.

## Sự ảo diệu của JOIN

Dữ liệu trong database quan hệ (RDBMS) bị xé nhỏ ra nhiều bảng để đảm bảo tính nhất quán (Normalization). JOIN là cách chúng ta hàn gắn chúng lại.

Tuy nhiên, cạm bẫy nằm ở **INNER JOIN** và **LEFT JOIN**.

- **INNER JOIN**: Rất an toàn, chỉ lấy phần chung. Nhưng nếu dữ liệu bị bẩn (ví dụ: đơn hàng có `user_id` nhưng user đó đã bị xóa), chúng ta sẽ bị mất dữ liệu đơn hàng đó mà không hay biết.
- **LEFT JOIN**: An toàn hơn về mặt bảo toàn dữ liệu bảng gốc, nhưng sinh ra các giá trị `NULL`. Và `NULL` trong SQL là nguồn gốc của mọi rắc rối.

## NULL - Kẻ thù thầm lặng

Trong lập trình, `0` là số 0, `""` là chuỗi rỗng. Nhưng trong SQL, `NULL` có nghĩa là "không biết" (unknown).

- `1 + NULL = NULL`
- `NULL = NULL` trả về kết quả là... NULL (không phải True).

**Lỗi kinh điển**
Viết `WHERE status != 'active'`. Bạn nghĩ nó sẽ lấy ra các dòng 'inactive' và 'pending'?
Thực tế: Nó sẽ bỏ qua tất cả các dòng có status là `NULL`. Vì máy tính không biết NULL có khác 'active' hay không.
**Cách sửa:** Luôn phải xử lý NULL (`WHERE status != 'active' OR status IS NULL`).

## Aggregation: Gom nhóm tư duy

Khi dùng `GROUP BY`, chúng ta đang ép database thay đổi cấu trúc dữ liệu từ "chi tiết" sang "tổng hợp".

Quy tắc vàng: Mọi cột xuất hiện trong `SELECT` mà không nằm trong hàm tổng hợp (`SUM`, `COUNT`, `MAX`...) thì BẮT BUỘC phải nằm trong `GROUP BY`.

Nhiều database hiện đại (như MySQL ràng buộc lỏng lẻo) cho phép chúng ta vi phạm quy tắc này, nhưng kết quả trả về sẽ là ngẫu nhiên và sai lệch.

## Tổng kết

Không cần biết quá nhiều hàm lạ. Chỉ cần nắm chắc cơ bản như:

1.  Hiểu rõ thứ tự chạy của câu lệnh (database đọc `FROM` trước, không phải `SELECT`).
2.  Sợ hãi `SELECT *`.
3.  Cẩn trọng tuyệt đối với `NULL`.
4.  Hiểu bản chất dữ liệu trước khi viết `JOIN`.

SQL rất dễ học trong 1 tuần, nhưng để viết những câu query chạy trong 10ms thay vì 10 phút, chúng ta cần hiểu sâu về những gì diễn ra bên dưới.
