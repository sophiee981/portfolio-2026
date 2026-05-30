import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/cn";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MobileMenu from "./MobileMenu";
import LiquidText from "@/components/common/LiquidText";
import ToolMarquee from "@/components/home/ToolMarquee";

const navLinks = [
  { label: "Projects", to: "/" },
  { label: "Profile", to: "/profile" },
];

function BloomingFlower({ size = 120 }: { size?: number }) {
  const petalCount = 5
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        className="absolute inset-0 text-text-primary"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {Array.from({ length: petalCount }).map((_, i) => {
          const baseAngle = (360 / petalCount) * i - 90
          return (
            <ellipse
              key={i}
              cx="100"
              cy="100"
              rx="65"
              ry="24"
              fill="none"
              stroke="currentColor"
              strokeWidth={0.6}
              opacity={0.6}
              transform={`rotate(${baseAngle + 15} 100 100)`}
            />
          )
        })}
      </motion.svg>
      <motion.div
        className="absolute inset-0 m-auto rounded-full border border-text-primary/10"
        style={{ width: size * 0.45, height: size * 0.45 }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  )
}

function SophieLogo() {
  return (
    <div className="flex items-center justify-between">
      <LiquidText
        className="text-text-primary cursor-pointer select-none font-normal italic"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(3rem, 14vw, 18rem)",
          letterSpacing: "-0.05em",
          lineHeight: 1.15,
        }}
      >
        Sophie
      </LiquidText>

      <div className="hidden sm:block">
        <BloomingFlower size={280} />
      </div>
    </div>
  )
}

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(entry.intersectionRatio < 1),
      { threshold: [1], rootMargin: "-1px 0px 0px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const logoSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: logoSectionRef,
    offset: ["start start", "end start"],
  });
  const logoOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0], {
    clamp: true,
  });

  return (
    <>
      {/* Logo — fixed, content scrolls over it */}
      <div
        ref={logoSectionRef as React.RefObject<HTMLDivElement>}
        className="relative"
        style={{
          height: "calc(clamp(4rem, 16vw, 18rem) * 1.15 + 4rem)",
        }}
      >
        <div className="fixed top-0 left-0 z-[6] w-full bg-bg">
          <div className="px-6 sm:px-8 md:px-12">
            <Link to="/" aria-label="Sophie — Home" className="block">
              <motion.div className="pt-8 md:pt-12" style={{ opacity: logoOpacity }}>
                <SophieLogo />
              </motion.div>
            </Link>
          </div>
        </div>
      </div>

      <ToolMarquee />

      {/* Nav bar — sticky top */}
      <header
        ref={headerRef as React.RefObject<HTMLElement>}
        className={cn(
          "sticky top-0 z-50 w-full bg-bg border-t border-border transition-[border-color] duration-300",
          scrolled
            ? "border-b border-b-border"
            : "border-b border-b-transparent",
        )}
      >
        <nav className="grid grid-cols-2 sm:grid-cols-4 uppercase [&>div]:transition-[padding] [&>div]:duration-300">
          <div
            className={cn(
              "px-6 text-[0.875rem] leading-relaxed tracking-wide text-text-secondary whitespace-nowrap sm:px-8 md:px-12",
              scrolled ? "py-4 sm:py-5" : "py-4 sm:py-8 md:py-12",
            )}
          >
            Product Designer
          </div>

          <div
            className={cn(
              "hidden px-8 text-[0.875rem] leading-relaxed tracking-wide md:px-12 sm:block",
              scrolled ? "py-5" : "py-8 md:py-12",
            )}
          >
            <Link
              to="/"
              className={cn(
                "transition-opacity duration-300 hover:opacity-60",
                location.pathname === "/"
                  ? "text-text-primary font-medium underline decoration-accent underline-offset-4"
                  : "text-text-secondary",
              )}
            >
              Projects
            </Link>
          </div>

          <div
            className={cn(
              "hidden px-8 text-[0.875rem] leading-relaxed tracking-wide md:px-12 sm:block",
              scrolled ? "py-5" : "py-8 md:py-12",
            )}
          >
            <Link
              to="/profile"
              className={cn(
                "transition-opacity duration-300 hover:opacity-60",
                location.pathname === "/profile"
                  ? "text-text-primary font-medium underline decoration-accent underline-offset-4"
                  : "text-text-secondary",
              )}
            >
              Profile
            </Link>
          </div>

          <div
            className={cn(
              "hidden px-12 text-right text-[0.875rem] leading-relaxed tracking-wide text-text-tertiary sm:block",
              scrolled ? "py-6" : "py-12",
            )}
          >
            <span className="hidden lg:inline">2026 Portfolio — V.1.0.0</span>
          </div>

          <button
            onClick={() => setMenuOpen(true)}
            className="ml-auto flex items-center justify-center pr-6 sm:hidden"
            aria-label="Open menu"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </nav>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={navLinks}
      />
    </>
  );
}
