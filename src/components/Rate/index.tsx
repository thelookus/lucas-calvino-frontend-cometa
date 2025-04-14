'use client'
import { RateProps } from './types'

const StarIcon = ({ filled, size }: { filled: boolean, size: 'small' | 'medium' | 'large' }) => {
  const sizes = {
    small: '12',
    medium: '16',
    large: '20'
  }

  return (
    <svg
      width={sizes[size]}
      height={sizes[size]}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${filled ? 'text-[#EB0029]' : 'text-gray-200'}`}
    >
      <path
        d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const Rate = ({ score, maxScore = 5, size = 'medium' }: RateProps) => {
  const stars = Array.from({ length: maxScore }, (_, index) => {
    const filled = index < Math.floor(score)
    return <StarIcon key={index} filled={filled} size={size} />
  })

  const sizeClasses = {
    small: 'gap-[1px]',
    medium: 'gap-[2px]',
    large: 'gap-2'
  }

  const textSizeClasses = {
    small: 'text-[10px]',
    medium: 'text-xs',
    large: 'text-sm'
  }

  return (
    <div className="flex items-center gap-1">
      <div className={`flex items-center ${sizeClasses[size]}`}>
        {stars}
      </div>
      <span className={`color-font-light font-light ${textSizeClasses[size]}`}>{score.toFixed(1)}</span>
    </div>
  )
}