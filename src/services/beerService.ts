import { collection, getDocs, updateDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Stock } from '@/types'

export const beerService = {
    async getStock() {
        try {
            const querySnapshot = await getDocs(collection(db, 'stock'))
            return querySnapshot.docs[0].data() as Stock
        } catch (error) {
            throw new Error(`Error fetching stock: ${error}`)
        }
    },

    async updateBeerQuantity(beerId: string, quantity: number) {
        try {
            const beerRef = doc(db, 'beers', beerId)
            await updateDoc(beerRef, { quantity })
        } catch (error) {
            throw new Error(`Error updating beer quantity: ${error}`)
        }
    }
}
