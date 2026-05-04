import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

const GA_MEASUREMENT_ID = 'G-2HKG0R7K98'

export function useGoogleAnalytics() {
  const location = useLocation()

  useEffect(() => {
    if (typeof window.gtag !== 'function') return

    window.gtag('event', 'page_view', {
      send_to: GA_MEASUREMENT_ID,
      page_path: location.pathname + location.search,
      page_location: window.location.href,
      page_title: document.title,
    })
  }, [location.pathname, location.search])
}
