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

export const ProductReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };

    case PRODUCT_FAIL:
      return {
        loading: false,
        products: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const ProductDetailsReducer = (
  state = { productDetail: {} },
  action
) => {
  switch (action.type) {
    case SINGLE_PRODUCT_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case SINGLE_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload.Product,
      };
    case SINGLE_PRODUCT_FAIL:
      return {
        loading: false,
        product: action.payload,
      };
    case SINGLE_CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
