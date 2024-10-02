import { useCartContext } from "../../store/Context/CartContext";
import CartProduct from "./cartitem";
import OrderCartProduct from "./orderItems";
import CustomStepper from "./stepper";
import { IoInformationCircleOutline } from "react-icons/io5";
import "./summary.css";
import { useAuthContext } from "../../store/Context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../spinner/spinner";

const h4Style = {
  paddingBottom: window.innerWidth < 450 ? "3%" : "1%",
  borderBottom: "3px solid rgba(0 , 0 , 0, 0.2)",
  marginBlock: window.innerWidth < 450 ? "5%" : "1.5%",
  fontWeight: "700",
  color: "rgba(0 , 0 , 0, 0.5)",
};

const Summary = () => {
  const navigate = useNavigate();
  const { cart, Total_price, Total_item, Total_discount, ShippingFee } =
    useCartContext();
  const [spinner, setspinner] = useState(false);

  const loadscript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");

      script.src = src;
      script.onload = () => {
        resolve(true);
        setspinner(false);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const RazorpayScreen = async (amount) => {
    const response = await loadscript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!response) {
      console.log("error in react js");
      return;
    }

    const options = {
      key: "rzp_test_vjabmn66zAR3J9",
      amount: amount,
      currency: "INR",
      name: "Softkart",
      description: "paying to Softkart",
      image: "https://papayacoders.com/demo.png",
      handler: function (response) {
        navigate(`/payment/${response.razorpay_payment_id}/success`);
      },
      prefill: {
        name: "Softkart",
        email: "mhrithik450@gmail.com",
      },
      theme: {
        color: "#F4C430",
      },
    };

    const paymentobject = new window.Razorpay(options);
    paymentobject.open();
  };

  const RazorpayOrder = async (amount) => {
    try {
      const response = await axios.post(
        "http://localhost:7000/checkout",
        amount
      );
      if (response.status === 200) {
        RazorpayScreen(response.data.order.amount);
      }
    } catch (error) {
      console.log("Error at", error);
    }

    // let data = JSON.stringify({
    //   amount: amount * 100,
    //   currency: "INR",
    // });

    // let Config = {
    //   method: "post",
    //   maxBodyLength: Infinity,
    //   url: "http://localhost:7000/checkout",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   data: data,
    // };

    // axios
    //   .request(Config)
    //   .then((response) => {
    //     console.log(JSON.stringify(response.data));
    //     RazorpayScreen(response.data.order.amount);
    //   })
    //   .catch((error) => {
    //     console.log("Error at", error);
    //   });
  };

  const paymentFetch = (e) => {
    e.preventDefault();

    const paymentId = e.target.paymentId.value;

    axios
      .get(`http://localhost:7000/checkout/payment/${paymentId}`)
      .then((response) => {
        console.log(response.data.payment);
      });
  };

  const amount = {
    amount: Math.ceil(Total_price - Total_discount + 3 + ShippingFee),
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setspinner(true);
    RazorpayOrder(amount);
  };

  return (
    <>
      <div className="Shipping-Container" style={{ width: "95vw" }}>
        <h3
          style={{
            textAlign: "center",
            fontWeight: "700",
            marginTop: "1%",
          }}
        >
          <CustomStepper currentStep={2} />
        </h3>
        <h4 style={h4Style}>Summary</h4>
        <div
          className="shippingBox"
          style={{ width: "auto", position: "relative" }}
        >
          <form
            className="shippingForm"
            onSubmit={handlePayment}
            encType="multipart/form-data"
            style={{
              display: "flex",
              flexDirection: "column",
              maxHeight: "60vh",
              overflowY: "auto",
              scrollbarWidth: "none",
              width: "100%",
            }}
          >
            {cart.map((item) => (
              <OrderCartProduct item={item} key={item.id} />
            ))}
            <div
              className="productcard"
              style={{ display: "grid", gridTemplateColumns: "1fr" }}
            >
              <div className="grid" id="Summary">
                Price ({Total_item} items){" "}
                <span>₹{Math.floor(Total_price)}</span>
                Discount <span>-₹{Math.floor(Total_discount)}</span>
                Platform Fee <span>₹3</span>
                Delivery Charges <span>₹40</span>
                Total Amount{" "}
                <span style={{ borderTop: "3px solid rgba(0 ,0, 0 , 0.4)" }}>
                  ₹{Math.ceil(Total_price - Total_discount + 3 + ShippingFee)}
                </span>
              </div>
            </div>

            <div
              className="bottom-navigation"
              style={{ columnGap: "30px", position: "sticky", bottom: "0%" }}
            >
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
              <button type="submit">
                {spinner ? <LoadingSpinner /> : <>Proceed to pay</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Summary;
