import { Link } from "react-router-dom";
import meli_logo from "../../assets/meli_logo.png";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <Link className="header__logo-link" to="/">
          <img
            alt="mercado-libre-logo"
            className="header__logo-image"
            height={54}
            src={meli_logo}
            width={180}
          />
        </Link>
      </div>
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item">
            <Link
              className="header__nav-link"
              to="https://www.mercadolibre.com.uy/ayuda#nav-header"
            >
              Ayuda
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
