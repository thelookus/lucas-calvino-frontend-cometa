/* c8 ignore start */
import { create } from 'zustand'
import { Stock } from '@/types'
import { beerService } from '@/services/beerService'

export interface BeerState {
    stock: Stock | null
    isLoading: boolean
    error: Error | null
    fetchStock: () => Promise<void>
}

export const useBeerStore = create<BeerState>((set) => ({
    stock: null,
    isLoading: false,
    error: null,

    fetchStock: async () => {
        try {
            set({ isLoading: true })
            const data = await beerService.getStock()
            set({ stock: data, error: null })
        } catch (error) {
            set({ error: error as Error })
        } finally {
            set({ isLoading: false })
        }
    }
}))
