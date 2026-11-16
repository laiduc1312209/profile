import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { profileConfig } from './profileConfig';
import Avatar from './components/Avatar';
import SocialCard from './components/SocialCard';
import InteractiveGrid from './components/InteractiveGrid';
import AudioPlayer from './components/AudioPlayer';
import { Share2, Check, Sparkles } from 'lucide-react';

export default function App() {
  const { name, handle, role, bio, avatar, tags, socialLinks } = profileConfig;
  const [copiedLink, setCopiedLink] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2400);
  };

  return (
    <div className="relative min-h-screen text-[#f4f4f5] flex flex-col items-center justify-between px-4 py-12 sm:py-16 selection:bg-white/20 selection:text-white overflow-x-hidden">
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
              className="relative p-2 rounded-full bg-[#111116] border border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.8),_0_0_35px_rgba(255,255,255,0.15)] backdrop-blur-xl group hover:scale-105 transition-transform"
            >
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-[#0d0d12] flex items-center justify-center">
                <img
                  src={avatar}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Dòng chữ Click to continue */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="mt-6 flex flex-col items-center"
            >
              <span className="text-sm font-semibold tracking-widest uppercase font-mono text-white/90 animate-pulse">
                Click to continue
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

      {/* 3. Lưới ô vuông tương tác phủ toàn màn hình (Hover đổi màu trắng & sóng nhạc nền) */}
      <InteractiveGrid isAudioActive={isAudioActive} />

      {/* 4. Ánh sáng nền khuếch tán cực nhẹ (Chủ đạo trắng, điểm xuyết tím) */}
      <div 
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-b from-white/10 via-violet-900/10 to-transparent blur-3xl pointer-events-none z-0" 
        aria-hidden="true" 
      />

      {/* Top Floating Action Bar (Nút Chia sẻ tối giản viền trắng) */}
      <div className="w-full max-w-md mx-auto flex justify-end mb-4 relative z-20">
        <button
          onClick={handleShare}
          className="group relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-zinc-300 bg-zinc-950/90 border border-white/20 backdrop-blur-md hover:border-white/60 hover:text-white hover:bg-white/15 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 cursor-pointer"
          title="Sao chép liên kết trang cá nhân"
        >
          {copiedLink ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-white">Đã sao chép link</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
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
          {/* Name với màu trắng sắc nét */}
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center justify-center gap-2">
            <span>{name}</span>
            <span title="Xác minh hồ sơ" className="inline-flex text-violet-400">
              <Sparkles className="w-4 h-4 fill-violet-400/20" />
            </span>
          </h1>

          {/* Handle */}
          <div className="flex items-center justify-center mt-1">
            <span className="text-sm font-medium text-violet-400">
              {handle}
            </span>
            {role && (
              <>
                <span className="text-zinc-600 mx-2">•</span>
                <span className="text-sm text-zinc-300 font-normal">
                  {role}
                </span>
              </>
            )}
          </div>

          {/* Bio text */}
          <p className="mt-3.5 text-sm sm:text-[15px] leading-relaxed text-zinc-300 max-w-[42ch]">
            {bio}
          </p>

          {/* Tags / Pills phong cách đen trắng tối giản */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 font-mono">
              {tags.map((tag, idx) => (
                <span
                  key={`${tag}-${idx}`}
                  className="px-3 py-1 text-xs font-medium rounded-lg bg-zinc-900/90 border border-white/15 text-zinc-300 hover:border-white/50 hover:text-white hover:bg-white/10 transition-all duration-300 shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* Danh sách thẻ liên kết 3D Parallax */}
        <div className="w-full mt-7 flex flex-col gap-3.5 pb-12">
          {socialLinks.map((link, index) => (
            <SocialCard key={link.id} link={link} index={index} />
          ))}
        </div>
      </main>
    </div>
  );
}
