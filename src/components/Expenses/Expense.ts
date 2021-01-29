export interface Expense{
    _id?: string;
    concept: string;
    price: number;
    date: string | Date;
    createAt?: string | Date;
    updateAt?: string | Date;

}