'use client'
import { ProductCardProps } from './types'
import Image from 'next/image'
import { useState } from 'react'
import { Rate } from '@/components/Rate'

const getValidImageUrl = (url: string | undefined) => {
  if (!url) return '/images/placeholder.png'
  const cleanUrl = url.replace(/['"]/g, '')

  try {
    new URL(cleanUrl)
    return cleanUrl
  } catch {
    return cleanUrl.startsWith('/') ? cleanUrl : `/${cleanUrl}`
  }
}

export const ProductCard = ({
  name,
  total,
  quantity,
  thumbnailUrl,
  index,
  created,
  cancelled,
  rating = 0,
  onClick
}: ProductCardProps) => {
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick?.()
    }
  }

  return (
    <div
      className="flex items-center gap-3 py-2 hover:bg-gray-50 transition-colors cursor-pointer"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${name || 'product'}`}
    >
      <div className="w-15 h-15 relative rounded-xl overflow-hidden">
        <Image
          src={imageError ? '/images/placeholder.png' : getValidImageUrl(thumbnailUrl)}
          alt={name || 'Product image'}
          fill
          sizes="(max-width: 480px) 96px, 96px"
          priority={index === 0}
          className="object-cover"
          loading={index === 0 ? "eager" : "lazy"}
          onError={handleImageError}
        />
      </div>

      <div className="flex-1">
        <h3 className="text-base font-normal">{name || 'Product'}</h3>
        {quantity !== undefined && (
          <div className="flex text-[0.8125rem] items-center gap-1 color-font-light">
            <span>{quantity} {quantity === 1 ? 'item' : 'items'}</span>
            <span>•</span>
            <span>$ {total.toLocaleString()}</span>
          </div>
        )}
        {!quantity && (
          <div className="text-[0.8125rem] color-font-light">
            <span>$ {total.toLocaleString()}</span>
          </div>
        )}
      </div>
      {rating > 0 && <Rate score={rating} />}
      {created && (
        <div className="flex flex-col items-end text-[0.625rem] color-font-light">
          <span className="">
            {created}
          </span>
          <span className="color-font-warning">
            {cancelled && 'Cancelled'}
          </span>
        </div>
      )}
    </div>
  )
}
