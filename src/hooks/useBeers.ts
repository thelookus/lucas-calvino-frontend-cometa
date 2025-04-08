import { useState, useEffect } from 'react'
import { beerService } from '@/services/beerService'
import { Stock } from '@/types'

export const useBeers = () => {
    const [stock, setStock] = useState<Stock | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    const fetchStock = async () => {
        try {
            setIsLoading(true)
            const data = await beerService.getStock()
            setStock(data)
        } catch (err) {
            setError(err as Error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchStock()
    }, [])

    return {
        stock,
        isLoading,
        error,
        refreshStock: fetchStock
    }
}