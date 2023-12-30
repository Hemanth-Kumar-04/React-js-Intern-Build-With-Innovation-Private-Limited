import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
      <div>
        {filteredProducts.map((product) => (
          <div key={product.id}>
            <div>{product.title} - ${product.price}</div>
            {/* Add other product details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
