import "./prdtOverview.css";
import { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../spinner/spinner";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import Reactstars from "react-rating-stars-component";
import { CartContext, useCartContext } from "../../store/Context/CartContext";
import { useNavigate, useParams, Link } from "react-router-dom";

const Overview = () => {
  const navigate = useNavigate();
  const { productid } = useParams();
  const { addToCart, cart } = useCartContext();

  const [spinner, setspinner] = useState(true);
  const [data, setdata] = useState(false);
  const [wishlist, setwishlist] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7000/product/${productid}`
        );
        if (response.status === 200) {
          setdata(response.data.Product);
          setspinner(false);
        }
      } catch (error) {
        console.log("There was an error", error);
      }
    };
    getProduct();
  }, []);

  const isInCart = useMemo(() => {
    return cart.some((item) => item._id === productid);
  }, [cart]);

  const handleAddToCart = () => {
    if (!isInCart) {
      addToCart(data);
    } else {
      navigate("/cart");
    }
  };

  const options = {
    edit: false,
    count: 5,
    size: window.innerWidth < 450 ? 15 : 24,
    isHalf: true,
    emptyIcon: <i className="far fa-star"></i>,
    halfIcon: <i className="fa fa-star-half-alt"></i>,
    fullIcon: <i className="fa fa-star"></i>,
    activeColor: "#ffd700",
    value: data.rating,
  };

  const handleWishlist = () => {
    if (wishlist === true) {
      setwishlist(false);
    } else {
      setwishlist(true);
    }
  };

  return (
    <div className="OverviewContainer">
      {spinner ? (
        <LoadingSpinner />
      ) : (
        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
          <div className="images-wrapper">
            <Link to={"/"}>
              <IoIosArrowBack className="Back_arrow" />
            </Link>

            {wishlist ? (
              <IoIosHeart
                className="wish_list"
                style={{ color: "red" }}
                onClick={handleWishlist}
              />
            ) : (
              <IoIosHeartEmpty className="wish_list" onClick={handleWishlist} />
            )}
            <div className="images">
              {data ? (
                data.images.map((item, i) => (
                  <img
                    className="carouselImage"
                    src={item}
                    id={`Slide-${i}`}
                    key={i}
                    alt={`${i} Slide`}
                    style={{
                      width: "80%",
                      height: "75vh",
                    }}
                  />
                ))
              ) : (
                <></>
              )}
            </div>
            <div className="slider-nav">
              <a href="#Slide-0"></a>
              <a href="#Slide-1"></a>
              <a href="#Slide-2"></a>
            </div>
          </div>

          <div className="title">{data && data.title}</div>
          <div className="description">{data && data.description}</div>
          <div className="rating">
            <Reactstars {...options} />
            {data && (
              <span style={{ color: "rgba(0 ,0 , 255)", marginLeft: "5px" }}>
                ({data.reviews.length} ratings)
              </span>
            )}
          </div>

          <div className="pricing">
            {data && (
              <>
                <div className="discount" style={{ color: "darkgreen" }}>
                  {data.discountPercentage}% off
                </div>
                <div className="price" style={{ color: "grey" }}>
                  ₹{data.price}
                </div>
                <div className="price">
                  ₹
                  {Math.floor(
                    data.price - data.price * (data.discountPercentage / 100)
                  )}
                  .00
                </div>
              </>
            )}
          </div>

          <div className="other-info">
            {data && (
              <>
                <div
                  className={`shipping-Info ${
                    data.stock < 5 ? "red" : "green"
                  }`}
                >
                  Hurry! Only {data.stock} left in stock
                </div>
                <div className="shipping-Info">{data.returnPolicy} </div>
                <div className="shipping-Info">{data.shippingInformation} </div>
              </>
            )}
          </div>

          <div className="highlights">Highlights</div>
          <div className="product-highlights">
            brand <div className="weight">{data && <>{data.brand}</>}</div>
            dimensions
            <div className="dimension">
              {data && (
                <>
                  {data.dimensions.width} x {data.dimensions.height} x{" "}
                  {data.dimensions.depth}
                </>
              )}
            </div>
            weight <div className="weight">{data && <>{data.weight}kg</>}</div>
          </div>

          <div className="warranty">Warranty</div>
          <div className="info">
            {data && (
              <div
                style={{
                  borderBottom: "5px solid rgba(0, 0, 0, 0.08)",
                  marginTop: "10px",
                }}
              >
                {data.warrantyInformation}
              </div>
            )}
          </div>

          <div className="rateproduct">
            <span>Raings & Reviews</span>
            <button
              className="rateButton"
              style={{
                backgroundColor: "white",
                border: "1px solid rgba(0, 0, 0, 0.5)",
                borderRadius: "5px",
              }}
            >
              <span style={{ color: "blue" }}>Rate Product</span>
            </button>
          </div>
          <div className="rating-stars">
            <div className="left">
              <div>
                <Reactstars {...options} />
              </div>

              {data && (
                <>
                  <span style={{ marginTop: "15px" }}>
                    {data.reviews.length} ratings and {data.reviews.length}{" "}
                    reviews
                  </span>
                </>
              )}
            </div>
            <div
              className="right"
              style={{
                borderLeft: "4px solid rgba(0 , 0 , 0 , 0.20)",
                paddingLeft: "10px",
              }}
            >
              Hello
            </div>
          </div>

          <div className="Bottom-menu">
            <div
              className="Cart"
              onClick={handleAddToCart}
              style={{ cursor: "pointer" }}
            >
              {isInCart ? <span>Go to cart</span> : <span>Add to cart</span>}
            </div>
            <div className="Buy">
              <span>Buy now</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;
