import { renderHook, waitFor } from '@testing-library/react'
import { useBeers } from '@/hooks/useBeers'
import { beerService } from '@/services/beerService'
import { vi } from 'vitest'

vi.mock('@/services/beerService', () => ({
  beerService: {
    getStock: vi.fn()
  }
}))

const mockStock = {
  total: 100,
  beers: [
    { name: 'Beer 1', price: 10, quantity: 50 }
  ],
  last_updated: new Date().toISOString()
}

describe('useBeers', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch stock on mount', async () => {
    vi.mocked(beerService.getStock).mockResolvedValueOnce(mockStock)

    const { result } = renderHook(() => useBeers())

    expect(result.current.isLoading).toBe(true)
    expect(result.current.stock).toBeNull()

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.stock).toEqual(mockStock)
    expect(result.current.error).toBeNull()
  })

  it('should handle errors', async () => {
    const error = new Error('Failed to fetch')
    vi.mocked(beerService.getStock).mockRejectedValueOnce(error)

    const { result } = renderHook(() => useBeers())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    expect(result.current.error).toEqual(error)
    expect(result.current.stock).toBeNull()
  })

  it('should refresh stock when refreshStock is called', async () => {
    const updatedStock = {
      total: 100,
      beers: [
        { name: 'Beer 2', price: 15, quantity: 10 }
      ],
      last_updated: new Date().toISOString()
    }

    vi.mocked(beerService.getStock).mockResolvedValueOnce(mockStock)

    const { result } = renderHook(() => useBeers())

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })

    vi.mocked(beerService.getStock).mockResolvedValueOnce(updatedStock)

    await result.current.refreshStock()

    await waitFor(() => {
      expect(result.current.stock).toEqual(updatedStock)
    })
  })
})
