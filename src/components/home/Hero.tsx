import AnimatedSection from "@/components/common/AnimatedSection";
import { getProfile } from "@/content/loader";

const DOT_COUNT = 14;
const dots = (count: number) => Array.from({ length: count });
const dotCls = "h-3.5 w-3.5 rounded-full bg-black shadow-inner border border-neutral-800/40";

function StampFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative inline-flex flex-col overflow-visible rounded-sm border border-neutral-800/80 bg-neutral-900/50"
      style={{ padding: 20, width: 520 }}
    >
      {/* Dots — top */}
      <div className="absolute top-0 left-4 right-4 z-20 flex h-4 -translate-y-1/2 justify-between pointer-events-none">
        {dots(DOT_COUNT).map((_, i) => <div key={i} className={dotCls} />)}
      </div>
      {/* Dots — bottom */}
      <div className="absolute bottom-0 left-4 right-4 z-20 flex h-4 translate-y-1/2 justify-between pointer-events-none">
        {dots(DOT_COUNT).map((_, i) => <div key={i} className={dotCls} />)}
      </div>
      {/* Dots — left */}
      <div className="absolute left-0 top-4 bottom-4 z-20 flex w-4 -translate-x-1/2 flex-col justify-between pointer-events-none">
        {dots(DOT_COUNT).map((_, i) => <div key={i} className={dotCls} />)}
      </div>
      {/* Dots — right */}
      <div className="absolute right-0 top-4 bottom-4 z-20 flex w-4 translate-x-1/2 flex-col justify-between pointer-events-none">
        {dots(DOT_COUNT).map((_, i) => <div key={i} className={dotCls} />)}
      </div>

      {/* Content inside */}
      <div className="relative flex flex-1 flex-col">
        {children}
      </div>
    </div>
  );
}

function PhotoCard() {
  return (
    <StampFrame>
      {/* Inner image area */}
      <div className="relative overflow-hidden rounded-sm" style={{ width: 480, height: 480 }}>
        <img
          alt="Nguyen Xuan"
          className="h-full w-full object-cover"
          src="/images/avatar.jpeg"
        />

        {/* Badge: 4+ YRS XP */}
        <div className="absolute top-4 left-4 z-10 flex select-none flex-col items-center rounded-md bg-accent px-3 py-1.5 font-mono shadow-[0_4px_12px_rgba(10,207,131,0.4)]">
          <span className="text-sm font-extrabold leading-none text-bg">4+</span>
          <span className="mt-1 text-[6px] font-bold uppercase leading-none tracking-widest text-bg">YRS XP</span>
        </div>

        {/* Label bottom-right */}
        <div className="absolute right-4 bottom-4 z-10 select-none rounded border border-neutral-700/80 bg-neutral-900/90 px-2.5 py-1.5 font-mono text-[7px] font-bold uppercase tracking-widest text-accent shadow-lg backdrop-blur-sm">
          ⚡ UI_SYS_V4.0
        </div>
      </div>

      {/* Caption */}
      <div className="select-none pt-[12px] text-center">
        <span className="font-mono text-[9px] font-extrabold uppercase tracking-[0.25em] text-accent/80">
          Nguyen Xuan &bull; Product Designer
        </span>
      </div>
    </StampFrame>
  );
}

export default function Hero() {
  const profile = getProfile();

  return (
    <section
      className="border-b border-border py-16 sm:py-24 md:py-28 lg:py-36"
    >
      <AnimatedSection>
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-4 sm:gap-0">
          {/* Cols 1-3: intro + CTA */}
          <div className="col-span-1 px-6 sm:col-span-3 sm:px-8 md:px-12">
            <div className="max-w-[1000px] space-y-4 text-[clamp(1.125rem,1.5vw,1.5rem)] leading-[1.4] font-light text-text-primary">
              {profile.data.homeIntro && profile.data.homeIntro.length > 0 ? (
                profile.data.homeIntro.map((para, i) => <p key={i}>{para}</p>)
              ) : (
                <p>{profile.content}</p>
              )}
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              <button
                onClick={() => {
                  const el = document.getElementById("featured-work");
                  const header = document.querySelector("header");
                  if (el) {
                    const headerH = header?.offsetHeight ?? 0;
                    const y =
                      el.getBoundingClientRect().top + window.scrollY - headerH;
                    window.scrollTo({ top: y, behavior: "smooth" });
                  }
                }}
                className="group inline-flex cursor-pointer items-center gap-3 border border-border px-6 py-4 text-[0.875rem] tracking-wide text-text-primary transition-colors duration-300 hover:border-accent"
              >
                <span>Explore our work</span>
                <span className="text-text-tertiary">/2025-2026</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-accent transition-transform duration-300 group-hover:translate-y-0.5"
                >
                  <path d="M12 5v14" />
                  <path d="M19 12l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Col 4: Photo card */}
          <div className="col-span-1 hidden sm:flex sm:justify-end sm:px-8 md:px-12">
            <PhotoCard />
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}
