import React, { useEffect, useRef } from 'react';

const themeConfigs = {
  dark: {
    bg: '#070709',
    idleLine: 'rgba(255, 255, 255, 0.08)',
    activeFill: 'rgba(255, 255, 255, 0.35)',
    activeStroke: 'rgba(255, 255, 255, 0.85)',
    trailFill: (b) => `rgba(255, 255, 255, ${b * 0.25})`,
    trailStroke: (b) => `rgba(255, 255, 255, ${Math.min(0.85, 0.08 + b * 0.7)})`,
    waveFill: (a) => `rgba(255, 255, 255, ${a * 0.18})`,
    waveStroke: (a) => `rgba(255, 255, 255, ${Math.min(0.8, 0.08 + a * 0.65)})`,
  },
  light: {
    bg: '#f8fafc',
    idleLine: 'rgba(0, 0, 0, 0.06)',
    activeFill: 'rgba(0, 0, 0, 0.16)',
    activeStroke: 'rgba(0, 0, 0, 0.75)',
    trailFill: (b) => `rgba(0, 0, 0, ${b * 0.14})`,
    trailStroke: (b) => `rgba(0, 0, 0, ${Math.min(0.75, 0.06 + b * 0.65)})`,
    waveFill: (a) => `rgba(124, 58, 237, ${a * 0.14})`,
    waveStroke: (a) => `rgba(124, 58, 237, ${Math.min(0.7, 0.06 + a * 0.55)})`,
  },
  'violet-dark': {
    bg: '#090514',
    idleLine: 'rgba(168, 85, 247, 0.12)',
    activeFill: 'rgba(192, 132, 252, 0.35)',
    activeStroke: 'rgba(216, 180, 254, 0.95)',
    trailFill: (b) => `rgba(168, 85, 247, ${b * 0.28})`,
    trailStroke: (b) => `rgba(216, 180, 254, ${Math.min(0.9, 0.12 + b * 0.75)})`,
    waveFill: (a) => `rgba(192, 132, 252, ${a * 0.22})`,
    waveStroke: (a) => `rgba(216, 180, 254, ${Math.min(0.85, 0.12 + a * 0.7)})`,
  },
  'violet-light': {
    bg: '#faf5ff',
    idleLine: 'rgba(147, 51, 234, 0.08)',
    activeFill: 'rgba(147, 51, 234, 0.16)',
    activeStroke: 'rgba(126, 34, 206, 0.8)',
    trailFill: (b) => `rgba(147, 51, 234, ${b * 0.14})`,
    trailStroke: (b) => `rgba(126, 34, 206, ${Math.min(0.8, 0.08 + b * 0.68)})`,
    waveFill: (a) => `rgba(147, 51, 234, ${a * 0.15})`,
    waveStroke: (a) => `rgba(126, 34, 206, ${Math.min(0.75, 0.08 + a * 0.6)})`,
  },
};

export default function InteractiveGrid({ isAudioActive = false, theme = 'dark' }) {
  const canvasRef = useRef(null);
  const isAudioActiveRef = useRef(isAudioActive);
  const themeRef = useRef(theme);

  useEffect(() => {
    isAudioActiveRef.current = isAudioActive;
  }, [isAudioActive]);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const cellSize = 48;
    let cols = 0;
    let rows = 0;
    let grid = null;
    let dpr = window.devicePixelRatio || 1;
    let width = window.innerWidth;
    let height = window.innerHeight;

    let activeCol = -1;
    let activeRow = -1;
    let audioEnergy = 0;

    const initCanvas = () => {
      dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      cols = Math.ceil(width / cellSize) + 2;
      rows = Math.ceil(height / cellSize) + 2;
      grid = new Float32Array(cols * rows);
    };

    initCanvas();

    const handleResize = () => {
      initCanvas();
    };

    const handleMouseMove = (e) => {
      if (!grid) return;
      activeCol = Math.floor(e.clientX / cellSize);
      activeRow = Math.floor(e.clientY / cellSize);
    };

    const handleMouseLeaveWindow = (e) => {
      if (!e.relatedTarget && !e.toElement) {
        activeCol = -1;
        activeRow = -1;
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseout', handleMouseLeaveWindow);

    const render = () => {
      ctx.save();
      ctx.scale(dpr, dpr);

      const activeConfig = themeConfigs[themeRef.current] || themeConfigs.dark;

      // Nền canvas theo theme
      ctx.fillStyle = activeConfig.bg;
      ctx.fillRect(0, 0, width, height);

      // 1. Ô đang hover giữ sáng 100%
      if (activeCol >= 0 && activeCol < cols && activeRow >= 0 && activeRow < rows) {
        const activeIndex = activeRow * cols + activeCol;
        grid[activeIndex] = 1.0;

        const neighbors = [
          [-1, 0], [1, 0], [0, -1], [0, 1]
        ];
        neighbors.forEach(([dc, dr]) => {
          const nc = activeCol + dc;
          const nr = activeRow + dr;
          if (nc >= 0 && nc < cols && nr >= 0 && nr < rows) {
            const nIdx = nr * cols + nc;
            grid[nIdx] = Math.max(grid[nIdx], 0.35);
          }
        });
      }

      // 2. Tính toán sóng nhạc
      const targetEnergy = isAudioActiveRef.current ? 1.0 : 0.0;
      audioEnergy += (targetEnergy - audioEnergy) * 0.07;

      const time = performance.now() * 0.001;
      const centerCol = Math.floor(cols / 2);
      const centerRow = Math.min(rows - 1, Math.max(2, Math.floor(180 / cellSize)));

      const kickPhase = (time * 2.1) % 1.0;
      const kick = Math.pow(Math.max(0, 1.0 - kickPhase), 3.5);
      const snarePhase = ((time * 2.1) + 0.5) % 1.0;
      const snare = Math.pow(Math.max(0, 1.0 - snarePhase), 4.0);
      const beatPulse = 0.75 + 0.45 * kick + 0.2 * snare;

      // 3. Render từng ô vuông
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const index = r * cols + c;
          const isCurrentlyActive = (c === activeCol && r === activeRow);
          const mouseBrightness = grid ? grid[index] : 0;
          const x = c * cellSize;
          const y = r * cellSize;

          let audioBrightness = 0;
          if (audioEnergy > 0.01) {
            const distFromCenter = Math.hypot((c - centerCol) * 1.0, (r - centerRow) * 1.15);
            const ring = Math.sin(distFromCenter * 0.48 - time * 5.2);
            const ringWave = Math.pow(Math.max(0, ring), 4.5) * Math.max(0, 1.0 - distFromCenter / (cols * 0.85));

            const wave1Y = (rows * 0.45) + Math.sin(c * 0.26 + time * 3.8) * 3.0 + Math.cos(c * 0.12 - time * 2.0) * 1.5;
            const dist1 = Math.abs(r - wave1Y);
            const band1 = Math.pow(Math.max(0, 1.0 - dist1 / 2.0), 2.0);

            const wave2Y = (rows * 0.72) + Math.sin(c * 0.2 - time * 3.0) * 3.4 + Math.sin(c * 0.5 + time * 4.6) * 1.4;
            const dist2 = Math.abs(r - wave2Y);
            const band2 = Math.pow(Math.max(0, 1.0 - dist2 / 2.2), 2.0);

            const rawWave = (ringWave * 0.6 + band1 * 0.45 + band2 * 0.35) * beatPulse;
            audioBrightness = Math.min(1.0, rawWave * audioEnergy);
          }

          if (isCurrentlyActive) {
            ctx.fillStyle = activeConfig.activeFill;
            ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);

            ctx.strokeStyle = activeConfig.activeStroke;
            ctx.lineWidth = 1;
            ctx.strokeRect(x + 0.5, y + 0.5, cellSize - 1, cellSize - 1);
          } else if (mouseBrightness > 0.02) {
            ctx.fillStyle = activeConfig.trailFill(mouseBrightness);
            ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);

            ctx.strokeStyle = activeConfig.trailStroke(mouseBrightness);
            ctx.lineWidth = 1;
            ctx.strokeRect(x + 0.5, y + 0.5, cellSize - 1, cellSize - 1);

            grid[index] *= 0.92;
          } else if (audioBrightness > 0.025) {
            ctx.fillStyle = activeConfig.waveFill(audioBrightness);
            ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);

            ctx.strokeStyle = activeConfig.waveStroke(audioBrightness);
            ctx.lineWidth = 1;
            ctx.strokeRect(x + 0.5, y + 0.5, cellSize - 1, cellSize - 1);
          } else {
            ctx.strokeStyle = activeConfig.idleLine;
            ctx.lineWidth = 1;
            ctx.strokeRect(x + 0.5, y + 0.5, cellSize - 1, cellSize - 1);
          }
        }
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseout', handleMouseLeaveWindow);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
