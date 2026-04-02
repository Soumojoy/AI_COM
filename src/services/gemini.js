import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.REACT_APP_GEMINI_API_KEY });

export async function generateWebsite(businessInfo, products, onLog = () => {}) {
  const productList = products
    .map(
      (p, i) =>
        `${i + 1}. Name: ${p.name}, Price: ₹${p.price} ${p.unit ? "per " + p.unit : ""}, Image URL: ${p.image}`
    )
    .join("\n");

  const prompt = `You are a professional web developer. Generate a COMPLETE, SINGLE HTML file for a small business online store website.

BUSINESS DETAILS:
- Business Name: ${businessInfo.businessName}
- Business Type: ${businessInfo.businessType}
- Description: ${businessInfo.description}
- Owner Name: ${businessInfo.ownerName}
- Phone: ${businessInfo.phone}
- Email: ${businessInfo.email}
- Address: ${businessInfo.address}

PRODUCTS:
${productList}

REQUIREMENTS:
1. Output ONLY the HTML code. No markdown, no explanation, no backticks.
2. Single HTML file with ALL CSS and JavaScript embedded inside <style> and <script> tags.
3. Modern, clean, attractive design with a professional color scheme that matches the business type.
4. Fully responsive — must look great on mobile, tablet, and desktop.
5. Sections to include:
   a. Navigation bar with business name and smooth scroll links
   b. Hero section with business name, type, and description with a gradient or image background
   c. Products section with a responsive grid of cards. Each card has the product image, name, and price. Make the cards look premium with hover effects.
   d. Contact section with business phone, email, and address displayed nicely
   e. Footer with copyright and business name
6. Use Google Fonts (embed via link tag) for attractive typography.
7. Add smooth scrolling, subtle animations on scroll (CSS only), and hover effects.
8. Use a cohesive color palette — pick colors that suit the business type (e.g., green for grocery, warm tones for bakery, etc.)
9. Product images should use object-fit: cover and have consistent card sizes.
10. Add a WhatsApp "Order Now" button on each product card that opens WhatsApp with a pre-filled message including the product name and price, sent to ${businessInfo.phone}.
11. The HTML must be valid and complete, starting with <!DOCTYPE html>.

Generate the complete HTML file now:`;

  // Try multiple models in order — fallback if one is overloaded or quota-limited
  const models = [
    "gemini-3-flash-preview",
    "gemini-3.1-pro-preview",
    "gemini-2.0-flash",
    "gemini-2.0-flash-lite",
  ];

  const MAX_RETRIES = 4;
  const RETRY_DELAY_MS = 5000;

  let text = "";
  let lastError = null;

  onLog(`Starting generation — ${models.length} models, up to ${MAX_RETRIES} retries on 503...`);

  for (let i = 0; i < models.length; i++) {
    const model = models[i];

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        onLog(`[${i + 1}/${models.length}] Trying ${model}${attempt > 1 ? ` (retry ${attempt}/${MAX_RETRIES})` : ""}...`);
        const response = await ai.models.generateContent({
          model,
          contents: [{ role: "user", parts: [{ text: prompt }] }],
        });
        text = response.text;
        onLog(`✅ Success! Generated with model: ${model}`);
        break;
      } catch (err) {
        const reason = err.message || String(err);
        const is503 = reason.includes("503") || reason.includes("UNAVAILABLE") || reason.includes("high demand");
        const short = reason.length > 100 ? reason.substring(0, 100) + "..." : reason;

        if (is503 && attempt < MAX_RETRIES) {
          onLog(`⏳ ${model} is overloaded. Waiting ${RETRY_DELAY_MS / 1000}s before retry...`);
          await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
          continue;
        }

        onLog(`❌ ${model} failed: ${short}`);
        console.warn(`Model ${model} failed:`, reason);
        lastError = err;
        break; // move to next model
      }
    }

    if (text) break;
  }

  if (!text) {
    onLog(`🚫 All models failed. Please try again later.`);
    throw new Error(lastError?.message || "All models failed. Please try again later.");
  }

  // Strip markdown code fences if present
  text = text.replace(/^```html?\s*/i, "").replace(/```\s*$/i, "").trim();

  return text;
}
