import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/config/firebase'
import { Stock } from '@/types'

export const beerService = {
    async getStock(): Promise<Stock> {
        try {
            const querySnapshot = await getDocs(collection(db, 'stock'))
            const stockDoc = querySnapshot.docs[0]
            return stockDoc.data() as Stock
        } catch (error) {
            console.error('Error fetching stock:', error)
            throw error
        }
    }
}
