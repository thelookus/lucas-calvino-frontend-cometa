import { Order, Beer } from '@/types'

export interface OrderContextType {
    currentOrder: Order | null
    addToOrder: (beer: Beer) => void
    removeFromOrder: (itemId: string) => void
    clearOrder: () => void
}