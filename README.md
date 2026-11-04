# SCSCIT JOB-AUTHENTICATOR // Real vs. Fake Job Posting Detector

An end-to-end full-stack AI/ML application for predicting and authenticating online job listings developed under the **School of Computer Science & Information Technology (SCSCIT)**. Built with a **FastAPI** machine learning backend powered by **Scikit-Learn** and **NLTK**, and a modern, high-contrast, colorful **Next.js 14** + **Tailwind CSS** dashboard.

---

## 🏗️ Architecture & Model Pipeline

1. **Machine Learning Model**:
   - **Estimator**: Linear Support Vector Classifier (`LinearSVC`) with `CalibratedClassifierCV` (sigmoid calibration) trained to yield probability distributions (`predict_proba`).
   - **Vectorization**: `TfidfVectorizer` extracting up to 6,000 unigrams and bigrams (`ngram_range=(1, 2)`).
2. **NLP Preprocessing Pipeline**:
   - Lowercase transformation.
   - HTML tag stripping (`<[^>]+>`).
   - Regular expression URL removal (`http\S+|www\.\S+|https\S+`).
   - Email address stripping (`\S+@\S+`).
   - Punctuation & number removal (`[^a-zA-Z\s]`).
   - Lemmatization via `nltk.stem.WordNetLemmatizer` & English stopword removal (`token length > 2`).
3. **Dual-Layer Heuristic Red-Flag Engine**:
   - Financial scam keyword detection (*wire transfer*, *western union*, *cryptocurrency*, *cashier check*, *upfront processing fees*).
   - Suspicious unverified communication channels (*Telegram interview*, *WhatsApp interview*).
   - Company Logo verification flag.
   - Vague or missing corporate background profile flag.
   - Public free email domains (*@gmail.com*, *@yahoo.com*) used for recruiting.
   - Abnormally brief job description check.

---

## 📁 Project Structure

```
fake-job-detector/
├── backend/
│   ├── best_fake_job_model.joblib     # Trained CalibratedClassifierCV model
│   ├── tfidf_vectorizer.joblib        # Fitted 6000-feature TfidfVectorizer
│   ├── main.py                        # FastAPI application & NLP endpoints
│   ├── requirements.txt               # Backend dependencies
│   ├── Procfile                       # Deployment configuration (Render / Railway / Heroku)
│   └── venv/                          # Local Python virtual environment
├── frontend/
│   ├── src/
│   │   └── app/
│   │       ├── globals.css            # Tailwind CSS & glassmorphic styling
│   │       ├── layout.tsx             # Root layout with dark mode metadata
│   │       └── page.tsx               # Next.js interactive dashboard & sample loaders
│   ├── public/
│   ├── package.json                   # Next.js & Lucide dependencies
│   ├── tailwind.config.ts             # Tailwind CSS theme configuration
│   ├── tsconfig.json                  # TypeScript compiler settings
│   ├── .env.local                     # Local environment configuration
│   └── .env.example
└── README.md
```

---

## 🚀 Quick Start Guide

### 1. Launch the Backend (FastAPI)

Open a terminal in the project root:

```powershell
# Navigate to backend
cd backend

# Activate the virtual environment
.\venv\Scripts\Activate.ps1

# Run the FastAPI server with live reloading
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

- **API Base URL**: `http://localhost:8000`
- **Interactive Swagger Docs**: `http://localhost:8000/docs`
- **Health Check**: `http://localhost:8000/health`

---

### 2. Launch the Frontend (Next.js)

Open a second terminal in the project root:

```powershell
# Navigate to frontend
cd frontend

# Start the Next.js development server
npm run dev
```

- **Frontend Application**: `http://localhost:3000`

---

## 🧪 Testing the Application

The dashboard includes two one-click sample loader buttons:

1. **Load Fake Sample**:
   - Fills the form with a high-risk scam posting featuring wire transfer requests, Telegram contact interviews, missing corporate profile, and no logo.
   - **Expected Outcome**: **SCAM DETECTED** badge with ~94% risk percentage and itemized heuristic alert tags.
2. **Load Real Sample**:
   - Fills the form with an authentic enterprise software engineering posting with full salary transparency, 401(k) matching, and verified corporate background.
   - **Expected Outcome**: **AUTHENTIC** badge with <1% risk score and zero flags.

---

## 📡 API Specification

### `POST /predict`

#### Request Body
```json
{
  "title": "Senior Software Engineer",
  "company_profile": "Established tech company founded in 2015...",
  "description": "We are seeking a full stack developer...",
  "requirements": "5+ years of experience with React and Python...",
  "benefits": "Competitive compensation, health insurance, 401(k)...",
  "has_company_logo": true
}
```

#### Response Body
```json
{
  "is_fraudulent": false,
  "risk_percentage": 0.79,
  "verdict": "Low Risk (Likely Authentic)",
  "flags": [],
  "confidence_fake": 0.0079,
  "confidence_real": 0.9921,
  "processed_word_count": 58
}
```

