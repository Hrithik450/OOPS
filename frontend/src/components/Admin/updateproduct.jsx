import React, { useEffect, useState } from "react";
import "./updateproduct.css";
import { useAdminContext } from "../../store/Context/AdminContext";

function UpdateForm() {
  const { response, error, isAdmin, handleUpdateProduct } = useAdminContext();
  const [Alert, setAlert] = useState({ type: "", message: "" });

  console.log(Alert);
  console.log()

  const [formData, setFormData] = useState({
    id: "",
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
    trending: "",
  });

  // Selected fields to update
  const [selectedFields, setSelectedFields] = useState({
    id: false,
    title: false,
    author: false,
    category: false,
    year: false,
    edition: false,
    pages: false,
    pdfurl: false,
    description: false,
    coverImage: false,
    rating: false,
    price: false,
    discountPercentage: false,
    trending: false,
  });

  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    setSelectedFields({
      ...selectedFields,
      [e.target.name]: e.target.checked,
    });
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = Object.keys(formData)
      .filter((key) => selectedFields[key])
      .reduce((obj, key) => {
        obj[key] = formData[key];
        return obj;
      }, {});

    handleUpdateProduct(updatedData);
    setFormData({
      id: "",
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
      trending: "",
    });
  };

  useEffect(() => {
    if (error && !isAdmin) {
      setAlert({ type: "error", message: error });
    } else if (!error && isAdmin) {
      setAlert({ type: "success", message: response });
    }

    const timer = setTimeout(() => {
      setAlert({ type: "", message: "" });
    }, 1050);

    return () => clearTimeout(timer);
  }, [response, isAdmin, error]);

  return (
    <form className="update-list" onSubmit={handleSubmit}>
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

      <h4 style={{ fontWeight: "900" }}>Update Product</h4>

      <div>
        <div>
          <input
            type="checkbox"
            name="id"
            checked={selectedFields.id}
            onChange={handleCheckboxChange}
          />
        </div>

        <div>
          Product id:
          {selectedFields.id && (
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleInputChange}
              required
            />
          )}
        </div>
      </div>

      <div>
        <div>
          <input
            type="checkbox"
            name="title"
            checked={selectedFields.title}
            onChange={handleCheckboxChange}
          />
        </div>

        <div>
          Title:
          {selectedFields.title && (
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              style={{ width: "100%" }}
            />
          )}
        </div>
      </div>

      <div>
        <div>
          <input
            type="checkbox"
            name="author"
            checked={selectedFields.author}
            onChange={handleCheckboxChange}
          />
        </div>
        <div>
          Author:
          {selectedFields.author && (
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
            />
          )}
        </div>
      </div>

      <div>
        <div>
          <input
            type="checkbox"
            name="category"
            checked={selectedFields.category}
            onChange={handleCheckboxChange}
          />
        </div>
        <div>
          Category:
          {selectedFields.category && (
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            />
          )}
        </div>
      </div>

      <div>
        <div>
          <input
            type="checkbox"
            name="year"
            checked={selectedFields.year}
            onChange={handleCheckboxChange}
          />
        </div>
        <div>
          Year:
          {selectedFields.year && (
            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
            />
          )}
        </div>
      </div>

      <div>
        <div>
          <input
            type="checkbox"
            name="edition"
            checked={selectedFields.edition}
            onChange={handleCheckboxChange}
          />
        </div>
        <div>
          Edition:
          {selectedFields.edition && (
            <input
              type="text"
              name="edition"
              value={formData.edition}
              onChange={handleInputChange}
            />
          )}
        </div>
      </div>

      <div>
        <div>
          <input
            type="checkbox"
            name="pages"
            checked={selectedFields.pages}
            onChange={handleCheckboxChange}
          />
        </div>
        <div>
          Pages:
          {selectedFields.pages && (
            <input
              type="text"
              name="pages"
              value={formData.pages}
              onChange={handleInputChange}
            />
          )}
        </div>
      </div>

      <div>
        <div>
          <input
            type="checkbox"
            name="pdfurl"
            checked={selectedFields.pdfurl}
            onChange={handleCheckboxChange}
          />
        </div>
        <div>
          pdfurl:
          {selectedFields.pdfurl && (
            <input
              type="text"
              name="pdfurl"
              value={formData.pdfurl}
              onChange={handleInputChange}
            />
          )}
        </div>
      </div>

      <div>
        <div>
          <input
            type="checkbox"
            name="description"
            checked={selectedFields.description}
            onChange={handleCheckboxChange}
          />
        </div>
        <div>
          description:
          {selectedFields.description && (
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          )}
        </div>
      </div>

      <div>
        <div>
          <input
            type="checkbox"
            name="coverImage"
            checked={selectedFields.coverImage}
            onChange={handleCheckboxChange}
          />
        </div>
        <div>
          coverImage:
          {selectedFields.coverImage && (
            <input
              type="text"
              name="coverImage"
              value={formData.rating}
              onChange={handleInputChange}
            />
          )}
        </div>
      </div>

      <div>
        <div>
          <input
            type="checkbox"
            name="rating"
            checked={selectedFields.rating}
            onChange={handleCheckboxChange}
          />
        </div>
        <div>
          rating:
          {selectedFields.rating && (
            <input
              type="text"
              name="rating"
              value={formData.rating}
              onChange={handleInputChange}
            />
          )}
        </div>
      </div>

      <div>
        <div>
          <input
            type="checkbox"
            name="price"
            checked={selectedFields.price}
            onChange={handleCheckboxChange}
          />
        </div>
        <div>
          price:
          {selectedFields.price && (
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
          )}
        </div>
      </div>

      <div>
        <div>
          <input
            type="checkbox"
            name="discountPercentage"
            checked={selectedFields.discountPercentage}
            onChange={handleCheckboxChange}
          />
        </div>
        <div>
          discountPercentage:
          {selectedFields.discountPercentage && (
            <input
              type="text"
              name="discountPercentage"
              value={formData.discountPercentage}
              onChange={handleInputChange}
            />
          )}
        </div>
      </div>

      <div>
        <div>
          <input
            type="checkbox"
            name="trending"
            checked={selectedFields.trending}
            onChange={handleCheckboxChange}
          />
        </div>

        <div>
          trending:
          {selectedFields.trending && (
            <input
              type="text"
              name="trending"
              value={formData.trending}
              onChange={handleInputChange}
              style={{ width: "100%" }}
            />
          )}
        </div>
      </div>

      <button type="submit">Update</button>
    </form>
  );
}

export default UpdateForm;
