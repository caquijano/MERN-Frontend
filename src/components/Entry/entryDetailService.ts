import axios from "axios";
import { EntryDetail } from "./EntryDetail";

const API = 'http://localhost:4000'

export const createEntryDetail = async (entryDetail:EntryDetail) => {
    return await axios.post(`${API}/entryDetails`, entryDetail)
}
export const getEntryDetails = async () => {
    return await axios.get(`${API}/entryDetails`)
}
export const getEntryDetail = async (detailId: string) => {
    return await axios.get<EntryDetail>(`${API}/entryDetails/${detailId}`)
}
export const updateEntryDetail = async (id: string, entryDetail:EntryDetail) => {
    return await axios.put<EntryDetail>(`${API}/entryDetails`)
}
export const deleteEntryDetail = async (id: string) => {
    return await axios.delete<EntryDetail>(`${API}/entryDetails/${id}`)
}