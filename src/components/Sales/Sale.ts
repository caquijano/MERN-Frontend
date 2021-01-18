export interface Sale{
    _id?: string;
    invoice?: string;
    cliente?: string;
    date: string | Date;
    productId?: string;
    productName?: string;
    amount: number;
    priceBuy: number;
    priceSale: number;
    createAt?: string | Date;
    updateAt?: string | Date;
}