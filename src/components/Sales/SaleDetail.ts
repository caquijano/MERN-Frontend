export interface SaleDetail{
    _id?: string;
    invoice?: number;
    client: string;
    date: string | Date;
    createAt?: string | Date;
    updateAt?: string | Date;
}