export interface Beer {
    name: string
    price: number
    quantity: number
    thumbnailUrl?: string
}

export interface Stock {
    last_updated: string
    beers: Beer[]
}
