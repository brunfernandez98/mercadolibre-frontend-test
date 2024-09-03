import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'

import { lazy } from 'react'
import NotFound from './pages/NotFound'

const HomePage = lazy(() => import('./pages/Home'))
const ProductPage = lazy(() => import('./pages/Product'))

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />} path="/">
          <Route index element={<HomePage />} />
          <Route element={<ProductPage />} path="products/:id" />
        </Route>
        <Route element={<NotFound />} path="*" />
      </Routes>
    </Router>
  )
}

export default App
