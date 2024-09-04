import axios from "axios"

import { config } from "@/config/config"

const axiosInstance = axios.create({
  baseURL: config.baseUrl,
})

axiosInstance.interceptors.request.use(
  config => {
    const token = process.env.ACCESS_TOKEN

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default axiosInstance
