import { useContext, useEffect, useState } from "react";
import { useProductContext } from "../../store/Context/ProductsContext";
import Product from "./product";
import SearchBox from "../spinner/search";
import "./products.css";
import Slider from "@mui/material/Slider";
import Reactstars from "react-rating-stars-component";
import LoadingSpinner from "../spinner/spinner";
import Navbar from "../navbar";
import { useAuthContext } from "../../store/Context/AuthContext";
import Filter, { FilterContext, FilterContextProvider } from "../Auth/filter";
import Hero from "../Home";
import Services from "../services";
import Trusted from "../trusted";

let FirstRender = true;

const Products = () => {
  const { loadUser, LoadUser, isAuthenticated } = useAuthContext();
  const { PriceRange, Rating, Category } = useContext(FilterContext);
  const [Query, setQuery] = useState("");

  useEffect(() => {
    features();
    if (isAuthenticated) {
      if (FirstRender) {
        FirstRender = false;
        loadUser();
      }

      const interval = setInterval(() => {
        LoadUser();
      }, 6 * 24 * 60 * 60 * 1000);
    }
  }, []);

  const { FetchProducts, features, loading, Products } = useProductContext();

  const handleQuery = (query) => {
    setQuery(query);
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="searchBar">
            <Navbar handleQuery={handleQuery} />
          </div>

          <div>
            <Hero />
          </div>

          <h3
            style={{
              marginTop: "3rem",
              fontWeight: "900",
              color: "white",
              textAlign: "center",
              fontSize: "4rem",
              textShadow: "1px 1px 2px pink",
            }}
          >
            Best Sellers
          </h3>
          <div
            className="items-container"
            style={{
              scrollbarWidth: "none",
              marginTop: "4rem",
              position: "relative",
            }}
          >
            <>
              {Products && (
                <>
                  {Products.filter((product) =>
                    product.title.toLowerCase().includes(Query.toLowerCase())
                  )
                    .filter(
                      (product) =>
                        product.price >= PriceRange[0] &&
                        product.price <= PriceRange[1]
                    )
                    .filter((product) => product.rating >= Rating)
                    .filter((product) =>
                      product.category
                        .toLowerCase()
                        .includes(Category.toLowerCase())
                    )
                    .map((product) => (
                      <Product product={product} key={product._id} />
                    ))}
                </>
              )}
            </>
          </div>
        </>
      )}
      <Services />
      <Trusted />
    </>
  );
};

export default Products;
