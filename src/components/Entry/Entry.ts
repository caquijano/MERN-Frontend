export interface Entry{
    _id?: string;
    detailId?: number;
    productId?: string;
    productName?: string;
    amount: number;
    newPrice: number;
    createAt?: string | Date;
    updateAt?: string | Date;

}