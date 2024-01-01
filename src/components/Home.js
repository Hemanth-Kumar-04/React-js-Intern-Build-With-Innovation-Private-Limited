// Home.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import image from "./ecommerce-1706103_1280.png";
const Home = ({ authToken, history }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (!authToken) {
      history.push("/login");
      return;
    }

    const fetchProducts = async () => {
      try {
        let url = "https://dummyjson.com/products";

        if (searchTerm) {
          url += `?q=${encodeURIComponent(searchTerm)}`;
        }

        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setProducts(response.data.products);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchProducts();
  }, [authToken, searchTerm, history]);

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!minPrice || product.price >= parseFloat(minPrice)) &&
      (!maxPrice || product.price <= parseFloat(maxPrice))
  );

  const handleAddToCart = (productId) => {
    console.log(`Added product with ID ${productId} to the cart`);

    setCartCount((prevCount) => prevCount + 1);
  };

  const handleViewDetails = (productId) => {
    console.log(`View details for product with ID ${productId}`);
  };

  const cartIconClickHandler = () => {
    console.log("Navigate to the cart page");
  };

  return (
    <div className="full">
      <div>
        <div className="Searchdiv">
          <input
            type="text"
            className="SearchInput"
            placeholder="Search products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="cart-icon" onClick={cartIconClickHandler}>
            <span role="img" aria-label="cart">
              🛒
            </span>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </div>
        </div>
        <div className="Filtering">
          <label>Min Price:</label>
          <input
            className="Input"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <label>Max Price:</label>
          <input
            className="Input"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>
      <div className="product-container">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={image} className="image" alt="randomimg"/>
            <div>{product.title}</div>
            <div> ${product.price}</div>
            <div className="button-items">
              <button
                className="buttonc"
                onClick={() => handleAddToCart(product.id)}
              >
                Add to Cart
              </button>
              <button
                className="buttonc"
                id="lightbutton"
                onClick={() => handleViewDetails(product.id)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
