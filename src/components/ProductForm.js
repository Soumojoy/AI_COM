import React from "react";
import { FaPlus, FaTrash, FaBoxOpen } from "react-icons/fa";

const UNITS = ["piece", "kg", "litre", "dozen", "pack", "plate", "pair"];

export default function ProductForm({ products, onChange }) {
  const addProduct = () => {
    onChange([...products, { name: "", price: "", unit: "piece", image: "" }]);
  };

  const removeProduct = (index) => {
    onChange(products.filter((_, i) => i !== index));
  };

  const updateProduct = (index, field, value) => {
    const updated = products.map((p, i) =>
      i === index ? { ...p, [field]: value } : p
    );
    onChange(updated);
  };

  return (
    <div className="form-section">
      <h2><FaBoxOpen className="section-icon" /> Your Products</h2>
      <p className="section-desc">Add the products you sell. You can add as many as you want.</p>

      {products.map((product, index) => (
        <div key={index} className="product-card">
          <div className="product-card-header">
            <span className="product-number">Product #{index + 1}</span>
            {products.length > 1 && (
              <button
                type="button"
                className="btn-remove"
                onClick={() => removeProduct(index)}
              >
                <FaTrash /> Remove
              </button>
            )}
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Product Name *</label>
              <input
                type="text"
                placeholder="e.g. Basmati Rice"
                value={product.name}
                onChange={(e) => updateProduct(index, "name", e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Price (₹) *</label>
              <input
                type="number"
                placeholder="e.g. 150"
                value={product.price}
                onChange={(e) => updateProduct(index, "price", e.target.value)}
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label>Unit</label>
              <select
                value={product.unit}
                onChange={(e) => updateProduct(index, "unit", e.target.value)}
              >
                {UNITS.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Image URL</label>
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                value={product.image}
                onChange={(e) => updateProduct(index, "image", e.target.value)}
              />
            </div>
          </div>

          {product.image && (
            <div className="image-preview">
              <img src={product.image} alt={product.name || "Preview"} />
            </div>
          )}
        </div>
      ))}

      <button type="button" className="btn-add" onClick={addProduct}>
        <FaPlus /> Add Another Product
      </button>
    </div>
  );
}
