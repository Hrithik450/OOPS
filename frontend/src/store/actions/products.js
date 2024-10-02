import axios from "axios";
import {
  CLEAR_ERROR,
  PRODUCT_FAIL,
  PRODUCT_REQUEST,
  PRODUCT_SUCCESS,
  SINGLE_CLEAR_ERROR,
  SINGLE_PRODUCT_FAIL,
  SINGLE_PRODUCT_REQUEST,
  SINGLE_PRODUCT_SUCCESS,
} from "../constants/products";

export const GetProducts = async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_REQUEST,
      payload: [],
    });

    const response = await axios.get(
      "http://localhost:7000/product/getproducts"
    );

    if (response.status === 200) {
      dispatch({
        type: PRODUCT_SUCCESS,
        payload: response.data.Users,
      });
    }
  } catch (error) {
    dispatch({
      type: PRODUCT_FAIL,
      payload: error.response,
    });
  }
};

export const ClearErrors = (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};

export const GetProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SINGLE_PRODUCT_REQUEST,
    });

    const response = await axios.get(`http://localhost:7000/product/${id}`);
    if (response.status === 200) {
      dispatch({
        type: SINGLE_PRODUCT_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    dispatch({
      type: SINGLE_PRODUCT_FAIL,
      payload: error.response.data,
    });
  }
};

export const ClearError = (dispatch) => {
  dispatch({
    type: SINGLE_CLEAR_ERROR,
  });
};
