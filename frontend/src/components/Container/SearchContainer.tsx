import { FaSearch, FaTimes } from 'react-icons/fa'
import './SearchContainer.scss'
import ProductCard from '../Card/ProductCard'
import { formatCategories } from '../../helpers/formatters'
import BreadCrumb from '../BreadCrumb/BreadCrumb'

const description =
  '"Bienvendos a UNNA"\n\n-------------------------------------------------------------------------------------------------------------------\nEl lugar donde la creatividad y el arte se fusionan con la magia del café!\nAdemás, nos enorgullecemos de utilizar materiales de la más alta calidad para garantizar que cada taza sea resistente y duradera. La impresión de alta definición y los colores vibrantes aseguran que los diseños se mantengan impecables incluso después de muchos lavados.\n\nPorque elegirnos?\n-Diseños Únicos\n-Calidad Premium\n-Impresión de Alta Definición\n-Resistentes al lavado manteniendo colores vibrantes!\n\n\n::::::::::::: UBICACIÓN :::::::::::::\n\nNos encontramos en Recoleta a pocas cuadras del alto palermo\n\nEnvíos por MERCADOENVÍOS \n\n::::::::::::: HORARIOS DE ATENCION ONLINE:::::::::::::\n\n\nCualquier horario de contacto!'

const SearchContainer = () => {
  const pictures: { id: string; url: string }[] = [
    {
      id: '1',
      url: 'https://http2.mlstatic.com/D_NQ_NP_2X_959852-MLU74856671343_032024-F.webp'
    },
    {
      id: '2',
      url: 'https://http2.mlstatic.com/D_NQ_NP_2X_792146-MLU73932024947_012024-F.webp'
    }
  ]
  const categories = 'PLAY5#VIDEOGAME#SONY'
  const formattedCategories = formatCategories(categories)

  return (
    <div className="container-wrapper">
      <div className="search-container">
        <div className="search-container__search-bar">
          <FaSearch className="search-container__search-bar__icon_search" />
          <FaTimes className="search-container__search-bar__icon_reset" />
          <input
            className="search-container__search-bar__input"
            maxLength={80}
            placeholder="Busqueda por id..."
            type="text"
          />
          <button className="search-container__search-bar__button">
            Buscar
          </button>
        </div>
        <BreadCrumb paths={formattedCategories} />
        <div className="search-container_product-container">
          <ProductCard
            currency="USD"
            description={description}
            id="1"
            name="Play5"
            pictures={pictures}
            price={500}
          />
        </div>
      </div>
    </div>
  )
}

export default SearchContainer
