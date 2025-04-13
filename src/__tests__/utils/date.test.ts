import { describe, it, expect } from 'vitest'
import { formatDate } from '@/utils/date'
import { Timestamp } from 'firebase/firestore'

describe('date utils', () => {
  it('should format date correctly', () => {
    const date = Timestamp.fromMillis(1672531200000)
    const formattedDate = formatDate(date)
    console.log(formattedDate)
    expect(formattedDate).toBe('sáb 31, 21:00')
  })
})
