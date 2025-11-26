"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

type HomeCtaButtonProps = {
  hasPlayed: boolean
}

export function HomeCtaButton({ hasPlayed }: HomeCtaButtonProps) {
  const router = useRouter()
  const [isNavigating, setIsNavigating] = useState(false)

  const target = hasPlayed ? "/results" : "/quiz"
  const label = hasPlayed ? "Zobacz Wyniki" : "Rozpocznij Quiz"
  const loadingText = hasPlayed ? "Otwieranie..." : "Ładowanie..."

  const handleClick = () => {
    if (isNavigating) return
    setIsNavigating(true)
    router.push(target)
  }

  const buttonClass = hasPlayed
    ? "w-full text-lg"
    : "w-full text-lg shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"

  return (
    <Button
      variant={hasPlayed ? "outline" : "default"}
      size="lg"
      className={buttonClass}
      onClick={handleClick}
      isLoading={isNavigating}
      loadingText={loadingText}
    >
      {label}
    </Button>
  )
}
