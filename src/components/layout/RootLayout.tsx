import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics'

export default function RootLayout() {
  const location = useLocation()
  useGoogleAnalytics()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      <div className="relative w-full">
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
