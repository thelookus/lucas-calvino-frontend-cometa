import { useState, useEffect } from 'react'
import { orderService } from '@/services/orderService'
import { Order, UseOrderReturn } from '@/types'

export const useOrders = (): UseOrderReturn => {
    const [orders, setOrders] = useState<Order[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    const fetchOrders = async () => {
        try {
            setIsLoading(true)
            const data = await orderService.getOrders()
            setOrders(data)
        } catch (err) {
            setError(err as Error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    return {
        orders,
        isLoading,
        error,
        fetchOrders
    }
}
