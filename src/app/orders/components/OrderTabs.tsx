'use client'
import { TabType } from '../types'
import { Tabs } from '@/components/Tabs'

interface OrderTabsProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

export const OrderTabs = ({ activeTab, onTabChange }: OrderTabsProps) => {
  const tabs = [
    { key: 'in-progress', label: 'In Progress' },
    { key: 'past', label: 'Past Orders' },
  ]

  const handleTabChange = (tabKey: string) => {
    onTabChange(tabKey as TabType)
  }

  return (
    <Tabs
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={handleTabChange}
    />
  )
}
