import { validateProductId } from "helpers/productCodes";
import { useForm } from "hooks/useForm";
import { useLoadingContext } from "hooks/useLoadingContext";

import { FaSearch, FaSpinner, FaTimes } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

import "./SearchContainer.scss";

interface SearchContainerProps {
  children?: React.ReactNode;
}

const SearchContainer: React.FC<SearchContainerProps> = ({ children }) => {
  const { formValues, setFieldValue } = useForm({
    id: "",
  });

  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFieldValue(id, value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formValues.id.trim() && validateProductId(formValues.id)) {
      navigate(`/products/${formValues.id}`);
    } else {
      alert("ID de producto inválido. Por favor ingrese un ID válido.");
    }
  };

  const { loading } = useLoadingContext();

  const handleReset = () => {
    setFieldValue("id", "");
    navigate(`/`);
  };

  return (
    <div className="container-wrapper">
      <div className="search-container">
        {location.pathname === "/" && <h1>Indica el id del producto</h1>}
        <form className="search-container__search-bar" onSubmit={handleSubmit}>
          <label
            className="search-container__search-bar__label-hidden"
            htmlFor="id"
          >
            Ingrese el ID del producto
          </label>
          <FaSearch className="search-container__search-bar__icon_search" />
          <FaTimes
            className="search-container__search-bar__icon_reset"
            onClick={handleReset}
          />
          <input
            className="search-container__search-bar__input"
            id="id"
            maxLength={80}
            placeholder="Busqueda por id..."
            type="text"
            value={formValues.id}
            onChange={handleChange}
          />
          <button
            className="search-container__search-bar__button"
            disabled={loading}
            type="submit"
          >
            {loading ? <FaSpinner className="spinner" /> : "Buscar"}
          </button>
        </form>
        <div className="search-container_product-container">{children}</div>
      </div>
    </div>
  );
};

export default SearchContainer;
