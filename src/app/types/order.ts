export interface OrderItem {
    name: string
    price_per_unit: number
    total: number
}

export interface RoundItem {
    name: string
    quantity: number
}

export interface Round {
    created: string
    items: RoundItem[]
}

export interface Order {
    created: string
    paid: boolean
    subtotal: number
    taxes: number
    discounts: number
    items: OrderItem[]
    rounds: Round[]
}
