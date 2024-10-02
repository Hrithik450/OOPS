import { createContext, useContext, useReducer } from "react";
import axios from "axios";
import FileDownload from "js-file-download";
import { responsiveFontSizes } from "@mui/material";

const ProductContext = createContext();

const Reducer = (state, action) => {
  switch (action.type) {
    case "PRODUCTS_REQ":
      return { ...state, loading: true };

    case "FEATURE_SUCCESS":
    case "PRODUCTS_SUCCESS":
      return {
        ...state,
        Products: action.payload,
        loading: false,
      };

    case "FEATURE_FAIL":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case "DOWNLOAD_FAIL":
      return {
        error: action.payload,
      };

    default:
      return state;
  }
};

const initialState = {
  Products: [],
  loading: null,
  error: null,
};

function ProductProvider({ children }) {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const FetchProducts = async () => {
    dispatch({
      type: "PRODUCTS_REQ",
      payload: [],
    });

    const response = await axios.get(
      "https://ecommerce-project-backend-fu6b.onrender.com/product/getproducts"
    );

    if (response.status === 200) {
      dispatch({
        type: "PRODUCTS_SUCCESS",
        payload: response.data.products,
      });
    }
  };

  const handleDownload = async (id) => {
    try {
      const response = await axios
        .get(`https://ecommerce-project-backend-fu6b.onrender.com/product/download/${id}`, {
          responseType: "blob",
          withCredentials: true,
        })
        .then((response) => FileDownload(response.data, "python.pdf"));
    } catch (error) {
      console.log(error);
      dispatch({
        type: "DOWNLOAD_FAIL",
        payload: error.response?.data?.message || "An error occured",
      });
    }
  };

  const features = async () => {
    try {
      const response = await axios.get(
        "https://ecommerce-project-backend-fu6b.onrender.com/product/api/featureproducts",
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        dispatch({
          type: "FEATURE_SUCCESS",
          payload: response.data.products,
        });
      }
    } catch (error) {
      dispatch({
        type: "FEATURE_FAIL",
        payload: error.response.data.message,
      });
    }
  };

  return (
    <ProductContext.Provider
      value={{ FetchProducts, handleDownload, features, ...state }}
    >
      {children}
    </ProductContext.Provider>
  );
}

const useProductContext = () => {
  return useContext(ProductContext);
};

export { ProductContext, ProductProvider, useProductContext };
