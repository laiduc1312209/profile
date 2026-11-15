import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Avatar({ src, alt, isStarted = true }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative inline-flex items-center justify-center p-6 group cursor-pointer">
      {/* 1. Hiệu ứng gợn sóng lan tỏa chỉ kích hoạt khi đã bắt đầu */}
      {isStarted && (
        <>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 1, opacity: 0 }}
              animate={{
                scale: [1, 1.45, 1.95],
                opacity: [0.55, 0.25, 0],
              }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                delay: i * 1.05,
                ease: "easeOut",
              }}
              className="absolute inset-5 rounded-full border border-white/25 pointer-events-none -z-10 group-hover:border-violet-400/40"
            />
          ))}

          {/* Hào quang khuếch tán êm ái phía sau Logo */}
          <div 
            className="absolute inset-2 rounded-full bg-gradient-to-tr from-white/10 via-violet-600/15 to-transparent blur-2xl pointer-events-none -z-10" 
            aria-hidden="true" 
          />
        </>
      )}

      {/* 2. Khung Logo tròn lơ lửng với layoutId bay mượt mà từ màn hình Intro */}
      <motion.div
        layoutId="main-logo-container"
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.05 }}
        className="relative p-1.5 rounded-full bg-[#111116] border border-white/25 shadow-[0_15px_35px_rgba(0,0,0,0.6),_0_0_25px_rgba(255,255,255,0.1)] backdrop-blur-xl transition-all duration-300 group-hover:border-white/60 group-hover:shadow-[0_20px_45px_rgba(0,0,0,0.7),_0_0_30px_rgba(255,255,255,0.2)]"
      >
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-[#0d0d12] flex items-center justify-center">
          <img
            src={src}
            alt={alt}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-700 ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            } group-hover:scale-105`}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-zinc-900 animate-pulse rounded-full" />
          )}
        </div>
      </motion.div>
    </div>
  );
}
