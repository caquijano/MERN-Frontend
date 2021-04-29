export interface User{
    _id?: string;
    roles?: string[];
    email: string;
    password: string;
    repeatPassword: string;
    name: string;
    lastName: string;
    address: string;
    city: string;
    phone: string;
    photo?: string;
    createAt?: string | Date;
    updateAt?: string | Date;

}