import { collection, getDocs, CollectionReference, QuerySnapshot } from 'firebase/firestore'
import { beerService } from '@/services/beerService'
import { vi } from 'vitest'
import { Stock } from '@/types/beer'

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  getDocs: vi.fn(),
  getFirestore: vi.fn()
}))

const mockStock = {
  total: 100,
  beers: [
    { name: 'Beer 1', price: 10, quantity: 50 }
  ],
  last_updated: new Date().toISOString()
}

describe('beerService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch stock successfully', async () => {
    const mockQuerySnapshot = {
      docs: [
        {
          data: () => mockStock
        }
      ]
    } as unknown as QuerySnapshot<Stock>

    vi.mocked(collection).mockReturnValueOnce(('mock-collection' as unknown) as CollectionReference<Stock>)
    vi.mocked(getDocs).mockResolvedValueOnce(mockQuerySnapshot)

    const result = await beerService.getStock()

    expect(result).toEqual(mockStock)
    expect(collection).toHaveBeenCalledTimes(1)
    expect(getDocs).toHaveBeenCalledTimes(1)
  })

  it('should handle errors when fetching stock', async () => {
    const error = new Error('Failed to fetch')

    vi.mocked(collection).mockReturnValueOnce(('mock-collection' as unknown) as CollectionReference<Stock>)
    vi.mocked(getDocs).mockRejectedValueOnce(error)

    await expect(beerService.getStock()).rejects.toThrow('Failed to fetch')
    expect(collection).toHaveBeenCalledTimes(1)
    expect(getDocs).toHaveBeenCalledTimes(1)
  })
})
