export interface OrderItem {
    name: string
    price_per_unit: number
    quantity: number
    total: number
    thumbnailUrl?: string
}

export interface RoundItem {
    name: string
    quantity?: number
    price?: number
}

export interface Round {
    created: string
    items: RoundItem[]
}

export interface Order {
    id: string
    created: string
    paid: boolean
    subtotal: number
    taxes: number
    discounts: number
    items: OrderItem[]
    rounds: Round[]
    cancelled?: boolean
}
