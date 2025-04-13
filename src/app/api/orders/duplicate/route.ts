import { NextResponse } from 'next/server'
import { db } from '@/config/firebase'
import { collection, getDocs, addDoc, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'

interface Order extends DocumentData {
  id: string
  items?: DocumentData[]
  [key: string]: unknown
}

export async function POST() {
  try {
    // Get all orders
    const ordersRef = collection(db, 'order')
    const ordersSnapshot = await getDocs(ordersRef)
    const orders = ordersSnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
      id: doc.id,
      ...doc.data()
    }))

    // Duplicate each order
    const duplicatedOrders = await Promise.all(
      orders.map(async (order: Order) => {
        // Create new order with same data but new ID
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...orderData } = order
        const newOrderRef = await addDoc(ordersRef, orderData)

        // Get the new order to return
        const newOrderDoc = await getDocs(collection(db, 'order', newOrderRef.id))
        return {
          id: newOrderDoc.docs[0].id,
          ...newOrderDoc.docs[0].data()
        }
      })
    )

    return NextResponse.json({
      success: true,
      message: 'Orders duplicated successfully',
      duplicatedOrders
    })
  } catch (error) {
    console.error('Error duplicating orders:', error)
    return NextResponse.json(
      { success: false, message: 'Error duplicating orders' },
      { status: 500 }
    )
  }
}