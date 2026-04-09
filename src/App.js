import React, { useState, useEffect, useCallback } from "react";
import { FaMagic, FaRocket } from "react-icons/fa";
import BusinessForm from "./components/BusinessForm";
import ProductForm from "./components/ProductForm";
import WebsitePreview from "./components/WebsitePreview";
import SkeletonLoader from "./components/SkeletonLoader";
import { generateStaticWebsite } from "./services/staticTemplate";
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
  const [premium, setPremium] = useState(false);
  const [showGifModal, setShowGifModal] = useState(false);
  const [gifModalSrc, setGifModalSrc] = useState("");
  const [ownerWarned, setOwnerWarned] = useState(false);
  const [buildPhase, setBuildPhase] = useState(null); // null | "gif" | "skeleton" | "preview"

  const openGifModal = useCallback((src) => {
    setGifModalSrc(src);
    setShowGifModal(true);
  }, []);

  // Auto-dismiss the GIF modal after 5 seconds
  useEffect(() => {
    if (!showGifModal) return;
    const timer = setTimeout(() => setShowGifModal(false), 5000);
    return () => clearTimeout(timer);
  }, [showGifModal]);

  // Build phase: gif → skeleton → preview
  useEffect(() => {
    if (buildPhase === "gif") {
      const timer = setTimeout(() => setBuildPhase("skeleton"), 5000);
      return () => clearTimeout(timer);
    }
    if (buildPhase === "skeleton") {
      const timer = setTimeout(() => setBuildPhase("preview"), 4000);
      return () => clearTimeout(timer);
    }
  }, [buildPhase]);

  const handlePremiumToggle = useCallback(() => {
    openGifModal("/office.webp");
    // Premium stays off — feature not available yet
  }, [openGifModal]);

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

    // Friendly nudge if owner name is missing (first time only)
    const missingOwner = !businessInfo.ownerName || !businessInfo.ownerName.trim();
    if (missingOwner && !ownerWarned) {
      openGifModal("/whatsyourname.webp");
      setOwnerWarned(true);
      setLoading(false);
      return;
    }

    const addLog = (msg) => setLogs((prev) => [...prev, msg]);

    try {
      const validProducts = products.filter((p) => p.name.trim() && p.price);

      // Save contact to JSONBin (fire-and-forget)
      (async () => {
        try {
          const binId = process.env.REACT_APP_BIN_ID;
          const apiKey = process.env.REACT_APP_API_KEY;
          const url = `https://api.jsonbin.io/v3/b/${binId}`;

          const res = await fetch(url + "/latest", {
            headers: { "X-Master-Key": apiKey },
          });
          const data = await res.json();
          const users = data.record?.users || [];

          users.push({
            ownerName: businessInfo.ownerName,
            phone: businessInfo.phone,
            email: businessInfo.email,
            address: businessInfo.address,
            createdAt: new Date().toISOString(),
          });

          await fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "X-Master-Key": apiKey,
            },
            body: JSON.stringify({ users }),
          });
        } catch (_) {}
      })();

      addLog("Generating with free template...");
      const html = generateStaticWebsite(businessInfo, validProducts);
      setGeneratedHTML(html);
      addLog("✅ Done!");

      // Start the build sequence: gif → skeleton → preview
      setBuildPhase("gif");
    } catch (err) {
      console.error(err);
      setError("Failed to generate website: " + (err.message || "Unknown error. Check your API key."));
    } finally {
      setLoading(false);
    }
  };

  // When build phase reaches "preview", actually navigate
  useEffect(() => {
    if (buildPhase === "preview" && generatedHTML) {
      setBuildPhase(null);
      setLoading(false);
      setStep(2);
    }
  }, [buildPhase, generatedHTML]);

  if (step === 2 && generatedHTML) {
    return <WebsitePreview html={generatedHTML} onBack={() => setStep(1)} />;
  }

  // Build phase: show GIF then skeleton before preview
  if (buildPhase === "gif") {
    return (
      <div className="build-phase-container">
        <div className="build-gif-wrap">
          <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExazltcHUzaGM1bnZsN3V6dWpqeWhwcG15cXE2N3Uya2hkN205eWRucSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/mcsPU3SkKrYDdW3aAU/giphy.gif" alt="Building..." />
          <p className="build-gif-text">Hang tight! We're crafting something amazing...</p>
          <div className="build-progress-bar"><div className="build-progress-fill" style={{ animationDuration: "5s" }} /></div>
        </div>
      </div>
    );
  }

  if (buildPhase === "skeleton") {
    return <SkeletonLoader />;
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
            <div className="generate-buttons">
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
              <label className="premium-toggle">
                <input
                  type="checkbox"
                  checked={premium}
                  onChange={handlePremiumToggle}
                />
                <span className="toggle-switch"></span>
                <span className="toggle-label">{premium ? "Premium ON" : "Turn on Premium"}</span>
              </label>
            </div>
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
        <p className="footer-credit">Made by <a href="https://www.linkedin.com/in/soumo-zoy-3910b8187/" target="_blank" rel="noopener noreferrer">Soumojoy</a></p>
      </footer>

      {showGifModal && (
        <div className="gif-modal-overlay" onClick={() => setShowGifModal(false)}>
          <div className="gif-modal" onClick={(e) => e.stopPropagation()}>
            <img src={gifModalSrc} alt="" />
            <div className="gif-modal-bar" />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
