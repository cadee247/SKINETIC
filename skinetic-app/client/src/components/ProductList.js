import React, { useEffect, useState } from "react";
import axios from "axios";
import "./productlist.css"; // make sure this file exists

const ProductList = ({ refreshTrigger }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;
    axios
      .get(`${apiUrl}/api/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to load products:", err));
  }, [refreshTrigger]);

  const handleDelete = async (id) => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      await axios.delete(`${apiUrl}/api/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  return (
    <div className="product-list">
      <h2>Product List</h2>
      <ul>
        {products.map((p) => (
          <li key={p._id} className="product-item">
            <strong>{p.name}</strong> ({p.brand || "Unknown"}) – {p.frequency}
            <br />
            Ingredients:{" "}
            {p.ingredients ? p.ingredients.map((ing) => ing.name).join(", ") : "None"}
            <br />
            <button onClick={() => handleDelete(p._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
