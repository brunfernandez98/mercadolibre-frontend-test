import React, { Suspense } from "react";

import { Outlet } from "react-router-dom";

import SearchContainer from "@components/Container/SearchContainer";
import Footer from "@components/Footer/Footer";
import Header from "@components/Header/Header";
import SkeletonCard from "@components/Loading/Skeleton";

import { LoadingProvider } from "@context/LoadingContext";

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
      <Footer />
    </div>
  );
};

export default Layout;
