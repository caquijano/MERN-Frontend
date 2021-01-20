export interface Deposit{
    _id?: string;
    depositNumber: string;
    kind: string;
    amount: number;
    date: string | Date;
    createAt?: string | Date;
    updateAt?: string | Date;
}