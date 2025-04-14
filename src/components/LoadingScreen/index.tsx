import React from 'react'
import { MarketAnimatedIcon } from '@/assets/icons'

export const LoadingScreen = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-opacity-70 z-50 flex justify-center items-center">
        <MarketAnimatedIcon />
    </div>
  )
}
