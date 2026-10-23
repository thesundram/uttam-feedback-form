# Uttam Galva Innovative Solutions — Visitor Review & Feedback App

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Expo Ready](https://img.shields.io/badge/Expo-Steel_Construction_Expo_Asia_2026-ffc928?style=flat)](https://uttamgalvainnovativesolutions.ai)

An expo-ready, high-performance visitor feedback and review kiosk web application built for **Uttam Galva Innovative Solutions Pvt Ltd** for **Steel Construction Expo Asia 2026 (Stall 608, Mumbai)**.

---

## ✨ Features

- **Branded Kiosk UI**: Premium industrial dark-mode theme with glassmorphism, smooth animations, and gold/navy accents.
- **Interactive Review Flow**: Multi-rating selection, dynamic capabilities showcase, visitor contact info (Name, Email, Phone, Company).
- **Google Sheets Integration**: Instant automated submission logging directly into Google Sheets via Google Apps Script Web App.
- **Branded Thank-You Email**: Automatically sends a professional HTML email with the embedded company logo, expo details, and links without blocking user flow.
- **Mobile & Tablet Optimized**: Responsive layout designed for kiosk touchscreens, iPads, tablets, and smartphones.
- **Enterprise Ready**: Input sanitization, email verification, and rate limiting safeguards.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **UI & Components**: React 19, Vanilla CSS & Tailwind CSS
- **Icons**: [Lucide React](https://lucide.dev/)
- **Email Delivery**: [Nodemailer](https://nodemailer.com/) with DNS-resilient SMTP transport
- **Database / Logging**: Google Sheets (via Google Apps Script)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🚀 Getting Started Locally

### 1. Prerequisites
- Node.js 20.9+
- pnpm (recommended) or npm / yarn

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/uttam-feedback-form.git
cd uttam-feedback-form

# Install dependencies
pnpm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory (refer to `.env.example`):

```env
# Google Apps Script Web App URL for Google Sheets logging
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec

# SMTP Configuration for Thank-You Emails
SMTP_HOST=mail.uttamgalva.in
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=connect@uttamgalva.in
SMTP_PASS=YourSmtpPasswordHere
SMTP_FROM_EMAIL=connect@uttamgalva.in
```

### 4. Run Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📊 Google Sheets Setup (Apps Script)

Deploy a Google Apps Script Web App attached to your Google Sheet:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Responses");
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || "",
      data.company || "",
      data.rating || "",
      data.feedback || "",
      data.source || "Expo",
      data.email || "",
      data.phone || "",
    ]);
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```
Set Web App access to **"Anyone"** and copy the Web App URL into `GOOGLE_SCRIPT_URL`.

---

## 🌐 Deployment on Vercel

1. Push your repository to GitHub (see instructions below).
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your **`uttam-feedback-form`** repository.
4. In the **Environment Variables** section, add:
   - `GOOGLE_SCRIPT_URL`
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_SECURE`
   - `SMTP_USER`
   - `SMTP_PASS`
   - `SMTP_FROM_EMAIL` (optional)
5. Click **Deploy**. Your app will be live with a URL like `https://uttam-feedback-form.vercel.app`.

---

## 📂 Project Structure

```
uttam-feedback-form/
├── public/
│   ├── UttamLogo.png              # Transparent crisp branded logo
│   └── UttamLogo-transparent.png  # Transparent logo variant
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── submit/route.ts          # Handles Google Sheets forwarding
│   │   │   └── send-thank-you/route.ts  # Handles SMTP thank-you email dispatch
│   │   ├── favicon.ico                  # Multi-size tab favicon
│   │   ├── icon.png                     # High-res branded favicon
│   │   ├── globals.css                  # Theme & custom styling
│   │   ├── layout.tsx                   # Site layout & SEO metadata
│   │   └── page.tsx                     # Main page entry
│   ├── components/
│   │   ├── Header.tsx                   # Sticky branded header
│   │   ├── Footer.tsx                   # Centered footer with website link
│   │   ├── ReviewForm.tsx               # Multi-step feedback form
│   │   └── CapabilityVisual.tsx         # Interactive capability cards
│   ├── data/                            # Form questions and review options
│   └── lib/                             # Utility helpers
├── .env.example                         # Environment variable template
└── README.md                            # Documentation
```

---

## 📄 License & Copyright

© 2026 **Uttam Galva Innovative Solutions Pvt Ltd**. All rights reserved.  
Engineering Steel Intelligence · [https://uttamgalvainnovativesolutions.ai](https://uttamgalvainnovativesolutions.ai)
