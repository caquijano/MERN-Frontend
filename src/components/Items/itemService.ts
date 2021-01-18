import axios from "axios";
import { Item } from "./Item";

const API = 'http://localhost:4000'

export const createItem = async (item:Item) => {

    return await axios.post(`${API}/items`, item)
}
export const getItems = async () => {
    return await axios.get(`${API}/items`)
}
export const getItem = async (id: string) => {
    return await axios.get<Item>(`${API}/items/${id}`)
}
export const updateItem = async (id: string, item:Item) => {
    return await axios.put(`${API}/items/${id}`, item)
}
export const deleteItem = async (id: string) => {
    return await axios.delete<Item>(`${API}/items/${id}`)
}