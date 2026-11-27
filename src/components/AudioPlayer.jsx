import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Music } from 'lucide-react';
import { profileConfig } from '../profileConfig';

export default function AudioPlayer({ isStarted, onAudioStateChange }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const playerRef = useRef(null);

  const musicInfo = profileConfig.music || {
    youtubeId: profileConfig.youtubeMusicId || '7ajECaMrLCM',
    title: 'Xe Đạp',
    artist: 'Thùy Chi ft. M4U',
    cover: 'https://i.ytimg.com/vi/7ajECaMrLCM/maxresdefault.jpg',
  };

  // Báo cáo trạng thái phát nhạc ra ngoài component cha (App.jsx)
  useEffect(() => {
    if (onAudioStateChange) {
      onAudioStateChange({
        isPlaying,
        isMuted,
        volume,
        isAudioActive: isPlaying && !isMuted && volume > 0,
      });
    }
  }, [isPlaying, isMuted, volume, onAudioStateChange]);

  useEffect(() => {
    // Tải YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  }, []);

  // Khởi tạo và phát nhạc khi người dùng bấm "Click to continue"
  useEffect(() => {
    if (!isStarted) return;

    const musicInfo = profileConfig.music || {
      youtubeId: profileConfig.youtubeMusicId || '7ajECaMrLCM',
      title: 'Xe Đạp',
      artist: 'Thùy Chi ft. M4U',
      cover: 'https://i.ytimg.com/vi/7ajECaMrLCM/maxresdefault.jpg',
    };
    const videoId = musicInfo.youtubeId || profileConfig.youtubeMusicId || '7ajECaMrLCM';

    const startAudio = () => {
      if (window.YT && window.YT.Player) {
        if (!playerRef.current) {
          playerRef.current = new window.YT.Player('youtube-audio-player', {
            height: '0',
            width: '0',
            videoId: videoId,
            playerVars: {
              autoplay: 1,
              loop: 1,
              playlist: videoId,
              controls: 0,
              playsinline: 1,
            },
            events: {
              onReady: (event) => {
                event.target.setVolume(volume);
                event.target.playVideo();
                setIsPlaying(true);
              },
              onStateChange: (event) => {
                if (event.data === window.YT.PlayerState.PLAYING) {
                  setIsPlaying(true);
                } else if (event.data === window.YT.PlayerState.PAUSED) {
                  setIsPlaying(false);
                } else if (event.data === window.YT.PlayerState.ENDED) {
                  event.target.playVideo();
                }
              },
            },
          });
        } else {
          playerRef.current.playVideo();
          setIsPlaying(true);
        }
      } else {
        setTimeout(startAudio, 250);
      }
    };

    startAudio();
  }, [isStarted]);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (!playerRef.current || !playerRef.current.playVideo) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e) => {
    e.stopPropagation();
    const newVol = parseInt(e.target.value, 10);
    setVolume(newVol);
    if (playerRef.current && playerRef.current.setVolume) {
      playerRef.current.setVolume(newVol);
      if (newVol > 0 && isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      }
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  return (
    <>
      {/* Hidden YouTube IFrame */}
      <div id="youtube-audio-player" className="fixed -top-96 -left-96 pointer-events-none opacity-0" />

      {/* Floating Audio Controller in Main UI */}
      {isStarted && (
        <div 
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 p-2 pr-3 rounded-2xl bg-[var(--card-bg)] border border-[var(--topbar-border)] backdrop-blur-xl shadow-[0_12px_36px_rgba(0,0,0,0.35)] transition-all duration-300 max-w-[calc(100vw-2.5rem)]"
          onMouseEnter={() => setShowVolumeSlider(true)}
          onMouseLeave={() => setShowVolumeSlider(false)}
        >
          {/* Banner / Cover Art */}
          <div className="relative flex-shrink-0 w-10 h-10 rounded-xl overflow-hidden border border-[var(--topbar-border)] bg-zinc-900 shadow-inner group/cover">
            <img 
              src={musicInfo.cover} 
              alt={musicInfo.title}
              className={`w-full h-full object-cover transition-all duration-700 ${isPlaying ? 'scale-105' : 'scale-100 opacity-70 grayscale-[30%]'}`}
              onError={(e) => {
                e.target.src = `https://i.ytimg.com/vi/${musicInfo.youtubeId}/hqdefault.jpg`;
              }}
            />
            {/* Live Indicator Icon overlay when playing */}
            {isPlaying && (
              <div className="absolute inset-0 bg-black/25 backdrop-blur-[0.5px] flex items-center justify-center pointer-events-none">
                <Music className="w-3.5 h-3.5 text-white/90 animate-pulse drop-shadow" />
              </div>
            )}
          </div>

          {/* Song Info (Tên bài hát & Tác giả) */}
          <div className="flex flex-col min-w-0 text-left justify-center max-w-[110px] sm:max-w-[150px]">
            <span 
              className="font-semibold text-xs text-[var(--text-primary)] truncate leading-tight tracking-tight"
              title={musicInfo.title}
            >
              {musicInfo.title}
            </span>
            <span 
              className="text-[11px] text-[var(--text-secondary)] truncate leading-tight mt-0.5 font-normal"
              title={musicInfo.artist}
            >
              {musicInfo.artist}
            </span>
          </div>

          {/* Animated Equalizer Waves */}
          <div className="flex items-center gap-0.5 px-1 py-1 flex-shrink-0">
            {[0.4, 0.8, 0.5, 1, 0.6].map((scale, i) => (
              <span
                key={i}
                className="w-0.5 rounded-full bg-[var(--text-primary)] transition-all duration-300"
                style={{
                  height: isPlaying ? `${Math.max(6, scale * 16)}px` : '4px',
                  opacity: isPlaying ? 0.9 : 0.35,
                  animation: isPlaying ? `pulse 0.8s ease-in-out infinite alternate ${i * 0.15}s` : 'none',
                }}
              />
            ))}
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            title={isPlaying ? "Pause music" : "Play music"}
            className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-xl bg-[var(--text-primary)] text-[var(--bg-color)] hover:opacity-90 active:scale-95 transition-all duration-200 cursor-pointer shadow-sm"
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 fill-current" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            )}
          </button>

          {/* Volume Button */}
          <button
            onClick={toggleMute}
            title={isMuted ? "Unmute" : "Mute"}
            className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-xl bg-[var(--icon-bg)] border border-[var(--icon-border)] text-[var(--icon-text)] hover:border-[var(--topbar-hover-border)] transition-colors cursor-pointer"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4 text-[var(--text-secondary)]" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>

          {/* Expandable Volume Slider */}
          <div 
            className={`overflow-hidden transition-all duration-300 flex items-center ${
              showVolumeSlider ? 'w-16 sm:w-20 opacity-100 pr-1' : 'w-0 opacity-0'
            }`}
          >
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-full h-1 bg-[var(--pill-bg)] rounded-lg appearance-none cursor-pointer accent-[var(--text-accent)]"
            />
          </div>
        </div>
      )}
    </>
  );
}
