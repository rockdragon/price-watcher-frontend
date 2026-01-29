export type Product = {
    id: number
    asin: string
    name: string
    outOfStock: boolean
    monitored: boolean
    pageUrl: string
    photoUrl: string
}

export type PageResponse<T> = {
    content: T[]
    totalElements: number
    totalPages: number
    number: number
    size: number
    first: boolean
    last: boolean
}

export type PriceTrend = {
    id: number
    productId: number
    price: number
    priceDate: number
}

