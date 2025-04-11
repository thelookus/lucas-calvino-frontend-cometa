// store/useOrderStore.ts
import { create } from 'zustand'
import { Order } from '@/types'
import { orderService } from '@/services/orderService'

export interface OrderState {
    currentOrder: Order | null
    orders: Order[]
    isLoading: boolean
    error: Error | null

    fetchOrders: () => Promise<void>
    createOrder: (order: Omit<Order, 'id'>) => Promise<void>
    updateOrder: (orderId: string, orderData: Partial<Order>) => Promise<void>
    // Local State Actions
    setCurrentOrder: (order: Order | null) => void
}

export const useOrderStore = create<OrderState>((set, get) => ({
    currentOrder: null,
    orders: [],
    isLoading: false,
    error: null,

    fetchOrders: async () => {
        try {
            set({ isLoading: true })
            const orders = await orderService.getOrders()
            set({ orders, error: null })
        } catch (error) {
            console.error('Error fetching orders:', error) // Debug
            set({ error: error as Error })
        } finally {
            set({ isLoading: false })
        }
    },

    createOrder: async (order) => {
            try {
            set({ isLoading: true })
            await orderService.createOrder(order)
            await get().fetchOrders() // Refetch after creating
        } catch (error) {
            set({ error: error as Error })
        } finally {
            set({ isLoading: false })
        }
    },

    updateOrder: async (orderId, orderData) => {
        try {
            set({ isLoading: true })
            await orderService.updateOrder(orderId, orderData)
            await get().fetchOrders() // Refetch after updating
        } catch (error) {
            set({ error: error as Error })
        } finally {
            set({ isLoading: false })
        }
    },

    setCurrentOrder: (order) => set({ currentOrder: order })
}))
