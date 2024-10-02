import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
const CartContext = createContext();

const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM_SUCCESS":
      console.log(action.payload);
      let CartItem = action.payload;
      return { ...state, cart: [...state.cart, CartItem] };

    case "ADD_ITEM_FAIl":
      return {
        ...state,
        cart: [...state.cart],
        error: action.payload,
      };

    case "DELETE_ITEM":
      let updatedItems = state.cart.filter(
        (item) => item._id !== action.payload
      );
      return { ...state, cart: updatedItems };

    case "UPDATE_INC_QTY":
      let updatedNewItems = state.cart.map((item) => {
        if (item._id === action.payload) {
          let newQty = item.quantity + 1;
          let newPrice = item.price + item.originalPrice;
          return { ...item, quantity: newQty, price: newPrice };
        } else {
          return { ...item };
        }
      });
      return { ...state, cart: updatedNewItems };

    case "UPDATE_DEC_QTY":
      let updatedDecItems = state.cart.map((item) => {
        if (item._id === action.payload) {
          let newQty = item.quantity - 1;
          let newPrice = item.price - item.originalPrice;
          return { ...item, quantity: newQty, price: newPrice };
        } else {
          return { ...item };
        }
      });
      return { ...state, cart: updatedDecItems };

    case "SET_TOTAL":
      let TotalPrice = state.cart.reduce((accumulator, item) => {
        return accumulator + item.price;
      }, 0);
      let TotalItems = state.cart.length;
      let TotalDiscount = state.cart.reduce((accumulator, item) => {
        return accumulator + (item.price * item.discountPercentage) / 100;
      }, 0);
      return {
        ...state,
        Total_price: TotalPrice,
        Total_item: TotalItems,
        Total_discount: TotalDiscount,
      };

    case "SHIPPING-INFO":
      localStorage.setItem("MyAddress", JSON.stringify(action.payload));
      return {
        ...state,
      };

    case "PAYMENT_SUCCESS":
      // const { upi_transaction_id } = action.payload.acquirer_data;
      let CartItems = JSON.parse(localStorage.getItem("Mycart")) || [];

      return {
        ...state,
        isAuthenticated: true,
        paymentDetails: {
          amount: action.payload.amount,
          txn_id: action.payload.acquirer_data.upi_transaction_id,
          upi: action.payload.method,
        },
        purchasedItems: [...state.purchasedItems, ...CartItems],
      };

    case "PAYMENT_FAIL":
      console.log(action.payload);
      return {
        ...state,
      };

    case "RATING_SUCCESS":
      const Rating = {
        userRating: action.payload.rating,
      };
      return {
        ...state,
        isAuthenticated: true,
        spinner: false,
        RatedItems: [
          ...state.RatedItems,
          { ...action.payload.data.Product, ...Rating },
        ],
        purchasedItems: state.purchasedItems.map((item) =>
          item._id === action.payload.data.Product._id
            ? { ...item, ...action.payload.data.Product }
            : item
        ),
        cart: state.purchasedItems.map((item) =>
          item._id === action.payload.data.Product._id
            ? { ...item, ...action.payload.data.Product }
            : item
        ),
      };

    default:
      return state;
  }
};

const getLocalCartData = () => {
  let LocalCartData = localStorage.getItem("Mycart");
  if (LocalCartData != []) {
    return JSON.parse(LocalCartData);
  } else {
    return [];
  }
};

const initialState = {
  cart: getLocalCartData() || [],
  purchasedItems: localStorage.getItem("PurchasedData")
    ? JSON.parse(localStorage.getItem("PurchasedData"))
    : [],
  ShippingAdd: localStorage.getItem("MyAddress")
    ? JSON.parse(localStorage.getItem("MyAddress"))
    : null,
  RatedItems: localStorage.getItem("RatedItems")
    ? JSON.parse(localStorage.getItem("RatedItems"))
    : [],
  // cart: [],
  // purchasedItems: [],
  // RatedItems: [],
  Total_item: 0,
  Total_price: 0,
  ShippingFee: 40,
  Total_discount: 0,
  paymentDetails: {},
  error: "",
};

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  const addToCart = async (id) => {
    console.log(id);

    try {
      const response = await axios.get(`http://localhost:7000/product/${id}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        dispatch({
          type: "ADD_ITEM_SUCCESS",
          payload: {
            ...response.data.Product,
            originalPrice: response.data.Product.price,
          },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: "ADD_ITEM_FAIl",
        payload: error.response.data.message,
      });
    }
    // dispatch({
    //   type: "ADD_ITEM",
    //   payload: {
    //     ...data,
    //     originalPrice: data.price,
    //   },
    // });
  };

  const DeleteItem = (id) => {
    dispatch({
      type: "DELETE_ITEM",
      payload: id,
    });
  };

  const handleIncQty = (id) => {
    dispatch({
      type: "UPDATE_INC_QTY",
      payload: id,
    });
  };

  const handleDecQty = (id) => {
    dispatch({
      type: "UPDATE_DEC_QTY",
      payload: id,
    });
  };

  const handleShipping = (data) => {
    dispatch({
      type: "SHIPPING-INFO",
      payload: data,
    });
  };

  const HandleRatingBackend = async (id, username, email, value) => {
    try {
      const response = await axios.post(
        `http://localhost:7000/product/review/${id}`,
        { username, email, value },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        dispatch({
          type: "RATING_SUCCESS",
          payload: {
            data: response.data,
            rating: value,
          },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: "RATING_FAIL",
        payload: error.response.data.message,
      });
    }
  };

  const LoadPaymentDetails = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:7000/checkout/payment/${id}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        dispatch({
          type: "PAYMENT_SUCCESS",
          payload: response.data.payment,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: "PAYMENT_FAIL",
        payload: error.response,
      });
    }
  };

  useEffect(() => {
    localStorage.setItem("Mycart", JSON.stringify(state.cart));
    localStorage.setItem("RatedItems", JSON.stringify(state.RatedItems));
    localStorage.setItem("PurchasedData", JSON.stringify(state.purchasedItems));
    dispatch({ type: "SET_TOTAL" });
  }, [state.cart, state.RatedItems, state.purchasedItems]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        DeleteItem,
        handleIncQty,
        handleDecQty,
        handleShipping,
        HandleRatingBackend,
        LoadPaymentDetails,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartContext, CartProvider, useCartContext };
