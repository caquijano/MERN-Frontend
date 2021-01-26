export interface SaleDetail{
    _id?: string;
    invoice?: number;
    client: string;
    totalSale: number;
    date: string | Date;
    createAt?: string | Date;
    updateAt?: string | Date;
}