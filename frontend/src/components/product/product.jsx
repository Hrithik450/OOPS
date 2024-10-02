import Reactstars from "react-rating-stars-component";
import { Link, useNavigate } from "react-router-dom";
import "./product.css";
import { useMemo, useState } from "react";
import { useCartContext } from "../../store/Context/CartContext";

function Product({ product }) {
  const navigate = useNavigate();
  const [isActive, setisActive] = useState(false);
  const { addToCart, cart } = useCartContext();

  const options = {
    edit: false,
    count: 5,
    size: window.innerWidth < 450 ? 20 : 32,
    isHalf: true,
    emptyIcon: <i className="far fa-star"></i>,
    halfIcon: <i className="fa fa-star-half-alt"></i>,
    fullIcon: <i className="fa fa-star"></i>,
    activeColor: "#ffd700",
    value: product.rating,
  };

  const handleToggle = () => {
    if (isActive) {
      setisActive(false);
    } else {
      setisActive(true);
    }
  };

  const isInCart = useMemo(() => {
    return cart.some((item) => item._id === product._id);
  }, [cart]);

  const handleAddToCart = (id) => {
    if (!isInCart) {
      addToCart(id);
    }
  };

  function RenderComponent() {
    return (
      <div className="Card_Container" onClick={handleToggle}>
        <div className={`card_container2 ${isActive ? "Active" : ""}`}>
          <div className="front">
            <div className="ProductCard">
              <img src={product.coverImage} />
              <p className="Title" style={{ fontWeight: "600" }}>
                {product.title}
              </p>
              <div className="Author">
                <span>{product.author}</span>
                <span>({product.edition}) - Edition</span>
              </div>
              <div className="rating">
                <Reactstars {...options} />
                <span>({product.reviews.length} Ratings)</span>
              </div>
              <div className="price">₹{product.price}</div>
              <div>
                <button
                  className="book-button"
                  onClick={() => handleAddToCart(product._id)}
                  style={{ cursor: "pointer" }}
                >
                  {isInCart ? (
                    <Link
                      to={"/cart"}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <span>Go to cart</span>
                    </Link>
                  ) : (
                    <span>Add to cart</span>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="back">
            <p>Hello</p>
          </div>
        </div>
      </div>
    );
  }

  return <>{RenderComponent()}</>;
}

export default Product;
