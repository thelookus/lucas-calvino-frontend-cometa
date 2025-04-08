import { collection, addDoc, getDocs, updateDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Order } from '@/types'

export const orderService = {
  async createOrder(order: Omit<Order, 'id'>) {
    try {
      const docRef = await addDoc(collection(db, 'orders'), order)
      return docRef.id
    } catch (error) {
      throw new Error(`Error creating order: ${error}`)
    }
  },

  async getOrders() {
    try {
      const querySnapshot = await getDocs(collection(db, 'orders'))
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Order, 'id'>)
      })) as Order[]
    } catch (error) {
      throw new Error(`Error fetching orders: ${error}`)
    }
  },

  async updateOrder(orderId: string, orderData: Partial<Order>) {
    try {
      const orderRef = doc(db, 'orders', orderId)
      await updateDoc(orderRef, orderData)
    } catch (error) {
      throw new Error(`Error updating order: ${error}`)
    }
  }
}
