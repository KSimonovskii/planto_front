
export type OrderStatus = "NEW" | "PROCESSING" | "COMPLETED" | "CANCELLED";


export class OrderItemDto {
    productId!: string;
    name!: string;
    quantity!: number;
    priceUnit!: BigNumber;
}

export class OrderCreateDto {
    userId!: string;
    items!: OrderItemDto[];
    address!: string;
}


export class OrderUpdateDto {
    items!: OrderItemDto[];
}

export class OrderResponseDto {
    id!: string;
    userId!: string;
    items!: OrderItemDto[];
    status!: OrderStatus;
    createdAt!: string;
}

export class SortingDto {
    page: number = 0;
    size: number = 10;
    sortBy?: string;
    direction?: "asc" | "desc";
    criteria?: Record<string, any>;
}
