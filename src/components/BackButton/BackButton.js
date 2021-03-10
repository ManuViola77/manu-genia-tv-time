import React from "react";
import { useHistory } from "react-router";

import backButton from "assets/backButton.png";
import "./BackButton.css";

const BackButton = () => {
  const { goBack } = useHistory();

  return (
    <img src={backButton} className="back-button" alt="back" onClick={goBack} />
  );
};

export default BackButton;
