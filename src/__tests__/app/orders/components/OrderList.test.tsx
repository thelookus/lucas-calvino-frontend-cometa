import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { OrderList } from '@/app/orders/components/OrderList'
import { useOrderStore } from '@/store'
import { Order } from '@/types'
import { vi } from 'vitest'

vi.mock('@/store', () => ({
  useOrderStore: vi.fn()
}))

vi.mock('@/utils/date', () => ({
  formatDate: vi.fn(() => 'lun 20, 10:00')
}))

const mockOrders: Order[] = [
  {
    id: '1',
    created: '2024-01-20T10:00:00Z',
    paid: false,
    subtotal: 350,
    taxes: 0,
    discounts: 0,
    items: [
      {
        name: 'Beer 1',
        quantity: 2,
        price_per_unit: 100,
        total: 200,
        thumbnailUrl: 'http://example.com/beer1.jpg'
      },
      {
        name: 'Beer 2',
        quantity: 1,
        price_per_unit: 150,
        total: 150,
        thumbnailUrl: 'http://example.com/beer2.jpg'
      }
    ],
    rounds: [],
    cancelled: false
  }
]

describe('OrderList', () => {
  const mockUpdateFilteredOrders = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useOrderStore).mockReturnValue({
      filteredOrders: mockOrders,
      updateFilteredOrders: mockUpdateFilteredOrders
    })
  })

  it('renders orders correctly', () => {
    render(<OrderList />)

    // Verifica el nombre concatenado de los productos
    expect(screen.getByText('Beer 1, Beer 2')).toBeInTheDocument()

    // Verifica la cantidad total de items
    expect(screen.getByText('3 items')).toBeInTheDocument()

    // Verifica el subtotal
    expect(screen.getByText('$ 350')).toBeInTheDocument()

    // Verifica la fecha formateada
    expect(screen.getByText('lun 20, 10:00')).toBeInTheDocument()
  })

  it('calls updateFilteredOrders with correct parameter on mount', () => {
    render(<OrderList past={false} />)
    expect(mockUpdateFilteredOrders).toHaveBeenCalledWith(false)

    render(<OrderList past={true} />)
    expect(mockUpdateFilteredOrders).toHaveBeenCalledWith(true)
  })

  it('displays cancelled status for cancelled orders', () => {
    const cancelledOrders = [{
      ...mockOrders[0],
      cancelled: true
    }]

    vi.mocked(useOrderStore).mockReturnValue({
      filteredOrders: cancelledOrders,
      updateFilteredOrders: mockUpdateFilteredOrders
    })

    render(<OrderList />)
    expect(screen.getByText('Cancelled')).toBeInTheDocument()
  })

  it('handles orders with missing thumbnails', () => {
    const ordersWithoutThumbnail = [{
      ...mockOrders[0],
      items: [{
        ...mockOrders[0].items[0],
        thumbnailUrl: undefined
      }]
    }]

    vi.mocked(useOrderStore).mockReturnValue({
      filteredOrders: ordersWithoutThumbnail,
      updateFilteredOrders: mockUpdateFilteredOrders
    })

    render(<OrderList />)
    waitFor(() => {
      const image = screen.getByAltText('Product image')
      expect(image).toHaveAttribute('src', expect.stringContaining('placeholder.png'))
    })
  })

  it('handles empty orders list', () => {
    vi.mocked(useOrderStore).mockReturnValue({
      filteredOrders: [],
      updateFilteredOrders: mockUpdateFilteredOrders
    })

    const { container } = render(<OrderList />)
    expect(container.firstChild?.hasChildNodes()).toBeFalsy()
  })

  it('handles click on order', () => {
    const consoleSpy = vi.spyOn(console, 'log')
    render(<OrderList />)

    const orderElement = screen.getByRole('button', { name: /view details for beer 1, beer 2/i })
    fireEvent.click(orderElement)

    expect(consoleSpy).toHaveBeenCalledWith('Clicked on order')
  })
})
