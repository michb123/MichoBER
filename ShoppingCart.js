import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ShoppingCart.css';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('user_id');

    if (!userId) {
      console.error('User is not logged in');
      setError('User is not logged in');
      setLoading(false);
      return;
    }

    axios.get(`http://localhost/practice1/ShoppingCart.php?user_id=${userId}`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          const sanitizedData = response.data.map((item) => ({
            ...item,
            totalPrice: Number(item.totalPrice),
            price: Number(item.price),
          }));
          setCartItems(sanitizedData);
          calculateGrandTotal(sanitizedData);
        } else {
          setError('Failed to load cart items. Please try again.');
        }
      })
      .catch(() => {
        setError('Error fetching cart items. Please try again later.');
      })
      .finally(() => setLoading(false));
  }, []);

  const calculateGrandTotal = (items) => {
    const total = items.reduce((acc, item) => acc + item.totalPrice, 0);
    setGrandTotal(Number(total));
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: newQuantity, totalPrice: item.price * newQuantity }
          : item
      );
      calculateGrandTotal(updatedItems);
      return updatedItems;
    });

    setLoading(true);
    axios.post('http://localhost/practice1/UpdateCart.php', { id, newQuantity })
      .then((response) => {
        if (!response.data.success) {
          setError('Failed to update quantity. Please try again.');
        }
      })
      .catch(() => {
        setError('Failed to update quantity. Please try again.');
      })
      .finally(() => setLoading(false));
  };

  const handleDelete = (id) => {
    setLoading(true);
    axios.post('http://localhost/practice1/DeleteCart.php', { id })
      .then(() => {
        setCartItems((prevItems) => {
          const updatedItems = prevItems.filter((item) => item.id !== id);
          calculateGrandTotal(updatedItems);
          return updatedItems;
        });
      })
      .catch(() => {
        setError('Failed to delete item. Please try again.');
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="shopping-cart">
      <h1>Shopping Cart</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      <table>
        <thead>
          <tr>
            {/* Remove the ID column */}
            <th>Image</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length === 0 ? (
            <tr>
              <td colSpan="6">Your cart is empty</td> {/* Adjust column span */}
            </tr>
          ) : (
            cartItems.map((item) => (
              <tr key={item.id}>
                {/* Remove the ID cell */}
                <td>
                  <img
                    src={`http://localhost/practice1/${item.image}`}
                    alt={item.product_name}
                    style={{ width: '50px', height: '50px' }}
                  />
                </td>
                <td>{item.product_name}</td>
                <td>{item.price}$</td>
                <td>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    disabled={loading || item.quantity === 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    disabled={loading}
                  >
                    +
                  </button>
                </td>
                <td>{Number(item.totalPrice).toFixed(2)}$</td>
                <td>
                  <button onClick={() => handleDelete(item.id)} disabled={loading}>🗑️</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="cart-footer">
        <h3>Grand Total: ₹ {isNaN(grandTotal) ? '0.00' : grandTotal.toFixed(2)}</h3>
        <div className="footer-buttons">
          <button onClick={() => window.location.href = '/displayproduct'}>Continue Shopping</button>
          <button onClick={() => window.location.href = '/checkout'}>Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
