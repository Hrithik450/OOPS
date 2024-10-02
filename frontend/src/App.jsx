import ForgetPassword from "./components/password/forgetpass";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResetPassword from "./components/password/resetpass";
import EmailSent from "./components/password/emailsent";
import Overview from "./components/product/prdtOverview";
import Cart from "./components/cart/cart";
import Products from "./components/product/products";
import ProfileEditPage from "./components/Auth/profile";
import SignUp from "./components/Auth/signup";
import { useAuthContext } from "./store/Context/AuthContext";
import React from "react";
import Profile from "./components/profile";
import { Login } from "./components/Auth/login";
import Shipping from "./components/cart/shipping";
import Summary from "./components/cart/summary";
import Payment from "./components/payment";
import Myorders from "./components/Myorder";
import Dashboard from "./components/Admin/dashboard";
import BookForm from "./components/Admin/newproduct";
import UpdateForm from "./components/Admin/updateproduct";
import DeleteProduct from "./components/Admin/deleteproduct";
import GetUsers from "./components/Admin/users/getusers";
import DeleteUser from "./components/Admin/deleteuser";
import Admin from "./components/Admin/Admin";
import { FilterContextProvider } from "./components/Auth/filter";
import { GlobalStyle } from "./components/globle";
import { ThemeProvider } from "styled-components";
import Footer from "./components/footer";

function App() {
  const { isAuthenticated } = useAuthContext();

  const theme = {
    colors: {
      heading: "",
      bg: "black",
      helper: "",
      black: "",
      border: "",
      shadowSupport: "",
      btn: "",
      white: "",
    },
    media: {
      tab: "768px",
      mobile: "450px",
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/users/password/reset/:id" element={<ResetPassword />} />
          <Route path="/forgetpassword/sent" element={<EmailSent />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/order/summary" element={<Summary />} />
          <Route path="/payment/:paymentid/success" element={<Payment />} />
          <Route path="/MyOrders" element={<Myorders />} />

          <Route
            path="/"
            element={
              <FilterContextProvider>
                <Products />
              </FilterContextProvider>
            }
          />
          <Route path="/product/:productid" element={<Overview />} />

          <Route path="/admin/dashboard" element={<Admin />}>
            <Route index element={<Dashboard />} />
            <Route path="newproduct" element={<BookForm />} />
            <Route path="updateproduct" element={<UpdateForm />} />
            <Route path="deleteproduct" element={<DeleteProduct />} />
            <Route path="getAllUsers" element={<GetUsers />} />
            <Route path="deleteUser" element={<DeleteUser />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
