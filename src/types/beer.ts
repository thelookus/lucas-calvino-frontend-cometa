export interface Beer {
    name: string
    price: number
    quantity: number
}

export interface Stock {
    last_updated: string
    beers: Beer[]
}
