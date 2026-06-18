# WealthFlow | Personal Finance Manager

**WealthFlow** là ứng dụng quản lý tài chính cá nhân được thiết kế giúp người dùng kiểm soát dòng tiền, thiết lập hạn mức chi tiêu theo danh mục và theo dõi biến động tài chính theo từng kỳ.

## Tính năng chính

- **Tổng quan Dashboard:** Theo dõi số dư, tổng thu và tổng chi theo thời gian thực.
- **Quản lý danh mục:** CRUD danh mục chi tiêu với hạn mức (budget ceiling) riêng biệt.
- **Cảnh báo ngân sách:** Tự động phát cảnh báo trực quan khi chi tiêu vượt hạn mức danh mục.
- **Quản lý giao dịch:** Ghi chép thu/chi, kèm ghi chú, danh mục và lịch sử sắp xếp theo thời gian.
- **Bộ lọc thời gian:** Chế độ xem dữ liệu linh hoạt theo Tháng/Năm.
- **Thống kê báo cáo:** Bảng tổng hợp chi tiêu các tháng, cho phép so sánh hiệu quả tài chính.

## Công nghệ sử dụng

### Frontend
- TypeScript
- Vite

### Styling
- Tailwind CSS (Responsive Design)

### Data Persistence
- LocalStorage API

### Icons
- Material Symbols

## Hướng dẫn cài đặt

### 1. Yêu cầu hệ thống

- Node.js v16.0.0 trở lên
- npm hoặc yarn

### 2. Các bước triển khai

```bash
# Bước 1: Cài đặt các gói phụ thuộc
npm install

# Bước 2: Khởi chạy môi trường phát triển
npm run dev
```

### 3. Build ứng dụng

```bash
npm run build
```

### 4. Preview bản build

```bash
npm run preview
```

## Cấu trúc chức năng

```text
WealthFlow
├── Dashboard
│   ├── Balance Overview
│   ├── Income Tracking
│   └── Expense Tracking
│
├── Categories
│   ├── Create Category
│   ├── Update Category
│   ├── Delete Category
│   └── Budget Limit Management
│
├── Transactions
│   ├── Add Transaction
│   ├── Edit Transaction
│   ├── Delete Transaction
│   └── Transaction History
│
├── Reports
│   ├── Monthly Summary
│  
│   
│
└── Settings
    └── Data Persistence (LocalStorage)
```

## Mục tiêu dự án

WealthFlow được xây dựng nhằm giúp người dùng:

- Theo dõi tình hình tài chính cá nhân một cách trực quan.
- Kiểm soát chi tiêu theo từng danh mục.
- Hạn chế vượt ngân sách nhờ hệ thống cảnh báo.
- Đánh giá hiệu quả quản lý tài chính qua các báo cáo định kỳ.
