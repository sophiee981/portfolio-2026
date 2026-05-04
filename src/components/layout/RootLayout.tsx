import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import CrtBackground from './CrtBackground'
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics'

export default function RootLayout() {
  const location = useLocation()
  useGoogleAnalytics()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      <CrtBackground />
      {/* Border line — always on top */}
      <div
        className="fixed top-0 bottom-0 z-[80] w-px bg-border"
        style={{ left: 'min(var(--container-max), 100vw)' }}
      />
      <div className="relative w-full max-w-[var(--container-max)]">
        <Navbar />
        <main className="relative z-10 bg-bg">
          <Outlet />
        </main>
        <div className="sticky bottom-0 z-[5] bg-bg">
          <Footer />
        </div>
      </div>
    </>
  )
}
