/**
 * File cấu hình thông tin cá nhân (Bio Profile)
 * Bạn có thể dễ dàng thay đổi thông tin, avatar và các liên kết mạng xã hội tại đây.
 */

export const profileConfig = {
  // Thông tin cơ bản
  name: "Lai Duc",
  handle: "@laiduc1312",
  bio: "Just a purely aesthetic sentence placed here to balance the layout. It has absolutely zero meaning, but visually it looks undeniably cool.",
  location: "Vietnam",
  
  // Avatar / Logo: Sử dụng file logo từ public/logo.png
  avatar: "/logo.png",

  // Nhạc nền YouTube (ID bài hát: https://www.youtube.com/watch?v=bbdsIR4UHDg)
  youtubeMusicId: "bbdsIR4UHDg",

  // Trạng thái hiện tại
  status: {
    available: true,
    text: "Sẵn sàng nhận dự án mới",
  },

  // Các thẻ / mốc thời gian ngắn gọn
  tags: ["13", "12", "2009"],

  // Danh sách các liên kết mạng xã hội chính
  socialLinks: [
    {
      id: "github",
      title: "GitHub",
      handle: "github.com/laiduc1312209",
      url: "https://github.com/laiduc1312209",
      description: "Mã nguồn, dự án cá nhân & đóng góp cộng đồng",
    },
    {
      id: "facebook",
      title: "Facebook",
      handle: "fb.com/laiduc1312",
      url: "https://www.facebook.com/laiduc1312",
      description: "Kết nối và trò chuyện trên Facebook",
    },
    {
      id: "tiktok",
      title: "TikTok",
      handle: "@rrweq1112",
      url: "https://www.tiktok.com/@rrweq1112",
      description: "Kênh video ngắn trên TikTok",
    },
    {
      id: "discord",
      title: "Discord",
      handle: "laiduc1312",
      copyValue: "laiduc1312",
      url: "https://discord.com",
      description: "Kết nối và trò chuyện trên Discord",
    },
    {
      id: "gmail",
      title: "Gmail",
      handle: "laiduc13122009@gmail.com",
      email: "laiduc13122009@gmail.com",
      url: "mailto:laiduc13122009@gmail.com",
      isEmail: true,
      description: "Gửi thư trao đổi công việc hoặc hợp tác",
    },
  ],
};
