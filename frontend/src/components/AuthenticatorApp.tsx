"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
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
  Copy,
  ArrowRight,
  Flame,
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
  title: "Senior Full Stack Software Engineer (React / Python)",
  company_profile:
    "Apex FinTech Technologies is a financial software firm founded in 2014. We develop distributed trading systems and data analytics platforms serving over 300 institutional clients with 250+ employees globally.",
  description:
    "We are seeking an experienced Full Stack Software Engineer to build and maintain cloud-based applications. You will develop backend REST APIs in Python (FastAPI/Django) and interactive web interfaces in React and TypeScript, collaborating with product managers and engineers.",
  requirements:
    "Bachelor's degree in Computer Science or equivalent practical experience. 4+ years of software engineering experience with Python and JavaScript/TypeScript. Familiarity with PostgreSQL, Docker, automated unit testing, and Git version control.",
  benefits:
    "Competitive salary ($130,000 - $165,000 base). Comprehensive health, dental, and vision insurance. 401(k) matching up to 5%. 25 days paid time off plus public holidays. Annual education allowance and hybrid work flexibility.",
  has_company_logo: true,
};

const SAMPLE_FAKE = {
  title: "Data Entry & Remote Assistant - Immediate Start",
  company_profile: "",
  description:
    "URGENT POSITION: Earn $4,000 to $6,000 weekly working from home 1 to 2 hours per day. No experience, resume, or background check needed. You will receive payments weekly through Western Union or direct wire transfer. Tasks include forwarding packages and processing money orders.",
  requirements:
    "Candidate must have a personal bank account ready to receive wire transfers and cashier checks to purchase home-office equipment. Candidate must be available for an immediate interview on Telegram. Contact @recruiting_desk_fast directly.",
  benefits:
    "Guaranteed instant sign-on bonus via Western Union. Flexible hours. High earning potential.",
  has_company_logo: false,
};

export default function AuthenticatorApp() {
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
  const [copied, setCopied] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

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

  const triggerConfetti = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#10b981", "#3b82f6", "#6366f1"],
    });
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
        throw new Error(errData.detail || `Server error: ${response.status}`);
      }

      const data: PredictResponse = await response.json();
      setResult(data);

      if (!data.is_fraudulent) {
        triggerConfetti();
      }
    } catch (err: any) {
      setError(
        err.message ||
          "Could not connect to FastAPI backend. Ensure it is running on " + apiUrl
      );
    } finally {
      setLoading(false);
    }
  };

  const copyReport = () => {
    if (!result) return;
    const text = `SCSCIT JOB-AUTHENTICATOR REPORT
Verdict: ${result.verdict}
Fraud Risk: ${result.risk_percentage}%
Authentic Confidence: ${(result.confidence_real * 100).toFixed(1)}%
Fraud Confidence: ${(result.confidence_fake * 100).toFixed(1)}%
Flags Detected: ${result.flags.length}
${result.flags.map((f) => `- ${f}`).join("\n")}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="detector" className="py-12 lg:py-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Job Posting Analysis
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Enter the details of a job posting below or load a pre-filled sample to test the detector.
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
            <button
              type="button"
              onClick={() => loadSample(SAMPLE_FAKE)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 hover:bg-rose-100 active:scale-95 transition-all flex items-center space-x-1.5 shadow-sm"
            >
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Load Fake Job Sample</span>
            </button>

            <button
              type="button"
              onClick={() => loadSample(SAMPLE_REAL)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 active:scale-95 transition-all flex items-center space-x-1.5 shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Load Real Job Sample</span>
            </button>

            <button
              type="button"
              onClick={clearForm}
              className="px-3.5 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all flex items-center space-x-1"
              title="Clear fields"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start space-x-3 max-w-4xl mx-auto">
            <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-rose-900">Analysis Error</p>
              <p className="text-xs text-rose-700 mt-0.5">{error}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Job Information Form
                </h3>
                <span className="text-xs text-slate-400">
                  <span className="text-rose-500 font-bold">*</span> Description is required
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1 flex items-center space-x-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                  <span>Job Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Software Engineer, Remote Clerk"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1 flex items-center space-x-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Company Profile</span>
                </label>
                <textarea
                  name="company_profile"
                  rows={2}
                  value={formData.company_profile}
                  onChange={handleInputChange}
                  placeholder="Brief description about the hiring company..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:bg-white transition-all resize-y"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center space-x-1.5">
                    <FileText className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Job Description</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {formData.description.length} chars
                  </span>
                </div>
                <textarea
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Paste the primary job duties, description, or listing content here..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:bg-white transition-all resize-y"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1 flex items-center space-x-1.5">
                    <Award className="w-3.5 h-3.5 text-slate-400" />
                    <span>Requirements</span>
                  </label>
                  <textarea
                    name="requirements"
                    rows={2}
                    value={formData.requirements}
                    onChange={handleInputChange}
                    placeholder="Skills, degrees, or experience..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:bg-white transition-all resize-y"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1 flex items-center space-x-1.5">
                    <Gift className="w-3.5 h-3.5 text-slate-400" />
                    <span>Benefits</span>
                  </label>
                  <textarea
                    name="benefits"
                    rows={2}
                    value={formData.benefits}
                    onChange={handleInputChange}
                    placeholder="Salary range, insurance, remote work..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:bg-white transition-all resize-y"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100/60 cursor-pointer transition-colors">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="has_company_logo"
                    checked={formData.has_company_logo}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500 cursor-pointer"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-800">
                      Posting includes company logo
                    </span>
                    <p className="text-[11px] text-slate-500">
                      Missing company logos have a high statistical correlation with scam postings.
                    </p>
                  </div>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Analyzing text...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-white" />
                    <span>Predict Real vs. Fake</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="lg:col-span-5 space-y-4">
            {!result && !loading && (
              <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                  <Search className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    No Job Analyzed Yet
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
                    Fill out the form on the left or click one of the sample buttons above to run the machine learning model.
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-3 text-left">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">
                      ML Algorithm
                    </span>
                    <span className="text-xs font-semibold text-slate-800">
                      LinearSVC (Calibrated)
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">
                      Text Features
                    </span>
                    <span className="text-xs font-semibold text-slate-800">
                      6,000 TF-IDF N-Grams
                    </span>
                  </div>
                </div>
              </div>
            )}

            {loading && (
              <div className="bg-white p-8 rounded-2xl border border-indigo-100 shadow-sm text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-indigo-600 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Processing NLP Features
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Cleaning text, lemmatizing words, and calculating probability...
                  </p>
                </div>
              </div>
            )}

            {result && !loading && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
                
                <div
                  className={`p-4 rounded-xl border flex items-center justify-between ${
                    result.is_fraudulent
                      ? "bg-rose-50 border-rose-200 text-rose-900"
                      : "bg-emerald-50 border-emerald-200 text-emerald-900"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-xl ${
                        result.is_fraudulent
                          ? "bg-rose-100 text-rose-700"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {result.is_fraudulent ? (
                        <ShieldAlert className="w-5 h-5" />
                      ) : (
                        <ShieldCheck className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider opacity-75">
                        Prediction Result
                      </span>
                      <h4 className="text-base font-bold">
                        {result.verdict}
                      </h4>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      result.is_fraudulent
                        ? "bg-rose-200 text-rose-900"
                        : "bg-emerald-200 text-emerald-900"
                    }`}
                  >
                    {result.is_fraudulent ? "Fake Job" : "Authentic Job"}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Fraud Risk Score
                    </span>
                    <span
                      className={`text-xl font-extrabold ${
                        result.is_fraudulent ? "text-rose-600" : "text-emerald-700"
                      }`}
                    >
                      {result.risk_percentage}%
                    </span>
                  </div>

                  <div className="h-3 w-full bg-slate-100 rounded-full border border-slate-200 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        result.is_fraudulent
                          ? "bg-rose-600"
                          : "bg-emerald-500"
                      }`}
                      style={{ width: `${Math.max(result.risk_percentage, 2)}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                    <span>0% (Low Risk)</span>
                    <span>Threshold: 50%</span>
                    <span>100% (High Risk)</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                    <span className="text-[10px] text-emerald-800 font-bold uppercase block">
                      Authentic Score
                    </span>
                    <span className="text-sm font-bold text-emerald-700">
                      {(result.confidence_real * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-100">
                    <span className="text-[10px] text-rose-800 font-bold uppercase block">
                      Fraud Score
                    </span>
                    <span className="text-sm font-bold text-rose-600">
                      {(result.confidence_fake * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-100">
                    <span className="text-[10px] text-indigo-800 font-bold uppercase block">
                      Cleaned Words
                    </span>
                    <span className="text-sm font-bold text-indigo-700">
                      {result.processed_word_count}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                      <span>Heuristic Red Flags</span>
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {result.flags.length}
                    </span>
                  </div>

                  {result.flags.length === 0 ? (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>No suspicious keywords or missing logo flags detected.</span>
                    </div>
                  ) : (
                    <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                      {result.flags.map((flag, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start space-x-2 text-xs text-rose-800"
                        >
                          <Flame className="w-3.5 h-3.5 text-rose-600 flex-shrink-0 mt-0.5" />
                          <span>{flag}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={copyReport}
                  className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 hover:bg-slate-100 active:scale-95 transition-all flex items-center justify-center space-x-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied to Clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Copy Report Summary</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
