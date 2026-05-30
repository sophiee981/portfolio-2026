import Container from '@/components/layout/Container'
import type { WorkFrontmatter } from '@/content/schema'

interface WorkHeroProps {
  data: WorkFrontmatter
  content: string
}

export default function WorkHero({ data, content }: WorkHeroProps) {
  // Extract first paragraph from markdown (before ## headings)
  const intro = content
    .split('\n')
    .filter((l) => !l.startsWith('#') && !l.startsWith('-') && l.trim())
    .join(' ')

  return (
    <>
      {/* Text hero — same spacing as home hero */}
      <section className="pt-10 pb-10 sm:pt-14 sm:pb-14 md:pt-20 md:pb-20 lg:pt-24 lg:pb-24">
        <Container>
          {/* Title */}
          <h1 className="work-title text-[clamp(2.5rem,5vw,5rem)] leading-[1.1] italic tracking-[-0.03em] text-text-primary">
            {data.title}
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-[55ch] text-[clamp(1.125rem,1.5vw,1.5rem)] leading-[1.4] font-light text-text-primary">
            {intro}
          </p>

          {/* Meta: horizontal, left-aligned, below desc */}
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
            <div>
              <p className="text-[0.875rem] tracking-wide text-text-secondary">Year</p>
              <p className="mt-1 text-[0.875rem] tracking-wide text-text-primary">
                {data.year}
              </p>
            </div>
            <div>
              <p className="text-[0.875rem] tracking-wide text-text-secondary">Role</p>
              <p className="mt-1 text-[0.875rem] tracking-wide text-text-primary">
                {data.role}
              </p>
            </div>
            <div>
              <p className="text-[0.875rem] tracking-wide text-text-secondary">Type</p>
              <p className="mt-1 text-[0.875rem] tracking-wide text-text-primary">
                {data.type}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Hero image */}
      <Container>
        <div className="aspect-[8/5] w-full overflow-hidden bg-bg-secondary ring-1 ring-white/5">
          <img
            src={data.heroImage}
            alt={data.title}
            className="h-full w-full object-cover"
            loading="eager"
          />
        </div>
      </Container>
    </>
  )
}
