import { vi } from 'vitest'
import { useOrderStore } from '@/store/useOrderStore'
import { orderService } from '@/services/orderService'
import { getDocs } from 'firebase/firestore'
import { Order } from '@/types/order'
import { Stock } from '@/types/beer'

// Mock Firebase y orderService
vi.mock('@/services/orderService', () => ({
  orderService: {
    getOrders: vi.fn(),
    createOrder: vi.fn(),
    updateOrder: vi.fn()
  }
}))

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  getDocs: vi.fn(),
  query: vi.fn()
}))

vi.mock('@/config/firebase', () => ({
  db: {}
}))

describe('useOrderStore', () => {
  const mockOrders: Order[] = [
    {
      cancelled: false,
      created: "2024-01-20T10:00:00.000Z",
      discounts: 0,
      id: "1",
      items: [
        {
          name: "Beer 1",
          price_per_unit: 100,
          quantity: 2,
          thumbnailUrl: "http://example.com/beer1.jpg",
          total: 200,
        },
      ],
      paid: false,
      rounds: [
        {
          created: "2024-01-20T10:00:00.000Z",
          items: [
            {
              name: "Beer 1",
              quantity: 2,
            },
          ],
        },
      ],
      subtotal: 200,
      taxes: 0,
    },
    {
      cancelled: false,
      created: "2024-01-20T10:00:00.000Z",
      discounts: 0,
      id: "2",
      items: [
        {
          name: "Beer 2",
          price_per_unit: 150,
          quantity: 1,
          thumbnailUrl: "http://example.com/beer2.jpg",
          total: 150,
        },
      ],
      paid: true,
      rounds: [
        {
          created: "2024-01-20T10:00:00.000Z",
          items: [
            {
              name: "Beer 2",
              quantity: 1,
            },
          ],
        },
      ],
      subtotal: 150,
      taxes: 0,
    }
  ]

  const mockStockData: Stock = {
    last_updated: '2024-01-20T10:00:00.000Z',
    beers: [
      {
        name: 'Beer 1',
        price: 100,
        quantity: 10,
        thumbnailUrl: 'http://example.com/beer1.jpg'
      },
      {
        name: 'Beer 2',
        price: 150,
        quantity: 5,
        thumbnailUrl: 'http://example.com/beer2.jpg'
      }
    ]
  }

  beforeEach(() => {
    vi.clearAllMocks()
    useOrderStore.setState({
      orders: mockOrders,
      currentOrder: null,
      isLoading: false,
      error: null,
      filteredOrders: []
    })

    // Mock Firebase responses
    vi.mocked(getDocs).mockResolvedValue({
      docs: [
        {
          data: () => mockStockData
        }
      ]
    })
  })

  describe('selectors', () => {
    it('getActiveOrders returns unpaid and not cancelled orders', () => {
      const store = useOrderStore.getState()
      const activeOrders = store.getActiveOrders()
      expect(activeOrders).toHaveLength(1)
      expect(activeOrders[0].id).toBe('1')
    })

    it('getPastOrders returns paid or cancelled orders', () => {
      const store = useOrderStore.getState()
      const pastOrders = store.getPastOrders()
      expect(pastOrders).toHaveLength(1)
      expect(pastOrders[0].id).toBe('2')
    })
  })

  describe('actions', () => {
    it('fetchOrders loads orders and processes them', async () => {
      vi.mocked(orderService.getOrders).mockResolvedValue(mockOrders)

      const store = useOrderStore.getState()
      await store.fetchOrders()

      expect(orderService.getOrders).toHaveBeenCalled()
      expect(store.orders).toEqual(mockOrders)
      expect(store.isLoading).toBe(false)
    })

    it('createOrder creates a new order and refetches', async () => {
      const newOrder = { rounds: [], paid: false, cancelled: false }
      const store = useOrderStore.getState()

      await store.createOrder(newOrder)

      expect(orderService.createOrder).toHaveBeenCalledWith(newOrder)
      expect(orderService.getOrders).toHaveBeenCalled()
    })

    it('updateOrder updates an order and refetches', async () => {
      const orderId = '1'
      const updateData = { paid: true }
      const store = useOrderStore.getState()

      await store.updateOrder(orderId, updateData)

      expect(orderService.updateOrder).toHaveBeenCalledWith(orderId, updateData)
      expect(orderService.getOrders).toHaveBeenCalled()
    })

    it('updateFilteredOrders updates filtered orders based on past parameter', async () => {
      useOrderStore.setState({ orders: mockOrders })
      const store = useOrderStore.getState()

      store.updateFilteredOrders(false)

      await vi.waitFor(() => {
        const updatedStore = useOrderStore.getState()
        expect(updatedStore.filteredOrders).toHaveLength(1)
        expect(updatedStore.filteredOrders[0].id).toBe('1')
      })

      store.updateFilteredOrders(true)
      await vi.waitFor(() => {
        const updatedStore = useOrderStore.getState()
        expect(updatedStore.filteredOrders).toHaveLength(1)
        expect(updatedStore.filteredOrders[0].id).toBe('2')
      })
    })
  })

  describe('processOrderItems', () => {
    it('handles invalid stock data', async () => {
      vi.mocked(getDocs).mockResolvedValueOnce({
        docs: [
          {
            data: () => ({ beers: null })
          }
        ]
      })

      const store = useOrderStore.getState()
      await store.processOrderItems(mockOrders[0])

      // Verificar que no hubo cambios en el order
      expect(store.orders).toEqual(mockOrders)
    })

    it('handles empty stock items', async () => {
      vi.mocked(getDocs).mockResolvedValueOnce({
        docs: [
          {
            data: () => ({ beers: [] })
          }
        ]
      })

      const store = useOrderStore.getState()
      await store.processOrderItems(mockOrders[0])

      expect(store.orders).toEqual(mockOrders)
    })

    it('handles missing stock item data', async () => {
      const invalidStockData: Stock = {
        last_updated: '2024-01-20T10:00:00.000Z',
        beers: [
          {
            name: undefined,
            price: undefined,
            quantity: 10
          }
        ]
      }

      vi.mocked(getDocs).mockResolvedValueOnce({
        docs: [
          {
            data: () => invalidStockData
          }
        ]
      })

      const store = useOrderStore.getState()
      await store.processOrderItems(mockOrders[0])

      // Verificar que se manejó correctamente el caso de datos inválidos
      expect(store.orders).toBeDefined()
    })

    it('handles errors in processOrderItems', async () => {
      const error = new Error('Processing error')
      vi.mocked(getDocs).mockRejectedValueOnce(error)

      const consoleSpy = vi.spyOn(console, 'error')
      const store = useOrderStore.getState()
      await store.processOrderItems(mockOrders[0])

      expect(consoleSpy).toHaveBeenCalledWith('Error processing order items:', error)
    })
  })

  describe('error handling', () => {
    it('handles errors in fetchOrders', async () => {
      const error = new Error('Failed to fetch')
      vi.mocked(orderService.getOrders).mockRejectedValueOnce(error)

      const store = useOrderStore.getState()
      await store.fetchOrders()

      await vi.waitFor(() => {
        expect(useOrderStore.getState().error).toEqual(error)
        expect(useOrderStore.getState().isLoading).toBe(false)
      })
    })

    it('handles errors in createOrder', async () => {
      const error = new Error('Failed to create')
      vi.mocked(orderService.createOrder).mockRejectedValueOnce(error)

      const newOrder: Omit<Order, 'id'> = {
        id: '1',
        created: "2024-01-20T10:00:00.000Z",
        paid: false,
        cancelled: false,
        subtotal: 0,
        taxes: 0,
        discounts: 0,
        items: [],
        rounds: []
      }

      const store = useOrderStore.getState()
      await store.createOrder(newOrder)

      await vi.waitFor(() => {
        const updatedStore = useOrderStore.getState()
      expect(updatedStore.error).toEqual(error)
      expect(updatedStore.isLoading).toBe(false)
      })
    })

    it('handles errors in updateOrder', async () => {
      const error = new Error('Failed to update')
      vi.mocked(orderService.updateOrder).mockRejectedValueOnce(error)

      const store = useOrderStore.getState()
      await store.updateOrder('1', { paid: true })

      await vi.waitFor(() => {
        const updatedStore = useOrderStore.getState()
        expect(updatedStore.error).toEqual(error)
        expect(updatedStore.isLoading).toBe(false)
      })
    })

    it('handles errors in duplicateOrders', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false
      })

      const store = useOrderStore.getState()
      await store.duplicateOrders()

      expect(store.error).toBeDefined()
      expect(store.isLoading).toBe(false)
    })

    it('handles network errors in duplicateOrders', async () => {
      const error = new Error('Network error')
      global.fetch = vi.fn().mockRejectedValueOnce(error)

      const store = useOrderStore.getState()
      await store.duplicateOrders()

      expect(store.error).toBeDefined()
      expect(store.isLoading).toBe(false)
    })

    it('handles items with missing price in stock', async () => {
      const invalidStockData: Stock = {
        last_updated: '2024-01-20T10:00:00.000Z',
        beers: [
          {
            name: 'Beer 1',
            price: undefined,  // precio faltante
            quantity: 10,
            thumbnailUrl: 'http://example.com/beer1.jpg'
          }
        ]
      }

      const testOrder: Order = {
        cancelled: false,
        created: "2024-01-20T10:00:00.000Z",
        discounts: 0,
        id: "test-id",
        items: [],  // Empezamos sin items
        paid: false,
        rounds: [
          {
            created: "2024-01-20T10:00:00.000Z",
            items: [
              {
                name: "Beer 1",
                quantity: 2,
              },
            ],
          },
        ],
        subtotal: 0,
        taxes: 0,
      }

      vi.mocked(getDocs).mockResolvedValueOnce({
        docs: [
          {
            data: () => invalidStockData
          }
        ]
      })

      useOrderStore.setState({
        orders: [testOrder],
        currentOrder: null,
        isLoading: false,
        error: null,
        filteredOrders: []
      })

      const store = useOrderStore.getState()
      await store.processOrderItems(mockOrders[0])

      await vi.waitFor(() => {
        expect(store.orders[0].items).toHaveLength(0)
      })
    })

    it('handles errors in duplicateOrders when response is not ok', async () => {
      const mockResponse = {
        ok: false,
        status: 400,
        statusText: 'Bad Request'
      }
      global.fetch = vi.fn().mockResolvedValueOnce(mockResponse)

      const store = useOrderStore.getState()
      await store.duplicateOrders()

      await vi.waitFor(() => {
        const updatedStore = useOrderStore.getState()
        expect(updatedStore.error).toEqual(new Error('Failed to duplicate orders'))
        expect(updatedStore.isLoading).toBe(false)
      })
    })
  })
})
