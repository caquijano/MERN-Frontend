export interface Item{
    _id?: string;
    name: string;
    description: string;
    kind: string;
    price: number;
    stock: number;
    createAt?: string | Date;
    updateAt?: string | Date;

}