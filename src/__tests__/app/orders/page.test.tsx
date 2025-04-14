import { render, screen, act } from '@testing-library/react'
import OrdersPage from '@/app/orders/page'
import { useBeerStore, useOrderStore } from '@/store'
import { vi } from 'vitest'

// Mock the LoadingScreen component
vi.mock('@/components/LoadingScreen', () => ({
  LoadingScreen: () => <div data-testid="loading-screen">Loading...</div>
}))

vi.mock('@/store', () => ({
  useBeerStore: vi.fn(),
  useOrderStore: vi.fn()
}))

describe('OrdersPage', () => {
  const mockFetchStock = vi.fn().mockResolvedValue(undefined)
  const mockFetchOrders = vi.fn().mockResolvedValue(undefined)
  const mockUpdateFilteredOrders = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    vi.mocked(useBeerStore).mockReturnValue({
      isLoading: false,
      fetchStock: mockFetchStock
    })

    vi.mocked(useOrderStore).mockReturnValue({
      isLoading: false,
      fetchOrders: mockFetchOrders,
      filteredOrders: [],
      updateFilteredOrders: mockUpdateFilteredOrders
    })

    vi.mocked(useBeerStore).getState = vi.fn().mockReturnValue({
      fetchStock: mockFetchStock,
      isLoading: false
    })
    vi.mocked(useOrderStore).getState = vi.fn().mockReturnValue({
      fetchOrders: mockFetchOrders,
      isLoading: false,
      filteredOrders: [],
      updateFilteredOrders: mockUpdateFilteredOrders
    })
  })

  it('renders loading state when stores are loading', () => {
    vi.mocked(useBeerStore).mockReturnValue({
      isLoading: true,
      fetchStock: mockFetchStock
    })

    render(<OrdersPage />)
    expect(screen.getByTestId('loading-screen')).toBeInTheDocument()
  })

  it('renders main content when data is loaded', () => {
    render(<OrdersPage />)

    expect(screen.getByText('Your Orders')).toBeInTheDocument()
    expect(screen.getByText('Wait for the best beer')).toBeInTheDocument()
    expect(screen.getByText('In Progress')).toBeInTheDocument()
    expect(screen.getByText('Past Orders')).toBeInTheDocument()
  })

  it('fetches initial data on mount', async () => {
    await act(async () => {
      render(<OrdersPage />)
    })

    expect(mockFetchStock).toHaveBeenCalled()
    expect(mockFetchOrders).toHaveBeenCalled()
  })

  it('switches between in-progress and past orders', async () => {
    render(<OrdersPage />)

    const pastOrdersTab = screen.getByText('Past Orders')
    await act(async () => {
      pastOrdersTab.click()
    })

    const orderListElement = screen.getByRole('main')
    expect(orderListElement).toBeInTheDocument()
  })
})
