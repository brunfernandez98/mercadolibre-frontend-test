import { Link } from 'react-router-dom'
import meli_logo from '../../assets/meli_logo.png'
import './Header.scss'

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo-link">
          <img
            src={meli_logo}
            width={180}
            height={54}
            className="header__logo-image"
            alt="mercado-libre-logo"
          />
        </Link>
      </div>
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item">
            <Link
              to="https://www.mercadolibre.com.uy/ayuda#nav-header"
              className="header__nav-link"
            >
              Ayuda
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
