"use client";

import React from "react";
import {
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Zap,
  Cpu,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import Hero3DCanvas from "./Hero3DCanvas";

export default function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              <span>School of Computer Science &amp; IT &bull; AI/ML Project</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Real vs. Fake Job Posting{" "}
              <span className="text-indigo-600">Detector</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              An AI-assisted verification system that evaluates online employment advertisements for fraud indicators. Combines an NLP pipeline with a Calibrated Support Vector Classifier trained on over 18,000 job postings.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => scrollTo("detector")}
                className="px-6 py-3 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 shadow-sm transition-all flex items-center space-x-2 cursor-pointer"
              >
                <span>Analyze a Job Posting</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollTo("how-it-works")}
                className="px-5 py-3 rounded-xl font-semibold text-sm text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 active:scale-95 shadow-sm transition-all flex items-center space-x-2 cursor-pointer"
              >
                <span>How It Works</span>
              </button>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-medium">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>FastAPI Microservice</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>NLTK Preprocessing</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Rule-Based Heuristics</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full h-full relative">
              <Hero3DCanvas />

              <div className="absolute top-4 -left-2 sm:-left-4 p-3 rounded-xl bg-white border border-slate-200 shadow-md flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">LinearSVC Model</p>
                  <p className="text-[11px] text-slate-500">Calibrated Probabilities</p>
                </div>
              </div>

              <div className="absolute bottom-6 -right-2 sm:-right-4 p-3 rounded-xl bg-white border border-slate-200 shadow-md flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">6,000 Features</p>
                  <p className="text-[11px] text-slate-500">TF-IDF Vectorizer</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">18,000+</span>
            <p className="text-xs text-slate-500 font-semibold uppercase mt-1">Dataset Postings</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <span className="text-2xl sm:text-3xl font-extrabold text-indigo-600">6,000</span>
            <p className="text-xs text-slate-500 font-semibold uppercase mt-1">N-Gram Dimensions</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600">99.2%</span>
            <p className="text-xs text-slate-500 font-semibold uppercase mt-1">Authentic Accuracy</p>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-800">&lt; 15 ms</span>
            <p className="text-xs text-slate-500 font-semibold uppercase mt-1">Response Time</p>
          </div>
        </div>
      </div>
    </section>
  );
}
