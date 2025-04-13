'use client'
import { ProductCard } from '@/components/ProductCard'
import { useOrderStore } from '@/store'
import { useEffect } from 'react'
import { OrderItem } from '@/types'
import { formatDate } from '@/utils/date'

export const OrderList = ({ past = false }) => {
  const { filteredOrders, updateFilteredOrders } = useOrderStore()

  useEffect(() => {
    updateFilteredOrders(past)
  }, [updateFilteredOrders, past])

  const getOrderName = (items: OrderItem[]) => {
    return items.map(item => item.name).join(', ')
  }

  const getItemsQuantity = (items: OrderItem[]) => {
    return items.map(item => item.quantity).reduce((sum, item) => sum + item, 0)
  }

  return (
    <>
      {filteredOrders.map((order, index) => (
        <ProductCard
          key={getOrderName(order.items)}
          name={getOrderName(order.items)}
          total={order.subtotal}
          quantity={getItemsQuantity(order.items)}
          thumbnailUrl={order.items[0]?.thumbnailUrl}
          index={index}
          cancelled={order.cancelled}
          created={order.created ? formatDate(order.created) : null}
          onClick={() => console.log('Clicked on order')}
        />
      ))}
    </>
  )
}
