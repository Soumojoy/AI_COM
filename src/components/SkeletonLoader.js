import React from "react";
import { motion } from "framer-motion";

const shimmer = {
  initial: { x: "-100%" },
  animate: { x: "100%" },
  transition: { repeat: Infinity, duration: 1.2, ease: "easeInOut" },
};

function SkeletonBlock({ width = "100%", height = "20px", radius = "8px", style }) {
  return (
    <div className="skeleton-block" style={{ width, height, borderRadius: radius, ...style }}>
      <motion.div className="skeleton-shimmer" {...shimmer} />
    </div>
  );
}

export default function SkeletonLoader() {
  return (
    <motion.div
      className="skeleton-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Fake nav */}
      <div className="skeleton-nav">
        <SkeletonBlock width="140px" height="28px" radius="8px" />
        <div className="skeleton-nav-links">
          <SkeletonBlock width="60px" height="16px" radius="4px" />
          <SkeletonBlock width="60px" height="16px" radius="4px" />
          <SkeletonBlock width="60px" height="16px" radius="4px" />
        </div>
        <SkeletonBlock width="90px" height="32px" radius="16px" />
      </div>

      {/* Fake hero */}
      <div className="skeleton-hero">
        <div className="skeleton-hero-text">
          <SkeletonBlock width="60%" height="40px" radius="8px" />
          <SkeletonBlock width="80%" height="40px" radius="8px" style={{ marginTop: 12 }} />
          <SkeletonBlock width="90%" height="16px" radius="4px" style={{ marginTop: 20 }} />
          <SkeletonBlock width="70%" height="16px" radius="4px" style={{ marginTop: 8 }} />
          <SkeletonBlock width="150px" height="40px" radius="20px" style={{ marginTop: 24 }} />
        </div>
        <div className="skeleton-hero-img">
          <SkeletonBlock width="100%" height="100%" radius="16px" />
        </div>
      </div>

      {/* Fake product grid */}
      <div className="skeleton-section">
        <SkeletonBlock width="200px" height="24px" radius="6px" />
        <SkeletonBlock width="280px" height="14px" radius="4px" style={{ marginTop: 8 }} />
        <div className="skeleton-grid">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="skeleton-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 * i, duration: 0.4 }}
            >
              <SkeletonBlock width="100%" height="160px" radius="12px 12px 0 0" />
              <div className="skeleton-card-body">
                <SkeletonBlock width="70%" height="16px" radius="4px" />
                <SkeletonBlock width="40%" height="12px" radius="4px" style={{ marginTop: 8 }} />
                <div className="skeleton-card-row">
                  <SkeletonBlock width="60px" height="18px" radius="4px" />
                  <SkeletonBlock width="32px" height="32px" radius="50%" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Building text */}
      <motion.p
        className="skeleton-status"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        Building your website...
      </motion.p>
    </motion.div>
  );
}
