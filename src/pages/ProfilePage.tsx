import AnimatedSection from '@/components/common/AnimatedSection'
import ProfileHero from '@/components/profile/ProfileHero'
import Experience from '@/components/profile/Experience'
import Skills from '@/components/profile/Skills'
import InfoPanel from '@/components/profile/InfoPanel'
import { getProfile } from '@/content/loader'

export default function ProfilePage() {
  const profile = getProfile()

  return (
    <>
      <AnimatedSection>
        <ProfileHero content={profile.content} />
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <Experience experience={profile.data.experience} />
      </AnimatedSection>
      <AnimatedSection delay={0.15}>
        {profile.data.skills && <Skills skills={profile.data.skills} />}
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <InfoPanel data={profile.data} />
      </AnimatedSection>
    </>
  )
}
