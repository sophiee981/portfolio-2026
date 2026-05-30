import type { ProfileFrontmatter } from '@/content/schema'

interface ExperienceProps {
  experience: ProfileFrontmatter['experience']
}

export default function Experience({ experience }: ExperienceProps) {
  return (
    <section className="border-t border-b border-border py-12 sm:py-16 md:py-24">
      <div className="grid grid-cols-1 sm:grid-cols-4">
        <div className="px-6 sm:px-8 md:px-12">
          <p className="text-[0.875rem] font-medium tracking-wide text-text-primary">
            Experience
          </p>
        </div>

        <div className="col-span-1 mt-4 px-6 sm:col-span-2 sm:mt-0 sm:px-8 md:px-12">
          <div className="space-y-12">
            {experience.map((entry, i) => (
              <div key={i}>
                <p className="text-[0.875rem] font-medium tracking-wide text-text-primary">
                  {entry.company} / {entry.role}
                </p>
                <p className="mt-1 text-[0.75rem] tracking-wide text-text-secondary">
                  {entry.period}
                  {entry.location && `, ${entry.location}`}
                </p>
                {entry.description && (
                  Array.isArray(entry.description) ? (
                    <ul className="mt-4 list-disc pl-5 space-y-2 marker:text-accent">
                      {entry.description.map((line, j) => (
                        <li key={j} className="text-[0.875rem] leading-[1.6] tracking-wide text-text-primary">
                          {line}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-4 text-[0.875rem] leading-[1.6] tracking-wide text-text-primary">
                      {entry.description}
                    </p>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
