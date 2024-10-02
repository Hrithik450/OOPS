import { useEffect } from "react";
import CustomStepperper from "../components/cart/stepper";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../store/Context/AuthContext";
import LoadingSpinner from "./spinner/spinner";
import "./payment.css";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { useCartContext } from "../store/Context/CartContext";

const Payment = () => {
  const { paymentid } = useParams();
  const navigate = useNavigate();
  const { LoadPaymentDetails, paymentDetails } = useCartContext();

  useEffect(() => {
    LoadPaymentDetails(paymentid);
  }, []);

  if (!paymentDetails) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }

  return (
    <>
      <div className="Shipping-Container">
        <h3
          style={{
            textAlign: "center",
            fontWeight: "700",
            marginBottom: "4%",
            marginTop: "2%",
          }}
        >
          <CustomStepperper currentStep={3} />
        </h3>
        <h4
          style={{
            paddingBottom: "2%",
            borderBottom: "3px solid rgba(0 , 0 , 0, 0.2)",
            marginBottom: "3%",
            fontWeight: "700",
            color: "rgba(0 , 0 , 0, 0.5)",
          }}
        >
          Transaction Successful
        </h4>
        <div className="shippingBox">
          <form
            className="shippingForm"
            onSubmit={() => navigate("/")}
            encType="multipart/form-data"
          >
            <div className="Details flex">
              <span style={{ color: "black", fontWeight: "700" }}>
                Transaction ID :
              </span>
              <span>{paymentDetails && paymentDetails.txn_id}</span>
            </div>
            <IoCheckmarkDoneCircle
              className="Details"
              style={{
                color: "green",
                fontSize: "200px",
                marginInline: "auto",
              }}
            />
            <div className="Details" style={{ fontSize: "25px" }}>
              Amount :{" "}
              <span style={{ color: "green" }}>
                ₹{paymentDetails && paymentDetails.amount / 100}
              </span>
            </div>

            <div className="Details">
              Paid through: <span>{paymentDetails && paymentDetails.upi}</span>
            </div>
            <button type="submit" className="SubmitBtn">
              Back to Home
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Payment;
