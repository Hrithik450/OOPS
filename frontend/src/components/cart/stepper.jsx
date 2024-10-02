import "./stepper.css";
import { FaShippingFast } from "react-icons/fa";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { BsBank2 } from "react-icons/bs";

const steps = [
  {
    icon: <FaShippingFast />,
    label: <div>Shipping </div>,
  },
  {
    icon: <IoCheckmarkDoneCircleSharp />,
    label: <div>Summary</div>,
  },
  {
    icon: <BsBank2 />,
    label: <div>Payment</div>,
  },
];

const CustomStepper = ({ currentStep }) => {
  console.log(currentStep);
  return (
    <>
      <div className="stepper-container">
        {steps.map((item, index) => (
          <div
            className={`stepper-item ${
              currentStep === index + 1 ? "active" : ""
            }`}
            key={index}
          >
            <div className="stepper-icon">{item.icon}</div>
            <div className="stepper-label">{item.label}</div>
            {index < steps.length - 1 && <div className="stepper-line"></div>}
          </div>
        ))}
      </div>
    </>
  );
};

export default CustomStepper;
