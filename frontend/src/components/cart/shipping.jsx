import { Country, State } from "country-state-city";
import { useCartContext } from "../../store/Context/CartContext";
import { useState } from "react";
import { MdOutlineLocationCity } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaCodeFork } from "react-icons/fa6";
import { FaGlobeAmericas } from "react-icons/fa";
import { MdPeopleAlt } from "react-icons/md";
import "./shipping.css";
import CustomStepper from "./stepper";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const navigate = useNavigate();
  const { handleShipping } = useCartContext();

  const [formData, setformData] = useState({
    City: "",
    ZipCode: "",
    State: "",
    country: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();

    handleShipping(formData);

    setTimeout(() => {
      navigate("/order/summary");
    }, 1000);
  };

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
          <CustomStepper currentStep={1} />
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
          Shipping Details
        </h4>
        <div className="shippingBox">
          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={handleShippingSubmit}
          >
            <div>
              <MdOutlineLocationCity className="Icons" />
              <input
                type="text"
                className="Home_Icon"
                name="City"
                value={formData.City}
                required
                placeholder="City"
                onChange={handleChange}
              />
            </div>

            <div>
              <FaCodeFork className="Icons" />
              <input
                className="Home_Icon"
                type="Number"
                name="ZipCode"
                value={formData.ZipCode}
                required
                placeholder="ZipCode"
                onChange={handleChange}
              />
            </div>

            <div>
              <FaPhoneAlt className="Icons" />
              <input
                type="Number"
                className="Home_Icon"
                name="phoneNumber"
                value={formData.phoneNumber}
                required
                placeholder="phoneNumber"
                onChange={handleChange}
              />
            </div>

            <div>
              <FaGlobeAmericas className="Icons" />

              <select
                required
                value={formData.country}
                name="country"
                onChange={handleChange}
                style={{ width: "100%" }}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {formData.country && (
              <>
                <div>
                  <MdPeopleAlt className="Icons" />

                  <select
                    required
                    value={formData.State}
                    name="State"
                    onChange={handleChange}
                    style={{ width: "100%" }}
                  >
                    <option value="">State</option>
                    {State &&
                      State.getStatesOfCountry(formData.country).map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="SubmitBtn"
                  disabled={formData.State ? false : true}
                >
                  Continue
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
