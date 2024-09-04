import React from "react";

import Lottie from "react-lottie";

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

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: selectedAnimation,
  };

  return (
    <div className={`not-found-container `}>
      <p className="not-found-message">{message}</p>
      <div className="animation-container">
        <Lottie options={lottieOptions} />
      </div>
    </div>
  );
};

export default NotFoundContainer;
