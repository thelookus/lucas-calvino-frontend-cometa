/* c8 ignore start */
'use client'
import { useEffect, useState } from 'react'
import { LoadingScreen } from '@/components/LoadingScreen'

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-xl font-normal color-font-light">Profiles (not implemented)</h1>
    </div>
  )
}