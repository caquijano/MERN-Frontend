import axios from "axios";
import { Entry } from "./Entry";

const API = 'http://localhost:4000'

export const createEntry = async (entry:Entry) => {
    return await axios.post(`${API}/entries`, entry)
}
export const getEntries = async () => {
    return await axios.get(`${API}/entries`)
}
export const getEntry = async (id: string) => {
    return await axios.get<Entry>(`${API}/entries/${id}`)
}
export const updateEntry = async (id: string, entry:Entry) => {
    return await axios.put<Entry>(`${API}/entries`)
}
export const deleteEntry = async (id: string) => {
    return await axios.delete<Entry>(`${API}/entries/${id}`)
}