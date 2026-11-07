"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
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
  Info,
  Copy,
  ChevronDown,
  ChevronUp,
  Cpu,
  Layers,
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
    "Apex FinTech Technologies is an established financial technology corporation founded in 2014. We develop high-performance distributed trading algorithms and institutional analytics platforms serving over 300 global institutional clients with 250+ engineers globally.",
  description:
    "We are seeking an experienced Full Stack Software Engineer to lead the architecture of our cloud-native client portal. In this role, you will build and scale high-throughput REST and WebSocket microservices using React, TypeScript, Python, and PostgreSQL, collaborating directly with quantitative analysts and product designers.",
  requirements:
    "Bachelor's or Master's degree in Computer Science or equivalent practical experience. 5+ years building full-stack applications with TypeScript/React and Python web frameworks (FastAPI/Django). Experience with relational databases (PostgreSQL), Docker, and CI/CD pipelines. Strong commitment to automated testing and clean code principles.",
  benefits:
    "Competitive salary ($140,000 - $185,000 base + equity options). Comprehensive health, dental, and vision insurance. 401(k) retirement plan with 5% employer match. 25 days paid annual leave + national holidays. Annual continuing education and home-office equipment budget.",
  has_company_logo: true,
};

const SAMPLE_FAKE = {
  title: "Urgent Opening: Data Entry & Executive Correspondence Clerk",
  company_profile: "",
  description:
    "CRITICAL VACANCY AVAILABLE: Earn between $4,500 to $6,500 weekly working from the comfort of your home for only 1 to 2 hours per day! No prior experience, background check, or resume needed. Payouts are dispatched weekly via Western Union or direct wire transfer. Duties include daily email correspondence and receiving forwarded package shipments.",
  requirements:
    "Candidate must have a personal bank account ready to receive direct wire transfer payments and cashier check to purchase home-office equipment from our designated vendor. Candidate must be available for instant interview on Telegram. Contact @recruiting_manager_global immediately.",
  benefits:
    "Guaranteed instant sign-on cash bonus via Western Union. Fully flexible working schedule. Unlimited income potential.",
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
  const [showTokens, setShowTokens] = useState(false);

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
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#10b981", "#06b6d4", "#6366f1"],
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
      console.error("Prediction error:", err);
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
Authentic Probability: ${(result.confidence_real * 100).toFixed(1)}%
Flags Detected: ${result.flags.length}
${result.flags.map((f) => `- ${f}`).join("\n")}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="detector" className="py-12 lg:py-16 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Interactive Neural Inquest Console</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Live Job Authenticator Terminal
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Paste any real-world job posting below or inject our curated benchmark samples to evaluate fraud risk in milliseconds.
          </p>

          {/* Quick-Fill Benchmark Switcher */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => loadSample(SAMPLE_FAKE)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 hover:bg-rose-100 hover:border-rose-300 active:scale-95 transition-all flex items-center space-x-2 shadow-sm"
            >
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Load Fake Specimen (Scam Triggers)</span>
            </button>

            <button
              type="button"
              onClick={() => loadSample(SAMPLE_REAL)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 active:scale-95 transition-all flex items-center space-x-2 shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Load Real Specimen (Authentic Org)</span>
            </button>

            <button
              type="button"
              onClick={clearForm}
              className="px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all flex items-center space-x-1.5"
              title="Reset inputs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Global Error Notification */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start space-x-3 shadow-sm max-w-4xl mx-auto"
          >
            <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-bold text-rose-900">Analysis Error</p>
              <p className="text-xs text-rose-700 mt-0.5">{error}</p>
              <p className="text-xs text-rose-800 mt-2 font-mono">
                Run backend: <code className="bg-rose-100 px-1 py-0.5 rounded">uvicorn main:app --reload --port 8000</code>
              </p>
            </div>
          </motion.div>
        )}

        {/* Two-Column Workbench Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Input Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                      Job Specimen Manifest
                    </h3>
                    <p className="text-xs text-slate-400">
                      Supply the vacancy advertisement content
                    </p>
                  </div>
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  Fields marked <span className="text-rose-500 font-bold">*</span> required
                </span>
              </div>

              {/* Job Title */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center space-x-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                  <span>Job Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Senior Software Engineer / Remote Clerk"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50/80 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:bg-white transition-all font-medium"
                />
              </div>

              {/* Company Profile */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center space-x-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Company Profile / About the Employer</span>
                </label>
                <textarea
                  name="company_profile"
                  rows={2}
                  value={formData.company_profile}
                  onChange={handleInputChange}
                  placeholder="Corporate background, founding year, industry reputation..."
                  className="w-full px-4 py-2 rounded-xl bg-slate-50/80 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:bg-white transition-all resize-y font-medium"
                />
              </div>

              {/* Job Description (Mandatory) */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1.5">
                    <FileText className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Job Description</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[11px] font-bold text-slate-400 font-mono bg-slate-100 px-2 py-0.5 rounded-md">
                    {formData.description.length} chars
                  </span>
                </div>
                <textarea
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Paste the primary job specifications, duties, and correspondence here..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50/80 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:bg-white transition-all resize-y font-medium"
                />
              </div>

              {/* Requirements & Benefits Split */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center space-x-1.5">
                    <Award className="w-3.5 h-3.5 text-slate-400" />
                    <span>Candidate Requirements</span>
                  </label>
                  <textarea
                    name="requirements"
                    rows={2}
                    value={formData.requirements}
                    onChange={handleInputChange}
                    placeholder="Skills, degrees, tools required..."
                    className="w-full px-4 py-2 rounded-xl bg-slate-50/80 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:bg-white transition-all resize-y font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center space-x-1.5">
                    <Gift className="w-3.5 h-3.5 text-slate-400" />
                    <span>Benefits &amp; Compensation</span>
                  </label>
                  <textarea
                    name="benefits"
                    rows={2}
                    value={formData.benefits}
                    onChange={handleInputChange}
                    placeholder="Salary, health coverage, pension, bonuses..."
                    className="w-full px-4 py-2 rounded-xl bg-slate-50/80 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:bg-white transition-all resize-y font-medium"
                  />
                </div>
              </div>

              {/* Has Company Logo Checkbox */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100/60 cursor-pointer transition-colors">
                <label className="flex items-center space-x-3.5 cursor-pointer">
                  <input
                    type="checkbox"
                    name="has_company_logo"
                    checked={formData.has_company_logo}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500 cursor-pointer"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-800">
                      Posting Includes Verified Corporate Logo
                    </span>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Absence of corporate branding carries empirical statistical correlation with fake advertisements.
                    </p>
                  </div>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 hover:from-indigo-500 hover:to-violet-600 active:scale-[0.99] transition-all shadow-lg shadow-indigo-600/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2.5 cursor-pointer"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Computing 6,000-D NLP Vector &amp; Calibration...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-white" />
                    <span>Run Authenticity Analysis</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* RIGHT COLUMN: Results Dashboard */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Idle State: Clean Explainer */}
            {!result && !loading && (
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center space-y-6">
                <div className="w-16 h-16 mx-auto rounded-3xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm">
                  <Search className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Awaiting Job Listing Input
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
                    Paste an online posting or inject one of the quick test specimens to observe real-time lexical classification and scam trigger alerts.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-left">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">
                      Model Architecture
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      LinearSVC + Sigmoid Calibrator
                    </span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] text-slate-400 uppercase font-black tracking-wider block">
                      Feature Space
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      6,000 TF-IDF N-Grams (1-2)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="bg-white p-8 rounded-3xl border border-indigo-100 shadow-sm text-center space-y-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-indigo-600 animate-spin" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Scouring NLP Tokens &amp; Patterns
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Extracting WordNet stems, pruning stopwords, and evaluating decision boundaries...
                  </p>
                </div>
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full animate-pulse w-3/4"></div>
                </div>
              </div>
            )}

            {/* Results Display */}
            {result && !loading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-6"
              >
                {/* Result Header Banner */}
                <div
                  className={`p-4 rounded-2xl border flex items-center justify-between ${
                    result.is_fraudulent
                      ? "bg-rose-50 border-rose-200 text-rose-900"
                      : "bg-emerald-50 border-emerald-200 text-emerald-900"
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
                      <span className="text-[10px] uppercase font-bold tracking-wider opacity-75">
                        Inquest Outcome
                      </span>
                      <h4
                        className={`text-lg font-black tracking-tight ${
                          result.is_fraudulent ? "text-rose-700" : "text-emerald-800"
                        }`}
                      >
                        {result.verdict}
                      </h4>
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

                {/* Risk Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Fraud Probability Index
                    </span>
                    <div className="flex items-baseline space-x-1.5">
                      <span
                        className={`text-2xl font-black ${
                          result.is_fraudulent ? "text-rose-600" : "text-emerald-700"
                        }`}
                      >
                        {result.risk_percentage}%
                      </span>
                      <span className="text-xs text-slate-400 font-medium">risk score</span>
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
                    <span>100% (High Risk)</span>
                  </div>
                </div>

                {/* Metric Summary Cards */}
                <div className="grid grid-cols-3 gap-2.5 text-center">
                  <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                    <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block">
                      Authentic Score
                    </span>
                    <span className="text-sm font-black text-emerald-700">
                      {(result.confidence_real * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="p-3 rounded-2xl bg-rose-50/70 border border-rose-100">
                    <span className="text-[10px] text-rose-800 font-bold uppercase tracking-wider block">
                      Fraud Score
                    </span>
                    <span className="text-sm font-black text-rose-600">
                      {(result.confidence_fake * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="p-3 rounded-2xl bg-indigo-50/70 border border-indigo-100">
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
                    <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center space-x-2 text-xs text-emerald-800 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>No known predatory phrases or missing credentials detected.</span>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                      {result.flags.map((flag, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-2xl bg-rose-50/80 border border-rose-200 flex items-start space-x-2 text-xs text-rose-800"
                        >
                          <Flame className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                          <span className="font-semibold leading-relaxed">{flag}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action Buttons: Copy Report */}
                <div className="pt-2 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={copyReport}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 hover:bg-slate-100 active:scale-95 transition-all flex items-center justify-center space-x-2"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700">Report Copied to Clipboard</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-slate-500" />
                        <span>Copy Verification Report</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
