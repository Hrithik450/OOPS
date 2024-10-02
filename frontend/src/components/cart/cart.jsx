import "./cart.css";
import { useCartContext } from "../../store/Context/CartContext";
import CartProduct from "./cartitem";
import { IoInformationCircleOutline } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const { cart, Total_price, Total_item, Total_discount, ShippingFee } =
    useCartContext();

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  const handleCheckout = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <>
      <div className="CartContainer">
        <div className="card-content">
          <div className="nav-bar">
            <IoMdArrowRoundBack
              style={{ fontSize: "25px" }}
              onClick={() => navigate("/")}
            />
            <span>My cart</span>
          </div>

          {cart.map((item) => (
            <CartProduct item={item} key={item._id} />
          ))}

          <div className="productcard">
            <div className="grid" id="Summary">
              Price ({Total_item} items) <span>₹{Math.floor(Total_price)}</span>
              Discount <span>-₹{Math.floor(Total_discount)}</span>
              Platform Fee <span>₹3</span>
              Delivery Charges <span>₹40</span>
              Total Amount{" "}
              <span style={{ borderTop: "3px solid rgba(0 ,0, 0 , 0.4)" }}>
                ₹{Math.ceil(Total_price - Total_discount + 3 + ShippingFee)}
              </span>
            </div>
            <div className="bottom-navigation">
              <div className="PriceBox">
                <span
                  className="TotalPrice"
                  style={{ color: "grey", fontSize: "13px" }}
                >
                  ₹{Math.ceil(Total_price + Total_discount + 3 + ShippingFee)}
                </span>
                <span
                  className="Totalprice"
                  style={{
                    fontWeight: "600",
                    fontSize: "22px",
                  }}
                >
                  ₹{Math.ceil(Total_price - Total_discount + 3 + ShippingFee)}
                  <a href="#Summary">
                    <IoInformationCircleOutline
                      style={{ alignSelf: "center", marginBottom: "2px" }}
                    />
                  </a>
                </span>
              </div>
              <button onClick={handleCheckout}>Place order</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
