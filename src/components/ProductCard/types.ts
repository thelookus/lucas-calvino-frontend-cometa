export interface ProductCardProps {
  name: string
  total: number
  quantity?: number
  thumbnailUrl?: string
  index: number
  created?: string
  cancelled?: boolean
  rating?: number
  onClick?: () => void
}