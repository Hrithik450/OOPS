import "./options.css";
import { RxDashboard } from "react-icons/rx";
import { GiLightningTrio } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { ImExit } from "react-icons/im";
import { BiLogInCircle } from "react-icons/bi";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../../store/Context/AuthContext";
import { useEffect, useState } from "react";

const UserOptions = ({ menu }) => {
  const { loadUser, user, isAuthenticated } = useAuthContext();

  useEffect(() => {
    loadUser();
  }, []);

  const { handleLogout } = useAuthContext();

  return (
    <>
      {menu && (
        <>
          <div className="popup-container">
            <a href="/MyOrders">
              <GiLightningTrio />
              My Orders
            </a>
            <a href="/profile">
              <CgProfile />
              Profile
            </a>
            <a href="#" onClick={handleLogout}>
              <ImExit />
              Logout
            </a>
            {user?.Data?.role === "ADMIN" && (
              <a href="/admin/dashboard">
                <RxDashboard />
                Dashboard
              </a>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default UserOptions;
