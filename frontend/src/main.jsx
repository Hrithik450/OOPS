import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./store/store.jsx";
import { CartProvider } from "./store/Context/CartContext.jsx";
import { ProductProvider } from "./store/Context/ProductsContext.jsx";
import { AuthProvider } from "./store/Context/AuthContext.jsx";
import { NextUIProvider } from "@nextui-org/react";
import { AdminProvider } from "./store/Context/AdminContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AdminProvider>
    <Provider store={store}>
      <AuthProvider>
        <CartProvider>
          <ProductProvider>
            <App />
          </ProductProvider>
        </CartProvider>
      </AuthProvider>
    </Provider>
  </AdminProvider>
);
