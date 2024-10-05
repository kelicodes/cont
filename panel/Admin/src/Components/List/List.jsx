import React, { useEffect, useState } from 'react';
import './List.css';
import cross from '../../assets/cross_icon.png'; // Icon for removing product

const Listproduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [error, setError] = useState(null);

  // Fetch all products from the backend API
  const fetchInfo = async () => {
    try {
      const response = await fetch('https://classic-backend-1.onrender.com/allproducts');
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setAllProducts(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching products:", err);
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchInfo();
  }, []);

  // Remove product by ID
  const removeProduct = async (id) => {
    try {
      const response = await fetch('https://classic-backend-1.onrender.com/delete', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      // Re-fetch updated product list after deletion
      await fetchInfo();
    } catch (err) {
      setError(err.message);
      console.error("Error removing product:", err);
    }
  };

  return (
    <div className='listproduct'>
      <h1>ALL PRODUCTS LIST</h1>

      {error && <p className="error-message">{error}</p>}

      <div className="listproductformatmain">
        <p>PRODUCTS</p>
        <p>TITLE</p>
        <p>NEW-PRICE</p>
        <p>CATEGORY</p>
        <p>REMOVE</p>
      </div>

      <div className="allproducts">
        <hr />
        {allProducts.length > 0 ? (
          allProducts.map((product) => (
            <div key={product.id} className="listproductformatmain listproductformat">
              {/* Handle missing image */}
              <img
                src={product.image || 'https://via.placeholder.com/150'}
                alt={product.name || 'No Image Available'}
                className="listproducticon"
              />
              <p>{product.name}</p>
              <p>${product.price}</p>
              <p>{product.category}</p>
              <img
                onClick={() => removeProduct(product.id)}
                className='listproductremoveicon'
                src={cross}
                alt="Remove product"
              />
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
        <hr />
      </div>
    </div>
  );
};

export default Listproduct;
