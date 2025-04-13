export type OrderStatus = 'in-progress' | 'completed'

export interface Order {
  id: string
  status: OrderStatus
  items: Array<{
    id: string
    name: string
    quantity: number
    price: number
  }>
  total: number
  date: string
}

export type TabType = 'in-progress' | 'past'
