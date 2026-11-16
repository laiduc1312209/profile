import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Copy, Check } from 'lucide-react';

function GithubIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function FacebookIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

function TikTokIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

function DiscordIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

function MailIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

const iconMap = {
  github: GithubIcon,
  facebook: FacebookIcon,
  tiktok: TikTokIcon,
  discord: DiscordIcon,
  gmail: MailIcon,
};

export default function SocialCard({ link, index }) {
  const IconComponent = iconMap[link.id] || MailIcon;
  const [copied, setCopied] = useState(false);
  const cardRef = useRef(null);

  // 3D Motion Physics
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateXSpring = useSpring(useTransform(mouseY, [0, 1], [8, -8]), {
    stiffness: 280,
    damping: 24,
  });
  const rotateYSpring = useSpring(useTransform(mouseX, [0, 1], [-10, 10]), {
    stiffness: 280,
    damping: 24,
  });

  // Glare position
  const glareX = useTransform(mouseX, [0, 1], ['0%', '100%']);
  const glareY = useTransform(mouseY, [0, 1], ['0%', '100%']);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width;
    const yPos = (e.clientY - rect.top) / rect.height;
    mouseX.set(xPos);
    mouseY.set(yPos);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const handleCopy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const targetVal = link.copyValue || link.email || link.handle || link.url;
    if (targetVal) {
      navigator.clipboard.writeText(targetVal);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1 + index * 0.06, ease: [0.21, 0.47, 0.32, 0.98] }}
      style={{
        perspective: 1000,
      }}
      className="relative group w-full"
    >
      <motion.div
        style={{
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          transformStyle: "preserve-3d",
        }}
        className="relative rounded-2xl p-[1px] transition-shadow duration-300 group-hover:shadow-[0_15px_35px_rgba(0,0,0,0.4)]"
      >
        {/* Lớp viền phản quang */}
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-[var(--topbar-border)] via-[var(--card-border-hover)] to-[var(--topbar-border)] opacity-30 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

        {/* Dynamic Holographic Glare Sheen across the glass surface */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 z-20"
          style={{
            background: `radial-gradient(circle 200px at ${glareX} ${glareY}, var(--card-sheen), transparent 70%)`,
          }}
        />

        {/* Main Card Body với viền rõ nét, sắc sảo */}
        <a
          href={link.url}
          target={link.isEmail ? "_self" : "_blank"}
          rel={link.isEmail ? undefined : "noopener noreferrer"}
          style={{ transform: "translateZ(0px)" }}
          className="relative flex items-center justify-between w-full p-4 rounded-2xl bg-[var(--card-bg)] backdrop-blur-2xl border border-[var(--card-border)] group-hover:border-[var(--card-border-hover)] shadow-[0_8px_24px_rgba(0,0,0,0.15)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--card-border-hover)] z-10"
        >
          <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
            {/* 3D Elevated Icon with high-contrast hover */}
            <div
              style={{ transform: "translateZ(24px)" }}
              className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-[var(--icon-bg)] border border-[var(--icon-border)] text-[var(--icon-text)] shadow-sm group-hover:bg-[var(--text-primary)] group-hover:text-[var(--bg-color)] group-hover:border-[var(--card-border-hover)] group-hover:scale-105 transition-all duration-300"
            >
              <IconComponent className="w-5 h-5 transition-transform duration-300" />
            </div>

            {/* Details */}
            <div 
              style={{ transform: "translateZ(16px)" }}
              className="text-left min-w-0 transition-transform duration-300"
            >
              <h2 className="font-semibold text-[15px] text-[var(--text-primary)] transition-colors duration-200 truncate">
                {link.title}
              </h2>
              <p className="text-xs text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-200 mt-0.5 truncate">
                {link.handle}
              </p>
            </div>
          </div>

          {/* Right side actions */}
          <div 
            style={{ transform: "translateZ(20px)" }}
            className="flex items-center gap-1.5 flex-shrink-0 ml-3 transition-transform duration-300"
          >
            {/* Copy button for Gmail, Discord or copyable links */}
            {(link.isEmail || link.isCopyable || link.id === 'discord') && (
              <button
                type="button"
                onClick={handleCopy}
                title={link.id === 'discord' ? "Sao chép username Discord" : "Sao chép địa chỉ email"}
                className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--pill-bg)] border border-transparent hover:border-[var(--icon-border)] active:scale-95 transition-all duration-200"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            )}

            {/* Trailing Arrow */}
            <div className="flex items-center justify-center w-8 h-8 rounded-lg text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </a>
      </motion.div>
    </motion.div>
  );
}
