export interface ProductCardProps {
  name: string
  total: number
  index: number
  quantity: number
  thumbnailUrl?: string
  created?: string | null
  cancelled?: boolean
  onClick?: () => void
}