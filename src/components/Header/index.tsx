'use client'
import { ArrowIcon } from '@/assets/icons'
import { HeaderProps } from './types'
import Image from 'next/image'

export const Header = ({
  title,
  subtitle,
  showBackButton = false,
  showProfile = false,
  onBackClick,
  actions
}: HeaderProps) => {
  return (
    <header className="p-6 mb-6">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-[1.625rem]">
          {showBackButton && (
            <button
              onClick={onBackClick}
            >
              <ArrowIcon className="w-6 h-6" />
            </button>
          )}

          <div>
            <h1 className="text-[1.375rem] font-medium">{title}</h1>
            {subtitle && (
              <p className="text-sm font-light color-font-light">{subtitle}</p>
            )}
          </div>
        </div>

        {showProfile && (
          <div className="flex items-center gap-2">
            <div className="relative w-12 h-12">
              <Image
                src="/images/profile-placeholder.png"
                alt="Profile"
                fill
                sizes="48px"
                priority
                className="rounded-10 object-cover"
              />
            </div>
          </div>
        )}

        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>
    </header>
  )
}
