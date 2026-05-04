import { useRef, useEffect } from "react";

const STROKE_COLOR = "rgba(255, 255, 255, 0.20)";
const STROKE_WIDTH = 0.6;

interface ShapeProps {
  className?: string;
  /** Number of subdivision levels: 0 = icosahedron (12v), 1 = 42v, 2 = 162v */
  detail?: number;
  /** Rotation speed multiplier */
  speed?: number;
}

// Subdivide a triangle on a sphere
function subdivide(vertices: number[][], faces: number[][], levels: number) {
  const midCache: Record<string, number> = {};

  const getMid = (a: number, b: number) => {
    const key = `${Math.min(a, b)}_${Math.max(a, b)}`;
    if (midCache[key] !== undefined) return midCache[key];
    const va = vertices[a],
      vb = vertices[b];
    const mid = [(va[0] + vb[0]) / 2, (va[1] + vb[1]) / 2, (va[2] + vb[2]) / 2];
    // Normalize to sphere surface
    const len = Math.sqrt(mid[0] ** 2 + mid[1] ** 2 + mid[2] ** 2);
    mid[0] /= len;
    mid[1] /= len;
    mid[2] /= len;
    vertices.push(mid);
    midCache[key] = vertices.length - 1;
    return midCache[key];
  };

  for (let l = 0; l < levels; l++) {
    const newFaces: number[][] = [];
    for (const [a, b, c] of faces) {
      const ab = getMid(a, b);
      const bc = getMid(b, c);
      const ca = getMid(c, a);
      newFaces.push([a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca]);
    }
    faces.length = 0;
    faces.push(...newFaces);
  }
}

function createIcosahedron(detail: number) {
  const phi = (1 + Math.sqrt(5)) / 2;
  const vertices = [
    [-1, phi, 0],
    [1, phi, 0],
    [-1, -phi, 0],
    [1, -phi, 0],
    [0, -1, phi],
    [0, 1, phi],
    [0, -1, -phi],
    [0, 1, -phi],
    [phi, 0, -1],
    [phi, 0, 1],
    [-phi, 0, -1],
    [-phi, 0, 1],
  ];
  // Normalize
  for (const v of vertices) {
    const len = Math.sqrt(v[0] ** 2 + v[1] ** 2 + v[2] ** 2);
    v[0] /= len;
    v[1] /= len;
    v[2] /= len;
  }

  const faces = [
    [0, 11, 5],
    [0, 5, 1],
    [0, 1, 7],
    [0, 7, 10],
    [0, 10, 11],
    [1, 5, 9],
    [5, 11, 4],
    [11, 10, 2],
    [10, 7, 6],
    [7, 1, 8],
    [3, 9, 4],
    [3, 4, 2],
    [3, 2, 6],
    [3, 6, 8],
    [3, 8, 9],
    [4, 9, 5],
    [2, 4, 11],
    [6, 2, 10],
    [8, 6, 7],
    [9, 8, 1],
  ];

  subdivide(vertices, faces, detail);

  // Extract unique edges from faces
  const edgeSet = new Set<string>();
  const edges: number[][] = [];
  for (const [a, b, c] of faces) {
    for (const [i, j] of [
      [a, b],
      [b, c],
      [c, a],
    ]) {
      const key = `${Math.min(i, j)}_${Math.max(i, j)}`;
      if (!edgeSet.has(key)) {
        edgeSet.add(key);
        edges.push([i, j]);
      }
    }
  }

  return { vertices, edges };
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

    const { vertices, edges } = createIcosahedron(detail);

    const draw = (t: number) => {
      const w = canvas.width / dpr,
        h = canvas.height / dpr;
      const cx = w / 2,
        cy = h / 2,
        s = Math.min(w, h) * 0.32;
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = STROKE_COLOR;
      ctx.lineWidth = STROKE_WIDTH;

      const ay = t * 0.0003 * speed;
      const ax = t * 0.0002 * speed;
      const az = t * 0.00015 * speed;

      const project = (v: number[]) => {
        const [x, y, z] = v;
        const x2 = x * Math.cos(ay) - z * Math.sin(ay);
        const z2 = x * Math.sin(ay) + z * Math.cos(ay);
        const y2 = y * Math.cos(ax) - z2 * Math.sin(ax);
        const z3 = y * Math.sin(ax) + z2 * Math.cos(ax);
        const x3 = x2 * Math.cos(az) - y2 * Math.sin(az);
        const y3 = x2 * Math.sin(az) + y2 * Math.cos(az);
        const scale = 2 / (3.5 + z3 * 0.3);
        return [cx + x3 * s * scale, cy + y3 * s * scale];
      };

      for (const [a, b] of edges) {
        const [x1, y1] = project(vertices[a]);
        const [x2, y2] = project(vertices[b]);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      for (const v of vertices) {
        const [px, py] = project(v);
        ctx.beginPath();
        ctx.arc(px, py, 1, 0, Math.PI * 2);
        ctx.fillStyle = STROKE_COLOR;
        ctx.fill();
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
