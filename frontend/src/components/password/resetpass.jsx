import React, { useState } from "react";
import "./resetpass.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../spinner/spinner";

const ResetPassword = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [spinner, setspinner] = useState(false);
  const [formData, setformData] = useState({
    newPassword: "",
    ConfirmPassword: "",
  });

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.ConfirmPassword) {
      alert("Passwords do not match");
    } else {
      setspinner(true);
      try {
        const response = await axios.post(
          `http://localhost:7000/users/password/reset/${id}`,
          formData
        );
        if (response.status === 200) {
          setspinner(false);
          navigate("/login");
          alert("password updated successfully");
        }
      } catch (error) {
        console.log("There was an error", error);
      }
    }
  };

  return (
    <div className="sign-in-container">
      <form className="form-box" onSubmit={handleUpdate}>
        <h4>Update your password</h4>
        <input
          type="password"
          placeholder="New Password"
          name="newPassword"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="ConfirmPassword"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {spinner ? <LoadingSpinner /> : <>Update</>}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
