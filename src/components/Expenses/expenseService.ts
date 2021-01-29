import axios from "axios";
import { Expense } from "./Expense";

const API = 'http://localhost:4000'

export const createExpense = async (expense:Expense) => {

    return await axios.post(`${API}/expenses`, expense)
}
export const getExpenses = async () => {
    return await axios.get(`${API}/expenses`)
}
export const getExpense = async (id: string) => {
    return await axios.get<Expense>(`${API}/expenses/${id}`)
}
export const updateExpense = async (id: string, expense:Expense) => {
    return await axios.put(`${API}/expenses/${id}`, expense)
}
export const deleteExpense= async (id: string) => {
    return await axios.delete<Expense>(`${API}/expenses/${id}`)
}