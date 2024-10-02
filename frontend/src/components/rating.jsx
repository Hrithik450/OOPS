import "./rating.css";
import ReactStars from "react-rating-stars-component";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "../store/Context/AuthContext";
import LoadingSpinner from "./spinner/spinner";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { useCartContext } from "../store/Context/CartContext";

const RateCard = ({ RatingWindow, handleRating, id }) => {
  const { loadUser, user } = useAuthContext();
  const { HandleRatingBackend } = useCartContext();
  const [Rated, setRated] = useState(false);

  useEffect(() => {
    if (id) {
      loadUser();
    }
  }, [id]);

  const [rating, setrating] = useState();

  const HandleRatings = (id, name, email) => {
    HandleRatingBackend(id, name, email, rating);

    setRated(true);
    setTimeout(() => {
      setRated(false);
    }, 2000);
  };

  const handleRateStars = (newRating) => {
    setrating(newRating);
  };

  return (
    <>
      {RatingWindow && (
        <div className="rate_card">
          <IoMdArrowRoundBack
            style={{ fontSize: "20px", alignSelf: "start", margin: "10px" }}
            onClick={handleRating}
          />
          {Rated ? (
            <>
              <h3 style={{ fontWeight: "700" }}>Thank You</h3>
              <IoCheckmarkDoneCircle
                style={{
                  color: "green",
                  fontSize: "100px",
                  marginInline: "auto",
                }}
              />
            </>
          ) : (
            <>
              <h5
                style={{
                  textAlign: "center",
                  fontWeight: "700",
                  paddingTop: "10px",
                  fontSize: "20px",
                }}
              >
                Rate Product
              </h5>
              <span>
                <ReactStars
                  edit={true}
                  count={5}
                  size={35}
                  value={rating}
                  onChange={handleRateStars}
                  isHalf={true}
                  emptyIcon={<i className="far fa-star custom-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt custom-star"></i>}
                  fullIcon={<i className="fa fa-star custom-star"></i>}
                  activeColor="#ffd700"
                />
              </span>
              <button
                onClick={() => {
                  if (id && user && user?.Data) {
                    HandleRatings(id, user.Data.username, user.Data.email);
                  }
                }}
              >
                Submit
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default RateCard;
