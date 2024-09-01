import Header from '../components/Header/Header'
import meli_logo from '../assets/meli_logo.png'

import Helmet from 'react-helmet'
import SearchContainer from '../components/Container/SearchContainer'

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Mercado Libre Test Frontend - Buscando tu producto ideal</title>

        <meta
          name="description"
          content="Compra en Mercado Libre y disfruta de tu Buscador. Encuentra las mejores marcas y productos a precios inigualables."
        />
        <meta
          property="og:title"
          content="Ofertas y Envíos Gratis - Mercado Libre"
        />
        <meta property="og:image" content={meli_logo} />
        <meta
          property="og:description"
          content="Descubre increíbles ofertas en Mercado Libre. Compra hoy y recibe tus productos"
        />
      </Helmet>
      <Header />
      <SearchContainer />
    </>
  )
}

export default Home
