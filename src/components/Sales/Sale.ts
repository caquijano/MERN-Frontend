export interface Sale{
    _id?: string;
    detailId?: number ;
    productId: string;
    productName?: string;
    amount: number;
    priceSale:number;
    priceBuy?: number;
    utility?:number;
    createAt?: string | Date;
    updateAt?: string | Date;
}