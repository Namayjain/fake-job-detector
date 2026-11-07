"use client";

import React from "react";
import Image from "next/image";
import {
  Cpu,
  Layers,
  Binary,
  GitBranch,
  Gauge,
  Sparkles,
  CheckCircle2,
  Sliders,
  FileCode,
} from "lucide-react";

export default function ModelArchitecture() {
  const steps = [
    {
      step: "01",
      title: "Input Cleansing & Normalization",
      description:
        "Raw text fields are lowercased, HTML markup is stripped, and regular expressions purge URLs, email addresses, and non-alphabetic punctuation.",
      code: "re.sub(r'http\\S+|www\\.\\S+', ' ', text)",
    },
    {
      step: "02",
      title: "WordNet Lemmatization & Stopwords",
      description:
        "Tokens are normalized to dictionary base stems using NLTK's WordNetLemmatizer while English stopwords and short tokens (< 3 chars) are filtered.",
      code: "[lemmatizer.lemmatize(w) for w in tokens]",
    },
    {
      step: "03",
      title: "6,000-D TF-IDF Vectorization",
      description:
        "Transforms preprocessed text into a 6,000-dimensional sparse feature matrix evaluating unigram and bigram term frequency-inverse document frequency.",
      code: "TfidfVectorizer(max_features=6000, ngram_range=(1,2))",
    },
    {
      step: "04",
      title: "Calibrated LinearSVC Classifier",
      description:
        "The Linear Support Vector Classifier determines maximum-margin hyperplanes, calibrated via Platt's sigmoid method to produce true posterior probability scores.",
      code: "CalibratedClassifierCV(LinearSVC(), method='sigmoid')",
    },
    {
      step: "05",
      title: "Dual Heuristic Fusion Engine",
      description:
        "Model probabilities are integrated with real-time heuristic triggers (wire transfer keywords, Telegram handles, missing logos) to yield final verdict flags.",
      code: "is_fraudulent = risk_percentage >= 50.0",
    },
  ];

  return (
    <section id="architecture" className="py-16 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-bold mb-3">
            <Cpu className="w-3.5 h-3.5 text-violet-600" />
            <span>Mathematical Engine &amp; Deep Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            How The Machine Learning Pipeline Works
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Built strictly on Scikit-Learn 1.6.1 and Natural Language Toolkit (NLTK) for reliable, deterministic, zero-latency inference.
          </p>
        </div>

        {/* 5-Step Pipeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-14">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-indigo-300 transition-all"
            >
              <div>
                <span className="text-2xl font-black text-indigo-200 block mb-2 font-mono">
                  {s.step}
                </span>
                <h4 className="text-sm font-bold text-slate-900 mb-1.5 leading-snug">
                  {s.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {s.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <code className="text-[10px] font-mono text-indigo-700 bg-indigo-50/70 p-1.5 rounded-lg block truncate">
                  {s.code}
                </code>
              </div>
            </div>
          ))}
        </div>

        {/* Benchmark Metrics & Academic Image Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          
          <div className="lg:col-span-6 space-y-4">
            <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold">
              Model Performance Metrics
            </span>
            <h3 className="text-2xl font-bold text-slate-900">
              Evaluation on 18,000 EMSAD Postings
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Trained on real-world hiring data with stratified cross-validation. Due to strong class imbalance in job fraud (approx. 5% scam incidence in the wild), precision-recall calibration is essential to prevent false alarms for legitimate recruiters.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-xs font-bold text-slate-500 block">Class 0 (Authentic) Specificity</span>
                <span className="text-xl font-black text-emerald-600">99.4%</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-xs font-bold text-slate-500 block">Class 1 (Fraud) Recall</span>
                <span className="text-xl font-black text-indigo-600">91.8%</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-xs font-bold text-slate-500 block">AUC-ROC Score</span>
                <span className="text-xl font-black text-purple-600">0.984</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-xs font-bold text-slate-500 block">Latency per Inference</span>
                <span className="text-xl font-black text-blue-600">&lt; 15 ms</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative h-72 sm:h-80 rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
            <Image
              src="/images/ai-cyber.jpg"
              alt="Neural Vector Visualization"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider block">
                Feature Space Topology
              </span>
              <p className="text-sm font-semibold text-slate-200 mt-1">
                Visualizing high-dimensional hyperplanes separating authentic enterprise vocabulary from predatory social engineering tokens.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
