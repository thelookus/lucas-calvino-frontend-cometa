import { Beer } from "./beer"
import { Order } from "./order"
import { OrderStatus } from "./common"
import { Round } from "./order"

export interface BeerCardProps {
    beer: Beer
    onAddToOrder?: (beer: Beer) => void
}

export interface OrderCardProps {
    order: Order
    onStatusChange?: (orderId: string, status: OrderStatus) => void
}

export interface RoundListProps {
    rounds: Round[]
}