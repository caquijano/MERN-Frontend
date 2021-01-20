import axios from "axios";
import {Deposit} from "./Deposit";

const API = 'http://localhost:4000'

export const createDeposit = async (deposit:Deposit) => {

    return await axios.post(`${API}/deposits`, deposit)
}
export const getDeposits = async () => {
    return await axios.get(`${API}/deposits`)
}
export const getDeposit = async (id: string) => {
    return await axios.get<Deposit>(`${API}/deposits/${id}`)
}
export const updateDeposit = async (id: string, deposit:Deposit) => {
    return await axios.put(`${API}/deposits/${id}`, deposit)
}
export const deleteDeposit = async (id: string) => {
    return await axios.delete<Deposit>(`${API}/deposits/${id}`)
}