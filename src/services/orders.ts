export const duplicateOrders = async () => {
  const response = await fetch('/api/orders/actions/duplicate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to duplicate orders')
  }

  return response.json()
}