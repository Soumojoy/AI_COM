import React, { useState } from "react";
import { FaMagic, FaRocket } from "react-icons/fa";
import BusinessForm from "./components/BusinessForm";
import ProductForm from "./components/ProductForm";
import WebsitePreview from "./components/WebsitePreview";
import { generateWebsite } from "./services/gemini";
import "./App.css";

const INITIAL_BUSINESS = {
  businessName: "",
  businessType: "",
  description: "",
  ownerName: "",
  phone: "",
  email: "",
  address: "",
};

function App() {
  const [step, setStep] = useState(1); // 1=form, 2=preview
  const [businessInfo, setBusinessInfo] = useState(INITIAL_BUSINESS);
  const [products, setProducts] = useState([
    { name: "", price: "", unit: "piece", image: "" },
  ]);
  const [generatedHTML, setGeneratedHTML] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [logs, setLogs] = useState([]);

  const validate = () => {
    if (!businessInfo.businessName.trim()) return "Please enter your business name.";
    if (!businessInfo.businessType) return "Please select a business type.";
    if (!businessInfo.description.trim()) return "Please add a business description.";
    if (!businessInfo.phone.trim()) return "Please enter your phone number.";
    const validProducts = products.filter((p) => p.name.trim() && p.price);
    if (validProducts.length === 0) return "Please add at least one product with name and price.";
    return null;
  };

  const handleGenerate = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setLogs([]);
    setLoading(true);

    const addLog = (msg) => setLogs((prev) => [...prev, msg]);

    try {
      const validProducts = products.filter((p) => p.name.trim() && p.price);
      const html = await generateWebsite(businessInfo, validProducts, addLog);
      setGeneratedHTML(html);
      setStep(2);
    } catch (err) {
      console.error(err);
      setError("Failed to generate website: " + (err.message || "Unknown error. Check your API key."));
    } finally {
      setLoading(false);
    }
  };

  if (step === 2 && generatedHTML) {
    return <WebsitePreview html={generatedHTML} onBack={() => setStep(1)} />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1><FaRocket className="header-icon" /> AI Website Builder</h1>
          <p>Create a professional website for your shop in minutes — no coding needed!</p>
        </div>
      </header>

      <main className="app-main">
        <div className="builder-container">
          <BusinessForm data={businessInfo} onChange={setBusinessInfo} />
          <ProductForm products={products} onChange={setProducts} />

          {error && <div className="error-message">{error}</div>}

          <div className="generate-section">
            <button
              className="btn-generate"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner" /> Generating your website...
                </>
              ) : (
                <>
                  <FaMagic /> Generate My Website
                </>
              )}
            </button>
            {loading && (
              <p className="loading-hint">
                This may take 15-30 seconds. Our AI is crafting a beautiful website for you!
              </p>
            )}
            {logs.length > 0 && (
              <div className="log-panel">
                {logs.map((log, i) => (
                  <div key={i} className="log-entry">{log}</div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>Built with ❤️ for local shopkeepers everywhere</p>
      </footer>
    </div>
  );
}

export default App;
