import React, { useState } from "react";
import "./forgetpass.css";
import axios from "axios";
import LoadingSpinner from "../spinner/spinner";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [spinner, setspinner] = useState(false);
  const [formData, setformData] = useState({
    email: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setspinner(true);
      const response = await axios.patch(
        "http://localhost:7000/users/forgetpassword",
        formData
      );
      if (response.status === 200) {
        setspinner(false);
        navigate("/forgetpassword/sent");
      }
    } catch (error) {
      console.error("There was an error", error);
    }
  };

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="back">
          <div className="outbox">
            <a href="/login">
              <IoMdArrowRoundBack />
            </a>
          </div>
        </div>
        <h4 className="title">Provide your email</h4>
        <p>A password reset link will be sent to your email</p>
        <input
          type="email"
          className="input"
          placeholder="Enter your email"
          name="email"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <button type="submit" className="button">
          {spinner ? <LoadingSpinner /> : <>Continue</>}
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;
