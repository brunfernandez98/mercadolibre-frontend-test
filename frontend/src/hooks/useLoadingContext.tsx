import { useContext } from "react";

import { LoadingContext } from "../context/LoadingContext";

export const useLoadingContext = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error(
      "useLoadingContext debe ser usado dentro de un LoadingProvider",
    );
  }
  return context;
};
