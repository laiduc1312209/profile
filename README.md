# ✦ Minimalist Bio Profile (React + Tailwind CSS)

Giao diện Bio Profile cá nhân hiện đại, tối giản với tone màu chủ đạo đen - trắng, điểm xuyết ánh sáng tím (violet glow) tinh tế.

## ✨ Điểm nổi bật
- **Thiết kế tối giản, hiện đại**: Nền đen obsidian `#09090b`, typography tương phản sắc nét, viền kính mờ và hiệu ứng phát sáng violet nhẹ nhàng.
- **Tương tác mượt mà**: Tích hợp Framer Motion với hiệu ứng hover, tap và chuyển động mượt mà đạt chuẩn craft.
- **Cấu hình 1 file duy nhất**: Mọi thông tin (Họ tên, avatar, bio, các liên kết MXH) đều được quản lý tập trung tại `src/profileConfig.js`.
- **Tối ưu hiển thị**: Chuẩn responsive cho cả điện thoại (khi gắn link bio TikTok, Instagram, Facebook) và máy tính.
- **Sẵn có các MXH chính**: GitHub, Facebook, TikTok, Gmail (với icon SVG sắc nét, đồng bộ nét vẽ 2px).

---

## 🚀 Khởi chạy dự án

### 1. Cài đặt thư viện (nếu chưa cài):
```bash
npm install
```

### 2. Chạy môi trường phát triển (Dev server):
```bash
npm run dev
```

### 3. Build sản phẩm (Production build):
```bash
npm run build
```

---

## 🛠️ Hướng dẫn tùy biến thông tin cá nhân

Mở file [`src/profileConfig.js`](src/profileConfig.js) để chỉnh sửa:
- `name`: Tên của bạn.
- `handle`: Username (ví dụ: `@yourname`).
- `role`: Chức danh / Nghề nghiệp.
- `bio`: Đoạn giới thiệu ngắn.
- `avatar`: Đường link ảnh đại diện hoặc file ảnh trong thư mục `public/`.
- `socialLinks`: Thay đổi đường link và tên tài khoản Facebook, TikTok, GitHub, Gmail của bạn.
