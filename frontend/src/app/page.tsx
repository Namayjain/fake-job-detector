"use client";

import React, { useState, useEffect } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Building2,
  Briefcase,
  FileText,
  Award,
  Gift,
  Image as ImageIcon,
  RotateCcw,
  Zap,
  Check,
  Search,
  ExternalLink,
  Info,
  Sliders,
  Layers,
  ArrowRight,
} from "lucide-react";

interface PredictResponse {
  is_fraudulent: boolean;
  risk_percentage: number;
  verdict: string;
  flags: string[];
  confidence_fake: number;
  confidence_real: number;
  processed_word_count: number;
}

const SAMPLE_REAL = {
  title: "Senior Full Stack Software Engineer",
  company_profile:
    "Apex FinTech Technologies is an established financial software company founded in 2014. We develop high-performance distributed trading algorithms and institutional analytics platforms serving over 300 global institutional clients.",
  description:
    "We are seeking an experienced Full Stack Software Engineer to lead the design and development of our next-generation cloud analytics portal. You will build resilient REST & WebSocket microservices using React, TypeScript, Python, and PostgreSQL, collaborating directly with product managers and quantitative researchers.",
  requirements:
    "Bachelor's degree in Computer Science or equivalent practical experience. 5+ years of software engineering experience with React, TypeScript, and modern Python web frameworks. Experience with Docker, CI/CD pipelines, automated testing, and relational database architecture.",
  benefits:
    "Competitive salary ($140,000 - $185,000) + equity package. Comprehensive health, dental, and vision insurance. 401(k) matching up to 5%. 25 days paid annual leave + national holidays. Continuing education budget and remote work flexibility.",
  has_company_logo: true,
};

const SAMPLE_FAKE = {
  title: "Data Entry & Remote Executive Assistant - Urgent Opening",
  company_profile: "",
  description:
    "URGENT HIRING: Earn between $4,500 to $6,500 weekly working from home for only 1 to 2 hours per day! No prior experience, background check, or resume needed. Payouts are dispatched weekly via Western Union or direct wire transfer. Duties include daily email correspondence and receiving forwarded package shipments.",
  requirements:
    "Candidate must have a personal bank account ready to receive direct wire transfer payments and cashier check to purchase home-office equipment from our vendor. Candidate must be available for instant interview on Telegram. Contact @recruiting_manager_global immediately.",
  benefits:
    "Guaranteed instant sign-on cash bonus via Western Union. Fully flexible working schedule. Unlimited income potential.",
  has_company_logo: false,
};

export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    company_profile: "",
    description: "",
    requirements: "",
    benefits: "",
    has_company_logo: true,
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [backendOnline, setBackendOnline] = useState<boolean | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  useEffect(() => {
    async function checkHealth() {
      try {
        const res = await fetch(`${apiUrl}/health`);
        if (res.ok) setBackendOnline(true);
        else setBackendOnline(false);
      } catch {
        setBackendOnline(false);
      }
    }
    checkHealth();
  }, [apiUrl]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, has_company_logo: e.target.checked }));
  };

  const loadSample = (sample: typeof SAMPLE_REAL) => {
    setFormData(sample);
    setError(null);
    setResult(null);
  };

  const clearForm = () => {
    setFormData({
      title: "",
      company_profile: "",
      description: "",
      requirements: "",
      benefits: "",
      has_company_logo: true,
    });
    setResult(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description.trim()) {
      setError("Please provide at least a Job Description to analyze.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.detail || `Server responded with status ${response.status}`);
      }

      const data: PredictResponse = await response.json();
      setResult(data);
      setBackendOnline(true);
    } catch (err: any) {
      console.error("Prediction error:", err);
      setError(
        err.message ||
          "Could not connect to FastAPI backend. Ensure it is running on " + apiUrl
      );
      setBackendOnline(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3.5 flex items-center justify-between">
          
          {/* Logo & Academic Title */}
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900">
                  SCSCIT JOB-AUTHENTICATOR
                </span>
                <span className="hidden sm:inline-flex text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                  AI/ML Edition
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                School of Computer Science & Information Technology &bull; Academic Subject Project
              </p>
            </div>
          </div>

          {/* Backend Status indicator */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  backendOnline === true
                    ? "bg-emerald-500 animate-pulse"
                    : backendOnline === false
                    ? "bg-rose-500"
                    : "bg-amber-400"
                }`}
              ></span>
              <span className="text-slate-600 hidden sm:inline">Backend API:</span>
              <strong
                className={
                  backendOnline === true
                    ? "text-emerald-700"
                    : backendOnline === false
                    ? "text-rose-600"
                    : "text-amber-600"
                }
              >
                {backendOnline === true
                  ? "Connected (8000)"
                  : backendOnline === false
                  ? "Disconnected"
                  : "Checking..."}
              </strong>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow">
        
        {/* Hero Banner with Sample Loaders */}
        <div className="mb-8 p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-violet-100 text-violet-800">
                Natural Language Processing
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-blue-100 text-blue-800">
                Calibrated LinearSVC
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-amber-100 text-amber-800">
                18,000 Trained Samples
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Real vs. Fake Job Posting Verification
            </h1>
            <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
              Analyze job vacancy announcements using TF-IDF n-gram vectorization, machine learning classification, and empirical heuristic scam detection.
            </p>
          </div>

          {/* Quick-Fill Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => loadSample(SAMPLE_FAKE)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200/90 hover:bg-rose-100 active:scale-95 transition-all flex items-center space-x-2 shadow-sm"
            >
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Load Fake Sample</span>
            </button>
            <button
              type="button"
              onClick={() => loadSample(SAMPLE_REAL)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/90 hover:bg-emerald-100 active:scale-95 transition-all flex items-center space-x-2 shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Load Real Sample</span>
            </button>
            <button
              type="button"
              onClick={clearForm}
              className="p-2.5 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all"
              title="Reset form"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Global Error Banner */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start space-x-3 shadow-sm">
            <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-bold text-rose-900">Analysis Error</p>
              <p className="text-xs text-rose-700 mt-0.5">{error}</p>
              {backendOnline === false && (
                <p className="text-xs text-rose-800 mt-2 font-medium">
                  Hint: Please start the FastAPI backend service via{" "}
                  <code className="bg-rose-100 text-rose-900 px-1.5 py-0.5 rounded font-mono text-xs">
                    uvicorn main:app --reload --port 8000
                  </code>
                </p>
              )}
            </div>
          </div>
        )}

        {/* Form and Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Input Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-5"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
                <div className="flex items-center space-x-2.5">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  <h2 className="text-base font-bold text-slate-900">
                    Job Posting Parameters
                  </h2>
                </div>
                <span className="text-xs text-slate-400">
                  Required fields marked with <span className="text-rose-500">*</span>
                </span>
              </div>

              {/* Job Title */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center space-x-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                  <span>Job Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Senior Software Engineer / Remote Assistant"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50/70 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:bg-white transition-all"
                />
              </div>

              {/* Company Profile */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center space-x-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Company Profile / About the Employer</span>
                </label>
                <textarea
                  name="company_profile"
                  rows={2}
                  value={formData.company_profile}
                  onChange={handleInputChange}
                  placeholder="Information regarding company background, founding year, or industry presence..."
                  className="w-full px-4 py-2 rounded-xl bg-slate-50/70 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:bg-white transition-all resize-y"
                />
              </div>

              {/* Job Description (Required) */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1.5">
                    <FileText className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Job Description</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[11px] font-medium text-slate-400">
                    {formData.description.length} characters
                  </span>
                </div>
                <textarea
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Paste the primary job duties, listing content, or correspondence here..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50/70 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:bg-white transition-all resize-y"
                />
              </div>

              {/* Requirements & Benefits Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center space-x-1.5">
                    <Award className="w-3.5 h-3.5 text-slate-500" />
                    <span>Candidate Requirements</span>
                  </label>
                  <textarea
                    name="requirements"
                    rows={2}
                    value={formData.requirements}
                    onChange={handleInputChange}
                    placeholder="Skills, academic degrees, or certifications..."
                    className="w-full px-4 py-2 rounded-xl bg-slate-50/70 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:bg-white transition-all resize-y"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center space-x-1.5">
                    <Gift className="w-3.5 h-3.5 text-slate-500" />
                    <span>Benefits & Compensation</span>
                  </label>
                  <textarea
                    name="benefits"
                    rows={2}
                    value={formData.benefits}
                    onChange={handleInputChange}
                    placeholder="Salary, health coverage, pension, flexible hours..."
                    className="w-full px-4 py-2 rounded-xl bg-slate-50/70 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:bg-white transition-all resize-y"
                  />
                </div>
              </div>

              {/* Has Company Logo Checkbox */}
              <div className="pt-1">
                <label className="flex items-center space-x-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 hover:bg-slate-100/70 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    name="has_company_logo"
                    checked={formData.has_company_logo}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500 cursor-pointer"
                  />
                  <div className="flex items-center space-x-2 text-xs">
                    <ImageIcon className="w-4 h-4 text-slate-500" />
                    <div>
                      <span className="font-bold text-slate-800">
                        Posting Includes Verified Company Logo
                      </span>
                      <p className="text-slate-500 text-[11px] mt-0.5">
                        Absence of corporate branding carries significant statistical correlation with fraudulent advertisements.
                      </p>
                    </div>
                  </div>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 hover:from-indigo-500 hover:to-violet-600 active:scale-[0.99] transition-all shadow-md shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2.5 cursor-pointer"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Evaluating NLP Tokens & Classification Matrix...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-white text-white" />
                    <span>Run Authenticity Analysis</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Results Dashboard */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Awaiting Input Card */}
            {!result && !loading && (
              <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm text-center space-y-5">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                  <Search className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Ready for Job Assessment
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
                    Fill the form or click{" "}
                    <strong className="text-rose-600 font-semibold">Load Fake Sample</strong> or{" "}
                    <strong className="text-emerald-700 font-semibold">Load Real Sample</strong> above to see instant NLP classification and heuristic red flags.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-left">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">
                      Model Estimator
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      LinearSVC + Sigmoid Calibrator
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">
                      Feature Dimension
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      6,000 TF-IDF N-Grams (1-2)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Loading Indicator */}
            {loading && (
              <div className="bg-white p-8 rounded-2xl border border-indigo-100 shadow-sm text-center space-y-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-indigo-600 animate-spin" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Processing NLP Lexical Features
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Applying WordNet lemmatization, stopword removal, and computing probability distributions...
                  </p>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full animate-pulse w-3/4"></div>
                </div>
              </div>
            )}

            {/* Results Display */}
            {result && !loading && (
              <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                
                {/* Verdict Banner */}
                <div
                  className={`p-4 rounded-xl border flex items-center justify-between ${
                    result.is_fraudulent
                      ? "bg-rose-50/80 border-rose-200"
                      : "bg-emerald-50/80 border-emerald-200"
                  }`}
                >
                  <div className="flex items-center space-x-3.5">
                    <div
                      className={`p-2.5 rounded-xl ${
                        result.is_fraudulent
                          ? "bg-rose-100 text-rose-700"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {result.is_fraudulent ? (
                        <ShieldAlert className="w-6 h-6" />
                      ) : (
                        <ShieldCheck className="w-6 h-6" />
                      )}
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                        Classification Outcome
                      </span>
                      <h3
                        className={`text-lg font-black tracking-tight ${
                          result.is_fraudulent
                            ? "text-rose-700"
                            : "text-emerald-800"
                        }`}
                      >
                        {result.verdict}
                      </h3>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                      result.is_fraudulent
                        ? "bg-rose-200/80 text-rose-800"
                        : "bg-emerald-200/80 text-emerald-900"
                    }`}
                  >
                    {result.is_fraudulent ? "Scam Alert" : "Authentic"}
                  </span>
                </div>

                {/* Risk Percentage Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Fraud Probability Index
                    </span>
                    <div className="flex items-baseline space-x-1.5">
                      <span
                        className={`text-2xl font-black ${
                          result.is_fraudulent
                            ? "text-rose-600"
                            : "text-emerald-700"
                        }`}
                      >
                        {result.risk_percentage}%
                      </span>
                      <span className="text-xs text-slate-500 font-medium">risk score</span>
                    </div>
                  </div>

                  {/* Progress Meter Track */}
                  <div className="h-3.5 w-full bg-slate-100 rounded-full p-0.5 border border-slate-200 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ease-out ${
                        result.is_fraudulent
                          ? "bg-gradient-to-r from-amber-500 via-rose-500 to-red-600"
                          : "bg-gradient-to-r from-teal-400 to-emerald-600"
                      }`}
                      style={{ width: `${Math.max(result.risk_percentage, 3)}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                    <span>0% (Safe)</span>
                    <span className="font-semibold text-slate-500">Threshold: 50.0%</span>
                    <span>100% (Fraudulent)</span>
                  </div>
                </div>

                {/* Metric Summary Cards */}
                <div className="grid grid-cols-3 gap-2.5 text-center">
                  <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
                    <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block">
                      Authentic Score
                    </span>
                    <span className="text-sm font-black text-emerald-700">
                      {(result.confidence_real * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-rose-50/60 border border-rose-100">
                    <span className="text-[10px] text-rose-800 font-bold uppercase tracking-wider block">
                      Fraud Score
                    </span>
                    <span className="text-sm font-black text-rose-600">
                      {(result.confidence_fake * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-100">
                    <span className="text-[10px] text-indigo-800 font-bold uppercase tracking-wider block">
                      NLP Tokens
                    </span>
                    <span className="text-sm font-black text-indigo-700">
                      {result.processed_word_count}
                    </span>
                  </div>
                </div>

                {/* Heuristic Red Flags */}
                <div className="space-y-2.5 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                      <span>Heuristic Scam Flags</span>
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {result.flags.length} flagged
                    </span>
                  </div>

                  {result.flags.length === 0 ? (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center space-x-2 text-xs text-emerald-800 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>No known scam keywords or suspicious indicators triggered.</span>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                      {result.flags.map((flag, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-rose-50/70 border border-rose-200 flex items-start space-x-2 text-xs text-rose-800"
                        >
                          <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                          <span className="font-medium leading-relaxed">{flag}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Pipeline Verification Note */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-500 leading-relaxed">
                  <div className="flex items-center space-x-1.5 text-slate-700 font-bold mb-0.5">
                    <Info className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Inference Specification</span>
                  </div>
                  Text vectorization performed via 6,000 TF-IDF unigrams & bigrams with NLTK WordNet lemmatizers. Probabilities derived from a calibrated sigmoid boundary.
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modern Clean Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-800">SCSCIT JOB-AUTHENTICATOR</span>
            <span>&bull;</span>
            <span>School of Computer Science & Information Technology</span>
          </div>
          <div className="text-slate-400 font-medium">
            FastAPI Backend &bull; Scikit-Learn 1.6.1 &bull; Next.js 14
          </div>
        </div>
      </footer>
    </div>
  );
}
