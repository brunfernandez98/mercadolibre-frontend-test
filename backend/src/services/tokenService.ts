import { MercadoLibre, context } from "@/config/config"

import axiosInstance from "@/core/axiosInstance"

export const refreshToken = async () => {
  try {
    const response = await axiosInstance.post(`${MercadoLibre.TOKEN}`, null, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      params: {
        grant_type: "refresh_token",
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        refresh_token: context.refresh_tokeen,
      },
    })

    context.token = response.data.access_token
    context.refresh_tokeen = response.data.refresh_token
  } catch (error) {
    console.error("Error al solicitar el nuevo token:", error)
  }
}
