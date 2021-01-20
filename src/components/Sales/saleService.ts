import axios from "axios";
import { Sale } from "./Sale";

const API = 'http://localhost:4000'

export const createSale = async (sale:Sale[]) => {
    return await axios.post(`${API}/sales`, sale)
}
export const getSales = async () => {
    return await axios.get(`${API}/sales`)
}
export const getSale = async (id: string) => {
    return await axios.get<Sale>(`${API}/sales/${id}`)
}
export const updateSale = async (id: string, sale:Sale) => {
    return await axios.put<Sale>(`${API}/sales`)
}
export const deleteSale = async (id: string) => {
    return await axios.delete<Sale>(`${API}/sales/${id}`)
}