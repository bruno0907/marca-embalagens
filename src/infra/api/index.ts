import axios from "axios"

const baseURL = process.env.NEXT_PUBLIC_BASEURL

export const api = axios.create({ baseURL })  
