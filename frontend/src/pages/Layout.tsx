import { Outlet } from 'react-router-dom'
import SearchContainer from '../components/Container/SearchContainer'
import Header from '../components/Header/Header'
import React, { Suspense } from 'react'
import SkeletonCard from '../components/Loading/Skeleton'
import { LoadingProvider } from '../context/LoadingContext'

const Layout: React.FC = () => {
  return (
    <div>
      <Header />
      <main>
        <LoadingProvider>
          <SearchContainer>
            <Suspense fallback={<SkeletonCard />}>
              <Outlet />
            </Suspense>
          </SearchContainer>
        </LoadingProvider>
      </main>
      <footer>Footer</footer>
    </div>
  )
}

export default Layout
