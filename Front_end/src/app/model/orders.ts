export class Orders {
    id?: string;
    orderNo: number;
    productId: string;
    quantity: number | null;
    salePrice: number | null;
    discount: number | null;
    totalAmount: number | null;
}
