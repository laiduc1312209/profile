import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Copy, Check, ExternalLink, MessageSquare, MoreHorizontal, UserCheck } from 'lucide-react';

// --- AUTHENTIC DISCORD SVG BADGES ---

function ActiveDevBadge() {
  return (
    <img
      src="https://cdn.jsdelivr.net/gh/merlinfuchs/discord-badges@master/SVG/active_developer.svg"
      alt="Active Developer"
      className="w-[18px] h-[18px] object-contain drop-shadow"
      onError={(e) => {
        e.target.style.display = 'none';
      }}
    />
  );
}

function HypeSquadBraveryBadge() {
  return (
    <img
      src="https://cdn.jsdelivr.net/gh/merlinfuchs/discord-badges@master/SVG/hypesquad_bravery.svg"
      alt="HypeSquad Bravery"
      className="w-[18px] h-[18px] object-contain drop-shadow"
      onError={(e) => {
        e.target.style.display = 'none';
      }}
    />
  );
}

function ConsoleConnectedBadge() {
  return (
    <div className="w-[18px] h-[18px] rounded-full bg-[#00d26a]/20 flex items-center justify-center">
      <svg className="w-3.5 h-3.5 text-[#00d26a]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 5H7a7 7 0 0 0-7 7 7 7 0 0 0 7 7h1.17a3 3 0 0 0 2.83-2h2a3 3 0 0 0 2.83 2H17a7 7 0 0 0 7-7 7 7 0 0 0-7-7zm-9 8H6v2H5v-2H3v-1h2v-2h1v2h2v1zm7.5 2a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm2-3a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm0-3a1 1 0 1 1 1-1 1 1 0 0 1-1 1zm2 3a1 1 0 1 1 1-1 1 1 0 0 1-1 1z" />
      </svg>
    </div>
  );
}

function EarlySupporterBadge() {
  return (
    <img
      src="https://cdn.jsdelivr.net/gh/merlinfuchs/discord-badges@master/SVG/early_supporter.svg"
      alt="Early Supporter"
      className="w-[18px] h-[18px] object-contain drop-shadow"
      onError={(e) => {
        e.target.style.display = 'none';
      }}
    />
  );
}

function BoosterBadge() {
  return (
    <img
      src="https://cdn.jsdelivr.net/gh/merlinfuchs/discord-badges@master/SVG/boosting_24_months.svg"
      alt="Server Booster"
      className="w-[18px] h-[18px] object-contain drop-shadow"
      onError={(e) => {
        e.target.style.display = 'none';
      }}
    />
  );
}

function NitroBadge() {
  return (
    <img
      src="https://cdn.jsdelivr.net/gh/merlinfuchs/discord-badges@master/SVG/nitro.svg"
      alt="Nitro"
      className="w-[18px] h-[18px] object-contain drop-shadow"
      onError={(e) => {
        e.target.style.display = 'none';
      }}
    />
  );
}

function LegacyNameBadge() {
  return (
    <div className="w-[18px] h-[18px] rounded-full bg-[#313338] border border-white/10 flex items-center justify-center text-[10px] font-bold text-zinc-300">
      #
    </div>
  );
}

function SpotifyIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#1DB954">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

function XboxIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#107C10">
      <path d="M4.63 2.054a11.96 11.96 0 0 0-2.8 3.52C2.96 7.693 5.48 11.897 8.01 15.65c2.14 3.17 3.53 4.88 3.99 5.37.07-.08.18-.21.32-.4 1.83-2.45 6.07-8.91 8.87-14.88-.93-1.42-2.18-2.61-3.67-3.48C15.44 3.4 13.3 5.75 12 7.37c-1.28-1.6-3.43-3.96-5.49-5.18-.6.28-1.23.63-1.88 1.05v-.186zm14.74 3.86c2.8 5.97-1.44 12.43-3.27 14.88-.14.19-.25.32-.32.4 1.21-.57 5.19-2.92 6.55-7.79.82-2.94.39-5.63-.5-7.48-.99-.01-1.74.02-2.46-.01zm-14.74 0c-.72.03-1.47 0-2.46.01-.89 1.85-1.32 4.54-.5 7.48 1.36 4.87 5.34 7.22 6.55 7.79-.07-.08-.18-.21-.32-.4-1.83-2.45-6.07-8.91-8.87-14.88h-.1z" />
    </svg>
  );
}

function GithubIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

// Tooltip cho huy hiệu
function BadgeItem({ title, children }) {
  const [show, setShow] = useState(false);
  return (
    <div
      className="relative flex items-center justify-center cursor-pointer group"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <div className="transition-transform duration-150 hover:scale-125">
        {children}
      </div>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.92 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full mb-2 px-2.5 py-1 bg-[#111214] text-white text-[11px] font-medium rounded-md whitespace-nowrap shadow-2xl border border-white/10 z-50 pointer-events-none"
          >
            {title}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-[#111214]" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function DiscordProfileCard({ userId = "1008681119669030973" }) {
  const [copiedToast, setCopiedToast] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [isPlayingEffect, setIsPlayingEffect] = useState(false);
  const hasTriggeredEffect = useRef(false);
  const cardRef = useRef(null);

  // 3D Parallax Tilt Physics
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateXSpring = useSpring(useTransform(mouseY, [0, 1], [6, -6]), {
    stiffness: 260,
    damping: 24,
  });
  const rotateYSpring = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), {
    stiffness: 260,
    damping: 24,
  });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width;
    const yPos = (e.clientY - rect.top) / rect.height;
    mouseX.set(xPos);
    mouseY.set(yPos);
  };

  const handleCardMouseEnter = () => {
    // Chỉ chạy khi người dùng hover lần đầu và chỉ chạy duy nhất 1 lần
    if (!hasTriggeredEffect.current) {
      hasTriggeredEffect.current = true;
      setIsPlayingEffect(true);
      setTimeout(() => {
        setIsPlayingEffect(false);
      }, 3000);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const showToast = (msg) => {
    setCopiedToast(msg);
    setTimeout(() => setCopiedToast(''), 2400);
  };

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    showToast(`Đã sao chép ${label}: ${text}`);
    setShowMenu(false);
  };

  // Dữ liệu profile Discord chính xác
  const [profileData, setProfileData] = useState({
    username: "laiduc1312",
    global_name: "laiduc.",
    avatarURL: "https://cdn.discordapp.com/avatars/1008681119669030973/544c0d6fa6fb318ed6008fcc392a3878.png?size=256",
    avatarDecorationURL: "https://cdn.discordapp.com/avatar-decoration-presets/a_c1fba076919b76b5170df846d285117d.png?size=240&passthrough=true",
    clanBadgeURL: "https://cdn.discordapp.com/clan-badges/1256388189078163577/5fa0291612be86eaaa18a60f12c6dc31.png",
    clanTag: "KFS",
    memberSince: "15 thg 8, 2022",
  });

  useEffect(() => {
    let isMounted = true;
    async function fetchDiscord() {
      try {
        const res = await fetch(`https://japi.rest/discord/v1/user/${userId}`);
        if (!res.ok) return;
        const json = await res.json();
        if (json && json.data && isMounted) {
          const d = json.data;
          setProfileData((prev) => ({
            ...prev,
            username: d.username || prev.username,
            global_name: d.global_name || prev.global_name,
            avatarURL: d.avatarURL || prev.avatarURL,
            avatarDecorationURL: d.avatar_decoration_data?.asset
              ? `https://cdn.discordapp.com/avatar-decoration-presets/${d.avatar_decoration_data.asset}.png?size=240&passthrough=true`
              : prev.avatarDecorationURL,
            clanTag: d.clan?.tag || prev.clanTag,
          }));
        }
      } catch (e) {
        // Fallback sẵn sàng
      }
    }
    fetchDiscord();
    return () => {
      isMounted = false;
    };
  }, [userId]);

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Toast thông báo sao chép */}
      <AnimatePresence>
        {copiedToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.9 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#1e1f22] border border-white/20 text-white text-xs font-medium shadow-[0_12px_30px_rgba(0,0,0,0.85)] backdrop-blur-xl"
          >
            <Check className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
            <span>{copiedToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Tilting Card Container */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleCardMouseEnter}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ perspective: 1200 }}
        className="relative w-full max-w-[360px] sm:max-w-[380px] group"
      >
        {/* Viền hào quang Tarot tím & xanh lơ ma thuật */}
        <motion.div
          animate={{
            opacity: [0.7, 1, 0.7],
            scale: [1, 1.015, 1],
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -inset-1 rounded-[26px] bg-gradient-to-b from-[#8165bd]/40 via-[#38bdf8]/25 to-[#a855f7]/35 blur-[12px] -z-10"
        />

        <motion.div
          style={{
            rotateX: rotateXSpring,
            rotateY: rotateYSpring,
            transformStyle: "preserve-3d",
          }}
          className="relative w-full rounded-[22px] overflow-hidden text-left border border-[#484257]/80 shadow-[0_24px_60px_rgba(0,0,0,0.85)] bg-[#15141e]"
        >
          {/* ========================================================
              1. HÌNH NỀN GỐC DISCORD THE TOWER (HD TAROT BACKDROP - LỚP DƯỚI)
              Trích xuất trực tiếp từ máy chủ Discord (900x1760)
             ======================================================== */}
          <div className="absolute inset-0 pointer-events-none select-none overflow-hidden -z-10">
            <img
              src="/discord-effects/tower-background.png"
              alt="Tarot The Tower Background"
              className="w-full h-full object-cover object-top opacity-95 scale-[1.02]"
              onError={(e) => {
                e.target.src = "https://cdn.discordapp.com/assets/content/e2a8f0da1a681b82cb5846a9f0772f50f2e6799bcd75bd5d03dc8e9ee4acf3f5";
              }}
            />
            {/* Lớp phủ chuyển sắc nhẹ giữ độ tương phản */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#13121c]/25 to-[#100f18]/70" />
          </div>

          {/* ========================================================
              2. NỘI DUNG PROFILE DISCORD (100% REACT / TAILWIND CODED)
              (Nằm ở lớp z-10, các khối nội dung trong suốt mờ ảo để thấy tranh nền)
             ======================================================== */}
          <div className="relative z-10">
            {/* Header Banner Area */}
            <div className="relative h-28 w-full flex items-start justify-end p-3 gap-2">
              {/* Nút Sao chép Discord ID */}
              <button
                type="button"
                onClick={() => handleCopy(userId, 'Discord ID')}
                title="Sao chép Discord ID"
                className="w-8 h-8 rounded-full bg-[#111214]/70 hover:bg-[#111214]/90 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-all cursor-pointer backdrop-blur-md active:scale-95 shadow-md z-50"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Profile Info Header Container */}
            <div className="px-4 pb-4">
              {/* Avatar Row */}
              <div className="relative flex items-end justify-between -mt-14 mb-3">
                {/* Avatar with Live Skull Cat Hoodie Decoration */}
                <div className="relative inline-block">
                  {/* Outer circle cut */}
                  <div className="w-[84px] h-[84px] rounded-full p-[4px] bg-[#1a1727]/90 shadow-xl flex items-center justify-center overflow-hidden border border-white/10">
                    <img
                      src={profileData.avatarURL}
                      alt={profileData.global_name}
                      className="w-full h-full rounded-full object-cover bg-zinc-900"
                      onError={(e) => {
                        e.target.src = "/logo.png";
                      }}
                    />
                  </div>

                  {/* Skull Cat Hoodie Avatar Decoration (Discord CDN animated APNG) */}
                  {profileData.avatarDecorationURL && (
                    <motion.img
                      animate={{
                        filter: [
                          'drop-shadow(0 0 6px rgba(168,85,247,0.8))',
                          'drop-shadow(0 0 14px rgba(192,132,252,1))',
                          'drop-shadow(0 0 6px rgba(168,85,247,0.8))',
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      src={profileData.avatarDecorationURL}
                      alt="Avatar Decoration"
                      className="absolute -top-[16%] -left-[16%] w-[132%] h-[132%] max-w-none pointer-events-none z-20 select-none"
                    />
                  )}

                  {/* Online Status Green Dot */}
                  <div
                    title="Trực tuyến"
                    className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-[#23a55a] border-[3.5px] border-[#1a1727] shadow-md z-30"
                  />
                </div>
              </div>

              {/* Display Name & Identity */}
              <div className="mb-2">
                <h3 className="text-[22px] font-black text-white tracking-tight leading-snug flex items-center gap-1.5 font-sans drop-shadow-md">
                  {profileData.global_name}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-zinc-300 font-medium flex-wrap mt-0.5 drop-shadow">
                  <span
                    className="hover:text-white cursor-pointer transition-colors"
                    onClick={() => handleCopy(profileData.username, 'Username')}
                    title="Sao chép tên người dùng"
                  >
                    {profileData.username}
                  </span>
                  <span>•</span>
                  <span>pld 2009</span>
                  <span>•</span>

                  {/* Clan Tag: KFS with Icon & Dropdown Chevron */}
                  <div
                    title="Hội KFS"
                    className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#252233]/80 hover:bg-[#302c42] border border-white/10 text-purple-200 text-[11px] font-bold font-mono transition-colors cursor-pointer backdrop-blur-sm"
                  >
                    <img
                      src={profileData.clanBadgeURL}
                      alt="Clan"
                      className="w-3 h-3 object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <span>{profileData.clanTag}</span>
                    <span className="text-[9px] text-zinc-400">˅</span>
                  </div>
                </div>
              </div>

              {/* Dãy huy hiệu Discord chính thức không bị lỗi */}
              <div className="flex items-center gap-2 my-2.5 p-1.5 rounded-xl bg-[#111214]/70 border border-white/10 backdrop-blur-md shadow-inner w-fit">
                {/* 1. Active Developer Badge */}
                <BadgeItem title="Nhà phát triển tích cực">
                  <ActiveDevBadge />
                </BadgeItem>

                {/* 2. HypeSquad Bravery Badge */}
                <BadgeItem title="HypeSquad Bravery">
                  <HypeSquadBraveryBadge />
                </BadgeItem>

                {/* 3. Gamepad Console Badge */}
                <BadgeItem title="Thiết bị chơi game đã kết nối">
                  <ConsoleConnectedBadge />
                </BadgeItem>

                {/* 4. Early Supporter Badge */}
                <BadgeItem title="Người ủng hộ đời đầu">
                  <EarlySupporterBadge />
                </BadgeItem>

                {/* 5. Server Booster Badge */}
                <BadgeItem title="Tăng cường máy chủ (24 tháng)">
                  <BoosterBadge />
                </BadgeItem>

                {/* 6. Nitro Subscriber Badge */}
                <BadgeItem title="Người đăng ký Discord Nitro">
                  <NitroBadge />
                </BadgeItem>

                {/* 7. Originally Known As Badge */}
                <BadgeItem title="Trước đây là laiduc#1312">
                  <LegacyNameBadge />
                </BadgeItem>

                {/* 8. +3 Badges Pill */}
                <BadgeItem title="Và 3 huy hiệu khác">
                  <span className="text-[10px] font-bold text-zinc-400 font-mono px-1">
                    +3
                  </span>
                </BadgeItem>
              </div>

              {/* Action Buttons Row */}
              <div className="flex items-center gap-2 my-3">
                {/* Tin Nhắn Button in Discord Blurple */}
                <a
                  href={`https://discord.com/users/${userId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-4 rounded-[6px] text-xs font-semibold bg-[#5865F2] hover:bg-[#4752C4] text-white transition-all shadow-[0_4px_16px_rgba(88,101,242,0.4)] active:scale-[0.98] cursor-pointer z-50"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-white" />
                  <span>Tin nhắn</span>
                </a>

                {/* Store / Mutual Friends Button */}
                <button
                  type="button"
                  title="Xem bạn chung"
                  className="w-9 h-8 rounded-[6px] bg-[#2b2d31]/80 hover:bg-[#35373c] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-all cursor-pointer active:scale-95 shadow-sm z-50"
                >
                  <UserCheck className="w-4 h-4" />
                </button>

                {/* More Options `...` Dropdown Button */}
                <div className="relative z-50">
                  <button
                    type="button"
                    onClick={() => setShowMenu(!showMenu)}
                    title="Thêm tùy chọn"
                    className="w-9 h-8 rounded-[6px] bg-[#2b2d31]/80 hover:bg-[#35373c] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-all cursor-pointer active:scale-95 shadow-sm"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>

                  {/* Context Menu Dropdown */}
                  <AnimatePresence>
                    {showMenu && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -6 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 bottom-full mb-2 w-48 rounded-xl bg-[#111214] border border-[#2e3035] shadow-2xl p-1 z-50 text-left font-sans"
                      >
                        <button
                          type="button"
                          onClick={() => handleCopy(userId, 'Discord User ID')}
                          className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-zinc-200 hover:bg-[#5865F2] hover:text-white rounded-lg transition-colors cursor-pointer"
                        >
                          <span>Sao chép User ID</span>
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCopy(profileData.username, 'Username')}
                          className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-zinc-200 hover:bg-[#5865F2] hover:text-white rounded-lg transition-colors cursor-pointer"
                        >
                          <span>Sao chép Tên dùng</span>
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <a
                          href={`https://discord.com/users/${userId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-zinc-200 hover:bg-[#5865F2] hover:text-white rounded-lg transition-colors cursor-pointer"
                        >
                          <span>Mở trên Discord Web</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Khung nội dung kính mờ bán trong suốt (Thấu quang nền tháp đá & chú mèo) */}
              <div className="p-3.5 rounded-xl bg-[#111214]/65 border border-white/10 backdrop-blur-md flex flex-col gap-3 shadow-lg">
                {/* 1. Tiểu sử (About Me) */}
                <div>
                  <h4 className="text-[11px] uppercase font-bold tracking-wider text-zinc-400 font-sans">
                    TIỂU SỬ
                  </h4>
                  <div className="mt-1">
                    <a
                      href="https://laiduc1312.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-[#00a8fc] hover:underline inline-flex items-center gap-1 group/link z-50 relative"
                    >
                      <span>https://laiduc1312.vercel.app/</span>
                      <ExternalLink className="w-3 h-3 opacity-70 group-hover/link:opacity-100" />
                    </a>
                  </div>
                </div>

                <div className="h-[1px] bg-white/10" />

                {/* 2. Gia nhập từ (Member Since) */}
                <div>
                  <h4 className="text-[11px] uppercase font-bold tracking-wider text-zinc-400 font-sans">
                    GIA NHẬP TỪ
                  </h4>
                  <p className="mt-1 text-xs text-zinc-200 font-medium">
                    {profileData.memberSince}
                  </p>
                </div>

                <div className="h-[1px] bg-white/10" />

                {/* 3. Kết Nối (Connections) */}
                <div>
                  <h4 className="text-[11px] uppercase font-bold tracking-wider text-zinc-400 font-sans mb-2">
                    KẾT NỐI
                  </h4>

                  <div className="flex flex-col gap-1.5">
                    {/* GitHub */}
                    <a
                      href="https://github.com/laiduc1312209"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2 rounded-lg bg-[#181724]/75 hover:bg-[#232135] transition-colors cursor-pointer group/link border border-transparent hover:border-white/10 z-50 relative"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center">
                          <GithubIcon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-medium text-zinc-200 group-hover/link:text-white">
                          laiduc1312209
                        </span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover/link:text-zinc-200" />
                    </a>

                    {/* Spotify */}
                    <a
                      href="https://open.spotify.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2 rounded-lg bg-[#181724]/75 hover:bg-[#232135] transition-colors cursor-pointer group/link border border-transparent hover:border-white/10 z-50 relative"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-[#121212] flex items-center justify-center">
                          <SpotifyIcon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-medium text-zinc-200 group-hover/link:text-white">
                          Đức Lại
                        </span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover/link:text-zinc-200" />
                    </a>

                    {/* Xbox */}
                    <div
                      onClick={() => handleCopy('laiduc13122009', 'Xbox Gamertag')}
                      title="Nhấp để sao chép Gamertag Xbox"
                      className="flex items-center justify-between p-2 rounded-lg bg-[#181724]/75 hover:bg-[#232135] transition-colors cursor-pointer group/link border border-transparent hover:border-white/10 z-50 relative"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-[#107C10] flex items-center justify-center">
                          <XboxIcon className="w-3.5 h-3.5 fill-white" />
                        </div>
                        <span className="text-xs font-medium text-zinc-200 group-hover/link:text-white">
                          laiduc13122009
                        </span>
                      </div>
                      <Copy className="w-3.5 h-3.5 text-zinc-500 group-hover/link:text-zinc-200" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================
              3. HOẠT ẢNH HỒ SƠ DISCORD THE TOWER (ĐƯỢC ĐẶT LÊN TRƯỚC HẾT - ON TOP)
              (Loop chạy liên tục; hiệu ứng sấm sét toà tháp chỉ chạy khi hover lần đầu và dừng)
             ======================================================== */}
          <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-40">
            {/* Hoạt ảnh Loop tuần hoàn liên tục của Discord (36 Frames APNG) */}
            <img
              src="/discord-effects/tower-loop.png"
              alt="The Tower Profile Effect Loop"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none scale-[1.02] mix-blend-screen opacity-90"
              onError={(e) => {
                e.target.src = "https://cdn.discordapp.com/assets/content/36f808751fef4eee301e519ba9c7fb6ff25849d065768e6195ed73a157c6d28f";
              }}
            />

            {/* Hoạt ảnh sấm sét toà tháp (The Tower Strike): chỉ chạy khi hover lần đầu và chỉ chạy 1 lần duy nhất */}
            <AnimatePresence>
              {isPlayingEffect && (
                <motion.img
                  key="tower-strike-anim"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  src="/discord-effects/tower-intro.png"
                  alt="The Tower Profile Effect Strike"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none scale-[1.02] mix-blend-screen"
                  onError={(e) => {
                    e.target.src = "https://cdn.discordapp.com/assets/content/f2bf0af559f9c49ba2c293d3b165e1ffb8bee560123d7ccb304df9998d850bb4";
                  }}
                />
              )}
            </AnimatePresence>

            {/* Viền hào quang điện quang mỏng mép thẻ */}
            <div className="absolute inset-0 rounded-[22px] border border-cyan-400/30 pointer-events-none" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
