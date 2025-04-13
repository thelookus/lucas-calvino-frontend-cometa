import { vi } from 'vitest'
import { collection, addDoc, getDocs, updateDoc, doc, CollectionReference, DocumentReference, QuerySnapshot } from 'firebase/firestore'
import { orderService } from '@/services/orderService'
import { Order, Stock } from '@/types'
import { waitFor } from '@testing-library/react'

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  addDoc: vi.fn(),
  getDocs: vi.fn(),
  updateDoc: vi.fn(),
  getFirestore: vi.fn(),
  doc: vi.fn()
}))

const mockOrder: Omit<Order, 'id'> = {
  created: new Date().toISOString(),
  paid: false,
  subtotal: 0,
  taxes: 0,
  discounts: 0,
  items: [],
  rounds: []
}

const mockOrderWithId: Order = {
  id: 'test-id',
  ...mockOrder
}

describe('orderService', () => {
  beforeEach(() => {
      vi.clearAllMocks()
  })

  describe('createOrder', () => {
      it('should create order successfully', async () => {
          const mockDocRef = { id: 'test-id' }

          vi.mocked(collection).mockReturnValueOnce(('mock-collection' as unknown) as CollectionReference<Stock>)
          vi.mocked(addDoc).mockResolvedValueOnce((mockDocRef as unknown) as DocumentReference<Stock>)

          const result = await orderService.createOrder(mockOrder)

          expect(result).toBe('test-id')
          expect(collection).toHaveBeenCalledTimes(1)
          expect(addDoc).toHaveBeenCalledTimes(1)
      })

      it('should handle errors when creating order', async () => {
          const error = new Error('Failed to create')

          vi.mocked(collection).mockReturnValueOnce(('mock-collection' as unknown) as CollectionReference<Stock>)
          vi.mocked(addDoc).mockRejectedValueOnce(error)

          await expect(orderService.createOrder(mockOrder)).rejects.toThrow('Error creating order')
      })
  })

  describe('getOrders', () => {
      it('should fetch orders successfully', async () => {
          const mockQuerySnapshot = {
              empty: false,
              docs: [
                  {
                      id: 'test-id',
                      data: () => mockOrder
                  }
              ]
          } as unknown as QuerySnapshot<Stock>

          vi.mocked(collection).mockReturnValueOnce(('mock-collection' as unknown) as CollectionReference<Stock>)
          vi.mocked(getDocs).mockResolvedValueOnce(mockQuerySnapshot)

          const result = await orderService.getOrders()

          expect(result).toEqual([mockOrderWithId])
          expect(collection).toHaveBeenCalledTimes(1)
          expect(getDocs).toHaveBeenCalledTimes(1)
      })

      it('should create default order when collection is empty', async () => {
          const mockEmptySnapshot = {
              empty: true,
              docs: []
          } as unknown as QuerySnapshot<Stock>

          const mockNewQuerySnapshot = {
              empty: false,
              docs: [
                  {
                      id: 'test-id',
                      data: () => mockOrder
                  }
              ]
          } as unknown as QuerySnapshot<Stock>

          vi.mocked(collection).mockReturnValue(('mock-collection' as unknown) as CollectionReference<Stock>)
          vi.mocked(getDocs)
              .mockResolvedValueOnce(mockEmptySnapshot)
              .mockResolvedValueOnce(mockNewQuerySnapshot)
          vi.mocked(addDoc).mockResolvedValueOnce(({ id: 'test-id' } as unknown) as DocumentReference<Stock>)

          const result = await orderService.getOrders()

          waitFor(() => {
              expect(result).toEqual([mockOrderWithId])
              expect(collection).toHaveBeenCalledTimes(2)
              expect(getDocs).toHaveBeenCalledTimes(2)
              expect(addDoc).toHaveBeenCalledTimes(1)
          })
      })

      it('should handle errors when fetching orders', async () => {
          const error = new Error('Failed to fetch')

          vi.mocked(collection).mockReturnValueOnce(('mock-collection' as unknown) as CollectionReference<Stock>)
          vi.mocked(getDocs).mockRejectedValueOnce(error)

          await expect(orderService.getOrders()).rejects.toThrow('Error fetching orders')
      })
  })

  describe('updateOrder', () => {
      it('should update order successfully', async () => {
          vi.mocked(doc).mockReturnValueOnce(('mock-collection' as unknown) as DocumentReference<Stock>)
          vi.mocked(updateDoc).mockResolvedValueOnce(undefined)

          await orderService.updateOrder('test-id', { paid: true })

          expect(doc).toHaveBeenCalledTimes(1)
          expect(updateDoc).toHaveBeenCalledTimes(1)
      })

      it('should handle errors when updating order', async () => {
          const error = new Error('Failed to update')

          vi.mocked(doc).mockReturnValueOnce(('mock-collection' as unknown) as DocumentReference<Stock>)
          vi.mocked(updateDoc).mockRejectedValueOnce(error)

          await expect(orderService.updateOrder('test-id', { paid: true }))
              .rejects.toThrow('Error updating order')
      })
  })
})
