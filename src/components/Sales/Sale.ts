export interface Sale{
    _id?: string;
    detailId?: string ;
    productId?: string;
    productName: string;
    amount: Number;
    priceBuy?:Number;
    priceSale:Number;
    utility?: number;
    createAt?: string | Date;
    updateAt?: string | Date;
}