import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    Cookies.remove("uid");
    navigate("/login");
  };

  return;
}

export default Logout;
