import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { profileConfig } from './profileConfig';
import Avatar from './components/Avatar';
import SocialCard from './components/SocialCard';
import InteractiveGrid from './components/InteractiveGrid';
import AudioPlayer from './components/AudioPlayer';
import ThemeSwitcher from './components/ThemeSwitcher';
import DiscordProfileCard from './components/DiscordProfileCard';
import GithubProfileCard from './components/GithubProfileCard';
import { Share2, Check, Sparkles, Eye, Star } from 'lucide-react';

export default function App() {
  const { name, handle, role, bio, avatar, tags, socialLinks } = profileConfig;
  const [copiedLink, setCopiedLink] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('user-theme') || 'light';
  });

  // Real Global Counter API (Abacus Cloud)
  const API_NAMESPACE = 'laiduc1312209-profile';
  const baseViews = profileConfig.stats?.initialViews || 0;
  const baseStars = profileConfig.stats?.initialStars || 0;

  const [views, setViews] = useState(() => {
    const saved = localStorage.getItem('profile-views');
    const count = saved ? parseInt(saved, 10) : baseViews;
    return isNaN(count) ? baseViews : count;
  });

  const [hasStarred, setHasStarred] = useState(() => {
    return localStorage.getItem('profile-starred') === 'true';
  });

  const [stars, setStars] = useState(() => {
    const savedCount = localStorage.getItem('profile-stars-count');
    const base = savedCount ? parseInt(savedCount, 10) : baseStars;
    return isNaN(base) ? baseStars : base;
  });

  // 1. Fetch & tăng lượt View thật toàn cầu (đồng bộ mọi thiết bị)
  useEffect(() => {
    let isMounted = true;
    const hasCountedSession = sessionStorage.getItem('profile-session-viewed');
    const endpoint = hasCountedSession
      ? `https://abacus.jasoncameron.dev/get/${API_NAMESPACE}/views`
      : `https://abacus.jasoncameron.dev/hit/${API_NAMESPACE}/views`;

    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data && typeof data.value === 'number') {
          const total = baseViews + data.value;
          setViews(total);
          localStorage.setItem('profile-views', total.toString());
          sessionStorage.setItem('profile-session-viewed', 'true');
        }
      })
      .catch(() => {
        // Fallback tự tăng local nếu mất mạng
        if (!hasCountedSession) {
          setViews((prev) => {
            const next = prev + 1;
            localStorage.setItem('profile-views', next.toString());
            sessionStorage.setItem('profile-session-viewed', 'true');
            return next;
          });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [baseViews]);

  // 2. Fetch số lượng Star thật toàn cầu từ database
  useEffect(() => {
    let isMounted = true;
    fetch(`https://abacus.jasoncameron.dev/get/${API_NAMESPACE}/stars`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data && typeof data.value === 'number') {
          const total = baseStars + data.value;
          setStars(total);
          localStorage.setItem('profile-stars-count', total.toString());
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, [baseStars]);

  // 3. Xử lý khi người dùng ấn nút Star
  const handleStar = async () => {
    if (hasStarred) return; // Ấn rồi thì không thể bỏ
    setHasStarred(true);
    localStorage.setItem('profile-starred', 'true');
    setStars((prev) => {
      const next = prev + 1;
      localStorage.setItem('profile-stars-count', next.toString());
      return next;
    });

    // Đồng bộ lên database toàn cầu
    try {
      const res = await fetch(`https://abacus.jasoncameron.dev/hit/${API_NAMESPACE}/stars`);
      const data = await res.json();
      if (data && typeof data.value === 'number') {
        const total = baseStars + data.value;
        setStars(total);
        localStorage.setItem('profile-stars-count', total.toString());
      }
    } catch {
      // Giữ giá trị local đã tăng
    }
  };

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

      {/* Top Floating Action Bar (Theme Switcher, Views, Star & Share) */}
      <div className="w-full max-w-lg mx-auto flex items-center justify-between gap-2 mb-4 relative z-20">
        <ThemeSwitcher currentTheme={theme} onThemeChange={setTheme} />

        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Lượt mắt xem (Views) */}
          <div 
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-mono text-[var(--topbar-text)] bg-[var(--topbar-bg)] border border-[var(--topbar-border)] backdrop-blur-md shadow-sm select-none"
            title="Profile views"
          >
            <Eye className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
            <span>{views.toLocaleString()}</span>
          </div>

          {/* Nút Star (Ấn tô vàng & +1, ấn rồi không thể bỏ) */}
          <button
            type="button"
            onClick={handleStar}
            disabled={hasStarred}
            title={hasStarred ? "You starred this profile" : "Star this profile"}
            className={`group inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-mono font-medium backdrop-blur-md border transition-all duration-300 shadow-sm ${
              hasStarred 
                ? 'bg-amber-400/15 border-amber-400/40 text-amber-500 cursor-default' 
                : 'bg-[var(--topbar-bg)] border-[var(--topbar-border)] text-[var(--topbar-text)] hover:border-amber-400/60 hover:text-amber-500 cursor-pointer active:scale-95'
            }`}
          >
            <Star 
              className={`w-3.5 h-3.5 transition-all duration-300 ${
                hasStarred 
                  ? 'fill-amber-400 text-amber-400 scale-110 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]' 
                  : 'text-[var(--text-secondary)] group-hover:text-amber-400'
              }`} 
            />
            <span>{stars.toLocaleString()}</span>
          </button>

          {/* Nút Chia sẻ */}
          <button
            onClick={handleShare}
            className="group relative inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium text-[var(--topbar-text)] bg-[var(--topbar-bg)] border border-[var(--topbar-border)] backdrop-blur-md hover:border-[var(--topbar-hover-border)] transition-all duration-300 cursor-pointer shadow-sm active:scale-95"
            title="Copy profile link"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Link copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors" />
                <span className="hidden sm:inline">Share</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Container */}
      <main className="w-full max-w-lg mx-auto flex flex-col items-center text-center relative z-10 px-1">
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
            <span title="Verified profile" className="inline-flex text-[var(--text-accent)]">
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

      {/* Profile Details: Discord & GitHub side-by-side on desktop */}
      <section className="w-full max-w-5xl mx-auto mt-12 pt-6 flex flex-col items-center relative z-10 px-2 sm:px-4">
        {/* Subtle Divider */}
        <div className="w-full max-w-md mx-auto flex items-center gap-3 mb-8">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[var(--topbar-border)] to-[var(--topbar-border)]" />
          <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-secondary)]">
            Profile Details
          </span>
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[var(--topbar-border)] to-[var(--topbar-border)]" />
        </div>

        {/* Side-by-side grid: Discord & GitHub */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-start justify-items-center">
          <DiscordProfileCard userId="1008681119669030973" />
          <GithubProfileCard username="laiduc1312209" />
        </div>
      </section>
    </div>
  );
}
