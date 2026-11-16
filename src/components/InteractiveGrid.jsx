import React, { useEffect, useRef } from 'react';

export default function InteractiveGrid({ isAudioActive = false }) {
  const canvasRef = useRef(null);
  const isAudioActiveRef = useRef(isAudioActive);

  // Cập nhật ref mỗi khi prop isAudioActive thay đổi mà không làm reset canvas
  useEffect(() => {
    isAudioActiveRef.current = isAudioActive;
  }, [isAudioActive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const cellSize = 48; // Kích thước ô vuông chuẩn nét
    let cols = 0;
    let rows = 0;
    let grid = null;
    let dpr = window.devicePixelRatio || 1;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Tọa độ ô vuông hiện tại đang được chuột dừng/hover lên
    let activeCol = -1;
    let activeRow = -1;

    // Biến nội suy độ mượt cho hiệu ứng sóng nhạc (0: tắt, 1: tối đa)
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

    // Chỉ khi chuột thực sự rời khỏi cửa sổ trình duyệt mới bỏ active
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

      // Nền đen obsidian
      ctx.fillStyle = '#070709';
      ctx.fillRect(0, 0, width, height);

      // 1. Nếu chuột đang dừng/hover ở ô nào, ô đó LUÔN LUÔN ĐƯỢC GIỮ SÁNG 100% KHÔNG BAO GIỜ TẮT
      if (activeCol >= 0 && activeCol < cols && activeRow >= 0 && activeRow < rows) {
        const activeIndex = activeRow * cols + activeCol;
        grid[activeIndex] = 1.0;

        // Các ô lân cận trực tiếp sáng nhẹ êm ái
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

      // 2. Tính toán năng lượng sóng nhạc (Smooth audio energy transitions)
      const targetEnergy = isAudioActiveRef.current ? 1.0 : 0.0;
      audioEnergy += (targetEnergy - audioEnergy) * 0.07;

      const time = performance.now() * 0.001; // Thời gian tính theo giây

      // Tâm điểm avatar để tỏa sóng đồng tâm
      const centerCol = Math.floor(cols / 2);
      const centerRow = Math.min(rows - 1, Math.max(2, Math.floor(180 / cellSize)));

      // Nhịp beat mô phỏng âm bass & kick (125 BPM ~ 2.08 Hz)
      const kickPhase = (time * 2.1) % 1.0;
      const kick = Math.pow(Math.max(0, 1.0 - kickPhase), 3.5);
      const snarePhase = ((time * 2.1) + 0.5) % 1.0;
      const snare = Math.pow(Math.max(0, 1.0 - snarePhase), 4.0);
      const beatPulse = 0.75 + 0.45 * kick + 0.2 * snare;

      // 3. Vẽ từng ô vuông với sự kết hợp giữa tương tác chuột và sóng nhạc
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const index = r * cols + c;
          const isCurrentlyActive = (c === activeCol && r === activeRow);
          const mouseBrightness = grid ? grid[index] : 0;
          const x = c * cellSize;
          const y = r * cellSize;

          // Tính toán sóng nhạc cho ô (c, r) nếu âm thanh đang phát
          let audioBrightness = 0;
          if (audioEnergy > 0.01) {
            // Sóng 1: Sóng xung kích tròn lan tỏa từ vị trí avatar ra khắp màn hình
            const distFromCenter = Math.hypot((c - centerCol) * 1.0, (r - centerRow) * 1.15);
            const ring = Math.sin(distFromCenter * 0.48 - time * 5.2);
            const ringWave = Math.pow(Math.max(0, ring), 4.5) * Math.max(0, 1.0 - distFromCenter / (cols * 0.85));

            // Sóng 2: Dải sóng âm thanh dao động ngang (Equalizer Wave band 1)
            const wave1Y = (rows * 0.45) + Math.sin(c * 0.26 + time * 3.8) * 3.0 + Math.cos(c * 0.12 - time * 2.0) * 1.5;
            const dist1 = Math.abs(r - wave1Y);
            const band1 = Math.pow(Math.max(0, 1.0 - dist1 / 2.0), 2.0);

            // Sóng 3: Dải sóng bass sâu dao động ngang phía dưới (Equalizer Wave band 2)
            const wave2Y = (rows * 0.72) + Math.sin(c * 0.2 - time * 3.0) * 3.4 + Math.sin(c * 0.5 + time * 4.6) * 1.4;
            const dist2 = Math.abs(r - wave2Y);
            const band2 = Math.pow(Math.max(0, 1.0 - dist2 / 2.2), 2.0);

            // Tổng hợp biên độ sóng nhạc kèm nhịp đập bass
            const rawWave = (ringWave * 0.6 + band1 * 0.45 + band2 * 0.35) * beatPulse;
            audioBrightness = Math.min(1.0, rawWave * audioEnergy);
          }

          if (isCurrentlyActive) {
            // Khi chuột đang dừng: Màu trắng sáng rõ rệt 100%, ổn định, không nhấp nháy
            ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
            ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);

            ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
            ctx.lineWidth = 1;
            ctx.strokeRect(x + 0.5, y + 0.5, cellSize - 1, cellSize - 1);
          } else if (mouseBrightness > 0.02) {
            // Vệt chuột đang mờ dần
            const fillOpacity = mouseBrightness * 0.25;
            ctx.fillStyle = `rgba(255, 255, 255, ${fillOpacity})`;
            ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);

            const strokeOpacity = Math.min(0.85, 0.08 + mouseBrightness * 0.7);
            ctx.strokeStyle = `rgba(255, 255, 255, ${strokeOpacity})`;
            ctx.lineWidth = 1;
            ctx.strokeRect(x + 0.5, y + 0.5, cellSize - 1, cellSize - 1);

            grid[index] *= 0.92;
          } else if (audioBrightness > 0.025) {
            // Hiệu ứng sóng nhạc chạy qua các ô vuông
            const fillOpacity = audioBrightness * 0.18;
            ctx.fillStyle = `rgba(255, 255, 255, ${fillOpacity})`;
            ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);

            // Viền ô vuông sáng lên theo nhịp sóng âm
            const strokeOpacity = Math.min(0.8, 0.08 + audioBrightness * 0.65);
            ctx.strokeStyle = `rgba(255, 255, 255, ${strokeOpacity})`;
            ctx.lineWidth = 1;
            ctx.strokeRect(x + 0.5, y + 0.5, cellSize - 1, cellSize - 1);
          } else {
            // Trạng thái tĩnh: Viền trắng mờ thanh lịch
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
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
