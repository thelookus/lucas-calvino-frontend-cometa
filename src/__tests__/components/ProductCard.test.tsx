import { render, screen, fireEvent } from '@testing-library/react'
import { ProductCard } from '@/components/ProductCard'
import { vi } from 'vitest'

// Mock next/image
vi.mock('next/image', () => ({
  default: ({ src, alt, onError }: { src: string; alt: string; onError: () => void }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={onError}
      data-testid="product-image"
    />
  )
}))

describe('ProductCard', () => {
  const defaultProps = {
    name: 'Test Product',
    total: 1000,
    quantity: 2,
    thumbnailUrl: 'https://example.com/image.jpg',
    index: 0,
    created: 'mar 12, 12:05',
  }

  it('renders product information correctly', () => {
    render(<ProductCard {...defaultProps} />)

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('2 items')).toBeInTheDocument()
    expect(screen.getByText('$ 1,000')).toBeInTheDocument()
    expect(screen.getByText('mar 12, 12:05')).toBeInTheDocument()
  })

  it('shows singular item text when quantity is 1', () => {
    render(<ProductCard {...defaultProps} quantity={1} />)
    expect(screen.getByText('1 item')).toBeInTheDocument()
  })

  it('shows cancelled status when cancelled prop is true', () => {
    render(<ProductCard {...defaultProps} cancelled={true} />)
    expect(screen.getByText('Cancelled')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const mockOnClick = vi.fn()
    render(<ProductCard {...defaultProps} onClick={mockOnClick} />)

    fireEvent.click(screen.getByRole('button'))
    expect(mockOnClick).toHaveBeenCalled()
  })

  it('uses placeholder image when thumbnailUrl is not provided', () => {
    render(<ProductCard {...defaultProps} thumbnailUrl={undefined} />)
    const image = screen.getByTestId('product-image')
    expect(image).toHaveAttribute('src', '/images/placeholder.png')
  })

  it('handles image error by showing placeholder', () => {
    render(<ProductCard {...defaultProps} />)
    const image = screen.getByTestId('product-image')

    fireEvent.error(image)

    expect(image).toHaveAttribute('src', '/images/placeholder.png')
  })

  describe('getValidImageUrl function', () => {
    it('handles full URLs correctly', () => {
      render(<ProductCard {...defaultProps} thumbnailUrl="https://example.com/image.jpg" />)
      expect(screen.getByTestId('product-image')).toHaveAttribute('src', 'https://example.com/image.jpg')
    })

    it('handles relative paths correctly', () => {
      render(<ProductCard {...defaultProps} thumbnailUrl="/images/test.jpg" />)
      expect(screen.getByTestId('product-image')).toHaveAttribute('src', '/images/test.jpg')
    })

    it('adds leading slash to paths without one', () => {
      render(<ProductCard {...defaultProps} thumbnailUrl="images/test.jpg" />)
      expect(screen.getByTestId('product-image')).toHaveAttribute('src', '/images/test.jpg')
    })
  })
})
