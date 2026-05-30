import { useRef, useEffect } from "react";

const STROKE_COLOR = "rgba(255, 255, 255, 0.20)";
const STROKE_WIDTH = 0.6;

interface ShapeProps {
  className?: string;
  /** Number of petals: 0 = 6 petals, 1 = 8 petals, 2 = 10 petals */
  detail?: number;
  /** Rotation speed multiplier */
  speed?: number;
}

export function WireframePolyhedron({
  className,
  detail = 0,
  speed = 1,
}: ShapeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    const petalCounts = [4, 5, 6];
    const petals = petalCounts[detail] ?? 4;

    const draw = (t: number) => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(w, h) * 0.28;

      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = STROKE_COLOR;
      ctx.lineWidth = STROKE_WIDTH;

      const baseAngle = t * 0.0002 * speed;

      // Draw overlapping elliptical petals
      for (let i = 0; i < petals; i++) {
        const angle = (Math.PI / petals) * i + baseAngle;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);

        ctx.beginPath();
        ctx.ellipse(0, 0, radius * 0.9, radius * 0.32, 0, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [detail, speed]);

  return (
    <canvas ref={canvasRef} className={`w-full h-full ${className ?? ""}`} />
  );
}
