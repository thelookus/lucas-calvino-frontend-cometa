import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BottomNav } from '@/components/BottomNav'
import { useOrderStore } from '@/store'

// Mock next/link
vi.mock('next/link', () => {
  return {
    default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) =>
      React.createElement('a', { href, ...props }, children),
  }
})

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/'
}))

// Mock store
vi.mock('@/store', () => ({
  useOrderStore: vi.fn(() => ({
    getActiveOrders: vi.fn(() => [])
  }))
}))

describe('BottomNav', () => {
  it('renders navigation links correctly', () => {
    render(<BottomNav />)

    expect(screen.getByRole('link', { name: 'home' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'orders' })).toHaveAttribute('href', '/orders')
    expect(screen.getByRole('link', { name: 'profile' })).toHaveAttribute('href', '/profile')
  })

  it('shows notification dot when there are active orders', () => {
    const getActiveOrders = vi.fn(() => [{ id: '1' }])
    vi.mocked(useOrderStore).mockReturnValue({
      getActiveOrders
    })

    render(<BottomNav />)

    expect(screen.getByTestId('notification-dot')).toBeInTheDocument()
  })
})
