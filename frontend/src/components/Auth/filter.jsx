import "./filter.css";
import { createContext, useContext, useEffect, useState } from "react";
import { Slider } from "@mui/material";
import Reactstars from "react-rating-stars-component";
import { FaSackDollar } from "react-icons/fa6";
import { IoEarth } from "react-icons/io5";
import { DiAndroid } from "react-icons/di";
import { RiWebhookLine } from "react-icons/ri";
import { FaLaptop } from "react-icons/fa";
import { FaComputer } from "react-icons/fa6";
import { FaFolderOpen } from "react-icons/fa6";
import { IoMdDoneAll } from "react-icons/io";

export const FilterContext = createContext();

export function FilterContextProvider({ children }) {
  const [PriceRange, setPriceRange] = useState([0, 5000]);
  const [Rating, setRating] = useState("");
  const [Category, setCategory] = useState("");

  const value = {
    PriceRange,
    setPriceRange,
    Rating,
    Category,
    setRating,
    setCategory,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}

const Filter = () => {
  const {
    PriceRange,
    setPriceRange,
    Rating,
    setRating,
    Category,
    setCategory,
  } = useContext(FilterContext);

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  return (
    <>
      <div className="popup2-container">
        <div className="range-slider" style={{ width: "75%" }}>
          <label className="flexbox">
            <FaSackDollar />
            Price Range
          </label>
          <Slider
            value={PriceRange}
            onChange={(e, newValue) => {
              setPriceRange(newValue);
            }}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            min={0}
            max={5000}
          />

          <div className="categories">
            <p
              className="flexbox"
              onClick={() => {
                if (Category === "Web Development") {
                  setCategory("");
                } else {
                  setCategory("Web Development");
                }
              }}
            >
              <IoEarth />
              Web Dev
              {Category === "Web Development" && (
                <IoMdDoneAll style={{ color: "green" }} />
              )}
            </p>
            <p
              className="flexbox"
              onClick={() => {
                if (Category === "Andriod") {
                  setCategory("");
                } else {
                  setCategory("Andriod");
                }
              }}
            >
              <DiAndroid />
              Andriod Dev
              {Category === "Andriod" && (
                <IoMdDoneAll style={{ color: "green" }} />
              )}
            </p>
            <p
              className="flexbox"
              onClick={() => {
                if (Category === "DSA") {
                  setCategory("");
                } else {
                  setCategory("DSA");
                }
              }}
            >
              <RiWebhookLine />
              DSA
              {Category === "DSA" && <IoMdDoneAll style={{ color: "green" }} />}
            </p>
            <p
              className="flexbox"
              onClick={() => {
                if (Category === "Computers") {
                  setCategory("");
                } else {
                  setCategory("Computers");
                }
              }}
            >
              <FaComputer />
              Computers
              {Category === "Computers" && (
                <IoMdDoneAll style={{ color: "green" }} />
              )}
            </p>
            <p
              className="flexbox"
              onClick={() => {
                if (Category === "Languages") {
                  setCategory("");
                } else {
                  setCategory("Languages");
                }
              }}
            >
              <FaLaptop />
              Languages
              {Category === "Languages" && (
                <IoMdDoneAll style={{ color: "green" }} />
              )}
            </p>
            <p
              className="flexbox"
              onClick={() => {
                if (Category === "projects") {
                  setCategory("");
                } else {
                  setCategory("projects");
                }
              }}
            >
              <FaFolderOpen />
              Ready projects
              {Category === "projects" && (
                <IoMdDoneAll style={{ color: "green" }} />
              )}
            </p>
          </div>

          <label>Above Ratings</label>
          <Reactstars
            count={5}
            size={window.innerWidth < 450 ? 22 : 24}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor={"#ffd700"}
            onChange={ratingChanged}
          />
        </div>
      </div>
    </>
  );
};

export default Filter;
