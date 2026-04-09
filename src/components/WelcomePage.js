import React from "react";
import { FaRocket, FaGlobe, FaTrophy, FaShieldAlt, FaChartLine, FaUsers } from "react-icons/fa";
import "./WelcomePage.css";

function WelcomePage({ onGetStarted }) {
  return (
    <div className="welcome-container">
      {/* Hero Section */}
      <section className="welcome-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <FaRocket className="hero-icon" /> Build Your Digital Presence Today
          </h1>
          <p className="hero-subtitle">
            Create a professional website for your small business in minutes. No coding, no hassle!
          </p>
          <button className="btn-get-started" onClick={onGetStarted}>
            Get Started Now →
          </button>
        </div>
        <div className="hero-background">
          <div className="floating-element"></div>
          <div className="floating-element delay-1"></div>
          <div className="floating-element delay-2"></div>
        </div>
      </section>

      {/* Why Your Business Needs a Website Section */}
      <section className="why-section">
        <h2>Why Your Business Needs a Website</h2>
        <div className="benefits-grid">
          {/* Benefit 1: Global Reach */}
          <div className="benefit-card">
            <div className="benefit-icon globe">
              <FaGlobe />
            </div>
            <h3>Global Reach</h3>
            <p>
              Reach customers 24/7 beyond your physical location. Your website works while you're offline and helps customers find you anytime.
            </p>
            <div className="example">
              <strong>Example:</strong> A local shop in Delhi reaches customers from Maharashtra, Karnataka, and beyond.
            </div>
          </div>

          {/* Benefit 2: Build Trust & Credibility */}
          <div className="benefit-card">
            <div className="benefit-icon shield">
              <FaShieldAlt />
            </div>
            <h3>Build Trust & Credibility</h3>
            <p>
              Professional websites establish legitimacy. Customers trust businesses more when they have an online presence with clear information.
            </p>
            <div className="example">
              <strong>Example:</strong> A small boutique displaying customer reviews and professional photos increases customer confidence.
            </div>
          </div>

          {/* Benefit 3: Grow Your Business */}
          <div className="benefit-card">
            <div className="benefit-icon growth">
              <FaChartLine />
            </div>
            <h3>Boost Sales & Growth</h3>
            <p>
              Showcase your products and services online. Make it easy for customers to learn about what you offer and make purchases directly.
            </p>
            <div className="example">
              <strong>Example:</strong> A store with 50 daily foot-traffic customers can reach 500+ through a website and social sharing.
            </div>
          </div>

          {/* Benefit 4: Stand Out from Competitors */}
          <div className="benefit-card">
            <div className="benefit-icon trophy">
              <FaTrophy />
            </div>
            <h3>Stay Ahead of Competitors</h3>
            <p>
              Your competitors likely already have a website. Don't get left behind. A strong online presence is now essential in every industry.
            </p>
            <div className="example">
              <strong>Example:</strong> When customers compare similar businesses, those with websites rank higher in search results.
            </div>
          </div>

          {/* Benefit 5: Cost-Effective Marketing */}
          <div className="benefit-card">
            <div className="benefit-icon users">
              <FaUsers />
            </div>
            <h3>Affordable Marketing</h3>
            <p>
              No expensive advertising needed. Your website is a permanent marketing tool that generates leads and customers passively.
            </p>
            <div className="example">
              <strong>Example:</strong> Traditional ads cost ₹10,000/month. A website costs much less and works indefinitely.
            </div>
          </div>

          {/* Benefit 6: Customer Information Hub */}
          <div className="benefit-card">
            <div className="benefit-icon info">
              <FaRocket />
            </div>
            <h3>One Central Location</h3>
            <p>
              Share your contact info, business hours, location, prices, and unique value proposition in one professional place.
            </p>
            <div className="example">
              <strong>Example:</strong> Instead of multiple social media profiles, customers find everything on your website.
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works - 3 Simple Steps</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Fill Your Details</h3>
            <p>Tell us about your business, what you offer, and your contact information</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Generate Website</h3>
            <p>Our AI instantly creates a professional website tailored to your business</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Get Your Code</h3>
            <p>Download your HTML website and deploy it anywhere you want</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <h2>Join Thousands of Small Business Owners</h2>
        <div className="stats-grid">
          <div className="stat">
            <h4>50%</h4>
            <p>Businesses without websites lose 50% of potential customers</p>
          </div>
          <div className="stat">
            <h4>78%</h4>
            <p>Consumers research online before visiting a business</p>
          </div>
          <div className="stat">
            <h4>3.6x</h4>
            <p>Businesses with websites earn 3.6x more revenue on average</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="welcome-cta">
        <h2>Ready to Transform Your Business?</h2>
        <p>Stop losing customers to competitors. Create your professional website now!</p>
        <button className="btn-get-started-large" onClick={onGetStarted}>
          Get Started Now →
        </button>
      </section>

      {/* Footer */}
      <footer className="welcome-footer">
        <p>No credit card required • Free to use • Takes 5 minutes</p>
      </footer>
    </div>
  );
}

export default WelcomePage;
