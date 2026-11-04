import os
import re
import joblib
import nltk
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional

# Download required NLTK corpora quietly
try:
    nltk.download('stopwords', quiet=True)
    nltk.download('wordnet', quiet=True)
    nltk.download('omw-1.4', quiet=True)
except Exception as e:
    print(f"Warning downloading NLTK corpora: {e}")

from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

# Model and Vectorizer references
model = None
vectorizer = None
lemmatizer = None
stop_words = set()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "best_fake_job_model.joblib")
VECTORIZER_PATH = os.path.join(BASE_DIR, "tfidf_vectorizer.joblib")

@asynccontextmanager
async def lifespan(app: FastAPI):
    global model, vectorizer, lemmatizer, stop_words
    print("Loading ML models and NLP tools...")
    
    # Load lemmatizer and stopwords
    lemmatizer = WordNetLemmatizer()
    try:
        stop_words = set(stopwords.words('english'))
    except Exception:
        nltk.download('stopwords', quiet=True)
        stop_words = set(stopwords.words('english'))

    # Load artifacts
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(f"Model file not found at {MODEL_PATH}")
    if not os.path.exists(VECTORIZER_PATH):
        raise FileNotFoundError(f"Vectorizer file not found at {VECTORIZER_PATH}")

    model = joblib.load(MODEL_PATH)
    vectorizer = joblib.load(VECTORIZER_PATH)
    print("Model and vectorizer loaded successfully!")
    yield
    print("Shutting down...")

app = FastAPI(
    title="Real vs Fake Job Posting Detector API",
    description="Machine Learning & NLP-powered API to detect fraudulent job listings",
    version="1.0.0",
    lifespan=lifespan
)

# Enable CORS for full frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class JobPostingRequest(BaseModel):
    title: Optional[str] = Field(default="", description="Job title")
    company_profile: Optional[str] = Field(default="", description="Company background information")
    description: str = Field(..., description="Job posting description")
    requirements: Optional[str] = Field(default="", description="Candidate requirements")
    benefits: Optional[str] = Field(default="", description="Offered benefits")
    has_company_logo: Optional[bool] = Field(default=True, description="Whether posting includes company logo")

class PredictResponse(BaseModel):
    is_fraudulent: bool
    risk_percentage: float
    verdict: str
    flags: List[str]
    confidence_fake: float
    confidence_real: float
    processed_word_count: int

def preprocess_text(text: str) -> str:
    """
    NLP Preprocessing function:
    1. Lowercase
    2. Strip HTML tags
    3. Regex URL removal
    4. Email stripping
    5. Punctuation & number removal
    6. NLTK lemmatization and English stopword filtering (tokens > 2 chars)
    """
    if not text:
        return ""
    
    # 1. Lowercase
    text = text.lower()
    
    # 2. Strip HTML tags
    text = re.sub(r'<[^>]+>', ' ', text)
    
    # 3. Regex URL removal
    text = re.sub(r'http\S+|www\.\S+|https\S+', ' ', text, flags=re.MULTILINE)
    
    # 4. Email stripping
    text = re.sub(r'\S+@\S+', ' ', text)
    
    # 5. Punctuation and number removal
    text = re.sub(r'[^a-zA-Z\s]', ' ', text)
    
    # 6. Lemmatization and stopword removal (tokens > 2 chars)
    words = text.split()
    cleaned_tokens = [
        lemmatizer.lemmatize(w) 
        for w in words 
        if w not in stop_words and len(w) > 2
    ]
    
    return " ".join(cleaned_tokens)

def detect_heuristic_flags(request: JobPostingRequest, raw_combined: str) -> List[str]:
    """
    Detect heuristic red flags in job posting data.
    """
    flags = []
    text_lower = raw_combined.lower()
    
    # 1. Financial / Wire Transfer scams
    financial_keywords = [
        "wire transfer", "western union", "moneygram", "cryptocurrency", 
        "bitcoin", "cashier check", "cash app", "zelle", "payment transfer",
        "receiving package", "package forwarding", "mystery shopper",
        "processing fee", "registration fee", "upfront payment", "buy equipment yourself"
    ]
    for kw in financial_keywords:
        if kw in text_lower:
            flags.append(f"Financial scam trigger phrase detected: '{kw}'")

    # 2. Suspicious interview channels
    channel_keywords = [
        "telegram", "interview via telegram", "whatsapp interview", 
        "contact on telegram", "signal messenger", "google hangouts interview"
    ]
    for ch in channel_keywords:
        if ch in text_lower:
            flags.append(f"Suspicious unverified interview channel detected: '{ch}'")

    # 3. Company Logo check
    if not request.has_company_logo:
        flags.append("Missing company logo (High empirical correlation with scam postings)")

    # 4. Vague or empty company profile
    profile = (request.company_profile or "").strip()
    if not profile or len(profile) < 40:
        flags.append("Vague or missing company profile")

    # 5. Free public email domain in job description
    public_email_match = re.search(r'[\w\.-]+@(gmail|yahoo|hotmail|outlook|protonmail)\.com', raw_combined, re.IGNORECASE)
    if public_email_match:
        flags.append(f"Public free email domain used for recruiting: '{public_email_match.group(0)}'")

    # 6. Unrealistic quick-cash or urgent phrasing
    unrealistic_phrases = [
        "no experience required earn", "earn $1000 daily", "earn $5000 a week", 
        "unlimited income", "immediate start no interview", "urgently hiring wire"
    ]
    for phrase in unrealistic_phrases:
        if phrase in text_lower:
            flags.append(f"Suspicious compensation/hiring claim: '{phrase}'")

    # 7. Extremely brief job description
    desc = (request.description or "").strip()
    if len(desc.split()) < 20:
        flags.append("Abnormally short job description lacking substantive role specifications")

    return flags

@app.get("/")
def read_root():
    return {
        "service": "Real vs Fake Job Posting Detector API",
        "status": "online",
        "model_loaded": model is not None,
        "vectorizer_loaded": vectorizer is not None,
        "docs_url": "/docs"
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "model": "CalibratedClassifierCV",
        "features": 6000
    }

@app.post("/predict", response_model=PredictResponse)
def predict_job(posting: JobPostingRequest):
    if model is None or vectorizer is None:
        raise HTTPException(status_code=503, detail="Model is still initializing or unavailable.")

    # Combine all text fields matching dataset format
    raw_combined = f"{posting.title or ''} {posting.company_profile or ''} {posting.description or ''} {posting.requirements or ''} {posting.benefits or ''}".strip()
    
    if not raw_combined:
        raise HTTPException(status_code=400, detail="Job posting text cannot be entirely empty.")

    # Preprocess text
    cleaned_text = preprocess_text(raw_combined)
    
    # Vectorize
    vectorized_input = vectorizer.transform([cleaned_text])
    
    # Predict probabilities: class 0 = Authentic, class 1 = Fraudulent
    probabilities = model.predict_proba(vectorized_input)[0]
    prob_real = float(probabilities[0])
    prob_fake = float(probabilities[1])
    
    # Risk percentage based on fake probability (0 to 100)
    risk_percentage = round(prob_fake * 100, 2)
    is_fraudulent = risk_percentage >= 50.0
    
    # Verdict string
    verdict = "High Risk (Likely Fake)" if is_fraudulent else "Low Risk (Likely Authentic)"
    
    # Heuristic Red Flags
    heuristic_flags = detect_heuristic_flags(posting, raw_combined)
    
    return PredictResponse(
        is_fraudulent=is_fraudulent,
        risk_percentage=risk_percentage,
        verdict=verdict,
        flags=heuristic_flags,
        confidence_fake=round(prob_fake, 4),
        confidence_real=round(prob_real, 4),
        processed_word_count=len(cleaned_text.split())
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

