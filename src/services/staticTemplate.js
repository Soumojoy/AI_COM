// Static template generator for the FREE tier — no Gemini API call needed.
// Design inspired by DelishDrop — dark hero, bold typography, trust badges, promo banners, ratings

const BUSINESS_COLORS = {
  "Grocery Store": { primary: "#1B6B3A", primaryDark: "#14532d", accent: "#86efac", accentLight: "#f0fdf4", hero: "#14532d", heroBg: "linear-gradient(135deg,#14532d 0%,#166534 60%,#1a7a42 100%)", gradient: "135deg,#f0fdf4,#dcfce7,#d1fae5" },
  "Clothing Store": { primary: "#7c3aed", primaryDark: "#5b21b6", accent: "#d8b4fe", accentLight: "#faf5ff", hero: "#5b21b6", heroBg: "linear-gradient(135deg,#5b21b6 0%,#7c3aed 60%,#8b5cf6 100%)", gradient: "135deg,#faf5ff,#f3e8ff,#ede9fe" },
  "Electronics Shop": { primary: "#2563eb", primaryDark: "#1e3a8a", accent: "#93c5fd", accentLight: "#eff6ff", hero: "#1e3a8a", heroBg: "linear-gradient(135deg,#1e3a8a 0%,#2563eb 60%,#3b82f6 100%)", gradient: "135deg,#eff6ff,#dbeafe,#e0e7ff" },
  "Bakery": { primary: "#ea580c", primaryDark: "#9a3412", accent: "#fdba74", accentLight: "#fff7ed", hero: "#9a3412", heroBg: "linear-gradient(135deg,#9a3412 0%,#ea580c 60%,#f97316 100%)", gradient: "135deg,#fff7ed,#ffedd5,#fed7aa" },
  "Restaurant / Cafe": { primary: "#dc2626", primaryDark: "#991b1b", accent: "#fca5a5", accentLight: "#fef2f2", hero: "#991b1b", heroBg: "linear-gradient(135deg,#991b1b 0%,#dc2626 60%,#ef4444 100%)", gradient: "135deg,#fef2f2,#fee2e2,#fecaca" },
  "Pharmacy": { primary: "#0891b2", primaryDark: "#155e75", accent: "#67e8f9", accentLight: "#ecfeff", hero: "#155e75", heroBg: "linear-gradient(135deg,#155e75 0%,#0891b2 60%,#06b6d4 100%)", gradient: "135deg,#ecfeff,#cffafe,#a5f3fc" },
  "Salon / Spa": { primary: "#db2777", primaryDark: "#9d174d", accent: "#f9a8d4", accentLight: "#fdf2f8", hero: "#9d174d", heroBg: "linear-gradient(135deg,#9d174d 0%,#db2777 60%,#ec4899 100%)", gradient: "135deg,#fdf2f8,#fce7f3,#fbcfe8" },
  "Hardware Store": { primary: "#ca8a04", primaryDark: "#854d0e", accent: "#fde047", accentLight: "#fefce8", hero: "#854d0e", heroBg: "linear-gradient(135deg,#854d0e 0%,#ca8a04 60%,#eab308 100%)", gradient: "135deg,#fefce8,#fef9c3,#fef08a" },
  "Stationery Shop": { primary: "#4f46e5", primaryDark: "#3730a3", accent: "#a5b4fc", accentLight: "#eef2ff", hero: "#3730a3", heroBg: "linear-gradient(135deg,#3730a3 0%,#4f46e5 60%,#6366f1 100%)", gradient: "135deg,#eef2ff,#e0e7ff,#c7d2fe" },
  "Flower Shop": { primary: "#e11d48", primaryDark: "#9f1239", accent: "#fda4af", accentLight: "#fff1f2", hero: "#9f1239", heroBg: "linear-gradient(135deg,#9f1239 0%,#e11d48 60%,#f43f5e 100%)", gradient: "135deg,#fff1f2,#ffe4e6,#fecdd3" },
  "Jewellery Store": { primary: "#d97706", primaryDark: "#92400e", accent: "#fcd34d", accentLight: "#fffbeb", hero: "#92400e", heroBg: "linear-gradient(135deg,#92400e 0%,#d97706 60%,#f59e0b 100%)", gradient: "135deg,#fffbeb,#fef3c7,#fde68a" },
  "Book Store": { primary: "#57534e", primaryDark: "#292524", accent: "#d6d3d1", accentLight: "#fafaf9", hero: "#292524", heroBg: "linear-gradient(135deg,#292524 0%,#57534e 60%,#78716c 100%)", gradient: "135deg,#fafaf9,#f5f5f4,#e7e5e4" },
  "Mobile / Repair Shop": { primary: "#475569", primaryDark: "#1e293b", accent: "#cbd5e1", accentLight: "#f8fafc", hero: "#1e293b", heroBg: "linear-gradient(135deg,#1e293b 0%,#475569 60%,#64748b 100%)", gradient: "135deg,#f8fafc,#f1f5f9,#e2e8f0" },
  "Furniture Store": { primary: "#a16207", primaryDark: "#713f12", accent: "#fbbf24", accentLight: "#fefce8", hero: "#713f12", heroBg: "linear-gradient(135deg,#713f12 0%,#a16207 60%,#ca8a04 100%)", gradient: "135deg,#fefce8,#fef9c3,#fef08a" },
  Other: { primary: "#2563eb", primaryDark: "#1e3a8a", accent: "#93c5fd", accentLight: "#eff6ff", hero: "#1e3a8a", heroBg: "linear-gradient(135deg,#1e3a8a 0%,#2563eb 60%,#3b82f6 100%)", gradient: "135deg,#eff6ff,#dbeafe,#e0e7ff" },
};

const PLACEHOLDER_IMAGES = {
  "Grocery Store": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop",
  "Clothing Store": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
  "Electronics Shop": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
  "Bakery": "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
  "Restaurant / Cafe": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
  "Pharmacy": "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&h=300&fit=crop",
  "Salon / Spa": "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop",
  "Hardware Store": "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop",
  "Stationery Shop": "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=300&fit=crop",
  "Flower Shop": "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400&h=300&fit=crop",
  "Jewellery Store": "https://images.unsplash.com/photo-1515562141589-67f0d578f38e?w=400&h=300&fit=crop",
  "Book Store": "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=300&fit=crop",
  "Mobile / Repair Shop": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
  "Furniture Store": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
  Other: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
};

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function generateStaticWebsite(businessInfo, products) {
  const colors = BUSINESS_COLORS[businessInfo.businessType] || BUSINESS_COLORS.Other;
  const fallbackImg = PLACEHOLDER_IMAGES[businessInfo.businessType] || PLACEHOLDER_IMAGES.Other;
  const phone = escapeHtml(businessInfo.phone);
  const waPhone = businessInfo.phone.replace(/\D/g, "");

  // Featured product (first product with image or fallback)
  const featured = products[0] || { name: "Our Products", price: "", unit: "", image: "" };
  const featuredImg = featured.image || fallbackImg;

  // Top picks (up to 3 products for the hero area)
  const topPicks = products.slice(0, 3);
  const topPickCards = topPicks.map((p, idx) => {
    const img = p.image || fallbackImg;
    return `
      <div class="top-pick-card" style="animation-delay:${idx * 0.12}s">
        <div class="top-pick-img"><img src="${escapeHtml(img)}" alt="${escapeHtml(p.name)}" loading="lazy" onerror="this.src='https://placehold.co/120x120/${colors.primary.slice(1)}/fff?text=${encodeURIComponent(p.name.charAt(0))}'"/></div>
        <div class="top-pick-info">
          <h4>${escapeHtml(p.name)}</h4>
          <p class="top-pick-price">₹${escapeHtml(p.price)}${p.unit ? '<span>/' + escapeHtml(p.unit) + '</span>' : ''}</p>
        </div>
      </div>`;
  }).join("\n");

  // All product cards
  const productCards = products
    .map((p, idx) => {
      const img = p.image || fallbackImg;
      const waMsg = encodeURIComponent(`Hi! I'd like to order *${p.name}* (₹${p.price}${p.unit ? "/" + p.unit : ""}) from ${businessInfo.businessName}.`);
      const rating = (4 + Math.random() * 0.9).toFixed(1);
      const cal = Math.floor(200 + Math.random() * 600);
      const time = Math.floor(10 + Math.random() * 30);
      return `
        <div class="product-card" style="animation-delay:${idx * 0.06}s">
          <div class="product-img-wrap">
            <span class="product-rating-badge">★ ${rating}</span>
            <img src="${escapeHtml(img)}" alt="${escapeHtml(p.name)}" loading="lazy" onerror="this.src='https://placehold.co/400x300/f1f5f9/64748b?text=${encodeURIComponent(p.name)}'"/>
          </div>
          <div class="product-info">
            <h3>${escapeHtml(p.name)}</h3>
            <p class="product-meta">${time} min · ${cal} Cal</p>
            <div class="price-row">
              <p class="price">₹${escapeHtml(p.price)}${p.unit ? " <span>/ " + escapeHtml(p.unit) + "</span>" : ""}</p>
              <a class="btn-add" href="https://wa.me/${waPhone}?text=${waMsg}" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              </a>
            </div>
          </div>
        </div>`;
    })
    .join("\n");

  // Promo banners (dynamic based on product count)
  const promoColors = [
    { bg: "#FEF3C7", text: "#92400E", accent: "#F59E0B" },
    { bg: colors.primaryDark, text: "#ffffff", accent: colors.accent },
    { bg: "#FEE2E2", text: "#991B1B", accent: "#EF4444" },
  ];
  const promoMessages = [
    { title: "MADE FRESH &amp; SERVED HOT", sub: `Up to <strong>40%</strong> off`, cta: "Order Now" },
    { title: `${escapeHtml(businessInfo.businessName)} SPECIALS`, sub: `Up to <strong>30%</strong> off`, cta: "Shop Now" },
    { title: "SUPER DEALS", sub: `Up to <strong>50%</strong> off`, cta: "Order Now" },
  ];

  const promoBanners = promoMessages.slice(0, Math.min(3, Math.max(1, Math.ceil(products.length / 3)))).map((promo, i) => {
    const c = promoColors[i % promoColors.length];
    return `
      <div class="promo-banner" style="background:${c.bg};color:${c.text};">
        <div class="promo-content">
          <p class="promo-label">${promo.title}</p>
          <p class="promo-discount">${promo.sub}</p>
          <a class="promo-cta" href="#products" style="background:${c.accent};color:#fff;">${promo.cta} →</a>
        </div>
      </div>`;
  }).join("\n");

  // Category tags
  const tags = [businessInfo.businessType, "Quality Products", "WhatsApp Orders", "Fast Delivery", "Local Business"]
    .filter(Boolean)
    .map(t => `<span class="cat-pill">${escapeHtml(t)}</span>`)
    .join("");

  // Flash deal cards (up to 4 products)
  const flashDeals = products.slice(0, Math.min(4, products.length)).map((p, idx) => {
    const img = p.image || fallbackImg;
    const originalPrice = (parseFloat(p.price) * (1.2 + Math.random() * 0.3)).toFixed(0);
    const waMsg = encodeURIComponent(`Hi! I'd like to order *${p.name}* (₹${p.price}${p.unit ? "/" + p.unit : ""}) from ${businessInfo.businessName}.`);
    return `
      <div class="flash-card">
        <div class="flash-img"><img src="${escapeHtml(img)}" alt="${escapeHtml(p.name)}" loading="lazy" onerror="this.src='https://placehold.co/100x100/f1f5f9/64748b?text=${encodeURIComponent(p.name.charAt(0))}'"/></div>
        <div class="flash-info">
          <h4>${escapeHtml(p.name)}</h4>
          <div class="flash-prices">
            <span class="flash-new">₹${escapeHtml(p.price)}</span>
            <span class="flash-old">₹${originalPrice}</span>
          </div>
        </div>
        <a class="flash-btn" href="https://wa.me/${waPhone}?text=${waMsg}" target="_blank" rel="noopener">Add to cart</a>
      </div>`;
  }).join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${escapeHtml(businessInfo.businessName)} — ${escapeHtml(businessInfo.businessType)}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
<style>
:root{--primary:${colors.primary};--primary-dark:${colors.primaryDark};--accent:${colors.accent};--accent-light:${colors.accentLight};--hero-bg:${colors.heroBg};--bg:#fafafa;--card:#ffffff;--text:#1a1a2e;--text-muted:#64748b;--radius:16px;--radius-sm:10px}
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{font-family:'Inter',system-ui,sans-serif;color:var(--text);background:var(--bg);-webkit-font-smoothing:antialiased}
a{text-decoration:none;color:inherit}

/* === NAV === */
nav{position:fixed;top:0;left:0;right:0;z-index:100;background:var(--primary-dark);display:flex;align-items:center;justify-content:space-between;padding:.7rem 2.5rem;transition:box-shadow .3s}
nav.scrolled{box-shadow:0 2px 20px rgba(0,0,0,.15)}
.nav-brand{display:flex;align-items:center;gap:.6rem;color:#fff;font-weight:800;font-size:1.15rem}
.nav-brand .brand-icon{width:32px;height:32px;background:var(--accent);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:.9rem}
.nav-links{display:flex;gap:.3rem;align-items:center}
.nav-links a{color:rgba(255,255,255,.75);font-size:.85rem;font-weight:500;padding:.4rem 1rem;border-radius:8px;transition:all .2s}
.nav-links a:hover,.nav-links a.active{color:#fff;background:rgba(255,255,255,.1)}
.nav-right{display:flex;align-items:center;gap:.8rem}
.nav-cart{color:rgba(255,255,255,.8);font-size:.85rem;font-weight:500;display:flex;align-items:center;gap:.3rem;cursor:pointer}
.nav-login{background:rgba(255,255,255,.15);color:#fff;padding:.4rem 1.2rem;border-radius:20px;font-size:.8rem;font-weight:600;border:1px solid rgba(255,255,255,.25);cursor:pointer;transition:all .2s}
.nav-login:hover{background:rgba(255,255,255,.25)}
@media(max-width:768px){nav{padding:.5rem 1rem}.nav-links{display:none}}

/* === HERO === */
.hero{background:var(--hero-bg);padding:5rem 2.5rem 3rem;position:relative;overflow:hidden;min-height:520px}
.hero::after{content:'';position:absolute;bottom:0;left:0;right:0;height:80px;background:linear-gradient(to top,var(--bg),transparent)}
.hero-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1.1fr 1fr;gap:3rem;align-items:center}
.hero-text{color:#fff;z-index:1}
.hero-rating{display:inline-flex;align-items:center;gap:.4rem;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);padding:.3rem .8rem;border-radius:20px;font-size:.75rem;color:rgba(255,255,255,.9);margin-bottom:1rem;font-weight:500}
.hero-rating .stars{color:#fbbf24}
.hero-title{font-size:clamp(2rem,5vw,3.5rem);font-weight:900;line-height:1.1;letter-spacing:-.02em;margin-bottom:1rem}
.hero-title span{color:var(--accent)}
.hero-desc{color:rgba(255,255,255,.7);font-size:.95rem;line-height:1.7;margin-bottom:1.5rem;max-width:480px}
.hero-cta{display:inline-flex;align-items:center;gap:.5rem;background:var(--accent);color:var(--primary-dark);padding:.7rem 1.8rem;border-radius:30px;font-weight:700;font-size:.9rem;transition:all .25s;border:none;cursor:pointer}
.hero-cta:hover{transform:translateY(-2px);box-shadow:0 8px 25px rgba(0,0,0,.2)}
.hero-trust{display:flex;align-items:center;gap:.8rem;margin-top:1.5rem}
.hero-avatars{display:flex}
.hero-avatars .avatar{width:32px;height:32px;border-radius:50%;border:2px solid var(--primary-dark);background:var(--accent);display:flex;align-items:center;justify-content:center;font-size:.65rem;font-weight:700;color:var(--primary-dark);margin-left:-8px}
.hero-avatars .avatar:first-child{margin-left:0}
.hero-trust-text{color:rgba(255,255,255,.8);font-size:.8rem;font-weight:500}
.hero-trust-text strong{color:#fbbf24}

.hero-visual{position:relative;z-index:1;display:flex;align-items:center;justify-content:center}
.hero-img-main{width:100%;max-width:400px;border-radius:20px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.3);position:relative}
.hero-img-main img{width:100%;height:320px;object-fit:cover;display:block}
.hero-badge{position:absolute;bottom:-10px;right:-10px;background:var(--card);border-radius:12px;padding:.5rem .8rem;display:flex;align-items:center;gap:.3rem;box-shadow:0 4px 20px rgba(0,0,0,.1);font-size:.75rem;font-weight:600}
.hero-badge .badge-star{color:#fbbf24}
@media(max-width:768px){.hero-inner{grid-template-columns:1fr;text-align:center}.hero-desc{margin-left:auto;margin-right:auto}.hero-trust{justify-content:center}.hero-visual{margin-top:1.5rem}.hero-img-main{max-width:300px}.hero{padding:5rem 1.2rem 3rem;min-height:auto}}

/* === TOP PICKS (horizontal scroll) === */
.top-picks{max-width:1200px;margin:-2rem auto 0;padding:0 2.5rem;position:relative;z-index:2}
.top-picks-row{display:flex;gap:1rem;overflow-x:auto;padding-bottom:.5rem;scrollbar-width:none;-ms-overflow-style:none}
.top-picks-row::-webkit-scrollbar{display:none}
.top-pick-card{flex:0 0 auto;width:200px;background:var(--card);border-radius:var(--radius);padding:1rem;box-shadow:0 2px 12px rgba(0,0,0,.06);transition:transform .2s,box-shadow .2s;animation:fadeUp .5s ease both}
.top-pick-card:hover{transform:translateY(-4px);box-shadow:0 8px 30px rgba(0,0,0,.1)}
.top-pick-img{width:100%;height:120px;border-radius:var(--radius-sm);overflow:hidden;margin-bottom:.6rem;background:linear-gradient(${colors.gradient})}
.top-pick-img img{width:100%;height:100%;object-fit:cover}
.top-pick-info h4{font-size:.85rem;font-weight:700;margin-bottom:.2rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.top-pick-price{font-size:.9rem;font-weight:800;color:var(--primary)}
.top-pick-price span{font-size:.7rem;font-weight:400;color:var(--text-muted)}
@media(max-width:768px){.top-picks{padding:0 1rem}}

/* === PROMO BANNERS === */
.promo-section{max-width:1200px;margin:2.5rem auto;padding:0 2.5rem}
.promo-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1rem}
.promo-banner{border-radius:var(--radius);padding:1.8rem;position:relative;overflow:hidden;transition:transform .2s}
.promo-banner:hover{transform:translateY(-3px)}
.promo-content{position:relative;z-index:1}
.promo-label{font-size:.7rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:.4rem;opacity:.8}
.promo-discount{font-size:1.6rem;font-weight:900;line-height:1.2;margin-bottom:.8rem}
.promo-discount strong{font-size:2rem}
.promo-cta{display:inline-block;padding:.4rem 1rem;border-radius:20px;font-size:.75rem;font-weight:700;transition:transform .2s}
.promo-cta:hover{transform:scale(1.05)}
@media(max-width:768px){.promo-section{padding:0 1rem}}

/* === CATEGORIES === */
.categories{max-width:1200px;margin:3rem auto;padding:0 2.5rem}
.section-header{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:1.5rem;flex-wrap:wrap;gap:.5rem}
.section-title{font-size:clamp(1.3rem,2.5vw,1.8rem);font-weight:800;letter-spacing:-.01em}
.section-sub{color:var(--text-muted);font-size:.85rem;margin-top:.2rem}
.section-link{color:var(--primary);font-size:.85rem;font-weight:600;display:flex;align-items:center;gap:.3rem}
.cat-row{display:flex;gap:1rem;overflow-x:auto;padding-bottom:.5rem;scrollbar-width:none;-ms-overflow-style:none}
.cat-row::-webkit-scrollbar{display:none}
.cat-pill{flex:0 0 auto;padding:.5rem 1.2rem;border-radius:25px;font-size:.82rem;font-weight:600;border:1.5px solid #e2e8f0;color:var(--text-muted);transition:all .2s;cursor:pointer;background:var(--card)}
.cat-pill:hover{border-color:var(--primary);color:var(--primary);background:var(--accent-light)}
@media(max-width:768px){.categories{padding:0 1rem}}

/* === PRODUCTS === */
.products{max-width:1200px;margin:2rem auto;padding:0 2.5rem}
.products-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:1rem}

.product-card{background:var(--card);border-radius:var(--radius);overflow:hidden;transition:transform .3s,box-shadow .3s;animation:fadeUp .5s ease both;border:1px solid #f0f0f0}
.product-card:hover{transform:translateY(-5px);box-shadow:0 12px 40px rgba(0,0,0,.08)}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}

.product-img-wrap{width:100%;height:200px;overflow:hidden;background:linear-gradient(${colors.gradient});position:relative}
.product-img-wrap img{width:100%;height:100%;object-fit:cover;transition:transform .4s}
.product-card:hover .product-img-wrap img{transform:scale(1.05)}
.product-rating-badge{position:absolute;top:.6rem;left:.6rem;background:rgba(0,0,0,.6);backdrop-filter:blur(8px);color:#fbbf24;font-size:.72rem;font-weight:700;padding:.2rem .5rem;border-radius:6px;z-index:1;display:flex;align-items:center;gap:.2rem}

.product-info{padding:1rem 1.2rem 1.2rem}
.product-info h3{font-size:.92rem;font-weight:700;margin-bottom:.15rem}
.product-meta{font-size:.72rem;color:var(--text-muted);margin-bottom:.6rem}
.price-row{display:flex;align-items:center;justify-content:space-between}
.product-info .price{font-size:1.05rem;font-weight:800;color:var(--primary)}
.product-info .price span{font-size:.72rem;font-weight:400;color:var(--text-muted)}
.btn-add{width:32px;height:32px;border-radius:50%;background:var(--primary);color:#fff;display:flex;align-items:center;justify-content:center;transition:all .2s;flex-shrink:0}
.btn-add:hover{transform:scale(1.1);box-shadow:0 4px 12px color-mix(in srgb,var(--primary) 40%,transparent)}
@media(max-width:768px){.products{padding:0 1rem}}

/* === FLASH DEALS === */
.flash-section{max-width:1200px;margin:3rem auto;padding:0 2.5rem}
.flash-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1rem}
.flash-card{background:var(--card);border-radius:var(--radius);padding:1rem;display:flex;align-items:center;gap:1rem;border:1px solid #f0f0f0;transition:transform .2s,box-shadow .2s}
.flash-card:hover{transform:translateY(-3px);box-shadow:0 8px 25px rgba(0,0,0,.06)}
.flash-img{width:70px;height:70px;border-radius:var(--radius-sm);overflow:hidden;flex-shrink:0;background:linear-gradient(${colors.gradient})}
.flash-img img{width:100%;height:100%;object-fit:cover}
.flash-info{flex:1;min-width:0}
.flash-info h4{font-size:.82rem;font-weight:700;margin-bottom:.3rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.flash-prices{display:flex;align-items:center;gap:.4rem}
.flash-new{font-size:.9rem;font-weight:800;color:var(--primary)}
.flash-old{font-size:.75rem;color:var(--text-muted);text-decoration:line-through}
.flash-btn{flex-shrink:0;background:var(--primary);color:#fff;padding:.35rem .8rem;border-radius:8px;font-size:.7rem;font-weight:700;transition:all .2s;white-space:nowrap}
.flash-btn:hover{opacity:.9;transform:scale(1.03)}
@media(max-width:768px){.flash-section{padding:0 1rem}}

/* === CONTACT === */
.contact-section{max-width:1200px;margin:3rem auto;padding:0 2.5rem}
.contact-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:1rem}
.contact-card{background:var(--card);border-radius:var(--radius);padding:1.3rem;text-align:center;transition:transform .2s,box-shadow .2s;border:1px solid #f0f0f0}
.contact-card:hover{transform:translateY(-3px);box-shadow:0 8px 25px rgba(0,0,0,.06)}
.contact-card .c-icon{width:44px;height:44px;border-radius:12px;background:var(--accent-light);color:var(--primary);display:flex;align-items:center;justify-content:center;font-size:1.1rem;margin:0 auto .6rem}
.contact-card h4{font-weight:700;margin-bottom:.2rem;font-size:.9rem}
.contact-card p{color:var(--text-muted);font-size:.8rem;word-break:break-word}
.contact-card a{color:var(--primary);font-weight:600}
@media(max-width:768px){.contact-section{padding:0 1rem}}

/* === WHATSAPP FLOATING === */
.wa-float{position:fixed;bottom:1.5rem;right:1.5rem;z-index:99;background:#25d366;color:#fff;width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(37,211,102,.4);transition:transform .2s}
.wa-float:hover{transform:scale(1.1)}
.wa-float svg{width:28px;height:28px}

/* === FOOTER === */
footer{background:var(--primary-dark);color:rgba(255,255,255,.7);padding:2.5rem 2.5rem 1.5rem;margin-top:3rem}
.footer-inner{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1.5fr 1fr 1fr;gap:2rem}
.footer-brand{font-weight:800;font-size:1.1rem;color:#fff;margin-bottom:.6rem;display:flex;align-items:center;gap:.5rem}
.footer-brand .brand-icon{width:28px;height:28px;background:var(--accent);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:.75rem}
.footer-desc{font-size:.8rem;line-height:1.7;opacity:.7}
.footer-col h5{color:#fff;font-weight:700;font-size:.85rem;margin-bottom:.8rem}
.footer-col a{display:block;color:rgba(255,255,255,.6);font-size:.8rem;margin-bottom:.4rem;transition:color .2s}
.footer-col a:hover{color:#fff}
.footer-bottom{max-width:1200px;margin:1.5rem auto 0;padding-top:1rem;border-top:1px solid rgba(255,255,255,.1);text-align:center;font-size:.75rem;opacity:.6}
@media(max-width:768px){.footer-inner{grid-template-columns:1fr}footer{padding:2rem 1rem 1rem}}
</style>
</head>
<body>

<!-- NAV -->
<nav id="main-nav">
  <span class="nav-brand">
    <span class="brand-icon">🏪</span>
    ${escapeHtml(businessInfo.businessName)}
  </span>
  <div class="nav-links">
    <a href="#" class="active">Home</a>
    <a href="#products">Products</a>
    <a href="#deals">Offers</a>
    <a href="#contact">Contact</a>
  </div>
  <div class="nav-right">
    <span class="nav-cart">🛒 Cart(0)</span>
    <a class="nav-login" href="https://wa.me/${waPhone}" target="_blank" rel="noopener">WhatsApp</a>
  </div>
</nav>

<!-- HERO -->
<section class="hero">
  <div class="hero-inner">
    <div class="hero-text">
      <div class="hero-rating"><span class="stars">★★★★★</span> Trusted by locals</div>
      <h1 class="hero-title">Quality <span>${escapeHtml(businessInfo.businessType)}</span> at your doorstep</h1>
      <p class="hero-desc">${escapeHtml(businessInfo.description)}</p>
      <a class="hero-cta" href="#products">Get Started →</a>
      <div class="hero-trust">
        <div class="hero-avatars">
          <span class="avatar">S</span>
          <span class="avatar">A</span>
          <span class="avatar">R</span>
          <span class="avatar">M</span>
        </div>
        <span class="hero-trust-text">1,000+ Happy Customers &nbsp;<strong>★★★★★ 4.8</strong></span>
      </div>
    </div>
    <div class="hero-visual">
      <div class="hero-img-main">
        <img src="${escapeHtml(featuredImg)}" alt="${escapeHtml(featured.name)}" onerror="this.src='https://placehold.co/400x320/${colors.primary.slice(1)}/fff?text=${encodeURIComponent(businessInfo.businessName)}'"/>
        <div class="hero-badge"><span class="badge-star">★</span> Top Rated</div>
      </div>
    </div>
  </div>
</section>

<!-- TOP PICKS -->
${topPicks.length > 0 ? `
<section class="top-picks">
  <div class="top-picks-row">
    ${topPickCards}
  </div>
</section>` : ""}

<!-- PROMO BANNERS -->
<section class="promo-section">
  <div class="promo-grid">
    ${promoBanners}
  </div>
</section>

<!-- CATEGORIES -->
<section class="categories">
  <div class="section-header">
    <div>
      <h2 class="section-title">Explore by Category</h2>
      <p class="section-sub">Browse through our curated selection</p>
    </div>
    <a class="section-link" href="#products">View All →</a>
  </div>
  <div class="cat-row">${tags}</div>
</section>

<!-- PRODUCTS -->
<section class="products" id="products">
  <div class="section-header">
    <div>
      <h2 class="section-title">Our Products</h2>
      <p class="section-sub">Order instantly via WhatsApp</p>
    </div>
  </div>
  <div class="products-grid">
    ${productCards}
  </div>
</section>

<!-- FLASH DEALS -->
${products.length >= 2 ? `
<section class="flash-section" id="deals">
  <div class="section-header">
    <div>
      <h2 class="section-title">Flash Deals: Ending Soon!</h2>
      <p class="section-sub">Grab these offers before they're gone</p>
    </div>
  </div>
  <div class="flash-grid">
    ${flashDeals}
  </div>
</section>` : ""}

<!-- CONTACT -->
<section class="contact-section" id="contact">
  <div class="section-header">
    <div>
      <h2 class="section-title">Get in Touch</h2>
      <p class="section-sub">We'd love to hear from you</p>
    </div>
  </div>
  <div class="contact-grid">
    <div class="contact-card">
      <div class="c-icon">📞</div>
      <h4>Phone</h4>
      <p><a href="tel:${phone}">${phone}</a></p>
    </div>
    ${businessInfo.email ? `
    <div class="contact-card">
      <div class="c-icon">✉️</div>
      <h4>Email</h4>
      <p><a href="mailto:${escapeHtml(businessInfo.email)}">${escapeHtml(businessInfo.email)}</a></p>
    </div>` : ""}
    ${businessInfo.address ? `
    <div class="contact-card">
      <div class="c-icon">📍</div>
      <h4>Visit Us</h4>
      <p>${escapeHtml(businessInfo.address)}</p>
    </div>` : ""}
    <div class="contact-card">
      <div class="c-icon">💬</div>
      <h4>WhatsApp</h4>
      <p><a href="https://wa.me/${waPhone}" target="_blank" rel="noopener">Message us directly</a></p>
    </div>
  </div>
</section>

<!-- FLOATING WHATSAPP -->
<a class="wa-float" href="https://wa.me/${waPhone}" target="_blank" rel="noopener" title="Chat on WhatsApp">
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.593-.757-6.399-2.044l-.459-.334-2.644.886.886-2.644-.334-.459C1.757 15.593 1 13.387 1 11 1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11z"/></svg>
</a>

<!-- FOOTER -->
<footer>
  <div class="footer-inner">
    <div>
      <div class="footer-brand"><span class="brand-icon">🏪</span> ${escapeHtml(businessInfo.businessName)}</div>
      <p class="footer-desc">${escapeHtml(businessInfo.description.substring(0, 120))}${businessInfo.description.length > 120 ? '...' : ''}</p>
    </div>
    <div class="footer-col">
      <h5>Quick Links</h5>
      <a href="#">Home</a>
      <a href="#products">Products</a>
      <a href="#deals">Offers</a>
      <a href="#contact">Contact</a>
    </div>
    <div class="footer-col">
      <h5>Connect</h5>
      <a href="tel:${phone}">📞 ${phone}</a>
      ${businessInfo.email ? `<a href="mailto:${escapeHtml(businessInfo.email)}">✉️ ${escapeHtml(businessInfo.email)}</a>` : ""}
      <a href="https://wa.me/${waPhone}" target="_blank" rel="noopener">💬 WhatsApp</a>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; ${new Date().getFullYear()} ${escapeHtml(businessInfo.businessName)}. All rights reserved.</p>
    <p style="margin-top:.5rem;opacity:.8;">Want a website like this? <a href="https://www.linkedin.com/in/soumo-zoy-3910b8187/" target="_blank" rel="noopener" style="color:var(--accent);font-weight:600;">Contact Soumojoy</a></p>
  </div>
</footer>

<script>
// Sticky nav shadow on scroll
window.addEventListener('scroll',()=>{document.getElementById('main-nav').classList.toggle('scrolled',window.scrollY>20)});
</script>

</body>
</html>`;
}
