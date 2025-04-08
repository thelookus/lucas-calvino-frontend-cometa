import { Status } from "./common"

export interface ApiResponse<T> {
    data?: T
    error?: string
    status: Status
}
