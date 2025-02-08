"use client"

import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes"
import type React from "react"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </SessionProvider>
  )
}

