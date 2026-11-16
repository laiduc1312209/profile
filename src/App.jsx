import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { profileConfig } from './profileConfig';
import Avatar from './components/Avatar';
import SocialCard from './components/SocialCard';
import InteractiveGrid from './components/InteractiveGrid';
import AudioPlayer from './components/AudioPlayer';
import ThemeSwitcher from './components/ThemeSwitcher';
import { Share2, Check, Sparkles } from 'lucide-react';

export default function App() {
  const { name, handle, role, bio, avatar, tags, socialLinks } = profileConfig;
  const [copiedLink, setCopiedLink] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('user-theme') || 'violet-dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('user-theme', theme);
  }, [theme]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2400);
  };

  return (
    <div className="relative min-h-screen text-[var(--text-primary)] flex flex-col items-center justify-between px-4 py-12 sm:py-16 selection:bg-[var(--text-accent)]/20 selection:text-[var(--text-primary)] overflow-x-hidden transition-colors duration-300">
      {/* 1. Màn hình Intro khởi động (Click to continue) */}
      <AnimatePresence>
        {!isStarted && (
          <motion.div
            key="intro-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setIsStarted(true)}
            className="fixed inset-0 z-50 bg-black/20 backdrop-blur-md flex flex-col items-center justify-center cursor-pointer select-none"
          >
            {/* Logo ở trung tâm màn hình với hiệu ứng chuẩn bị bay vào vị trí chính */}
            <motion.div
              layoutId="main-logo-container"
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="relative p-2 rounded-full bg-[var(--card-bg)] border border-[var(--topbar-border)] shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl group hover:scale-105 transition-transform"
            >
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-[var(--icon-bg)] flex items-center justify-center">
                <img
                  src={avatar}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Dòng chữ Click to continue & Khuyến nghị */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="mt-6 flex flex-col items-center gap-1.5"
            >
              <span className="text-sm font-semibold tracking-widest uppercase font-mono text-[var(--text-primary)] animate-pulse">
                Click to continue
              </span>
              <span className="text-xs text-[var(--text-secondary)] font-mono tracking-wide">
                Use a computer for the best experience
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Audio Controller & Trình phát nhạc nền YouTube */}
      <AudioPlayer 
        isStarted={isStarted} 
        onAudioStateChange={(state) => setIsAudioActive(state.isAudioActive)}
      />

      {/* 3. Lưới ô vuông tương tác phủ toàn màn hình (Hover & Sóng nhạc nền biến đổi theo theme) */}
      <InteractiveGrid isAudioActive={isAudioActive} theme={theme} />

      {/* 4. Ánh sáng nền khuếch tán cực nhẹ */}
      <div 
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-b from-[var(--text-accent)]/15 via-[var(--card-border)]/10 to-transparent blur-3xl pointer-events-none z-0 transition-all duration-500" 
        aria-hidden="true" 
      />

      {/* Top Floating Action Bar (Nút Đổi Theme bên trái & Nút Chia sẻ bên phải) */}
      <div className="w-full max-w-md mx-auto flex items-center justify-between mb-4 relative z-20">
        <ThemeSwitcher currentTheme={theme} onThemeChange={setTheme} />

        <button
          onClick={handleShare}
          className="group relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[var(--topbar-text)] bg-[var(--topbar-bg)] border border-[var(--topbar-border)] backdrop-blur-md hover:border-[var(--topbar-hover-border)] transition-all duration-300 cursor-pointer shadow-sm"
          title="Sao chép liên kết trang cá nhân"
        >
          {copiedLink ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Đã sao chép link</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors" />
              <span>Chia sẻ</span>
            </>
          )}
        </button>
      </div>

      {/* Main Container */}
      <main className="w-full max-w-md mx-auto flex flex-col items-center text-center relative z-10">
        {/* Profile Avatar với hiệu ứng gợn sóng lan tỏa & bay vào từ Intro */}
        <Avatar src={avatar} alt={name} isStarted={isStarted} />

        {/* Profile Identity & Bio */}
        <motion.div 
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: isStarted ? 1 : 0.8, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mt-2 w-full flex flex-col items-center"
        >
          {/* Name với màu sắc tương thích theme */}
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] flex items-center justify-center gap-2">
            <span>{name}</span>
            <span title="Xác minh hồ sơ" className="inline-flex text-[var(--text-accent)]">
              <Sparkles className="w-4 h-4 fill-current opacity-70" />
            </span>
          </h1>

          {/* Handle */}
          <div className="flex items-center justify-center mt-1">
            <span className="text-sm font-medium text-[var(--text-accent)]">
              {handle}
            </span>
            {role && (
              <>
                <span className="text-[var(--text-secondary)] mx-2">•</span>
                <span className="text-sm text-[var(--text-secondary)] font-normal">
                  {role}
                </span>
              </>
            )}
          </div>

          {/* Bio text */}
          <p className="mt-3.5 text-sm sm:text-[15px] leading-relaxed text-[var(--text-secondary)] max-w-[42ch]">
            {bio}
          </p>

          {/* Tags / Pills */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 font-mono">
              {tags.map((tag, idx) => (
                <span
                  key={`${tag}-${idx}`}
                  className="px-3 py-1 text-xs font-medium rounded-lg bg-[var(--pill-bg)] border border-[var(--pill-border)] text-[var(--pill-text)] hover:border-[var(--card-border-hover)] hover:text-[var(--text-primary)] transition-all duration-300 shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* Social Links Cards Stack */}
        <div className="w-full flex flex-col gap-3 mt-7">
          {socialLinks.map((link, index) => (
            <SocialCard key={link.id} link={link} index={index} />
          ))}
        </div>
      </main>
    </div>
  );
}
