import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Music } from 'lucide-react';
import { profileConfig } from '../profileConfig';

export default function AudioPlayer({ isStarted, onAudioStateChange }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const playerRef = useRef(null);

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

    const videoId = profileConfig.youtubeMusicId || 'bbdsIR4UHDg';

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
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2 p-2 rounded-2xl bg-zinc-950/80 border border-white/20 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.8),_0_0_20px_rgba(255,255,255,0.08)] transition-all duration-300"
          onMouseEnter={() => setShowVolumeSlider(true)}
          onMouseLeave={() => setShowVolumeSlider(false)}
        >
          {/* Animated Equalizer Waves */}
          <div className="flex items-center gap-0.5 px-2 py-1">
            {[0.4, 0.8, 0.5, 1, 0.6].map((scale, i) => (
              <span
                key={i}
                className="w-0.5 rounded-full bg-white transition-all duration-300"
                style={{
                  height: isPlaying ? `${Math.max(6, scale * 18)}px` : '4px',
                  opacity: isPlaying ? 0.9 : 0.4,
                  animation: isPlaying ? `pulse 0.8s ease-in-out infinite alternate ${i * 0.15}s` : 'none',
                }}
              />
            ))}
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            title={isPlaying ? "Tạm dừng nhạc" : "Phát nhạc"}
            className="flex items-center justify-center w-8 h-8 rounded-xl bg-white text-black hover:bg-zinc-200 active:scale-95 transition-all duration-200"
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 fill-black" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-black ml-0.5" />
            )}
          </button>

          {/* Volume Button */}
          <button
            onClick={toggleMute}
            title={isMuted ? "Bật âm thanh" : "Tắt tiếng"}
            className="flex items-center justify-center w-8 h-8 rounded-xl bg-zinc-900 border border-white/10 text-white hover:border-white/30 hover:bg-zinc-800 transition-colors"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4 text-zinc-400" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>

          {/* Expandable Volume Slider */}
          <div 
            className={`overflow-hidden transition-all duration-300 flex items-center ${
              showVolumeSlider ? 'w-20 opacity-100 pr-2' : 'w-0 opacity-0'
            }`}
          >
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
            />
          </div>
        </div>
      )}
    </>
  );
}
