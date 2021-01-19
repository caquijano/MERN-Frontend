import axios from "axios";
import { SaleDetail } from "./SaleDetail";

const API = 'http://localhost:4000'

export const createSaleDetail = async (saleDetail:SaleDetail) => {
    return await axios.post(`${API}/saleDetails`, saleDetail)
}
export const getSaleDetails = async () => {
    return await axios.get(`${API}/saleDetails`)
}
export const getSaleDetail = async (id: string) => {
    return await axios.get<SaleDetail>(`${API}/saleDetails/${id}`)
}
export const updateSaleDetail = async (id: string, saleDetail:SaleDetail) => {
    return await axios.put<SaleDetail>(`${API}/saleDetails`)
}
export const deleteSaleDetail = async (id: string) => {
    return await axios.delete<SaleDetail>(`${API}/saleDetails/${id}`)
}