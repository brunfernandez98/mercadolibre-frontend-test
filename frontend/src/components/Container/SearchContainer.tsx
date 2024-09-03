import React from 'react'
import { FaSearch, FaSpinner, FaTimes } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import './SearchContainer.scss'
import { useForm } from '../../hooks/useForm'
import { useLoadingContext } from '../../hooks/useSearchContext'

interface SearchContainerProps {
  children?: React.ReactNode
}

const SearchContainer: React.FC<SearchContainerProps> = ({ children }) => {
  const { formValues, setFieldValue, resetForm } = useForm({
    id: ''
  })
  const navigate = useNavigate()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target
    setFieldValue(id, value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (formValues.id.trim()) {
      navigate(`/products/${formValues.id}`)
    }
  }

  const { loading } = useLoadingContext()

  const handleReset = () => {
    resetForm()
    navigate(`/`)
  }

  return (
    <div className="container-wrapper">
      <div className="search-container">
        <form className="search-container__search-bar" onSubmit={handleSubmit}>
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
            {loading ? (
              <>
                <FaSpinner className="spinner" />
              </>
            ) : (
              'Buscar'
            )}
          </button>
        </form>
        <div className="search-container_product-container">{children}</div>
      </div>
    </div>
  )
}

export default SearchContainer
