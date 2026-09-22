import React, { useEffect, useRef } from 'react';

interface Leaf {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  flip: number;
  flipSpeed: number;
  color: string;
  opacity: number;
  points: number[];
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  pulseSpeed: number;
  speedY: number;
  speedX: number;
}

const LEAF_COLORS = [
  '#C91818', // Bright maple red
  '#A00E0E', // Deep crimson
  '#E65100', // Fiery orange
  '#F57C00', // Amber orange
  '#FFB300', // Golden yellow
  '#D84315', // Rustic autumn red-brown
];

export const MapleLeavesCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Generate maple leaf polygon template
    const createMapleLeaf = (startX?: number, startY?: number): Leaf => {
      const size = Math.random() * 18 + 14;
      return {
        x: startX !== undefined ? startX : Math.random() * width,
        y: startY !== undefined ? startY : Math.random() * -height * 0.5,
        size,
        speedY: Math.random() * 1.2 + 0.8,
        speedX: Math.random() * 1.4 - 0.7,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        flip: Math.random() * Math.PI,
        flipSpeed: Math.random() * 0.04 + 0.02,
        color: LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)],
        opacity: Math.random() * 0.4 + 0.6,
        points: [0, 0.4, 0.8, 1, 0.8, 0.4, 0], // polygon proportions
      };
    };

    // Draw realistic maple leaf shape with canvas paths
    const drawMapleLeaf = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rot: number,
      flip: number,
      color: string,
      opacity: number
    ) => {
      c.save();
      c.translate(x, y);
      c.rotate(rot);
      c.scale(Math.cos(flip), 1);
      c.globalAlpha = opacity;

      c.fillStyle = color;
      c.beginPath();

      // Maple leaf 5-lobe parametric shape
      const s = size;
      c.moveTo(0, -s); // Top central tip
      c.bezierCurveTo(s * 0.25, -s * 0.7, s * 0.4, -s * 0.6, s * 0.5, -s * 0.8); // Right top notch
      c.bezierCurveTo(s * 0.7, -s * 0.5, s * 0.6, -s * 0.2, s * 0.9, -s * 0.1); // Right wing tip
      c.bezierCurveTo(s * 0.7, s * 0.1, s * 0.6, s * 0.3, s * 0.75, s * 0.5); // Right bottom lobe
      c.bezierCurveTo(s * 0.4, s * 0.5, s * 0.25, s * 0.6, s * 0.08, s * 0.9); // Right base
      c.lineTo(0, s * 1.15); // Stem bottom
      c.lineTo(-s * 0.08, s * 0.9); // Left base
      c.bezierCurveTo(-s * 0.25, s * 0.6, -s * 0.4, s * 0.5, -s * 0.75, s * 0.5); // Left bottom lobe
      c.bezierCurveTo(-s * 0.6, s * 0.3, -s * 0.7, s * 0.1, -s * 0.9, -s * 0.1); // Left wing tip
      c.bezierCurveTo(-s * 0.6, -s * 0.2, -s * 0.7, -s * 0.5, -s * 0.5, -s * 0.8); // Left top notch
      c.bezierCurveTo(-s * 0.4, -s * 0.6, -s * 0.25, -s * 0.7, 0, -s);

      c.closePath();
      c.fill();

      // Leaf main vein & highlights
      c.strokeStyle = 'rgba(255, 235, 170, 0.35)';
      c.lineWidth = 1;
      c.beginPath();
      c.moveTo(0, s * 1.15);
      c.lineTo(0, -s * 0.7);
      c.stroke();

      c.restore();
    };

    // Stardust / Fireflies / Moon sparkles
    const particles: Particle[] = Array.from({ length: 35 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.8,
      alpha: Math.random(),
      pulseSpeed: Math.random() * 0.03 + 0.01,
      speedY: (Math.random() - 0.5) * 0.3,
      speedX: (Math.random() - 0.5) * 0.3,
    }));

    // Generate initial leaves density based on screen size
    const leafCount = Math.min(36, Math.floor(width / 38));
    const leaves: Leaf[] = Array.from({ length: leafCount }, () =>
      createMapleLeaf(Math.random() * width, Math.random() * height)
    );

    let windForce = 0;
    let targetWind = 0;

    // Interactive breeze on touch or mouse move
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const normalizedX = (clientX / width - 0.5) * 2;
      targetWind = normalizedX * 1.8;
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove);

    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Smooth wind easing
      windForce += (targetWind - windForce) * 0.05;
      const naturalSway = Math.sin(frame * 0.02) * 0.6;

      // Draw glowing fireflies / moonlight dust
      for (const p of particles) {
        p.alpha += p.pulseSpeed;
        if (p.alpha > 1 || p.alpha < 0.15) {
          p.pulseSpeed = -p.pulseSpeed;
        }
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.save();
        ctx.fillStyle = `rgba(255, 235, 140, ${Math.max(0, Math.min(1, p.alpha))})`;
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Draw & update falling maple leaves
      for (let i = 0; i < leaves.length; i++) {
        const leaf = leaves[i];

        leaf.y += leaf.speedY;
        leaf.x += leaf.speedX + windForce + naturalSway;
        leaf.rotation += leaf.rotationSpeed;
        leaf.flip += leaf.flipSpeed;

        drawMapleLeaf(
          ctx,
          leaf.x,
          leaf.y,
          leaf.size,
          leaf.rotation,
          leaf.flip,
          leaf.color,
          leaf.opacity
        );

        // Reset if leaf exits screen bottom or horizontal borders
        if (leaf.y > height + 40) {
          leaves[i] = createMapleLeaf(undefined, -30);
        }
        if (leaf.x > width + 40) {
          leaf.x = -30;
        } else if (leaf.x < -40) {
          leaf.x = width + 30;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, []);

  return (
    <canvas
      id="maple-leaves-canvas"
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-20 h-full w-full"
    />
  );
};
