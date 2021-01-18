export interface Entry{
    _id?: string;
    invoice: string;
    productId?: string;
    productName?: string;
    amount: number;
    date: string | Date;
    newPrice: number;
    createAt?: string | Date;
    updateAt?: string | Date;

}