/**
 * Profile Configuration
 * Customize your bio profile, avatar, social links, and music here.
 */

export const profileConfig = {
  // Basic info
  name: "Lai Duc",
  handle: "@laiduc1312",
  bio: "Just a purely aesthetic sentence placed here to balance the layout. It has absolutely zero meaning, but visually it looks undeniably cool.",
  location: "Vietnam",
  
  // Avatar / Logo: Stored in public/logo.png
  avatar: "/logo.png",

  // YouTube background music (Song ID: https://www.youtube.com/watch?v=bbdsIR4UHDg)
  youtubeMusicId: "bbdsIR4UHDg",

  // Current status
  status: {
    available: true,
    text: "Available for new projects",
  },

  // Tags / pills
  tags: ["13", "12", "2009"],

  // Social links list
  socialLinks: [
    {
      id: "github",
      title: "GitHub",
      handle: "github.com/laiduc1312209",
      url: "https://github.com/laiduc1312209",
      description: "Source code, personal projects & contributions",
    },
    {
      id: "facebook",
      title: "Facebook",
      handle: "fb.com/laiduc1312",
      url: "https://www.facebook.com/laiduc1312",
      description: "Connect and chat on Facebook",
    },
    {
      id: "tiktok",
      title: "TikTok",
      handle: "@rrweq1112",
      url: "https://www.tiktok.com/@rrweq1112",
      description: "Short video channel on TikTok",
    },
    {
      id: "discord",
      title: "Discord",
      handle: "laiduc1312",
      copyValue: "laiduc1312",
      url: "https://discord.com",
      description: "Connect and chat on Discord",
    },
    {
      id: "gmail",
      title: "Gmail",
      handle: "laiduc13122009@gmail.com",
      email: "laiduc13122009@gmail.com",
      url: "mailto:laiduc13122009@gmail.com",
      isEmail: true,
      description: "Send an email for work or collaboration",
    },
  ],
};
