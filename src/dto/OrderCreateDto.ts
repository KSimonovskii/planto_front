export interface OrderItemDto {
    productId: string;
    quantity: number;
    price: number;
}

export interface OrderCreateDto {
    items: OrderItemDto[];
    deliveryAddress: string | null;
    deliveryMethod: 'pickup' | 'delivery';
    paymentMethod: string;
}