import React from "react";
import "./emailsent.css";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EmailSent = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };

  return (
    <div className="sign-in-container">
      <div className="icon-wrapper">
        <FaCheckCircle className="check-icon" />
      </div>
      <h2>Reset email has been sent</h2>
      <button className="sign-in-button" onClick={handleClick}>
        <FaCheckCircle className="button-icon" />
        Sign in to your account
      </button>
    </div>
  );
};

export default EmailSent;
