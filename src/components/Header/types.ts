export interface HeaderProps {
  title: string
  subtitle?: string
  showBackButton?: boolean
  showProfile?: boolean
  onBackClick?: () => void
  actions?: React.ReactNode
}