import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import './DisplayProduct.css';

const DisplayProduct = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('http://localhost/practice1/DisplayProduct.php');
            if (data.success) {
                setProducts(data.data);
                setError(null);
            } else {
                setError(data.message || 'Failed to load products');
            }
        } catch (error) {
            setError('Error fetching products');
            console.error('Fetch Error:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const calculateDiscountedPrice = (price, discountPercentage) => {
        if (!discountPercentage) return parseFloat(price);
        return parseFloat(price) - (parseFloat(price) * (discountPercentage / 100));
    };

    const addToCart = async (product) => {
        const userId = localStorage.getItem('user_id');
    
        if (!userId) {
            alert("User is not logged in. Please log in first.");
            return;
        }
    
        try {
            const discountedPrice = product.percentage
                ? calculateDiscountedPrice(product.price, product.percentage)
                : product.price;
    
            const payload = {
                user_id: userId,
                id: product.id,
                name: product.name,
                price: discountedPrice,
                quantity: 1,
                image: product.image,  // Ensure the image field is passed in the request
            };
    
            console.log("Payload sent to API:", payload);
    
            const { data } = await axios.post('http://localhost/practice1/AddToCart.php', payload);
    
            if (data.success) {
                alert("Product added to cart successfully!");
            } else {
                alert(data.message || "Failed to add product to cart.");
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            alert("An error occurred while adding the product to cart.");
        }
    };
    
    return (
        <div className="main-content">
            <Navbar />
            <div className="small-background"></div>
            <div className="back-imag">
                <h2 className="product-list-title"></h2>
                {error && <p className="error-message">{error}</p>}
                <div className="product-list">
                    {products.map((product, index) => {
                        const discountedPrice = product.percentage
                            ? calculateDiscountedPrice(product.price, product.percentage)
                            : parseFloat(product.price);

                        return (
                            <div key={index} className="product-container">
                                <div className="product-image">
                                    <h2>{product.name}</h2>
                                    <img
                                        src={`http://localhost/practice1/${product.image}`}
                                        alt={product.name}
                                    />
                                </div>
                                <div className="product-details">
                                    <p className="description">{product.description}</p>
                                    <span className="old-price">{product.price}$</span>
                                    <p className="price">
                                        {discountedPrice ? (
                                            <span className="new-price">
                                                {discountedPrice && !isNaN(discountedPrice)
                                                    ? discountedPrice.toFixed(2)
                                                    : discountedPrice} $ ({product.percentage}% off)
                                            </span>
                                        ) : (
                                            <span className="no-discount">No discount available</span>
                                        )}
                                    </p>
                                    <button
                                        className="add-to-cart"
                                        onClick={() => addToCart(product)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DisplayProduct;
