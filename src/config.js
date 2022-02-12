import axios from "axios"

export const API_BASE_URL = 'http://localhost:1337/api'

export const axiosInstance = axios.create({ baseURL: API_BASE_URL })