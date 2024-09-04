![Mercado Libre Experience](https://cdn.dribbble.com/users/438241/screenshots/5467268/media/6560a2708db433ad0e31898c0baf9c81.png)

# Prueba Práctica de Frontend para Mercado Libre

<div align="center">
  <a href="https://github.com/brunfernandez98/mercadolibre-frontend-test">
    <img src="https://img.shields.io/badge/React-18.3.2-61dafb?style=for-the-badge&logo=react&logoColor=61dafb&color=20232a">
    <img src="https://img.shields.io/badge/TypeScript-5.5.4-3178c6?style=for-the-badge&logo=typescript&logoColor=white">
    <img src="https://img.shields.io/badge/Express-4.19.2-000000?style=for-the-badge&logo=express&logoColor=white">
    <img src="https://img.shields.io/badge/Vite-5.4.1-646CFF?style=for-the-badge&logo=vite&logoColor=white">
    <img src="https://img.shields.io/badge/Jest-27.x-C21325?style=for-the-badge&logo=jest&logoColor=white">
    <img src="https://img.shields.io/badge/Sass-1.77.8-CC6699?style=for-the-badge&logo=sass&logoColor=white">
    <img src="https://img.shields.io/badge/Zustand-latest-FFDD57?style=for-the-badge&logo=zustand&logoColor=000000">
  </a>
</div>

## 🛠️ Acerca del Proyecto

Esta aplicación web para Mercado Libre permite ingresar un ID de producto y obtener la siguiente información:

- **Categorías del producto**.
- **Estado del producto** (disponible/no disponible).
- **Imagen del producto**.
- **Precio** del producto.
- **Descripción** detallada del producto.

La aplicación está diseñada para facilitar la búsqueda y consulta de información de productos de Mercado Libre utilizando su API pública.

---

### 🔧 Construido Con

Este proyecto está construido con las siguientes tecnologías:

- **[React.js](https://reactjs.org/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Express.js](https://expressjs.com/)**
- **[Webpack](https://webpack.js.org/)**
- **[Jest](https://jestjs.io/)**
- **[Vite](https://vitejs.dev/)**
- **[Sass](https://sass-lang.com)**

---

## 🚀 Primeros Pasos

### Requisitos

Asegúrate de tener Node.js >= 20 instalado. Luego, instala npm:

```sh
npm install npm@latest -g
```

Clona el repositorio:

```sh
https://github.com/brunfernandez98/mercadolibre-frontend-test
```

Navega a la carpeta del frontend:

```sh
cd frontend
```

Instala las dependencias:

```sh
npm install
```

Compilar el proyect frontend:

```sh
npm run build
```

## Configuración de Variables de Entorno

```env
VITE_BASE_URL=
VITE_API_KEY=
```

### `VITE_BASE_URL`

- **Descripción**: Esta variable define la URL base del servidor backend con la que el frontend interactúa. El servidor esta utilizando la versión `v1` de la API.
- **Uso**: Se utiliza en las solicitudes HTTP para construir la URL completa al interactuar con los endpoints de la API. En lugar de escribir la URL manualmente en cada petición, puedes usar esta variable de entorno para que el código sea más flexible y fácil de mantener.

### `VITE_API_KEY`
