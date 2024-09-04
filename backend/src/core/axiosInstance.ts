import axios from "axios"

import { config as configToken, context } from "@/config/config"

import { refreshToken } from "@/services/tokenService"

const axiosInstance = axios.create({
  baseURL: configToken.baseUrl,
})

axiosInstance.interceptors.request.use(
  config => {
    const token = context.token

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

let lastTokenRefresh: number | null = null
const ONE_MINUTE_IN_MS = 60 * 1000

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    if (error.response && error.response.status === 401) {
      const currentTime = Date.now()

      if (
        !lastTokenRefresh ||
        currentTime - lastTokenRefresh > ONE_MINUTE_IN_MS
      ) {
        try {
          const newToken = await refreshToken()
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`
          lastTokenRefresh = currentTime

          return axiosInstance(originalRequest)
        } catch (refreshError) {
          console.error("No se pudo renovar el token:", refreshError)
          return Promise.reject(refreshError)
        }
      }
    } else {
      console.log(
        "Se intentó renovar el token recientemente. Esperando antes de intentar nuevamente."
      )
      return Promise.reject(error)
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
