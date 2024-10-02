import { useEffect, useState } from "react";
import { AuthProvider, useAuthContext } from "../../store/Context/AuthContext";
import "./signup.css";
import { TfiEmail } from "react-icons/tfi";
import { CiLock } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "../spinner/spinner";

const Login = ({ handleButton }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signup");
    }
  }, []);

  const { handleLogin, isAuthenticated, error, spinner } = useAuthContext();
  const [Eyeopen, setEyeopen] = useState(false);
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const redirect = location.search ? `/${location.search.split("=")[1]}` : "/";

  if (isAuthenticated) {
    setTimeout(() => {
      navigate(redirect);
    }, 50);
  }

  return (
    <form
      className="Signup-container"
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin(formData);
      }}
    >
      <div className="shift-bar">
        <div className="active" style={{ color: "orange" }}>
          Login
        </div>
        <div onClick={handleButton} style={{ color: "orange" }}>
          Register
        </div>
      </div>

      {isAuthenticated && (
        <div class="alert alert-success" role="alert">
          Logged In Successfully
        </div>
      )}

      {error && !isAuthenticated && (
        <div class="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div style={{ position: "relative" }}>
        <TfiEmail className="image" />
        <input
          type="text"
          placeholder="Email"
          name="email"
          onChange={handlechange}
          required
        />
      </div>
      <div style={{ position: "relative" }}>
        <CiLock className="image" />
        <input
          type={Eyeopen ? "text" : "password"}
          placeholder="Password"
          name="password"
          onChange={handlechange}
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
      <a href="#" className="forgetPassword">
        <span>Forget password?</span>
      </a>
      <button
        style={{
          fontSize: "1.10rem",
          fontWeight: "600",
          backgroundColor: "orange",
        }}
      >
        {spinner ? <LoadingSpinner /> : <> Login</>}
      </button>
    </form>
  );
};

export { Login };
