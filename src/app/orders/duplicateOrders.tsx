'use client'

import { toast } from 'react-hot-toast'
import { useOrderStore } from '@/store'

export default function DuplicateOrders() {
  const { isLoading, fetchOrders, duplicateOrders } = useOrderStore()

  const handleDuplicateOrders = async () => {
    try {
      await duplicateOrders()
      toast.success('Orders duplicated successfully')
      await fetchOrders()
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      toast.error(`Failed to duplicate orders: ${errorMessage}`)
    } finally {
    }
  }

  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Orders</h1>
      <button
        onClick={handleDuplicateOrders}
        disabled={isLoading}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Duplicating...' : 'Duplicate Orders'}
      </button>
    </div>
  )
}
