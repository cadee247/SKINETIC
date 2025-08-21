import React, { useState } from "react";
import axios from "axios";
import "./productsearch.css"; // make sure this file exists

const ProductSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const res = await axios.get("http://localhost:5000/api/search", {
        params: { query },
      });

      if (res.data.results && res.data.results.length > 0) {
        setResults(res.data.results);
      } else {
        setResults([]);
        setError("No results found for this product.");
      }
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to fetch search results. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-search">
      <h2>Search Product Benefits</h2>
      <form onSubmit={handleSearch}>
        <input
          placeholder="Enter product name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      <div className="search-results">
        {results.map((r, idx) => (
          <div key={idx} className="search-item">
            <strong>{r.title || "No title"}</strong>
            <p>{r.snippet || "No snippet available."}</p>
            {r.link && (
              <a href={r.link} target="_blank" rel="noreferrer">
                Read more
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSearch;
