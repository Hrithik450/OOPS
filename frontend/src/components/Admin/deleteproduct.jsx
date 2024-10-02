import { useState } from "react";
import { useAdminContext } from "../../store/Context/AdminContext";

function DeleteProduct() {
  const { handleDeleteProduct, response, isAdmin, error } = useAdminContext();

  const [formData, setformData] = useState({
    id: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleDeleteProduct(formData);
  };

  return (
    <>
      <form
        className="get-users"
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          boxShadow: "0px 0px 5px 1px rgba(0 , 0 , 0, 0.2)",
          padding: "15px",
        }}
      >
        {error && !isAdmin && (
          <div class="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {response && isAdmin && (
          <div class="alert alert-success" role="alert">
            {response}
          </div>
        )}

        <input
          type="text"
          placeholder="Enter product ID"
          required
          name="id"
          value={formData.id}
          onChange={(e) =>
            setformData({
              ...formData,
              [e.target.name]: e.target.value,
            })
          }
          style={{ borderRadius: "10px" }}
        />
        <button
          type="submit"
          style={{
            fontWeight: "700",
            fontSize: "17px",
            borderRadius: "15px",
            marginTop: "10px",
          }}
        >
          Delete
        </button>
      </form>
    </>
  );
}

export default DeleteProduct;
