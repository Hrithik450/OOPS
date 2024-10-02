import React, { useEffect, useState } from "react";
import "./newproduct.css";
import { useAdminContext } from "../../store/Context/AdminContext";

const BookForm = () => {
  const { handleNewProduct, response, error, isAdmin } = useAdminContext();
  const [Alert, setAlert] = useState({ type: "", message: "" });

  useEffect(() => {
    if (!error && isAdmin) {
      setAlert({ type: "success", message: response });
    } else if (error && !isAdmin) {
      setAlert({ type: "error", message: error });
    }

    const timer = setTimeout(() => {
      setAlert({ type: "", message: "" });
    }, 1000);

    return () => clearTimeout(timer);
  }, [response, isAdmin, error]);

  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    category: "",
    year: "",
    edition: "",
    pages: "",
    pdfurl: "",
    description: "",
    coverImage: "",
    rating: "",
    price: "",
    discountPercentage: "",
  });

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNewProduct(bookData);

    setBookData({
      title: "",
      author: "",
      category: "",
      year: "",
      edition: "",
      pages: "",
      pdfurl: "",
      description: "",
      coverImage: "",
      rating: "",
      price: "",
      discountPercentage: "",
    });
  };

  return (
    <form className="new-product" onSubmit={handleSubmit}>
      <h4 style={{ fontWeight: "900", textAlign: "center" }}>New Product</h4>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={bookData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Author:</label>
        <input
          type="text"
          name="author"
          value={bookData.author}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={bookData.category}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Year:</label>
        <input
          type="number"
          name="year"
          value={bookData.year}
          onChange={handleChange}
          required
          min="1000"
          max={new Date().getFullYear()}
        />
      </div>

      <div>
        <label>Edition:</label>
        <input
          type="number"
          name="edition"
          value={bookData.edition}
          onChange={handleChange}
          required
          min="1"
        />
      </div>

      <div>
        <label>Pages:</label>
        <input
          type="number"
          name="pages"
          value={bookData.pages}
          onChange={handleChange}
          required
          min="1"
        />
      </div>

      <div>
        <label>PDF URL:</label>
        <input
          type="text"
          name="pdfurl"
          value={bookData.pdfurl}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={bookData.description}
          onChange={handleChange}
          style={{ width: "100%", borderRadius: "10px", padding: "20px" }}
        />
      </div>

      <div>
        <label>Cover Image URL:</label>
        <input
          type="text"
          name="coverImage"
          value={bookData.coverImage}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Rating:</label>
        <input
          type="number"
          name="rating"
          value={bookData.rating}
          onChange={handleChange}
          min="1"
          max="5"
        />
      </div>

      <div>
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={bookData.price}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Discount Percentage:</label>
        <input
          type="number"
          name="discountPercentage"
          value={bookData.discountPercentage}
          onChange={handleChange}
        />
      </div>

      {Alert.message && (
        <div
          className={`alert ${
            Alert.type === "error" ? "alert-danger" : "alert-success"
          }`}
          role="alert"
        >
          {Alert.message}
        </div>
      )}

      <button type="submit">Create</button>
    </form>
  );
};

export default BookForm;
