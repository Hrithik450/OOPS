import { createContext, useContext, useReducer } from "react";
import axios from "axios";
import ErrorBoundary from "../Error";

const AdminContext = createContext();

const Reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_SUCCESS":
    case "NEW_SUCCESS":
    case "USERS_SUCCESS":
    case "DELETE_SUCCESS":
    case "DELETE_USER_SUCCESS":
      console.log(action.payload);
      return {
        ...state,
        response: action.payload,
        isAdmin: true,
        users: action.payload.userDetails,
      };

    case "USERS_FAIL":
    case "UPDATE_FAIL":
    case "NEW_FAIL":
    case "DELETE_FAIL":
    case "DELETE_USER_FAIl":
      return {
        ...state,
        error: action.payload,
        isAdmin: false,
      };

    default:
      return state;
  }
};

const initialState = {
  response: {},
  isAdmin: false,
  error: null,
  users: "",
  message: "",
};

function AdminProvider({ children }) {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const handleNewProduct = async (data) => {
    try {
      const response = await axios.post(
        "https://ecommerce-project-backend-fu6b.onrender.com/admin/createBook",
        data,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        dispatch({
          type: "NEW_SUCCESS",
          payload: response.data.message,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: "NEW_FAIL",
        payload: error.response.data.message,
      });
    }
  };

  const handleUpdateProduct = async (data) => {
    try {
      const response = await axios.post(
        "https://ecommerce-project-backend-fu6b.onrender.com/admin/updateBook",
        data,
        { withCredentials: true }
      );

      if (response.status === 200) {
        console.log(response);
        dispatch({
          type: "UPDATE_SUCCESS",
          payload: response.data.message,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: "UPDATE_FAIL",
        payload: error.response.data.message,
      });
    }
  };

  const getUsers = async () => {
    try {
      const response = await axios.get(
        "https://ecommerce-project-backend-fu6b.onrender.com/admin/getAllUsers",
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log(response);
        dispatch({
          type: "USERS_SUCCESS",
          payload: response.data,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: "USERS_FAIL",
        payload: error.response.data.message,
      });
    }
  };

  const handleDeleteProduct = async (data) => {
    try {
      const response = await axios.post(
        "https://ecommerce-project-backend-fu6b.onrender.com/admin/deleteBook",
        data,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        dispatch({
          type: "DELETE_SUCCESS",
          payload: response.data.message,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: "DELETE_FAIL",
        payload: error.response.data.message,
      });
    }
  };

  const handleDeleteUser = async (data) => {
    try {
      const response = await axios.post(
        "https://ecommerce-project-backend-fu6b.onrender.com/admin/DeleteUser",
        data,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        dispatch({
          type: "DELETE_USER_SUCCESS",
          payload: response.data.message,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: "DELETE_USER_FAIl",
        payload: error.response.data.message,
      });
    }
  };

  return (
    <AdminContext.Provider
      value={{
        handleNewProduct,
        handleUpdateProduct,
        handleDeleteProduct,
        getUsers,
        handleDeleteUser,
        ...state,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

const useAdminContext = () => {
  return useContext(AdminContext);
};

export { AdminProvider, useAdminContext };
