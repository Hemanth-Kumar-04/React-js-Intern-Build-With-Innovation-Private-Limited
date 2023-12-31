// Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';

const Home = ({ authToken, history }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    // Check if authToken is present
    if (!authToken) {
      // Redirect to login if not authenticated
      history.push('/login');
      return;
    }

    // Function to fetch products
    const fetchProducts = async () => {
      try {
        let url = 'https://dummyjson.com/products';

        // Apply search if a search term is provided
        if (searchTerm) {
          url += `?q=${encodeURIComponent(searchTerm)}`;
        }

        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setProducts(response.data.products);
      } catch (error) {
        console.error('Failed to fetch products', error);
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
    // Implement your logic for adding the product to the cart
    console.log(`Added product with ID ${productId} to the cart`);
  };

  const handleViewDetails = (productId) => {
    // Implement your logic for viewing details of the product
    console.log(`View details for product with ID ${productId}`);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <label>Min Price:</label>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <label>Max Price:</label>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>
      <div className="product-container">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <div>{product.title} - ${product.price}</div>
            {/* Add other product details as needed */}
            <div className='button-items'> 
            <button className="buttonc" onClick={() => handleAddToCart(product.id)}>
              Add to Cart
            </button>
            <button className="buttonc" onClick={() => handleViewDetails(product.id)}>
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
