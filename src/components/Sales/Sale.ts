export interface Sale{
    _id?: string;
    detailId?: string ;
    productId: string;
    amount: number;
    priceSale:number;
    createAt?: string | Date;
    updateAt?: string | Date;
}