import "./cartItem.css";
import Reactstars from "react-rating-stars-component";
import { MdDelete } from "react-icons/md";
import { GiLightningTrio } from "react-icons/gi";
import { useCartContext } from "../../store/Context/CartContext";
import { useMemo, useState } from "react";
import "./orderItems.css";

function OrderCartProduct({ item }) {
  const { DeleteItem, handleIncQty, handleDecQty } = useCartContext();
  const options = {
    edit: false,
    count: 5,
    isHalf: true,
    size: 20,
    emptyIcon: <i className="far fa-star"></i>,
    halfIcon: <i className="fa fa-star-half-alt"></i>,
    fullIcon: <i className="fa fa-star"></i>,
    activeColor: "#ffd700",
    value: item && item.rating,
  };

  return (
    <>
      <div className="productcard" style={{ height: "27vh" }}>
        <div className="conatiner">
          <div className="left">
            <img
              style={{
                width: window.innerWidth < 450 ? "20vw" : "8vw",
                height: window.innerWidth < 450 ? "14vh" : "18vh",
                marginBottom: window.innerWidth < 450 ? "5px" : "15px",
              }}
              src={item && item.coverImage}
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
      </div>
    </>
  );
}

export default OrderCartProduct;
