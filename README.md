# 🛡️ ScamShield — AI-Powered Scam Detector

<div align="center">

![ScamShield Banner](https://img.shields.io/badge/ScamShield-AI%20Powered-blue?style=for-the-badge&logo=shield&logoColor=white)

**Detect scams in seconds — Text, Image, or URL**

[![Live Demo](https://img.shields.io/badge/🔗%20Live%20Demo-Visit%20Now-blue?style=for-the-badge)](https://your-vercel-url.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Source%20Code-black?style=for-the-badge&logo=github)](https://github.com/your-username/scamshield)

</div>

---

## 🚨 The Problem

Every day, **millions of people** fall victim to digital scams fake job offers, phishing links, OTP frauds, and WhatsApp traps.

> 💰 India alone lost **₹1.2 lakh crore** to digital fraud in 2024.

Most people **cannot tell** if a message is a scam or not especially in regional languages. Existing tools are either too technical, English-only, or require IT knowledge.

**ScamShield solves this** paste anything, get an answer in seconds.

---

## ✅ What ScamShield Does

| Feature | Description |
|---|---|
| 📝 **Text Scan** | Paste any WhatsApp message, SMS, or email — AI analyzes instantly |
| 🖼️ **Image Scan** | Upload a screenshot AI reads and detects scam content |
| 🔗 **URL Scan** | Paste a suspicious link AI checks domain, structure, and patterns |
| 🌍 **10 Languages** | Works globally Hindi, English, Spanish, French, Arabic, and more |
| 🏘️ **Community Feed** | Crowdsourced scam reports warn others, protect everyone |
| 📊 **Confidence Score** | AI gives a confidence % with red flags breakdown |
| 🔐 **Google Auth** | Secure login with Google OAuth 2.0 |

---

## 🎯 How It Works

```
User Input (Text / Image / URL)
        ↓
Express API receives request
        ↓
ImageKit CDN stores image (if image scan)
        ↓
LangChain + Gemini 2.5 Flash analyzes content
        ↓
AI returns: Verdict + Confidence + Reason + Red Flags
        ↓
Result saved to MongoDB Atlas
        ↓
User sees: SAFE ✅ / SUSPICIOUS ⚠️ / SCAM ❌
        ↓
User can Report → Community Feed (warns others)
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js | UI framework |
| Tailwind CSS | Styling |
| Redux Toolkit | State management |
| Axios | API calls |
| React Router v6 | Client-side routing |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express.js | Server & REST APIs |
| MongoDB Atlas | Database |
| Mongoose | ODM |
| Multer | Image upload handling |
| JWT + Google OAuth 2.0 | Authentication |

### AI & Storage
| Technology | Purpose |
|---|---|
| Google Gemini 2.5 Flash | Core AI model |
| LangChain.js | AI orchestration |
| ImageKit CDN | Image storage & delivery |

### Deployment
| Service | Purpose |
|---|---|
| Vercel | Frontend hosting |
| Render | Backend hosting |
| MongoDB Atlas | Cloud database |

---

## 📁 Project Structure Overview

```
scamshield/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── scamDetect.controller.js
│   │   │   └── report.controller.js
│   │   ├── models/
│   │   │   ├── scamDetail.model.js
│   │   │   └── user.model.js
│   │   ├── routes/
│   │   │   ├── scan.routes.js
│   │   │   ├── report.routes.js
│   │   │   └── auth.routes.js
│   │   ├── services/
│   │   │   ├── ai.service.js
│   │   │   └── cloudStorage.js
│   │   ├── middleware/
│   │   │   ├── multer.middleware.js
│   │   │   └── auth.middleware.js
│   │   └── app.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── ScanBox.jsx
    │   │   ├── ResultCard.jsx
    │   │   ├── ScamFeedCard.jsx
    │   │   └── Footer.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Result.jsx
    │   │   └── Community.jsx
    │   ├── features/
    │   │   └── reportSlice.js
    │   ├── services/
    │   │   ├── api.service.js
    │   │   └── reported.service.js
    │   ├── hooks/
    │   │   └── useReport.js
    │   └── App.jsx
    └── package.json
```

---

## 🗄️ Database Schema

### ScamDetail Model
```js
{
  inputType:     "text" | "image" | "url",
  category:      "Bank Fraud" | "Job Fraud" | "Phishing" | "OTP Scam" | "Other",
  scamMessage:   String,       // original user input
  verdict:       "SAFE" | "SUSPICIOUS" | "SCAM",
  confidence:    Number,       // 0–100
  language:       String,       // AI explanation in Selected language
  redFlags:      [String],     // list of detected red flags
  isReported:    Boolean,      // reported to community feed
  reportCount:   Number,       // how many users reported same scam
  findRelatable: Boolean       // if ohters users find same scam then they can reported also
  city:          String,       // optional user location
  user:          ObjectId,     // ref to User
  createdAt:     Date
}
```

---

## 🚀 Local Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Google Gemini API key
- ImageKit account
- Google OAuth credentials

### 1. Clone the repo
```bash
git clone https://github.com/Priyanshu/scamshield.git
cd scamshield
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create `.env` file:
```env

MONGODB_URI=mongodb+srv://...
GEMINI_API_KEY=your_gemini_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
```

```bash
npm run dev
```

### 3. Frontend setup
```bash
cd frontend
npm install
```

Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

```bash
npm run dev
```

### 4. Open in browser
```
Frontend: http://localhost:5173
Backend:  http://localhost:5000
```

---

## 🌍 Supported Languages

ScamShield detects and explains scams in **10 languages**:

`Hindi` • `English` • `Spanish` • `French` • `Arabic` • `Portuguese` • `German` • `Korean` • `Chinese` • `Dutch`

---

## 📸 Screenshots

| Home Page | Scan Result | Community Feed |
<img width="1366" height="679" alt="Screenshot (600)" src="https://github.com/user-attachments/assets/115ffc10-57eb-43f5-aaa3-bf1da183e587" />
<img width="1366" height="652" alt="Screenshot (601)" src="https://github.com/user-attachments/assets/591e8edf-9737-4b30-891c-a5a63f262177" />
<img width="1366" height="654" alt="Screenshot (602)" src="https://github.com/user-attachments/assets/cc5e9cb6-e6de-4886-bd64-fed9765e3d91" />

---

## 🔮 Future Roadmap

- [ ] Browser extension for real-time scam detection
- [ ] WhatsApp bot integration
- [ ] Voice input support
- [ ] Scam pattern ML model (custom trained)
- [ ] Email scan support
- [ ] Admin dashboard for scam analytics
- [ ] Mobile app (React Native)

---

## 🏆 Built For

This project was built with **hackathon-level execution** in mind:

- ✅ Real-world problem with massive impact
- ✅ Full-stack AI integration
- ✅ Production deployed & live
- ✅ Global reach — 10 language support
- ✅ Community-driven crowdsourced data

> ⚠️ **Note:** This project is still being polished. UI improvements, edge case handling, and more features are actively being worked on. Feedback is welcome!

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repo
2. Create your branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 👨‍💻 Author

**Your Name**
- LinkedIn: [Priyanshu Pandey](https://www.linkedin.com/in/priyanshu-pandey-b45221385/))
- GitHub: [Priyanshu pandey](https://github.com/Priynanshue)
- Twitter/X: [@PriyanshuK25974](https://x.com/PriyanshuK25974)

---


<div align="center">

**⭐ Star this repo if you found it helpful!**

Made with ❤️ to make the internet safer for everyone.

</div>
