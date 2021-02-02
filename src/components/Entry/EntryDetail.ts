export interface EntryDetail{
    _id?: string;
    detailId: number;
    invoice?: string;
    provider: string;
    totalEntry: number;
    date: string | Date;
    createAt?: string | Date;
    updateAt?: string | Date;
}