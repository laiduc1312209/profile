import React, { useEffect, useRef } from 'react';

export default function InteractiveGrid() {
  const canvasRef = useRef(null);

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
        grid[activeIndex] = 1.0; // Giữ nguyên độ sáng 100% khi chuột dừng tại ô

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

      // 2. Vẽ từng ô vuông
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const index = r * cols + c;
          const isCurrentlyActive = (c === activeCol && r === activeRow);
          const brightness = grid ? grid[index] : 0;
          const x = c * cellSize;
          const y = r * cellSize;

          if (brightness > 0.02) {
            // Ô vuông được hover hoặc đang mờ dần: ĐỔI MÀU TRẮNG
            const fillOpacity = isCurrentlyActive 
              ? 0.35 // Khi chuột đang dừng: Màu trắng sáng rõ rệt, ổn định, không nhấp nháy
              : brightness * 0.25;

            ctx.fillStyle = `rgba(255, 255, 255, ${fillOpacity})`;
            ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);

            // Viền ô vuông màu trắng tinh
            const strokeOpacity = isCurrentlyActive 
              ? 0.85 
              : Math.min(0.85, 0.08 + brightness * 0.7);

            ctx.strokeStyle = `rgba(255, 255, 255, ${strokeOpacity})`;
            ctx.lineWidth = 1;
            ctx.strokeRect(x + 0.5, y + 0.5, cellSize - 1, cellSize - 1);

            // Chỉ giảm dần độ sáng khi chuột ĐÃ RỜI KHỎI ô này
            if (!isCurrentlyActive) {
              grid[index] *= 0.92;
            }
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
