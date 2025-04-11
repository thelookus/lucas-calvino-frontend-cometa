'use client'
import { useBeerStore, useOrderStore } from '@/store'
import { useEffect } from 'react'

export default function Home() {
  const { stock, isLoading: isLoadingBeers } = useBeerStore()
  const { orders, isLoading: isLoadingOrders } = useOrderStore()

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
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Bar de Cervezas</h1>

      {/* Beer List */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Cervezas Disponibles</h2>
        <div className="grid grid-cols-3 gap-4">
          {stock?.beers.map((beer) => (
            <div key={beer.name} className="border p-4">
              <h3 className="font-semibold">{beer.name}</h3>
              <p>Precio: ${beer.price}</p>
              <p>Disponibles: {beer.quantity}</p>
              <button
                className="bg-blue-500 text-white px-4 py-2 mt-2"
                disabled={beer.quantity === 0}
                onClick={() => {
                  // Logic to add to order
                }}
              >
                Agregar a la orden
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Order List */}
      <section>
      <h2 className="text-xl font-semibold mb-4">Órdenes</h2>
        <div className="space-y-4">
          {orders && orders.length > 0 ? (
            orders.map((order) => (
              <div key={order.id} className="border p-4">
                <p>Fecha: {new Date(order.created).toLocaleDateString()}</p>
                <p>Estado: {order.paid ? 'Pagada' : 'Pendiente'}</p>
                <p>Subtotal: ${order.subtotal}</p>
                <div className="mt-2">
                  <h4 className="font-semibold">Rondas:</h4>
                  {order.rounds.map((round, index) => (
                    <div key={index} className="ml-4">
                      <p>Ronda {index + 1}:</p>
                      {round.items.map(item => (
                        <p key={item.name} className="ml-2">
                          - {item.name}: {item.quantity}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>No hay órdenes disponibles</p>
          )}
        </div>
      </section>
    </main>
  )
}
