
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Check on mount
    checkMobile()
    
    // Add resize listener
    window.addEventListener('resize', checkMobile)
    
    // Clean up
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return isMobile
}

export function getIsMobileOnce() {
  if (typeof window === 'undefined') return false
  return window.innerWidth < MOBILE_BREAKPOINT
}