'use client'
// import { useState } from 'react'
import { TabType } from '../types'

interface OrderTabsProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

export const OrderTabs = ({ activeTab, onTabChange }: OrderTabsProps) => {
  const tabs: Array<{ key: TabType; label: string }> = [
    { key: 'in-progress', label: 'In Progress' },
    { key: 'past', label: 'Past Orders' },
  ]

  return (
    <div className="border-b border-[#F2F2F2]">
      <nav className="flex gap-6" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`
              py-3 first:ml-6 relative text-sm
              ${
                activeTab === tab.key
                  ? 'text-[var(--foreground)] font-medium'
                  : 'color-font-light font-normal'
              }
            `}
          >
            {tab.label}
            {activeTab === tab.key && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-[3px] bg-[var(--foreground)] rounded-xl" />
            )}
          </button>
        ))}
      </nav>
    </div>
  )
}
