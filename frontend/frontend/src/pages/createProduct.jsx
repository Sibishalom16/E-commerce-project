import React, { useState, useEffect } from "react";
import { AiOutlinePlusCircle, AiOutlineMail, AiOutlineTag, AiOutlineFileText, AiOutlineAppstore, AiOutlineDollar, AiOutlineInbox } from "react-icons/ai";
import axios from "../axios.config";
import { useParams, useNavigate } from "react-router-dom";
import Nav from "../components/nav";

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const CreateProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const categoriesData = [
        { title: "Electronics" },
        { title: "Fashion" },
        { title: "Books" },
        { title: "Home Appliances" },
    ];

    useEffect(() => {
        if (isEdit) {
            axios.get(`/api/v2/product/product/${id}`)
                .then((response) => {
                    const p = response.data.product;
                    setName(p.name || "");
                    setDescription(p.description || "");
                    setCategory(p.category || "");
                    setTags(p.tags || "");
                    setPrice(p.price || "");
                    setStock(p.stock || "");
                    setEmail(p.email || "");
                    if (p.images && p.images.length > 0) {
                        setPreviewImages(p.images.map((imgPath) => `${API_BASE}${imgPath}`));
                    }
                })
                .catch((err) => console.error("Error fetching product:", err));
        }
    }, [id, isEdit]);

    const handleImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setImages((prev) => prev.concat(files));
        const imagePreviews = files.map((file) => URL.createObjectURL(file));
        setPreviewImages((prev) => prev.concat(imagePreviews));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("tags", tags);
        formData.append("price", price);
        formData.append("stock", stock);
        formData.append("email", email);

        images.forEach((image) => {
            formData.append("images", image);
        });

        try {
            if (isEdit) {
                const response = await axios.put(`/api/v2/product/update-product/${id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                if (response.status === 200) {
                    navigate("/my-products");
                }
            } else {
                const response = await axios.post("/api/v2/product/create-product", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                if (response.status === 201) {
                    setImages([]);
                    setPreviewImages([]);
                    setName("");
                    setDescription("");
                    setCategory("");
                    setTags("");
                    setPrice("");
                    setStock("");
                    setEmail("");
                    navigate("/my-products");
                }
            }
        } catch (err) {
            console.error("Error creating/updating product:", err);
            alert("Failed to save product. Please check the data and try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-container">
            <Nav />
            <div className="auth-page" style={{ paddingTop: '2.5rem', paddingBottom: '3rem', alignItems: 'flex-start' }}>
                <div className="auth-card" style={{ maxWidth: '650px', padding: '2rem' }}>

                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-primary)', margin: 0, letterSpacing: '-0.02em' }}>
                            {isEdit ? "Edit Product" : "Create New Product"}
                        </h1>
                        <p style={{ margin: '0.25rem 0 0', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                            {isEdit ? "Update the details of your listing" : "Fill out the details below to add a new listing"}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                        {/* Email */}
                        <div>
                            <label className="input-label">Email <span style={{ color: 'var(--color-danger)' }}>*</span></label>
                            <div style={{ position: 'relative' }}>
                                <AiOutlineMail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input-field"
                                    placeholder="Your vendor email"
                                    style={{ paddingLeft: '2.25rem' }}
                                    required
                                />
                            </div>
                        </div>

                        {/* Name */}
                        <div>
                            <label className="input-label">Product Name <span style={{ color: 'var(--color-danger)' }}>*</span></label>
                            <div style={{ position: 'relative' }}>
                                <AiOutlineTag size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="input-field"
                                    placeholder="Enter product name"
                                    style={{ paddingLeft: '2.25rem' }}
                                    required
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="input-label">Description <span style={{ color: 'var(--color-danger)' }}>*</span></label>
                            <div style={{ position: 'relative' }}>
                                <AiOutlineFileText size={16} style={{ position: 'absolute', left: '12px', top: '16px', color: 'var(--color-text-muted)' }} />
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="input-field"
                                    placeholder="Enter product description"
                                    rows="4"
                                    style={{ paddingLeft: '2.25rem', paddingTop: '0.9rem', resize: 'vertical' }}
                                    required
                                />
                            </div>
                        </div>

                        {/* Grid for Category, Tags, Price, Stock */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem' }}>

                            {/* Category */}
                            <div>
                                <label className="input-label">Category <span style={{ color: 'var(--color-danger)' }}>*</span></label>
                                <div style={{ position: 'relative' }}>
                                    <AiOutlineAppstore size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                    <select
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="input-field"
                                        style={{ paddingLeft: '2.25rem', appearance: 'none' }}
                                        required
                                    >
                                        <option value="" disabled>Choose a category...</option>
                                        {categoriesData.map((i) => (
                                            <option value={i.title} key={i.title}>{i.title}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Tags */}
                            <div>
                                <label className="input-label">Tags <span style={{ color: 'var(--color-text-muted)', fontWeight: 400, textTransform: 'none' }}>(Optional)</span></label>
                                <div style={{ position: 'relative' }}>
                                    <AiOutlineTag size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                    <input
                                        type="text"
                                        value={tags}
                                        onChange={(e) => setTags(e.target.value)}
                                        className="input-field"
                                        placeholder="e.g. Sale, New"
                                        style={{ paddingLeft: '2.25rem' }}
                                    />
                                </div>
                            </div>

                            {/* Price */}
                            <div>
                                <label className="input-label">Price <span style={{ color: 'var(--color-danger)' }}>*</span></label>
                                <div style={{ position: 'relative' }}>
                                    <AiOutlineDollar size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                    <input
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        className="input-field"
                                        placeholder="0.00"
                                        step="0.01"
                                        min="0"
                                        style={{ paddingLeft: '2.25rem' }}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Stock */}
                            <div>
                                <label className="input-label">Stock Quantity <span style={{ color: 'var(--color-danger)' }}>*</span></label>
                                <div style={{ position: 'relative' }}>
                                    <AiOutlineInbox size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                                    <input
                                        type="number"
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                        className="input-field"
                                        placeholder="0"
                                        min="0"
                                        style={{ paddingLeft: '2.25rem' }}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Images */}
                        <div style={{ marginTop: '0.5rem' }}>
                            <label className="input-label" style={{ marginBottom: '0.5rem' }}>
                                {isEdit ? "Product Images (Add more)" : "Product Images"} <span className={isEdit ? "hidden" : "text-danger"}>*</span>
                            </label>

                            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                <input
                                    name="image"
                                    type="file"
                                    id="upload"
                                    className="sr-only"
                                    style={{ display: 'none' }}
                                    multiple
                                    accept="image/*"
                                    onChange={handleImagesChange}
                                    required={!isEdit && previewImages.length === 0}
                                />

                                {/* Upload Button */}
                                <label
                                    htmlFor="upload"
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '2px dashed var(--color-border-strong)',
                                        borderRadius: 'var(--radius-md)',
                                        cursor: 'pointer',
                                        color: 'var(--color-text-muted)',
                                        transition: 'all 0.2s ease',
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.color = 'var(--color-primary)'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border-strong)'; e.currentTarget.style.color = 'var(--color-text-muted)'; }}
                                >
                                    <AiOutlinePlusCircle size={32} />
                                </label>

                                {/* Previews */}
                                {previewImages.map((img, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            width: '80px',
                                            height: '80px',
                                            borderRadius: 'var(--radius-md)',
                                            overflow: 'hidden',
                                            border: '1px solid var(--color-border)',
                                            position: 'relative',
                                        }}
                                    >
                                        <img
                                            src={img}
                                            alt="Preview"
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            onError={(e) => { e.target.style.display = 'none'; }}
                                        />
                                    </div>
                                ))}
                            </div>
                            <p style={{ margin: '0.5rem 0 0', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                Upload multiple images. First image will be the cover.
                            </p>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-full btn-lg"
                            disabled={loading}
                            style={{ marginTop: '1rem', borderRadius: '10px' }}
                        >
                            {loading ? (
                                <>
                                    <span style={{ width: '16px', height: '16px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.75s linear infinite', display: 'inline-block' }} />
                                    Saving...
                                </>
                            ) : isEdit ? "Save Changes" : "Create Product"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;
