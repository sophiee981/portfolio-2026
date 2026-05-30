import { Fragment, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import LiquidText from '@/components/common/LiquidText'
import type { WorkFrontmatter } from '@/content/schema'

interface ProjectSidebarProps {
  work: { data: WorkFrontmatter; content: string } | null
  onClose: () => void
  onPrev?: () => void
  onNext?: () => void
}

interface Section {
  heading?: string
  text: string
  items: string[]
}

function parseMarkdown(md: string): Section[] {
  const sections: Section[] = []
  let current: Section = { text: '', items: [] }

  for (const line of md.split('\n')) {
    if (line.startsWith('## ')) {
      if (current.text || current.items.length > 0 || current.heading) {
        sections.push(current)
      }
      current = { heading: line.replace('## ', ''), text: '', items: [] }
    } else if (line.startsWith('- ')) {
      current.items.push(line.replace('- ', ''))
    } else if (line.trim()) {
      current.text += (current.text ? ' ' : '') + line.trim()
    }
  }

  if (current.text || current.items.length > 0 || current.heading) {
    sections.push(current)
  }

  return sections
}

export default function ProjectSidebar({ work, onClose, onPrev, onNext }: ProjectSidebarProps) {
  useEffect(() => {
    if (work) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [work])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && onPrev) onPrev()
      if (e.key === 'ArrowRight' && onNext) onNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose, onPrev, onNext])

  // Scroll to top when project changes
  const sidebarRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (work && sidebarRef.current) {
      sidebarRef.current.scrollTo({ top: 0 })
    }
  }, [work?.data.slug])

  const sections = work ? parseMarkdown(work.content) : []
  const intro = sections.find((s) => !s.heading)
  const bodySections = sections.filter((s) => s.heading)

  return createPortal(
    <AnimatePresence>
      {work && (
        <>
          {/* Clip container — constrains sidebar within max-width */}
          <div
            className="fixed top-0 left-0 bottom-0 z-[60] overflow-hidden"
            style={{ width: 'min(var(--container-max), 100vw)' }}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={onClose}
            />

            {/* Sidebar */}
            <motion.aside
              ref={sidebarRef as React.RefObject<HTMLDivElement>}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute top-0 right-0 bottom-0 w-[85%] overflow-y-auto bg-bg border-l border-border [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:w-[60%]"
            >
            {/* Nav controls — floating top-right */}
            <div className="sticky top-4 z-10 flex items-center gap-2 justify-end mr-4">
              {onPrev && (
                <button
                  onClick={onPrev}
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-bg/80 backdrop-blur-sm text-text-tertiary transition-colors hover:text-text-primary cursor-pointer"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
              )}
              {onNext && (
                <button
                  onClick={onNext}
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-bg/80 backdrop-blur-sm text-text-tertiary transition-colors hover:text-text-primary cursor-pointer"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              )}

              {/* Divider */}
              <div className="h-4 w-px bg-border" />

              {/* Close */}
              <button
                onClick={onClose}
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-bg/80 backdrop-blur-sm text-text-tertiary transition-colors hover:text-text-primary cursor-pointer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="transition-transform duration-500 ease-out group-hover:rotate-[360deg]">
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-9 sm:p-12 md:p-24">
              {/* Title */}
              <LiquidText
                key={work.data.slug}
                radius={0.2}
                className="text-text-primary leading-[1] font-normal italic"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(2rem, 5.5vw, 5rem)',
                  letterSpacing: '-0.03em',
                }}
              >
                {work.data.title}
              </LiquidText>

              {/* Intro */}
              {intro && (
                <p className="mt-8 text-[clamp(1rem,1.2vw,1.25rem)] leading-[1.5] font-light text-text-primary">
                  {intro.text}
                </p>
              )}

              {/* Meta */}
              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
                <div>
                  <p className="text-[0.75rem] tracking-wide text-text-tertiary">Year</p>
                  <p className="mt-1 text-[0.875rem] text-text-primary">{work.data.year}</p>
                </div>
                <div>
                  <p className="text-[0.75rem] tracking-wide text-text-tertiary">Role</p>
                  <p className="mt-1 text-[0.875rem] text-text-primary">{work.data.role}</p>
                </div>
                <div>
                  <p className="text-[0.75rem] tracking-wide text-text-tertiary">Type</p>
                  <p className="mt-1 text-[0.875rem] text-text-primary">{work.data.type}</p>
                </div>
              </div>

              {/* Content sections — side by side with divider */}
              {bodySections.length > 0 && (
                <div className="mt-12 grid grid-cols-1 gap-16 border-t border-border pt-12 pb-8 sm:grid-cols-[1fr_1px_1fr]">
                  {bodySections.map((section, i) => (
                    <Fragment key={i}>
                      {i > 0 && (
                        <div className="hidden sm:block bg-border" />
                      )}
                      <div>
                        <p className="text-[0.875rem] font-medium tracking-wide text-text-primary">
                          {section.heading}
                        </p>
                        <div className="mt-4">
                          {section.items.length > 0 ? (
                            <ul className="space-y-2">
                              {section.items.map((item, j) => (
                                <li key={j} className="text-[0.875rem] leading-[1.6] text-text-secondary">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-[0.875rem] leading-[1.6] text-text-secondary">
                              {section.text}
                            </p>
                          )}
                        </div>
                      </div>
                    </Fragment>
                  ))}
                </div>
              )}

              {/* Gallery */}
              {work.data.galleryImages.length > 0 && (
                work.data.galleryLayout === 'mobile' ? (
                  <div className="mt-12 grid grid-cols-2 gap-4">
                    {work.data.galleryImages.map((img, i) => (
                      <div key={i} className="flex items-center justify-center bg-[#111111] px-4 py-8 sm:px-6">
                        <div className="w-full max-w-[270px] overflow-hidden rounded-[1.5rem] bg-black p-1.5 ring-1 ring-white/5">
                          <div className="relative overflow-hidden rounded-[1.2rem]">
                            <div className="absolute top-0 left-1/2 z-10 h-4 w-20 -translate-x-1/2 rounded-b-xl bg-black" />
                            <img
                              src={img}
                              alt={`${work.data.title} gallery ${i + 1}`}
                              className="w-full"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-12 space-y-6">
                    {(() => {
                      const light = work.data.galleryTheme === 'light'
                      const pattern = work.data.galleryRowPattern
                      const mobileSet = new Set(work.data.galleryMobileIndices ?? [])
                      if (pattern && pattern.length > 0) {
                        const rows: { src: string; idx: number }[][] = []
                        let idx = 0
                        for (const count of pattern) {
                          const row: { src: string; idx: number }[] = []
                          for (let j = 0; j < count && idx < work.data.galleryImages.length; j++) {
                            row.push({ src: work.data.galleryImages[idx], idx })
                            idx += 1
                          }
                          rows.push(row)
                        }
                        while (idx < work.data.galleryImages.length) {
                          rows.push([{ src: work.data.galleryImages[idx], idx }])
                          idx += 1
                        }
                        return rows.map((row, ri) => {
                          const isMobileRow = row.some((item) => mobileSet.has(item.idx))
                          if (isMobileRow) {
                            return (
                              <div key={ri} className="grid grid-cols-2 gap-4">
                                {row.map((item, ci) => (
                                  <div key={`${ri}-${ci}`} className="flex items-center justify-center bg-[#111111] px-4 py-8 sm:px-6">
                                    <div className="w-full max-w-[270px] overflow-hidden rounded-[1.5rem] bg-black p-1.5 ring-1 ring-white/5">
                                      <div className="relative overflow-hidden rounded-[1.2rem]">
                                        <div className="absolute top-0 left-1/2 z-10 h-4 w-20 -translate-x-1/2 rounded-b-xl bg-black" />
                                        <img src={item.src} alt={`${work.data.title} gallery ${item.idx + 1}`} className="w-full" loading="lazy" />
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )
                          }
                          if (row.length === 1) {
                            return (
                              <div key={ri} className={`${light ? 'bg-[#e8e8e8]' : 'bg-[#111111]'} p-6 sm:p-8`}>
                                <div className="overflow-hidden rounded-[4px]">
                                  <div className={`flex h-6 items-center gap-1.5 ${light ? 'bg-[#f0f0f0]' : 'bg-[#161616]'} px-3`}>
                                    <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                                    <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                                    <span className="h-2 w-2 rounded-full bg-[#28c840]" />
                                  </div>
                                  <img src={row[0].src} alt={`${work.data.title} gallery ${row[0].idx + 1}`} className="w-full" loading="lazy" />
                                </div>
                              </div>
                            )
                          }
                          return (
                            <div key={ri} className="grid grid-cols-2 gap-4">
                              {row.map((item, ci) => (
                                <div key={`${ri}-${ci}`} className="flex items-center justify-center bg-[#111111] px-4 py-8 sm:px-6">
                                  <div className="w-full max-w-[270px]">
                                    <img src={item.src} alt={`${work.data.title} gallery ${item.idx + 1}`} className="w-full rounded-lg" loading="lazy" />
                                  </div>
                                </div>
                              ))}
                            </div>
                          )
                        })
                      }
                      return work.data.galleryImages.map((img, i) => (
                        <div key={i} className={`${light ? 'bg-[#e8e8e8]' : 'bg-[#111111]'} p-6 sm:p-8`}>
                          <div className="overflow-hidden rounded-[4px]">
                            <div className={`flex h-6 items-center gap-1.5 ${light ? 'bg-[#f0f0f0]' : 'bg-[#161616]'} px-3`}>
                              <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                              <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                              <span className="h-2 w-2 rounded-full bg-[#28c840]" />
                            </div>
                            <img src={img} alt={`${work.data.title} gallery ${i + 1}`} className="w-full" loading="lazy" />
                          </div>
                        </div>
                      ))
                    })()}
                  </div>
                )
              )}

            </div>
          </motion.aside>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}
