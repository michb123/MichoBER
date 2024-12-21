import React, { useState } from 'react';
import axios from 'axios';
import './AddProduct.css';
import Footer from './Footer';
import NavbarAdmin from './NavbarAdmin';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('');
    const [message, setMessage] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('image', image);

        try {
            const response = await axios.post('http://localhost/practice1/addproduct.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data.success) {
                setMessage('Product added successfully!');
                setName('');
                setDescription('');
                setPrice('');
                setImage(null);
                setPreview('');
            } else {
                setMessage('Failed to add product: ' + response.data.message);
            }
            
        } catch (error) {
            setMessage('Error: ' + error.message);
        }
    };

    return (
        <>
            <NavbarAdmin />
            <div className="add-product-container">
                <h2>Add New Product</h2>
                {message && <p style={{ color: 'red' }}>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="add-product-form-group">
                        <label htmlFor="name">Product Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="add-product-form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="add-product-form-group">
                        <label htmlFor="price">Price:</label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            className="add-product-price-input"
                        />
                    </div>
                    <div className="add-product-form-group">
                        <label htmlFor="image">Upload Image:</label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            required
                        />
                        {preview && <img src={preview} alt="Product Preview" style={{ maxWidth: '100%', marginTop: '10px' }} />}
                    </div>
                    <button type="submit" className="add-product-submit-button">Add Product</button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default AddProduct;
