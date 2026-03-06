# Kỷ Niệm 4 Tháng Yêu Nhau 💕

Website kỷ niệm 4 tháng bên nhau của **Nguyễn Thành Nhật** & **Mạc Thị Thanh Chiều**

## ✨ Tính Năng

### 🏠 Trang Chủ
- Countdown thời gian yêu nhau (tháng, ngày, giờ, phút, giây)
- Hiển thị số ngày đã bên nhau
- Animations đẹp mắt với particles bay lên
- Menu điều hướng nhanh đến các tính năng

### 📸 Album Ảnh (Gallery)
- 8 tấm ảnh kỷ niệm với placeholder
- Lightbox xem ảnh chi tiết
- Tính năng like/unlike ảnh
- Hover effects mượt mà

### ⏰ Dòng Thời Gian (Timeline)
- 5 sự kiện quan trọng trong hành trình tình yêu
- Hiển thị theo timeline đẹp mắt
- Animations khi scroll

### 💌 Thư Tình (Letter)
- Lá thư tình yêu chân thành
- Typography đẹp, dễ đọc
- Hiệu ứng trái tim bay

### 🎮 Memory Game
- Trò chơi lật thẻ ghép hình
- 16 lá bài với emoji trái tim
- Đếm số nước đi và thời gian
- Màn hình chiến thắng

### ❓ Love Quiz
- 5 câu hỏi về người yêu
- Hiệu ứng đúng/sai trực quan
- Tính điểm và đánh giá kết quả
- Có thể làm lại nhiều lần

### 💝 Love Calculator
- Tính độ hợp của hai người
- Hiển thị kết quả với progress circle
- Animations đẹp mắt
- Luôn cho kết quả cao cho cặp đôi của bạn 😉

### 💬 Lời Nhắn (Messages)
- Wall để viết những lời nhắn tình yêu
- Thêm, xóa lời nhắn
- 8 lời nhắn mẫu có sẵn
- Mỗi lời nhắn có emoji riêng

## 🚀 Bắt Đầu

### Cài đặt
```bash
cd e:\mylove-4months
npm install
```

### Chạy Development Server
```bash
npm run dev
```

Website sẽ chạy tại: **http://localhost:3000** (hoặc port khác nếu 3000 đã được dùng)

### Build cho Production
```bash
npm run build
npm run preview
```

## 🛠️ Công Nghệ Sử Dụng

- **React 18** - UI Framework
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **React Router** - Navigation
- **Vite** - Build tool

## 🎨 Tính Năng Nổi Bật

- ✅ Giao diện đẹp, hiện đại với gradient màu hồng
- ✅ Responsive trên mọi thiết bị
- ✅ Animations mượt mà với Framer Motion
- ✅ Nhiều mini games giải trí
- ✅ Tương tác tốt với hover effects
- ✅ Glass morphism design
- ✅ Particles effect liên tục
- ✅ Dark mode ready (có thể thêm sau)

## 📝 Tùy Chỉnh

### Thay đổi thông tin cặp đôi
Mở file `src/data/constants.ts` và chỉnh sửa:
- Tên hai người
- Ngày bắt đầu yêu nhau
- Các sự kiện timeline
- Câu hỏi quiz
- Lời nhắn

### Thay ảnh trong gallery
Thay thế `placeholder` URLs trong `PHOTOS` array bằng URLs ảnh thật của bạn.

## 📂 Cấu Trúc Dự Án

```
src/
├── components/          # Các components dùng chung
│   ├── Layout.tsx      # Layout chính với navbar
│   ├── Navbar.tsx      # Navigation bar
│   └── Particles.tsx   # Hiệu ứng particles
├── pages/              # Các trang chính
│   ├── Home.tsx        # Trang chủ
│   ├── Gallery.tsx     # Album ảnh
│   ├── Timeline.tsx    # Dòng thời gian
│   ├── Letter.tsx      # Thư tình
│   ├── MemoryGame.tsx  # Trò chơi ghép hình
│   ├── LoveQuiz.tsx    # Quiz về nhau
│   ├── LoveCalculator.tsx # Tính độ hợp
│   └── Messages.tsx    # Lời nhắn
├── data/
│   └── constants.ts    # Dữ liệu và config
├── App.tsx             # Root component với routing
├── main.tsx            # Entry point
└── index.css           # Tailwind & global styles
```

## 💡 Ý Tưởng Phát Triển Thêm

- [ ] Thêm music player với bài hát yêu thích
- [ ] Countdown đến ngày kỷ niệm tiếp theo
- [ ] Video player cho video kỷ niệm
- [ ] Tic-tac-toe game
- [ ] Puzzle game với ảnh của hai người
- [ ] Chat box giả lập tin nhắn
- [ ] Guest book cho bạn bè để lại lời chúc
- [ ] Dark mode toggle
- [ ] Share social media
- [ ] PWA - cài đặt như app trên điện thoại

## 📱 Screenshots

Website có các màn hình:
1. **Trang chủ** - Countdown và menu chính
2. **Gallery** - Album ảnh với lightbox
3. **Timeline** - Lịch sử tình yêu
4. **Letter** - Thư tình
5. **Memory Game** - Trò chơi lật thẻ
6. **Quiz** - Câu hỏi về người yêu
7. **Love Calculator** - Tính độ hợp
8. **Messages** - Lời nhắn yêu thương

## ❤️ Made with Love

Được tạo ra với tất cả tình yêu dành cho kỷ niệm 4 tháng đặc biệt!

---

**Ngày bắt đầu:** 00:41 ngày 07/11/2025  
**Tạo bởi:** GitHub Copilot 💕

