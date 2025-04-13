import { renderHook, waitFor } from '@testing-library/react'
import { useOrders } from '@/hooks/useOrders'
import { orderService } from '@/services/orderService'
import { vi } from 'vitest'

vi.mock('@/services/orderService', () => ({
  orderService: {
    getOrders: vi.fn()
  }
}))

const mockOrders = [
  {
      items: [],
      rounds: [],
      id: '1',
      created: 'date',
      paid: true,
      subtotal: 80,
      taxes: 10,
      discounts: 0
  }
]

describe('useOrders', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

    it('should fetch orders on mount', async () => {
        vi.mocked(orderService.getOrders).mockResolvedValueOnce(mockOrders)

        const { result } = renderHook(() => useOrders())

        expect(result.current.isLoading).toBe(true)
        expect(result.current.orders).toEqual([])

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.orders).toEqual(mockOrders)
    expect(result.current.error).toBeNull()
  })

  it('should handle errors', async () => {
    const error = new Error('Failed to fetch')
    vi.mocked(orderService.getOrders).mockRejectedValueOnce(error)

    const { result } = renderHook(() => useOrders())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.error).toEqual(error)
    expect(result.current.orders).toEqual([])
  })

  it('should refresh orders when fetchOrders is called', async () => {
    vi.mocked(orderService.getOrders).mockResolvedValueOnce(mockOrders)

    const { result } = renderHook(() => useOrders())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    const newOrder = {
      id: '2',
      created: 'date2',
      paid: true,
      subtotal: 180,
      taxes: 20,
      discounts: 0,
      items: [],
      rounds: []
    }

    vi.mocked(orderService.getOrders).mockResolvedValueOnce([...mockOrders, newOrder])

    await result.current.fetchOrders()

    await waitFor(() => {
      expect(result.current.orders).toHaveLength(2)
    })
  })
})
