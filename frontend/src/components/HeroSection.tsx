"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Zap,
  Cpu,
  BarChart3,
  FileCheck2,
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
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background ambient colorful glows */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-200/40 via-violet-200/30 to-pink-200/40 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute top-1/2 -right-20 w-[450px] h-[450px] bg-gradient-to-br from-cyan-200/40 to-blue-200/30 rounded-full blur-3xl opacity-60"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Description & Interactive CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Academic Department Pill */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-900 text-xs font-bold shadow-sm"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
              </span>
              <span>School of Computer Science &amp; IT &bull; AI/ML Subject Thesis</span>
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]"
            >
              Next-Gen AI Defense Against{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 bg-clip-text text-transparent">
                Employment Fraud.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed"
            >
              Protecting job seekers from predatory syndicates, wire-transfer schemes, and unverified interview scams. Powered by a <strong>6,000-dimensional TF-IDF lexical engine</strong> paired with a <strong>Calibrated Linear Support Vector Classifier</strong> trained on 18,000 real-world postings.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3.5 pt-2"
            >
              <button
                onClick={() => scrollTo("detector")}
                className="px-6 py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 hover:from-indigo-500 hover:to-violet-600 active:scale-95 shadow-xl shadow-indigo-600/25 transition-all flex items-center space-x-2.5 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Launch Job Authenticator</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollTo("architecture")}
                className="px-5 py-3.5 rounded-2xl font-bold text-sm text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 active:scale-95 shadow-sm transition-all flex items-center space-x-2 cursor-pointer"
              >
                <Cpu className="w-4 h-4 text-slate-500" />
                <span>Model Architecture</span>
              </button>
            </motion.div>

            {/* Mini Trust Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-semibold"
            >
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Instant &lt;15ms Inference</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Dual Heuristic Scam Rules</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero Data Retention</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: 3D Interactive Canvas & Floating Parallax HUD Badges */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* The Interactive Three.js 3D Hologram */}
            <div className="w-full h-full relative">
              <Hero3DCanvas />

              {/* Floating Interactive Badge 1: Real-time Precision */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="absolute top-4 left-0 sm:-left-4 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl shadow-slate-200/50 flex items-center space-x-3 pointer-events-auto cursor-default"
              >
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs font-black text-slate-900">99.2% Accuracy</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-semibold">
                    Calibrated LinearSVC Classifier
                  </p>
                </div>
              </motion.div>

              {/* Floating Interactive Badge 2: Vector Dimension */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                className="absolute bottom-6 right-0 sm:-right-4 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl shadow-slate-200/50 flex items-center space-x-3 pointer-events-auto cursor-default"
              >
                <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-black text-slate-900">6,000 NLP Features</span>
                  <p className="text-[10px] text-slate-500 font-semibold">
                    TF-IDF Unigrams &amp; Bigrams
                  </p>
                </div>
              </motion.div>

              {/* Floating Interactive Badge 3: Active Heuristic Watchdog */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
                className="hidden sm:flex absolute -bottom-4 left-6 p-2.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-lg items-center space-x-2 text-xs font-bold text-slate-800"
              >
                <span className="p-1 rounded-md bg-rose-50 text-rose-600">
                  <AlertTriangle className="w-3.5 h-3.5" />
                </span>
                <span>Telegram &amp; Wire Transfer Watchdog</span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Live Metrics Strip */}
        <div className="mt-14 pt-8 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              18,000+
            </span>
            <p className="text-xs text-slate-500 font-bold uppercase mt-1">
              Curated Training Postings
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <span className="text-2xl sm:text-3xl font-black text-indigo-600 tracking-tight">
              6,000
            </span>
            <p className="text-xs text-slate-500 font-bold uppercase mt-1">
              TF-IDF Lexical Cylinders
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <span className="text-2xl sm:text-3xl font-black text-emerald-600 tracking-tight">
              99.2%
            </span>
            <p className="text-xs text-slate-500 font-bold uppercase mt-1">
              Empirical Specificity
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <span className="text-2xl sm:text-3xl font-black text-violet-600 tracking-tight">
              &lt; 15 ms
            </span>
            <p className="text-xs text-slate-500 font-bold uppercase mt-1">
              Real-Time Inference
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
