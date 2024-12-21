import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Sale.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Sale = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    const calculateDiscountedPrice = (price, discountPercentage) => {
        return price - price * (discountPercentage / 100);
    };

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get("http://localhost/practice1/sale.php");
            if (data.success) {
                setProducts(data.data);
                setError(null);
            } else {
                setError(data.message || "Failed to load products");
            }
        } catch (error) {
            setError("Error fetching products");
            console.error("Fetch Error:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="main-container">
            <Navbar className="Navbar" />
            <div className="container">
             
                {error && <p className="error-message">{error}</p>}
                <div className="products">
                    {products.map((product, index) => {
                        const discountedPrice = product.percentage
                            ? calculateDiscountedPrice(product.price, product.percentage)
                            : null;

                        return (
                            <div key={index} className="product">
                                <h3>{product.product}</h3>
                                <img
                                    src={`http://localhost/practice1/${product.image}`}
                                    alt={product.product}
                                />
                                <p className="price">
                                    Original Price: <span className="oldPrice">${product.price}</span>
                                </p>
                                {discountedPrice ? (
                                    <p className="newPrice">
                                        Discounted Price: ${discountedPrice.toFixed(2)} ({product.percentage}% off)
                                    </p>
                                ) : (
                                    <p>No discount available</p>
                                )}
                                <button>Add to cart</button>
                            </div>
                        );
                    })}
                </div>
            </div>
            <Footer className="Footer" />
        </div>
    );
};

export default Sale;
