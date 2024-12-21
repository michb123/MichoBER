import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Makesale.css';
import Footer from './Footer';
import NavbarAdmin from './NavbarAdmin';

const Makesale = () => {
    const [productId, setProductId] = useState('');
    const [percentage, setPercentage] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [products, setProducts] = useState([]); 

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost/practice1/Makesale.php');
                if (response.data.success) {
                    setProducts(response.data.products);
                } else {
                    alert('Failed to retrieve products');
                }
            } catch (error) {
                alert('Error fetching products');
            }
        };
        fetchProducts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            productId,
            percentage,
            startDate,
            endDate,
        };

        try {
            const response = await axios.post('http://localhost/practice1/Makesale.php', payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.success) {
                alert('Sale created successfully!');
            } else {
                alert(`Failed to create sale: ${response.data.message}`);
            }
        } catch (error) {
            alert('Error during sale submission');
        }
    };

    return (
        <div>
            <NavbarAdmin />

            <div className="makesale-container">
                <div className="makesale-form-card">
                    <form onSubmit={handleSubmit}>
                        <div className="form-section">
                            <label htmlFor="product" className="form-label">Product Name</label>
                            <select
                                id="product"
                                name="product"
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                                className="form-input"
                            >
                                <option value="">Select a product</option>
                                {products.map((product) => (
                                    <option key={product.id} value={product.id}>
                                        {product.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-section">
                            <label htmlFor="percentage" className="form-label">Percentage Sales</label>
                            <input
                                type="number"
                                id="percentage"
                                name="percentage"
                                value={percentage}
                                onChange={(e) => setPercentage(e.target.value)}
                                step="0.01"
                                className="form-input"
                            />
                        </div>

                        <div className="form-section">
                            <label htmlFor="start-date" className="form-label">Start Date</label>
                            <input
                                type="date"
                                id="start-date"
                                name="start-date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="form-input"
                            />
                        </div>

                        <div className="form-section">
                            <label htmlFor="end-date" className="form-label">End Date</label>
                            <input
                                type="date"
                                id="end-date"
                                name="end-date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="form-input"
                            />
                        </div>

                        <button type="submit" className="submit-btn">Make Sale</button>
                    </form>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Makesale;
