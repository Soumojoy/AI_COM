import React from "react";
import { FaStore, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const BUSINESS_TYPES = [
  "Grocery Store",
  "Clothing Store",
  "Electronics Shop",
  "Bakery",
  "Restaurant / Cafe",
  "Pharmacy",
  "Salon / Spa",
  "Hardware Store",
  "Stationery Shop",
  "Flower Shop",
  "Jewellery Store",
  "Book Store",
  "Mobile / Repair Shop",
  "Furniture Store",
  "Other",
];

export default function BusinessForm({ data, onChange }) {
  const handleChange = (e) => {
    onChange({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-section">
      <h2><FaStore className="section-icon" /> Business Details</h2>
      <p className="section-desc">Tell us about your business so we can create the perfect website for you.</p>

      <div className="form-grid">
        <div className="form-group">
          <label><FaStore /> Business Name *</label>
          <input
            type="text"
            name="businessName"
            placeholder="e.g. Ram's Grocery Store"
            value={data.businessName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label><FaStore /> Business Type *</label>
          <select name="businessType" value={data.businessType} onChange={handleChange} required>
            <option value="">Select type...</option>
            {BUSINESS_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="form-group full-width">
          <label>Description *</label>
          <textarea
            name="description"
            placeholder="Describe your business in a few lines..."
            value={data.description}
            onChange={handleChange}
            rows={3}
            required
          />
        </div>

        <div className="form-group">
          <label><FaUser /> Owner Name</label>
          <input
            type="text"
            name="ownerName"
            placeholder="Your name"
            value={data.ownerName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label><FaPhone /> Phone Number *</label>
          <input
            type="tel"
            name="phone"
            placeholder="e.g. 9876543210"
            value={data.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label><FaEnvelope /> Email</label>
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            value={data.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label><FaMapMarkerAlt /> Address</label>
          <input
            type="text"
            name="address"
            placeholder="Shop address"
            value={data.address}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
