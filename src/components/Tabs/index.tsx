'use client'
import { useRef, useEffect, useState } from 'react'
import { TabsProps } from './types'

export const Tabs = ({ tabs, activeTab, onTabChange }: TabsProps) => {
  const [underlinePosition, setUnderlinePosition] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    const activeTabIndex = tabs.findIndex(tab => tab.key === activeTab)
    const activeTabElement = tabRefs.current[activeTabIndex]
    if (activeTabElement) {
      const { offsetLeft, offsetWidth } = activeTabElement
      setUnderlinePosition(offsetLeft + offsetWidth / 2)
    }
  }, [activeTab, tabs])

  return (
    <div className="border-b border-[#F2F2F2]">
      <nav className="flex gap-6 relative" aria-label="Tabs">
        {tabs.map((tab, index) => (
          <button
            key={tab.key}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            onClick={() => onTabChange(tab.key)}
            className={`
              py-3 first:ml-6 text-sm
              ${
                activeTab === tab.key
                  ? 'text-[var(--foreground)] font-medium'
                  : 'color-font-light font-normal'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
        <div
          className="absolute bottom-0 h-[3px] w-10 bg-[var(--foreground)] rounded-xl transition-all duration-300 ease-in-out"
          style={{
            left: `${underlinePosition}px`,
            transform: 'translateX(-50%)',
          }}
        />
      </nav>
    </div>
  )
}