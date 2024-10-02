import "./cartItem.css";
import Reactstars from "react-rating-stars-component";
import { MdDelete } from "react-icons/md";
import { GiLightningTrio } from "react-icons/gi";
import { useCartContext } from "../../store/Context/CartContext";
import { useMemo, useState } from "react";

function CartProduct({ item }) {
  const { DeleteItem, handleIncQty, handleDecQty } = useCartContext();
  const options = {
    edit: false,
    count: 5,
    isHalf: true,
    size: window.innerWidth < 450 ? 20 : 28,
    emptyIcon: <i className="far fa-star"></i>,
    halfIcon: <i className="fa fa-star-half-alt"></i>,
    fullIcon: <i className="fa fa-star"></i>,
    activeColor: "#ffd700",
    value: item && item.rating,
  };

  return (
    <>
      <div className="productcard">
        <div className="conatiner">
          <div className="left">
            <img
              src={item && item.coverImage}
              className="imageClass"
              // style={{ width: "20vw", height: "10vh" }}
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
                <Reactstars {...options} />
              </span>
              <span className="NoOfRated">
                ({item && item?.reviews?.length})
              </span>
            </div>
            <div className="pricing">
              <div className="discount" style={{ color: "darkgreen" }}>
                {item.discountPercentage}% off
              </div>
              <div className="price" style={{ color: "grey" }}>
                ₹{item && Math.floor(item.price)}
              </div>
              <div className="price">
                ₹
                {Math.floor(
                  item.price - item.price * (item.discountPercentage / 100)
                )}
                .00
              </div>
            </div>
          </div>
        </div>

        <div className="bottom-menu">
          <div className="remove" onClick={() => DeleteItem(item._id)}>
            <MdDelete />
            Remove
          </div>
        </div>
      </div>
    </>
  );
}

export default CartProduct;
