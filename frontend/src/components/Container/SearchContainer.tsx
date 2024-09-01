import { FaSearch, FaTimes } from 'react-icons/fa'
import './SearchContainer.scss'

const SearchContainer = () => {
  return (
    <div className="container-wrapper">
      <div className="search-container">
        <div className="search-container__search-bar">
          <FaSearch className="search-container__search-bar__icon_search" />
          <FaTimes className="search-container__search-bar__icon_reset" />
          <input
            type="text"
            placeholder="Busqueda..."
            className="search-container__search-bar__input"
          />

          <button className="search-container__search-bar__button">
            Buscar
          </button>
        </div>
      </div>
    </div>
  )
}

export default SearchContainer
