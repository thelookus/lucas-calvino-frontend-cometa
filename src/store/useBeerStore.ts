import { create } from 'zustand'
import { Stock } from '@/types'
import { beerService } from '@/services/beerService'

export interface BeerState {
    stock: Stock | null
    isLoading: boolean
    error: Error | null

    fetchStock: () => Promise<void>
    updateBeerQuantity: (beerId: string, quantity: number) => Promise<void>
}

export const useBeerStore = create<BeerState>((set, get) => ({
    stock: null,
    isLoading: false,
    error: null,

    fetchStock: async () => {
        try {
            set({ isLoading: true })
            const stock = await beerService.getStock()
            set({ stock, error: null })
        } catch (error) {
            set({ error: error as Error })
        } finally {
            set({ isLoading: false })
        }
    },

    updateBeerQuantity: async (beerId: string, quantity: number) => {
        try {
            set({ isLoading: true })
            await beerService.updateBeerQuantity(beerId, quantity)
            await get().fetchStock()
        } catch (error) {
            set({ error: error as Error })
        } finally {
            set({ isLoading: false })
        }
    }
}))
