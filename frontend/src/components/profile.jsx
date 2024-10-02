import { CgProfile } from "react-icons/cg";
import "./profile.css";
import { useCartContext } from "../store/Context/CartContext";
import { useAuthContext } from "../store/Context/AuthContext";
import { useEffect, useMemo } from "react";
import LoadingSpinner from "./spinner/spinner";
import { FaRegFaceSmileWink } from "react-icons/fa6";
import { TfiEmail } from "react-icons/tfi";
import { BsCalendar2Date } from "react-icons/bs";
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { loadUser, user, isAuthenticated, error } = useAuthContext();

  useEffect(() => {
    loadUser();
  }, []);

  if (!isAuthenticated) {
    return (
      <>
        <h1>{error}</h1>
      </>
    );
  }

  if (!user || !user.Data) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }

  return (
    <>
      <div className="Main">
        <div className="section-1">
          <div
            className="Back-arrow"
            style={{ justifySelf: "start", width: "100%" }}
          >
            <IoArrowBackCircle
              style={{
                fontSize: "30px",
                marginTop: "10px",
                marginLeft: "10px",
              }}
              onClick={() => navigate("/")}
            />
          </div>
          <CgProfile className="profile-icon" style={{ marginBlock: "5px" }} />
          <button>My profile</button>
        </div>
        <div className="section-2">
          <div className="item">
            <FaRegFaceSmileWink className="item-icon" />
            <h4>Username</h4>
            <span>{user && user.Data.username}</span>
          </div>
          <div className="item">
            <TfiEmail className="item-icon" />
            <h4>Email</h4>
            <span>{user && user.Data.email}</span>
          </div>
          <div className="item">
            <BsCalendar2Date className="item-icon" />
            <h4>Joined on</h4>
            <span>{user && user.Data.createdAt.split("T")[0]}</span>
          </div>
          <div>
            <button
              className="bottom-btn"
              onClick={() => navigate("/MyOrders")}
            >
              My Orders
            </button>
            <button className="bottom-btn">Change password</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
