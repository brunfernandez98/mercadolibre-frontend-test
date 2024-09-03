import meli_logo from '../assets/meli_logo.png'

import Helmet from 'react-helmet'

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Mercado Libre Test Frontend - Buscando tu producto ideal</title>

        <meta
          content="Compra en Mercado Libre y disfruta de tu Buscador. Encuentra las mejores marcas y productos a precios inigualables."
          name="description"
        />
        <meta
          content="Ofertas y Envíos Gratis - Mercado Libre"
          property="og:title"
        />
        <meta content={meli_logo} property="og:image" />
        <meta
          content="Descubre increíbles ofertas en Mercado Libre. Compra hoy y recibe tus productos"
          property="og:description"
        />
      </Helmet>
    </>
  )
}

export default Home
