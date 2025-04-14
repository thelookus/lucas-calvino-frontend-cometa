export interface Tab {
  key: string
  label: string
}

export interface TabsProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabKey: string) => void
}