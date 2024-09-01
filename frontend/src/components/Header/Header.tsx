import { Link } from 'react-router-dom'
import './Header.scss'

const Header = () => {
  return (
    <header>
      <div className="container-header-logo">
        <Link to={'/'} className="header__logo-link">
          <img className="header__logo-image" alt="mercado-libre-logo" />
        </Link>
      </div>
      <div className="container-header-help">
        <span className="">Ayuda</span>
      </div>
    </header>
  )
}

export default Header
