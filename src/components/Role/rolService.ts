import axios from "axios";
import { Role } from "./Role";
import config from '../../config'

const API = config.API_HOST

export const getRole = async (id: string) => {
    return await axios.get<Role>(`${API}/roles/${id}`)
}
export const getRoles = async () => {
    return await axios.get(`${API}/roles/`)
}