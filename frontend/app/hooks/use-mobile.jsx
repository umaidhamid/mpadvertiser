There it is. One tiny TypeScript fingerprint hiding in plain sight 🕵️‍♂️

This part:

React.useState<boolean>


That <boolean> is TypeScript.
JavaScript does not understand angle-bracket generics.

Let’s convert this cleanly to pure JavaScript.

✅ JavaScript Version (No TypeScript)
import * as React from "react"

const MOBILE_BREAKPOINT = 1024

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== "undefined"
      ? window.innerWidth < MOBILE_BREAKPOINT
      : false
  )

  React.useEffect(() => {
    if (typeof window === "undefined") return

    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    window.addEventListener("resize", checkMobile)
    checkMobile()

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return isMobile
}