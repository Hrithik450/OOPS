import React from "react";
import "./spinner.css";
import { FaSpinner } from "react-icons/fa";

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <FaSpinner className="spinner" />
    </div>
  );
};

export default LoadingSpinner;
