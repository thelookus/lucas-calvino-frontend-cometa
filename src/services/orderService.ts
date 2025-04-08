// services/orderService.ts
import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore'
import { db } from '@/config/firebase'
import { Order } from '@/types'

export const orderService = {
    async createOrder(order: Omit<Order, 'id'>) {
        try {
            const docRef = await addDoc(collection(db, 'order'), order) // Cambiado a 'order'
            return docRef.id
        } catch (error) {
            console.error('Error creating order:', error)
            throw new Error(`Error creating order: ${error}`)
        }
    },

    async getOrders(): Promise<Order[]> {
        try {
            const orderRef = collection(db, 'order') // Cambiado a 'order'
            const querySnapshot = await getDocs(orderRef)
            console.log('Raw orders data:', querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))) // Debug

            if (querySnapshot.empty) {
                await this.createOrder({
                    created: new Date().toISOString(),
                    paid: false,
                    subtotal: 0,
                    taxes: 0,
                    discounts: 0,
                    items: [],
                    rounds: []
                })
                return this.getOrders()
            }
            const orders = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Order[]
            return orders
        } catch (error) {
            console.error('Error fetching orders:', error)
            throw new Error(`Error fetching orders: ${error}`)
        }
    },

    async updateOrder(orderId: string, orderData: Partial<Order>) {
        try {
            const orderRef = doc(db, 'order', orderId) // Cambiado a 'order'
            await updateDoc(orderRef, orderData)
        } catch (error) {
            console.error('Error updating order:', error)
            throw new Error(`Error updating order: ${error}`)
        }
    },
}
