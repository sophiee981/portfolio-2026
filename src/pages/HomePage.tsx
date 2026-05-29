import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Hero from '@/components/home/Hero'
import FeaturedGrid from '@/components/home/FeaturedGrid'
import VibeCodeSection from '@/components/home/VibeCodeSection'
import AnimatedSection from '@/components/common/AnimatedSection'
import LiquidText from '@/components/common/LiquidText'
import { getFeaturedWork } from '@/content/loader'

function CtaSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [80, -80])

  return (
    <AnimatedSection>
      <div
        ref={sectionRef as React.RefObject<HTMLDivElement>}
        className="border-b border-border bg-bg px-6 py-24 sm:px-8 sm:py-32 md:px-12 md:py-40"
      >
        <motion.div style={{ y }}>
          <LiquidText
            radius={0.2}
            className="text-text-primary leading-[1] font-normal italic"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.8rem, 5.5vw, 7rem)',
              letterSpacing: '-0.03em',
            }}
          >
            Let's build something
            <br />
            exceptional together.
          </LiquidText>
          <a
            href="mailto:xuangd98@gmail.com"
            className="mt-8 inline-block text-[0.875rem] tracking-wide text-text-primary transition-all duration-300 hover:underline hover:decoration-accent hover:underline-offset-4"
          >
            xuangd98@gmail.com
          </a>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}

export default function HomePage() {
  const featured = getFeaturedWork()

  return (
    <>
      <Hero />
      <FeaturedGrid work={featured} />
      <VibeCodeSection />
      <CtaSection />
    </>
  )
}
