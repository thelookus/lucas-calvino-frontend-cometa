import { render, screen, fireEvent } from '@testing-library/react'
import { Header } from '@/components/Header'
import { vi } from 'vitest'

describe('Header', () => {
  it('renders title correctly', () => {
    render(<Header title="Test Title" />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('renders subtitle when provided', () => {
    render(<Header title="Test Title" subtitle="Test Subtitle" />)
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument()
  })

  it('does not render back button by default', () => {
    render(<Header title="Test Title" />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('renders back button when showBackButton is true', () => {
    render(<Header title="Test Title" showBackButton />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('calls onBackClick when back button is clicked', () => {
    const mockOnBackClick = vi.fn()
    render(<Header title="Test Title" showBackButton onBackClick={mockOnBackClick} />)

    fireEvent.click(screen.getByRole('button'))
    expect(mockOnBackClick).toHaveBeenCalled()
  })

  it('renders action elements when provided', () => {
    const TestAction = () => <button>Action Button</button>
    render(<Header title="Test Title" actions={<TestAction />} />)
    expect(screen.getByText('Action Button')).toBeInTheDocument()
  })
})
