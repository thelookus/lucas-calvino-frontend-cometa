import { Order } from "./order"

export interface UseOrderReturn {
    orders: Order[]
    isLoading: boolean
    error: Error | null
    fetchOrders: () => Promise<void>
}