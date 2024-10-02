import { IoMdArrowRoundBack } from "react-icons/io";
import BookForm from "./newproduct";
import UpdateProduct from "./updateproduct";
import GetUsers from "./users/getusers";
import DeleteProduct from "./deleteproduct";
import DeleteUser from "./deleteuser";
import { Link } from "react-router-dom";

function CardOverview({ children }) {
  return (
    <>
      <div className="OverviewContainer">
        <div
          className="popup-content"
          onClick={(e) => e.stopPropagation()}
          style={{ padding: "10px" }}
        >
          <Link to={"/admin/dashboard"}>
            <IoMdArrowRoundBack style={{ fontSize: "25px", margin: "10px" }} />
          </Link>
          {children}
        </div>
      </div>
    </>
  );
}

export default CardOverview;
