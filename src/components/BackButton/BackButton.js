import React from "react";
import { useHistory } from "react-router";

import backButton from "assets/backButton.png";
import "./BackButton.css";

const BackButton = ({ extraClasses, handleOnPressBack }) => {
  const { goBack } = useHistory();

  const handleGoBack = () => {
    !!handleOnPressBack && handleOnPressBack();
    goBack();
  };

  return (
    <img
      src={backButton}
      className={`back-button ${extraClasses}`}
      alt="back"
      onClick={handleGoBack}
    />
  );
};

export default BackButton;
