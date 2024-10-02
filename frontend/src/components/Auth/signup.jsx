import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";
import { Login } from "./login";
import { FaRegFaceSmile } from "react-icons/fa6";
import { TfiEmail } from "react-icons/tfi";
import { CiLock } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { useAuthContext } from "../../store/Context/AuthContext";
import LoadingSpinner from "../spinner/spinner";
import Cookies from "js-cookie";

const SignUp = () => {
  const navigate = useNavigate();
  const { handleSubmit, spinner, user, isAuthenticated, error } =
    useAuthContext();

  const [Eyeopen, setEyeopen] = useState(false);
  const [formData, setformData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [LoginPage, setLoginPage] = useState(false);

  const handleButton = () => {
    if (LoginPage) {
      setLoginPage(false);
    } else {
      setLoginPage(true);
    }
  };

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isAuthenticated) {
    setTimeout(() => {
      navigate("/");
    }, 500);
  }

  return (
    <>
      {LoginPage ? (
        <Login handleButton={handleButton} />
      ) : (
        <form
          className="Signup-container"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(formData);
          }}
        >
          <div className="shift-bar">
            <div onClick={handleButton} style={{ color: "orange" }}>
              Login
            </div>
            <div className="active" style={{ color: "orange" }}>
              Register
            </div>
          </div>

          {isAuthenticated && (
            <div class="alert alert-success" role="alert">
              {user.msg}
            </div>
          )}

          {error && !isAuthenticated && (
            <div class="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <div style={{ position: "relative" }}>
            <FaRegFaceSmile className="image" />
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ position: "relative" }}>
            <TfiEmail className="image" />
            <input
              type="text"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              required
            />
          </div>
          <div style={{ position: "relative" }}>
            <CiLock className="image" />
            <input
              type={Eyeopen ? "text" : "password"}
              placeholder="Password"
              name="password"
              onChange={handleChange}
              required
            />
            {Eyeopen ? (
              <IoEyeOffOutline
                className="EyeOutline"
                onClick={() => setEyeopen(false)}
              />
            ) : (
              <IoEyeOutline
                className="EyeOutline"
                onClick={() => setEyeopen(true)}
              />
            )}
          </div>
          <button
            style={{
              fontSize: "1.10rem",
              fontWeight: "600",
              backgroundColor: "orange",
            }}
          >
            {spinner ? <LoadingSpinner /> : <>Sign Up</>}
          </button>
        </form>
      )}
    </>
  );
};

export default SignUp;
