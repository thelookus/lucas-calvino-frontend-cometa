import { render, screen, fireEvent } from '@testing-library/react'
import { OrderTabs } from '@/app/orders/components/OrderTabs'

describe('OrderTabs', () => {
  const mockOnTabChange = vi.fn()

  it('renders all tabs correctly', () => {
    render(<OrderTabs activeTab="in-progress" onTabChange={mockOnTabChange} />)

    expect(screen.getByText('In Progress')).toBeInTheDocument()
    expect(screen.getByText('Past Orders')).toBeInTheDocument()
  })

  it('shows active tab with correct styling', () => {
    render(<OrderTabs activeTab="in-progress" onTabChange={mockOnTabChange} />)

    const inProgressTab = screen.getByText('In Progress').closest('button')
    const pastOrdersTab = screen.getByText('Past Orders').closest('button')

    expect(inProgressTab).toHaveClass('text-[var(--foreground)]')
    expect(inProgressTab).toHaveClass('font-medium')
    expect(pastOrdersTab).toHaveClass('color-font-light')
    expect(pastOrdersTab).toHaveClass('font-normal')
  })

  it('calls onTabChange when clicking a tab', () => {
    render(<OrderTabs activeTab="in-progress" onTabChange={mockOnTabChange} />)

    fireEvent.click(screen.getByText('Past Orders'))
    expect(mockOnTabChange).toHaveBeenCalledWith('past')

    fireEvent.click(screen.getByText('In Progress'))
    expect(mockOnTabChange).toHaveBeenCalledWith('in-progress')
  })
})
