// store/useOrderStore.ts
import { create } from 'zustand'
import { Order, OrderItem } from '@/types'
import { orderService } from '@/services/orderService'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '@/config/firebase'
import { Beer } from '@/types/beer'

export interface OrderState {
    currentOrder: Order | null
    orders: Order[]
    isLoading: boolean
    error: Error | null
    filteredOrders: Order[]

    // Selectors
    getActiveOrders: () => Order[]
    getPastOrders: () => Order[]

    // API Actions
    fetchOrders: () => Promise<void>
    createOrder: (order: Omit<Order, 'id'>) => Promise<void>
    updateOrder: (orderId: string, orderData: Partial<Order>) => Promise<void>
    duplicateOrders: () => Promise<void>

    // Local State Actions
    setCurrentOrder: (order: Order | null) => void
    processOrderItems: (order: Order) => Promise<void>
    updateFilteredOrders: (past?: boolean) => void
}

export const useOrderStore = create<OrderState>((set, get) => ({
    currentOrder: null,
    orders: [],
    isLoading: true,
    error: null,
    filteredOrders: [],

    getActiveOrders: () => {
        const { orders } = get()
        return orders.filter(order => !order.paid && !order.cancelled)
    },

    getPastOrders: () => {
        const { orders } = get()
        return orders.filter(order => order.paid || order.cancelled)
    },

    fetchOrders: async () => {
        try {
            set({ isLoading: true })
            const orders = await orderService.getOrders()
            set({ orders, isLoading: false })

            for (const order of orders) {
                await get().processOrderItems(order)
            }
        } catch (error) {
            set({ isLoading: false, error: error as Error })
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

    /**
     * A util method to duplicate orders intially
     * Only used for testing purposes
     */
    duplicateOrders: async () => {
        try {
            set({ isLoading: true })
            const response = await fetch('/api/orders/actions/duplicate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            })

            if (!response.ok) {
                throw new Error('Failed to duplicate orders')
            }

            await get().fetchOrders()
        } catch (error) {
            set({ error: error as Error })
        } finally {
            set({ isLoading: false })
        }
    },

    setCurrentOrder: (order) => set({ currentOrder: order }),

    processOrderItems: async (order: Order) => {
        try {
            // Get stock data first
            const stockRef = collection(db, 'stock')
            const stockSnap = await getDocs(query(stockRef))
            const stockDoc = stockSnap.docs[0]
            const stockData = stockDoc.data()

            if (!stockData.beers || !Array.isArray(stockData.beers)) {
                return
            }

            const stockItems = stockData.beers as Beer[]

            if (stockItems.length === 0) {
                return
            }

            // Group items from all rounds
            const itemsMap = new Map<string, number>()

            order.rounds.forEach(round => {
                round.items.forEach(item => {
                    const currentQuantity = itemsMap.get(item.name) || 0
                    itemsMap.set(item.name, currentQuantity + (item.quantity || 1))
                })
            })

            // Create OrderItems with stock data
            const processedItems = Array.from(itemsMap.entries())
                .map(([name, quantity]): OrderItem | undefined => {
                    const stockItem = stockItems.find(item => {
                        if (!item?.name) {
                            return false
                        }
                        const match = item.name.toLowerCase() === name.toLowerCase()
                        return match
                    })

                    if (!stockItem) {
                        return undefined
                    }

                    if (!stockItem.price) {
                        return undefined
                    }

                    return {
                        name,
                        quantity,
                        price_per_unit: stockItem.price,
                        total: stockItem.price * quantity,
                        thumbnailUrl: stockItem.thumbnailUrl
                    }
                })
                .filter((item): item is OrderItem => item !== undefined)

            // Calculate subtotal only if we have items
            const subtotal = processedItems.length > 0
                ? processedItems.reduce((sum, item) => sum + item.total, 0)
                : 0

            // Update the order in the store
            const updatedOrder: Order = {
                ...order,
                items: processedItems,
                subtotal
            }

            set(state => ({
                orders: state.orders.map(o => o.id === order.id ? updatedOrder : o)
            }))

            // Update the order in Firestore with clean data
            const updateData = {
                items: processedItems,
                subtotal
            }

            await orderService.updateOrder(order.id, updateData)

        } catch (error) {
            console.error('Error processing order items:', error)
        }
    },

    updateFilteredOrders: (past = false) => {
        const { getActiveOrders, getPastOrders } = get()
        const orders = past ? getPastOrders() : getActiveOrders()
        set({ filteredOrders: orders })
    }
}))
