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
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className={`not-found-container ${isPage ? "page" : "component"}`}>
      <div className="animation-container">
        <Lottie height={400} options={lottieOptions} width={400} />
      </div>
      <p className="not-found-message">{message}</p>
    </div>
  );
};

export default NotFoundContainer;
