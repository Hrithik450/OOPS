import React, { useEffect, useState } from "react";
import { FaBars, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import "./navbar.css";
import SearchBox from "./spinner/search";
import { Link } from "react-router-dom";
import UserOptions from "./Auth/options";
import { useAuthContext } from "../store/Context/AuthContext";
import { useCartContext } from "../store/Context/CartContext";
import { RiMenuAddFill } from "react-icons/ri";
import { BiLogInCircle } from "react-icons/bi";
import Filter from "./Auth/filter";

const Navbar = ({ handleQuery }) => {
  const { isAuthenticated, user, loadUser } = useAuthContext();
  const [menu, setmenu] = useState(false);
  const [filter, setfilter] = useState(false);
  const { cart } = useCartContext();

  useEffect(() => {
    if (isAuthenticated) {
      loadUser();
    }
  }, []);

  const handleOptions = () => {
    if (menu) {
      setmenu(false);
    } else {
      setmenu(true);
    }
  };

  const HandleFilter = () => {
    if (filter) {
      setfilter(false);
    } else {
      setfilter(true);
    }
  };

  return (
    <nav className="navbar" style={{ display: "grid" }}>
      <div className="navbar-left">
        <FaBars className="menu-icon" />
        <div
          className="logo"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Flipkart_2017_logo.svg"
            alt="SoftKart"
          />
          <span className="explore">
            <span className="plus">Plus</span>
            <span className="star">✦</span>
          </span>
        </div>
      </div>
      <div className="navbar-middle">
        <SearchBox handleQuery={handleQuery} />
      </div>
      <div className="navbar-right">
        <div>
          <div style={{ position: "relative" }}>
            {!isAuthenticated && (
              <Link
                to={"/signup"}
                style={{ textDecoration: "none", color: "black" }}
              >
                <BiLogInCircle className="icon" />
              </Link>
            )}
            {isAuthenticated && (
              <FaUserCircle
                className="icon"
                onClick={handleOptions}
                style={{ color: "black" }}
              />
            )}
            {isAuthenticated && <UserOptions menu={menu} />}
          </div>
          <div className="visibility">
            {isAuthenticated ? (
              <span style={{ color: "black" }}>
                {user?.Data?.username || "Account"}
              </span>
            ) : (
              <Link to={"/signup"} style={{ textDecoration: "none" }}>
                <span style={{ color: "black" }}>Account</span>
              </Link>
            )}
          </div>
        </div>

        <div>
          <div className="cart-icon">
            <Link to={"/cart"}>
              <FaShoppingCart className="icon" style={{ color: "black" }} />
            </Link>
            <span className="cart-badge">{cart ? cart.length : <>✦</>}</span>
          </div>
          <span className="visible">Cart</span>
        </div>

        <div style={{ position: "relative" }}>
          <RiMenuAddFill
            style={{ fontSize: "20px", color: "black" }}
            onClick={HandleFilter}
          />
          <span className="visible">Filter</span>
          {filter && <Filter />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
