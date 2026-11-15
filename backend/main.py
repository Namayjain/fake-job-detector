import os
import re
import joblib
import nltk
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional

try:
    nltk.download('stopwords', quiet=True)
    nltk.download('wordnet', quiet=True)
    nltk.download('omw-1.4', quiet=True)
except Exception as e:
    print(f"NLTK download error: {e}")

from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

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
    
    lemmatizer = WordNetLemmatizer()
    try:
        stop_words = set(stopwords.words('english'))
    except Exception:
        nltk.download('stopwords', quiet=True)
        stop_words = set(stopwords.words('english'))

    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(f"Model file not found at {MODEL_PATH}")
    if not os.path.exists(VECTORIZER_PATH):
        raise FileNotFoundError(f"Vectorizer file not found at {VECTORIZER_PATH}")

    model = joblib.load(MODEL_PATH)
    vectorizer = joblib.load(VECTORIZER_PATH)
    yield

app = FastAPI(
    title="SCSCIT Job Authenticator API",
    description="Machine Learning & NLP API for detecting fraudulent job postings",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class JobPostingRequest(BaseModel):
    title: Optional[str] = Field(default="", description="Job title")
    company_profile: Optional[str] = Field(default="", description="Company profile description")
    description: str = Field(..., description="Main job description text")
    requirements: Optional[str] = Field(default="", description="Job requirements")
    benefits: Optional[str] = Field(default="", description="Offered benefits")
    has_company_logo: Optional[bool] = Field(default=True, description="Whether company logo is present")

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
    Cleans raw text before vectorization:
    1. Converts text to lowercase
    2. Strips HTML markup tags
    3. Removes URL links and email addresses
    4. Removes numbers and punctuation
    5. Lemmatizes words and removes common English stopwords
    """
    if not text:
        return ""
    
    text = text.lower()
    text = re.sub(r'<[^>]+>', ' ', text)
    text = re.sub(r'http\S+|www\.\S+|https\S+', ' ', text, flags=re.MULTILINE)
    text = re.sub(r'\S+@\S+', ' ', text)
    text = re.sub(r'[^a-zA-Z\s]', ' ', text)
    
    words = text.split()
    cleaned_tokens = [
        lemmatizer.lemmatize(word) 
        for word in words 
        if word not in stop_words and len(word) > 2
    ]
    
    return " ".join(cleaned_tokens)

def detect_heuristic_flags(request: JobPostingRequest, raw_text: str) -> List[str]:
    """
    Rule-based heuristic checks for suspicious patterns in the posting.
    """
    flags = []
    text_lower = raw_text.lower()
    
    financial_keywords = [
        "wire transfer", "western union", "moneygram", "cryptocurrency", 
        "bitcoin", "cashier check", "cash app", "zelle", "payment transfer",
        "receiving package", "package forwarding", "mystery shopper",
        "processing fee", "registration fee", "upfront payment", "buy equipment yourself"
    ]
    for keyword in financial_keywords:
        if keyword in text_lower:
            flags.append(f"Financial transfer keyword detected: '{keyword}'")

    channel_keywords = [
        "telegram", "interview via telegram", "whatsapp interview", 
        "contact on telegram", "signal messenger", "google hangouts interview"
    ]
    for channel in channel_keywords:
        if channel in text_lower:
            flags.append(f"Unverified messaging channel used for hiring: '{channel}'")

    if not request.has_company_logo:
        flags.append("Company logo is missing (common indicator in scam listings)")

    profile = (request.company_profile or "").strip()
    if not profile or len(profile) < 40:
        flags.append("Company profile is missing or brief")

    public_email = re.search(r'[\w\.-]+@(gmail|yahoo|hotmail|outlook|protonmail)\.com', raw_text, re.IGNORECASE)
    if public_email:
        flags.append(f"Free public email domain used for recruiter contact: '{public_email.group(0)}'")

    unrealistic_claims = [
        "no experience required earn", "earn $1000 daily", "earn $5000 a week", 
        "unlimited income", "immediate start no interview", "urgently hiring wire"
    ]
    for claim in unrealistic_claims:
        if claim in text_lower:
            flags.append(f"Unrealistic income or hiring claim: '{claim}'")

    desc = (request.description or "").strip()
    if len(desc.split()) < 20:
        flags.append("Job description is unusually short")

    return flags

@app.get("/")
def root():
    return {
        "service": "SCSCIT Job Authenticator API",
        "status": "online",
        "model_loaded": model is not None,
        "vectorizer_loaded": vectorizer is not None,
        "docs_url": "/docs"
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "model": "CalibratedClassifierCV (LinearSVC)",
        "features": 6000
    }

@app.post("/predict", response_model=PredictResponse)
def predict_job(posting: JobPostingRequest):
    if model is None or vectorizer is None:
        raise HTTPException(status_code=503, detail="Machine learning models are not loaded.")

    combined_text = f"{posting.title or ''} {posting.company_profile or ''} {posting.description or ''} {posting.requirements or ''} {posting.benefits or ''}".strip()
    
    if not combined_text:
        raise HTTPException(status_code=400, detail="Job posting text cannot be empty.")

    cleaned_text = preprocess_text(combined_text)
    features = vectorizer.transform([cleaned_text])
    
    probabilities = model.predict_proba(features)[0]
    prob_real = float(probabilities[0])
    prob_fake = float(probabilities[1])
    
    risk_percentage = round(prob_fake * 100, 2)
    is_fraudulent = risk_percentage >= 50.0
    verdict = "High Risk (Likely Fake)" if is_fraudulent else "Low Risk (Likely Authentic)"
    
    heuristic_flags = detect_heuristic_flags(posting, combined_text)
    
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
