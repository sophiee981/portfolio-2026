import type { ProfileFrontmatter } from '@/content/schema'

interface SkillsProps {
  skills: NonNullable<ProfileFrontmatter['skills']>
}

function renderBold(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/)
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-medium">
        {part}
      </strong>
    ) : (
      part
    )
  )
}

export default function Skills({ skills }: SkillsProps) {
  return (
    <section className="border-t border-border py-12 sm:py-16 md:py-24">
      <div className="grid grid-cols-1 items-start sm:grid-cols-4">
        <div className="px-6 sm:px-8 md:px-12">
          <p className="text-[0.875rem] font-medium tracking-wide text-text-primary">
            Skills
          </p>
        </div>

        <div className="col-span-1 mt-4 px-6 sm:col-span-2 sm:mt-0 sm:px-8 md:px-12">
          <p className="text-[0.875rem] leading-[1.6] tracking-wide text-text-primary">
            {skills.summary}
          </p>

          <ul className="mt-6 list-disc space-y-2 pl-4 marker:text-accent">
            {skills.items.map((item, i) => (
              <li
                key={i}
                className="text-[0.875rem] leading-[1.6] tracking-wide text-text-primary"
              >
                {renderBold(item)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
