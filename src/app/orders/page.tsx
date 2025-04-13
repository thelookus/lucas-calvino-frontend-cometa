'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { OrderTabs } from './components/OrderTabs'
import { OrderList } from './components/OrderList'
import { TabType } from './types'
import { useBeerStore, useOrderStore } from '@/store'
import { useEffect } from 'react'

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<TabType>('in-progress')
  const { isLoading: isLoadingBeers } = useBeerStore()
  const { isLoading: isLoadingOrders } = useOrderStore()

  useEffect(() => {
    const loadData = async () => {
        await useBeerStore.getState().fetchStock()
        await useOrderStore.getState().fetchOrders()
    }
    loadData()
  }, [])

  if (isLoadingBeers || isLoadingOrders) {
    return <div>Cargando...</div>
  }

  return (
    <div className="">
      <Header
        title="Your Orders"
        subtitle="Wait for the best beer"
      />

      <main className="min-h-screen flex flex-col">
        <OrderTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="mt-2 px-6">
          {activeTab === 'in-progress' ? (
            <OrderList />
          ) : (
            <OrderList past />
          )}
        </div>
      </main>
    </div>
  )
}
