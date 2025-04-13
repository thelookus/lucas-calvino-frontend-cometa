'use client'

import { ArrowIcon } from '@/assets/icons'
import { HeaderProps } from './types'

export const Header = ({
  title,
  subtitle,
  showBackButton = false,
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

        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>
    </header>
  )
}
