import type { WorkFrontmatter } from '@/content/schema'

interface ProjectCardProps {
  work: { data: WorkFrontmatter }
  onClick?: () => void
}

export default function ProjectCard({ work, onClick }: ProjectCardProps) {
  const { title, year, thumbnailImage } = work.data

  return (
    <button
      onClick={onClick}
      className="group relative flex h-full w-full cursor-pointer flex-col justify-end overflow-hidden bg-bg text-left"
    >
      {thumbnailImage && (
        <div className="absolute inset-0 transition-all duration-500 md:brightness-[0.75] md:group-hover:brightness-100 md:group-hover:scale-[1.03]">
          <img
            src={thumbnailImage}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      )}

      {/* Gradient overlay — only at bottom for text legibility */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bg via-bg/70 to-transparent" />

      {/* Title + meta — bottom-left */}
      <div className="relative z-10 p-6 sm:p-8 md:p-12">
        <span className="block text-[0.875rem] font-medium tracking-wide text-text-primary transition-colors duration-300 group-hover:text-accent">
          {title}
        </span>
        <span className="mt-1 block text-[0.75rem] tracking-wide text-text-tertiary">
          {year}
        </span>
      </div>

      {/* Arrow — hover reveal */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="absolute top-6 right-6 z-10 -translate-x-2 scale-100 text-accent opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:scale-[4] group-hover:opacity-100 sm:top-8 sm:right-8 md:top-12 md:right-12"
      >
        <path d="M7 17L17 7" />
        <path d="M7 7h10v10" />
      </svg>
    </button>
  )
}
