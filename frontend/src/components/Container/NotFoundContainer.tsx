import Lottie from "lottie-react";

import React from "react";

import pageNotFoundAnimation from "@assets/404.json";
import componentNotFoundAnimation from "@assets/not-found.json";

import "./NotFoundContainer.scss";

interface NotFoundContainerProps {
  message?: string;
  animationData?: object;
  isPage?: boolean;
}

const NotFoundContainer: React.FC<NotFoundContainerProps> = ({
  message = "¡Ups! La página que estás buscando no existe.",
  animationData,
  isPage = true,
}) => {
  const selectedAnimation =
    animationData ||
    (isPage ? pageNotFoundAnimation : componentNotFoundAnimation);

  return (
    <div className={`not-found-container ${isPage ? "page" : "component"}`}>
      <div className="animation-container">
        <Lottie animationData={selectedAnimation} loop={true} />
      </div>
      <p className="not-found-message">{message}</p>
    </div>
  );
};

export default NotFoundContainer;
