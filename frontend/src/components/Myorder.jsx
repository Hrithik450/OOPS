import { useAuthContext } from "../store/Context/AuthContext";
import { useCartContext } from "../store/Context/CartContext";
import ReactStars from "react-rating-stars-component";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { IoMdDownload } from "react-icons/io";
import { MdOutlineStarRate } from "react-icons/md";
import RateCard from "./rating";
import { useMemo, useState } from "react";
import LoadingSpinner from "./spinner/spinner";
import { useProductContext } from "../store/Context/ProductsContext";

const Myorders = () => {
  const navigate = useNavigate();
  const { purchasedItems, RatedItems } = useCartContext();
  const { handleDownload } = useProductContext();
  const [ID, setID] = useState("");
  const [RatingWindow, setRatingWindow] = useState(false);

  const handleRating = () => {
    if (RatingWindow) {
      setRatingWindow(false);
    } else {
      setRatingWindow(true);
    }
  };

  if (!purchasedItems) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }

  return (
    <>
      <div className="Shipping-Container" style={{ position: "relative" }}>
        <div
          className="shippingBox"
          style={{
            overflowY: "auto",
            scrollbarWidth: "none",
            height: "90vh",
          }}
        >
          <RateCard
            RatingWindow={RatingWindow}
            handleRating={handleRating}
            id={ID}
          />
          <div
            className="nav-bar"
            style={{ width: "100%", borderRadius: "10px" }}
          >
            <IoMdArrowRoundBack
              style={{ fontSize: "25px" }}
              onClick={() => navigate("/")}
            />
            <span>My Orders</span>
          </div>
          {purchasedItems &&
            purchasedItems.map((item, index) => {
              const isInRated = RatedItems.some(
                (RItem) => RItem._id === item._id
              );
              const UserRating = RatedItems.find(
                (RItem) => RItem._id === item._id
              )?.userRating;
              return (
                <>
                  <div
                    className="productcard"
                    style={{ height: "30vh" }}
                    key={item._id}
                  >
                    <div className="conatiner">
                      <div className="left">
                        <img
                          src={item && item.coverImage}
                          className="imageClass"
                          style={{
                            width: window.innerWidth < 450 ? "23vw" : "8vw",
                            height: window.innerWidth < 450 ? "14vh" : "18vh",
                            marginBottom:
                              window.innerWidth < 450 ? "5px" : "25px",
                          }}
                        />
                      </div>

                      <div className="right">
                        <div className="Carttitle">{item && item.title}</div>
                        <div className="brand">
                          {item && item.author}
                          <div>({item && item.edition}) - Edition</div>
                        </div>
                        <div className="rating">
                          <span className="stars">
                            <ReactStars
                              edit={false}
                              count={5}
                              size={window.innerWidth < 450 ? 15 : 24}
                              isHalf={true}
                              emptyIcon={<i className="far fa-star"></i>}
                              halfIcon={<i className="fa fa-star-half-alt"></i>}
                              fullIcon={<i className="fa fa-star"></i>}
                              activeColor="#ffd700"
                              value={item.rating}
                            />
                          </span>
                          <span className="NoOfRated">
                            ({item?.reviews?.length || 0})
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bottom-menu">
                      {isInRated ? (
                        <div className="remove">
                          (You)
                          <ReactStars
                            edit={false}
                            count={5}
                            size={window.innerWidth < 450 ? 15 : 25}
                            value={UserRating}
                            isHalf={true}
                            emptyIcon={
                              <i className="far fa-star custom-star"></i>
                            }
                            halfIcon={
                              <i className="fa fa-star-half-alt custom-star"></i>
                            }
                            fullIcon={
                              <i className="fa fa-star custom-star"></i>
                            }
                            activeColor="#ffd700"
                          />
                        </div>
                      ) : (
                        <div
                          className="remove"
                          onClick={() => {
                            setID(item._id);
                            handleRating();
                          }}
                        >
                          <MdOutlineStarRate />
                          Rate product
                        </div>
                      )}
                      <div
                        className="buy"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDownload(item._id);
                        }}
                      >
                        <IoMdDownload />
                        Download PDF
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Myorders;
